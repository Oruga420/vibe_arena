"use client";

import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";

export default function HowPage() {
    const { t } = useLanguage();
    const steps = t("how.steps.items");
    const deliveryCards = t("how.delivery.cards");

    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {t("how.hero.tag")}
                    </p>
                    <h1>{t("how.hero.title")}</h1>
                    <p>{t("how.hero.body")}</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            {t("how.hero.primary")}
                        </Link>
                        <Link href="/judging" className="btn-ghost">
                            {t("how.hero.secondary")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("how.steps.label")}</p>
                    <h2>{t("how.steps.title")}</h2>
                </div>
                <div className="grid-4">
                    {Array.isArray(steps) &&
                        steps.map((step) => (
                            <div className="card" key={step.title}>
                                <span className="card-num">{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.body}</p>
                            </div>
                        ))}
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{t("how.delivery.label")}</p>
                    <h2>{t("how.delivery.title")}</h2>
                </div>
                <div className="cards-grid">
                    {Array.isArray(deliveryCards) &&
                        deliveryCards.map((card) => (
                            <div className="card-link" key={card.title}>
                                <span>{card.tag}</span>
                                <h3>{card.title}</h3>
                                <p>{card.body}</p>
                            </div>
                        ))}
                </div>
            </section>
        </main>
    );
}
