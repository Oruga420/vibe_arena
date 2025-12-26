"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
    es: {
        nav: {
            menu: "Menu",
            home: "Inicio",
            how: "Como funciona",
            judging: "Reglas",
            roadmap: "Plan",
            faq: "FAQ",
            sponsor: "Patrocinios",
            apply: "Aplica",
            languageLabel: "Idioma"
        },
        micro: {
            text: "Season 0 en construccion - Primer drop Enero-Febrero -",
            link: "Ver el plan"
        },
        footer: {
            copy: "(c) 2024 TORONTO TECH MINIMAL",
            twitter: "Twitter/X",
            discord: "Discord"
        },
        home: {
            hero: {
                tag: "Toronto Vibe-coding Arena",
                title: "Shippea una app en 2 horas.",
                body: "Un prompt. Un reloj. Un ganador. Unite a la Season 0 y demostra que sos el gladiador mas rapido del ecosistema.",
                primary: "Aplica para Season 0",
                secondary: "Como se juzga"
            },
            drop: {
                title: "Proximo Drop (Tentativo)",
                format: "Formato",
                formatValue: "Virtual / Toronto Hybrid",
                duration: "Duracion",
                durationValue: "120 minutos",
                stack: "Stack",
                stackValue: "Open choice",
                spots: "Cupos limitados"
            },
            map: {
                label: "Mapa",
                title: "Todo lo que tenes que saber",
                cards: [
                    {
                        tag: "01 - Protocolo",
                        title: "Como funciona",
                        body: "Los 4 pasos, el reloj y las entregas reales. Sin humo."
                    },
                    {
                        tag: "02 - Reglas",
                        title: "Evaluacion",
                        body: "Peso de criterios, formato y que es lo que gana."
                    },
                    {
                        tag: "03 - Season 0",
                        title: "Building in public",
                        body: "Roadmap, hitos y el plan de lanzamiento en vivo."
                    },
                    {
                        tag: "04 - FAQ",
                        title: "Preguntas rapidas",
                        body: "Reglas, horarios, demos y lo que mas preguntan."
                    }
                ]
            },
            season: {
                label: "Season 0",
                title: "Primero shippeas. Despues discutimos.",
                body: "QuickDrop es una arena de velocidad con identidad Toronto. La regla es simple: 2 horas, una app real, demo activa y repo. El resto es actitud.",
                primary: "Aplica ahora",
                secondary: "Ver el plan"
            }
        },
        sponsor: {
            label: "Patrocinios",
            title: "Patrocina el drop y dale poder real a la comunidad.",
            body: "Buscamos partners que quieran impulsar builders rapidos. Decinos en que queres ayudar y que tipo de experiencia queres habilitar.",
            highlights: {
                label: "Valor",
                title: "Que se llevan los sponsors",
                cards: [
                    {
                        tag: "Talento",
                        title: "Acceso directo a builders",
                        body: "Conectate con los top builders del ecosistema y arma tu pipeline."
                    },
                    {
                        tag: "Marca",
                        title: "Visibilidad real",
                        body: "Logo, menciones en stream, presencia en el evento y contenido post-drop."
                    },
                    {
                        tag: "Producto",
                        title: "Feedback rapido",
                        body: "Probamos tu producto en tiempo real y te devolvemos insights en 48 horas."
                    }
                ]
            },
            form: {
                title: "Formulario para sponsors",
                fields: {
                    company: {
                        label: "Empresa",
                        placeholder: "Nombre de la empresa"
                    },
                    contact: {
                        label: "Nombre de contacto",
                        placeholder: "Nombre y apellido"
                    },
                    email: {
                        label: "Email",
                        placeholder: "contacto@empresa.com"
                    },
                    website: {
                        label: "Sitio web",
                        placeholder: "https://empresa.com"
                    },
                    areasLabel: "En que queres patrocinar",
                    areas: {
                        food: "Comida y bebidas",
                        venue: "Venue / espacio",
                        prizes: "Premios",
                        travel: "Viajes / hospedaje",
                        tooling: "Herramientas / APIs",
                        marketing: "Marketing / comunidad",
                        streaming: "Streaming / produccion",
                        other: "Otro"
                    },
                    theme: {
                        label: "Tema sugerido para un drop",
                        placeholder: "Ej: fintech, salud, developer tools..."
                    },
                    pain: {
                        label: "Pain point que queres que resolvamos",
                        placeholder: "Conta el problema que te interesa ver resuelto"
                    },
                    sponsorType: {
                        label: "Tipo de sponsoreo",
                        placeholder: "Elegi una opcion",
                        options: {
                            cash: "Aporte en efectivo",
                            inkind: "Aporte en especie",
                            mix: "Combinado"
                        }
                    },
                    budget: {
                        label: "Rango de presupuesto",
                        placeholder: "Elegi un rango",
                        options: {
                            low: "Menos de 1k USD",
                            mid: "1k - 5k USD",
                            high: "5k - 15k USD",
                            premium: "15k+ USD"
                        }
                    },
                    visibility: {
                        label: "Que visibilidad buscas",
                        placeholder: "Elegi una opcion",
                        options: {
                            logo: "Logo en landing y stream",
                            booth: "Presencia en el evento",
                            talk: "Espacio para demo o charla",
                            judge: "Seat en jurado",
                            mentor: "Mentoria a builders"
                        }
                    },
                    timeline: {
                        label: "Cuando queres activar el sponsor",
                        placeholder: "Ej: proximo drop, Q2, flexible"
                    },
                    notes: {
                        label: "Notas adicionales",
                        placeholder: "Cualquier detalle extra"
                    }
                },
                submit: "Enviar propuesta",
                helper: "Te contactamos en 48 horas para armar el paquete.",
                success: "Listo. Recibimos tu propuesta y te contactamos en 48hs."
            }
        },
        how: {
            hero: {
                tag: "Protocolo",
                title: "4 pasos. Sin vueltas.",
                body: "Un prompt a las 18:00 EST, 120 minutos de foco y una demo que funcione en vivo. Esto es speed shipping, no una hackathon eterna.",
                primary: "Aplica para Season 0",
                secondary: "Como se juzga"
            },
            steps: {
                label: "Pasos",
                title: "El flow completo",
                items: [
                    {
                        num: "01",
                        title: "Recibis el prompt",
                        body: "A las 18:00 EST revelamos el desafio tecnico. Todos parten desde cero."
                    },
                    {
                        num: "02",
                        title: "Codeas 2 horas",
                        body: "Vibe-coding puro. Usas IA, templates y lo que quieras. El objetivo es shippear."
                    },
                    {
                        num: "03",
                        title: "Entregas demo",
                        body: "Subis tu URL activa y el repositorio. Si no esta online, no existe."
                    },
                    {
                        num: "04",
                        title: "Demos live",
                        body: "El jurado revisa los top 5 en vivo. Un ganador se lleva el drop de la season."
                    }
                ]
            },
            delivery: {
                label: "Entrega",
                title: "Lo que tenes que subir",
                cards: [
                    {
                        tag: "Demo activa",
                        title: "URL funcional",
                        body: "Tu app tiene que estar online y usable. Si se cae, se descalifica."
                    },
                    {
                        tag: "Repositorio",
                        title: "Code y README",
                        body: "Inclui instrucciones simples para correr el proyecto y cualquier hack clave."
                    },
                    {
                        tag: "Pitch corto",
                        title: "Demo de 2 minutos",
                        body: "Conta el problema y mostra la solucion. Sin slides eternas."
                    }
                ]
            }
        },
        judging: {
            hero: {
                tag: "Criterios",
                title: "Reglas claras, rapidas y medibles.",
                body: "AI permitido. Gana el que demuestra valor real en el menor tiempo posible. El jurado prioriza impacto y claridad.",
                primary: "Aplica para Season 0",
                secondary: "Ver el protocolo"
            },
            weights: {
                label: "Pesos",
                title: "Como evaluamos",
                body: "No premiamos el humo. Gana el que shipea valor con el menor tiempo posible.",
                cards: [
                    {
                        tag: "Regla base",
                        title: "Demo online",
                        body: "La URL debe estar viva. Si no carga, no hay puntaje."
                    },
                    {
                        tag: "AI permitido",
                        title: "Transparencia",
                        body: "Podes usar IA, templates y libs. Conta que usaste."
                    }
                ]
            },
            bars: [
                { label: "Funcionalidad (40%)", value: 90 },
                { label: "UX / Diseno (30%)", value: 70 },
                { label: "Originalidad (20%)", value: 50 },
                { label: "Code clarity (10%)", value: 30 }
            ],
            checklist: {
                label: "Checklist",
                title: "Reglas esenciales",
                items: [
                    {
                        num: "01",
                        title: "120 minutos",
                        body: "El timer corre para todos. No hay extensiones ni excepciones."
                    },
                    {
                        num: "02",
                        title: "Stack libre",
                        body: "Usa lo que mejor sabes. La velocidad manda."
                    },
                    {
                        num: "03",
                        title: "Repo publico",
                        body: "Subi el repo con README claro y setup minimal."
                    },
                    {
                        num: "04",
                        title: "Demo en vivo",
                        body: "Los top 5 muestran su demo frente al jurado."
                    }
                ]
            }
        },
        roadmap: {
            hero: {
                tag: "Building in Public",
                title: "Roadmap Season 0",
                body: "Estamos armando la arena a la vista. Cada paso es publico y medible para que la comunidad empuje con nosotros.",
                primary: "Aplica para Season 0",
                secondary: "Resolver dudas"
            },
            manifesto: {
                label: "Plan abierto",
                title: "Hitos clave",
                items: [
                    "Landing Page v1.0",
                    "Primer Beta Privado (Toronto Devs)",
                    "Reglamento y Sistema de Puntos",
                    "Primer Evento Publico"
                ],
                primary: "Sumarte al primer drop"
            },
            community: {
                label: "Comunidad",
                title: "Queres empujar el roadmap",
                body: "Buscamos mentores, jurados y partners locales en Toronto. Si queres construir en la primera linea, este es el momento.",
                primary: "Quiero participar",
                secondary: "Ver preguntas"
            }
        },
        faq: {
            hero: {
                tag: "FAQ",
                title: "Respuestas directas.",
                body: "Todo lo que te preguntas antes de aplicar. Si falta algo, escribinos.",
                primary: "Aplica para Season 0",
                secondary: "Ver protocolo"
            },
            list: {
                label: "Preguntas",
                title: "Lo que mas preguntan",
                items: [
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
                ]
            }
        },
        apply: {
            hero: {
                tag: "Aplicacion",
                title: "Entra a la Season 0.",
                body: "Cupos limitados para el primer drop. Contanos quien sos, que haces y por que queres competir."
            },
            form: {
                label: "Formulario",
                title: "Aplica en 2 minutos",
                fields: {
                    name: {
                        label: "Nombre completo",
                        placeholder: "Tu nombre"
                    },
                    email: {
                        label: "Email",
                        placeholder: "tu@email.com"
                    },
                    city: {
                        label: "Ciudad",
                        placeholder: "Toronto, Buenos Aires, etc."
                    },
                    stack: {
                        label: "Stack principal",
                        placeholder: "Selecciona uno",
                        options: {
                            fullstack: "Fullstack JS/TS",
                            frontend: "Frontend",
                            backend: "Backend",
                            mobile: "Mobile",
                            data: "Data/ML",
                            other: "Otro"
                        }
                    },
                    portfolio: {
                        label: "Portfolio o repo",
                        placeholder: "https://github.com/tuuser"
                    },
                    why: {
                        label: "Por que queres entrar",
                        placeholder: "Contanos en pocas lineas..."
                    }
                },
                submit: "Enviar aplicacion",
                helper: "Te respondemos dentro de las proximas 48 horas.",
                success: "Listo. Recibimos tu aplicacion y volvemos en 48hs."
            }
        }
    },
    en: {
        nav: {
            menu: "Menu",
            home: "Home",
            how: "How it works",
            judging: "Rules",
            roadmap: "Roadmap",
            faq: "FAQ",
            sponsor: "Sponsorships",
            apply: "Apply",
            languageLabel: "Language"
        },
        micro: {
            text: "Season 0 in progress - First drop Jan-Feb -",
            link: "See the plan"
        },
        footer: {
            copy: "(c) 2024 TORONTO TECH MINIMAL",
            twitter: "Twitter/X",
            discord: "Discord"
        },
        home: {
            hero: {
                tag: "Toronto Vibe-coding Arena",
                title: "Ship an app in 2 hours.",
                body: "One prompt. One clock. One winner. Join Season 0 and prove you are the fastest builder in the ecosystem.",
                primary: "Apply for Season 0",
                secondary: "How its judged"
            },
            drop: {
                title: "Next Drop (Tentative)",
                format: "Format",
                formatValue: "Virtual / Toronto Hybrid",
                duration: "Duration",
                durationValue: "120 minutes",
                stack: "Stack",
                stackValue: "Open choice",
                spots: "Limited spots"
            },
            map: {
                label: "Map",
                title: "Everything you need to know",
                cards: [
                    {
                        tag: "01 - Protocol",
                        title: "How it works",
                        body: "The 4 steps, the clock, and real deliveries. No fluff."
                    },
                    {
                        tag: "02 - Rules",
                        title: "Evaluation",
                        body: "Weights, format, and what wins."
                    },
                    {
                        tag: "03 - Season 0",
                        title: "Building in public",
                        body: "Roadmap, milestones, and the live launch plan."
                    },
                    {
                        tag: "04 - FAQ",
                        title: "Quick questions",
                        body: "Rules, timing, demos, and the common asks."
                    }
                ]
            },
            season: {
                label: "Season 0",
                title: "Ship first. Discuss later.",
                body: "QuickDrop is a speed arena with Toronto identity. The rule is simple: 2 hours, a real app, live demo, and repo. The rest is attitude.",
                primary: "Apply now",
                secondary: "See the plan"
            }
        },
        sponsor: {
            label: "Sponsorships",
            title: "Sponsor a drop and power the community.",
            body: "We are looking for partners that want to back fast builders. Tell us how you want to help and the kind of experience you want to enable.",
            highlights: {
                label: "Value",
                title: "What sponsors get",
                cards: [
                    {
                        tag: "Talent",
                        title: "Direct access to builders",
                        body: "Meet top builders in the ecosystem and build your hiring pipeline."
                    },
                    {
                        tag: "Brand",
                        title: "Real visibility",
                        body: "Logo, stream mentions, on-site presence, and post-drop content."
                    },
                    {
                        tag: "Product",
                        title: "Fast feedback",
                        body: "We test your product live and send insights within 48 hours."
                    }
                ]
            },
            form: {
                title: "Sponsor form",
                fields: {
                    company: {
                        label: "Company",
                        placeholder: "Company name"
                    },
                    contact: {
                        label: "Contact name",
                        placeholder: "Full name"
                    },
                    email: {
                        label: "Email",
                        placeholder: "contact@company.com"
                    },
                    website: {
                        label: "Website",
                        placeholder: "https://company.com"
                    },
                    areasLabel: "What do you want to sponsor",
                    areas: {
                        food: "Food and drinks",
                        venue: "Venue / space",
                        prizes: "Prizes",
                        travel: "Travel / lodging",
                        tooling: "Tools / APIs",
                        marketing: "Marketing / community",
                        streaming: "Streaming / production",
                        other: "Other"
                    },
                    theme: {
                        label: "Suggested theme for a drop",
                        placeholder: "Ex: fintech, health, developer tools..."
                    },
                    pain: {
                        label: "Pain point you want solved",
                        placeholder: "Share the problem you want solved"
                    },
                    sponsorType: {
                        label: "Sponsorship type",
                        placeholder: "Select one",
                        options: {
                            cash: "Cash contribution",
                            inkind: "In-kind contribution",
                            mix: "Mixed"
                        }
                    },
                    budget: {
                        label: "Budget range",
                        placeholder: "Select a range",
                        options: {
                            low: "Under 1k USD",
                            mid: "1k - 5k USD",
                            high: "5k - 15k USD",
                            premium: "15k+ USD"
                        }
                    },
                    visibility: {
                        label: "Desired visibility",
                        placeholder: "Select one",
                        options: {
                            logo: "Logo on landing and stream",
                            booth: "On-site presence",
                            talk: "Demo or talk slot",
                            judge: "Judge seat",
                            mentor: "Mentor builders"
                        }
                    },
                    timeline: {
                        label: "When do you want to activate",
                        placeholder: "Ex: next drop, Q2, flexible"
                    },
                    notes: {
                        label: "Additional notes",
                        placeholder: "Any extra detail"
                    }
                },
                submit: "Send proposal",
                helper: "We will contact you within 48 hours to shape the package.",
                success: "All set. We received your proposal and will reach out within 48h."
            }
        },
        how: {
            hero: {
                tag: "Protocol",
                title: "4 steps. No detours.",
                body: "One prompt at 18:00 EST, 120 minutes of focus, and a demo that works live. This is speed shipping, not a marathon hackathon.",
                primary: "Apply for Season 0",
                secondary: "How its judged"
            },
            steps: {
                label: "Steps",
                title: "The full flow",
                items: [
                    {
                        num: "01",
                        title: "Get the prompt",
                        body: "At 18:00 EST we reveal the challenge. Everyone starts from zero."
                    },
                    {
                        num: "02",
                        title: "Code for 2 hours",
                        body: "Pure vibe-coding. Use AI, templates, whatever. The goal is shipping."
                    },
                    {
                        num: "03",
                        title: "Submit a demo",
                        body: "Share your live URL and the repo. If it is not online, it does not exist."
                    },
                    {
                        num: "04",
                        title: "Live demos",
                        body: "The jury reviews the top 5 live. One winner takes the season drop."
                    }
                ]
            },
            delivery: {
                label: "Delivery",
                title: "What you must submit",
                cards: [
                    {
                        tag: "Live demo",
                        title: "Working URL",
                        body: "Your app must be online and usable. If it goes down, you are out."
                    },
                    {
                        tag: "Repository",
                        title: "Code and README",
                        body: "Include clear instructions to run it and any key shortcuts."
                    },
                    {
                        tag: "Short pitch",
                        title: "2 minute demo",
                        body: "Explain the problem and show the solution. No endless slides."
                    }
                ]
            }
        },
        judging: {
            hero: {
                tag: "Criteria",
                title: "Clear, fast, measurable rules.",
                body: "AI allowed. The winner shows real value in the least time. The jury prioritizes impact and clarity.",
                primary: "Apply for Season 0",
                secondary: "See the protocol"
            },
            weights: {
                label: "Weights",
                title: "How we score",
                body: "No smoke. The winner ships value in minimal time.",
                cards: [
                    {
                        tag: "Base rule",
                        title: "Live demo",
                        body: "The URL must be live. If it fails to load, no points."
                    },
                    {
                        tag: "AI allowed",
                        title: "Transparency",
                        body: "Use AI, templates, and libs. Tell us what you used."
                    }
                ]
            },
            bars: [
                { label: "Functionality (40%)", value: 90 },
                { label: "UX / Design (30%)", value: 70 },
                { label: "Originality (20%)", value: 50 },
                { label: "Code clarity (10%)", value: 30 }
            ],
            checklist: {
                label: "Checklist",
                title: "Core rules",
                items: [
                    {
                        num: "01",
                        title: "120 minutes",
                        body: "The timer runs for everyone. No extensions."
                    },
                    {
                        num: "02",
                        title: "Open stack",
                        body: "Use what you know best. Speed wins."
                    },
                    {
                        num: "03",
                        title: "Public repo",
                        body: "Ship the repo with a clear README and minimal setup."
                    },
                    {
                        num: "04",
                        title: "Live demo",
                        body: "Top 5 show their demo in front of the jury."
                    }
                ]
            }
        },
        roadmap: {
            hero: {
                tag: "Building in Public",
                title: "Season 0 Roadmap",
                body: "We are building the arena in public. Each step is visible and measurable so the community can push with us.",
                primary: "Apply for Season 0",
                secondary: "Clear doubts"
            },
            manifesto: {
                label: "Open plan",
                title: "Key milestones",
                items: [
                    "Landing Page v1.0",
                    "First Private Beta (Toronto Devs)",
                    "Rulebook and Points System",
                    "First Public Event"
                ],
                primary: "Join the first drop"
            },
            community: {
                label: "Community",
                title: "Want to push the roadmap",
                body: "We are looking for mentors, judges, and local partners in Toronto. If you want to build on the front line, now is the time.",
                primary: "I want in",
                secondary: "See questions"
            }
        },
        faq: {
            hero: {
                tag: "FAQ",
                title: "Straight answers.",
                body: "Everything you want to know before applying. If something is missing, reach out.",
                primary: "Apply for Season 0",
                secondary: "See protocol"
            },
            list: {
                label: "Questions",
                title: "Most asked",
                items: [
                    {
                        question: "Can I use AI and templates?",
                        answer: "Yes. AI is allowed and recommended. We want real speed, not purity."
                    },
                    {
                        question: "What if the demo does not load?",
                        answer: "No live demo means no score. The URL must be up during review."
                    },
                    {
                        question: "Can I compete as a team?",
                        answer: "Season 0 is solo. We want to measure individual shipping speed."
                    },
                    {
                        question: "What stack is allowed?",
                        answer: "Any stack. Choose what you can ship in 2 hours without losing focus."
                    },
                    {
                        question: "Is there a cash prize?",
                        answer: "The drop includes visibility, direct community access, and rewards from local sponsors."
                    },
                    {
                        question: "How do I get the prompt?",
                        answer: "The prompt is revealed at kickoff. You get it by email and in the live room."
                    }
                ]
            }
        },
        apply: {
            hero: {
                tag: "Application",
                title: "Enter Season 0.",
                body: "Limited spots for the first drop. Tell us who you are, what you do, and why you want to compete."
            },
            form: {
                label: "Form",
                title: "Apply in 2 minutes",
                fields: {
                    name: {
                        label: "Full name",
                        placeholder: "Your name"
                    },
                    email: {
                        label: "Email",
                        placeholder: "you@email.com"
                    },
                    city: {
                        label: "City",
                        placeholder: "Toronto, Buenos Aires, etc."
                    },
                    stack: {
                        label: "Primary stack",
                        placeholder: "Select one",
                        options: {
                            fullstack: "Fullstack JS/TS",
                            frontend: "Frontend",
                            backend: "Backend",
                            mobile: "Mobile",
                            data: "Data/ML",
                            other: "Other"
                        }
                    },
                    portfolio: {
                        label: "Portfolio or repo",
                        placeholder: "https://github.com/you"
                    },
                    why: {
                        label: "Why do you want in",
                        placeholder: "Share a few lines..."
                    }
                },
                submit: "Send application",
                helper: "We reply within the next 48 hours.",
                success: "All set. We got your application and reply within 48h."
            }
        }
    }
};

const LanguageContext = createContext({
    language: "es",
    setLanguage: () => {},
    t: () => ""
});

const getPathValue = (obj, path) => {
    if (!obj) {
        return undefined;
    }
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState("es");

    useEffect(() => {
        const stored = window.localStorage.getItem("lang");
        if (stored && translations[stored]) {
            setLanguage(stored);
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("lang", language);
        document.documentElement.lang = language;
    }, [language]);

    const t = useMemo(() => {
        return (key) => {
            const message = getPathValue(translations[language], key);
            if (message !== undefined) {
                return message;
            }
            const fallback = getPathValue(translations.es, key);
            return fallback !== undefined ? fallback : key;
        };
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}
