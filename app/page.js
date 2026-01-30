"use client";

import Link from "next/link";
import AsciiTower from "../components/AsciiTower";
import ChampionShowcase from "../components/ChampionShowcase";
import EntryStatusCard from "../components/EntryStatusCard";
import { useLanguage } from "../components/LanguageProvider";
import NextDropCard from "../components/NextDropCard";
import WaitlistModal from "../components/WaitlistModal";

export default function HomePage() {
    const { t } = useLanguage();
    const mapCards = t("home.map.cards");
    const mapLinks = ["/how", "/judging", "/roadmap", "/gladiators", "/voting-guide"];

    return (
        <main>
            <WaitlistModal />
            <section className="hero">
                <AsciiTower />
                <div className="scanline" aria-hidden="true"></div>

                <div className="hero-content">
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "16px" }}>
                        {t("home.hero.tag")}
                    </p>
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
            </section>

            <section className="section entry-section">
                <EntryStatusCard note={t("home.entry.note")} />
            </section>

            <section className="section section-muted">
                <NextDropCard />
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
                <p style={{ maxWidth: "680px", color: "var(--text-muted)", marginBottom: "32px" }}>
                    {t("home.season.body")}
                </p>
                <div className="hero-ctas">
                    <Link href="/apply" className="btn-primary">
                        {t("home.season.primary")}
                    </Link>
                    <Link href="/roadmap" className="btn-ghost">
                        {t("home.season.secondary")}
                    </Link>
                </div>
            </section>

            <section className="section">
                <div className="section-header">
                    <p className="mono">{t("home.glory.label")}</p>
                    <h2>{t("home.glory.title")}</h2>
                </div>
                <ChampionShowcase />
            </section>
        </main>
    );
}
