"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState(null);
    const { t } = useLanguage();
    const faqs = t("faq.list.items");

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
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
                                <span>{item.question}</span>
                                <span className="faq-icon">{isOpen ? "-" : "+"}</span>
                            </button>
                            <div className="faq-answer" id={`faq-${index}`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
