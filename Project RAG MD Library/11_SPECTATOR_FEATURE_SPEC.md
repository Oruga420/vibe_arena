# Spectator Feature Implementation Spec

## Overview

This document details the implementation of the "Spectator" role separation in the Vibe Arena platform. The goal was to segregate users signing up solely as spectators from the main gladiator/participant waitlist to keep the competitor pool clean.

## Database Changes

### New Table: `spectators`

A dedicated table has been created to store spectator information separately from `waitlist_entries` and `quickdrop_registrations`.

**Schema:**

```sql
CREATE TABLE spectators (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'spectator',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_spectators_email ON spectators(email);
```

### Migration

- **Script Location:** `db/migrations/create_spectators_table.js`
- **Execution:** Run `node db/migrations/create_spectators_table.js` to create the table in any new environment.

## Backend Logic

### `lib/waitlist.js` update

The `addToWaitlist` function was refactored to check the `role` parameter before insertion.

- **IF `role === 'spectator'`**:
  - Inserts data into the `spectators` table.
  - Returns the new spectator record.
- **ELSE (default/other roles)**:
  - Inserts data into the standard `waitlist_entries` table.
  - Triggers existing logic (e.g., avatar token generation for gladiators).

The `isEmailInWaitlist(email, role)` function was also updated to check the appropriate table based on the provided role to ensure uniqueness within the correct context.

### API Endpoint: `/api/waitlist`

- The POST handler now extracts the `role` from the request body.
- It passes this `role` to `isEmailInWaitlist` to ensure validation checks the correct table (preventing false positives if a user is in one list but not the other).

## Frontend Integration

- **Component:** `components/WaitlistModal.jsx` (Home Page Popup).
- The form allows users to select "Spectator" as a role.
- No changes were needed in the frontend _logic_ other than ensuring the "role" value is sent correctly, which was already in place. The backend now handles the routing.

## Verification / Testing

1. **Open the App**: Navigate to the Home Page.
2. **Trigger Popup**: Wait for the `WaitlistModal` to appear (or clear `window.__waitlistDismissed` if testing repeatedly).
3. **Sign Up**:
   - Enter Name and Email.
   - Select Role: **Spectator**.
   - Submit.
4. **Verify Database**:
   - Check the `spectators` table: The record should exist.
   - Check the `waitlist_entries` table: The record should **NOT** exist.
