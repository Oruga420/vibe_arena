import { NextResponse } from 'next/server';
import sql from '../../../lib/db.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    try {
        let results;

        if (query) {
            // Search mode: filter by name/colosseum_name/email
            results = await sql`
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
                    c.last_tournament,
                    c.competitor_story,
                    lr.stack,
                    COALESCE(lr.wins, 0) as wins,
                    COALESCE(lr.losses, 0) as losses,
                    lr.timezone as location
                FROM competitors c
                LEFT JOIN latest_reg lr ON LOWER(c.email) = LOWER(lr.email)
                WHERE 
                    c.name ILIKE ${'%' + query + '%'} 
                    OR c.colosseum_name ILIKE ${'%' + query + '%'}
                    OR c.email ILIKE ${'%' + query + '%'}
                ORDER BY c.updated_at DESC
                LIMIT 20;
            `;
        } else {
            // List all mode: get all gladiators sorted by activity
            results = await sql`
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
                    c.last_tournament,
                    c.competitor_story,
                    lr.stack,
                    COALESCE(lr.wins, 0) as wins,
                    COALESCE(lr.losses, 0) as losses,
                    lr.timezone as location
                FROM competitors c
                LEFT JOIN latest_reg lr ON LOWER(c.email) = LOWER(lr.email)
                ORDER BY 
                    c.updated_at DESC,
                    COALESCE(lr.wins, 0) DESC,
                    (COALESCE(lr.wins, 0) + COALESCE(lr.losses, 0)) DESC
                LIMIT 50;
            `;
        }

        return NextResponse.json({
            success: true,
            data: results
        });

    } catch (error) {
        console.error('Gladiators API error:', error);
        return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
    }
}
