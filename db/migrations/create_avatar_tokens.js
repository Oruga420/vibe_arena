require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function createAvatarTokensTable() {
    console.log('🏗️ Creating avatar_tokens table...');
    
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS avatar_tokens (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                current_token VARCHAR(64) NOT NULL,
                used_token VARCHAR(64),
                token_generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                token_used BOOLEAN DEFAULT FALSE,
                generation_enabled BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
        `;
        console.log('✅ Table created!');

        // Create index on email
        await sql`
            CREATE INDEX IF NOT EXISTS idx_avatar_tokens_email ON avatar_tokens(email);
        `;
        console.log('✅ Index created!');

        console.log('🎉 avatar_tokens table setup complete!');
    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('⚠️ Table already exists, that is OK.');
        } else {
            console.error('❌ Error:', error);
        }
    }
}

createAvatarTokensTable();
