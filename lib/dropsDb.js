import { neon } from '@neondatabase/serverless';

// Use the Neon serverless driver for drops DB (same as main db.js)
const getDropsSql = () => {
    if (!process.env.DROPS_DATABASE_URL) {
        console.warn('[DropsDB] DROPS_DATABASE_URL not set');
        return null;
    }
    console.log('[DropsDB] Connecting with URL:', process.env.DROPS_DATABASE_URL?.substring(0, 50) + '...');
    return neon(process.env.DROPS_DATABASE_URL);
};

export async function getNextDrop() {
    try {
        const sql = getDropsSql();
        if (!sql) {
            return null;
        }

        // Find the next OPEN drop or the most recently created one
        const result = await sql`
            SELECT id, name, status, "createdAt" as created_at
            FROM competitions 
            WHERE status = 'OPEN' 
            ORDER BY "createdAt" DESC 
            LIMIT 1
        `;
        
        if (!result || result.length === 0) {
            // If no open drops, get the latest one just for info
            const fallbackResult = await sql`
                SELECT id, name, status, "createdAt" as created_at
                FROM competitions 
                ORDER BY "createdAt" DESC 
                LIMIT 1
            `;
            return fallbackResult?.[0] || null;
        }
        
        return result[0];
    } catch (error) {
        console.error('[DropsDB] Error fetching next drop:', error.message || error);
        return null; // Don't break the email flow if drops DB fails
    }
}
