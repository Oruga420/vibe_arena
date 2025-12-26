"use client";

import Link from "next/link";
import { useLanguage } from "../../components/LanguageProvider";

export default function RoadmapPage() {
    const { t } = useLanguage();
    const items = t("roadmap.manifesto.items");

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
                        <Link href="/faq" className="btn-ghost">
                            {t("roadmap.hero.secondary")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="manifesto">
                    <p className="mono" style={{ marginBottom: "20px", textAlign: "center" }}>
                        {t("roadmap.manifesto.label")}
                    </p>
                    <h2 style={{ textAlign: "center", marginBottom: "40px", fontSize: "2rem" }}>
                        {t("roadmap.manifesto.title")}
                    </h2>

                    {Array.isArray(items) &&
                        items.map((item, index) => (
                            <div className="roadmap-item" key={item}>
                                <div className={`check${index === 0 ? " done" : ""}`}></div>
                                <span>{item}</span>
                            </div>
                        ))}

                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Link href="/apply" className="btn-primary">
                            {t("roadmap.manifesto.primary")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{t("roadmap.community.label")}</p>
                    <h2>{t("roadmap.community.title")}</h2>
                </div>
                <p style={{ maxWidth: "680px", color: "#444", marginBottom: "32px" }}>
                    {t("roadmap.community.body")}
                </p>
                <div className="hero-ctas">
                    <Link href="/apply" className="btn-primary">
                        {t("roadmap.community.primary")}
                    </Link>
                    <Link href="/faq" className="btn-ghost">
                        {t("roadmap.community.secondary")}
                    </Link>
                </div>
            </section>
        </main>
    );
}
