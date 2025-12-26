"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function JudgingBars() {
    const [animate, setAnimate] = useState(false);
    const { t } = useLanguage();
    const bars = t("judging.bars");

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            setAnimate(true);
            return;
        }
        const id = requestAnimationFrame(() => setAnimate(true));
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <>
            {Array.isArray(bars) &&
                bars.map((bar) => (
                    <div className="criterion" key={bar.label}>
                        <div className="mono">{bar.label}</div>
                        <div className="slider-track">
                            <div
                                className="slider-fill"
                                style={{ width: animate ? `${bar.value}%` : "0%" }}
                            />
                        </div>
                    </div>
                ))}
        </>
    );
}
