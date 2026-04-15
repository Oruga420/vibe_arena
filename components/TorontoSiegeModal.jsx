"use client";

import { useEffect, useState } from "react";

const LUMA_URL = "https://lu.ma/vibe-toronto-siege"; // TODO: reemplaza con el link real de Luma
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=174+Spadina+Ave+Toronto+ON+M5T+2C2";

export default function TorontoSiegeModal() {
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
            aria-label="Vibe Coding Colosseum — The Toronto Siege"
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
                        TORONTO TECH WEEK 2026
                    </span>
                    <span className="mono" style={{ fontSize: "11px", fontWeight: 700 }}>
                        MAY 26–29
                    </span>
                </div>

                {/* Body */}
                <div style={{ padding: "28px 32px 24px" }}>
                    <button
                        type="button"
                        className="modal-close"
                        onClick={handleClose}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                    <p className="mono" style={{ color: "var(--primary-green)", fontSize: "11px", marginBottom: "8px", letterSpacing: "0.08em" }}>
                        DROP ESPECIAL — EN VIVO
                    </p>

                    <h2 style={{ fontSize: "1.5rem", lineHeight: 1.2, marginBottom: "6px" }}>
                        The Toronto Siege ⚔️
                    </h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "20px", fontSize: "0.9rem" }}>
                        El Colosseum llega a Toronto en persona. Sin paneles. Sin pitch decks. Solo gladiadores, armas de IA, y 45 minutos en el reloj.
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
                            <span style={{ fontSize: "0.9rem" }}><strong>Thursday, May 28, 2026</strong> — 7:00 PM – 9:30 PM EST</span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span>🎟️</span>
                            <span style={{ fontSize: "0.9rem" }}><strong>FREE entry</strong> — Cash prize for the champion</span>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <span>👥</span>
                            <span style={{ fontSize: "0.9rem" }}>20 spots total — 8–10 gladiadores en el ring. <strong>Se llena rápido.</strong></span>
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
                                174 Spadina Ave, Toronto — On2 · Second Floor →
                            </a>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <a
                            href="/apply"
                            className="btn-primary"
                            style={{ textAlign: "center", textDecoration: "none", display: "block" }}
                            onClick={handleClose}
                        >
                            ⚔️ Entra al Arena — Regístrate en VCC
                        </a>
                        <a
                            href={LUMA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost"
                            style={{ textAlign: "center", textDecoration: "none", display: "block" }}
                        >
                            🗓️ RSVP en Luma — Toronto Tech Week
                        </a>
                    </div>

                    <p style={{ marginTop: "14px", fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                        Para entrar al ring debes registrarte en <strong>vibecodingcolosseum.com</strong>. Sin avatar, sin entrada.
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
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
