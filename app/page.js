"use client";

import Link from "next/link";
import EntryStatusCard from "../components/EntryStatusCard";
import { useLanguage } from "../components/LanguageProvider";
import LiveVoteStatus from "../components/LiveVoteStatus";
import WaitlistModal from "../components/WaitlistModal";

export default function HomePage() {
    const { t } = useLanguage();
    const mapCards = t("home.map.cards");
    const mapLinks = ["/how", "/judging", "/roadmap", "/apply"];
    const statusItems = t("home.status.items");

    return (
        <main>
            <WaitlistModal />
            <section className="hero">
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
                    <div className="countdown">{t("home.drop.window")}</div>
                    <div className="mono" style={{ marginTop: "8px", fontSize: "0.6rem", color: "var(--accent-red)" }}>
                        {t("home.drop.note")}
                    </div>
                </div>
            </section>

            <section className="section entry-section">
                <EntryStatusCard note={t("home.entry.note")} />
            </section>

            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">{t("home.status.label")}</p>
                    <h2>{t("home.status.title")}</h2>
                </div>
                <div className="grid-4">
                    {Array.isArray(statusItems) &&
                        statusItems.map((item) => (
                            <div className="card" key={item.title}>
                                <h3>{item.title}</h3>
                                <p>{item.body}</p>
                            </div>
                        ))} 
                </div>
            </section>

            <section className="section live-status-section">
                <LiveVoteStatus />
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
                <div className="glory-board">
                    <p className="mono">{t("home.glory.body")}</p>
                    <div className="hero-ctas" style={{ marginTop: "24px" }}>
                        <Link href="/apply" className="btn-primary">
                            {t("home.glory.cta")}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
