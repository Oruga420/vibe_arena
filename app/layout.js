import "./globals.css";
import MicroBar from "../components/MicroBar";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
    title: "QuickDrop | Ultimate Vibe-coding Arena",
    description: "The Toronto vibe-coding arena. Ship a real app in 2 hours."
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=JetBrains+Mono:wght@300;500&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <MicroBar />
                <Nav />
                {children}
                <Footer />
            </body>
        </html>
    );
}
