require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
    console.log('🚀 Starting migration...');
    
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL missing in .env');
        return;
    }

    const pool = new Pool({ 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        const client = await pool.connect();
        
        // Read the migration file we created earlier
        const migrationPath = path.join(__dirname, '..', 'db', 'migrations', 'add_waitlist_email_tracking.sql');
        const sql = fs.readFileSync(migrationPath, 'utf8');
        
        console.log('📄 Executing SQL from:', migrationPath);
        
        await client.query(sql);
        
        console.log('✅ Migration executed successfully!');
        
    } catch (err) {
        console.error('❌ Migration failed:', err);
    } finally {
        await pool.end();
    }
}

runMigration();
