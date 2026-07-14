# Pulse — Email Marketing SaaS Dashboard

A modern, production-quality email marketing dashboard UI built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Lucide icons. All data is mocked — no backend required.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — you'll be redirected to `/login`.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with a custom purple primary theme
- **shadcn/ui**-style components (Radix primitives + CVA)
- **Lucide React** icons
- **Recharts** for analytics charts

## Structure

```
app/
  login/page.tsx              Login page
  (dashboard)/
    layout.tsx                 Sidebar + topbar shell
    dashboard/page.tsx         Overview
    contacts/page.tsx          Contacts table + Add Contact modal
    audiences/page.tsx         Audience cards
    campaigns/page.tsx         Campaign list
    campaigns/new/page.tsx     Create campaign flow
    campaigns/[id]/analytics/page.tsx
    analytics/page.tsx
    settings/page.tsx
components/
  ui/                          Reusable shadcn primitives
  layout/                      Sidebar, topbar, mobile nav
  shared/                      Page-level reusable pieces (stat cards, tables…)
lib/
  mock-data.ts                 Dummy data used across pages
  utils.ts                     cn() helper
types/
  index.ts                     Shared TypeScript types
```

## Design tokens

- Background: white, with subtle gray (`gray-200`) borders
- Cards: `rounded-xl` / `rounded-2xl`, soft shadows (`shadow-card`, `shadow-elevated`)
- Primary color: purple (`hsl(270 91% 58%)`), full 50–900 scale in `tailwind.config.ts`
- Font: Inter
