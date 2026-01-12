/**
 * Avatar Token Management
 * 
 * Handles token generation, validation, and rotation for avatar creation.
 */

import sql from './db.js';
import crypto from 'crypto';

/**
 * Generate a secure random token
 * @returns {string} 64-character hex token
 */
export function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

/**
 * Create or get avatar token for a user
 * @param {string} email - User's email
 * @returns {Promise<Object>} Token record
 */
export async function createAvatarToken(email) {
    const token = generateToken();
    
    const result = await sql`
        INSERT INTO avatar_tokens (email, current_token)
        VALUES (${email.toLowerCase()}, ${token})
        ON CONFLICT (email) 
        DO UPDATE SET 
            current_token = EXCLUDED.current_token,
            token_generated_at = NOW(),
            token_used = FALSE,
            updated_at = NOW()
        RETURNING *
    `;
    
    return result[0];
}

/**
 * Get token for a user
 * @param {string} email - User's email
 * @returns {Promise<Object|null>} Token record or null
 */
export async function getAvatarToken(email) {
    const result = await sql`
        SELECT * FROM avatar_tokens 
        WHERE email = ${email.toLowerCase()}
    `;
    return result[0] || null;
}

/**
 * Validate and consume a token
 * @param {string} email - User's email
 * @param {string} token - Token to validate
 * @returns {Promise<boolean>} True if valid and consumed
 */
export async function validateAndUseToken(email, token) {
    const record = await getAvatarToken(email);
    
    if (!record) return false;
    if (!record.generation_enabled) return false;
    if (record.token_used) return false;
    if (record.current_token !== token) return false;
    
    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - new Date(record.token_generated_at).getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (tokenAge > twentyFourHours) return false;
    
    // Mark as used
    await sql`
        UPDATE avatar_tokens 
        SET 
            token_used = TRUE,
            used_token = current_token,
            updated_at = NOW()
        WHERE email = ${email.toLowerCase()}
    `;
    
    return true;
}

/**
 * Regenerate tokens for all users (should be called by a cron job)
 * Only regenerates tokens that are older than 24 hours
 * @returns {Promise<number>} Number of tokens regenerated
 */
export async function regenerateExpiredTokens() {
    const newToken = generateToken();
    
    const result = await sql`
        UPDATE avatar_tokens 
        SET 
            used_token = current_token,
            current_token = ${newToken},
            token_generated_at = NOW(),
            token_used = FALSE,
            updated_at = NOW()
        WHERE token_generated_at < NOW() - INTERVAL '24 hours'
        RETURNING id
    `;
    
    return result.length;
}

/**
 * Check if token generation is enabled for a user
 * @param {string} email - User's email
 * @returns {Promise<boolean>}
 */
export async function isGenerationEnabled(email) {
    const record = await getAvatarToken(email);
    return record?.generation_enabled ?? false;
}

/**
 * Toggle generation enabled flag for a user
 * @param {string} email - User's email
 * @param {boolean} enabled - Enable or disable
 */
export async function setGenerationEnabled(email, enabled) {
    await sql`
        UPDATE avatar_tokens 
        SET 
            generation_enabled = ${enabled},
            updated_at = NOW()
        WHERE email = ${email.toLowerCase()}
    `;
}
