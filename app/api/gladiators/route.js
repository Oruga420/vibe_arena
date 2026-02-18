import { NextResponse } from 'next/server';
import sql from '../../../lib/db.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    try {
        const results = await sql`
            WITH all_gladiators AS (
                -- Source 1: quickdrop_registrations (most complete data)
                SELECT 
                    qr.id,
                    qr.name,
                    qr.colosseum_name,
                    qr.email,
                    qr.stack::text as stack,
                    COALESCE(qr.wins, 0) as wins,
                    COALESCE(qr.losses, 0) as losses,
                    qr.avatar_url,
                    qr.created_at,
                    qr.updated_at,
                    'registration' as source
                FROM quickdrop_registrations qr
                
                UNION ALL
                
                -- Source 2: waitlist_entries with role = 'arena'
                SELECT 
                    we.id,
                    we.name,
                    NULL as colosseum_name,
                    we.email,
                    NULL as stack,
                    0 as wins,
                    0 as losses,
                    NULL as avatar_url,
                    we.created_at,
                    we.created_at as updated_at,
                    'waitlist' as source
                FROM waitlist_entries we
                WHERE we.role = 'arena'
                
                UNION ALL
                
                -- Source 3: competitors (historical)
                SELECT 
                    c.id,
                    c.name,
                    c.colosseum_name,
                    c.email,
                    NULL as stack,
                    0 as wins,
                    0 as losses,
                    c.avatar_url,
                    c.created_at,
                    c.updated_at,
                    'competitor' as source
                FROM competitors c
            ),
            -- Deduplicate: by email when available, by name when email is NULL
            deduplicated AS (
                SELECT DISTINCT ON (
                    COALESCE(LOWER(TRIM(email)), 'no-email::' || LOWER(TRIM(name)))
                )
                    id,
                    name,
                    colosseum_name,
                    email,
                    stack,
                    wins,
                    losses,
                    avatar_url,
                    created_at,
                    updated_at,
                    source
                FROM all_gladiators
                ORDER BY 
                    COALESCE(LOWER(TRIM(email)), 'no-email::' || LOWER(TRIM(name))),
                    CASE source 
                        WHEN 'registration' THEN 1 
                        WHEN 'competitor' THEN 2 
                        WHEN 'waitlist' THEN 3 
                    END,
                    updated_at DESC
            )
            SELECT 
                d.id,
                d.name,
                d.colosseum_name,
                d.email,
                d.stack,
                d.wins,
                d.losses,
                COALESCE(ap.avatar_url, d.avatar_url) as avatar_url,
                d.created_at,
                d.updated_at,
                d.source,
                -- Avatar profile enrichment
                ap.attributes,
                ap.power_ups,
                ap.generated_images,
                ap.reference_image_url,
                COALESCE(ap.gladiator_name, d.colosseum_name, d.name) as gladiator_name,
                comp.competitor_story
            FROM deduplicated d
            LEFT JOIN avatar_profiles ap ON LOWER(TRIM(d.email)) = LOWER(TRIM(ap.email))
            LEFT JOIN competitors comp ON LOWER(TRIM(d.email)) = LOWER(TRIM(comp.email))
            WHERE 
                ${query ? sql`
                    LOWER(d.name) LIKE LOWER(${'%' + query + '%'}) 
                    OR LOWER(COALESCE(d.colosseum_name, '')) LIKE LOWER(${'%' + query + '%'})
                    OR LOWER(d.email) LIKE LOWER(${'%' + query + '%'})
                ` : sql`TRUE`}
            ORDER BY 
                d.wins DESC,
                (d.wins + d.losses) DESC,
                d.updated_at DESC
            LIMIT 50;
        `;

        return NextResponse.json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        console.error('Gladiators API error:', error);
        return NextResponse.json({
            success: false,
            message: 'Database error',
            error: error.message
        }, { status: 500 });
    }
}
