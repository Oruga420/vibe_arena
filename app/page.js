"use client";

import Link from "next/link";
import AsciiTower from "../components/AsciiTower";
import Countdown from "../components/Countdown";
import SponsorForm from "../components/SponsorForm";
import { useLanguage } from "../components/LanguageProvider";

export default function HomePage() {
    const { t } = useLanguage();
    const mapCards = t("home.map.cards");
    const mapLinks = ["/how", "/judging", "/roadmap", "/faq"];

    return (
        <main>
            <section className="hero">
                <AsciiTower />
                <div className="scanline" aria-hidden="true"></div>

                <div className="hero-content">
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "16px" }}>
                        {t("home.hero.tag")}
                    </p>
                    <h1>{t("home.hero.title")}</h1>
                    <p>{t("home.hero.body")}</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            {t("home.hero.primary")}
                        </Link>
                        <Link href="/judging" className="btn-ghost">
                            {t("home.hero.secondary")}
                        </Link>
                    </div>
                </div>

                <div className="drop-card">
                    <div className="mono" style={{ marginBottom: "20px", opacity: 0.5 }}>
                        {t("home.drop.title")}
                    </div>
                    <div className="drop-row">
                        <span>{t("home.drop.format")}</span>
                        <span>{t("home.drop.formatValue")}</span>
                    </div>
                    <div className="drop-row">
                        <span>{t("home.drop.duration")}</span>
                        <span>{t("home.drop.durationValue")}</span>
                    </div>
                    <div className="drop-row">
                        <span>{t("home.drop.stack")}</span>
                        <span>{t("home.drop.stackValue")}</span>
                    </div>
                    <Countdown targetDate="2025-02-01T00:00:00" />
                    <div className="mono" style={{ marginTop: "8px", fontSize: "0.6rem", color: "var(--accent-red)" }}>
                        {t("home.drop.spots")}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("home.map.label")}</p>
                    <h2>{t("home.map.title")}</h2>
                </div>
                <div className="cards-grid">
                    {Array.isArray(mapCards) &&
                        mapCards.map((card, index) => {
                            const href = mapLinks[index] || "/faq";
                            return (
                                <Link className="card-link" href={href} key={card.title}>
                                    <span>{card.tag}</span>
                                    <h3>{card.title}</h3>
                                    <p>{card.body}</p>
                                </Link>
                            );
                        })}
                </div>
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{t("home.season.label")}</p>
                    <h2>{t("home.season.title")}</h2>
                </div>
                <p style={{ maxWidth: "680px", color: "#444", marginBottom: "32px" }}>
                    {t("home.season.body")}
                </p>
                <div className="hero-ctas">
                    <Link href="/apply" className="btn-primary">
                        {t("home.season.primary")}
                    </Link>
                    <Link href="/roadmap" className="btn-ghost">
                        {t("home.season.secondary")}
                    </Link>
                    <a href="#sponsors" className="btn-ghost">
                        {t("home.season.sponsor")}
                    </a>
                </div>
            </section>

            <section className="section" id="sponsors">
                <div className="section-header">
                    <p className="mono">{t("sponsor.label")}</p>
                    <h2>{t("sponsor.title")}</h2>
                </div>
                <p style={{ maxWidth: "720px", color: "#444", marginBottom: "32px" }}>
                    {t("sponsor.body")}
                </p>
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
