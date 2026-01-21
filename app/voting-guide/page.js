"use client";

import { useLanguage } from "@/components/LanguageProvider";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VotingGuide() {
    const { t } = useLanguage();
    const content = t("votingGuide");

    // Fallback if missing (during dev)
    if (!content) return null;

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 selection:bg-[var(--accent)] selection:text-[var(--bg-primary)]">
            <div className="max-w-3xl mx-auto space-y-16">
                
                {/* Hero */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-3 py-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-xs font-mono tracking-widest text-[var(--text-secondary)] uppercase"
                    >
                        {content.hero.tag}
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter"
                    >
                        {content.hero.title}
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-[var(--text-secondary)] font-light max-w-xl mx-auto"
                    >
                        {content.hero.subtitle}
                    </motion.p>
                </header>

                {/* Steps */}
                <section className="space-y-12">
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                        <h2 className="text-sm font-mono tracking-widest text-[var(--text-secondary)]">
                            {content.steps.label}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {content.steps.items.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="space-y-4 group"
                            >
                                <div className="text-6xl font-black text-[var(--border)] group-hover:text-[var(--accent)] transition-colors duration-500">
                                    {step.num}
                                </div>
                                <h3 className="text-xl font-bold">{step.title}</h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed">
                                    {step.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Security Note */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="p-8 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center space-y-4"
                >
                    <div className="w-12 h-12 mx-auto bg-[var(--bg-primary)] rounded-full flex items-center justify-center text-2xl border border-[var(--border)]">
                        🔒
                    </div>
                    <h3 className="text-lg font-bold">{content.security.title}</h3>
                    <p className="text-[var(--text-secondary)] max-w-lg mx-auto">
                        {content.security.body}
                    </p>
                </motion.section>

                {/* CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center pt-8"
                >
                    <Link 
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wide hover:opacity-90 transition-opacity"
                    >
                        {content.hero.cta}
                    </Link>
                </motion.div>

            </div>
        </main>
    );
}
