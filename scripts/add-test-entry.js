require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function addTestEntry() {
    try {
        await sql`
            INSERT INTO waitlist_entries (name, email, role, welcome_email_sent)
            VALUES ('Pam Test', 'pam@seshwithfriends.org', 'arena', FALSE)
        `;
        console.log('✅ Test entry added for pam@seshwithfriends.org');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

addTestEntry();
