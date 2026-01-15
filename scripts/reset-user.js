require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function resetUser() {
    const email = 'pam@seshwithfriends.org';
    
    try {
        await sql`DELETE FROM quickdrop_registrations WHERE email = ${email}`;
        console.log('✅ Deleted from quickdrop_registrations');
    } catch (e) {
        console.log('⚠️ quickdrop_registrations:', e.message);
    }
    
    try {
        await sql`DELETE FROM avatar_tokens WHERE email = ${email}`;
        console.log('✅ Deleted from avatar_tokens');
    } catch (e) {
        console.log('⚠️ avatar_tokens:', e.message);
    }
    
    try {
        await sql`DELETE FROM waitlist_entries WHERE email = ${email}`;
        console.log('✅ Deleted from waitlist_entries');
    } catch (e) {
        console.log('⚠️ waitlist_entries:', e.message);
    }
    
    console.log(`\n🗑️ User ${email} has been reset. Ready to re-register.`);
}

resetUser();
