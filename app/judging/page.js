"use client";

import Link from "next/link";
import JudgingBars from "../../components/JudgingBars";
import { buildDropTokens, formatTemplate } from "../../components/dropFormat";
import { useLanguage } from "../../components/LanguageProvider";
import useDropStatus from "../../components/useDropStatus";

export default function JudgingPage() {
    const { t } = useLanguage();
    const { data } = useDropStatus("slow");
    const cards = t("judging.weights.cards");
    const entryItems = t("judging.entry.items");
    const checklist = t("judging.checklist.items");
    const formatItems = t("judging.format.items");
    const dqItems = t("judging.autoDQ.items");
    const tokens = buildDropTokens(data);

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

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("judging.entry.label")}</p>
                    <h2>{formatTemplate(t("judging.entry.title"), tokens)}</h2>
                </div>
                <div className="cards-grid">
                    {Array.isArray(entryItems) &&
                        entryItems.map((item) => (
                            <div className="card-link static" key={item}>
                                <p>{formatTemplate(item, tokens)}</p>
                            </div>
                        ))}
                </div>
                <p className="rules-note">{formatTemplate(t("judging.entry.note"), tokens)}</p>
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
                        <div className="bars-header">
                            <p className="mono">{t("judging.barsLabel")}</p>
                        </div>
                        <JudgingBars />
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("judging.format.label")}</p>
                    <h2>{t("judging.format.title")}</h2>
                </div>
                <div className="cards-grid">
                    {Array.isArray(formatItems) &&
                        formatItems.map((item) => (
                            <div className="card-link static" key={item}>
                                <p>{item}</p>
                            </div>
                        ))}
                </div>
                <p className="rules-note">{t("judging.format.note")}</p>
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

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{t("judging.autoDQ.label")}</p>
                    <h2>{t("judging.autoDQ.title")}</h2>
                </div>
                <div className="cards-grid">
                    {Array.isArray(dqItems) &&
                        dqItems.map((item) => (
                            <div className="card-link static" key={item}>
                                <p>{item}</p>
                            </div>
                        ))}
                </div>
                <p className="rules-note">{t("judging.autoDQ.note")}</p>
            </section>
        </main>
    );
}
