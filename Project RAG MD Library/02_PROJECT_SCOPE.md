# 📐 Project Scope

## Vibe Coding Colosseum - Season 0

### In Scope

#### Core Features (MVP)

| Feature                        | Status  | Description                              |
| ------------------------------ | ------- | ---------------------------------------- |
| Landing Page                   | ✅ Done | Hero, rules, entry info                  |
| Gladiator Registration (Apply) | ✅ Done | Full form with GitHub, stack, timezone   |
| Waitlist System                | ✅ Done | Simple popup for spectators/gladiators   |
| Welcome Emails (Waitlist)      | ✅ Done | Daily cron job, AI-generated content     |
| Registration Emails            | ✅ Done | Immediate confirmation, dynamic language |
| Avatar Token System            | ✅ Done | Token generation for avatar creation     |
| Live Vote Status               | ✅ Done | Real-time voting window display          |
| Gladiator Dex                  | ✅ Done | Search/view registered gladiators        |
| Admin Arena Display            | ✅ Done | QR code display for voting               |
| Unified Admin Flow             | ✅ Done | Consolidated competition/drop creation   |
| Multi-language (ES/EN)         | ✅ Done | Full site + emails                       |
| Sponsor Form                   | ✅ Done | Inquiry collection                       |

#### Supporting Features

| Feature                   | Status  | Description                 |
| ------------------------- | ------- | --------------------------- |
| Theme Toggle (Dark/Light) | ✅ Done | User preference persistence |
| Language Toggle           | ✅ Done | ES/EN with localStorage     |
| Drop Configuration        | ✅ Done | ENV-based drop settings     |
| Email Validation          | ✅ Done | Alphanumeric before @       |
| Duplicate Prevention      | ✅ Done | DB-level unique constraints |

### Out of Scope (Future Seasons)

| Feature            | Priority | Notes                     |
| ------------------ | -------- | ------------------------- |
| Payment Processing | High     | Stripe/PayPal integration |
| Live Streaming     | High     | Twitch/YouTube embed      |
| Real-time Voting   | High     | WebSocket implementation  |
| User Accounts      | Medium   | Login/profile system      |
| Team Competitions  | Medium   | Multi-person teams        |
| Mobile App         | Low      | Native iOS/Android        |
| Leaderboards       | Medium   | Historical rankings       |
| Discord Bot        | Low      | Notifications, commands   |

### Technical Boundaries

#### Included

- Next.js 14 (App Router)
- Neon PostgreSQL (Serverless)
- Vercel Hosting
- Resend Email
- Groq AI (Content Generation)
- GitHub Integration

#### Excluded

- WebSocket servers (using polling for now)
- Custom authentication (no login system)
- Payment processing
- Video/streaming infrastructure

### Deployment Scope

- **Production**: vibecodingcolosseum.com
- **Staging**: Vercel Preview Deployments
- **CI/CD**: GitHub → Vercel auto-deploy

---

_Last updated: January 20, 2026_
