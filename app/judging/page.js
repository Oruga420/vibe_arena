"use client";

import Link from "next/link";
import JudgingBars from "../../components/JudgingBars";
import { useLanguage } from "../../components/LanguageProvider";

export default function JudgingPage() {
    const { t } = useLanguage();
    const cards = t("judging.weights.cards");
    const checklist = t("judging.checklist.items");

    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {t("judging.hero.tag")}
                    </p>
                    <h1>{t("judging.hero.title")}</h1>
                    <p>{t("judging.hero.body")}</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            {t("judging.hero.primary")}
                        </Link>
                        <Link href="/how" className="btn-ghost">
                            {t("judging.hero.secondary")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="judging-grid">
                    <div>
                        <div className="section-header">
                            <p className="mono">{t("judging.weights.label")}</p>
                            <h2>{t("judging.weights.title")}</h2>
                            <p style={{ marginTop: "20px", color: "var(--text-muted)" }}>{t("judging.weights.body")}</p>
                        </div>
                        <div className="cards-grid">
                            {Array.isArray(cards) &&
                                cards.map((card) => (
                                    <div className="card-link" key={card.title}>
                                        <span>{card.tag}</span>
                                        <h3>{card.title}</h3>
                                        <p>{card.body}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <JudgingBars />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("judging.checklist.label")}</p>
                    <h2>{t("judging.checklist.title")}</h2>
                </div>
                <div className="grid-4">
                    {Array.isArray(checklist) &&
                        checklist.map((item) => (
                            <div className="card" key={item.title}>
                                <span className="card-num">{item.num}</span>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </div>
                        ))}
                </div>
            </section>
        </main>
    );
}
