import sql from './db.js';

/**
 * Create a new sponsor application
 * @param {Object} data - Sponsor application data
 * @returns {Promise<Object>} The created application
 */
export async function createSponsorApplication(data) {
    const {
        company_name,
        contact_name,
        email,
        website = null,
        areas_of_interest = null,
        suggested_theme = null,
        pain_point = null,
        sponsor_type = null,
        budget_range = null,
        desired_visibility = null,
        timeline = null,
        notes = null
    } = data;

    const result = await sql`
        INSERT INTO sponsor_applications (
            company_name,
            contact_name,
            email,
            website,
            areas_of_interest,
            suggested_theme,
            pain_point,
            sponsor_type,
            budget_range,
            desired_visibility,
            timeline,
            notes
        )
        VALUES (
            ${company_name},
            ${contact_name},
            ${email.toLowerCase().trim()},
            ${website},
            ${areas_of_interest},
            ${suggested_theme},
            ${pain_point},
            ${sponsor_type},
            ${budget_range},
            ${desired_visibility},
            ${timeline},
            ${notes}
        )
        RETURNING *
    `;

    return result[0];
}

/**
 * Get all sponsor applications
 * @returns {Promise<Array>} List of applications
 */
export async function getSponsorApplications() {
    return await sql`
        SELECT * FROM sponsor_applications 
        ORDER BY created_at DESC
    `;
}

/**
 * Update sponsor application status
 * @param {number} id - Application ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated application
 */
export async function updateSponsorStatus(id, status) {
    const result = await sql`
        UPDATE sponsor_applications 
        SET status = ${status}
        WHERE id = ${id}
        RETURNING *
    `;
    return result[0];
}
