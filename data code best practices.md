# data code best practices.md

## Data handling

- Keep data structures simple and documented.
- Validate external inputs at boundaries.
- Fail fast with actionable error messages.

## Config

- Separate secrets from code.
- Document required env vars (see `.env.example`).
- Keep staging and prod configs aligned.
- **Vercel Setup**: Always ensure `DATABASE_URL` is configured in the Vercel Dashboard for builds to pass.
- Sanitize user-provided data before use.

## Security

- Never log secrets or PII.

## Performance

- Avoid unnecessary re-computation.
- Prefer memoization for expensive operations.
- Keep payloads small and cache where possible.

## Quality

- Add tests for data parsing and transforms.
- Use type guards or schema validation.
- **Neon DB Pattern**: Use `lib/db.js` for queries and `lib/registrations.js` for logical operations.
- **Transactions**: For critical operations, ensure atomicity using the Neon driver.
