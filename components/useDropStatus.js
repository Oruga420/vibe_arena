"use client";

import { useEffect, useState } from "react";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;

const getRefreshInterval = (payload, mode) => {
    if (mode === "slow") {
        return 60000;
    }
    if (!payload) {
        return 60000;
    }
    if (payload.status === "OPEN") {
        return 3000;
    }
    if (payload.status === "CLOSED_UPCOMING" && payload.votingOpensAt) {
        const diff = new Date(payload.votingOpensAt).getTime() - Date.now();
        if (diff <= MS_PER_HOUR) {
            return 15000;
        }
    }
    return 60000;
};

export default function useDropStatus(mode = "live") {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let timeoutId;
        let cancelled = false;

        const fetchStatus = async () => {
            try {
                const response = await fetch("/api/drop-status", { cache: "no-store" });
                const payload = await response.json();
                if (cancelled) {
                    return;
                }
                setData(payload);
                setError(null);
                timeoutId = window.setTimeout(fetchStatus, getRefreshInterval(payload, mode));
            } catch (fetchError) {
                if (cancelled) {
                    return;
                }
                setError(fetchError);
                timeoutId = window.setTimeout(fetchStatus, 60000);
            }
        };

        fetchStatus();

        return () => {
            cancelled = true;
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [mode]);

    return { data, error };
}
