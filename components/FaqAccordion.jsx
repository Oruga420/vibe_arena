"use client";

import Link from "next/link";
import { useState } from "react";
import { buildDropTokens, formatTemplate } from "./dropFormat";
import { useLanguage } from "./LanguageProvider";
import useDropStatus from "./useDropStatus";

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState(null);
    const { t } = useLanguage();
    const faqs = t("faq.list.items");
    const { data } = useDropStatus("slow");
    const tokens = buildDropTokens(data);

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    const renderAnswer = (text) => {
        const parts = text.split(/\[(.*?)\]\((.*?)\)/g);
        if (parts.length === 1) return text;

        return parts.map((part, i) => {
            if (i % 3 === 1) {
                const href = parts[i + 1];
                return (
                    <Link key={i} href={href} className="faq-link" style={{ color: "var(--accent)", textDecoration: "underline" }}>
                        {part}
                    </Link>
                );
            }
            if (i % 3 === 2) return null;
            return part;
        });
    };

    return (
        <div className="faq-list">
            {Array.isArray(faqs) &&
                faqs.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div className={`faq-item${isOpen ? " open" : ""}`} key={item.question}>
                            <button
                                className="faq-question"
                                type="button"
                                aria-expanded={isOpen ? "true" : "false"}
                                aria-controls={`faq-${index}`}
                                onClick={() => toggle(index)}
                            >
                                <span>{formatTemplate(item.question, tokens)}</span>
                                <span className="faq-icon">{isOpen ? "-" : "+"}</span>
                            </button>
                            <div className="faq-answer" id={`faq-${index}`}>
                                <p>{renderAnswer(formatTemplate(item.answer, tokens))}</p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
