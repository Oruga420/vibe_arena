# 🎨 Avatar Generator Integration Guide

This document provides the necessary information for integrating the Avatar Generator with the Vibe Arena platform.

---

## 📋 Overview

The Vibe Arena platform manages gladiator registrations and generates secure tokens that allow gladiators to create their avatars. Your avatar generator will:

1. Validate a gladiator's token via our API
2. Generate the avatar
3. (Optionally) Store metadata back to our system

---

## 🔐 Authentication & Database

### Database: Neon PostgreSQL

We use **Neon** (serverless PostgreSQL) for our database.

**Connection Method:**

- You will receive a `DATABASE_URL` environment variable from the project admin.
- Format: `postgresql://user:password@host/database?sslmode=require`

**Driver/Client:**

- Node.js: `@neondatabase/serverless`
- Python: `psycopg2` or `asyncpg`
- Any PostgreSQL compatible driver works

**Example (Node.js):**

```javascript
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// Query example
const results =
  await sql`SELECT * FROM avatar_tokens WHERE email = ${"user@email.com"}`;
```

---

## 🗂️ Relevant Database Tables

### 1. `avatar_tokens`

This is the main table you'll interact with.

| Column               | Type         | Description                           |
| -------------------- | ------------ | ------------------------------------- |
| `id`                 | SERIAL       | Primary key                           |
| `email`              | VARCHAR(255) | Gladiator's email (UNIQUE)            |
| `current_token`      | VARCHAR(64)  | Active token (64-char hex)            |
| `used_token`         | VARCHAR(64)  | Previously used token                 |
| `token_generated_at` | TIMESTAMPTZ  | When current token was created        |
| `token_used`         | BOOLEAN      | If current token has been consumed    |
| `generation_enabled` | BOOLEAN      | Master flag to allow/block generation |
| `created_at`         | TIMESTAMPTZ  | Record creation time                  |
| `updated_at`         | TIMESTAMPTZ  | Last update time                      |

### 2. `quickdrop_registrations` (Read-only reference)

Contains gladiator registration data you might need for avatar generation context.

| Column           | Type         | Description                                                                   |
| ---------------- | ------------ | ----------------------------------------------------------------------------- |
| `id`             | SERIAL       | Primary key                                                                   |
| `name`           | VARCHAR(255) | Full name                                                                     |
| `colosseum_name` | VARCHAR(255) | Battle nickname (display name)                                                |
| `email`          | VARCHAR(255) | Email                                                                         |
| `stack`          | ENUM         | Tech specialty: `fullstack`, `frontend`, `backend`, `mobile`, `data`, `other` |

### 3. `competitors` (Read-only reference)

Historical data about gladiators.

| Column             | Type         | Description     |
| ------------------ | ------------ | --------------- |
| `name`             | VARCHAR(255) | Name            |
| `colosseum_name`   | VARCHAR(255) | Battle nickname |
| `email`            | VARCHAR(255) | Email           |
| `competitor_story` | TEXT         | Bio/backstory   |

---

## 🌐 API Endpoints

Base URL: `https://www.vibecodingcolosseum.com` (or staging URL provided)

### GET `/api/avatar-token?email={email}`

Check token status for a gladiator.

**Response:**

```json
{
  "success": true,
  "data": {
    "email": "gladiator@email.com",
    "current_token": "a1b2c3d4...",
    "token_used": false,
    "generation_enabled": true,
    "is_expired": false,
    "hours_until_expiry": 18,
    "generated_at": "2026-01-11T23:00:00Z"
  }
}
```

### POST `/api/avatar-token`

Validate and consume a token, or regenerate.

**Validate Token:**

```json
{
  "action": "validate",
  "email": "gladiator@email.com",
  "token": "a1b2c3d4..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Token validated and consumed"
}
```

**Regenerate Token:**

```json
{
  "action": "regenerate",
  "email": "gladiator@email.com"
}
```

---

## 🔄 Token Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKEN LIFECYCLE                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. GLADIATOR REGISTERS                                     │
│     └─► Token auto-generated (64-char hex)                  │
│                                                             │
│  2. TOKEN ACTIVE (24 hours)                                 │
│     ├─► token_used = FALSE                                  │
│     └─► generation_enabled = TRUE (if allowed)              │
│                                                             │
│  3. GLADIATOR USES AVATAR GENERATOR                         │
│     ├─► You call POST /api/avatar-token with validate       │
│     ├─► If valid: token_used = TRUE, used_token = current   │
│     └─► Avatar generation proceeds                          │
│                                                             │
│  4. TOKEN EXPIRES (after 24h)                               │
│     └─► is_expired = true in GET response                   │
│                                                             │
│  5. REGENERATION (optional)                                 │
│     └─► Admin or cron can regenerate tokens                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security Notes

1. **Tokens are single-use**: Once consumed (`token_used = TRUE`), the same token cannot be reused.
2. **24-hour expiry**: Tokens become invalid after 24 hours.
3. **Master flag**: `generation_enabled` can disable a user's ability to generate avatars.
4. **HTTPS only**: All API calls should use HTTPS.

---

## 📝 Example Integration Flow

```javascript
// 1. User arrives at your avatar generator with their email
const email = "gladiator@email.com";

// 2. Check if they have a valid token
const checkRes = await fetch(
  `https://api.vibecodingcolosseum.com/api/avatar-token?email=${email}`
);
const checkData = await checkRes.json();

if (
  !checkData.success ||
  checkData.data.token_used ||
  checkData.data.is_expired
) {
  // Show error: "No valid token available"
  return;
}

// 3. User completes avatar generation in your UI
// ... your avatar generation logic ...

// 4. Before saving, validate and consume the token
const validateRes = await fetch(
  "https://api.vibecodingcolosseum.com/api/avatar-token",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "validate",
      email: email,
      token: checkData.data.current_token,
    }),
  }
);

const validateData = await validateRes.json();

if (validateData.success) {
  // Token consumed, save the avatar
  // ... save avatar to storage ...
} else {
  // Token was invalid (maybe expired or already used)
  // ... handle error ...
}
```

---

## 📞 Contact & Credentials

For database credentials and API access:

- Contact the project admin for `.env` file with `DATABASE_URL`
- Request staging/production API access

**DO NOT** hardcode credentials in your code. Use environment variables.

---

## 📚 Additional Resources

- [Neon Documentation](https://neon.tech/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- Vibe Arena Design System: See `docs/DESIGN_SYSTEM.md` in the main repo

---

_Last updated: January 2026_
