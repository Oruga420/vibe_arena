# responsive guide.md

## Objetivo
- Asegurar que el sitio se vea bien en desktop, tablet y mobile.
- Mantener legibilidad, jerarquia visual y performance.

## Breakpoints base (actuales)
- 1024px: ajustar grillas grandes a 1 columna.
- 860px: navbar pasa a menu colapsado.
- 640px: reducir padding y apilar footer.

## Layout
- Usa CSS Grid o Flex para columnas, evita posiciones absolutas para layout principal.
- Mantene un max-width en bloques de texto largos.
- Aplica `gap` en vez de margin manual cuando sea posible.

## Tipografia
- Usa `clamp()` para titulos.
- Mantene line-height comodo en mobile (1.4 - 1.6).
- Evita textos de mas de 70-80 caracteres por linea.

## Espaciado
- Usa variables para padding y reduce en mobile:
  - Desktop: `padding: 120px 4%`
  - Mobile: `padding: 80px 6%`

## Imagenes y medios
- Siempre `max-width: 100%` y `height: auto`.
- Evita fondos pesados; usa gradientes o SVG livianos.
- Para canvas/WebGL, limita el size y opacidad en mobile.

## Componentes clave
- Navbar: colapsa en menu; evita overflow horizontal.
- Cards: usa `minmax(240px, 1fr)` y baja a 1 columna.
- Forms: inputs al 100% y labels encima, sin columnas en mobile.

## Accesibilidad
- Respeta `prefers-reduced-motion`.
- Mantene contraste alto en dark mode.
- Usa tamaños de tap target >= 44px en mobile.

## Testing rapido
- DevTools: 1440px, 1024px, 768px, 640px, 390px.
- Proba landscape en mobile.
- Verifica que no haya scroll horizontal.

## Checklist
- No hay overflow horizontal.
- CTA principal visible sin scroll en mobile.
- Forms y FAQs legibles y clickeables.
