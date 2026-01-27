import sql from './db.js';

/**
 * Add a new entry to the waitlist
 * @param {Object} data - Waitlist data
 * @returns {Promise<Object>} The created entry or existing entry info
 */
export async function addToWaitlist(data) {
    const { name, email, role } = data;
    const normalizedEmail = email.toLowerCase().trim();

    if (role === 'spectator') {
        try {
            const result = await sql`
                INSERT INTO spectators (name, email, role)
                VALUES (${name}, ${normalizedEmail}, ${role})
                RETURNING *
            `;
            return result[0];
        } catch (err) {
            // Handle duplicate email (UNIQUE constraint violation)
            if (err.code === '23505') {
                return { 
                    alreadyExists: true, 
                    email: normalizedEmail,
                    message: 'Ya estás registrado en las gradas! 🍿' 
                };
            }
            throw err;
        }
    }

    try {
        const result = await sql`
            INSERT INTO waitlist_entries (name, email, role)
            VALUES (${name}, ${normalizedEmail}, ${role})
            RETURNING *
        `;

        // Generate avatar token for arena gladiators
        if (role === 'arena') {
            try {
                const { createAvatarToken } = await import('./avatarTokens.js');
                await createAvatarToken(normalizedEmail);
            } catch (avatarErr) {
                console.error("Error creating avatar token for waitlist:", avatarErr);
            }
        }

        return result[0];
    } catch (err) {
        // Handle duplicate email (UNIQUE constraint violation)
        if (err.code === '23505') {
            return { 
                alreadyExists: true, 
                email: normalizedEmail,
                message: role === 'arena' 
                    ? 'Ya estás registrado como gladiador! ⚔️' 
                    : 'Ya estás en la lista de espera! 🎯'
            };
        }
        throw err;
    }
}

/**
 * Check if email is already in waitlist
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} True if email exists
 */
export async function isEmailInWaitlist(email, role) {
    if (role === 'spectator') {
        const result = await sql`
            SELECT EXISTS(
                SELECT 1 FROM spectators 
                WHERE email = ${email.toLowerCase().trim()}
            ) as exists
        `;
        return result[0]?.exists || false;
    }

    const result = await sql`
        SELECT EXISTS(
            SELECT 1 FROM waitlist_entries 
            WHERE email = ${email.toLowerCase().trim()}
        ) as exists
    `;
    return result[0]?.exists || false;
}
