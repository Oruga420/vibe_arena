import "./globals.css";
import MicroBar from "../components/MicroBar";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";
import BottomToggles from "../components/BottomToggles";

export const metadata = {
    title: "Vibe Coding Colosseum | Quick Cash With Vibe Coding",
    description: "Make quick money vibe coding: 1-hour AI coding competitions with real cash prizes. The best side hustle for developers who code fast. Join the arena and earn money TODAY.",

    // Core SEO Keywords
    keywords: [
        "quick cash vibe coding",
        "make money fast coding",
        "developer side hustle",
        "fast money for programmers",
        "coding competition cash prizes",
        "earn money in 1 hour coding",
        "quick income for developers",
        "vibe coding side hustle",
        "make money with cursor ai",
        "earn money using claude",
        "gpt coding side hustle",
        "fast cash for coders",
        "quick gig for developers",
        "freelance alternative coding",
        "ai coding quick money",
        "speed coding cash prizes",
        "vibe coder income fast",
        "monetize coding skills quick"
    ].join(", "),

    // Open Graph for Social Sharing
    openGraph: {
        title: "Vibe Coding Colosseum | Quick Cash for Developers",
        description: "The #1 side hustle for coders. 1-hour AI coding battles with real cash prizes. Make quick money vibe coding!",
        url: "https://vibearena.dev",
        siteName: "Vibe Coding Colosseum",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Vibe Coding Colosseum - Quick Cash Side Hustle for Developers"
            }
        ]
    },

    // Twitter Card
    twitter: {
        card: "summary_large_image",
        title: "Quick Cash Vibe Coding | Developer Side Hustle",
        description: "1-hour coding battles. Real cash prizes. The fastest way for devs to earn money. Join the arena!",
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
