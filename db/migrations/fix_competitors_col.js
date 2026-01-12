require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

async function checkAndAddColumn() {
    console.log('🔍 Checking competitors table...');
    
    try {
        // Primero verificamos si existe
        const check = await sql`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'competitors' 
            AND column_name = 'colosseum_name';
        `;

        if (check.length > 0) {
            console.log('✅ Column "colosseum_name" ALREADY EXISTS in competitors.');
            return;
        }

        console.log('⚠️ Column missing. Adding it now...');
        await sql`
            ALTER TABLE competitors 
            ADD COLUMN IF NOT EXISTS colosseum_name VARCHAR(255);
        `;

        console.log('✅ Column "colosseum_name" added successfully to competitors!');
    } catch (error) {
        console.error('❌ Error altering table:', error);
    }
}

checkAndAddColumn();
