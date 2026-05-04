"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const LUMA_URL = "https://luma.com/924a9ivf";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=174+Spadina+Ave+Toronto+ON+M5T+2C2";

export default function TorontoSiegeModal() {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (window.__torontoSiegeDismissed) return;
        const timer = setTimeout(() => setOpen(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        window.__torontoSiegeDismissed = true;
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={t("torontoSiege.title")}
            onClick={handleClose}
            style={{ background: "rgba(0,0,0,0.75)" }}
        >
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: "560px",
                    padding: "0",
                    overflow: "hidden",
                    border: "1px solid var(--primary-green)",
                    boxShadow: "0 0 40px rgba(0,255,100,0.15)"
                }}
            >
                {/* Header Banner */}
                <div style={{
                    background: "var(--primary-green)",
                    color: "#000",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <span className="mono" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em" }}>
                        {t("torontoSiege.ttw")}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span className="mono" style={{ fontSize: "11px", fontWeight: 700 }}>
                            {t("torontoSiege.ttwDates")}
                        </span>
                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label={t("torontoSiege.close")}
                            style={{
                                background: "rgba(0,0,0,0.25)",
                                border: "none",
                                color: "#000",
                                fontWeight: 700,
                                fontSize: "14px",
                                width: "22px",
                                height: "22px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "3px",
                                lineHeight: 1
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: "28px 32px 24px" }}>
                    <p className="mono" style={{ color: "var(--primary-green)", fontSize: "11px", marginBottom: "8px", letterSpacing: "0.08em" }}>
                        {t("torontoSiege.dropLabel")}
                    </p>

                    <h2 style={{ fontSize: "1.5rem", lineHeight: 1.2, marginBottom: "6px" }}>
                        {t("torontoSiege.title")}
                    </h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "20px", fontSize: "0.9rem" }}>
                        {t("torontoSiege.tagline")}
                    </p>

                    {/* Event Details */}
                    <div style={{
                        background: "rgba(0,255,100,0.05)",
                        border: "1px solid rgba(0,255,100,0.2)",
                        padding: "14px 16px",
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                    }}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span>📅</span>
                            <span style={{ fontSize: "0.9rem" }}><strong>{t("torontoSiege.date")}</strong></span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span>🎟️</span>
                            <span style={{ fontSize: "0.9rem" }}>{t("torontoSiege.entry")}</span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span>👥</span>
                            <span style={{ fontSize: "0.9rem" }}>
                                {t("torontoSiege.spots")} <strong>{t("torontoSiege.spotsBold")}</strong>
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span>📍</span>
                            <a
                                href={MAPS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    fontSize: "0.9rem",
                                    color: "var(--primary-green)",
                                    textDecoration: "underline",
                                    fontWeight: 600
                                }}
                            >
                                {t("torontoSiege.location")}
                            </a>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <a
                            href={LUMA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ textAlign: "center", textDecoration: "none", display: "block" }}
                            onClick={handleClose}
                        >
                            {t("torontoSiege.primaryCta")}
                        </a>
                        <a
                            href={LUMA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost"
                            style={{ textAlign: "center", textDecoration: "none", display: "block" }}
                        >
                            {t("torontoSiege.lumaCta")}
                        </a>
                    </div>

                    <p style={{ marginTop: "14px", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                        {t("torontoSiege.disclaimer")}
                    </p>

                    <button
                        type="button"
                        onClick={handleClose}
                        style={{
                            marginTop: "10px",
                            background: "none",
                            border: "none",
                            color: "var(--text-muted)",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            display: "block",
                            width: "100%",
                            textAlign: "center"
                        }}
                    >
                        {t("torontoSiege.close")}
                    </button>
                </div>
            </div>
        </div>
    );
}
