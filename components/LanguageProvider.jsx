"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
    es: {
        nav: {
            menu: "Men\u00fa",
            home: "Inicio",
            how: "El protocolo",
            judging: "Reglas",
            roadmap: "Plan",
            faq: "FAQ",
            sponsor: "Patrocinios",
            apply: "Aplic\u00e1",
            languageLabel: "Idioma"
        },
        micro: {
            text: "Season 0 en construcci\u00f3n - Primer drop Enero-Febrero -",
            link: "Ver el plan"
        },
        footer: {
            copy: "(c) 2025 TORONTO TECH MINIMAL",
            twitter: "Twitter/X",
            discord: "Discord"
        },
        theme: {
            label: "Tema",
            dark: "Oscuro",
            light: "Claro"
        },
        waitlist: {
            label: "Waitlist",
            title: "Enterate primero de las fechas.",
            body: "Dejanos tu email y te avisamos las upcoming dates. Podes entrar a la arena o mirar desde la tribuna.",
            fields: {
                name: "Nombre",
                email: "Email",
                role: "Queres entrar o mirar"
            },
            placeholders: {
                name: "Tu nombre",
                email: "tu@email.com",
                role: "Elegi una opcion"
            },
            roles: {
                arena: "Quiero entrar a la arena",
                spectator: "Solo espectador"
            },
            submit: "Sumarme",
            dismiss: "Cerrar",
            helper: "Te escribimos cuando haya fechas nuevas.",
            success: "Listo. Te vamos a avisar primero.",
            error: "Completa nombre, email y opcion.",
            close: "Cerrar modal"
        },
        home: {
            hero: {
                tag: "Toronto Vibe-coding Arena",
                title: "Ten\u00e9s 2 horas. Shippe\u00e1 algo o sal\u00ed del ring.",
                body: "Season 0. Los primeros gladiadores. Cupos limitados. No es hackathon: es un drop. Entr\u00e1s, shippe\u00e1s, te juzgan.",
                primary: "Entrar al ring",
                secondary: "Las reglas del ring"
            },
            signal: {
                label: "Toronto signal locked",
                body: "Arena online. Torre al fondo. Reloj arriba."
            },
            drop: {
                title: "Pr\u00f3ximo drop",
                format: "Formato",
                formatValue: "Online global + meetup opcional en Toronto",
                duration: "Duraci\u00f3n",
                durationValue: "120 minutos",
                stack: "Stack",
                stackValue: "Libre",
                window: "Ventana Enero-Feb",
                note: "Te avisamos primero si entr\u00e1s a Season 0"
            },
            status: {
                label: "Arena status",
                title: "Patch notes del ring",
                items: [
                    {
                        title: "Season 0",
                        body: "Arm\u00e1ndose en p\u00fablico"
                    },
                    {
                        title: "Beta privado",
                        body: "15 Feb (tentativo)"
                    },
                    {
                        title: "Drop p\u00fablico",
                        body: "Ventana Enero-Feb"
                    },
                    {
                        title: "\u00daltimo update",
                        body: "Hace 2 d\u00edas"
                    }
                ]
            },
            liveVote: {
                label: "Live vote status",
                closed: "Live vote: CLOSED. Abre durante demos live.",
                open: "Live vote: OPEN. Cierra en",
                ended: "Votaci\u00f3n cerrada. Gan\u00f3",
                endedPending: "Votaci\u00f3n cerrada. Resultados en breve.",
                noDrop: "Season 0 en construcci\u00f3n.",
                ctaClosed: "Avisame",
                ctaOpen: "Votar ahora",
                ctaEnded: "Ver resultados",
                badgeOpen: "OPEN"
            },
            memes: {
                label: "Frases",
                title: "Munici\u00f3n para X",
                items: [
                    "Ship fast. Demo live.",
                    "Cero excusas, solo entrega.",
                    "Vibe coding con reloj."
                ]
            },
            glory: {
                label: "Wall of Glory",
                title: "Marcador del ring",
                body: "Vac\u00edo todav\u00eda. \u00bfQuer\u00e9s ser el primero?",
                cta: "Quiero el primer lugar"
            },
            map: {
                label: "Mapa",
                title: "Todo lo que ten\u00e9s que saber",
                cards: [
                    {
                        tag: "01 - El protocolo",
                        title: "El protocolo",
                        body: "Cae el prompt, constru\u00eds, shipe\u00e1s, decide la gente."
                    },
                    {
                        tag: "02 - Las reglas",
                        title: "C\u00f3mo se gana",
                        body: "Votos en vivo. Una persona, un voto. Sin jurado."
                    },
                    {
                        tag: "03 - Arena status",
                        title: "Prueba de vida",
                        body: "Patch notes del drop, fechas reales, ventanas de voto."
                    },
                    {
                        tag: "04 - Wall of Glory",
                        title: "El marcador",
                        body: "Vac\u00edo por ahora. \u00bfQuer\u00e9s el primer lugar?"
                    }
                ]
            },
            season: {
                label: "Season 0",
                title: "Esto no es un evento corporativo.",
                body: "Entr\u00e1s, shipe\u00e1s, te juzgan en vivo. Si gan\u00e1s, te llev\u00e1s el drop.",
                primary: "Entrar al ring",
                secondary: "Ver el plan"
            }
        },
        sponsor: {
            label: "Patrocinios",
            title: "Patrocina el drop y dale poder real a la comunidad.",
            body: "Buscamos partners que quieran impulsar builders r\u00e1pidos. Decinos en qu\u00e9 quer\u00e9s ayudar y qu\u00e9 tipo de experiencia quer\u00e9s habilitar.",
            highlights: {
                label: "Valor",
                title: "Qu\u00e9 se llevan los sponsors",
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
                        title: "Feedback r\u00e1pido",
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
                    areasLabel: "En qu\u00e9 quer\u00e9s patrocinar",
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
                        label: "Pain point que quer\u00e9s que resolvamos",
                        placeholder: "Cont\u00e1 el problema que te interesa ver resuelto"
                    },
                    sponsorType: {
                        label: "Tipo de sponsoreo",
                        placeholder: "Eleg\u00ed una opci\u00f3n",
                        options: {
                            cash: "Aporte en efectivo",
                            inkind: "Aporte en especie",
                            mix: "Combinado"
                        }
                    },
                    budget: {
                        label: "Rango de presupuesto",
                        placeholder: "Eleg\u00ed un rango",
                        options: {
                            low: "Menos de 1k USD",
                            mid: "1k - 5k USD",
                            high: "5k - 15k USD",
                            premium: "15k+ USD"
                        }
                    },
                    visibility: {
                        label: "Qu\u00e9 visibilidad busc\u00e1s",
                        placeholder: "Eleg\u00ed una opci\u00f3n",
                        options: {
                            logo: "Logo en landing y stream",
                            booth: "Presencia en el evento",
                            talk: "Espacio para demo o charla",
                            judge: "Seat en jurado",
                            mentor: "Mentor\u00eda a builders"
                        }
                    },
                    timeline: {
                        label: "Cu\u00e1ndo quer\u00e9s activar el sponsor",
                        placeholder: "Ej: pr\u00f3ximo drop, Q2, flexible"
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
                tag: "El protocolo",
                title: "Las reglas del ring.",
                body: "Kickoff 18:00 ET (Toronto). Te cae un prompt y te corre el reloj. Desde cero en este drop, pero pod\u00e9s usar templates.",
                primary: "Entrar al ring",
                secondary: "C\u00f3mo te juzgamos"
            },
            steps: {
                label: "Pasos",
                title: "El protocolo en 4 golpes",
                items: [
                    {
                        num: "01",
                        title: "Te cae el prompt",
                        body: "Kickoff 18:00 ET (Toronto). Desde cero en este drop, pero pod\u00e9s usar templates."
                    },
                    {
                        num: "02",
                        title: "Constru\u00eds",
                        body: "Ten\u00e9s 2 horas. IA, templates y lo que quieras. El objetivo es shippear."
                    },
                    {
                        num: "03",
                        title: "Entreg\u00e1s demo",
                        body: "URL viva + repo. Si no carga, no existe."
                    },
                    {
                        num: "04",
                        title: "Te juzgamos en vivo",
                        body: "Top 5 al ring. Un ganador se lleva el drop."
                    }
                ]
            },
            delivery: {
                label: "Entrega",
                title: "Lo que ten\u00e9s que subir",
                cards: [
                    {
                        tag: "Demo activa",
                        title: "URL funcional",
                        body: "Tu app tiene que estar online y usable. Si se cae, se termina."
                    },
                    {
                        tag: "Repositorio",
                        title: "Code y README",
                        body: "Inclu\u00ed instrucciones simples y cualquier hack clave."
                    },
                    {
                        tag: "Pitch corto",
                        title: "Demo de 2 minutos",
                        body: "Cont\u00e1 el problema y mostr\u00e1 la soluci\u00f3n. Sin slides eternas."
                    }
                ]
            }
        },
        judging: {
            hero: {
                tag: "El juicio",
                title: "Ac\u00e1 te rompemos el ego.",
                body: "Si funciona, si se entiende, si vende. Si no, afuera. AI permitido.",
                primary: "Entrar al ring",
                secondary: "El protocolo"
            },
            weights: {
                label: "Pesos",
                title: "C\u00f3mo te juzgamos",
                body: "Ac\u00e1 no hay humo. Mostr\u00e1 valor en minutos.",
                cards: [
                    {
                        tag: "Regla base",
                        title: "Demo online",
                        body: "La URL debe estar viva. Si no carga, no hay puntaje."
                    },
                    {
                        tag: "AI permitido",
                        title: "Transparencia",
                        body: "Pod\u00e9s usar IA, templates y libs. Cont\u00e1 qu\u00e9 usaste."
                    }
                ]
            },
            bars: [
                { label: "Funciona de verdad? (40%)", value: 90 },
                { label: "Se entiende en 30 segundos? (30%)", value: 70 },
                { label: "Tu demo vende sola? (20%)", value: 50 },
                { label: "Shipeaste o chamuyaste? (10%)", value: 30 }
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
                        body: "Us\u00e1 lo que mejor sab\u00e9s. La velocidad manda."
                    },
                    {
                        num: "03",
                        title: "Repo p\u00fablico",
                        body: "Sub\u00ed el repo con README claro y setup minimal."
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
                body: "Estamos armando la arena a la vista. Cada paso es p\u00fablico y medible para que la comunidad empuje con nosotros.",
                primary: "Aplic\u00e1 para Season 0",
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
                title: "Quer\u00e9s empujar el roadmap",
                body: "Buscamos mentores, jurados y partners locales en Toronto. Si quer\u00e9s construir en la primera l\u00ednea, este es el momento.",
                primary: "Quiero participar",
                secondary: "Ver preguntas"
            }
        },
        faq: {
            hero: {
                tag: "FAQ",
                title: "Respuestas directas.",
                body: "Todo lo que te pregunt\u00e1s antes de aplicar. Si falta algo, escribinos.",
                primary: "Aplic\u00e1 para Season 0",
                secondary: "Ver protocolo"
            },
            list: {
                label: "Preguntas",
                title: "Lo que m\u00e1s preguntan",
                items: [
                    {
                        question: "\u00bfPuedo usar IA y templates?",
                        answer: "S\u00ed. La IA est\u00e1 permitida y recomendada. Queremos velocidad real, no purismo."
                    },
                    {
                        question: "\u00bfQu\u00e9 pasa si la demo no carga?",
                        answer: "Sin demo online no hay puntaje. La URL debe estar viva al momento de la revisi\u00f3n."
                    },
                    {
                        question: "\u00bfSe puede competir en equipo?",
                        answer: "Season 0 es individual. Queremos medir velocidad de shipping persona a persona."
                    },
                    {
                        question: "\u00bfCu\u00e1l es el stack permitido?",
                        answer: "Stack libre. Eleg\u00ed lo que puedas construir en 2 horas sin perder foco."
                    },
                    {
                        question: "\u00bfHay premio monetario?",
                        answer: "El drop incluye visibilidad, acceso directo a la comunidad y rewards definidos por sponsors locales."
                    },
                    {
                        question: "\u00bfC\u00f3mo me entero del prompt?",
                        answer: "El prompt se revela en el kickoff del drop. Te llega por mail y en la sala en vivo."
                    }
                ]
            }
        },
        apply: {
            hero: {
                tag: "Casting",
                title: "Entrada al ring.",
                body: "Esto es Season 0. No prometemos suave. Si entr\u00e1s, shipe\u00e1s. Si no, mir\u00e1s desde la tribuna."
            },
            form: {
                label: "Entrada al ring",
                title: "Me la banco, anot\u00e1me.",
                fields: {
                    name: {
                        label: "Nombre completo",
                        placeholder: "Tu nombre"
                    },
                    email: {
                        label: "Email",
                        placeholder: "tu@email.com"
                    },
                    timezone: {
                        label: "Zona horaria",
                        placeholder: "Eleg\u00ed tu zona",
                        options: {
                            et: "ET (Toronto)",
                            ct: "CT",
                            mt: "MT",
                            pt: "PT",
                            gmt3: "GMT-3 (Latam)",
                            gmt: "GMT",
                            cet: "CET"
                        }
                    },
                    stack: {
                        label: "Stack preferido",
                        placeholder: "Eleg\u00ed uno",
                        options: {
                            fullstack: "Fullstack JS/TS",
                            frontend: "Frontend",
                            backend: "Backend",
                            mobile: "Mobile",
                            data: "Data/ML",
                            other: "Otro"
                        }
                    },
                    github: {
                        label: "GitHub",
                        placeholder: "https://github.com/tuuser"
                    },
                    x: {
                        label: "X / Twitter",
                        placeholder: "https://x.com/tuuser"
                    },
                    linkedin: {
                        label: "LinkedIn",
                        placeholder: "https://linkedin.com/in/tuuser"
                    },
                    demo: {
                        label: "Te anim\u00e1s a demo live?",
                        placeholder: "Eleg\u00ed una opci\u00f3n",
                        options: {
                            yes: "S\u00ed, me la banco",
                            no: "No, prefiero grabado"
                        }
                    },
                    fairplay: {
                        label: "Acepto jugar limpio (reglas b\u00e1sicas)"
                    }
                },
                consent: "Te vamos a escribir sobre el evento.",
                submit: "Entrar al ring",
                helper: "Si te aceptamos, te escribimos en 48hs.",
                success: "Listo. Est\u00e1s en el radar. Te contactamos en 48hs.",
                error: "Completa los campos obligatorios."
            }
        }
    },
    en: {
        nav: {
            menu: "Menu",
            home: "Home",
            how: "The protocol",
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
            copy: "(c) 2025 TORONTO TECH MINIMAL",
            twitter: "Twitter/X",
            discord: "Discord"
        },
        theme: {
            label: "Theme",
            dark: "Dark",
            light: "Light"
        },
        waitlist: {
            label: "Waitlist",
            title: "Get the upcoming dates first.",
            body: "Drop your email and we will ping you with upcoming dates. You can enter the arena or just watch.",
            fields: {
                name: "Name",
                email: "Email",
                role: "Do you want to compete or watch"
            },
            placeholders: {
                name: "Your name",
                email: "you@email.com",
                role: "Select one"
            },
            roles: {
                arena: "I want to enter the arena",
                spectator: "Spectator only"
            },
            submit: "Join waitlist",
            dismiss: "Close",
            helper: "We will email you when new dates drop.",
            success: "Done. We will reach out first.",
            error: "Fill name, email, and option.",
            close: "Close modal"
        },
        home: {
            hero: {
                tag: "Toronto Vibe-coding Arena",
                title: "You have 2 hours. Ship or step out.",
                body: "Season 0. First gladiators. Limited spots. Not a hackathon: it's a drop. You enter, you ship, you get judged.",
                primary: "Enter the ring",
                secondary: "Ring rules"
            },
            signal: {
                label: "Toronto signal locked",
                body: "Arena online. Tower in the back. Clock up top."
            },
            drop: {
                title: "Next drop",
                format: "Format",
                formatValue: "Global online + optional Toronto meetup",
                duration: "Duration",
                durationValue: "120 minutes",
                stack: "Stack",
                stackValue: "Open stack",
                window: "Jan-Feb window",
                note: "We ping you first if you are in Season 0"
            },
            status: {
                label: "Arena status",
                title: "Ring patch notes",
                items: [
                    {
                        title: "Season 0",
                        body: "Building in public"
                    },
                    {
                        title: "Private beta",
                        body: "Feb 15 (tentative)"
                    },
                    {
                        title: "Public drop",
                        body: "Jan-Feb window"
                    },
                    {
                        title: "Last update",
                        body: "2 days ago"
                    }
                ]
            },
            liveVote: {
                label: "Live vote status",
                closed: "Live vote: CLOSED. Opens during live demos.",
                open: "Live vote: OPEN. Closes in",
                ended: "Vote closed. Winner",
                endedPending: "Vote closed. Results soon.",
                noDrop: "Season 0 in construction.",
                ctaClosed: "Notify me",
                ctaOpen: "Vote now",
                ctaEnded: "See results",
                badgeOpen: "OPEN"
            },
            memes: {
                label: "Lines",
                title: "Ammo for X",
                items: [
                    "Ship fast. Demo live.",
                    "Zero excuses, just shipping.",
                    "Vibe coding with a clock."
                ]
            },
            glory: {
                label: "Wall of Glory",
                title: "Ring scoreboard",
                body: "Empty for now. Want to be first?",
                cta: "Take the first slot"
            },
            map: {
                label: "Map",
                title: "Everything you need to know",
                cards: [
                    {
                        tag: "01 - The protocol",
                        title: "The protocol",
                        body: "Prompt hits, you build, you ship, the crowd decides."
                    },
                    {
                        tag: "02 - The rules",
                        title: "How winning works",
                        body: "Live votes only. One person, one vote. No judge panel."
                    },
                    {
                        tag: "03 - Arena status",
                        title: "Proof of life",
                        body: "Drop patch notes, real dates, voting windows."
                    },
                    {
                        tag: "04 - Wall of Glory",
                        title: "The scoreboard",
                        body: "Empty for now. Want the first slot?"
                    }
                ]
            },
            season: {
                label: "Season 0",
                title: "Not a corporate event.",
                body: "You enter, you ship, you get judged live. Win and you take the drop.",
                primary: "Enter the ring",
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
                tag: "The protocol",
                title: "Ring rules. No detours.",
                body: "Kickoff 18:00 ET (Toronto). A prompt hits and the clock starts. Clean slate for this drop, but templates are allowed.",
                primary: "Enter the ring",
                secondary: "How we judge"
            },
            steps: {
                label: "Steps",
                title: "The protocol in 4 hits",
                items: [
                    {
                        num: "01",
                        title: "Prompt hits",
                        body: "Kickoff 18:00 ET (Toronto). Clean slate for this drop, but templates are allowed."
                    },
                    {
                        num: "02",
                        title: "Build",
                        body: "You get 2 hours. AI, templates, anything. The goal is shipping."
                    },
                    {
                        num: "03",
                        title: "Ship the demo",
                        body: "Live URL + repo. If it does not load, it does not exist."
                    },
                    {
                        num: "04",
                        title: "Live judgment",
                        body: "Top 5 go live. One winner takes the drop."
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
                        body: "Include clear instructions and any key shortcuts."
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
                tag: "Judgment",
                title: "We break your ego fast.",
                body: "Does it work, is it clear, does it sell. If not, you are out. AI allowed.",
                primary: "Enter the ring",
                secondary: "The protocol"
            },
            weights: {
                label: "Weights",
                title: "How we judge",
                body: "No smoke. Show value in minutes.",
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
                { label: "Does it actually work? (40%)", value: 90 },
                { label: "Clear in 30 seconds? (30%)", value: 70 },
                { label: "Does your demo sell itself? (20%)", value: 50 },
                { label: "Did you ship or BS? (10%)", value: 30 }
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
                tag: "Casting",
                title: "Enter the ring.",
                body: "This is Season 0. No soft promises. If you get in, you ship. If not, you watch from the stands."
            },
            form: {
                label: "Ring entry",
                title: "I can take it, sign me up.",
                fields: {
                    name: {
                        label: "Full name",
                        placeholder: "Your name"
                    },
                    email: {
                        label: "Email",
                        placeholder: "you@email.com"
                    },
                    timezone: {
                        label: "Time zone",
                        placeholder: "Select your zone",
                        options: {
                            et: "ET (Toronto)",
                            ct: "CT",
                            mt: "MT",
                            pt: "PT",
                            gmt3: "GMT-3 (Latam)",
                            gmt: "GMT",
                            cet: "CET"
                        }
                    },
                    stack: {
                        label: "Preferred stack",
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
                    github: {
                        label: "GitHub",
                        placeholder: "https://github.com/you"
                    },
                    x: {
                        label: "X / Twitter",
                        placeholder: "https://x.com/you"
                    },
                    linkedin: {
                        label: "LinkedIn",
                        placeholder: "https://linkedin.com/in/you"
                    },
                    demo: {
                        label: "Are you down for a live demo?",
                        placeholder: "Select one",
                        options: {
                            yes: "Yes, put me on stage",
                            no: "No, I prefer recorded"
                        }
                    },
                    fairplay: {
                        label: "I play clean (basic rules)"
                    }
                },
                consent: "We will email you about the event.",
                submit: "Enter the ring",
                helper: "If you are in, we reach out within 48h.",
                success: "All set. You are on the radar. We will reach out within 48h.",
                error: "Fill the required fields."
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
