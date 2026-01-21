# 🎨 UI/UX Standard Operating Procedures

## Design System

### Color Palette

| Token          | Light Mode | Dark Mode | Usage            |
| -------------- | ---------- | --------- | ---------------- |
| --bg-primary   | #ffffff    | #0a0a0a   | Main background  |
| --bg-secondary | #f5f5f5    | #141414   | Card backgrounds |
| --text-primary | #0a0a0a    | #ffffff   | Headers, body    |
| --accent       | #22c55e    | #22c55e   | CTAs, highlights |
| --accent-hover | #16a34a    | #16a34a   | Hover states     |
| --error        | #ef4444    | #ef4444   | Error messages   |
| --success      | #22c55e    | #22c55e   | Success states   |

### Typography

- **Font Family**: System fonts (Apple SF, Roboto, etc.)
- **Headers**: Bold, larger sizes
- **Body**: Regular weight
- **Code/Mono**: Monospace for technical content

### Spacing Scale

```css
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 2rem;
--space-xl: 4rem;
```

---

## Component Standards

### Forms

#### ApplyForm (Full Registration)

```
Structure:
├─ Personal Info Section
│  ├─ Name (required)
│  ├─ Colosseum Name (optional)
│  └─ Email (required, alphanumeric@domain)
├─ Location Section
│  └─ Timezone (dropdown, required)
├─ Technical Section
│  ├─ Stack (dropdown, required)
│  └─ GitHub URL (required, validated)
├─ Social Section (optional)
│  ├─ X/Twitter URL
│  └─ LinkedIn URL
├─ Preferences Section
│  ├─ Live Demo Interest (dropdown)
│  └─ Fairplay Checkbox (required)
└─ Submit Button
   └─ Status Message (success/error)
```

**Validation Rules:**

- Email: `/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/`
- GitHub: Must start with `https://github.com/`
- All URLs: Must be valid URLs

**Feedback:**

- Loading state during submission
- Success message with green styling
- Error message with red styling
- Field-level validation messages

#### WaitlistModal (Simple Signup)

```
Structure:
├─ Name Input (required)
├─ Email Input (required)
├─ Role Dropdown (arena/spectator)
└─ Submit Button
```

**Modal Behavior:**

- Opens via CTA button
- Closes on success, outside click, or X button
- Prevents body scroll when open

---

## Navigation

### Desktop Nav

```
[Logo] [Home] [The Protocol] [Rules] [Dex] [ES|EN] [Apply]
```

### Mobile Nav

```
[Logo] [Hamburger Menu]
├─ Home
├─ The Protocol
├─ Rules
├─ Dex
├─ Language Toggle
└─ Apply (CTA)
```

---

## Responsive Breakpoints

| Breakpoint | Width          | Target   |
| ---------- | -------------- | -------- |
| Mobile     | < 640px        | Phones   |
| Tablet     | 640px - 1024px | Tablets  |
| Desktop    | > 1024px       | Desktops |

### Mobile-First Approach

1. Design for mobile first
2. Add complexity for larger screens
3. Touch-friendly tap targets (44x44px min)

---

## Interaction Patterns

### Button States

1. **Default**: Base styling
2. **Hover**: Lighter/darker shade
3. **Active**: Pressed effect
4. **Disabled**: Muted, no pointer events
5. **Loading**: Spinner or "..." text

### Form States

1. **Empty**: Placeholder visible
2. **Focused**: Border highlight
3. **Filled**: Value visible
4. **Error**: Red border, error message below
5. **Success**: Green indicator (optional)

### Loading States

- Button: Show "Enviando..." or spinner
- Page: Show skeleton or loading indicator
- Data fetch: Show placeholder content

---

## Language Handling

### Supported Languages

- **es**: Spanish (LatAm) - Default
- **en**: English

### Implementation

1. `LanguageProvider` wraps entire app
2. `useLanguage()` hook provides `t()` function
3. All UI text uses `t('path.to.string')`
4. User preference stored in `localStorage.lang`

### Translation Keys Structure

```javascript
{
  nav: { home, faq, apply, ... },
  home: { hero: { title, body, ... }, ... },
  apply: { form: { fields: { ... }, ... } },
  // ... etc
}
```

---

## Accessibility Standards

1. **Semantic HTML**: Use correct elements (button, nav, main)
2. **ARIA Labels**: For interactive elements
3. **Keyboard Navigation**: Tab order, Enter/Space activation
4. **Color Contrast**: WCAG AA minimum (4.5:1 for text)
5. **Focus Indicators**: Visible focus rings
6. **Alt Text**: For all images

---

## Error Handling UX

### Form Errors

- Display inline below field
- Use red color (#ef4444)
- Clear on user interaction
- Scroll to first error

### API Errors

- Show user-friendly message
- Log technical details to console
- Provide retry option if applicable

### Network Errors

- "Error de red. Por favor intenta de nuevo."
- Don't expose technical details to user

---

_Last updated: January 20, 2026_
