"use client";

import { useRef } from "react";
import ApplyForm from "../../components/ApplyForm";
import EntryStatusCard from "../../components/EntryStatusCard";
import { useLanguage } from "../../components/LanguageProvider";

export default function ApplyPage() {
    const { t } = useLanguage();
    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
                <EntryStatusCard note={t("apply.entry.note")} />
                
                <div className="scroll-indicator" onClick={scrollToForm}>
                    <div className="scroll-arrow">↓</div>
                    <div className="scroll-banner">
                        SUBSCRIBE BELOW
                    </div>
                </div>
            </section>

            <section className="section" ref={formRef}>
                <div className="section-header">
                    <p className="mono">{t("apply.form.label")}</p>
                    <h2>{t("apply.form.title")}</h2>
                </div>
                <ApplyForm />
            </section>
        </main>
    );
}
