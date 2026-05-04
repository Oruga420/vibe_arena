"use client";

import ApplyForm from "../../components/ApplyForm";
import EntryStatusCard from "../../components/EntryStatusCard";
import WaitlistSection from "../../components/WaitlistSection";
import { useLanguage } from "../../components/LanguageProvider";

export default function ApplyPage() {
    const { t } = useLanguage();

    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        {t("apply.hero.tag")}
                    </p>
                    <h1>{t("apply.hero.title")}</h1>
                    <p>{t("apply.hero.body")}</p>
                </div>
            </section>

            {/* Waitlist — drop is full */}
            <section className="section" style={{ paddingBottom: "0" }}>
                <WaitlistSection />
            </section>

            {/* Divider */}
            <div style={{ borderTop: "1px solid var(--border)", margin: "48px auto", maxWidth: "680px" }} />

            {/* Gladiator path — form */}
            <section className="section" style={{ paddingTop: "0" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 340px",
                    gap: "48px",
                    alignItems: "start"
                }} className="apply-grid">
                    {/* LEFT: Form */}
                    <div>
                        <p className="mono" style={{ color: "var(--primary-green)", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "8px" }}>
                            {t("apply.form.label")}
                        </p>
                        <h2 style={{ marginBottom: "28px" }}>{t("apply.form.title")}</h2>
                        <ApplyForm />
                    </div>

                    {/* RIGHT: Event info card */}
                    <div style={{ position: "sticky", top: "24px" }}>
                        <EntryStatusCard note={t("apply.entry.note")} />
                    </div>
                </div>
            </section>

            {/* Divider */}
            <div style={{
                borderTop: "1px solid var(--border)",
                margin: "0 auto",
                maxWidth: "680px"
            }} />

            {/* Spectator path */}
            <section className="section">
                <div style={{ maxWidth: "680px" }}>
                    <p className="mono" style={{
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "8px"
                    }}>
                        {t("apply.spectator.label")}
                    </p>
                    <h2 style={{ marginBottom: "12px" }}>{t("apply.spectator.title")}</h2>
                    <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
                        {t("apply.spectator.body")}
                    </p>
                    <a
                        href="https://luma.com/924a9ivf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                        style={{ textDecoration: "none", display: "inline-block" }}
                    >
                        {t("apply.spectator.cta")}
                    </a>
                </div>
            </section>
        </main>
    );
}
