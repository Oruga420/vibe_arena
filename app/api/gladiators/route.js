import { NextResponse } from 'next/server';
import sql from '../../../lib/db.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ success: false, message: 'Missing query' }, { status: 400 });
    }

    try {
        // Search in competitors table
        // We also want to join with the LATEST registration to get stack info, etc.
        // This query finds the competitor and gets their most recent registration data
        const results = await sql`
            WITH latest_reg AS (
                SELECT DISTINCT ON (email) 
                    email, 
                    stack, 
                    wins, 
                    losses, 
                    timezone 
                FROM quickdrop_registrations
                ORDER BY email, created_at DESC
            )
            SELECT 
                c.id, 
                c.name, 
                c.colosseum_name, 
                c.email, 
                c.last_project_name, 
                c.competitor_story,
                lr.stack,
                lr.wins,
                lr.losses,
                lr.timezone as location
            FROM competitors c
            LEFT JOIN latest_reg lr ON LOWER(c.email) = LOWER(lr.email)
            WHERE 
                c.name ILIKE ${'%' + query + '%'} 
                OR c.colosseum_name ILIKE ${'%' + query + '%'}
                OR c.email ILIKE ${'%' + query + '%'}
            LIMIT 1;
        `;

        if (results.length === 0) {
            return NextResponse.json({ success: false, data: null });
        }

        const gladiator = results[0];
        
        // Calculate derived stats
        const totalMatches = (gladiator.wins || 0) + (gladiator.losses || 0);
        const winRate = totalMatches > 0 
            ? Math.round((gladiator.wins / totalMatches) * 100) 
            : 0;

        return NextResponse.json({
            success: true,
            data: {
                ...gladiator,
                winRate,
                matches: totalMatches
            }
        });

    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
    }
}
