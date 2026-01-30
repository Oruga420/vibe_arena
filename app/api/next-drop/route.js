import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

/**
 * Get the current active drop from the competitions database
 * Based on: INTEGRACION_DROPS_COLISEO_MAIN.md
 */
async function getCurrentDrop() {
    // Use the Vibe Arena database URL
    const dbUrl = process.env.DROPS_DATABASE_URL || process.env.DATABASE_URL;

    if (!dbUrl) {
        console.warn("[next-drop] No database URL configured");
        return null;
    }

    try {
        const sql = neon(dbUrl);

        // Query for OPEN competitions (drops), ordered by creation date
        const drops = await sql`
            SELECT 
                id,
                name,
                status,
                "createdAt" as created_at,
                "updatedAt" as updated_at
            FROM competitions
            WHERE status = 'OPEN'
            ORDER BY "createdAt" DESC
            LIMIT 1
        `;

        return drops[0] || null;
    } catch (error) {
        console.error("[next-drop] Database error:", error.message || error);
        return null;
    }
}

export async function GET() {
    try {
        const drop = await getCurrentDrop();

        if (!drop) {
            // No open drops - we're planning the next one
            return NextResponse.json(
                {
                    status: "PLANNING",
                    name: null,
                    hasOpenDrops: false,
                    dropDate: null
                },
                { headers: { "Cache-Control": "no-store, max-age=0" } }
            );
        }

        // Active drop found
        return NextResponse.json(
            {
                id: drop.id,
                name: drop.name,
                status: drop.status,
                hasOpenDrops: true,
                dropDate: drop.created_at,
                createdAt: drop.created_at,
                updatedAt: drop.updated_at
            },
            { headers: { "Cache-Control": "no-store, max-age=0" } }
        );
    } catch (error) {
        console.error("[API] next-drop error:", error);
        return NextResponse.json(
            { status: "PLANNING", name: null, hasOpenDrops: false, error: true },
            { status: 500, headers: { "Cache-Control": "no-store" } }
        );
    }
}
