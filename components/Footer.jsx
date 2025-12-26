export default function Footer() {
    return (
        <footer>
            <div className="logo">
                <div className="dot"></div>
                QUICKDROP
            </div>
            <div className="mono" style={{ opacity: 0.5 }}>
                &copy; 2024 TORONTO TECH MINIMAL
            </div>
            <div className="nav-links">
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                    Twitter/X
                </a>
                <a href="https://discord.com" target="_blank" rel="noreferrer">
                    Discord
                </a>
            </div>
        </footer>
    );
}
