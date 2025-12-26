"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function ApplyForm() {
    const [status, setStatus] = useState(null);
    const { t } = useLanguage();
    const options = t("apply.form.fields.stack.options");

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus({
            type: "success",
            message: t("apply.form.success")
        });
        event.currentTarget.reset();
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="name">{t("apply.form.fields.name.label")}</label>
                <input id="name" name="name" type="text" placeholder={t("apply.form.fields.name.placeholder")} required />
            </div>
            <div className="field">
                <label htmlFor="email">{t("apply.form.fields.email.label")}</label>
                <input id="email" name="email" type="email" placeholder={t("apply.form.fields.email.placeholder")} required />
            </div>
            <div className="field">
                <label htmlFor="city">{t("apply.form.fields.city.label")}</label>
                <input id="city" name="city" type="text" placeholder={t("apply.form.fields.city.placeholder")} required />
            </div>
            <div className="field">
                <label htmlFor="stack">{t("apply.form.fields.stack.label")}</label>
                <select id="stack" name="stack" required>
                    <option value="">{t("apply.form.fields.stack.placeholder")}</option>
                    <option value="fullstack">{options?.fullstack}</option>
                    <option value="frontend">{options?.frontend}</option>
                    <option value="backend">{options?.backend}</option>
                    <option value="mobile">{options?.mobile}</option>
                    <option value="data">{options?.data}</option>
                    <option value="other">{options?.other}</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="portfolio">{t("apply.form.fields.portfolio.label")}</label>
                <input id="portfolio" name="portfolio" type="url" placeholder={t("apply.form.fields.portfolio.placeholder")} required />
            </div>
            <div className="field">
                <label htmlFor="why">{t("apply.form.fields.why.label")}</label>
                <textarea id="why" name="why" placeholder={t("apply.form.fields.why.placeholder")} required></textarea>
            </div>
            <div>
                <button className="btn-primary" type="submit">{t("apply.form.submit")}</button>
                {status ? (
                    <div className={`form-status ${status.type}`}>{status.message}</div>
                ) : (
                    <div className="form-status">{t("apply.form.helper")}</div>
                )}
            </div>
        </form>
    );
}
