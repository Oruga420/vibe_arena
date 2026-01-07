# 🎨 Design System & Look and Feel - Vibe Arena

Este documento define la identidad visual de **Vibe Arena**. El diseño busca transmitir una estética **"Industrial Premium"**, técnica, competitiva y moderna.

## 🌟 Filosofía de Diseño

- **Estética Gladiador/Técnica**: Uso de tipografías monoespaciadas, tramas de puntos (dot overlays) y líneas de escaneo para evocar un entorno de computación de alto rendimiento.
- **Premium & Clean**: Espacios en blanco generosos (padding), bordes sutiles y sombras suaves (`box-shadow`).
- **Interactivo**: Feedback visual en hovers, transiciones suaves y micro-animaciones (pulsos, escaneos).
- **Adaptive**: Soporte nativo para **Modo Claro** y **Modo Oscuro** mediante variables CSS.

---

## 🔤 Tipografía

Utilizamos una combinación de fuentes de Google Fonts:

| Uso                | Fuente           | Pesos              | Descripción                                                                          |
| :----------------- | :--------------- | :----------------- | :----------------------------------------------------------------------------------- |
| **Principal**      | `Inter`          | 300, 400, 600, 800 | Para títulos, cuerpo de texto y UI general. Limpia y legible.                        |
| **Código/Acentos** | `JetBrains Mono` | 300, 500           | Para etiquetas, metadatos, números y elementos técnicos. A menudo en **MAYÚSCULAS**. |

**Ejemplo de uso:**

- H1/H2: `Inter` (Extra Bold - 800)
- Etiquetas pequeñas: `JetBrains Mono` (Uppercase, tracking amplio).

---

## 🎨 Paleta de Colores

Los colores se manejan con variables CSS (`var(--nombre)`) para facilitar el cambio de tema.

### 🟢 Colores Principales

| Variable          | Hex (Light) | Hex (Dark) | Uso                                                                          |
| :---------------- | :---------- | :--------- | :--------------------------------------------------------------------------- |
| `--primary-green` | `#00c46a`   | `#00c46a`  | **Color de Marca**. Botones principales, bordes activos, barras de progreso. |
| `--deep-green`    | `#0b3d2e`   | `#e3f1ea`  | Texto principal, contrastes fuertes.                                         |
| `--accent-red`    | `#ff2d2d`   | `#ff2d2d`  | Alertas, estado "LIVE", errores, cuenta regresiva.                           |

### 🌗 Fondos y Superficies

| Variable      | Descripción                                                |
| :------------ | :--------------------------------------------------------- |
| `--white`     | Fondo base de la página (`body`).                          |
| `--off-white` | Secciones alternas o fondos sutiles.                       |
| `--surface`   | **Tarjetas y contenedores**. Debe elevarse sobre el fondo. |
| `--border`    | Líneas divisorias sutiles (aprox 8% opacidad).             |

---

## 🧩 Componentes UI Clave

### 1. Botones (`.btn`)

- **Primary** (`.btn-primary`): Fondo `--primary-green`, texto blanco. Sombra verde suave al hover. Transformación `translateY(-2px)`.
- **Ghost** (`.btn-ghost`): Fondo transparente, borde sutil. Para acciones secundarias.
- **Small** (`.btn-apply-sm`): Compacto, para acciones rápidas dentro de tarjetas.

### 2. Tarjetas (`.card`, `.drop-card`, `.entry-card`)

- **Estilo**: Fondo `--surface`, borde de 1px `--border`, sombra `--shadow`.
- **Hover**: Cambio de fondo a `--surface-alt` y elevación ligera.
- **Estructura**: Cabeceras claras, a menudo con números en _Mono_ (`.card-num`).

### 3. Overlays y Texturas

- **Dot Overlay**: Un patrón de puntos (`radial-gradient`) cubre toda la aplicación para dar textura ("ruido" ordenado).
  ```css
  background-image: radial-gradient(var(--dot-overlay) 1px, transparent 1px);
  background-size: 24px 24px;
  ```
- **Scanlines**: Líneas animadas que recorren la pantalla en secciones especiales (efecto CRT/Cyberpunk sutil).

### 4. Navegación (Glassmorphism)

La barra de navegación (`nav`) es pegajosa (`sticky`) y usa `backdrop-filter: blur(12px)` para desenfocar el contenido que pasa por debajo, manteniendo la legibilidad y un toque moderno.

---

## 📐 Layout y Estructura

- **Contenedor**: `padding: 0 4%` se usa comúnmente para mantener márgenes consistentes en pantallas grandes.
- **Grids**: Se prioriza CSS Grid (`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`) para diseños responsivos automáticos sin muchas media queries.
- **Secciones**:
  - `.section`: Fondo blanco/base.
  - `.section-muted`: Fondo off-white para separar bloques de contenido visualmente.

---

## 🌙 Implementación de Tema (Dark Mode)

El tema se controla mediante el atributo `data-theme="dark"` o `data-theme="light"` en el `root` (:root).

Si vas a agregar un nuevo componente, **siempre usa las variables CSS** (ej: `var(--surface)`), nunca hardcodees colores hexadecimales (ej: `#ffffff`), de lo contrario romperás el modo oscuro.

```css
/* ❌ NO HAGAS ESTO */
.mi-componente {
  background: #ffffff;
  color: #000000;
}

/* ✅ HAZ ESTO */
.mi-componente {
  background: var(--surface);
  color: var(--deep-green);
  border: 1px solid var(--border);
}
```
