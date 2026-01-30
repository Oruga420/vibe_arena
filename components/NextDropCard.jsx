"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import styles from "./NextDropCard.module.css";

export default function NextDropCard() {
    const { t } = useLanguage();
    const [dropData, setDropData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNextDrop() {
            try {
                const response = await fetch("/api/next-drop", { cache: "no-store" });
                if (response.ok) {
                    const data = await response.json();
                    setDropData(data);
                }
            } catch (error) {
                console.error("Error fetching next drop:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchNextDrop();
    }, []);

    const vibeTools = [
        "ChatGPT", "Gemini", "Claude", "AI Google Studio", "Replit",
        "Firebase Studio", "VS Code", "Antigravity", "Cursor",
        "CLI Codex", "Cline", "Claude Code"
    ];

    const hasActiveDrop = dropData?.name && dropData?.status === "OPEN";

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <p className="mono">{t("nextDrop.label")}</p>
                <h2>{t("nextDrop.title")}</h2>
            </div>

            {loading ? (
                <div className={styles.loadingState}>
                    <span className={styles.pulse}>Loading...</span>
                </div>
            ) : (
                <>
                    {/* Main Drop Status */}
                    <div className={styles.dropStatus}>
                        {hasActiveDrop ? (
                            <div className={styles.activeDrop}>
                                <span className={styles.liveIndicator}>● LIVE</span>
                                <h3>{dropData.name}</h3>
                            </div>
                        ) : (
                            <div className={styles.planningDrop}>
                                <span className={styles.planningIcon}>⚙️</span>
                                <h3>{t("nextDrop.planning")}</h3>
                            </div>
                        )}
                    </div>

                    {/* Valentine's Special Event */}
                    <div className={styles.valentineCard}>
                        <div className={styles.valentineHeader}>
                            <span className={styles.heartIcon}>💖</span>
                            <h3>{t("nextDrop.valentineTitle")}</h3>
                            <span className={styles.heartIcon}>💖</span>
                        </div>
                        <p className={styles.valentineDate}>Feb 14, 2026</p>
                        <div className={styles.valentineGlow}></div>
                    </div>

                    {/* Info Grid */}
                    <div className={styles.infoGrid}>
                        {/* Format Section - Split */}
                        <div className={styles.infoCard}>
                            <span className={styles.infoLabel}>{t("nextDrop.format")}</span>
                            <div className={styles.formatSplit}>
                                <div className={styles.formatItem}>
                                    <span className={styles.formatIcon}>🌐</span>
                                    <span>{t("nextDrop.formatGlobal")}</span>
                                </div>
                                <div className={styles.formatItem}>
                                    <span className={styles.formatIcon}>📍</span>
                                    <span>{t("nextDrop.formatToronto")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Duration Section - Detailed */}
                        <div className={styles.infoCard}>
                            <span className={styles.infoLabel}>{t("nextDrop.duration")}</span>
                            <span className={styles.infoValue}>60 minutes</span>
                            <div className={styles.durationBreakdown}>
                                <div className={styles.durationItem}>
                                    <span className={styles.durationTime}>15 min</span>
                                    <span className={styles.durationDesc}>{t("nextDrop.housekeeping")}</span>
                                </div>
                                <div className={styles.durationItem}>
                                    <span className={styles.durationTime}>40 min</span>
                                    <span className={styles.durationDesc}>{t("nextDrop.devTime")}</span>
                                </div>
                                <div className={styles.durationItem}>
                                    <span className={styles.durationTime}>5 min</span>
                                    <span className={styles.durationDesc}>{t("nextDrop.closing")}</span>
                                </div>
                            </div>
                        </div>

                        {/* Stack Section - Vibe Tools (same size as other cards) */}
                        <div className={styles.infoCard}>
                            <span className={styles.infoLabel}>{t("nextDrop.stack")}</span>
                            <div className={styles.toolsGrid}>
                                {vibeTools.map((tool) => (
                                    <span key={tool} className={styles.toolBadge}>{tool}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className={styles.ctaSection}>
                        <Link href="/gladiators" className={styles.ctaSecondary}>
                            <span className={styles.ctaIcon}>👁️</span>
                            {t("nextDrop.spectatorCta")}
                        </Link>
                        <Link href="/apply" className={styles.ctaPrimary}>
                            <span className={styles.ctaIcon}>⚔️</span>
                            {t("nextDrop.registerCta")}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
