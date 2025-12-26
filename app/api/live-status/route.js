import { NextResponse } from "next/server";

const getActiveDrop = () => {
    const isActive = process.env.LIVE_DROP_ACTIVE ? process.env.LIVE_DROP_ACTIVE === "true" : true;
    const id = process.env.LIVE_DROP_ID;
    const votingOpensAt = process.env.LIVE_DROP_VOTING_OPENS_AT;
    const votingClosesAt = process.env.LIVE_DROP_VOTING_CLOSES_AT;

    if (!isActive || !id || !votingOpensAt || !votingClosesAt) {
        return null;
    }

    return {
        id,
        votingOpensAt,
        votingClosesAt,
        winnerHandle: process.env.LIVE_DROP_WINNER_HANDLE || null
    };
};

export async function GET() {
    const drop = getActiveDrop();

    if (!drop) {
        return NextResponse.json(
            { status: "CLOSED_UPCOMING" },
            { headers: { "Cache-Control": "no-store" } }
        );
    }

    const now = Date.now();
    const opensAt = new Date(drop.votingOpensAt).getTime();
    const closesAt = new Date(drop.votingClosesAt).getTime();

    let payload;

    if (now < opensAt) {
        payload = {
            status: "CLOSED_UPCOMING",
            dropId: drop.id,
            votingOpensAt: new Date(opensAt).toISOString()
        };
    } else if (now >= opensAt && now <= closesAt) {
        payload = {
            status: "OPEN",
            dropId: drop.id,
            votingClosesAt: new Date(closesAt).toISOString()
        };
    } else {
        payload = {
            status: "CLOSED_ENDED",
            dropId: drop.id,
            winnerHandle: drop.winnerHandle || undefined
        };
    }

    return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
}
