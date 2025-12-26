"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
    const pathname = usePathname();
    const navRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useLanguage();

    const navItems = useMemo(
        () => [
            { label: t("nav.home"), href: "/" },
            { label: t("nav.how"), href: "/how" },
            { label: t("nav.judging"), href: "/judging" },
            { label: t("nav.roadmap"), href: "/roadmap" },
            { label: t("nav.faq"), href: "/faq" },
            { label: t("nav.sponsor"), href: "/sponsor" }
        ],
        [t]
    );

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClick = (event) => {
            if (!navRef.current || !isOpen) {
                return;
            }
            if (navRef.current.contains(event.target)) {
                return;
            }
            setIsOpen(false);
        };
        document.addEventListener("pointerdown", handleClick);
        return () => document.removeEventListener("pointerdown", handleClick);
    }, [isOpen]);

    return (
        <nav ref={navRef}>
            <div className="logo">
                <div className="dot"></div>
                QUICKDROP
            </div>
            <button
                className="nav-toggle"
                type="button"
                aria-expanded={isOpen ? "true" : "false"}
                aria-controls="primary-nav"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {t("nav.menu")}
            </button>
            <div className={`nav-links${isOpen ? " open" : ""}`} id="primary-nav">
                {navItems.map((item) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={isActive ? "active" : ""}
                        >
                            {item.label}
                        </Link>
                    );
                })}
                <ThemeToggle />
                <LanguageToggle />
                <Link href="/apply" className="btn-apply-sm">
                    {t("nav.apply")}
                </Link>
            </div>
        </nav>
    );
}
