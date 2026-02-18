"use client";

import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { buildDropTokens, formatTemplate } from "./dropFormat";
import useDropStatus from "./useDropStatus";

export default function EntryStatusCard({ note }) {
    const { t, language } = useLanguage();
    const { data } = useDropStatus("slow");

    const values = useMemo(() => {
        const paidCount = data?.paidCount ?? 0;
        const maxGladiators = data?.maxGladiators ?? 15;
        return {
            tokens: buildDropTokens(data),
            paidCount,
            maxGladiators
        };
    }, [data]);

    return (
        <div className="entry-card">
            <style jsx>{`
                .entry-discount {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .entry-original-price {
                    text-decoration: line-through;
                    opacity: 0.4;
                    font-size: 0.9em;
                    color: var(--text-muted);
                    position: relative;
                }
                .entry-free-badge {
                    display: inline-block;
                    background: var(--primary-green);
                    color: #fff;
                    font-weight: 800;
                    font-size: 0.75rem;
                    letter-spacing: 0.08em;
                    padding: 4px 12px;
                    border-radius: 999px;
                    animation: freePulse 2s ease-in-out infinite;
                }
                .entry-prize-highlight {
                    color: var(--primary-green);
                    font-weight: 700;
                }
                @keyframes freePulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 196, 106, 0.4); }
                    50% { transform: scale(1.05); box-shadow: 0 0 12px 4px rgba(0, 196, 106, 0.2); }
                }
            `}</style>
            <div className="entry-grid">
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.entry")}</span>
                    <span className="entry-value">
                        <span className="entry-discount">
                            <span className="entry-original-price">{values.tokens.originalFee}</span>
                            <span className="entry-free-badge">FREE BETA</span>
                        </span>
                    </span>
                </div>
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.min")}</span>
                    <span className="entry-value">{values.tokens.min}</span>
                </div>
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.cap")}</span>
                    <span className="entry-value">{values.tokens.max}</span>
                </div>
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.payout")}</span>
                    <span className="entry-value entry-prize-highlight">
                        $100 CAD Cash
                    </span>
                </div>
            </div>
            <div className="entry-stats">
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.spots")}</span>
                    <span className="entry-value">
                        {values.paidCount} / {values.maxGladiators}
                    </span>
                </div>
                <div className="entry-row">
                    <span className="entry-label">
                        {language === "es" ? "Próximo drop" : "Next drop"}
                    </span>
                    <span className="entry-value">
                        {language === "es" ? "Domingo Feb 22" : "Sunday Feb 22"}
                    </span>
                </div>
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.winner")}</span>
                    <span className="entry-value entry-prize-highlight">$100 CAD</span>
                </div>
            </div>
            {note ? <p className="entry-note">{formatTemplate(note, values.tokens)}</p> : null}
        </div>
    );
}
