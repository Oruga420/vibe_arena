# 🎨 Guía Look & Feel - Vibe Arena (look-feel.md)

Esta guía complementa al sistema de diseño, enfocándose específicamente en los elementos visuales que definen la "personalidad" de la aplicación.

## 🖼️ Logotipo e Identidad

El logotipo es el ancla visual de la marca.

- **Archivo:** `/logo.png`
- ** Ubicación:** Barra de navegación (izquierda).
- **Estilo:** Debe verse bien tanto en fondo claro como oscuro.
- **Dimensiones Uso:** Altura aprox `96px` en Desktop.

## 🌈 Colores y Gradientes

Nuestra paleta combina la seriedad del "Deep Green" con la energía del "Electric Green".

### Primarios

- 🟢 **Electric Green**: `#00c46a` (Botones, acentos, éxito)
- 🌑 **Deep Green**: `#0b3d2e` (Texto principal en Light Mode) / `#e3f1ea` (Texto en Dark Mode)
- 🔴 **Alert Red**: `#ff2d2d` (Status LIVE, errores, deadlines, badges)

### Gradientes

- **Hero Gradient:** Un degradado sutil lineal de 120 grados que da profundidad al fondo sin saturar.
  - _Light_: `#ffffff` a `#f4fff9`
  - _Dark_: `#0b1210` a `#12201b`

## 🔤 Tipografía

La combinación de fuentes es clave para el look "Industrial/Técnico".

1.  **INTER (Sans-Serif)**

    - _Uso:_ Títulos, cuerpo, párrafos largos.
    - _Weights:_ 300 (Light), 400 (Regular), 600 (SemiBold), 800 (ExtraBold).
    - _Google Font:_ `https://fonts.google.com/specimen/Inter`

2.  **JETBRAINS MONO (Monospace)**
    - _Uso:_ Datos técnicos, números, etiquetas (`.badge`), contadores regresivos.
    - _Estilo:_ A menudo en MAYÚSCULAS (`text-transform: uppercase`) con espaciado amplio (`letter-spacing: 0.1em`).
    - _Weights:_ 300, 500.
    - _Google Font:_ `https://fonts.google.com/specimen/JetBrains+Mono`

## ✨ Elementos Visuales Distintivos

### 1. Dot Overlay (Malla de Puntos)

Una textura de puntos cubre toda la aplicación, dando una sensación de "papel técnico" o pantalla retro.

- _CSS:_ `background-image: radial-gradient(...)`
- _Opacidad:_ Muy baja (3-4%) para no interferir con la lectura.

### 2. Glassmorphism (Barra de Navegación)

La barra superior no es sólida, es semi-transparente con desenfoque (`blur`).

- _Efecto:_ `backdrop-filter: blur(12px)`
- _Color:_ Base blanca o negra con 85% opacidad.

### 3. Animaciones "Vivas"

La interfaz no es estática.

- **Pulse Red:** Usado en badges "LIVE" o "CLOSED" para llamar la atención.
- **Scanlines:** Líneas que recorren el fondo (WebGL) simulando una pantalla CRT.
- **Bouncing Arrow:** Flecha en la página de aplicación que indica scroll.

## 📱 URL y Recursos

- **Logo**: `/public/logo.png` (Accesible como `/logo.png`)
- **Favicon**: `/public/favicon.png`
- **Fuentes**: Cargadas desde Google Fonts en `app/layout.js`.

---

_Para detalles técnicos de implementación CSS, ver `docs/DESIGN_SYSTEM.md`._
