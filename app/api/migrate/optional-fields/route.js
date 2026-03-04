/**
 * ONE-TIME migration endpoint — DELETE AFTER USE
 * Makes timezone, stack, github_url, demo_interest nullable
 * Adds 'none' to stack_type enum
 */
import { NextResponse } from 'next/server';
import sql from '../../../../lib/db.js';

export async function GET(request) {
    // Simple secret check
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    if (key !== 'migrate-optional-2026') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];

    try {
        await sql`ALTER TYPE stack_type ADD VALUE IF NOT EXISTS 'none'`;
        results.push('✅ Added none to stack_type enum');
    } catch (e) { results.push(`⚠️ stack_type: ${e.message}`); }

    try {
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN timezone DROP NOT NULL`;
        results.push('✅ timezone nullable');
    } catch (e) { results.push(`⚠️ timezone: ${e.message}`); }

    try {
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN stack SET DEFAULT 'none'::stack_type`;
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN stack DROP NOT NULL`;
        results.push('✅ stack defaults to none, nullable');
    } catch (e) { results.push(`⚠️ stack: ${e.message}`); }

    try {
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN github_url DROP NOT NULL`;
        results.push('✅ github_url nullable');
    } catch (e) { results.push(`⚠️ github_url: ${e.message}`); }

    try {
        await sql`ALTER TABLE quickdrop_registrations DROP CONSTRAINT IF EXISTS valid_github`;
        await sql`ALTER TABLE quickdrop_registrations ADD CONSTRAINT valid_github CHECK (github_url IS NULL OR github_url ~* '^https?://(www\\.)?github\\.com/.+')`;
        results.push('✅ github CHECK updated');
    } catch (e) { results.push(`⚠️ github check: ${e.message}`); }

    try {
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN demo_interest DROP NOT NULL`;
        await sql`ALTER TABLE quickdrop_registrations ALTER COLUMN demo_interest SET DEFAULT 'yes'::demo_type`;
        results.push('✅ demo_interest nullable, defaults yes');
    } catch (e) { results.push(`⚠️ demo: ${e.message}`); }

    try {
        await sql`ALTER TABLE quickdrop_registrations DROP CONSTRAINT IF EXISTS fairplay_must_agree`;
        results.push('✅ Removed fairplay_must_agree CHECK');
    } catch (e) { results.push(`⚠️ fairplay: ${e.message}`); }

    return NextResponse.json({ results });
}
