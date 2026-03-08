"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const CAGE_URL = "https://vibecodingcolosseum-image-prompts.vercel.app";

export default function CageGatewayModal({ open, onClose }) {
    const { t } = useLanguage();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | denied | error
    const [result, setResult] = useState(null);

    const handleClose = () => {
        setStatus("idle");
        setEmail("");
        setResult(null);
        onClose();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.trim()) return;

        setStatus("loading");

        try {
            const response = await fetch("/api/cage-gateway", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await response.json();

            if (data.authorized) {
                setResult(data);
                setStatus("success");
                // Redirect to Cage with email + token after brief delay
                setTimeout(() => {
                    const params = new URLSearchParams();
                    params.set("email", data.email);
                    if (data.token) params.set("token", data.token);
                    window.location.href = `${CAGE_URL}?${params.toString()}`;
                }, 1500);
            } else {
                setStatus("denied");
            }
        } catch {
            setStatus("error");
        }
    };

    const handleRetry = () => {
        setStatus("idle");
        setEmail("");
        setResult(null);
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!open || !mounted) return null;

    return createPortal(
        <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={t("cage.title")}
            onClick={handleClose}
        >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="modal-close"
                    onClick={handleClose}
                    aria-label="Close"
                >
                    x
                </button>

                {status === "idle" && (
                    <>
                        <p className="mono" style={{ marginBottom: "12px" }}>
                            {t("cage.label")}
                        </p>
                        <h2 style={{ marginBottom: "12px" }}>{t("cage.title")}</h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                            {t("cage.body")}
                        </p>
                        <form className="form-grid" onSubmit={handleSubmit} noValidate>
                            <div className="field">
                                <label htmlFor="cage-email">
                                    {t("cage.email")} <span className="field-required">*</span>
                                </label>
                                <input
                                    id="cage-email"
                                    type="email"
                                    placeholder={t("cage.placeholder")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button className="btn-primary" type="submit">
                                    {t("cage.submit")}
                                </button>
                                <button className="btn-ghost" type="button" onClick={handleClose}>
                                    {t("cage.cancel")}
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {status === "loading" && (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                        <div className="spinner" style={{ margin: "0 auto 16px" }}></div>
                        <p className="mono">{t("cage.validating")}</p>
                    </div>
                )}

                {status === "success" && (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                        <div style={{ fontSize: "48px", marginBottom: "12px" }}>⚔️</div>
                        <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "8px" }}>
                            {t("cage.successLabel")}
                        </p>
                        <h2 style={{ marginBottom: "8px" }}>
                            {t("cage.successTitle")}
                            {result?.name ? `, ${result.name}` : ""}
                        </h2>
                        <p style={{ color: "var(--text-muted)" }}>
                            {t("cage.successRedirecting")}
                        </p>
                    </div>
                )}

                {status === "denied" && (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔒</div>
                        <p className="mono" style={{ color: "var(--accent-red)", marginBottom: "8px" }}>
                            {t("cage.deniedLabel")}
                        </p>
                        <h2 style={{ marginBottom: "12px" }}>{t("cage.deniedTitle")}</h2>
                        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
                            {t("cage.deniedBody")}
                        </p>
                        <div className="modal-actions">
                            <Link href="/apply" className="btn-primary" onClick={handleClose}>
                                {t("cage.deniedApply")}
                            </Link>
                            <button className="btn-ghost" type="button" onClick={handleRetry}>
                                {t("cage.deniedRetry")}
                            </button>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                        <p style={{ color: "var(--accent-red)", marginBottom: "16px" }}>
                            {t("cage.error")}
                        </p>
                        <button className="btn-primary" type="button" onClick={handleRetry}>
                            {t("cage.deniedRetry")}
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
