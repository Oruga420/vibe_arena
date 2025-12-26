import Link from "next/link";

export default function MicroBar() {
    return (
        <div className="micro-bar">
            <span className="badge-red">LIVE</span>
            <span className="mono">
                Season 0 en construccion - Primer drop Enero-Febrero -{" "}
                <Link href="/roadmap">Ver el plan</Link>
            </span>
        </div>
    );
}
