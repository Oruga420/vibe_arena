"use client";

import { useEffect, useState } from "react";

const formatCountdown = (targetTime) => {
    const diff = Math.max(0, targetTime - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    return `${String(days).padStart(2, "0")}:${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default function Countdown({ targetDate }) {
    const [value, setValue] = useState(() => formatCountdown(new Date(targetDate).getTime()));

    useEffect(() => {
        const targetTime = new Date(targetDate).getTime();
        const interval = setInterval(() => {
            setValue(formatCountdown(targetTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return <div className="countdown">{value}</div>;
}
