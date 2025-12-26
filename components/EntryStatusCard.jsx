"use client";

import { useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import { buildDropTokens, formatTemplate } from "./dropFormat";
import useDropStatus from "./useDropStatus";

export default function EntryStatusCard({ note }) {
    const { t } = useLanguage();
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
            <div className="entry-grid">
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.entry")}</span>
                    <span className="entry-value">{values.tokens.fee}</span>
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
                    <span className="entry-value">
                        {formatTemplate(t("entry.values.payout"), values.tokens)}
                    </span>
                </div>
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.house")}</span>
                    <span className="entry-value">
                        {formatTemplate(t("entry.values.house"), values.tokens)}
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
                    <span className="entry-label">{t("entry.labels.pot")}</span>
                    <span className="entry-value">{values.tokens.pot}</span>
                </div>
                <div className="entry-row">
                    <span className="entry-label">{t("entry.labels.winner")}</span>
                    <span className="entry-value">{values.tokens.winnerPayout}</span>
                </div>
            </div>
            {note ? <p className="entry-note">{formatTemplate(note, values.tokens)}</p> : null}
        </div>
    );
}
