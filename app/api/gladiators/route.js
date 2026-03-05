import { NextResponse } from 'next/server';
import sql from '../../../lib/db.js';

// Admin Coliseo API - tiene los stats reales de competiciones
const ADMIN_API_URL = 'https://vibe-arena-qrvoting.vercel.app';

// El Oruga es el organizador, no un gladiador. Excluir siempre.
const EXCLUDED_EMAILS = ['chuckbassdelamora@gmail.com', 'alex@seshwithfriends.org'];

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    try {
        // 1. Fetch gladiators from DB (sin los wins/losses de la tabla)
        const results = await sql`
            WITH all_gladiators AS (
                SELECT 
                    qr.id,
                    qr.name,
                    qr.colosseum_name,
                    qr.email,
                    qr.stack::text as stack,
                    qr.avatar_url,
                    qr.created_at,
                    qr.updated_at,
                    'registration' as source
                FROM quickdrop_registrations qr
                
                UNION ALL
                
                SELECT 
                    c.id,
                    c.name,
                    c.colosseum_name,
                    c.email,
                    NULL as stack,
                    c.avatar_url,
                    c.created_at,
                    c.updated_at,
                    'competitor' as source
                FROM competitors c
            ),
            deduplicated AS (
                SELECT DISTINCT ON (
                    COALESCE(LOWER(TRIM(email)), 'no-email::' || LOWER(TRIM(name)))
                )
                    id,
                    name,
                    colosseum_name,
                    email,
                    stack,
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
                COALESCE(ap.avatar_url, d.avatar_url) as avatar_url,
                d.created_at,
                d.updated_at,
                d.source,
                ap.attributes,
                ap.power_ups,
                ap.generated_images,
                ap.reference_image_url,
                COALESCE(ap.gladiator_name, d.colosseum_name, comp.colosseum_name) as gladiator_name,
                comp.competitor_story
            FROM deduplicated d
            LEFT JOIN avatar_profiles ap ON LOWER(TRIM(d.email)) = LOWER(TRIM(ap.email))
            LEFT JOIN competitors comp ON LOWER(TRIM(d.email)) = LOWER(TRIM(comp.email))
            WHERE 
                ${query ? sql`
                    LOWER(COALESCE(ap.gladiator_name, d.colosseum_name, comp.colosseum_name, '')) LIKE LOWER(${'%' + query + '%'})
                ` : sql`TRUE`}
            ORDER BY 
                d.updated_at DESC
            LIMIT 50;
        `;

        // 2. Fetch stats reales del Admin Coliseo API
        const emails = results
            .map(r => r.email)
            .filter(Boolean);

        let statsMap = {};
        try {
            const statsRes = await fetch(`${ADMIN_API_URL}/api/gladiators/stats/bulk`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emails }),
            });
            if (statsRes.ok) {
                const statsData = await statsRes.json();
                statsMap = statsData.stats || {};
            }
        } catch (err) {
            console.error('Stats API error (non-blocking):', err.message);
        }

        // 3. Merge: gladiator data + stats reales
        //    El Oruga = organizador, sus stats no cuentan (siempre 0-0-0%)
        //    Strip name & email from response for privacy
        //    If no gladiator_name, generate initials from real name
        const data = results.map(r => {
            const email = r.email?.toLowerCase()?.trim();
            const isExcluded = EXCLUDED_EMAILS.includes(email);
            const stats = isExcluded
                ? { wins: 0, losses: 0, dropsPlayed: 0, winRate: 0 }
                : (statsMap[email] || { wins: 0, losses: 0, dropsPlayed: 0, winRate: 0 });

            // Generate initials from real name if no gladiator_name exists
            let displayName = r.gladiator_name;
            if (!displayName && r.name) {
                displayName = r.name
                    .trim()
                    .split(/\s+/)
                    .map(w => w[0]?.toUpperCase())
                    .join('');
            }

            // Destructure to remove private fields
            const { name, email: _email, ...publicData } = r;

            return {
                ...publicData,
                gladiator_name: displayName || null,
                wins: stats.wins,
                losses: stats.losses,
                drops_played: stats.dropsPlayed,
                win_rate: stats.winRate,
            };
        });

        // Ordenar: más wins primero, luego por total de drops
        data.sort((a, b) => {
            if (b.wins !== a.wins) return b.wins - a.wins;
            return (b.wins + b.losses) - (a.wins + a.losses);
        });

        return NextResponse.json({
            success: true,
            count: data.length,
            data,
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
