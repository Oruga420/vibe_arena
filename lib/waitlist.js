import sql from './db.js';

/**
 * Add a new entry to the waitlist
 * @param {Object} data - Waitlist data
 * @returns {Promise<Object>} The created entry
 */
export async function addToWaitlist(data) {
    const { name, email, role } = data;

    const result = await sql`
        INSERT INTO waitlist_entries (name, email, role)
        VALUES (${name}, ${email.toLowerCase().trim()}, ${role})
        RETURNING *
    `;

    // Generate avatar token for arena gladiators
    if (role === 'arena') {
        try {
            const { createAvatarToken } = await import('./avatarTokens.js');
            await createAvatarToken(email);
        } catch (err) {
            console.error("Error creating avatar token for waitlist:", err);
        }
    }

    return result[0];
}

/**
 * Check if email is already in waitlist
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} True if email exists
 */
export async function isEmailInWaitlist(email) {
    const result = await sql`
        SELECT EXISTS(
            SELECT 1 FROM waitlist_entries 
            WHERE email = ${email.toLowerCase().trim()}
        ) as exists
    `;
    return result[0]?.exists || false;
}
