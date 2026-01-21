# 🗄️ Database Connections

## Overview

The project uses **two separate Neon PostgreSQL databases**:

| Database             | Purpose               | ENV Variable         | Location       |
| -------------------- | --------------------- | -------------------- | -------------- |
| Primary (vibe_arena) | Main app data         | `DATABASE_URL`       | lib/db.js      |
| Drops (purple-dust)  | Competition/drop data | `DROPS_DATABASE_URL` | lib/dropsDb.js |

---

## Primary Database (`DATABASE_URL`)

### Connection Configuration

```javascript
// lib/db.js
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
export { sql };
```

### Tables

#### `waitlist_entries`

| Column             | Type                | Description            |
| ------------------ | ------------------- | ---------------------- |
| id                 | SERIAL              | Primary key            |
| name               | VARCHAR(255)        | User's name            |
| email              | VARCHAR(255) UNIQUE | User's email           |
| role               | VARCHAR(50)         | 'arena' or 'spectator' |
| created_at         | TIMESTAMP           | Registration date      |
| welcome_email_sent | BOOLEAN             | Email sent flag        |

#### `quickdrop_registrations`

| Column          | Type                | Description         |
| --------------- | ------------------- | ------------------- |
| id              | SERIAL              | Primary key         |
| name            | VARCHAR(255)        | Gladiator's name    |
| colosseum_name  | VARCHAR(255)        | Arena nickname      |
| email           | VARCHAR(255) UNIQUE | Email               |
| timezone        | VARCHAR(50)         | Timezone code       |
| stack           | VARCHAR(50)         | Tech stack          |
| github_url      | TEXT                | GitHub profile URL  |
| x_url           | TEXT                | Twitter/X URL       |
| linkedin_url    | TEXT                | LinkedIn URL        |
| demo_interest   | VARCHAR(10)         | 'yes' or 'no'       |
| fairplay_agreed | BOOLEAN             | Rules acceptance    |
| drop_id         | INTEGER             | Associated drop     |
| status          | VARCHAR(50)         | Registration status |
| wins            | INTEGER DEFAULT 0   | Win count           |
| losses          | INTEGER DEFAULT 0   | Loss count          |
| created_at      | TIMESTAMP           | Registration date   |

#### `competitors`

| Column         | Type                | Description      |
| -------------- | ------------------- | ---------------- |
| id             | SERIAL              | Primary key      |
| email          | VARCHAR(255) UNIQUE | Email            |
| name           | VARCHAR(255)        | Name             |
| colosseum_name | VARCHAR(255)        | Arena name       |
| github_url     | TEXT                | GitHub           |
| stack          | VARCHAR(50)         | Tech stack       |
| avatar_url     | TEXT                | Avatar image URL |
| wins           | INTEGER DEFAULT 0   | Total wins       |
| losses         | INTEGER DEFAULT 0   | Total losses     |
| created_at     | TIMESTAMP           | First appearance |
| updated_at     | TIMESTAMP           | Last update      |

#### `avatar_tokens`

| Column           | Type                | Description     |
| ---------------- | ------------------- | --------------- |
| id               | SERIAL              | Primary key     |
| email            | VARCHAR(255) UNIQUE | User email      |
| current_token    | VARCHAR(64)         | Active token    |
| token_used       | BOOLEAN             | Token consumed  |
| token_created_at | TIMESTAMP           | Token creation  |
| generation_count | INTEGER DEFAULT 0   | Times generated |
| max_generations  | INTEGER DEFAULT 4   | Limit           |

#### `sponsor_inquiries`

| Column       | Type         | Description         |
| ------------ | ------------ | ------------------- |
| id           | SERIAL       | Primary key         |
| company      | VARCHAR(255) | Company name        |
| contact_name | VARCHAR(255) | Contact person      |
| email        | VARCHAR(255) | Contact email       |
| website      | TEXT         | Company website     |
| areas        | TEXT[]       | Sponsorship areas   |
| theme        | TEXT         | Suggested theme     |
| pain_point   | TEXT         | Problem to solve    |
| sponsor_type | VARCHAR(50)  | cash/inkind/mix     |
| budget       | VARCHAR(50)  | Budget range        |
| visibility   | VARCHAR(50)  | Desired visibility  |
| timeline     | VARCHAR(100) | Activation timeline |
| notes        | TEXT         | Additional notes    |
| created_at   | TIMESTAMP    | Inquiry date        |

---

## Drops Database (`DROPS_DATABASE_URL`)

### Connection Configuration

```javascript
// lib/dropsDb.js
import { neon } from "@neondatabase/serverless";

const dropsSql = neon(process.env.DROPS_DATABASE_URL);

export async function getNextDrop() {
  // Query competitions table
}
```

### Tables

#### `competitions`

| Column        | Type         | Description          |
| ------------- | ------------ | -------------------- |
| id            | SERIAL       | Primary key          |
| name          | VARCHAR(255) | Drop name            |
| status        | VARCHAR(50)  | OPEN/CLOSED/UPCOMING |
| voting_status | VARCHAR(50)  | Voting state         |
| created_at    | TIMESTAMP    | Creation date        |
| starts_at     | TIMESTAMP    | Drop start time      |
| ends_at       | TIMESTAMP    | Drop end time        |

---

## Connection Patterns

### Serverless Driver Usage

```javascript
// Tagged template for parameterized queries (SQL injection safe)
const result = await sql`
  SELECT * FROM users WHERE email = ${email}
`;

// No connection pool management needed
// Each request creates a new connection
```

### Error Handling

```javascript
try {
  const result = await sql`SELECT * FROM table`;
  return result;
} catch (error) {
  console.error("Database error:", error);
  return null; // Graceful fallback
}
```

---

## Environment Variables

```bash
# Primary database (vibe_arena)
DATABASE_URL=postgresql://user:pass@host/vibe_arena?sslmode=require

# Drops database (purple-dust)
DROPS_DATABASE_URL=postgresql://user:pass@host/purple-dust?sslmode=require
```

### URL Format

```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

**Important**: Always include `?sslmode=require` for Neon connections.

---

## Migrations

Database migrations are stored in `db/` folder:

- `schema.sql` - Main schema
- Migration files follow pattern: `YYYY-MM-DD_description.sql`

### Running Migrations

```bash
# Connect via psql or Neon console
psql $DATABASE_URL < db/schema.sql
```

---

_Last updated: January 20, 2026_
