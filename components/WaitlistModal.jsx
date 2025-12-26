"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function WaitlistModal() {
    const { t } = useLanguage();
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus({
                type: "error",
                message: t("waitlist.error")
            });
            return;
        }

        setStatus({
            type: "success",
            message: t("waitlist.success")
        });
        form.reset();
    };

    if (!open) {
        return null;
    }

    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={t("waitlist.label")}>
            <div className="modal">
                <button type="button" className="modal-close" onClick={handleClose} aria-label={t("waitlist.close")}>
                    x
                </button>
                <p className="mono" style={{ marginBottom: "12px" }}>{t("waitlist.label")}</p>
                <h2 style={{ marginBottom: "12px" }}>{t("waitlist.title")}</h2>
                <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>{t("waitlist.body")}</p>
                <form className="form-grid" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="waitlist-name">
                            {t("waitlist.fields.name")} <span className="field-required">*</span>
                        </label>
                        <input id="waitlist-name" name="name" type="text" placeholder={t("waitlist.placeholders.name")} required />
                    </div>
                    <div className="field">
                        <label htmlFor="waitlist-email">
                            {t("waitlist.fields.email")} <span className="field-required">*</span>
                        </label>
                        <input id="waitlist-email" name="email" type="email" placeholder={t("waitlist.placeholders.email")} required />
                    </div>
                    <div className="field">
                        <label htmlFor="waitlist-role">
                            {t("waitlist.fields.role")} <span className="field-required">*</span>
                        </label>
                        <select id="waitlist-role" name="role" required>
                            <option value="">{t("waitlist.placeholders.role")}</option>
                            <option value="arena">{t("waitlist.roles.arena")}</option>
                            <option value="spectator">{t("waitlist.roles.spectator")}</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button className="btn-primary" type="submit">{t("waitlist.submit")}</button>
                        <button className="btn-ghost" type="button" onClick={handleClose}>
                            {t("waitlist.dismiss")}
                        </button>
                    </div>
                    {status ? (
                        <div className={`form-status ${status.type}`}>{status.message}</div>
                    ) : (
                        <div className="form-status">{t("waitlist.helper")}</div>
                    )}
                </form>
            </div>
        </div>
    );
}
