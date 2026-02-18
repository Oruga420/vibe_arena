# 🦄 Modo Unicornio - Documentación

## ¿Qué es el Modo Unicornio?

El **Modo Unicornio** es el tercer tema visual de Vibe Arena con efectos festivos: gradientes arcoíris, partículas brillantes y emojis flotantes.

## Cómo Activar

Click en el botón de tema (esquina superior derecha) y cicla: **Dark** → **Light** → **Party!** 🦄

## Archivos

| Archivo | Propósito |
|---------|-----------|
| `app/context/ThemeContext.tsx` | Maneja estado del tema |
| `app/components/ThemeToggle.tsx` | Botón toggle |
| `app/components/UnicornBackground.tsx` | Efectos visuales |
| `app/globals.css` | Variables CSS unicorn |

## Variables CSS

```css
[data-theme="unicorn"] {
  --primary-green: #7873f5;
  --primary-green-hover: #ff6ec4;
  --white: #1a1030;
  --surface: rgba(40, 30, 80, 0.9);
  --text-primary: #ffffff;
}
```
