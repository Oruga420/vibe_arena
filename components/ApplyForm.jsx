"use client";

import { useState } from "react";

export default function ApplyForm() {
    const [status, setStatus] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        setStatus({
            type: "success",
            message: "Listo. Recibimos tu aplicacion y volvemos en 48hs."
        });
        event.currentTarget.reset();
    };

    return (
        <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="name">Nombre completo</label>
                <input id="name" name="name" type="text" placeholder="Tu nombre" required />
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="field">
                <label htmlFor="city">Ciudad</label>
                <input id="city" name="city" type="text" placeholder="Toronto, Buenos Aires, etc." required />
            </div>
            <div className="field">
                <label htmlFor="stack">Stack principal</label>
                <select id="stack" name="stack" required>
                    <option value="">Selecciona uno</option>
                    <option value="fullstack">Fullstack JS/TS</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                    <option value="data">Data/ML</option>
                    <option value="other">Otro</option>
                </select>
            </div>
            <div className="field">
                <label htmlFor="portfolio">Portfolio o repo</label>
                <input id="portfolio" name="portfolio" type="url" placeholder="https://github.com/tuuser" required />
            </div>
            <div className="field">
                <label htmlFor="why">Por que queres entrar</label>
                <textarea id="why" name="why" placeholder="Contanos en pocas lineas..." required></textarea>
            </div>
            <div>
                <button className="btn-primary" type="submit">Enviar aplicacion</button>
                {status ? (
                    <div className={`form-status ${status.type}`}>{status.message}</div>
                ) : (
                    <div className="form-status">Te respondemos dentro de las proximas 48 horas.</div>
                )}
            </div>
        </form>
    );
}
