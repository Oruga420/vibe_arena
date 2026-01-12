"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { buildDropTokens, formatTemplate } from "./dropFormat";
import useDropStatus from "./useDropStatus";

export default function ApplyForm() {
    const [status, setStatus] = useState(null);
    const { t } = useLanguage();
    const { data } = useDropStatus("slow");
    const stackOptions = t("apply.form.fields.stack.options");
    const timezoneOptions = t("apply.form.fields.timezone.options");
    const demoOptions = t("apply.form.fields.demo.options");
    const maxGladiators = data?.maxGladiators ?? 15;
    const paidCount = data?.paidCount ?? 0;
    const isSoldOut = paidCount >= maxGladiators;

    const submitLabel = useMemo(() => {
        const template = t("apply.form.submit");
        const tokens = buildDropTokens(data);
        return formatTemplate(template, tokens);
    }, [t, data]);

    const helperText = useMemo(() => {
        const template = t("apply.form.helper");
        const tokens = buildDropTokens(data);
        return formatTemplate(template, tokens);
    }, [t, data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const tokens = buildDropTokens(data);

        if (!form.checkValidity()) {
            form.reportValidity();
            setStatus({
                type: "error",
                message: t("apply.form.error")
            });
            return;
        }

        setStatus({ type: "loading", message: "Enviando registro..." });

        try {
            const formData = new FormData(form);
            const body = {
                name: formData.get("name"),
                colosseum_name: formData.get("colosseum_name"),
                email: formData.get("email"),
                timezone: formData.get("timezone"),
                stack: formData.get("stack"),
                github: formData.get("github"),
                x: formData.get("x"),
                linkedin: formData.get("linkedin"),
                demo: formData.get("demo"),
                fairplay: formData.get("fairplay") === "on"
            };

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMessage = result.errors 
                    ? result.errors.map(e => e.message).join(", ") 
                    : result.message || "Ocurrió un error inesperado.";
                
                setStatus({
                    type: "error",
                    message: errorMessage
                });
                return;
            }

            setStatus({
                type: "success",
                message: formatTemplate(t("apply.form.success"), tokens)
            });
            form.reset();

        } catch (error) {
            console.error("Form submission error:", error);
            setStatus({
                type: "error",
                message: "Error de red. Por favor intenta de nuevo."
            });
        }
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
                <label htmlFor="colosseum_name">
                    {t("apply.form.fields.colosseumName.label")}
                </label>
                <input id="colosseum_name" name="colosseum_name" type="text" placeholder={t("apply.form.fields.colosseumName.placeholder")} />
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
                <button className="btn-primary" type="submit" disabled={isSoldOut}>
                    {isSoldOut ? t("apply.form.soldOut") : submitLabel}
                </button>
                {status ? (
                    <div className={`form-status ${status.type}`}>{status.message}</div>
                ) : (
                    <div className="form-status">{helperText}</div>
                )}
            </div>
        </form>
    );
}
