# Enterprise Frontend Scaffold

This project bootstraps the enterprise management frontend using Vue 3, Vite, Vue Router, Vue I18n, and Pinia. It is configured for **rem-first, responsive development** so that layouts scale gracefully across different screen sizes.

## Getting Started

```bash
npm install
npm run dev
```

## Responsive Rules

- Design with rem units: all spacing, sizing, and typography should be expressed in rem. A PostCSS rule automatically converts px from the design draft to rem based on a 16px root size.
- Dynamic root font size: the `setupRem` utility adjusts the `<html>` font size according to viewport width (design width 1440px, clamped between 12px and 22px).
- Mobile-first enhancements: create layouts that work on narrow screens first, then add breakpoint upgrades using rem-based media queries.
- Utility classes: use the provided spacing/layout utilities in `src/styles/utilities.css` for consistent spacing and button styles.

## Project Structure

- `src/router` – Application level routing with lazy-loaded views.
- `src/i18n` & `src/locales` – Locale configuration and language packs.
- `src/stores` – Pinia stores (initial `app` store for locale).
- `src/views` – Page-level components.
- `src/styles` – Global reset, variables, and layout utilities enforcing rem usage.

## Next Steps

- Extend locale files when adding new pages or UI copy.
- Add additional responsive breakpoints as required by the design system.
- Introduce UI component libraries or custom design system components that follow the rem-first guideline.
