"use client";

import Link from "next/link";
import SponsorForm from "../../components/SponsorForm";
import { useLanguage } from "../../components/LanguageProvider";

export default function SponsorPage() {
    const { t } = useLanguage();
    const cards = t("sponsor.highlights.cards");

    return (
        <main>
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {t("sponsor.label")}
                    </p>
                    <h1>{t("sponsor.title")}</h1>
                    <p>{t("sponsor.body")}</p>
                    <div className="hero-ctas">
                        <Link href="/roadmap" className="btn-primary">
                            {t("home.season.secondary")}
                        </Link>
                        <Link href="/faq" className="btn-ghost">
                            {t("nav.faq")}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{t("sponsor.highlights.label")}</p>
                    <h2>{t("sponsor.highlights.title")}</h2>
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
            </section>

            <section className="section">
                <div className="manifesto" style={{ maxWidth: "980px" }}>
                    <p className="mono" style={{ marginBottom: "20px" }}>
                        {t("sponsor.form.title")}
                    </p>
                    <SponsorForm />
                </div>
            </section>
        </main>
    );
}
