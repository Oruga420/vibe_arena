"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function ApplyForm() {
    const [status, setStatus] = useState(null);
    const { t } = useLanguage();
    const stackOptions = t("apply.form.fields.stack.options");
    const timezoneOptions = t("apply.form.fields.timezone.options");
    const demoOptions = t("apply.form.fields.demo.options");

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus({
                type: "error",
                message: t("apply.form.error")
            });
            return;
        }

        setStatus({
            type: "success",
            message: t("apply.form.success")
        });
        form.reset();
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit} noValidate>
            <div className="field">
                <label htmlFor="name">
                    {t("apply.form.fields.name.label")} <span className="field-required">*</span>
                </label>
                <input id="name" name="name" type="text" placeholder={t("apply.form.fields.name.placeholder")} required />
            </div>
            <div className="field">
                <label htmlFor="email">
                    {t("apply.form.fields.email.label")} <span className="field-required">*</span>
                </label>
                <input id="email" name="email" type="email" placeholder={t("apply.form.fields.email.placeholder")} required />
            </div>
            <div className="field">
                <label htmlFor="timezone">
                    {t("apply.form.fields.timezone.label")} <span className="field-required">*</span>
                </label>
                <select id="timezone" name="timezone" required>
                    <option value="">{t("apply.form.fields.timezone.placeholder")}</option>
                    <option value="et">{timezoneOptions?.et}</option>
                    <option value="ct">{timezoneOptions?.ct}</option>
                    <option value="mt">{timezoneOptions?.mt}</option>
                    <option value="pt">{timezoneOptions?.pt}</option>
                    <option value="gmt3">{timezoneOptions?.gmt3}</option>
                    <option value="gmt">{timezoneOptions?.gmt}</option>
                    <option value="cet">{timezoneOptions?.cet}</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="stack">
                    {t("apply.form.fields.stack.label")} <span className="field-required">*</span>
                </label>
                <select id="stack" name="stack" required>
                    <option value="">{t("apply.form.fields.stack.placeholder")}</option>
                    <option value="fullstack">{stackOptions?.fullstack}</option>
                    <option value="frontend">{stackOptions?.frontend}</option>
                    <option value="backend">{stackOptions?.backend}</option>
                    <option value="mobile">{stackOptions?.mobile}</option>
                    <option value="data">{stackOptions?.data}</option>
                    <option value="other">{stackOptions?.other}</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="github">
                    {t("apply.form.fields.github.label")} <span className="field-required">*</span>
                </label>
                <input id="github" name="github" type="url" placeholder={t("apply.form.fields.github.placeholder")} required />
            </div>
            <div className="field">
                <label htmlFor="x">{t("apply.form.fields.x.label")}</label>
                <input id="x" name="x" type="url" placeholder={t("apply.form.fields.x.placeholder")} />
            </div>
            <div className="field">
                <label htmlFor="linkedin">{t("apply.form.fields.linkedin.label")}</label>
                <input id="linkedin" name="linkedin" type="url" placeholder={t("apply.form.fields.linkedin.placeholder")} />
            </div>
            <div className="field">
                <label htmlFor="demo">
                    {t("apply.form.fields.demo.label")} <span className="field-required">*</span>
                </label>
                <select id="demo" name="demo" required>
                    <option value="">{t("apply.form.fields.demo.placeholder")}</option>
                    <option value="yes">{demoOptions?.yes}</option>
                    <option value="no">{demoOptions?.no}</option>
                </select>
            </div>
            <div className="field checkbox-field">
                <label className="checkbox-item">
                    <input id="fairplay" name="fairplay" type="checkbox" required />
                    <span>
                        {t("apply.form.fields.fairplay.label")}{" "}
                        <Link href="/judging">({t("nav.judging")})</Link>
                    </span>
                </label>
            </div>
            <div className="form-consent">{t("apply.form.consent")}</div>
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
