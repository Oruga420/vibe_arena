import "./globals.css";
import MicroBar from "../components/MicroBar";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";
import BottomToggles from "../components/BottomToggles";

export const metadata = {
    title: "Vibe Coding Colosseum | Make Money With Vibe Coding",
    description: "How to make money vibe coding: Compete in 1-hour AI coding battles, win cash prizes, and prove your skills. The premier competitive platform where developers earn money through vibe coding competitions.",

    // Core SEO Keywords
    keywords: [
        "how to make money vibe coding",
        "make money with vibe coding",
        "vibe coding competition",
        "AI coding tournament",
        "earn money coding with AI",
        "vibe coding cash prizes",
        "competitive AI programming",
        "cursor AI competition",
        "windsurf coding battle",
        "claude coding contest",
        "GPT coding tournament",
        "AI pair programming competition",
        "developer coding arena",
        "live coding competition",
        "speed coding with AI",
        "AI assisted development contest",
        "vibe coder income",
        "monetize vibe coding skills"
    ].join(", "),

    // Open Graph for Social Sharing
    openGraph: {
        title: "Vibe Coding Colosseum | Make Money Vibe Coding",
        description: "Compete in 1-hour AI coding battles. Win real cash. How to make money with vibe coding - join the arena!",
        url: "https://vibearena.dev",
        siteName: "Vibe Coding Colosseum",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Vibe Coding Colosseum - Make Money Vibe Coding"
            }
        ]
    },

    // Twitter Card
    twitter: {
        card: "summary_large_image",
        title: "Make Money Vibe Coding | Vibe Coding Colosseum",
        description: "1-hour AI coding battles. Real cash prizes. Join the arena where vibe coders compete and earn.",
        images: ["/logo.png"]
    },

    // Additional SEO
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },

    // Alternate names for the site
    alternates: {
        canonical: "https://vibearena.dev"
    },

    // App category
    category: "technology",

    // Author info
    authors: [{ name: "Vibe Arena Team" }],
    creator: "Vibe Arena",
    publisher: "Vibe Arena"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@300;500&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <LanguageProvider>
                    <MicroBar />
                    <Nav />
                    {children}
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
