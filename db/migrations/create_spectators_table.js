require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function createSpectatorsTable() {
    console.log('🏗️ Creating spectators table...');
    
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS spectators (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                role VARCHAR(50) DEFAULT 'spectator',
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `;

        await sql`
            CREATE INDEX IF NOT EXISTS idx_spectators_email ON spectators(email);
        `;

        console.log('✅ Created spectators table');
        console.log('🎉 Done!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

createSpectatorsTable();
