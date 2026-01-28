import "./globals.css";
import MicroBar from "../components/MicroBar";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";
import BottomToggles from "../components/BottomToggles";

export const metadata = {
    title: "Vibe Coding Colosseum | Make Money Vibe Coding | Vibe Coder Arena",
    description: "Vibe Coding competitions for quick cash! Learn vibe coding, become a vibe coder, win money in 1-hour vibe coding battles. The #1 vibe coding platform for vibe coders to earn. Vibe coding side hustle, vibe coding income, vibe coding prizes - join the vibe coding arena!",

    // Core SEO Keywords - VIBE CODING SATURATED
    keywords: [
        // Vibe Coding Core
        "vibe coding",
        "vibe coder",
        "vibe coders",
        "vibe code",
        "vibecoding",
        "vibe-coding",
        "what is vibe coding",
        "vibe coding meaning",
        "vibe coding definition",
        // Vibe Coding Money
        "make money vibe coding",
        "vibe coding income",
        "vibe coding salary",
        "vibe coding cash",
        "vibe coding prizes",
        "vibe coding earnings",
        "get paid vibe coding",
        "vibe coding quick cash",
        "vibe coding fast money",
        "vibe coding side hustle",
        "vibe coder income",
        "vibe coder salary",
        // Vibe Coding Competition
        "vibe coding competition",
        "vibe coding contest",
        "vibe coding tournament",
        "vibe coding battle",
        "vibe coding arena",
        "vibe coding colosseum",
        "competitive vibe coding",
        // Vibe Coding Tools
        "vibe coding cursor",
        "vibe coding claude",
        "vibe coding gpt",
        "vibe coding chatgpt",
        "vibe coding copilot",
        "vibe coding windsurf",
        "cursor vibe coding",
        "claude vibe coding",
        // Vibe Coding Learning
        "learn vibe coding",
        "vibe coding tutorial",
        "vibe coding course",
        "how to vibe code",
        "vibe coding for beginners",
        // Vibe Coding Career
        "vibe coder job",
        "vibe coding career",
        "hire vibe coder",
        "professional vibe coder"
    ].join(", "),

    // Open Graph for Social Sharing - VIBE CODING
    openGraph: {
        title: "Vibe Coding Colosseum | Vibe Coder Arena | Make Money Vibe Coding",
        description: "Vibe coding competitions with cash prizes! Become a vibe coder, join vibe coding battles, earn vibe coding income. The #1 vibe coding platform for vibe coders!",
        url: "https://vibearena.dev",
        siteName: "Vibe Coding Colosseum",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/logo.png",
                width: 1200,
                height: 630,
                alt: "Vibe Coding Colosseum - Vibe Coder Arena - Make Money Vibe Coding"
            }
        ]
    },

    // Twitter Card - VIBE CODING
    twitter: {
        card: "summary_large_image",
        title: "Vibe Coding Colosseum | Vibe Coder Cash Prizes",
        description: "Vibe coding battles for money! 1-hour vibe coding competitions. Become a vibe coder, win vibe coding prizes. Vibe coding side hustle!",
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
