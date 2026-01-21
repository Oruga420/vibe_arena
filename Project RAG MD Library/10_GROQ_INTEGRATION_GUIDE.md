# Guía de Integración Groq - Vibe Arena

Esta guía documenta cómo conectarse a la API de Groq en el proyecto Vibe Arena y proporciona un ejemplo específico para generar prompts de imagen para gladiadores.

## 1. Setup Básico

### Instalación

Si el proyecto no tiene el SDK de Groq, instalarlo:

```bash
npm install groq-sdk
```

### Variables de Entorno

Asegurar que la key de Groq esté configurada en el archivo `.env` o `.env.local`:

```env
GROQ_API_KEY=gsk_...
```

## 2. Inicialización del Cliente

El cliente se inicializa importando el SDK y pasando la API Key.

```javascript
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
```

**Nota:** Esto debe correrse del lado del servidor (API Routes o Server Actions) para no exponer la API Key en el cliente.

## 3. Implementación: Generador de Prompt para Gladiador

El objetivo es crear una función que reciba datos de un usuario (Gladiador) y use Groq para generar un prompt enriquecido que luego se pueda pasar a una IA de generación de imágenes (como Flux, Midjourney, o DALL-E).

### Ejemplo de Código (API Route / Server Function)

```javascript
import Groq from "groq-sdk";

export async function generateGladiatorPrompt(userData) {
  // Validación básica
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  // Contexto del gladiador
  const { name, colosseumName, stack } = userData;

  // Prompt del sistema para definir el estilo Vibe Arena
  const systemPrompt = `
    Eres un experto en ingeniería de prompts para arte digital estilo Cyberpunk/Synthwave.
    Tu objetivo es crear UN SOLO prompt de imagen detallado y vibrante basado en los datos de un programador/gladiador.
    
    Estilo visual requerido:
    - Vibe Arena aesthetic: Neon, Dark, Futurista, Glitch, High Contrast.
    - Personaje: Un gladiador digital, hacker warrior, coding merc.
    - Elementos: Teclados holográficos, código flotante, armadura tech, luces LED.
    
    Reglas:
    - Salida: ÚNICAMENTE el prompt en inglés. Sin introducciones ni explicaciones.
    - Longitud: Detallado pero conciso (aprox 40-60 palabras).
  `;

  // Input del usuario
  const userMessage = `
    Genera un prompt para:
    Nombre Real: ${name}
    Nombre de Batalla: ${colosseumName}
    Stack Tecnológico: ${stack} (refleja este stack en el color/estilo de la armadura o magia)
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      // Usamos llama-3.3-70b por su excelente capacidad de seguimiento de instrucciones y creatividad
      model: "llama-3.3-70b-versatile",
      temperature: 0.7, // Creatividad balanceada
    });

    const items = completion.choices[0]?.message?.content;
    return (
      items ||
      "Cyberpunk coding gladiator, neon lights, dark background, digital art"
    ); // Fallback
  } catch (error) {
    console.error("Error generando prompt con Groq:", error);
    return null;
  }
}
```

### Ejemplo de Uso en un Botón (Frontend -> Backend)

Si esto se conecta a un botón en el frontend:

1.  **Frontend (`GladiatorCard.jsx`):**

    ```javascript
    const handleGenerateImage = async () => {
      const response = await fetch("/api/generate-gladiator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Chuck",
          colosseumName: "CodeBreaker",
          stack: "Fullstack JS",
        }),
      });
      const data = await response.json();
      console.log("Image Prompt:", data.prompt);
      // Aquí llamarías a tu API de imagen con data.prompt
    };
    ```

2.  **Backend (`app/api/generate-gladiator/route.js`):**

    ```javascript
    import { NextResponse } from "next/server";
    import { generateGladiatorPrompt } from "@/lib/groq-generator"; // asumiendo que guardaste la función ahí

    export async function POST(request) {
      const body = await request.json();
      const prompt = await generateGladiatorPrompt(body);
      return NextResponse.json({ prompt });
    }
    ```

## 4. Modelos Recomendados

Para Vibe Arena, recomendamos usar los siguientes modelos en Groq por su velocidad y calidad:

- **`llama-3.3-70b-versatile`**: (Recomendado) Mejor balance de inteligencia y creatividad. Ideal para generación de texto creativo y prompts complejos.
- **`llama-3.1-8b-instant`**: Extremadamente rápido. Útil si la latencia es crítica, pero con menor matiz creativo.

---

**Vibe Arena Dev Team**
