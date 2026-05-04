"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

const LUMA_URL = "https://luma.com/924a9ivf";

export default function WaitlistSection() {
    const { t } = useLanguage();
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            role: formData.get("role"),
        };

        if (!data.name || !data.email || !data.role) {
            setStatus({ type: "error", message: t("waitlist.error") });
            return;
        }

        setStatus({ type: "loading", message: "..." });

        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (!res.ok) {
                setStatus({ type: "error", message: result.message || t("waitlist.error") });
                return;
            }

            setStatus({ type: "success", message: t("waitlistSection.success") });
            form.reset();
        } catch {
            setStatus({ type: "error", message: t("waitlist.error") });
        }
    };

    return (
        <div style={{
            border: "1px solid var(--primary-green)",
            padding: "32px",
            background: "rgba(0,255,100,0.03)",
            maxWidth: "560px"
        }}>
            <p className="mono" style={{
                color: "var(--primary-green)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                marginBottom: "8px"
            }}>
                {t("waitlistSection.label")}
            </p>
            <h2 style={{ marginBottom: "8px" }}>{t("waitlistSection.title")}</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "24px", fontSize: "0.95rem" }}>
                {t("waitlistSection.body")}
            </p>

            {status?.type === "success" ? (
                <div>
                    <p style={{ color: "var(--primary-green)", fontWeight: 700, marginBottom: "20px" }}>
                        {status.message}
                    </p>
                    <a
                        href={LUMA_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ textDecoration: "none", display: "inline-block" }}
                    >
                        {t("waitlistSection.lumaAfterSuccess")}
                    </a>
                </div>
            ) : (
                <form className="form-grid" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="wl-name">
                            {t("waitlist.fields.name")} <span className="field-required">*</span>
                        </label>
                        <input
                            id="wl-name"
                            name="name"
                            type="text"
                            placeholder={t("waitlist.placeholders.name")}
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="wl-email">
                            {t("waitlist.fields.email")} <span className="field-required">*</span>
                        </label>
                        <input
                            id="wl-email"
                            name="email"
                            type="email"
                            placeholder={t("waitlist.placeholders.email")}
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="wl-role">
                            {t("waitlist.fields.role")} <span className="field-required">*</span>
                        </label>
                        <select id="wl-role" name="role" required>
                            <option value="">{t("waitlist.placeholders.role")}</option>
                            <option value="arena">{t("waitlist.roles.arena")}</option>
                            <option value="spectator">{t("waitlist.roles.spectator")}</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button className="btn-primary" type="submit">
                            {t("waitlistSection.submit")}
                        </button>
                    </div>
                    {status && status.type !== "loading" && (
                        <div className={`form-status ${status.type}`}>{status.message}</div>
                    )}
                    {!status && (
                        <div className="form-status">{t("waitlistSection.helper")}</div>
                    )}
                </form>
            )}
        </div>
    );
}
