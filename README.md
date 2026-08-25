# BonnieTest
Bonnie Dashboard

A small React + TypeScript dashboard, built with Vite and styled with Tailwind CSS. It renders a paginated product table backed by a live API call.

## What it does

The app fetches products from the public [DummyJSON](https://dummyjson.com/docs/products) API and displays them in a table with server-driven pagination:

- Table columns: ID, Title, Category, Price, Rating, Stock
- "Rows per page" selector (10 / 20 / 50) and Prev/Next controls
- A loading state that dims the table and shows a spinner overlay while a page is being fetched, without shifting the layout

## Getting started

**Prerequisites:** Node.js 20.19+ or 22.12+ (Vite 7 requirement), and npm.

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

Other scripts:

```bash
npm run build    # type-check (tsc) and build for production
npm run preview  # preview the production build locally
npm run lint     # ESLint (TypeScript + React Hooks rules)
```

## Project structure

```
src/
  App.tsx                     # Entry component: renders the Dashboard page
  main.tsx                    # React entry point
  styles.css                  # Tailwind import, design tokens, global styles/fonts

  Page/
    Dashboard/index.tsx       # Owns page/perPage/data/loading/error state, fetches
                               # products (cancelling stale requests on page change),
                               # and wires Table + Pagination + Loading together

  api/
    Product/index.tsx         # getProducts(limit, skip, signal?): fetch wrapper for
                               # the DummyJSON products endpoint, plus the Product type

  Components/
    Table/index.tsx           # Generic, presentational table (columns + data + getRowKey,
                               # optional emptyMessage). No internal state; sorting/
                               # filtering/pagination logic lives outside it.
    Pagination/index.tsx      # Presentational pagination bar (rows-per-page select,
                               # page label, Prev/Next). Fully controlled via props.
    Loading/index.tsx         # Small spinner/pill overlay, reused wherever a loading
                               # state needs to be shown without affecting layout.
```

### Design principle

The `Table`, `Pagination`, and `Loading` components are intentionally "dumb": they only render UI based on the props they're given and call back via `onXChange` handlers. All state (current page, rows per page, fetched data, loading flag) and the actual data fetching live in `Page/Dashboard`. This keeps the components reusable for any future dataset without rewriting them, and `App.tsx` is left free to grow into a router/layout shell as more pages are added.

## Styling

Tailwind CSS v4 (via `@tailwindcss/vite`, no config file needed) with utility classes written inline on elements.

### Design tokens

`styles.css` defines a small color palette as CSS custom properties inside a Tailwind `@theme` block:

```css
@theme {
  --color-ink: #17202a;
  --color-body: #3a444c;
  --color-label: #65727c;
  --color-label-strong: #52606a;
  --color-muted: #7f8b93;
  --color-surface: #f5f7f9;
  --color-surface-muted: #f7f9fa;
  --color-border: #e2e8ec;
  --color-border-light: #e1e7ea;
  --color-border-subtle: #edf0f2;
  --color-accent: #e36d4d;

  --text-2xs: 11px;
  --text-xs: 12px;
  --text-sm: 13px;
}
```

Any `--color-<name>` token defined in `@theme` is automatically turned into matching utility classes by Tailwind: `bg-<name>`, `text-<name>`, `border-<name>`, etc. So instead of scattering raw hex values across components (`text-[#7f8b93]`, `bg-[#f5f7f9]`, `border-[#e2e8ec]`), every component uses the semantic name (`text-muted`, `bg-surface`, `border-border`). This keeps the palette defined in exactly one place, so changing `--color-accent` updates every `border-t-accent` / `bg-accent` usage app-wide, and each class reads as "what role does this color play" rather than "what hex is this."

`--text-<name>` tokens work the same way, but generate the font-size scale (`text-2xs`, `text-xs`, `text-sm`) instead of colors; Tailwind tells the two apart by which theme namespace the key lives in, not by the class prefix. The UI only ever used three sizes (11 / 12 / 13px), so instead of leaving them as arbitrary values (`text-[13px]`) scattered across three components, they're named once by role and reused. It's the same argument as the color tokens: change `--text-sm` in one place and every table cell, button, and label using it updates together, and the class name says "this is the primary body size" rather than "this happens to be 13 pixels."

| Token | Value | Used for |
|---|---|---|
| `ink` | `#17202a` | primary text |
| `body` | `#3a444c` | table cell text |
| `label` | `#65727c` | secondary text, buttons |
| `label-strong` | `#52606a` | select value, Prev/Next button text |
| `muted` | `#7f8b93` | captions, column headers |
| `surface` | `#f5f7f9` | page background |
| `surface-muted` | `#f7f9fa` | table header row, row hover |
| `border` | `#e2e8ec` | card / table border |
| `border-light` | `#e1e7ea` | input / button border |
| `border-subtle` | `#edf0f2` | row divider |
| `accent` | `#e36d4d` | brand accent (loading spinner) |
| `2xs` (font size) | `11px` | uppercase captions, column headers |
| `xs` (font size) | `12px` | secondary text, buttons, pagination |
| `sm` (font size) | `13px` | primary table/body text |

The same `@theme` block also defines `--font-sans` (DM Sans, body text) and `--font-display` (Space Grotesk, headings), loaded from Google Fonts at the top of the file.

## Trade-offs & possible improvements

This is a small sample project, so a few things were deliberately kept simple rather than perfect.

- **Data fetching** uses plain `useEffect` + `fetch` instead of [TanStack Query](https://tanstack.com/query). Errors and request races (clicking Next twice fast) are handled by hand; things like caching and retries aren't. TanStack Query would replace the fetching logic with one `useQuery` call and get all of that for free, worth it if the app grows past one page.
- **Design system** is intentionally small: colors and font sizes are named by role in `styles.css`'s `@theme` block instead of scattered as raw hex/px values. Could extend it with a spacing scale and shared radii too, kept it simple since there's only one theme and a handful of components.
- **Table and Pagination are separate, presentational components** on purpose, so `Dashboard` stays readable and both components can be reused on any future page/dataset without changes.
- **No automated tests.** Everything was verified manually while building. `Table` and `Pagination` are pure and prop-driven, so they'd be cheap to add a few Vitest + React Testing Library tests for later.
- **No dedicated accessibility pass.** Semantic HTML (`<table>`, `<button disabled>`) already covers a lot for free. The "Rows per page" select isn't properly labeled for screen readers, and loading/error changes aren't announced via `aria-live`; both would be small, targeted fixes rather than a full audit.
