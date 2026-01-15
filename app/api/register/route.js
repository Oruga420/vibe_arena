/**
 * Quick Drop Registration API
 * 
 * POST /api/register - Create a new registration
 */

import { NextResponse } from 'next/server';
import { createRegistration, isEmailRegistered } from '../../../lib/registrations.js';
import { getDropConfig } from '../../../lib/dropConfig.js';
import { sendRegistrationConfirmation } from '../../../lib/emails/registrationEmail.js';
import { getNextDrop } from '../../../lib/dropsDb.js';

// Validation helpers
const validateEmail = (email) => {
    // Alphanumeric ONLY before the @
    // Regex explanation: ^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const validateGitHub = (url) => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/.+/i;
    return githubRegex.test(url);
};

const validateX = (url) => {
    if (!url) return true; // Optional field
    const xRegex = /^https?:\/\/(www\.)?(twitter|x)\.com\/.+/i;
    return xRegex.test(url);
};

const validateLinkedIn = (url) => {
    if (!url) return true; // Optional field
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/.+/i;
    return linkedinRegex.test(url);
};

const VALID_STACKS = ['fullstack', 'frontend', 'backend', 'mobile', 'data', 'other'];
const VALID_TIMEZONES = ['et', 'ct', 'mt', 'pt', 'gmt3', 'gmt', 'cet'];
const VALID_DEMO = ['yes', 'no'];

export async function POST(request) {
    try {
        const body = await request.json();

        // Extract and sanitize fields
        const {
            name,
            colosseum_name,
            email,
            timezone,
            stack,
            github,
            x,
            linkedin,
            demo,
            fairplay,
            language
        } = body;

        // Validation errors collector
        const errors = [];

        // Required field validations
        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            errors.push({ field: 'name', message: 'Name is required and must be at least 2 characters' });
        }

        if (!email || !validateEmail(email)) {
            errors.push({ field: 'email', message: 'Invalid email format. Only letters and numbers are allowed before the @.' });
        }

        if (!timezone || !VALID_TIMEZONES.includes(timezone)) {
            errors.push({ field: 'timezone', message: 'Valid timezone is required' });
        }

        if (!stack || !VALID_STACKS.includes(stack)) {
            errors.push({ field: 'stack', message: 'Valid tech stack is required' });
        }

        if (!github || !validateGitHub(github)) {
            errors.push({ field: 'github', message: 'Valid GitHub URL is required' });
        }

        if (!demo || !VALID_DEMO.includes(demo)) {
            errors.push({ field: 'demo', message: 'Demo preference is required' });
        }

        if (fairplay !== true) {
            errors.push({ field: 'fairplay', message: 'You must agree to the fair play rules' });
        }

        // Optional field validations
        if (!validateX(x)) {
            errors.push({ field: 'x', message: 'Invalid X/Twitter URL format' });
        }

        if (!validateLinkedIn(linkedin)) {
            errors.push({ field: 'linkedin', message: 'Invalid LinkedIn URL format' });
        }

        // Return validation errors if any
        if (errors.length > 0) {
            return NextResponse.json(
                { success: false, errors },
                { status: 400 }
            );
        }

        // Check if email already registered
        const emailExists = await isEmailRegistered(email);
        if (emailExists) {
            return NextResponse.json(
                { 
                    success: false, 
                    errors: [{ field: 'email', message: 'This email is already registered' }]
                },
                { status: 409 }
            );
        }

        // Get current drop configuration
        const dropConfig = getDropConfig();

        // Create the registration
        const registration = await createRegistration({
            name: name.trim(),
            colosseum_name: colosseum_name?.trim() || null,
            email: email.toLowerCase().trim(),
            timezone,
            stack,
            github_url: github.trim(),
            demo_interest: demo,
            fairplay_agreed: true,
            x_url: x?.trim() || null,
            linkedin_url: linkedin?.trim() || null,
            drop_id: dropConfig.id || null
        });

        // Send confirmation email immediately (non-blocking)
        try {
            const dropInfo = await getNextDrop();
            const emailResult = await sendRegistrationConfirmation({
                name: registration.name,
                email: registration.email,
                colosseum_name: registration.colosseum_name,
                stack: registration.stack,
                github_url: registration.github_url,
                language: language || 'es'
            }, dropInfo);
            
            if (!emailResult.success) {
                console.warn('[Register] Email failed but registration succeeded:', emailResult.error);
            }
        } catch (emailError) {
            // Don't fail registration if email fails
            console.error('[Register] Email error (non-blocking):', emailError);
        }

        return NextResponse.json({
            success: true,
            message: 'Registration successful! You will receive a confirmation email shortly.',
            data: {
                id: registration.id,
                email: registration.email,
                status: registration.status,
                created_at: registration.created_at
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);

        // Handle specific database errors
        if (error.code === '23505') { // Unique violation
            return NextResponse.json(
                { 
                    success: false, 
                    errors: [{ field: 'email', message: 'This email is already registered' }]
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { 
                success: false, 
                message: 'An error occurred while processing your registration. Please try again.' 
            },
            { status: 500 }
        );
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({ 
        status: 'ok', 
        endpoint: '/api/register',
        method: 'POST',
        description: 'Quick Drop registration endpoint'
    });
}
