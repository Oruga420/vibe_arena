import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function generateEmailContent(subscriber, dropInfo) {
    try {
        // Select template based on role
        const templateName = subscriber.role === 'spectator' ? 'spectator-welcome.md' : 'arena-welcome.md';
        const templatePath = path.join(process.cwd(), 'lib', 'emails', 'templates', templateName);
        
        let templateContent;
        try {
            templateContent = fs.readFileSync(templatePath, 'utf8');
        } catch (err) {
            console.error(`Error reading template ${templateName}:`, err);
            // Fallback content if template read fails
            return `Welcome ${subscriber.name}! Thanks for joining Vibe Arena.`;
        }

        // Prepare context data
        const context = {
            name: subscriber.name,
            role: subscriber.role,
            dropName: dropInfo ? dropInfo.name : 'Próximamente',
            dropDate: dropInfo ? new Date(dropInfo.created_at).toLocaleDateString() : 'TBA',
            dropStatus: dropInfo ? dropInfo.status : 'Planning'
        };

        // If we want FULL AI generation (rewrite the whole thing):
        const prompt = `
            Task: Write a welcome email for Vibe Arena based on the following template and data.
            Tone: Futuristic, hype, competitive, but professional. "Gladiator Cyberpunk" vibe.
            Language: Spanish.
            
            Subscriber Data:
            - Name: ${context.name}
            - Role: ${context.role} (${context.role === 'arena' ? 'Competitor' : 'Viewer'})
            
            Event Data:
            - Next Event: ${context.dropName}
            - Date: ${context.dropDate}
            - Status: ${context.dropStatus}
            
            Reference Template (use this structure but enhance the copy):
            ${templateContent}
            
            Output ONLY the HTML body content for the email. Use <h1>, <h2>, <p>, <ul> tags. No markdown code blocks.
            Keep it under 300 words.
        `;

        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'llama-3.3-70b-versatile',
        });

        let emailBody = completion.choices[0]?.message?.content || '';
        
        // Cleanup if AI returns markdown code blocks
        emailBody = emailBody.replace(/```html/g, '').replace(/```/g, '').trim();

        return emailBody;

    } catch (error) {
        console.error('Groq generation error:', error);
        // Fallback to simple replacement if AI fails
        return `<h1>Bienvenido a Vibe Arena, ${subscriber.name}</h1><p>Gracias por unirte.</p>`;
    }
}
