import { NextResponse } from 'next/server';
import { addToWaitlist, isEmailInWaitlist } from '../../../lib/waitlist.js';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, role } = body;

        // Basic validation
        if (!name || !email || !role) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email Format Validation: Alphanumeric, dots, underscores, pluses, and hyphens allowed before the @
        // Regex explanation: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
             return NextResponse.json(
                { success: false, message: 'Invalid email format.' },
                { status: 400 }
            );
        }

        // Check if already in waitlist
        const exists = await isEmailInWaitlist(email);
        if (exists) {
            return NextResponse.json(
                { success: false, message: 'Email already registered in waitlist' },
                { status: 409 }
            );
        }

        // Add to waitlist
        const entry = await addToWaitlist({ name, email, role });

        return NextResponse.json({
            success: true,
            data: entry
        }, { status: 201 });

    } catch (error) {
        console.error('Waitlist API error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
