import "./globals.css";
import MicroBar from "../components/MicroBar";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { LanguageProvider } from "../components/LanguageProvider";
import BottomToggles from "../components/BottomToggles";

export const metadata = {
    title: "Vibe Coding Colosseum | Any role. Same shot.",
    description: "Ship a real app in 2 hours. Competetive platform for gladiators."
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@300;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <LanguageProvider>
                    <MicroBar />
                    <Nav />
                    {children}
                    <BottomToggles />
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
