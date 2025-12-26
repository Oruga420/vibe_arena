"use client";

import Link from "next/link";
import FaqAccordion from "../../components/FaqAccordion";
import { useLanguage } from "../../components/LanguageProvider";

export default function FaqPage() {
    const { t } = useLanguage();

    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {t("faq.hero.tag")}
                    </p>
                    <h1>{t("faq.hero.title")}</h1>
                    <p>{t("faq.hero.body")}</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            {t("faq.hero.primary")}
                        </Link>
                        <Link href="/how" className="btn-ghost">
                            {t("faq.hero.secondary")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("faq.list.label")}</p>
                    <h2>{t("faq.list.title")}</h2>
                </div>
                <FaqAccordion />
            </section>
        </main>
    );
}
