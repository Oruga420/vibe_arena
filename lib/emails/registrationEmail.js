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

    const context = {
      full_name: registration.name,
      arena_name: registration.colosseum_name || registration.name,
      stack: registration.stack || "Fullstack",
      github_url: registration.github_url || "N/A",
      drop_name_or_number: dropInfo ? dropInfo.name : "Next Drop",
      drop_status: dropInfo ? dropInfo.status : "UPCOMING",
      arena_link: "https://www.vibecodingcolosseum.com",
      support_email: "arena@vibecodingcolosseum.com",
    };

    const prompt = `You are the "Official Scribe of the Colosseum" at Vibe Coding Colosseum.

OBJECTIVE
Write a welcome/confirmation email for a gladiator who just registered. It should feel like a proclamation from the Colosseum (role-play), not a marketing email. Tone: epic, dark-humorous, direct, with an arena and glory vibe. No corporate clichés, no "we're excited", no startup language.

INPUTS
- Gladiator's real name: ${context.full_name}
- Colosseum name / handle: ${context.arena_name}
- Stack: ${context.stack}
- GitHub: ${context.github_url}
- Next Drop: ${context.drop_name_or_number}
- Drop Status: ${context.drop_status}
- Arena link / rules / lobby: ${context.arena_link}
- Support/contact: ${context.support_email}

REQUIRED STRUCTURE
1) Subject (1 line, short, energetic, no emojis)
2) Greeting to the gladiator using ${context.arena_name}
3) Brief paragraph reinforcing the role-play: arena, trial, fame, risk, honor (no explicit gore)
4) "Your Registration" as a clean block (max 5 lines) with fields: Name, Colosseum Name, Stack, GitHub
5) "What's Next" with 3 bullets (max 1 line each). Must include:
   - What to expect after registration (confirmation/approval or next real step)
   - What to prepare before the Drop (laptop ready, environment, repo, etc.)
   - Drop reminder: ${context.drop_name_or_number} / ${context.drop_status}
6) Closing with a playful oath/threat from the Colosseum (no insults, no graphic violence)
7) Signature: "Vibe Coding Colosseum" + a help line if support_email exists

STYLE RULES
- No "team", "community", "thanks for signing up", generic "welcome to…"
- No marketing: no "CTA" like "follow us", no "offers", no "take advantage"
- Keep the email short: ~120-180 words
- Don't overuse CAPS
- No emojis
- Dry humor allowed (1 line max), without breaking the Colosseum fantasy

LANGUAGE: Write in English (natural, not formal).

OUTPUT
Return the email in this format:
SUBJECT: [the subject here]
---
[email body in HTML using <p>, <strong>, <ul>, <li>. No markdown.]`;

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
        <h1>Your Application Has Been Received, ${registration.name}!</h1>
        <p>We've received your request to join <strong>Vibe Coding Colosseum</strong>.</p>
        <p>Our team will review your profile and notify you when you're approved for the arena.</p>
        <h2>Your Details</h2>
        <ul>
            <li><strong>Name:</strong> ${registration.name}</li>
            <li><strong>Stack:</strong> ${registration.stack || "N/A"}</li>
        </ul>
        <p><em>"It's not just code, it's a spectacle."</em></p>
        <p>— Vibe Coding Colosseum</p>
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
    const subject = emailResult.subject || `Your Colosseum Registration, ${registration.colosseum_name || registration.name
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
