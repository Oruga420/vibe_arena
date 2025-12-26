"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function SponsorForm() {
    const [status, setStatus] = useState(null);
    const { t } = useLanguage();
    const areas = t("sponsor.form.fields.areas");
    const typeOptions = t("sponsor.form.fields.sponsorType.options");
    const budgetOptions = t("sponsor.form.fields.budget.options");
    const visibilityOptions = t("sponsor.form.fields.visibility.options");

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus({
            type: "success",
            message: t("sponsor.form.success")
        });
        event.currentTarget.reset();
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="company">{t("sponsor.form.fields.company.label")}</label>
                <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={t("sponsor.form.fields.company.placeholder")}
                    required
                />
            </div>
            <div className="field">
                <label htmlFor="contact">{t("sponsor.form.fields.contact.label")}</label>
                <input
                    id="contact"
                    name="contact"
                    type="text"
                    placeholder={t("sponsor.form.fields.contact.placeholder")}
                    required
                />
            </div>
            <div className="field">
                <label htmlFor="email">{t("sponsor.form.fields.email.label")}</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("sponsor.form.fields.email.placeholder")}
                    required
                />
            </div>
            <div className="field">
                <label htmlFor="website">{t("sponsor.form.fields.website.label")}</label>
                <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder={t("sponsor.form.fields.website.placeholder")}
                />
            </div>
            <fieldset className="field fieldset">
                <legend>{t("sponsor.form.fields.areasLabel")}</legend>
                <div className="checkbox-grid">
                    {areas && (
                        <>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="food" />
                                <span>{areas.food}</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="venue" />
                                <span>{areas.venue}</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="prizes" />
                                <span>{areas.prizes}</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="travel" />
                                <span>{areas.travel}</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="tooling" />
                                <span>{areas.tooling}</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="marketing" />
                                <span>{areas.marketing}</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="streaming" />
                                <span>{areas.streaming}</span>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="areas" value="other" />
                                <span>{areas.other}</span>
                            </label>
                        </>
                    )}
                </div>
            </fieldset>
            <div className="field">
                <label htmlFor="theme">{t("sponsor.form.fields.theme.label")}</label>
                <textarea
                    id="theme"
                    name="theme"
                    placeholder={t("sponsor.form.fields.theme.placeholder")}
                ></textarea>
            </div>
            <div className="field">
                <label htmlFor="pain">{t("sponsor.form.fields.pain.label")}</label>
                <textarea
                    id="pain"
                    name="pain"
                    placeholder={t("sponsor.form.fields.pain.placeholder")}
                ></textarea>
            </div>
            <div className="field">
                <label htmlFor="sponsorType">{t("sponsor.form.fields.sponsorType.label")}</label>
                <select id="sponsorType" name="sponsorType">
                    <option value="">{t("sponsor.form.fields.sponsorType.placeholder")}</option>
                    <option value="cash">{typeOptions?.cash}</option>
                    <option value="inkind">{typeOptions?.inkind}</option>
                    <option value="mix">{typeOptions?.mix}</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="budget">{t("sponsor.form.fields.budget.label")}</label>
                <select id="budget" name="budget">
                    <option value="">{t("sponsor.form.fields.budget.placeholder")}</option>
                    <option value="low">{budgetOptions?.low}</option>
                    <option value="mid">{budgetOptions?.mid}</option>
                    <option value="high">{budgetOptions?.high}</option>
                    <option value="premium">{budgetOptions?.premium}</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="visibility">{t("sponsor.form.fields.visibility.label")}</label>
                <select id="visibility" name="visibility">
                    <option value="">{t("sponsor.form.fields.visibility.placeholder")}</option>
                    <option value="logo">{visibilityOptions?.logo}</option>
                    <option value="booth">{visibilityOptions?.booth}</option>
                    <option value="talk">{visibilityOptions?.talk}</option>
                    <option value="judge">{visibilityOptions?.judge}</option>
                    <option value="mentor">{visibilityOptions?.mentor}</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="timeline">{t("sponsor.form.fields.timeline.label")}</label>
                <input
                    id="timeline"
                    name="timeline"
                    type="text"
                    placeholder={t("sponsor.form.fields.timeline.placeholder")}
                />
            </div>
            <div className="field">
                <label htmlFor="notes">{t("sponsor.form.fields.notes.label")}</label>
                <textarea
                    id="notes"
                    name="notes"
                    placeholder={t("sponsor.form.fields.notes.placeholder")}
                ></textarea>
            </div>
            <div>
                <button className="btn-primary" type="submit">
                    {t("sponsor.form.submit")}
                </button>
                {status ? (
                    <div className={`form-status ${status.type}`}>{status.message}</div>
                ) : (
                    <div className="form-status">{t("sponsor.form.helper")}</div>
                )}
            </div>
        </form>
    );
}
