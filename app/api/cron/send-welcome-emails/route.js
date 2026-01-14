import { NextResponse } from 'next/server';
import { getNextDrop } from '../../../../lib/dropsDb';
import { generateEmailContent } from '../../../../lib/emails/generator';
import { sendWelcomeEmail } from '../../../../lib/emails/sender';
import { sql } from '../../../../lib/db'; // Correct import

// Force dynamic to ensure it runs actually anew each time
export const dynamic = 'force-dynamic';

export async function GET(request) {
    // Basic security check for Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Allow running without auth in development for testing
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
    }

    try {
        // 1. Get subscribers who haven't received a welcome email yet
        // Using Neon serverless client syntax
        const pendingUsers = await sql`
            SELECT id, name, email, role 
            FROM waitlist_entries 
            WHERE welcome_email_sent IS FALSE 
            ORDER BY created_at ASC 
            LIMIT 50
        `;
        
        if (!pendingUsers || pendingUsers.length === 0) {
            return NextResponse.json({ success: true, message: 'No pending emails' });
        }

        // 2. Get Drop Info (once for the whole batch)
        const nextDrop = await getNextDrop();

        console.log(`Processing welcome emails for ${pendingUsers.length} users...`);
        const results = { sent: 0, failed: 0 };

        // 3. Process each user
        for (const user of pendingUsers) {
            try {
                // Generate content with Groq
                const emailHtml = await generateEmailContent(user, nextDrop);
                const subject = user.role === 'arena' 
                    ? '⚔️ Bienvenido a la Arena - Registro Confirmado' 
                    : '🍿 Bienvenido a Vibe Arena - Tu Lugar en las Gradas';

                // Send with Resend
                const sendResult = await sendWelcomeEmail(user.email, subject, emailHtml);

                if (sendResult.success) {
                    // Mark as sent in DB
                    await sql`
                        UPDATE waitlist_entries 
                        SET welcome_email_sent = TRUE, welcome_email_sent_at = NOW() 
                        WHERE id = ${user.id}
                    `;
                    results.sent++;
                } else {
                    console.error(`Failed to send to ${user.email}`, sendResult.error);
                    results.failed++;
                }

            } catch (err) {
                console.error(`Error processing user ${user.email}:`, err);
                results.failed++;
            }
        }

        return NextResponse.json({ 
            success: true, 
            processed: pendingUsers.length,
            results 
        });

    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
