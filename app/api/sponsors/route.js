import { NextResponse } from 'next/server';
import { createSponsorApplication } from '@/lib/sponsors';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            company,
            contact,
            email,
            website,
            areas,
            theme,
            pain,
            sponsorType,
            budget,
            visibility,
            timeline,
            notes
        } = body;

        // Basic validation
        if (!company || !contact || !email) {
            return NextResponse.json(
                { message: "Company, contact name, and email are required" },
                { status: 400 }
            );
        }

        // Map frontend field names to DB names
        const sponsorData = {
            company_name: company,
            contact_name: contact,
            email: email,
            website: website,
            areas_of_interest: Array.isArray(areas) ? areas.join(', ') : areas,
            suggested_theme: theme,
            pain_point: pain,
            sponsor_type: sponsorType,
            budget_range: budget,
            desired_visibility: visibility,
            timeline: timeline,
            notes: notes
        };

        const newApplication = await createSponsorApplication(sponsorData);

        return NextResponse.json(
            { 
                success: true, 
                message: "Application submitted successfully",
                data: newApplication 
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Sponsor API error:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
