# 📦 Modules Reference

## lib/ Modules

### db.js

```javascript
// Database connection for primary Neon database
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);
export { sql };
```

**Usage**: Import `sql` for all main database queries.

---

### dropsDb.js

```javascript
export async function getNextDrop()
```

**Purpose**: Connect to drops/competitions database (purple-dust).

| Function        | Description                  | Returns                             |
| --------------- | ---------------------------- | ----------------------------------- |
| `getNextDrop()` | Get next/current competition | `{id, name, status, ...}` or `null` |

---

### registrations.js

```javascript
export async function createRegistration(data)
export async function isEmailRegistered(email)
export async function getRegistrationByEmail(email)
export async function getRegistrations(options)
export async function updateRegistrationStatus(id, status)
```

| Function                                    | Description                                                      | Returns              |
| ------------------------------------------- | ---------------------------------------------------------------- | -------------------- |
| `createRegistration(data)`                  | Insert new gladiator, sync with competitors, create avatar token | Registration object  |
| `isEmailRegistered(email)`                  | Check if email exists                                            | Boolean              |
| `getRegistrationByEmail(email)`             | Get single registration                                          | Registration or null |
| `getRegistrations({dropId, status, limit})` | List registrations with filters                                  | Array                |
| `updateRegistrationStatus(id, status)`      | Update status field                                              | Updated registration |

---

### waitlist.js

```javascript
export async function isEmailInWaitlist(email)
export async function addToWaitlist(data)
```

| Function                             | Description                                    | Returns      |
| ------------------------------------ | ---------------------------------------------- | ------------ |
| `isEmailInWaitlist(email)`           | Check if email exists in waitlist              | Boolean      |
| `addToWaitlist({name, email, role})` | Add entry, create avatar token if role='arena' | Entry object |

---

### avatarTokens.js

```javascript
export async function createAvatarToken(email)
export async function getTokenByEmail(email)
export async function validateAndConsumeToken(email, token)
export async function regenerateToken(email)
export async function incrementGenerationCount(email)
```

| Function                                | Description                        | Returns            |
| --------------------------------------- | ---------------------------------- | ------------------ |
| `createAvatarToken(email)`              | Generate new 32-char token         | `{token, email}`   |
| `getTokenByEmail(email)`                | Get current token status           | Token data or null |
| `validateAndConsumeToken(email, token)` | Check token, mark as used          | `{valid, message}` |
| `regenerateToken(email)`                | Create new token for existing user | New token data     |
| `incrementGenerationCount(email)`       | Increase generation counter        | Updated count      |

---

### dropConfig.js

```javascript
export function getDropConfig()
```

**Returns drop configuration from ENV:**

```javascript
{
  id: DROP_ID,
  entryFee: DROP_ENTRY_FEE_CAD,        // default: 100
  minGladiators: DROP_MIN_GLADIATORS,   // default: 10
  maxGladiators: DROP_MAX_GLADIATORS,   // default: 15
  prizePct: DROP_PRIZE_PCT,             // default: 60
  housePct: DROP_HOUSE_PCT,             // default: 40
  status: DROP_STATUS                   // default: 'open'
}
```

---

### sponsors.js

```javascript
export async function createSponsorInquiry(data)
export async function getSponsorInquiries()
```

| Function                     | Description                  | Returns        |
| ---------------------------- | ---------------------------- | -------------- |
| `createSponsorInquiry(data)` | Save sponsor form submission | Inquiry object |
| `getSponsorInquiries()`      | List all inquiries           | Array          |

---

## lib/emails/ Modules

### sender.js

```javascript
export async function sendWelcomeEmail(subscriber, dropInfo)
```

**Purpose**: Send welcome email to waitlist subscribers.

- Uses Resend API
- Calls `generateEmailContent()` for AI content

---

### generator.js

```javascript
export async function generateEmailContent(subscriber, dropInfo)
```

**Purpose**: Generate email content using Groq AI.

- Reads template from `templates/` folder
- Role-specific templates (arena vs spectator)
- Fallback content if AI fails

---

### registrationEmail.js

```javascript
export async function sendRegistrationConfirmation(registration, dropInfo)
```

**Purpose**: Send immediate confirmation after Apply form.

- Dynamic language based on `registration.language`
- AI-generated content with Colosseum theme
- Non-blocking (doesn't fail registration if email fails)

**Internal Functions:**

- `generateRegistrationEmail(registration, dropInfo)` - AI content generation
- `getFallbackContent(registration)` - Static fallback

---

## components/ Modules

### LanguageProvider.jsx

```javascript
export function LanguageProvider({ children })
export function useLanguage()
```

**Exports:**

- `LanguageProvider` - Context provider wrapping app
- `useLanguage()` - Hook returning `{language, setLanguage, t}`

**Features:**

- Full ES/EN translations (~1200 lines)
- `t('path.to.key')` function for translation
- `localStorage` persistence

---

### ApplyForm.jsx

```javascript
export default function ApplyForm()
```

**Form Fields:** name, colosseum_name, email, timezone, stack, github, x, linkedin, demo, fairplay
**Features:**

- Validation with error messages
- Browser language detection
- Drop status integration

---

### WaitlistModal.jsx

```javascript
export default function WaitlistModal({ isOpen, onClose })
```

**Props:**

- `isOpen`: Boolean to show/hide
- `onClose`: Callback when closing

---

### GladiatorInterface.jsx

```javascript
export default function GladiatorInterface()
```

**Features:**

- Search by name/colosseum_name
- Avatar display
- Win/loss stats
- Tech stack display

---

### useDropStatus.js

```javascript
export default function useDropStatus(interval)
```

**Hook for fetching drop configuration:**

- `interval`: 'fast' (5s), 'slow' (30s), 'off' (no polling)
- Returns: `{data, error, loading}`

---

### dropFormat.js

```javascript
export function buildDropTokens(config)
export function formatTemplate(template, tokens)
```

**Purpose:** Template string replacement for drop values.

---

### ThemeToggle.jsx

```javascript
export default function ThemeToggle()
```

**Features:**

- Dark/Light mode toggle
- localStorage persistence
- System preference detection

---

### LiveVoteStatus.jsx

```javascript
export default function LiveVoteStatus()
```

**Displays voting status based on competition state.**

---

## API Routes

### /api/register/route.js

- **POST**: Create gladiator registration
- Validates all fields
- Sends confirmation email

### /api/waitlist/route.js

- **POST**: Add to waitlist
- Creates avatar token for arena role

### /api/gladiators/route.js

- **GET**: Search/list gladiators
- Aggregates from multiple tables

### /api/drop-status/route.js

- **GET**: Return drop configuration

### /api/avatar-token/route.js

- **GET**: Get token by email
- **POST**: Validate/consume token

### /api/sponsors/route.js

- **POST**: Submit sponsor inquiry

### /api/cron/send-welcome-emails/route.js

- **GET**: Process pending welcome emails
- Protected by CRON_SECRET header

---

_Last updated: January 20, 2026_
