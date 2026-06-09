# Simply Kosher Wireless — Claude Instructions

## Git Workflow (REQUIRED)

**Never push directly to `main`.** Every change, no matter how small, must go through a feature branch and pull request.

Before starting any code change:
1. Check the current branch: `git branch --show-current`
2. If on `main`, create and switch to a new branch:
   ```
   git checkout -b <descriptive-branch-name>
   ```
3. Make all changes on that branch
4. Commit and push the branch: `git push -u origin <branch-name>`
5. Open a pull request — never push directly to `main`

### Branch Naming Convention
- New feature: `feat/<short-description>` (e.g., `feat/add-coverage-map`)
- Bug fix: `fix/<short-description>` (e.g., `fix/navbar-scroll-glitch`)
- Style/UI: `style/<short-description>` (e.g., `style/update-hero-spacing`)
- Content: `content/<short-description>` (e.g., `content/update-plan-prices`)
- Refactor: `refactor/<short-description>`

---

## Design System

Before adding any new UI, read **[STYLEGUIDE.md](STYLEGUIDE.md)** in this repository. All new components must follow the tokens, patterns, and conventions defined there:

- Colors: use only `primary-navy`, `brand-teal`, `brand-turquoise`, `muted-bg`, and the slate scale
- Fonts: `font-display` (Outfit) for headings, `font-sans` (Inter) for body
- Shadows: use `.premium-shadow` utility class for cards
- Animations: entrance with `opacity: 0, y: 20` → `opacity: 1, y: 0`, duration 0.5s
- Containers: `max-w-7xl mx-auto px-6`
- Border radius: follow the radius scale in STYLEGUIDE.md

---

## Project Overview

**Simply Kosher Wireless** — A kosher-community MVNO built on React 19 + Vite 6 + Tailwind CSS v4.

- Entry point: `src/App.tsx`
- Components: `src/components/`
- Global styles & design tokens: `src/index.css`
- Dev server: `npm run dev` (port 3001 to avoid conflicts with other local projects)
- Build: `npm run build`
