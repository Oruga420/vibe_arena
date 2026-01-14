import { Pool } from 'pg';

// Separate pool for the Drops/Competitions DB (purple-dust project)
let dropsPool;

if (!global.dropsPool) {
    global.dropsPool = new Pool({
        connectionString: process.env.DROPS_DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Required for Neon
        }
    });
}

dropsPool = global.dropsPool;

export default dropsPool;

export async function getNextDrop() {
    try {
        const client = await dropsPool.connect();
        try {
            // Find the next OPEN drop or the most recently created one
            const query = `
                SELECT id, name, status, "createdAt" as created_at
                FROM competitions 
                WHERE status = 'OPEN' 
                ORDER BY "createdAt" DESC 
                LIMIT 1
            `;
            const result = await client.query(query);
            
            if (result.rows.length === 0) {
                // If no open drops, get the latest one just for info
                const fallbackQuery = `
                    SELECT id, name, status, "createdAt" as created_at
                    FROM competitions 
                    ORDER BY "createdAt" DESC 
                    LIMIT 1
                `;
                const fallbackResult = await client.query(fallbackQuery);
                return fallbackResult.rows[0] || null;
            }
            
            return result.rows[0];
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching next drop:', error);
        return null; // Don't break the email flow if drops DB fails
    }
}
