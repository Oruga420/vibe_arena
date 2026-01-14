// scripts/test-email-logic.js
require('dotenv').config();
const { Pool } = require('pg');

// Mock dependencies
const mockResend = {
    emails: {
        send: async (params) => {
            console.log('\n[MOCK RESEND] Would send email:');
            console.log('To:', params.to);
            console.log('Subject:', params.subject);
            console.log('Body Preview:', params.html.substring(0, 100) + '...');
            return { data: { id: 'mock_id' }, error: null };
        }
    }
};

const mockGroq = {
    chat: {
        completions: {
            create: async () => ({
                choices: [{ message: { content: '<h1>Mock AI Generated Email</h1><p>Welcome to the Arena!</p>' } }]
            })
        }
    }
};

async function runTest() {
    console.log('🧪 Starting Email Logic Test...');

    // 1. Connect to Local DB (using env var from .env file)
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL missing in .env');
        return;
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    try {
        // 2. Fetch Pending Users
        const client = await pool.connect();
        const res = await client.query(`
            SELECT id, name, email, role 
            FROM waitlist_entries 
            WHERE welcome_email_sent IS FALSE 
            LIMIT 5
        `);
        
        console.log(`\n📋 Found ${res.rows.length} pending users.`);
        
        if (res.rows.length === 0) {
            console.log('⚠️ No pending users found. Add a test user to waitlist_entries to test.');
            // Insert dummy user for testing?
        }

        // 3. Simulate Processing
        for (const user of res.rows) {
            console.log(`\n🔄 Processing: ${user.email} (${user.role})`);
            
            // Mock Drop Info
            const dropInfo = { name: 'Test Drop 2026', status: 'OPEN', created_at: new Date() };
            
            // Generate (Mock)
            const emailHtml = await mockGroq.chat.completions.create();
            console.log('✅ AI Content Generated');

            // Send (Mock)
            await mockResend.emails.send({
                to: user.email,
                subject: 'Welcome Test',
                html: emailHtml.choices[0].message.content
            });
            console.log('✅ Email "Sent" (Mocked)');
            
            // NOTE: We are NOT updating the DB here to avoid messing up real data
            console.log('ℹ️  Skipping DB update (welcome_email_sent=true) for test safety.');
        }

    } catch (err) {
        console.error('❌ Test Error:', err);
    } finally {
        await pool.end();
    }
}

runTest();
