const parseNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const parseRatio = (value, fallback) => {
    const parsed = parseNumber(value, fallback);
    if (!Number.isFinite(parsed)) {
        return fallback;
    }
    return Math.min(1, Math.max(0, parsed));
};

const normalizeCount = (value) => Math.max(0, Math.floor(value));

const ALLOWED_ADMIN_HOST = "vibe-arena-qrvoting.vercel.app";

let cachedAcceptedCount = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 30_000;

const fetchAcceptedCount = async () => {
    const now = Date.now();
    if (cachedAcceptedCount !== null && now - cacheTimestamp < CACHE_TTL_MS) {
        return cachedAcceptedCount;
    }

    const adminUrl = process.env.ADMIN_INTERNAL_URL;
    const apiKey = process.env.COLISEO_INTERNAL_API_KEY;

    if (!adminUrl || !apiKey) {
        return null;
    }

    try {
        const targetUrl = new URL("/api/competitions/accepted-count", adminUrl);
        if (targetUrl.hostname !== ALLOWED_ADMIN_HOST || targetUrl.protocol !== "https:") {
            return null;
        }

        const response = await fetch(targetUrl.href, {
            headers: { "x-api-key": apiKey },
            cache: "no-store",
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        const count = data.acceptedCount;
        if (typeof count !== "number" || !Number.isFinite(count) || count < 0) {
            return null;
        }
        cachedAcceptedCount = Math.floor(count);
        cacheTimestamp = now;
        return cachedAcceptedCount;
    } catch {
        return null;
    }
};

export const getDropConfig = () => {
    const entryFee = parseNumber(process.env.DROP_ENTRY_FEE_CAD, 0);
    const minGladiators = normalizeCount(parseNumber(process.env.DROP_MIN_GLADIATORS, 8));
    const maxGladiators = normalizeCount(parseNumber(process.env.DROP_MAX_GLADIATORS, 10));
    const paidCountRaw = normalizeCount(parseNumber(process.env.DROP_PAID_COUNT, 0));
    const prizePct = parseRatio(process.env.DROP_PRIZE_PCT, 1);
    const housePct = parseRatio(process.env.DROP_HOUSE_PCT, 0);
    const currency = process.env.DROP_CURRENCY || "CAD";

    const paidCount = maxGladiators > 0 ? Math.min(paidCountRaw, maxGladiators) : paidCountRaw;

    return {
        entryFee,
        minGladiators,
        maxGladiators,
        paidCount,
        prizePct,
        housePct,
        currency,
        id: process.env.LIVE_DROP_ID || null,
        votingOpensAt: process.env.LIVE_DROP_VOTING_OPENS_AT || null,
        votingClosesAt: process.env.LIVE_DROP_VOTING_CLOSES_AT || null,
        winnerHandle: process.env.LIVE_DROP_WINNER_HANDLE || null,
        isActive: process.env.LIVE_DROP_ACTIVE ? process.env.LIVE_DROP_ACTIVE === "true" : true
    };
};

export const getLiveStatus = (config, nowMs = Date.now()) => {
    if (!config.isActive || !config.votingOpensAt || !config.votingClosesAt) {
        return { status: "CLOSED_UPCOMING" };
    }

    const opensAt = new Date(config.votingOpensAt).getTime();
    const closesAt = new Date(config.votingClosesAt).getTime();

    if (Number.isNaN(opensAt) || Number.isNaN(closesAt)) {
        return { status: "CLOSED_UPCOMING" };
    }

    if (nowMs < opensAt) {
        return {
            status: "CLOSED_UPCOMING",
            dropId: config.id || undefined,
            votingOpensAt: new Date(opensAt).toISOString()
        };
    }

    if (nowMs >= opensAt && nowMs <= closesAt) {
        return {
            status: "OPEN",
            dropId: config.id || undefined,
            votingClosesAt: new Date(closesAt).toISOString()
        };
    }

    return {
        status: "CLOSED_ENDED",
        dropId: config.id || undefined,
        winnerHandle: config.winnerHandle || undefined
    };
};

export const getDropStatus = async (nowMs = Date.now()) => {
    const config = getDropConfig();
    const live = getLiveStatus(config, nowMs);

    const liveCount = await fetchAcceptedCount();
    const paidCount = liveCount !== null ? Math.min(liveCount, config.maxGladiators) : config.paidCount;

    const pot = Math.round(config.entryFee * paidCount);
    const winnerPayout = Math.round(pot * config.prizePct);
    const houseCut = Math.round(pot * config.housePct);

    return {
        ...live,
        entryFee: config.entryFee,
        minGladiators: config.minGladiators,
        maxGladiators: config.maxGladiators,
        paidCount,
        prizePct: config.prizePct,
        housePct: config.housePct,
        currency: config.currency,
        pot,
        winnerPayout,
        houseCut
    };
};
