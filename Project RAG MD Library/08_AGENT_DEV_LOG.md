# 🤖 Agent Development Log

## Purpose

This document tracks the AI agent's (Antigravity/Claude) programming decisions, rationale, and development patterns used while building Vibe Coding Colosseum.

---

## Session: January 15, 2026

### Decision Log

#### 1. Email System Architecture

**Problem:** Need to send welcome emails to waitlist subscribers and confirmation emails for Apply form registrations.

**Options Considered:**

1. Single email system with templates
2. Separate systems for each email type
3. AI-generated content for all emails

**Decision:** Separate modules with AI generation

- `lib/emails/sender.js` → Waitlist welcome emails (cron-based)
- `lib/emails/registrationEmail.js` → Apply confirmation (immediate)
- `lib/emails/generator.js` → AI content generation utility

**Rationale:**

- Different timing requirements (batch vs immediate)
- Different data contexts (waitlist vs full registration)
- Shared AI generation can be factored out later

---

#### 2. Dynamic Language for Emails

**Problem:** Emails were hardcoded in Spanish, but users might have English browsers.

**Options Considered:**

1. Always send in Spanish (default market)
2. Detect from timezone selection
3. Capture browser `navigator.language`

**Decision:** Capture `navigator.language` from frontend

**Implementation:**

```javascript
// Frontend (ApplyForm.jsx)
const browserLang = navigator.language || "es";
body.language = browserLang.startsWith("es") ? "es" : "en";

// Backend (registrationEmail.js)
const langInstruction =
  userLang === "en"
    ? "Write in English (natural, not formal)."
    : "Escribe en Español natural (LatAm).";
```

**Rationale:**

- Most accurate signal of user's language preference
- Simple binary (es/en) covers 99% of use cases
- Default to Spanish for LatAm market focus

---

#### 3. Non-Blocking Email Sending

**Problem:** If email sending fails, should registration fail too?

**Decision:** No - registration should succeed even if email fails.

**Implementation:**

```javascript
try {
  const emailResult = await sendRegistrationConfirmation(...);
  if (!emailResult.success) {
    console.warn('[Register] Email failed but registration succeeded');
  }
} catch (emailError) {
  console.error('[Register] Email error (non-blocking):', emailError);
}
// Registration continues regardless
```

**Rationale:**

- Email is secondary to data capture
- External service failures shouldn't break core flow
- Can retry emails later if needed
- Better UX (user sees success, not confusing error)

---

#### 4. AI Prompt Engineering for Emails

**Problem:** Generic AI prompts produced marketing-style, inauthentic emails.

**Solution:** Detailed "Escritor Oficial del Coliseo" prompt with:

- Clear structure (7 mandatory sections)
- Negative constraints (no "gracias", no emojis, no CTA)
- Tone guidance (épico, oscuro-divertido)
- Word limits (120-180 words)

**Key Prompt Elements:**

```
OBJETIVO
Escribir un email de bienvenida/confirmación...
Tono: épico, oscuro-divertido, directo...

REGLAS DE ESTILO
- Nada de "equipo", "comunidad"...
- Nada de marketing...
- Mantén el email corto: 120–180 palabras
- No uses emojis
- Humor seco permitido (1 línea máximo)

IDIOMA: ${langInstruction}
```

**Rationale:**

- LLMs follow detailed instructions better
- Negative examples prevent common failure modes
- Structured output format enables parsing

---

#### 5. Database Driver Unification

**Problem:** Mixed usage of `pg` Pool and `@neondatabase/serverless`.

**Decision:** Standardize on `@neondatabase/serverless` everywhere.

**Rationale:**

- Consistent API across modules
- Better suited for serverless environment
- No connection pool management overhead
- Tagged template syntax prevents SQL injection

---

#### 6. Validation Strategy

**Problem:** Need to validate emails but allow legitimate variations.

**Decision:** Strict alphanumeric before @

```javascript
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
```

**Rationale:**

- Prevents most spam/fake signups
- Still allows common valid formats
- Easy to explain to users
- Consistent across waitlist and apply form

---

#### 7. PR Workflow

**User Preference Learned:**

- Never push directly to main
- Create feature branch → PR → Merge
- Delete/close old PRs before creating new ones (Vercel pipeline consideration)
- Squash merge for clean history

**Workflow:**

```bash
git checkout -b feat/feature-name
# make changes
git add .
git commit -m "feat: description"
git push -u origin feat/feature-name
# Create PR via GitHub MCP
# Wait for approval
# Squash merge
```

---

#### 8. Test User Management

**Pattern:** Reset scripts for testing

```javascript
// scripts/reset-user.js
const email = "test@example.com";
await sql`DELETE FROM quickdrop_registrations WHERE email = ${email}`;
await sql`DELETE FROM avatar_tokens WHERE email = ${email}`;
await sql`DELETE FROM waitlist_entries WHERE email = ${email}`;
```

**Rationale:**

- Quick test iteration
- Doesn't require direct DB access
- Can run locally with .env

---

## Development Patterns

### Error Handling Philosophy

1. Log everything server-side
2. Show user-friendly messages client-side
3. Never expose internal errors to UI
4. Use console.warn for recoverable issues
5. Use console.error for critical failures

### Code Organization

- `lib/` for shared business logic
- `components/` for React components
- `app/api/` for API routes
- `scripts/` for CLI utilities
- `db/` for migrations

### Documentation Approach

- This RAG library for reference
- Inline comments for complex logic
- JSDoc for function signatures
- README for setup instructions

---

## Lessons Learned

1. **Vercel Preview URLs**: `NEXT_PUBLIC_APP_URL` must be valid or detection fails
2. **Neon Connection Strings**: Must include `?sslmode=require`
3. **Groq API**: Returns markdown code blocks, need to strip them
4. **PowerShell**: `&&` doesn't work, use `;` or separate commands
5. **Email Threading**: Unique subjects prevent email clients from threading

---

---

## Session: January 20, 2026

### Decision Log

#### 1. Drop Duration Adjustment (2h -> 1h)

**Problem:** User request to change the drop duration from 2 hours to 1 hour (60 minutes) to increase intensity or match new format requirements.

**Action:** Global search and replace across the codebase.

**Affected Modules:**

- `components/LanguageProvider.jsx` (ES/EN translations)
- `app/layout.js` (Meta description)
- Documentation files (`01_PROJECT_OBJECTIVE.md`)

**Rationale:**

- Simpler format
- Higher intensity
- "60 minutes" is a stronger marketing hook

#### 2. Developer Documentation Expansion (Groq)

**Problem:** Need to onboard external devs to use the Groq integration for image prompt generation.

**Solution:** Created `10_GROQ_INTEGRATION_GUIDE.md`.

**Content:**

- Setup instructions
- Code snippet for prompt generation
- Specific system prompt for "Vibe Arena" style
- Frontend/Backend example flow

**Rationale:**

- Self-contained guide prevents knowledge silos
- Provides copy-pasteable code to avoid errors
- Enforces consistency in prompt engineering style (Cyberpunk/Neon)

#### 3. Admin Flow Unification

**Context:** Previously merged `Create Competition` and `Create Drop` flows.

**Update:** Documented this change in `02_PROJECT_SCOPE.md` as "Unified Admin Flow".

**Rationale:**

- Simplified admin maintenance
- Single source of truth for drop creation

---

_This log is updated with each development session._
