"use client";

import { useLanguage } from "../../components/LanguageProvider";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VotingGuide() {
    const { t } = useLanguage();
    const content = t("votingGuide");
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    if (!content) return null;

    return (
        <main ref={containerRef} className="bg-[var(--white)] min-h-screen selection:bg-[var(--primary-green)] selection:text-white">
            
            {/* HERO SECTION - KINETIC TYPOGRAPHY FEEL */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
                {/* Abstract Background Elements */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--primary-green)] opacity-[0.05] blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--accent-red)] opacity-[0.03] blur-[120px] rounded-full"></div>
                    
                    {/* Retro Grid lines */}
                    <div className="absolute inset-0 opacity-[0.1]" 
                         style={{ backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
                    </div>
                </div>

                <motion.div 
                    style={{ opacity, scale }}
                    className="relative z-10 text-center max-w-4xl space-y-8"
                >
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 border border-[var(--primary-green)] text-[var(--primary-green)] font-mono text-xs tracking-[0.3em] uppercase rounded-sm bg-[var(--primary-green)]/10"
                    >
                        {content.hero.tag}
                    </motion.span>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8, ease: "circOut" }}
                        className="text-[clamp(3rem,10vw,7.5rem)] font-black leading-[0.85] tracking-tighter uppercase"
                    >
                        {content.hero.title.split(' ').map((word, i) => (
                            <span key={i} className="block overflow-hidden">
                                <motion.span 
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                    className="block"
                                >
                                    {word}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg md:text-xl text-[var(--text-muted)] max-w-xl mx-auto font-light leading-relaxed"
                    >
                        {content.hero.subtitle}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="pt-10 flex flex-col items-center gap-2"
                    >
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">Scroll to Protocol</span>
                        <div className="animate-bounce text-[var(--primary-green)] text-3xl font-light">
                            ↓
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* THE PROTOCOL / STEPS */}
            <section className="relative px-4 py-32 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    
                    {/* Left side: Sticky info */}
                    <div className="lg:sticky lg:top-32 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-outline">
                            {content.steps.label}
                        </h2>
                        <div className="h-1 w-24 bg-[var(--primary-green)]"></div>
                        <p className="text-[var(--text-muted)] text-lg max-w-md leading-relaxed">
                            {t("es") 
                                ? "La democracia del código no es un juego. Sigue los pasos para asegurar que tu gladiador favorito tome el trono."
                                : "Code democracy is no game. Follow the steps to ensure your favorite gladiator takes the throne."
                            }
                        </p>
                    </div>

                    {/* Right side: Modern Cards */}
                    <div className="space-y-6">
                        {content.steps.items.map((step, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative bg-[var(--surface)] border border-[var(--border)] p-8 md:p-12 hover:border-[var(--primary-green)] transition-all duration-500 overflow-hidden"
                            >
                                {/* Background Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary-green)]/5 rounded-full blur-3xl group-hover:bg-[var(--primary-green)]/10 transition-colors"></div>
                                
                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                    <div className="shrink-0">
                                        <span className="text-7xl font-mono font-black text-[var(--border)] group-hover:text-[var(--primary-green)] transition-colors duration-500 line-height-none">
                                            {step.num}
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight italic group-hover:not-italic transition-all">
                                            {step.title}
                                        </h3>
                                        <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                                            {step.body}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECURITY PROTOCOL - BRUTALIST STYLE */}
            <section className="px-4 py-32 border-t border-[var(--border)] bg-[var(--off-white)]">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-[var(--white)] border-[4px] border-[var(--deep-green)] p-8 md:p-16 relative shadow-[20px_20px_0px_var(--primary-green)]"
                    >
                        <div className="absolute -top-6 -left-6 w-12 h-12 bg-[var(--accent-red)] flex items-center justify-center text-white text-2xl font-bold">
                            !
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
                                {content.security.title}
                            </h3>
                            <div className="w-full h-[1px] bg-[var(--border)]"></div>
                            <p className="text-xl md:text-2xl text-[var(--deep-green)] font-mono leading-tight">
                                {content.security.body}
                            </p>
                            <div className="pt-8 flex flex-wrap gap-4 font-mono text-[10px]">
                                <div className="px-4 py-2 bg-[var(--primary-green)]/10 border border-[var(--primary-green)] text-[var(--primary-green)] rounded-full">
                                    ROTATION: 10S
                                </div>
                                <div className="px-4 py-2 bg-[var(--accent-red)]/10 border border-[var(--accent-red)] text-[var(--accent-red)] rounded-full">
                                    ANTI-BOT: ACTIVE
                                </div>
                                <div className="px-4 py-2 bg-[var(--deep-green)]/10 border border-[var(--deep-green)] text-[var(--deep-green)] rounded-full">
                                    LIVE SYNC: ON
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-48 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="space-y-12"
                >
                    <h4 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">
                        ¿LISTO PARA EL RING?
                    </h4>
                    <Link href="/" className="group relative inline-flex items-center justify-center px-16 py-8 bg-[var(--deep-green)] text-white font-black text-xl uppercase tracking-[0.2em] hover:bg-[var(--primary-green)] transition-all overflow-hidden rounded-sm">
                        <span className="relative z-10">{content.hero.cta}</span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </Link>
                </motion.div>
            </section>

            {/* Custom Styles */}
            <style jsx>{`
                .text-outline {
                    -webkit-text-stroke: 1px var(--border);
                    color: transparent;
                }
                @media (min-width: 1024px) {
                    .text-outline:hover {
                        -webkit-text-stroke: 1px var(--primary-green);
                        color: var(--primary-green);
                        transition: all 0.5s ease;
                    }
                }
                .line-height-none {
                    line-height: 1;
                }
            `}</style>
        </main>
    );
}
