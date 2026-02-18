# Plan de Transformación: De "Herramienta" a "Plataforma de Perfil Gladiador"

Este plan detalla los pasos para transformar la aplicación actual (una herramienta de generación de un solo uso) en una plataforma con perfiles persistentes, navegación y tablero de control.

## 📍 Objetivos

1.  **Persistencia:** Que el usuario no tenga que loguearse cada vez.
2.  **Identidad:** Crear una página de perfil (`/profile`) que sirva como "Carta de Presentación" del gladiador.
3.  **Organización:** Separar la lógica de "Ver" (Perfil) de la de "Crear" (Generador).

---

## 📅 Fases de Implementación

### Fase 1: Re-arquitectura de Rutas (The Foundation)

Actualmente todo vive en `src/app/page.tsx`. Vamos a dividir la aplicación:

- **`src/app/page.tsx` (Landing/Login):**
  - Solo mostrará la bienvenida y el formulario de ingreso de email.
  - Si detecta sesión activa, redirige automáticamente a `/profile`.
- **`src/app/profile/page.tsx` (El Santuario):**
  - Nueva página. Muestra el Avatar actual, Stats, Stack y Galería.
  - Es "Read-Only" (visualización).
- **`src/app/generate/page.tsx` (La Fragua / Laboratorio):**
  - Contendrá la lógica actual de generación de prompts e imágenes.
  - Será a donde vas cuando quieres "editar" o "crear nuevo".

### Fase 2: Autenticación y Estado (The Key)

- **Persistencia:** Implementar un hook `useGladiatorSession` que guarde el `token` y `email` en `localStorage` (o Cookies) después de la validación exitosa.
- **Protección de Rutas:** Crear un componente `AuthGuard` que envuelva `/profile` y `/generate`. Si no hay token, te manda al Landing.

### Fase 3: Construcción del Perfil Visual (The Look)

Implementar el diseño "Cyber-Roman" aprobado en el mockup:

1.  **Hero Section:** Avatar grande + Nombre de Gladiador + Coliseo (extraídos de la DB).
2.  **Stats Grid:** Paneles estilo cristal (Glassmorphism) para:
    - Arquetipo y Título.
    - Power Ups (visuales).
    - Debilidades.
    - Tech Stack (Badges).
3.  **Avatar History Gallery:**
    - Conectar con el array `generated_images` de la base de datos.
    - Mostrar grid de miniaturas de todas las generaciones anteriores.

### Fase 4: Refactorización del Generador (The Tool)

- Mover el código grande de `page.tsx` a `/generate/page.tsx`.
- Añadir botón "← Volver al Perfil" en el generador.
- Añadir botón "Ir al Laboratorio" en el Perfil.

---

## 🛠️ Pasos Técnicos para Hoy

1.  **Crear carpetas de ruta:** `src/app/profile/` y `src/app/generate/`.
2.  **Extraer componentes:** Mover piezas reutilizables (Nav, Auth logic) a componentes separados.
3.  **Implementar Session Storage:** Asegurar que el usuario sobreviva al refresh.
4.  **Montar UI de Perfil:** Maquetar la nueva vista basada en la imagen generada.

**¿Autorizas proceder con este plan de re-estructuración?**
