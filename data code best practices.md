# data code best practices.md

## Data handling
- Keep data structures simple and documented.
- Validate external inputs at boundaries.
- Fail fast with actionable error messages.

## Security
- Never log secrets or PII.
- Use environment variables for keys.
- Sanitize user-provided data before use.

## Performance
- Avoid unnecessary re-computation.
- Prefer memoization for expensive operations.
- Keep payloads small and cache where possible.

## Quality
- Add tests for data parsing and transforms.
- Use type guards or schema validation.
