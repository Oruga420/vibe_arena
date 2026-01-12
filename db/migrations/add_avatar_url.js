require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function addAvatarUrlColumn() {
    console.log('🏗️ Adding avatar_url column to tables...');
    
    try {
        // Add to competitors table
        await sql`
            ALTER TABLE competitors 
            ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);
        `;
        console.log('✅ Added avatar_url to competitors');

        // Add to avatar_tokens table
        await sql`
            ALTER TABLE avatar_tokens 
            ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);
        `;
        console.log('✅ Added avatar_url to avatar_tokens');

        // Add to quickdrop_registrations for completeness
        await sql`
            ALTER TABLE quickdrop_registrations 
            ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);
        `;
        console.log('✅ Added avatar_url to quickdrop_registrations');

        console.log('🎉 Done!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

addAvatarUrlColumn();
