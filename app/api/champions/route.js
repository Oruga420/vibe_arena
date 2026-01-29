import { NextResponse } from 'next/server';
import { getLatestChampion, getAllChampions, getDropParticipants, getCompetitionStats } from '../../../lib/dropResults';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every minute

/**
 * GET /api/champions
 * 
 * Returns champion data for the homepage
 * 
 * Query params:
 * - type: 'latest' | 'all' | 'stats' (default: 'latest')
 * - dropId: specific drop ID (optional, for participants)
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type') || 'latest';
        const dropId = searchParams.get('dropId');

        let data;

        switch (type) {
            case 'latest':
                // Get latest champion with participants
                const champion = await getLatestChampion();
                if (champion) {
                    const participants = await getDropParticipants(champion.drop_id);
                    data = {
                        champion,
                        participants,
                        hasChampion: true
                    };
                } else {
                    data = {
                        champion: null,
                        participants: [],
                        hasChampion: false
                    };
                }
                break;

            case 'all':
                // Get all champions (Hall of Fame)
                data = await getAllChampions();
                break;

            case 'stats':
                // Get competition stats
                data = await getCompetitionStats();
                break;

            case 'participants':
                // Get participants for a specific drop
                if (!dropId) {
                    return NextResponse.json(
                        { error: 'dropId required for participants' },
                        { status: 400 }
                    );
                }
                data = await getDropParticipants(dropId);
                break;

            default:
                return NextResponse.json(
                    { error: 'Invalid type parameter' },
                    { status: 400 }
                );
        }

        return NextResponse.json({
            success: true,
            data,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('[Champions API] Error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
