-- =============================================
-- Migration: Fix Waitlist Email Duplicates
-- Purpose: Clean duplicates and add UNIQUE constraint
-- Date: 2026-01-27
-- =============================================

-- Step 1: View current duplicates (for reference)
-- SELECT email, COUNT(*), array_agg(id ORDER BY created_at) as ids
-- FROM waitlist_entries
-- GROUP BY email
-- HAVING COUNT(*) > 1;

-- Step 2: Delete duplicates, keeping the OLDEST entry (first registration)
-- This uses a CTE to identify duplicates and delete all but the first
DELETE FROM waitlist_entries
WHERE id NOT IN (
    SELECT DISTINCT ON (email) id
    FROM waitlist_entries
    ORDER BY email, created_at ASC
);

-- Step 3: Add UNIQUE constraint to prevent future duplicates
ALTER TABLE waitlist_entries
ADD CONSTRAINT waitlist_entries_email_unique UNIQUE (email);

-- Step 4: Verify the constraint was added
-- \d waitlist_entries
