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
            voteGuide: "C\u00f3mo votar",
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
        entry: {
            labels: {
                entry: "ENTRADA",
                min: "M\u00cdNIMO PARA ARRANCAR",
                cap: "CUPO M\u00c1XIMO",
                payout: "PREMIO",
                house: "ARENA",
                spots: "Cupos reservados",
                pot: "Pozo actual",
                winner: "Premio del ganador (si arranca)"
            },
            values: {
                payout: "El ganador se lleva {prizePct}% del pozo",
                house: "{housePct}% para operar la arena"
            }
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
                tag: "Vibe Coding Colosseum",
                title: "Ten\u00e9s 1 hora. Shippe\u00e1 algo o sal\u00ed del ring.",
                body: "Any role. Same shot. Season 0. Los primeros gladiadores. Cupos limitados. No es hackathon: es un drop. Entr\u00e1s, shippe\u00e1s, te votan.",
                primary: "Entrar al ring",
                secondary: "Las reglas del ring"
            },
            drop: {
                title: "Pr\u00f3ximo drop",
                format: "Formato",
                formatValue: "Online global + meetup opcional en Toronto",
                duration: "Duraci\u00f3n",
                durationValue: "60 minutos",
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
            entry: {
                note: "El link de pago se habilita al llegar a {min} participantes. Antes solo confirmamos tu lugar para el pr\u00f3ximo QuickDrop."
            },
            liveVote: {
                label: "Live vote status",
                closed: "Voto en vivo: CERRADO. Abre durante demos. Sin jueces.",
                open: "Voto en vivo: ABIERTO. Cierra en",
                ended: "Voto en vivo: CERRADO. Gan\u00f3",
                endedPending: "Voto en vivo: CERRADO. Resultados en breve.",
                noDrop: "Season 0 en construcci\u00f3n.",
                ctaClosed: "Aplicar",
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
                        body: "Cae el tema, constru\u00eds, shipe\u00e1s, decide la gente."
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
                    },
                    {
                        tag: "05 - Votaci\u00f3n",
                        title: "C\u00f3mo votar",
                        body: "Gu\u00eda r\u00e1pida: QR din\u00e1micos, seguridad y d\u00f3nde dar click."
                    }
                ]
            },
            season: {
                label: "Season 0",
                title: "Esto no es un evento corporativo.",
                body: "Entr\u00e1s, shipe\u00e1s, te votan en vivo. Si gan\u00e1s, te llev\u00e1s el drop.",
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
                            judge: "Seat en host",
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
                body: "Kickoff 18:00 ET (Toronto). Tema + open build + twist opcional. Sin boilerplates. No traigas una app ya hecha.",
                primary: "Entrar al ring",
                secondary: "C\u00f3mo se vota"
            },
            steps: {
                label: "Pasos",
                title: "El protocolo en 4 golpes",
                items: [
                    {
                        num: "01",
                        title: "Cae el tema",
                        body: "Kickoff 18:00 ET (Toronto). Tema + open build + twist opcional. Sin boilerplates. No traigas una app ya hecha."
                    },
                    {
                        num: "02",
                        title: "Constru\u00eds",
                        body: "Ten\u00e9s 1 hora. Cualquier stack. Cualquier IA. Sin templates. Objetivo: shippear."
                    },
                    {
                        num: "03",
                        title: "Entreg\u00e1s demo",
                        body: "URL viva + repo + README. Si no carga, no existe. Las entregas cierran 20:00 ET."
                    },
                    {
                        num: "04",
                        title: "Voto en vivo",
                        body: "Demos rel\u00e1mpago, luego vota la gente. Top 5 finalistas. Voto final elige ganador. Votaci\u00f3n abierta durante demos; un voto por persona."
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
                tag: "REGLAS DE VOTO",
                title: "La gente te rompe el ego r\u00e1pido.",
                body: "Tiene que funcionar. Tiene que ser claro. Tiene que vender. Sin jueces: decide el voto en vivo. IA permitida.",
                primary: "Entrar al ring",
                secondary: "Ver el protocolo"
            },
            entry: {
                label: "REGLAS DE ENTRADA",
                title: "Entrada {fee}",
                items: [
                    "M\u00ednimo {min} participantes para arrancar.",
                    "Cupo m\u00e1ximo {max} gladiadores.",
                    "El ganador se lleva {prizePct}% del pozo."
                ],
                note: "El link de pago se habilita al llegar a {min} participantes. Antes solo confirmamos tu lugar para el pr\u00f3ximo QuickDrop."
            },
            weights: {
                label: "C\u00d3MO SE GANA",
                title: "Voto en vivo. Sin jueces.",
                body: "Votaci\u00f3n abierta durante demos y se cierra r\u00e1pido. Un voto por persona. El ganador es el voto.",
                cards: [
                    {
                        tag: "Regla base",
                        title: "Ventana de voto",
                        body: "El voto abre durante demos y se cierra r\u00e1pido. Si te lo perd\u00e9s, te lo perd\u00e9s."
                    },
                    {
                        tag: "Anti-trampa",
                        title: "Chequeo de presencia",
                        body: "Solo pod\u00e9s votar si est\u00e1s en vivo. Tokens rotan."
                    },
                    {
                        tag: "IA permitida",
                        title: "Transparencia",
                        body: "Us\u00e1 IA y libs. Solo cont\u00e1 qu\u00e9 usaste."
                    },
                    {
                        tag: "Filtro duro",
                        title: "Demo funcional",
                        body: "Si la URL no carga, no existe. No entra a votaci\u00f3n."
                    }
                ]
            },
            bars: [
                { label: "Funciona de verdad?", value: 90 },
                { label: "Se entiende en 30 segundos?", value: 70 },
                { label: "Tu demo vende sola?", value: 50 },
                { label: "Shipeaste o chamuyaste?", value: 30 }
            ],
            barsLabel: "QU\u00c9 CONSIGUE VOTOS",
            format: {
                label: "FORMATO",
                title: "C\u00f3mo sale el Top 5",
                items: [
                    "Ronda 1: demos rel\u00e1mpago (60-90s cada una).",
                    "Voto 1: la gente elige el Top 5.",
                    "Ronda 2: demos rel\u00e1mpago del Top 5.",
                    "Voto 2: el ganador se lleva el drop."
                ],
                note: "Si te perd\u00e9s la ventana de voto, te lo perd\u00e9s. Sin drama."
            },
            checklist: {
                label: "Checklist",
                title: "Reglas base",
                items: [
                    {
                        num: "01",
                        title: "60 minutos",
                        body: "El timer corre para todos. No hay extensiones ni excepciones."
                    },
                    {
                        num: "02",
                        title: "Stack libre",
                        body: "Us\u00e1 lo que mejor sab\u00e9s. Cualquier stack. Cualquier IA. Shipe\u00e1 r\u00e1pido."
                    },
                    {
                        num: "03",
                        title: "Repo p\u00fablico",
                        body: "Sub\u00ed el repo con README claro y setup minimal."
                    },
                    {
                        num: "04",
                        title: "Voto en vivo",
                        body: "Demos rel\u00e1mpago y voto de la gente. Un ganador."
                    }
                ]
            },
            autoDQ: {
                label: "NO DRAMA",
                title: "Auto-DQ",
                items: [
                    "Demo ca\u00edda durante la votaci\u00f3n.",
                    "Sin repo o sin README.",
                    "Producto pre-armado (sin boilerplates, no apps hechas).",
                    "Intentos de manipulaci\u00f3n de votos."
                ],
                note: "Lo mantenemos justo para que la gente elija al ganador real."
            }
        },
        roadmap: {
            hero: {
                tag: "BUILDING IN PUBLIC",
                title: "Season 0 Patch Notes",
                body: "Estamos armando la arena a la vista. Cada update es real.",
                primary: "Aplic\u00e1 para Season 0",
                secondary: "Unirme al Discord"
            },
            status: {
                label: "STATUS",
                title: "Patch notes + pr\u00f3ximo drop",
                body: "Qu\u00e9 ya est\u00e1 shippeado, qu\u00e9 viene, y cu\u00e1ndo abre la votaci\u00f3n.",
                items: [
                    { label: "Entrada", value: "{fee}" },
                    { label: "M\u00ednimo / Cupo", value: "Min {min} / Cupo {max}" },
                    { label: "Premio", value: "Ganador {prizePct}% del pozo" },
                    { label: "Pr\u00f3ximo drop", value: "Ventana Enero-Feb" }
                ],
                cta: "Entrar al ring"
            },
            checklist: {
                label: "NEXT DROP CHECKLIST",
                title: "Para shippear el primer drop",
                items: [
                    { status: "DONE", title: "Landing + Apply" },
                    { status: "EN PROGRESO", title: "Template de brief (Tema + Twist)" },
                    { status: "EN PROGRESO", title: "Pipeline de entregas (URL + repo)" },
                    { status: "EN PROGRESO", title: "Sistema de voto en vivo (open/close)" },
                    { status: "EN PROGRESO", title: "Automatizaci\u00f3n del scoreboard" }
                ],
                cta: "Ayudar a shippear"
            },
            ways: {
                label: "WAYS TO JOIN",
                title: "Sumate al ring",
                items: [
                    { title: "Competir", body: "Aplic\u00e1 y shipe\u00e1." },
                    { title: "Votar", body: "Solo durante la ventana en vivo." },
                    { title: "Construir", body: "Ayudanos a shippear Season 0." }
                ],
                primary: "Aplicar",
                secondary: "Avisame para votar",
                tertiary: "Unirme al Discord",
                sponsor: "Quer\u00e9s sponsorear un premio? Hablemos."
            }
        },
        faq: {
            hero: {
                tag: "CONTRATO DEL RING",
                title: "Le\u00e9 esto. Despu\u00e9s entr\u00e1.",
                body: "Season 0 es simple: 1 hora, demo en vivo, la gente decide.",
                primary: "Aplic\u00e1 para Season 0",
                secondary: "Ver protocolo"
            },
            list: {
                label: "CONTRATO DEL RING",
                title: "Lo que de verdad preguntan",
                items: [
                    {
                        question: "\u00bfC\u00f3mo gano?",
                        answer: "Con votos en vivo. Sin jueces. La gente decide."
                    },
                    {
                        question: "\u00bfCu\u00e1ndo se puede votar?",
                        answer: "Solo durante demos. El voto abre en vivo y se cierra r\u00e1pido."
                    },
                    {
                        question: "\u00bfCu\u00e1nto cuesta entrar?",
                        answer: "{fee}. M\u00ednimo {min} participantes para arrancar. Cupo {max}. Confirmamos tu lugar para el pr\u00f3ximo QuickDrop y el link de pago se libera al llegar a {min}."
                    },
                    {
                        question: "\u00bfPuedo usar IA y librer\u00edas?",
                        answer: "S\u00ed. Us\u00e1 IA y librer\u00edas. Sin templates. Desde cero. Cont\u00e1 qu\u00e9 usaste."
                    },
                    {
                        question: "\u00bfPuedo traer una app ya hecha?",
                        answer: "No. Sin boilerplates. Todo desde cero."
                    },
                    {
                        question: "\u00bfQu\u00e9 tengo que entregar?",
                        answer: "URL viva + repo + README + demo de 2 minutos. Si la URL no carga, no existe."
                    },
                    {
                        question: "\u00bfC\u00f3mo sale el Top 5?",
                        answer: "Voto en dos pasos. Voto 1 elige Top 5, demo de nuevo, Voto 2 elige ganador."
                    },
                    {
                        question: "\u00bfAlguna trampa?",
                        answer: "No manipules votos. Season 0 es individual. Si hay fraude, qued\u00e1s afuera."
                    },
                    {
                        question: "¿Cómo se vota?",
                        answer: "QR din\u00e1mico en el stream. Te lleva a la app. Eleg\u00eds tu gladiador. Listo. El QR cambia cada 10s para que solo voten los reales. [Ver gu\u00eda completa aqu\u00ed](/voting-guide)."
                    }
                ],
                footer: "Si est\u00e1s de acuerdo, aplic\u00e1. Si no, mir\u00e1 desde la tribuna."
            }
        },
        apply: {
            hero: {
                tag: "Casting",
                title: "Entrada al ring.",
                body: "Esto es Season 0. No prometemos suave. Si entr\u00e1s, shipe\u00e1s. Si no, mir\u00e1s desde la tribuna."
            },
            entry: {
                note: "El link de pago se habilita al llegar a {min} participantes. Antes solo confirmamos tu lugar para el pr\u00f3ximo QuickDrop."
            },
            form: {
                label: "Entrada al ring",
                title: "Me la banco, anot\u00e1me.",
                fields: {
                    name: {
                        label: "Nombre completo",
                        placeholder: "Tu nombre"
                    },
                    colosseumName: {
                        label: "Nombre de Coliseo (Apodo)",
                        placeholder: "Ej: CyberGladiator"
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
                submit: "Reservar lugar",
                soldOut: "Cupos completos",
                helper: "Te confirmamos lugar para el pr\u00f3ximo QuickDrop. El link de pago se desbloquea cuando hay {min} gladiadores listos.",
                success: "Listo. Tu lugar para el pr\u00f3ximo QuickDrop est\u00e1 confirmado. El link de pago se desbloquea cuando lleguemos a {min} gladiadores.",
                error: "Completa los campos obligatorios."
            }
        },
        votingGuide: {
            hero: {
                tag: "EL PROTOCOLO DE SEDA",
                title: "Presenci\u00e1 la carnicer\u00eda.",
                subtitle: "En el Coliseo, el c\u00f3digo no tiene sentimientos. Tu voto es el que decide qui\u00e9n vive y qui\u00e9n muere en la arena.",
                cta: "ENTRAR AL RING"
            },
            steps: {
                label: "C\u00d3MO SE GANA",
                items: [
                    {
                        num: "01",
                        title: "Busc\u00e1 el QR",
                        body: "El stream proyecta el artefacto de acceso. Sin el QR, sos solo un fantasma en la tribuna."
                    },
                    {
                        num: "02",
                        title: "Sincroniz\u00e1 tu pulso",
                        body: "El QR es un organismo vivo: cambia cada 10s. Escanealo antes de que el token muera."
                    },
                    {
                        num: "03",
                        title: "Eleg\u00ed el destino",
                        body: "Vot\u00e1 por el gladiador que mejor shippe\u00f3. El top 5 vuelve a pelear. Tu pulso es su gloria."
                    }
                ]
            },
            security: {
                title: "\u00bfPor qu\u00e9 QR din\u00e1micos?",
                body: "Para matar bots. Solo humanos reales viendo en tiempo real pueden generar un token v\u00e1lido."
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
            voteGuide: "How to vote",
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
        entry: {
            labels: {
                entry: "ENTRY",
                min: "MIN TO START",
                cap: "CAP",
                payout: "GRAND PRIZE",
                house: "HOUSE",
                spots: "Spots reserved",
                pot: "Current Prize Pool",
                winner: "Grand Prize (if started)"
            },
            values: {
                payout: "Winner takes {prizePct}% of the Prize Pool",
                house: "{housePct}% runs the arena"
            }
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
                tag: "Vibe Coding Colosseum",
                title: "You have 1 hour. Ship or step out.",
                body: "Any role. Same shot. Season 0. First gladiators. Limited spots. Not a hackathon: it's a drop. You enter, you ship, the crowd votes.",
                primary: "Enter the ring",
                secondary: "Ring rules"
            },
            drop: {
                title: "Next drop",
                format: "Format",
                formatValue: "Global online + optional Toronto meetup",
                duration: "Duration",
                durationValue: "60 minutes",
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
            entry: {
                note: "The payment link unlocks at {min} participants. Until then we only confirm your spot for the next QuickDrop."
            },
            liveVote: {
                label: "Live vote status",
                closed: "Live vote: CLOSED. Opens during demos. No judges.",
                open: "Live vote: OPEN. Closes in",
                ended: "Live vote: CLOSED. Winner",
                endedPending: "Live vote: CLOSED. Results soon.",
                noDrop: "Season 0 in construction.",
                ctaClosed: "Apply for Season 0",
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
                        body: "Theme drops, you build, you ship, the crowd decides."
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
                    },
                    {
                        tag: "05 - Voting",
                        title: "How to vote",
                        body: "Quick guide: dynamic QRs, security, and where to click."
                    }
                ]
            },
            season: {
                label: "Season 0",
                title: "Not a corporate event.",
                body: "You enter, you ship, the crowd votes live. Win and you take the drop.",
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
                            judge: "Host seat",
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
                body: "Kickoff 18:00 ET (Toronto). Theme + open build + optional twist. No boilerplates. Start from scratch.",
                primary: "Enter the ring",
                secondary: "How voting works"
            },
            steps: {
                label: "Steps",
                title: "The protocol in 4 hits",
                items: [
                    {
                        num: "01",
                        title: "Theme drops",
                        body: "Kickoff 18:00 ET (Toronto). Theme + open build + optional twist. No boilerplates. Start from scratch."
                    },
                    {
                        num: "02",
                        title: "Build",
                        body: "You get 1 hour. Any stack. Any AI. No templates. Goal is shipping."
                    },
                    {
                        num: "03",
                        title: "Ship the demo",
                        body: "Live URL + repo + README. If it does not load, it does not exist. Submissions close at 20:00 ET."
                    },
                    {
                        num: "04",
                        title: "Live vote",
                        body: "Lightning demos, then the crowd votes. Top 5 finalists. Final vote picks the winner. Voting opens during demos. One vote per person."
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
                tag: "VOTING RULES",
                title: "The crowd breaks your ego fast.",
                body: "It must work. It must be clear. It must sell. No judges: live vote decides. AI allowed.",
                primary: "Enter the ring",
                secondary: "See the protocol"
            },
            entry: {
                label: "ENTRY RULES",
                title: "Entry is {fee}",
                items: [
                    "Min {min} participants to start.",
                    "Cap {max} gladiators.",
                    "Winner takes {prizePct}% of the Prize Pool."
                ],
                note: "The payment link unlocks at {min} participants. Until then we only confirm your spot for the next QuickDrop."
            },
            weights: {
                label: "HOW WINNING WORKS",
                title: "Live vote. No judges.",
                body: "Voting opens during demos and closes fast. One vote per person. Winner is the vote.",
                cards: [
                    {
                        tag: "Base rule",
                        title: "Live vote window",
                        body: "Voting opens during demos and closes fast. Miss it, you miss it."
                    },
                    {
                        tag: "Anti-cheat",
                        title: "Presence check",
                        body: "You can only vote if you are watching live. Tokens rotate."
                    },
                    {
                        tag: "AI allowed",
                        title: "Transparency",
                        body: "Use AI and libs. Just disclose what you used."
                    },
                    {
                        tag: "Hard filter",
                        title: "Working demo",
                        body: "If the URL does not load, it does not exist. Not eligible for votes."
                    }
                ]
            },
            bars: [
                { label: "Does it actually work?", value: 90 },
                { label: "Clear in 30 seconds?", value: 70 },
                { label: "Does the demo sell itself?", value: 50 },
                { label: "Did you ship or BS?", value: 30 }
            ],
            barsLabel: "WHAT GETS VOTES",
            format: {
                label: "FORMAT",
                title: "How the Top 5 happens",
                items: [
                    "Round 1: lightning demos (60-90s each).",
                    "Vote 1: the crowd picks the Top 5.",
                    "Round 2: Top 5 lightning demos.",
                    "Vote 2: winner takes the drop."
                ],
                note: "If you miss the vote window, you miss the vote. No drama."
            },
            checklist: {
                label: "Checklist",
                title: "Core rules",
                items: [
                    {
                        num: "01",
                        title: "60 minutes",
                        body: "The timer runs for everyone. No extensions."
                    },
                    {
                        num: "02",
                        title: "Open stack",
                        body: "Use what you know best. Any stack. Any AI. Ship fast."
                    },
                    {
                        num: "03",
                        title: "Public repo",
                        body: "Ship the repo with a clear README and minimal setup."
                    },
                    {
                        num: "04",
                        title: "Live vote",
                        body: "Lightning demos, then the crowd votes. One winner."
                    }
                ]
            },
            autoDQ: {
                label: "NO DRAMA",
                title: "Auto-DQ",
                items: [
                    "Demo link is down during voting.",
                    "No repo or no README.",
                    "Pre-built product (no boilerplates, no finished apps).",
                    "Vote manipulation attempts."
                ],
                note: "We keep it fair so the crowd decides the real winner."
            }
        },
        roadmap: {
            hero: {
                tag: "BUILDING IN PUBLIC",
                title: "Season 0 Patch Notes",
                body: "We are building the arena in public. Every update is real.",
                primary: "Apply for Season 0",
                secondary: "Join the Discord"
            },
            status: {
                label: "STATUS",
                title: "Patch notes + next drop",
                body: "What is shipped, what is next, and when voting opens.",
                items: [
                    { label: "Entry", value: "{fee}" },
                    { label: "Min / Cap", value: "Min {min} / Cap {max}" },
                    { label: "Prize", value: "Winner takes {prizePct}% of the Prize Pool" },
                    { label: "Next drop", value: "Jan-Feb window" }
                ],
                cta: "Enter the ring"
            },
            checklist: {
                label: "NEXT DROP CHECKLIST",
                title: "To ship the first drop",
                items: [
                    { status: "DONE", title: "Landing + Apply" },
                    { status: "IN PROGRESS", title: "Theme + Twist brief template" },
                    { status: "IN PROGRESS", title: "Submission pipeline (URL + repo)" },
                    { status: "IN PROGRESS", title: "Live vote system (open/close)" },
                    { status: "IN PROGRESS", title: "Scoreboard automation" }
                ],
                cta: "Help ship this"
            },
            ways: {
                label: "WAYS TO JOIN",
                title: "Ways to join",
                items: [
                    { title: "Compete", body: "Apply and ship." },
                    { title: "Vote", body: "Live window only." },
                    { title: "Build", body: "Help us ship Season 0." }
                ],
                primary: "Compete",
                secondary: "Notify me",
                tertiary: "Join the Discord",
                sponsor: "Want to sponsor a prize? Talk."
            }
        },
        faq: {
            hero: {
                tag: "RING CONTRACT",
                title: "Read this. Then enter.",
                body: "Season 0 is simple: 1 hour, demo live, the crowd decides.",
                primary: "Apply for Season 0",
                secondary: "See protocol"
            },
            list: {
                label: "RING CONTRACT",
                title: "The stuff people actually ask",
                items: [
                    {
                        question: "How do I win?",
                        answer: "By live votes. No judges. The crowd decides."
                    },
                    {
                        question: "When can people vote?",
                        answer: "Only during demos. Voting opens live and closes fast."
                    },
                    {
                        question: "Entry fee?",
                        answer: "{fee}. Min {min} participants to start. Cap {max}. We confirm your spot for the next QuickDrop and send the payment link at {min}."
                    },
                    {
                        question: "Can I use AI and libraries?",
                        answer: "Yes. Use AI and libraries. No templates. Start from scratch. Disclose what you used."
                    },
                    {
                        question: "Can I bring a pre-built app?",
                        answer: "No. No boilerplates. Start from scratch."
                    },
                    {
                        question: "What must I submit?",
                        answer: "Working URL + repo + README + 2-minute demo. If the URL does not load, it does not exist."
                    },
                    {
                        question: "How does Top 5 happen?",
                        answer: "Two-step vote. Vote 1 picks Top 5, Top 5 demo again, Vote 2 picks the winner."
                    },
                    {
                        question: "Any gotchas?",
                        answer: "Do not manipulate votes. Season 0 is solo. If fraud is detected, you are out."
                    },
                    {
                        question: "How do I vote?",
                        answer: "Scan dynamic QR on stream. Takes you to app. Pick gladiator. Done. QR rotates every 10s so only real viewers vote. [See full guide here](/voting-guide)."
                    }
                ],
                footer: "If you agree, apply. If not, watch from the stands."
            }
        },
        apply: {
            hero: {
                tag: "Casting",
                title: "Enter the ring.",
                body: "This is Season 0. No soft promises. If you get in, you ship. If not, you watch from the stands."
            },
            entry: {
                note: "The payment link unlocks at {min} participants. Until then we only confirm your spot for the next QuickDrop."
            },
            form: {
                label: "Ring entry",
                title: "I can take it, sign me up.",
                fields: {
                    name: {
                        label: "Full name",
                        placeholder: "Your name"
                    },
                    colosseumName: {
                        label: "Colosseum Name (Nickname)",
                        placeholder: "Ex: CyberGladiator"
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
                submit: "Reserve a spot",
                soldOut: "Sold out",
                helper: "We confirm your spot for the next QuickDrop. Payment link unlocks when {min} gladiators are ready.",
                success: "All set. Your spot for the next QuickDrop is confirmed. Payment link unlocks when we reach {min} gladiators.",
                error: "Fill the required fields."
            }
        },
        votingGuide: {
            hero: {
                tag: "THE SILK PROTOCOL",
                title: "Witness the carnage.",
                subtitle: "In the Colosseum, code has no feelings. Your vote decides who lives and who dies in the arena.",
                cta: "ENTER THE RING"
            },
            steps: {
                label: "HOW WINNING WORKS",
                items: [
                    {
                        num: "01",
                        title: "Seek the QR",
                        body: "The stream projects the access artifact. Without the QR, you're just a ghost in the stands."
                    },
                    {
                        num: "02",
                        title: "Sync your pulse",
                        body: "The QR is a living organism: it rotates every 10s. Scan it before the token expires."
                    },
                    {
                        num: "03",
                        title: "Forge their fate",
                        body: "Vote for the gladiator who shipped best. The top 5 fight again. Your pulse is their glory."
                    }
                ]
            },
            security: {
                title: "Why dynamic QRs?",
                body: "To kill bots. Only real humans watching in real-time can generate a valid token."
            }
        }
    }
};

const LanguageContext = createContext({
    language: "en",
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
    const [language, setLanguage] = useState("en");

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
            const fallback = getPathValue(translations.en, key);
            return fallback !== undefined ? fallback : key;
        };
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}
