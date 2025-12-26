"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const STORAGE_KEY = "theme";

const getSystemTheme = () => {
    if (typeof window === "undefined") {
        return "light";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export default function ThemeToggle() {
    const { t } = useLanguage();
    const [theme, setTheme] = useState("light");
    const [hasOverride, setHasOverride] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === "dark" || stored === "light") {
            setTheme(stored);
            setHasOverride(true);
            document.documentElement.dataset.theme = stored;
            return;
        }

        const systemTheme = getSystemTheme();
        setTheme(systemTheme);
        document.documentElement.dataset.theme = systemTheme;
    }, []);

    useEffect(() => {
        if (!hasOverride) {
            return;
        }
        window.localStorage.setItem(STORAGE_KEY, theme);
        document.documentElement.dataset.theme = theme;
    }, [theme, hasOverride]);

    useEffect(() => {
        if (hasOverride) {
            return;
        }
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (event) => {
            const next = event.matches ? "dark" : "light";
            setTheme(next);
            document.documentElement.dataset.theme = next;
        };
        if (media.addEventListener) {
            media.addEventListener("change", handleChange);
        } else {
            media.addListener(handleChange);
        }
        return () => {
            if (media.removeEventListener) {
                media.removeEventListener("change", handleChange);
            } else {
                media.removeListener(handleChange);
            }
        };
    }, [hasOverride]);

    return (
        <div className="theme-toggle" role="group" aria-label={t("theme.label")}>
            <button
                type="button"
                className={theme === "light" ? "active" : ""}
                aria-pressed={theme === "light"}
                onClick={() => {
                    setHasOverride(true);
                    setTheme("light");
                }}
            >
                {t("theme.light")}
            </button>
            <button
                type="button"
                className={theme === "dark" ? "active" : ""}
                aria-pressed={theme === "dark"}
                onClick={() => {
                    setHasOverride(true);
                    setTheme("dark");
                }}
            >
                {t("theme.dark")}
            </button>
        </div>
    );
}
