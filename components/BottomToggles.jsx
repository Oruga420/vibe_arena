"use client";

import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

export default function BottomToggles() {
    return (
        <div className="bottom-toggles">
            <ThemeToggle />
            <LanguageToggle />
        </div>
    );
}
