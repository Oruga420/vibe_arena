import { NextResponse } from "next/server";
import sql from "../../../lib/db.js";
import { getAvatarToken, createAvatarToken } from "../../../lib/avatarTokens.js";

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json({ authorized: false }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check quickdrop_registrations first
        const registrations = await sql`
            SELECT name, colosseum_name, email
            FROM quickdrop_registrations
            WHERE LOWER(email) = ${normalizedEmail}
            LIMIT 1
        `;

        // Fallback to competitors
        let gladiator = registrations[0] || null;
        if (!gladiator) {
            const competitors = await sql`
                SELECT name, colosseum_name, email
                FROM competitors
                WHERE LOWER(email) = ${normalizedEmail}
                LIMIT 1
            `;
            gladiator = competitors[0] || null;
        }

        if (!gladiator) {
            return NextResponse.json({ authorized: false });
        }

        // Get or create avatar token
        let tokenRecord = await getAvatarToken(gladiator.email);
        if (!tokenRecord) {
            tokenRecord = await createAvatarToken(gladiator.email);
        }

        return NextResponse.json({
            authorized: true,
            email: gladiator.email,
            token: tokenRecord?.current_token || null,
            name: gladiator.colosseum_name || gladiator.name || null,
        });
    } catch (error) {
        console.error("Cage gateway error:", error);
        return NextResponse.json(
            { authorized: false, error: "Server error" },
            { status: 500 }
        );
    }
}
