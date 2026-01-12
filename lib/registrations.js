/**
 * Quick Drop Registration Database Operations
 * 
 * This module provides functions to interact with the quickdrop_registrations table.
 */

import sql from './db.js';

/**
 * Create a new registration
 * @param {Object} data - Registration data
 * @returns {Promise<Object>} The created registration
 */
export async function createRegistration(data) {
    const {
        name,
        colosseum_name = null,
        email,
        timezone,
        stack,
        github_url,
        demo_interest,
        fairplay_agreed,
        x_url = null,
        linkedin_url = null,
        drop_id = null
    } = data;

    const result = await sql`
        INSERT INTO quickdrop_registrations (
            name,
            colosseum_name,
            email,
            timezone,
            stack,
            github_url,
            demo_interest,
            fairplay_agreed,
            x_url,
            linkedin_url,
            drop_id
        )
        VALUES (
            ${name},
            ${colosseum_name},
            ${email.toLowerCase()},
            ${timezone},
            ${stack},
            ${github_url},
            ${demo_interest},
            ${fairplay_agreed},
            ${x_url},
            ${linkedin_url},
            ${drop_id}
        )
        RETURNING *
    `;

    // Sync with historical competitors table
    try {
        await sql`
            INSERT INTO competitors (name, colosseum_name, email, updated_at)
            VALUES (${name}, ${colosseum_name}, ${email.toLowerCase()}, NOW())
            ON CONFLICT (email) 
            DO UPDATE SET 
                name = EXCLUDED.name,
                colosseum_name = COALESCE(EXCLUDED.colosseum_name, competitors.colosseum_name),
                updated_at = NOW();
        `;
    } catch (err) {
        console.error("Error syncing competitor history:", err);
        // We don't block the registration if this fails, but we log it.
    }

    return result[0];
}

/**
 * Check if an email is already registered
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} True if email exists
 */
export async function isEmailRegistered(email) {
    const result = await sql`
        SELECT EXISTS(
            SELECT 1 FROM quickdrop_registrations 
            WHERE email = ${email.toLowerCase()}
        ) as exists
    `;
    return result[0]?.exists || false;
}

/**
 * Get registration by email
 * @param {string} email - Email to search
 * @returns {Promise<Object|null>} Registration or null
 */
export async function getRegistrationByEmail(email) {
    const result = await sql`
        SELECT * FROM quickdrop_registrations 
        WHERE email = ${email.toLowerCase()}
    `;
    return result[0] || null;
}

/**
 * Get all registrations for a specific drop
 * @param {string} dropId - Drop ID
 * @param {string} status - Optional status filter
 * @returns {Promise<Array>} List of registrations
 */
export async function getRegistrationsByDrop(dropId, status = null) {
    if (status) {
        return await sql`
            SELECT * FROM quickdrop_registrations 
            WHERE drop_id = ${dropId} AND status = ${status}
            ORDER BY created_at DESC
        `;
    }
    return await sql`
        SELECT * FROM quickdrop_registrations 
        WHERE drop_id = ${dropId}
        ORDER BY created_at DESC
    `;
}

/**
 * Update registration status
 * @param {number} id - Registration ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated registration
 */
export async function updateRegistrationStatus(id, status) {
    const result = await sql`
        UPDATE quickdrop_registrations 
        SET status = ${status}
        WHERE id = ${id}
        RETURNING *
    `;
    return result[0];
}

/**
 * Count registrations by status for a drop
 * @param {string} dropId - Drop ID
 * @returns {Promise<Object>} Counts by status
 */
export async function getRegistrationCounts(dropId = null) {
    const whereClause = dropId ? sql`WHERE drop_id = ${dropId}` : sql``;
    
    const result = await sql`
        SELECT 
            status,
            COUNT(*)::int as count
        FROM quickdrop_registrations 
        ${whereClause}
        GROUP BY status
    `;

    return result.reduce((acc, row) => {
        acc[row.status] = row.count;
        return acc;
    }, {
        pending: 0,
        approved: 0,
        invited: 0,
        paid: 0,
        rejected: 0,
        waitlist: 0
    });
}

/**
 * Get total approved/paid registrations for a drop
 * @param {string} dropId - Drop ID
 * @returns {Promise<number>} Count of approved registrations
 */
export async function getApprovedCount(dropId) {
    const result = await sql`
        SELECT COUNT(*)::int as count
        FROM quickdrop_registrations 
        WHERE drop_id = ${dropId} AND status = 'approved'
    `;
    return result[0]?.count || 0;
}
/**
 * Update gladiator statistics
 * @param {number} id - Registration ID
 * @param {number} wins - Number of wins to add
 * @param {number} losses - Number of losses to add
 * @returns {Promise<Object>} Updated registration
 */
export async function updateGladiatorStats(id, wins = 0, losses = 0) {
    const result = await sql`
        UPDATE quickdrop_registrations 
        SET wins = wins + ${wins},
            losses = losses + ${losses}
        WHERE id = ${id}
        RETURNING *
    `;
    return result[0];
}
