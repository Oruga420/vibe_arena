"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer>
            <div className="logo">
                <img src="/logo.png" alt="Logo" style={{ height: "96px", width: "auto" }} />
                VIBE CODING COLOSSEUM
            </div>
            <div className="footer-links">
                <Link href="/roadmap">{t("nav.roadmap")}</Link>
                <Link href="/faq">{t("nav.faq")}</Link>
                <Link href="/sponsor">{t("nav.sponsor")}</Link>
            </div>
            <div className="mono" style={{ opacity: 0.5 }}>
                {t("footer.copy")}
            </div>
            <div className="nav-links">
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    {t("footer.twitter")}
                </a>
                <a href="https://discord.com" target="_blank" rel="noreferrer">
                    {t("footer.discord")}
                </a>
            </div>
        </footer>
    );
}
