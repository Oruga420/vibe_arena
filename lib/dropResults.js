/**
 * Drop Results Database Operations
 * 
 * Handles fetching competition results, champions, and participants
 */

import sql from './db.js';

/**
 * Get the latest completed drop with champion info
 * Also searches quickdrop_registrations, competitors, and avatar_tokens for avatar
 * @returns {Promise<Object|null>} Latest drop result or null
 */
export async function getLatestChampion() {
    try {
        // First get the latest completed drop
        const drops = await sql`
            SELECT * FROM drop_results
            WHERE status = 'completed'
            ORDER BY drop_date DESC
            LIMIT 1
        `;
        if (drops.length === 0) return null;

        const drop = drops[0];

        // Then get ALL champions for this drop (supports ties)
        const champions = await sql`
            SELECT
                dp.name,
                dp.colosseum_name,
                dp.email,
                dp.placement,
                COALESCE(
                    dp.avatar_url,
                    qr.avatar_url,
                    c.avatar_url
                ) as avatar_url
            FROM drop_participants dp
            LEFT JOIN quickdrop_registrations qr ON LOWER(dp.email) = LOWER(qr.email)
            LEFT JOIN competitors c ON LOWER(dp.email) = LOWER(c.email)
            WHERE dp.drop_id = ${drop.drop_id} AND dp.is_champion = TRUE
            ORDER BY dp.name ASC
        `;

        return {
            ...drop,
            champion_colosseum_name: drop.champion_name,
            champion_avatar_url: champions[0]?.avatar_url || null,
            champions: champions.map(ch => ({
                name: ch.name,
                colosseum_name: ch.colosseum_name,
                avatar_url: ch.avatar_url,
                email: ch.email,
            })),
        };
    } catch (error) {
        console.error('[DropResults] Error fetching latest champion:', error);
        return null;
    }
}

/**
 * Get all champions (Hall of Fame)
 * @param {number} limit - Number of champions to fetch
 * @returns {Promise<Array>} Array of champion records
 */
export async function getAllChampions(limit = 10) {
    try {
        const result = await sql`
            SELECT 
                dr.drop_id,
                dr.drop_name,
                dr.drop_date,
                dr.champion_name,
                dr.champion_project_name,
                dr.total_gladiators,
                dr.prize_pool,
                dr.prize_currency,
                dp.avatar_url as champion_avatar_url,
                dp.colosseum_name as champion_colosseum_name
            FROM drop_results dr
            LEFT JOIN drop_participants dp ON dr.drop_id = dp.drop_id AND dp.is_champion = TRUE
            WHERE dr.status = 'completed'
            ORDER BY dr.drop_date DESC
            LIMIT ${limit}
        `;
        return result;
    } catch (error) {
        console.error('[DropResults] Error fetching all champions:', error);
        return [];
    }
}

/**
 * Get all participants for a specific drop
 * @param {string} dropId - Drop ID
 * @returns {Promise<Array>} Array of participants
 */
export async function getDropParticipants(dropId) {
    try {
        const result = await sql`
            SELECT
                dp.name,
                dp.colosseum_name,
                COALESCE(
                    dp.avatar_url,
                    qr.avatar_url,
                    c.avatar_url
                ) as avatar_url,
                dp.is_champion,
                dp.placement,
                dp.project_name,
                dp.project_url
            FROM drop_participants dp
            LEFT JOIN quickdrop_registrations qr ON LOWER(dp.email) = LOWER(qr.email)
            LEFT JOIN competitors c ON LOWER(dp.email) = LOWER(c.email)
            WHERE dp.drop_id = ${dropId}
            ORDER BY dp.is_champion DESC, dp.placement ASC NULLS LAST, dp.name ASC
        `;
        return result;
    } catch (error) {
        console.error('[DropResults] Error fetching participants:', error);
        return [];
    }
}

/**
 * Get drop result by ID
 * @param {string} dropId - Drop ID
 * @returns {Promise<Object|null>} Drop result or null
 */
export async function getDropResult(dropId) {
    try {
        const result = await sql`
            SELECT * FROM drop_results
            WHERE drop_id = ${dropId}
        `;
        return result[0] || null;
    } catch (error) {
        console.error('[DropResults] Error fetching drop result:', error);
        return null;
    }
}

/**
 * Get upcoming/next drop info
 * @returns {Promise<Object|null>} Next drop info or null
 */
export async function getNextDrop() {
    try {
        // Check environment for next drop info
        const nextDrop = {
            id: process.env.NEXT_DROP_ID || null,
            name: process.env.NEXT_DROP_NAME || 'TBA',
            date: process.env.NEXT_DROP_DATE || null,
            status: process.env.NEXT_DROP_STATUS || 'planning'
        };

        if (!nextDrop.id) {
            return null;
        }

        return nextDrop;
    } catch (error) {
        console.error('[DropResults] Error fetching next drop:', error);
        return null;
    }
}

/**
 * Get competition stats
 * @returns {Promise<Object>} Stats object
 */
export async function getCompetitionStats() {
    try {
        const result = await sql`
            SELECT 
                COUNT(DISTINCT drop_id) as total_drops,
                COUNT(DISTINCT champion_email) as unique_champions,
                SUM(total_gladiators) as total_gladiators,
                SUM(prize_pool) as total_prizes
            FROM drop_results
            WHERE status = 'completed'
        `;
        return result[0] || {
            total_drops: 0,
            unique_champions: 0,
            total_gladiators: 0,
            total_prizes: 0
        };
    } catch (error) {
        console.error('[DropResults] Error fetching stats:', error);
        return {
            total_drops: 0,
            unique_champions: 0,
            total_gladiators: 0,
            total_prizes: 0
        };
    }
}
