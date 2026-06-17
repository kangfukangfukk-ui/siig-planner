# SIIG Personal Financial Planning App Architecture

## Overview
This document defines the architecture principles and conventions used for the SIIG Thai Personal Financial Planning Web App built with Next.js 16 App Router, TypeScript, Prisma, Tailwind CSS, and shadcn/ui.

## Folder Structure
- `app/`
  - `layout.tsx` - global layout and providers
  - `page.tsx` - landing or dashboard entry
  - `dashboard/` - core authenticated app pages
  - `settings/` - user preferences and profile pages
  - `transactions/` - transaction management UX
- `components/`
  - shared presentational and composable UI components
- `lib/`
  - utility functions, feature logic, and shared helpers
- `prisma/`
  - `schema.prisma` - database schema definitions
- `styles/` or CSS via `app/globals.css`
  - Tailwind configuration and theme utilities
- `public/`
  - static assets and brand resources
- `tests/` (optional)
  - unit and integration test coverage

## Naming Conventions
- Files and folders: `kebab-case` for routes and assets.
- Components: `PascalCase` for component names and exported React functions.
- Hooks: `useCamelCase` for custom hooks.
- Utilities: `camelCase` for functions and helpers.
- Types/Interfaces: `PascalCase` with `Props` suffix for component props.
- Prisma models: `PascalCase` with singular nouns.
- CSS classes: use Tailwind utility-first classes and avoid custom class names unless necessary.

## Coding Standards
- TypeScript strict mode enabled.
- Prefer explicit return types for exported functions.
- Keep functions small and single-purpose.
- Use React Server Components for page-level logic and async data fetching.
- Use client components only where state, effects, or browser APIs are required.
- Layouts and metadata should remain lightweight and declarative.
- Reuse shadcn/ui components and Tailwind utility classes consistently.
- Keep Prisma queries executed in server-side context; avoid fetching sensitive data in client bundles.
- Use `zod` or similar validation for form payloads and API route validation.
- Document service boundaries and business rules in markdown when needed.
- Use `eslint` and `prettier` formatting rules consistently.

## Mobile-First Principles
- Design responsive layouts starting with narrow viewport widths.
- Use Tailwind responsive utilities: `sm:`, `md:`, `lg:`, `xl:`.
- Prefer vertical stacking, collapsible cards, and full-width buttons on mobile.
- Optimize form fields and touch targets for thumb reach.
- Maintain accessible color contrast and readable font sizes.
- Keep navigation minimal on mobile; use bottom or top app bars for primary actions.
- Test breakpoints on real mobile device previews and simulate Thai locale currency formatting.
- Use progressive enhancement: critical content loads first, then optional dashboard metrics and charts.
