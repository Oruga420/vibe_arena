# 📧 Guía de Implementación de Emails (Vibe Arena System)

Esta guía detalla cómo replicar el sistema de envío de correos transaccionales con contenido dinámico (AI) utilizando **Resend** y **Groq**. Diseñada para ser implementada en otros sistemas de la misma empresa utilizando las credenciales existentes.

---

## 1. Prerrequisitos y Accesos

Para enviar correos desde `arena@vibecodingcolosseum.com` necesitas:

1.  **Cuenta de Resend**:
    - Dominio verificado: `vibecodingcolosseum.com` (Ya configurado con MX, SPF, DKIM).
    - **API Key**: Generar una nueva en [Resend Dashboard](https://resend.com/api-keys) o reutilizar `re_...` existente.
2.  **Cuenta de Groq (Para contenido IA)**:
    - **API Key**: Generar en [Groq Console](https://console.groq.com/keys).

3.  **Dependencias del Proyecto**:
    Ejecuta en tu terminal:
    ```bash
    npm install resend groq-sdk
    ```

---

## 2. Variables de Entorno

Agrega estas variables a tu archivo `.env` o `.env.local`:

```bash
# Resend (Envío de emails)
RESEND_API_KEY="re_123456..."

# Groq (Generación de contenido - Opcional si usas templates estáticos)
GROQ_API_KEY="gsk_..."
```

---

## 3. Implementación Paso a Paso

### A. Módulo de Envío Base (Resend)

Crea un archivo utilitario (ej: `lib/email-sender.js`) para manejar la conexión con Resend.

```javascript
import { Resend } from "resend";

// Inicializar cliente
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Función genérica para enviar emails
 * @param {string} to - Email destino
 * @param {string} subject - Asunto
 * @param {string} htmlContent - Cuerpo en HTML
 */
export async function sendEmail(to, subject, htmlContent) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY faltante. Email no enviado.");
    return { success: false, error: "Configuración faltante" };
  }

  try {
    const data = await resend.emails.send({
      from: "Vibe Coding Colosseum <arena@vibecodingcolosseum.com>", // USAR ESTE REMITENTE
      to: to,
      subject: subject,
      html: htmlContent,
    });

    return { success: true, data };
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    return { success: false, error };
  }
}
```

### B. Generador de Contenido con IA (Groq)

Si quieres que los emails tengan el estilo "Gladiador/Coliseo", usa este módulo. Crea `lib/email-generator.js`.

**Puntos Clave del Prompt:**

1.  **Rol**: "Escritor Oficial del Coliseo".
2.  **Tono**: Épico, directo, sin marketing.
3.  **Idioma**: Dinámico (se pasa como instrucción).

```javascript
import Groq from "groq-sdk";

export async function generateAIContent(userData, language = "es") {
  if (!process.env.GROQ_API_KEY) {
    // Retornar fallback estático si no hay API Key
    return {
      subject: "Bienvenido al Coliseo",
      body: "<p>Registro confirmado.</p>",
    };
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  // Instrucción de idioma
  const langInstruction =
    language === "en"
      ? "Write in English (natural, not formal)."
      : "Escribe en Español natural (LatAm).";

  const prompt = `
    Actúa como el "Escritor Oficial del Coliseo".
    Objetivo: Escribir un email de confirmación para: ${userData.name}.
    Tono: Épico, oscuro-divertido. Sin saludos corporativos.
    
    IDIOMA: ${langInstruction}

    SALIDA OBLIGATORIA:
    SUBJECT: [Asunto cortante y épico]
    ---
    [Cuerpo HTML simple, sin markdown]
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const response = completion.choices[0]?.message?.content || "";
    const [subject, body] = response
      .split("---")
      .map((s) => s.trim().replace("SUBJECT:", ""));

    return { subject, body };
  } catch (error) {
    console.error("Error Groq:", error);
    return { subject: "Registro Recibido", body: "<p>Bienvenido.</p>" };
  }
}
```

### C. Integración en tu Endpoint (API Route)

En tu controlador de registro (ej: `app/api/register/route.js`):

```javascript
import { sendEmail } from "@/lib/email-sender";
import { generateAIContent } from "@/lib/email-generator";

export async function POST(request) {
  const body = await request.json();

  // 1. Guardar usuario en DB...
  // await saveUser(body);

  // 2. Preparar envío de email (Non-blocking)
  // Detectar idioma del browser o default a 'es'
  const userLang = body.language || "es";

  // Ejecutar en segundo plano (no usar await si quieres respuesta rápida)
  (async () => {
    // Generar contenido
    const { subject, body: emailBody } = await generateAIContent(
      { name: body.name },
      userLang,
    );

    // Enviar
    await sendEmail(body.email, subject, emailBody);
  })();

  return Response.json({ success: true });
}
```

---

## 4. Mejores Prácticas Implementadas

1.  **Detección de Idioma**: Desde el frontend capturamos `navigator.language` y lo pasamos al backend. El prompt de Groq se adapta.
2.  **Manejo de Errores**: Si Groq falla, hay un contenido fallback (estático). Si Resend falla, no rompe el registro del usuario (try/catch silencioso o logging).
3.  **Seguridad**:
    - No hardcodear Keys en el código.
    - Validar email antes de enviar (`/^[a-zA-Z0-9]+@.../`).
4.  **Anti-Spam (Entregabilidad)**:
    - Usar siempre `arena@vibecodingcolosseum.com` ya que tiene reputación configurada.
    - No usar palabras como "Oferta", "Gratis", "$$$" en el asunto generado por IA.

---

## 5. Pruebas

Para verificar que funciona sin afectar a usuarios reales:

1.  Usa correos de prueba (ej: `tu.nombre+test@gmail.com`).
2.  Verifica que llegue a la bandeja de entrada (no Spam).
3.  Revisa que el "From" sea correcto: `Vibe Coding Colosseum <arena@vibecodingcolosseum.com>`.

---

_Generado por Antigravity - Last updated: January 20, 2026_
