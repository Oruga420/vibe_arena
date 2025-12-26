"use client";

import ApplyForm from "../../components/ApplyForm";
import { useLanguage } from "../../components/LanguageProvider";

export default function ApplyPage() {
    const { t } = useLanguage();

    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {t("apply.hero.tag")}
                    </p>
                    <h1>{t("apply.hero.title")}</h1>
                    <p>{t("apply.hero.body")}</p>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("apply.form.label")}</p>
                    <h2>{t("apply.form.title")}</h2>
                </div>
                <ApplyForm />
            </section>
        </main>
    );
}
