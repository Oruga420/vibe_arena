/**
 * Neon Database Connection Configuration
 * 
 * This module provides a connection pool to the Neon PostgreSQL database.
 * 
 * Required environment variable:
 * - DATABASE_URL: Your Neon connection string (get it from Neon dashboard)
 * 
 * Example DATABASE_URL format:
 * postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
 */

import { neon } from '@neondatabase/serverless';

// Validate that DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.warn('⚠️ DATABASE_URL environment variable is not set. Database operations will fail.');
}

/**
 * Neon serverless SQL client
 * Uses HTTP-based connection suitable for serverless environments
 */
const sql = neon(process.env.DATABASE_URL || '');

/**
 * Execute a SQL query with parameters
 * @param {string} query - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} Query results
 */
export async function query(queryString, params = []) {
    try {
        const result = await sql(queryString, params);
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

/**
 * Check database connection health
 * @returns {Promise<boolean>} True if connected successfully
 */
export async function checkConnection() {
    try {
        await sql`SELECT 1 as connected`;
        return true;
    } catch (error) {
        console.error('Database connection check failed:', error);
        return false;
    }
}

export { sql };
export default sql;
