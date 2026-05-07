# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint
npm run test         # Run tests once (Vitest)
npm run test:watch   # Run tests in watch mode
npm run preview      # Preview production build
```

## Architecture

**Voucher Experiences** is a React 18 SPA (TypeScript + Vite) for an experience voucher e-commerce platform. Currently frontend-only — all experience data is hardcoded in `src/data/experiences.ts`.

**Key libraries:** React Router v6, TanStack Query v5, React Hook Form + Zod, Tailwind CSS, shadcn/ui (Radix UI), Framer Motion, Sonner (toasts), Vitest + React Testing Library.

### Routing

React Router with `basename="/VoucherExperiences"` (deployed as a GitHub Pages subdirectory):

| Route | Page |
|---|---|
| `/` | Home (hero, categories, featured experiences) |
| `/como-funciona` | How it works |
| `/categorias` | Category showcase |
| `/catalogo` | Full catalog with filters |
| `/experiencia/:id` | Experience detail |
| `/checkout/:id` | Multi-step checkout |
| `/parceiros` | Partner registration |
| `/minha-conta` | User account |

URL query params drive catalog filters (e.g. `?categoria=gourmet`).

### Data & Types

All experience data lives in `src/data/experiences.ts`. Key types:

- `Category` — `"aventureiro" | "gourmet" | "relaxamento" | "criativo"`
- `Experience` — `{ id, name, category, city, price, rating, reviews, validity, people, image, description, includes[] }`

No backend API exists yet. When adding API calls, use TanStack Query hooks.

### Styling

Custom Tailwind theme with HSL CSS variables defined in `src/index.css`. Brand colors: `terracotta`, `cream`, `gold`. Fonts: DM Serif Display (headings), DM Sans (body). Use `cn()` from `src/lib/utils.ts` for conditional class merging.

### Components

- `src/components/ui/` — shadcn/ui primitives (don't edit directly; regenerate via `npx shadcn-ui add`)
- `src/components/` — app-specific shared components (Navbar, Footer, ExperienceCard, NavLink)
- `src/pages/` — one file per route

### Path Aliases

`@/*` resolves to `./src/*` in both TypeScript and Vite.

### TypeScript Config

Loose by default: `noImplicitAny`, `strictNullChecks`, and `noUnusedLocals` are all **off**.

### Deployment

GitHub Actions deploys to GitHub Pages at `/VoucherExperiences/`. The `vite.config.ts` base path must stay as `/VoucherExperiences/`.
