"use client";

import Link from "next/link";
import JudgingBars from "../../components/JudgingBars";
import { buildDropTokens, formatTemplate } from "../../components/dropFormat";
import { useLanguage } from "../../components/LanguageProvider";
import useDropStatus from "../../components/useDropStatus";

export default function RulesPage() {
    const { t } = useLanguage();
    const { data } = useDropStatus("slow");
    const tokens = buildDropTokens(data);

    const steps = t("how.steps.items");
    const deliveryCards = t("how.delivery.cards");
    const cards = t("judging.weights.cards");
    const entryItems = t("judging.entry.items");
    const checklist = t("judging.checklist.items");
    const formatItems = t("judging.format.items");
    const dqItems = t("judging.autoDQ.items");

    return (
        <main>
            {/* ═══════ HERO ═══════ */}
            <section className="page-hero">
                <div>
                    <p className="mono" style={{ color: "var(--primary-green)", marginBottom: "12px" }}>
                        THE PROTOCOL & RULES
                    </p>
                    <h1>{t("judging.hero.title")}</h1>
                    <p>{t("judging.hero.body")}</p>
                    <div className="hero-ctas">
                        <Link href="/apply" className="btn-primary">
                            {t("judging.hero.primary")}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════ 1. THE PROTOCOL — 4 STEPS ═══════ */}
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

            {/* ═══════ 2. DROP INVITATION FLOW ═══════ */}
            <section className="section section-muted">
                <div className="section-header">
                    <p className="mono">DROP INVITATION</p>
                    <h2>How You Enter the Arena</h2>
                </div>
                <div className="cards-grid">
                    <div className="card-link">
                        <span>01 — Invitation</span>
                        <h3>📩 You Get Summoned</h3>
                        <p>Registered gladiators receive a drop invitation via email. You choose whether to accept or decline — no pressure, no obligation.</p>
                    </div>
                    <div className="card-link">
                        <span>02 — RSVP</span>
                        <h3>⚔️ Accept or Decline</h3>
                        <p>Click <strong>ACCEPT</strong> to confirm your spot, or <strong>DECLINE</strong> if you can't make it. Once accepted, your avatar generator unlocks.</p>
                    </div>
                    <div className="card-link">
                        <span>03 — Entry Fee</span>
                        <h3>💳 Payment</h3>
                        <div>
                            <p style={{ textDecoration: "line-through", color: "var(--text-muted)", marginBottom: "8px" }}>
                                After accepting, you'll receive a Stripe payment link for your entry fee.
                            </p>
                            <div style={{
                                background: "rgba(34, 197, 94, 0.08)",
                                border: "1px solid rgba(34, 197, 94, 0.25)",
                                borderRadius: "8px",
                                padding: "12px 16px",
                            }}>
                                <span style={{
                                    display: "inline-block",
                                    background: "var(--primary-green)",
                                    color: "#000",
                                    padding: "2px 10px",
                                    borderRadius: "100px",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                    marginBottom: "6px",
                                }}>BETA</span>
                                <p style={{ color: "var(--primary-green)", fontSize: "14px", margin: 0 }}>
                                    This is a <strong>Beta Drop</strong> — entry is <strong>free</strong>, covered by the Coliseum. No payment required.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ 3. GLADIATOR CAGE — AVATAR CREATION ═══════ */}
            <section className="section">
                <div className="section-header">
                    <p className="mono">GLADIATOR CAGE</p>
                    <h2>Forge Your Warrior</h2>
                </div>
                <div className="cards-grid">
                    <div className="card-link">
                        <span>Avatar Generator</span>
                        <h3>🛡️ Create Your Gladiator</h3>
                        <p>Once registered, you unlock the <strong>Gladiator Cage</strong> — our AI-powered avatar studio. Generate your battle persona using <strong>Nano Banana 2</strong>, Google's latest image model.</p>
                    </div>
                    <div className="card-link">
                        <span>Your Profile</span>
                        <h3>📊 Track Your Progress</h3>
                        <p>View your gladiator stats, drop history, and avatar right here on the Colosseum. Modify your profile, update your avatar, and prepare for the next battle.</p>
                    </div>
                    <div className="card-link">
                        <span>4 Attempts</span>
                        <h3>🎨 Make It Legendary</h3>
                        <p>You get <strong>4 generation attempts</strong> per drop. Each time you accept a new drop, your tokens reset. Choose wisely — or go wild.</p>
                    </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                    <Link href="https://vibecodingcolosseum-image-prompts.vercel.app/" className="btn-primary" style={{ display: "inline-block" }}>
                        🛡️ Enter the Gladiator Cage
                    </Link>
                </div>
            </section>

            {/* ═══════ 4. ENTRY RULES ═══════ */}
            <section className="section section-muted">
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

            {/* ═══════ 5. WHAT TO DELIVER ═══════ */}
            <section className="section">
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

            {/* ═══════ 6. HOW VOTING WORKS ═══════ */}
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

            {/* ═══════ 7. BATTLE ROYALE FORMAT ═══════ */}
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

            {/* ═══════ 8. BASE RULES CHECKLIST ═══════ */}
            <section className="section section-muted">
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

            {/* ═══════ 9. AUTO-DQ ═══════ */}
            <section className="section">
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
