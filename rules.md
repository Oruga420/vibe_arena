# rules.md

## General

- Keep changes minimal and focused.
- Preserve existing design language.
- Do not remove features without confirmation.

## Frontend

- Maintain responsive layouts.
- Avoid heavy animations; respect prefers-reduced-motion.
- Use shared components when possible.

## Backend (Neon / Node.js)

- Validate inputs using the patterns in `app/api/register/route.js`.
- Use the central database client in `lib/db.js`.
- Log database errors with context but without leaking PII.

## Git

- Use clear commit messages.
- Do not force-push unless asked.
