import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(toEmail, subject, htmlContent) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Skipping email send.');
        return { success: false, error: 'Missing API Key' };
    }

    try {
        const data = await resend.emails.send({
            from: 'Vibe Arena <onboarding@resend.dev>', // Use default until custom domain is verified
            to: toEmail,
            subject: subject,
            html: htmlContent,
        });

        return { success: true, data };
    } catch (error) {
        console.error('Resend error:', error);
        return { success: false, error };
    }
}
