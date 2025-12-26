import { NextResponse } from "next/server";
import { getDropStatus } from "../../../lib/dropConfig";

export async function GET() {
    const status = getDropStatus();
    const payload = {
        status: status.status,
        dropId: status.dropId,
        votingOpensAt: status.votingOpensAt,
        votingClosesAt: status.votingClosesAt,
        winnerHandle: status.winnerHandle
    };

    return NextResponse.json(payload, {
        headers: { "Cache-Control": "no-store" }
    });
}
