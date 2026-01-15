/**
 * Registration Email - Sent immediately when a gladiator applies
 */

import Groq from "groq-sdk";
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
      return { subject: null, body: getFallbackContent(registration) };
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Prepare context data
    const context = {
      full_name: registration.name,
      arena_name: registration.colosseum_name || registration.name,
      stack: registration.stack || "Fullstack",
      github_url: registration.github_url || "N/A",
      drop_name_or_number: dropInfo ? dropInfo.name : "Próximo Drop",
      drop_status: dropInfo ? dropInfo.status : "UPCOMING",
      arena_link: "https://www.vibecodingcolosseum.com",
      support_email: "arena@vibecodingcolosseum.com",
    };

    const prompt = `Actúa como el "Escritor Oficial del Coliseo" de Vibe Coding Colosseum.

OBJETIVO
Escribir un email de bienvenida/confirmación para un gladiador que acaba de registrarse. Debe sentirse como una proclamación del Coliseo (rol-play), no como email de marketing. Tono: épico, oscuro-divertido, directo, con vibra de arena y gloria. Español natural (LatAm), sin clichés corporativos, sin "estamos emocionados", sin lenguaje de startup.

INSUMOS
- Nombre real del gladiador: ${context.full_name}
- Nombre de coliseo / handle: ${context.arena_name}
- Stack: ${context.stack}
- GitHub: ${context.github_url}
- Próximo Drop: ${context.drop_name_or_number}
- Estado del Drop: ${context.drop_status}
- Link al tablero / reglas / lobby: ${context.arena_link}
- Soporte/contacto: ${context.support_email}

ESTRUCTURA OBLIGATORIA
1) Subject (1 línea, corto, con energía, sin emojis)
2) Saludo al gladiador usando ${context.arena_name}
3) Párrafo breve que refuerce el rol-play: arena, prueba, fama, riesgo, honor (sin gore explícito)
4) "Tu registro" como bloque limpio (máx 5 líneas) con los campos: Nombre, Nombre de coliseo, Stack, GitHub
5) "Lo que sigue" con 3 bullets (máx 1 línea cada bullet). Debe incluir:
   - Qué esperar después del registro (confirmación/aprobación o siguiente paso real)
   - Qué preparar antes del Drop (laptop lista, entorno, repo, etc. sin tecnicismos excesivos)
   - Recordatorio del Drop: ${context.drop_name_or_number} / ${context.drop_status}
6) Cierre con una frase tipo juramento/amenaza juguetona del Coliseo (sin insultos, sin violencia gráfica)
7) Firma: "Vibe Coding Colosseum" + una línea de "ayuda" si existe support_email

REGLAS DE ESTILO
- Nada de "equipo", "comunidad", "gracias por registrarte", "bienvenido a…" genérico.
- Nada de marketing: no "CTA" tipo "síguenos", no "ofertas", no "aprovecha".
- Mantén el email corto: 120–180 palabras aprox.
- No uses MAYÚSCULAS en exceso.
- No uses emojis.
- Humor seco permitido (1 línea máximo), sin romper la fantasía del Coliseo.

SALIDA
Devuélveme el email en formato:
SUBJECT: [el subject aquí]
---
[cuerpo del email en HTML usando <p>, <strong>, <ul>, <li>. Sin markdown.]`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    let response = completion.choices[0]?.message?.content || "";
    
    // Parse subject and body from response
    let subject = null;
    let emailBody = response;
    
    if (response.includes("SUBJECT:") && response.includes("---")) {
      const parts = response.split("---");
      subject = parts[0].replace("SUBJECT:", "").trim();
      emailBody = parts.slice(1).join("---").trim();
    }
    
    // Clean up any markdown artifacts
    emailBody = emailBody
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    return { subject, body: emailBody };
  } catch (error) {
    console.error("[RegistrationEmail] Groq generation error:", error);
    return { subject: null, body: getFallbackContent(registration) };
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
    const emailResult = await generateRegistrationEmail(registration, dropInfo);
    
    // Use AI-generated subject or fallback
    const subject = emailResult.subject || `Tu registro en el Coliseo, ${
      registration.colosseum_name || registration.name
    }`;

    const data = await resend.emails.send({
      from: "Vibe Coding Colosseum <arena@vibecodingcolosseum.com>",
      to: registration.email,
      subject: subject,
      html: emailResult.body,
    });

    return { success: true, data };
  } catch (error) {
    console.error("[RegistrationEmail] Send error:", error.message || error);
    return { success: false, error };
  }
}
