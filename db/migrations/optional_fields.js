/**
 * Migration: Make timezone, stack, github_url optional
 * - Adds 'none' to stack_type enum
 * - Drops NOT NULL from timezone, stack, github_url
 * - Updates github CHECK to allow NULL
 * - Sets default for stack to 'none'
 */

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
    console.log('🔧 Starting migration: optional fields...');

    try {
        // 1. Add 'none' to stack_type enum
        await sql`ALTER TYPE stack_type ADD VALUE IF NOT EXISTS 'none'`;
        console.log('✅ Added none to stack_type enum');

        // 2. Drop NOT NULL from timezone
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN timezone DROP NOT NULL`;
        console.log('✅ timezone is now nullable');

        // 3. Set stack default to 'none' and drop NOT NULL
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN stack SET DEFAULT 'none'`;
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN stack DROP NOT NULL`;
        console.log('✅ stack defaults to none, now nullable');

        // 4. Drop NOT NULL from github_url
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN github_url DROP NOT NULL`;
        console.log('✅ github_url is now nullable');

        // 5. Update github CHECK constraint to allow NULL
        await sql`ALTER TABLE quickdrop_registrations DROP CONSTRAINT IF EXISTS valid_github`;
        await sql`ALTER TABLE quickdrop_registrations ADD CONSTRAINT valid_github CHECK (github_url IS NULL OR github_url ~* '^https?://(www\\.)?github\\.com/.+')`;
        console.log('✅ github CHECK updated to allow NULL');

        // 6. Drop NOT NULL from demo_interest
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN demo_interest DROP NOT NULL`;
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN demo_interest SET DEFAULT 'yes'`;
        console.log('✅ demo_interest is now nullable, defaults to yes');

        // 7. Drop fairplay CHECK constraint (we handle in code)
        await sql`ALTER TABLE quickdrop_registrations DROP CONSTRAINT IF EXISTS fairplay_must_agree`;
        console.log('✅ Removed fairplay_must_agree CHECK');

        console.log('\n🎉 Migration complete!');
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

migrate();
