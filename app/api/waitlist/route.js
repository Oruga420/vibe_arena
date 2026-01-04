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

        // Check if already in waitlist
        const exists = await isEmailInWaitlist(email);
        if (exists) {
            return NextResponse.json(
                { success: false, message: 'Email already registered' },
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
