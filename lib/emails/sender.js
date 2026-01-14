import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(toEmail, subject, htmlContent) {
    
    if (!process.env.RESEND_API_KEY) {
        console.warn('[Sender] RESEND_API_KEY is not set. Skipping email send.');
        return { success: false, error: 'Missing API Key' };
    }

    
    try {
        const data = await resend.emails.send({
            from: 'Vibe Arena <arena@vibecodingcolosseum.com>',
            to: toEmail,
            subject: subject,
            html: htmlContent,
        });



        // console.log(`[Sender] ✅ Email sent successfully! ID: ${data?.id || 'unknown'}`);
        return { success: true, data };
    } catch (error) {
        console.error('[Sender] ❌ Resend error:', error.message || error);
        return { success: false, error };
    }
}
