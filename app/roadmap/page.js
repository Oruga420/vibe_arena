"use client";

import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";

export default function RoadmapPage() {
    const { t } = useLanguage();
    const statusItems = t("roadmap.status.items");
    const checklistItems = t("roadmap.checklist.items");
    const waysItems = t("roadmap.ways.items");
    const discordUrl = "https://discord.com";

    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {t("roadmap.hero.tag")}
                    </p>
                    <h1>{t("roadmap.hero.title")}</h1>
                    <p>{t("roadmap.hero.body")}</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            {t("roadmap.hero.primary")}
                        </Link>
                        <a href={discordUrl} className="btn-ghost" target="_blank" rel="noreferrer">
                            {t("roadmap.hero.secondary")}
                        </a>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("roadmap.status.label")}</p>
                    <h2>{t("roadmap.status.title")}</h2>
                    <p style={{ marginTop: "20px", color: "var(--text-muted)" }}>{t("roadmap.status.body")}</p>
                </div>
                <div className="status-card">
                    <div className="status-lines">
                        {Array.isArray(statusItems) &&
                            statusItems.map((item) => (
                                <div className="status-line" key={item.label}>
                                    <span className="status-label">{item.label}</span>
                                    <span className="status-value">{item.value}</span>
                                </div>
                            ))}
                    </div>
                    <div className="hero-ctas" style={{ marginTop: "24px" }}>
                        <Link href="/apply" className="btn-primary">
                            {t("roadmap.status.cta")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{t("roadmap.checklist.label")}</p>
                    <h2>{t("roadmap.checklist.title")}</h2>
                </div>
                <div className="cards-grid">
                    {Array.isArray(checklistItems) &&
                        checklistItems.map((item) => (
                            <div className="card-link static" key={item.title}>
                                <span>{item.status}</span>
                                <h3>{item.title}</h3>
                            </div>
                        ))}
                </div>
                <div className="hero-ctas" style={{ marginTop: "32px" }}>
                    <a href={discordUrl} className="btn-ghost" target="_blank" rel="noreferrer">
                        {t("roadmap.checklist.cta")}
                    </a>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("roadmap.ways.label")}</p>
                    <h2>{t("roadmap.ways.title")}</h2>
                </div>
                <div className="cards-grid">
                    {Array.isArray(waysItems) &&
                        waysItems.map((item) => (
                            <div className="card-link static" key={item.title}>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </div>
                        ))}
                </div>
                <div className="hero-ctas" style={{ marginTop: "32px" }}>
                    <Link href="/apply" className="btn-primary">
                        {t("roadmap.ways.primary")}
                    </Link>
                    <Link href="/" className="btn-ghost">
                        {t("roadmap.ways.secondary")}
                    </Link>
                    <a href={discordUrl} className="btn-ghost" target="_blank" rel="noreferrer">
                        {t("roadmap.ways.tertiary")}
                    </a>
                </div>
                <Link href="/sponsor" className="roadmap-sponsor">
                    {t("roadmap.ways.sponsor")}
                </Link>
            </section>
        </main>
    );
}
