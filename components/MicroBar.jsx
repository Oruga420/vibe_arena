"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function MicroBar() {
    const { t } = useLanguage();

    return (
        <div className="micro-bar">
            <span className="badge-red">LIVE</span>
            <span className="mono">
                {t("micro.text")}{" "}
                <Link href="/roadmap">{t("micro.link")}</Link>
            </span>
        </div>
    );
}
