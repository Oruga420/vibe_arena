# deploy best practices .md

## Build
- Use reproducible builds.
- Keep dependencies up to date.
- Fail builds on lint/type errors where applicable.

## Config
- Separate secrets from code.
- Document required env vars.
- Keep staging and prod configs aligned.

## Release
- Tag releases.
- Roll out with small, reversible changes.
- Keep a rollback plan.

## Monitoring
- Add basic uptime and error monitoring.
- Track performance regressions after deploy.
