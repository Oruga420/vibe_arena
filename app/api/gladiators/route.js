import { NextResponse } from 'next/server';
import sql from '../../../lib/db.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    try {
        // Combine data from all 3 sources:
        // 1. quickdrop_registrations (full data)
        // 2. waitlist_entries where role = 'arena'
        // 3. competitors (historical)
        
        // Use UNION to merge unique gladiators by email
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
                    qr.created_at,
                    qr.updated_at,
                    'registration' as source
                FROM quickdrop_registrations qr
                
                UNION
                
                -- Source 2: waitlist_entries with role = 'arena'
                SELECT 
                    we.id,
                    we.name,
                    NULL as colosseum_name,
                    we.email,
                    NULL as stack,
                    0 as wins,
                    0 as losses,
                    we.created_at,
                    we.created_at as updated_at,
                    'waitlist' as source
                FROM waitlist_entries we
                WHERE we.role = 'arena'
                
                UNION
                
                -- Source 3: competitors (historical)
                SELECT 
                    c.id,
                    c.name,
                    c.colosseum_name,
                    c.email,
                    NULL as stack,
                    0 as wins,
                    0 as losses,
                    c.created_at,
                    c.updated_at,
                    'competitor' as source
                FROM competitors c
            ),
            -- Deduplicate by email, preferring the most complete record
            deduplicated AS (
                SELECT DISTINCT ON (LOWER(email))
                    id,
                    name,
                    colosseum_name,
                    email,
                    stack,
                    wins,
                    losses,
                    created_at,
                    updated_at,
                    source
                FROM all_gladiators
                ORDER BY LOWER(email), 
                    CASE source 
                        WHEN 'registration' THEN 1 
                        WHEN 'competitor' THEN 2 
                        WHEN 'waitlist' THEN 3 
                    END,
                    updated_at DESC
            )
            SELECT * FROM deduplicated
            WHERE 
                ${query ? sql`
                    LOWER(name) LIKE LOWER(${'%' + query + '%'}) 
                    OR LOWER(COALESCE(colosseum_name, '')) LIKE LOWER(${'%' + query + '%'})
                    OR LOWER(email) LIKE LOWER(${'%' + query + '%'})
                ` : sql`TRUE`}
            ORDER BY 
                wins DESC,
                (wins + losses) DESC,
                updated_at DESC
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
