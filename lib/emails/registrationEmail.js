/**
 * Registration Email - Sent immediately when a gladiator applies
 */

import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate email content for registration confirmation
 */
async function generateRegistrationEmail(registration, dropInfo) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.warn(
        "[RegistrationEmail] GROQ_API_KEY missing, using fallback content."
      );
      return getFallbackContent(registration);
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const templatePath = path.join(
      process.cwd(),
      "lib",
      "emails",
      "templates",
      "gladiator-registration.md"
    );

    let templateContent;
    try {
      templateContent = fs.readFileSync(templatePath, "utf8");
    } catch (err) {
      console.error("Error reading registration template:", err);
      return getFallbackContent(registration);
    }

    const context = {
      name: registration.name,
      colosseum_name: registration.colosseum_name || registration.name,
      stack: registration.stack || "Fullstack",
      github_url: registration.github_url || "N/A",
      dropName: dropInfo ? dropInfo.name : "Próximamente",
      dropDate: dropInfo
        ? new Date(dropInfo.created_at).toLocaleDateString()
        : "TBA",
      dropStatus: dropInfo ? dropInfo.status : "Planning",
    };

    const prompt = `
            Task: Write a confirmation email for a gladiator who just applied to Vibe Coding Colosseum.
            Tone: Futuristic, hype, competitive, but professional. "Gladiator Cyberpunk" vibe.
            Language: Spanish.
            
            Gladiator Data:
            - Name: ${context.name}
            - Colosseum Name: ${context.colosseum_name}
            - Tech Stack: ${context.stack}
            - GitHub: ${context.github_url}
            
            Event Data:
            - Next Drop: ${context.dropName}
            - Status: ${context.dropStatus}
            
            Reference Template (use this structure but enhance the copy):
            ${templateContent}
            
            Output ONLY the HTML body content for the email. Use <h1>, <h2>, <p>, <ul> tags. No markdown.
            Keep it under 350 words. Make it feel exclusive and exciting.
        `;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    let emailBody = completion.choices[0]?.message?.content || "";
    emailBody = emailBody
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    return emailBody;
  } catch (error) {
    console.error("[RegistrationEmail] Groq generation error:", error);
    return getFallbackContent(registration);
  }
}

/**
 * Fallback content if AI fails
 */
function getFallbackContent(registration) {
  return `
        <h1>⚔️ ¡Tu Aplicación ha sido Recibida, ${registration.name}!</h1>
        <p>Hemos recibido tu solicitud para unirte a <strong>Vibe Coding Colosseum</strong>.</p>
        <p>Nuestro equipo revisará tu perfil y te notificaremos cuando seas aprobado para la arena.</p>
        <h2>Tus Datos</h2>
        <ul>
            <li><strong>Nombre:</strong> ${registration.name}</li>
            <li><strong>Stack:</strong> ${registration.stack || "N/A"}</li>
        </ul>
        <p><em>"No es solo código, es un espectáculo."</em></p>
        <p>— Vibe Coding Colosseum Team</p>
    `;
}

/**
 * Send registration confirmation email
 * @param {Object} registration - The registration data from quickdrop_registrations
 * @param {Object} dropInfo - Optional drop info
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export async function sendRegistrationConfirmation(
  registration,
  dropInfo = null
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[RegistrationEmail] RESEND_API_KEY not set. Skipping email.");
    return { success: false, error: "Missing API Key" };
  }

  try {
    const emailHtml = await generateRegistrationEmail(registration, dropInfo);
    const subject = `⚔️ ¡Aplicación Recibida, ${
      registration.colosseum_name || registration.name
    }!`;

    const data = await resend.emails.send({
      from: "Vibe Arena <arena@vibecodingcolosseum.com>",
      to: registration.email,
      subject: subject,
      html: emailHtml,
    });

    return { success: true, data };
  } catch (error) {
    console.error("[RegistrationEmail] Send error:", error.message || error);
    return { success: false, error };
  }
}
