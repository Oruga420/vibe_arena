import { NextResponse } from "next/server";
import { getDropStatus } from "../../../lib/dropConfig";

export async function GET() {
    const payload = getDropStatus();
    return NextResponse.json(payload, {
        headers: { "Cache-Control": "no-store" }
    });
}
