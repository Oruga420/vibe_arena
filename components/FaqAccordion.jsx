"use client";

import { useState } from "react";

const faqs = [
    {
        question: "Puedo usar IA y templates?",
        answer: "Si. La IA esta permitida y recomendada. Queremos velocidad real, no purismo."
    },
    {
        question: "Que pasa si la demo no carga?",
        answer: "Sin demo online no hay puntaje. La URL debe estar viva al momento de la revision."
    },
    {
        question: "Se puede competir en equipo?",
        answer: "Season 0 es individual. Queremos medir velocidad de shipping persona a persona."
    },
    {
        question: "Cual es el stack permitido?",
        answer: "Stack libre. Elegi lo que puedas construir en 2 horas sin perder foco."
    },
    {
        question: "Hay premio monetario?",
        answer: "El drop incluye visibilidad, acceso directo a la comunidad y rewards definidos por sponsors locales."
    },
    {
        question: "Como me entero del prompt?",
        answer: "El prompt se revela en el kickoff del drop. Te llega por mail y en la sala en vivo."
    }
];

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="faq-list">
            {faqs.map((item, index) => {
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
