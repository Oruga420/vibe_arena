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
        const result = await sql`
            SELECT 
                dr.*,
                dp.colosseum_name as champion_colosseum_name,
                -- Look for avatar in multiple sources (same as Gladiator DEX)
                COALESCE(
                    dp.avatar_url,
                    qr.avatar_url,
                    c.avatar_url,
                    at.avatar_url
                ) as champion_avatar_url
            FROM drop_results dr
            LEFT JOIN drop_participants dp ON dr.drop_id = dp.drop_id AND dp.is_champion = TRUE
            -- Join to find avatar from other sources by email
            LEFT JOIN quickdrop_registrations qr ON LOWER(dp.email) = LOWER(qr.email)
            LEFT JOIN competitors c ON LOWER(dp.email) = LOWER(c.email)
            LEFT JOIN avatar_tokens at ON LOWER(dp.email) = LOWER(at.email)
            WHERE dr.status = 'completed'
            ORDER BY dr.drop_date DESC
            LIMIT 1
        `;
        return result[0] || null;
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
                name,
                colosseum_name,
                avatar_url,
                is_champion,
                placement,
                project_name,
                project_url
            FROM drop_participants
            WHERE drop_id = ${dropId}
            ORDER BY is_champion DESC, placement ASC NULLS LAST, name ASC
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
