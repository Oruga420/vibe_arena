"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import useDropStatus from "./useDropStatus";

const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;

const formatCountdown = (valueMs) => {
    const clamped = Math.max(0, valueMs);
    const hours = Math.floor(clamped / MS_PER_HOUR);
    const minutes = Math.floor((clamped % MS_PER_HOUR) / MS_PER_MINUTE);
    const seconds = Math.floor((clamped % MS_PER_MINUTE) / MS_PER_SECOND);

    if (hours > 0) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const normalizeHandle = (handle) => {
    if (!handle) {
        return "";
    }
    return handle.startsWith("@") ? handle : `@${handle}`;
};

export default function LiveVoteStatus() {
    const { t } = useLanguage();
    const { data: payload } = useDropStatus("live");
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        if (!payload || payload.status !== "OPEN" || !payload.votingClosesAt) {
            setCountdown("");
            return;
        }

        const updateCountdown = () => {
            const diff = new Date(payload.votingClosesAt).getTime() - Date.now();
            setCountdown(formatCountdown(diff));
        };

        updateCountdown();
        const intervalId = window.setInterval(updateCountdown, 1000);
        return () => window.clearInterval(intervalId);
    }, [payload]);

    const isOpen = payload?.status === "OPEN";
    const statusClass = payload?.status ? payload.status.toLowerCase().replace("_", "-") : "loading";

    const { message, ctaLabel, ctaHref, ctaClass } = useMemo(() => {
        if (!payload) {
            return {
                message: t("home.liveVote.noDrop"),
                ctaLabel: t("home.liveVote.ctaClosed"),
                ctaHref: "/apply",
                ctaClass: "btn-ghost"
            };
        }

        if (payload.status === "OPEN") {
            return {
                message: `${t("home.liveVote.open")} ${countdown || "00:00"}`,
                ctaLabel: t("home.liveVote.ctaOpen"),
                ctaHref: payload.dropId ? `/vote/${payload.dropId}` : "/vote",
                ctaClass: "btn-primary"
            };
        }

        if (payload.status === "CLOSED_ENDED") {
            const winner = payload.winnerHandle ? normalizeHandle(payload.winnerHandle) : "";
            return {
                message: winner ? `${t("home.liveVote.ended")} ${winner}` : t("home.liveVote.endedPending"),
                ctaLabel: t("home.liveVote.ctaEnded"),
                ctaHref: payload.dropId ? `/results/${payload.dropId}` : "/results",
                ctaClass: "btn-ghost"
            };
        }

        if (!payload.dropId) {
            return {
                message: t("home.liveVote.noDrop"),
                ctaLabel: t("home.liveVote.ctaClosed"),
                ctaHref: "/apply",
                ctaClass: "btn-ghost"
            };
        }

        return {
            message: t("home.liveVote.closed"),
            ctaLabel: t("home.liveVote.ctaClosed"),
            ctaHref: "/apply",
            ctaClass: "btn-ghost"
        };
    }, [payload, countdown, t]);

    return (
        <div className={`live-status ${statusClass}`}>
            <div className="live-status-body">
                <div className="live-status-header">
                    <p className="mono">{t("home.liveVote.label")}</p>
                    {isOpen ? <span className="badge-red live-badge">{t("home.liveVote.badgeOpen")}</span> : null}
                </div>
                <p className="live-status-message">{message}</p>
            </div>
            <Link href={ctaHref} className={ctaClass}>
                {ctaLabel}
            </Link>
        </div>
    );
}
