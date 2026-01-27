/**
 * Script to check and report duplicate emails in waitlist_entries
 * Run this BEFORE running the migration to see what will be cleaned
 * 
 * Usage: node scripts/check-waitlist-duplicates.js
 */

import 'dotenv/config';
import sql from '../lib/db.js';

async function checkDuplicates() {
    console.log('🔍 Checking for duplicate emails in waitlist_entries...\n');

    try {
        // Find all duplicates
        const duplicates = await sql`
            SELECT 
                email, 
                COUNT(*) as count,
                array_agg(id ORDER BY created_at) as ids,
                array_agg(name ORDER BY created_at) as names,
                array_agg(created_at ORDER BY created_at) as created_dates,
                array_agg(welcome_email_sent ORDER BY created_at) as email_sent_status
            FROM waitlist_entries
            GROUP BY email
            HAVING COUNT(*) > 1
            ORDER BY count DESC
        `;

        if (duplicates.length === 0) {
            console.log('✅ No duplicate emails found! Your database is clean.\n');
            return;
        }

        console.log(`⚠️  Found ${duplicates.length} emails with duplicates:\n`);
        console.log('='.repeat(80));

        let totalDuplicateRows = 0;

        for (const dup of duplicates) {
            console.log(`\n📧 Email: ${dup.email}`);
            console.log(`   Duplicate count: ${dup.count} entries`);
            console.log(`   IDs: ${dup.ids.join(', ')}`);
            console.log(`   Names: ${dup.names.join(', ')}`);
            console.log(`   Will KEEP: ID ${dup.ids[0]} (oldest, created: ${dup.created_dates[0]})`);
            console.log(`   Will DELETE: IDs ${dup.ids.slice(1).join(', ')}`);

            totalDuplicateRows += dup.count - 1; // -1 because we keep one
        }

        console.log('\n' + '='.repeat(80));
        console.log(`\n📊 Summary:`);
        console.log(`   Total emails with duplicates: ${duplicates.length}`);
        console.log(`   Total rows to be deleted: ${totalDuplicateRows}`);
        console.log(`\n💡 Run the migration to clean these duplicates:`);
        console.log(`   psql $DATABASE_URL -f db/migrations/fix_waitlist_email_duplicates.sql\n`);

    } catch (error) {
        console.error('❌ Error checking duplicates:', error);
    } finally {
        process.exit(0);
    }
}

checkDuplicates();
