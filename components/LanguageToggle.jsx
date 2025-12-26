"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div className="lang-toggle" role="group" aria-label={t("nav.languageLabel")}>
            <button
                type="button"
                className={language === "es" ? "active" : ""}
                aria-pressed={language === "es"}
                onClick={() => setLanguage("es")}
            >
                ES
            </button>
            <button
                type="button"
                className={language === "en" ? "active" : ""}
                aria-pressed={language === "en"}
                onClick={() => setLanguage("en")}
            >
                EN
            </button>
        </div>
    );
}
