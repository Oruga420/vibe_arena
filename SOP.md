# SOP: Vibe Arena - Quick Drop Management

This document outlines the standard operating procedures for the Vibe Arena application, specifically focusing on the Quick Drop registration and management flow.

## 1. Overview

Vibe Arena is a competitive platform where "Gladiators" (developers/creators) register for "Quick Drops". The application handles registrations, database storage via Neon, and provides a backend API for management.

## 2. Environment Setup

To run the application locally or in production, ensure the following environment variables are configured in your `.env` file:

- `DATABASE_URL`: Your Neon PostgreSQL connection string (use pooling version for serverless).
- `DROP_ENTRY_FEE_CAD`: The cost to enter the drop.
- `LIVE_DROP_ID`: The unique identifier for the current active drop.
- `LIVE_DROP_ACTIVE`: Boolean to enable/disable registrations.

## 3. Registration Flow (The "Apply" Screen)

### Step 1: Gladiator Entry

Users navigate to the `/apply` page.

- They see the current status of the drop (e.g., $1,000 Pot).
- They fill out the application form (Name, Email, Stack, GitHub, etc.).

### Step 2: Data Validation

The API (`/api/register`) validates:

- Valid email format and uniqueness.
- Valid GitHub/Social URLs.
- Agreement to Fairplay rules.
- Selection of valid Tech Stacks and Timezones.

### Step 3: Database Storage

Upon successful validation, the record is stored in the `quickdrop_registrations` table in Neon DB with a `pending` status.

## 4. Database Management

Use the Neon Console to monitor and manage registrations.

### Approving Gladiators

Currently, the status must be updated via SQL (see `quick_queries.md`):

1. Log in to [Neon Console](https://console.neon.tech).
2. Open the SQL Editor.
3. Run an `UPDATE` query to change status from `pending` to `approved`.

## 5. Deployment (Vercel)

The app is designed for Vercel.

- Ensure Environment Variables are set in the Vercel Dashboard under **Settings > Environment Variables**.
- Deployments happen automatically on push to `main`.

## 6. Troubleshooting

- **Database Error**: Check `DATABASE_URL` in Vercel. If the build fails with "No database connection string provided", the variable is missing.
- **Form Error**: Check browser console for network errors on `/api/register`.
