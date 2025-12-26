"use client";

import { useEffect, useState } from "react";

const bars = [
    { label: "Funcionalidad (40%)", value: 90 },
    { label: "UX / Diseno (30%)", value: 70 },
    { label: "Originalidad (20%)", value: 50 },
    { label: "Code clarity (10%)", value: 30 }
];

export default function JudgingBars() {
    const [animate, setAnimate] = useState(false);

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
            {bars.map((bar) => (
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
