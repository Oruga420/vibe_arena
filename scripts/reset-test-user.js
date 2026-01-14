require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function addAndCheck() {
    try {
        // First, reset Pam's entry
        await sql`
            UPDATE waitlist_entries 
            SET welcome_email_sent = FALSE 
            WHERE email = 'pam@seshwithfriends.org'
        `;
        console.log('✅ Reset pam@seshwithfriends.org to pending');

        // Check pending users
        const pending = await sql`
            SELECT id, name, email, role, welcome_email_sent 
            FROM waitlist_entries 
            WHERE welcome_email_sent IS FALSE
        `;
        console.log('Pending users:', pending);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

addAndCheck();
