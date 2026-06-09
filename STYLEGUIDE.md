# Simply Kosher Wireless — Design Styleguide

## Brand Identity

**Simply Kosher Wireless** is a premium, community-focused MVNO brand. The visual identity is clean, modern, and trustworthy — inspired by Apple and Stripe. The design language communicates "zero noise": spacious layouts, intentional motion, and a teal-navy palette that is both energetic and authoritative.

---

## Design Tokens

All tokens are defined in `src/index.css` via Tailwind v4's `@theme` block.

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  --color-primary-navy: #0F172A;
  --color-brand-teal: #0D9488;
  --color-brand-turquoise: #2DD4BF;
  --color-muted-bg: #F8FAFC;
  --radius-xl: 1rem;   /* 16px */
  --radius-2xl: 1.5rem; /* 24px */
}
```

---

## Color Palette

### Brand Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|---------------|-------|
| Primary Navy | `#0F172A` | `primary-navy` | Headings, dark section backgrounds, logo text |
| Brand Teal | `#0D9488` | `brand-teal` | Primary CTAs, accents, active states |
| Brand Turquoise | `#2DD4BF` | `brand-turquoise` | Highlights, stars, gradient overlays |
| Muted Background | `#F8FAFC` | `muted-bg` | Subtle section backgrounds |

### Neutral Palette (Slate)

Use Tailwind's `slate` scale for all neutral grays.

| Class | Usage |
|-------|-------|
| `slate-50` | Background tints |
| `slate-100` | Dividers, borders |
| `slate-200` | Icon borders, secondary borders |
| `slate-400` | Placeholder text |
| `slate-500` | Secondary/muted text |
| `slate-600` | Supporting body text |
| `slate-800` | Dark button backgrounds |
| `slate-900` | Body text color |

### Accent Colors (Feature Icons Only)

These are used exclusively as icon container backgrounds in the Features section.

| Class | Paired With |
|-------|-------------|
| `blue-50` / `blue-600` | Connectivity features |
| `teal-50` / `teal-600` | Kosher/community features |
| `purple-50` / `purple-600` | Device features |
| `rose-50` / `rose-600` | Support features |
| `amber-50` / `amber-600` | Plan/flexibility features |
| `emerald-50` / `emerald-600` | Savings/value features |

### Opacity Modifiers

Use Tailwind's `/` opacity modifier when softening brand colors.

| Pattern | Usage |
|---------|-------|
| `bg-brand-teal/5` | Very subtle teal tint |
| `bg-brand-teal/10` | Section accent backgrounds |
| `bg-brand-turquoise/10` | Highlight areas |
| `bg-brand-turquoise/20` | Stronger highlight areas |
| `bg-white/70` | Glass morphism background |
| `bg-white/10`, `/20` | Elements over dark backgrounds |
| `bg-slate-50/30`, `/50` | Light transparent backgrounds |

---

## Typography

### Font Families

| Variable | Font | Usage |
|----------|------|-------|
| `font-display` | **Outfit** | All headings (h1–h6) |
| `font-sans` | **Inter** | Body text, labels, buttons |

Source: Google Fonts — `Inter` (weights 300, 400, 500, 600) + `Outfit` (weights 400, 500, 600, 700).

### Type Scale

| Class | Usage |
|-------|-------|
| `text-[10px]` / `text-[11px]` | Micro labels, legal, copyright |
| `text-xs` | Badges, tags, pill labels |
| `text-sm` | Buttons, secondary text, card descriptions |
| `text-lg` | Body copy, feature descriptions |
| `text-xl` | Section sub-headings, card titles |
| `text-2xl` | Plan names, prominent labels |
| `text-3xl` | Section titles |
| `text-4xl` | Large section headings |
| `text-5xl` | Major section headings |
| `text-6xl` | Trust section hero number |
| `text-7xl` | Hero main heading (md+) |

### Font Weights

| Class | Usage |
|-------|-------|
| `font-light` (300) | Long body paragraphs with `leading-relaxed` |
| `font-normal` (400) | Standard body text |
| `font-medium` (500) | Nav links, interactive labels, buttons |
| `font-semibold` (600) | Labels, eyebrows, small headings |
| `font-bold` (700) | All display headings, emphasis |

### Letter Spacing

| Class | Usage |
|-------|-------|
| `tracking-[0.3em]` | Section eyebrow labels (widest) |
| `tracking-[0.2em]` | Footer headings, scroll indicator |
| `tracking-[0.1em]` | Plan tags, badges |
| `tracking-widest` | Footer links, CTA buttons |
| `tracking-wider` | Hero badge |
| `tracking-tight` | Logo, large display text |
| `tracking-tighter` | "POWERED BY" labels, numeric text |

### Base Styles

```css
body       → font-sans, bg-white, text-slate-900, antialiased
h1–h6      → font-display, tracking-tight, text-primary-navy
```

---

## Spacing

### Section Padding (vertical rhythm)
- Major sections: `py-24` (96px)
- Condensed sections: `py-12` or `py-20`
- Top hero: `pt-32` (128px)

### Container
Every section uses `max-w-7xl mx-auto px-6` as the outer container.

### Card Padding
- Default card: `p-8` (32px)
- Compact card: `p-6` (24px)

### Component Gap Scale

| Gap | Usage |
|-----|-------|
| `gap-2` | Inline elements (icon + text) |
| `gap-3` | Button groups, tight rows |
| `gap-4` | Form options, compact grids |
| `gap-6` | Standard flex rows |
| `gap-8` | Card grids |
| `gap-12` | Footer columns |
| `gap-20` | Footer major sections |

---

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-md` | 6px | Skeleton loaders, small elements |
| `rounded-lg` | 8px | Logo squares |
| `rounded-xl` | 12px | Buttons, mobile CTAs |
| `rounded-2xl` | 16px | Icon containers, step circles |
| `rounded-3xl` | 24px | Info boxes |
| `rounded-[2rem]` | 32px | Feature cards |
| `rounded-[2.5rem]` | 40px | Plan cards, PlanFinder container |
| `rounded-[3rem]` | 48px | Hero visual container |
| `rounded-full` | 9999px | Pill badges, avatar circles, icon buttons |

---

## Shadows

### Custom Utilities

```css
/* Use on cards, containers, pricing panels */
.premium-shadow {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.05),
    0 2px 4px -2px rgb(0 0 0 / 0.05),
    0 20px 25px -5px rgb(0 0 0 / 0.03);
}

/* Use on navbar when scrolled */
.glass-morphism {
  @apply bg-white/70 backdrop-blur-md border border-white/20;
}

/* Use on Hero section wrapper */
.mesh-bg {
  background-color: #ffffff;
  background-image:
    radial-gradient(at 0% 0%,   hsla(170, 75%, 90%, 1) 0, transparent 50%),
    radial-gradient(at 50% 0%,  hsla(180, 60%, 95%, 1) 0, transparent 50%),
    radial-gradient(at 100% 0%, hsla(190, 50%, 92%, 1) 0, transparent 50%);
}

/* Dark-section gradient (Trust, CTA panels) */
.gradient-teal {
  background: linear-gradient(135deg, #0F172A 0%, #0D9488 100%);
}
```

### Tailwind Shadow Scale

| Class | Usage |
|-------|-------|
| `shadow-sm` | Borders, dividers |
| `shadow-lg` | Primary CTA buttons |
| `shadow-xl` | Card hover state |
| `shadow-2xl` | Phone mockup, prominent visuals |
| `shadow-lg shadow-teal-100` | Recommended plan CTA button |

---

## Layout

### Responsive Grid Patterns

```
Features:  grid-cols-1 → md:grid-cols-2 → lg:grid-cols-3   gap-8
Plans:     grid-cols-1 → lg:grid-cols-3                      gap-8
Footer:    grid-cols-2 → md:grid-cols-4 → lg:grid-cols-6    gap-12
Options:   grid-cols-1 → md:grid-cols-3                      gap-4
```

### Breakpoints (Tailwind defaults)

| Prefix | Width |
|--------|-------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

### Max-width Reference

| Class | Width | Usage |
|-------|-------|-------|
| `max-w-xs` | 320px | Small cards |
| `max-w-sm` | 384px | Compact containers |
| `max-w-md` | 448px | Modal-width content |
| `max-w-lg` | 512px | Narrow content blocks |
| `max-w-xl` | 576px | Form containers |
| `max-w-4xl` | 896px | Section intro text |
| `max-w-7xl` | 1280px | Main page container |

---

## Animation & Motion

### Library
Uses `motion/react` (Framer Motion alternative, v12+).

### Entrance Patterns

```tsx
// Standard fade + slide up (most components)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}

// Hero heading (slower, more dramatic)
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: "easeOut" }}

// Scale entrance (modals, cards)
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

// Slide from side
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

### Scroll-triggered (viewport) Animations

```tsx
whileInView={{ opacity: 1, y: 0 }}
initial={{ opacity: 0, y: 20 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: index * 0.1 }}  // stagger with index
```

### Continuous / Loop Animations

```tsx
// Floating elements
animate={{ y: [0, -20, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}

// Scroll indicator bob
animate={{ y: [0, 8, 0] }}
transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
```

### Hover Interactions (Tailwind)

| Effect | Class | Usage |
|--------|-------|-------|
| Lift button | `hover:-translate-y-1` | Primary CTAs |
| Subtle lift | `hover:-translate-y-0.5` | Secondary buttons |
| Press reset | `active:translate-y-0` | All buttons |
| Icon scale | `hover:scale-110` | Feature icons |
| Card shadow | `hover:shadow-xl` | Feature cards |
| Background | `hover:bg-white` | Feature cards |
| Text color | `hover:text-brand-teal` | Nav links, footer links |
| Darken | `hover:bg-teal-700` | Teal buttons |

### Transition Utilities

```
transition-all      → generic (use sparingly)
transition-colors   → color/background changes
transition-transform → transform changes
duration-300        → standard (buttons, links, icons)
duration-700        → slower (phone mockup rotation)
```

---

## Components

### Component Inventory

| File | Component | Description |
|------|-----------|-------------|
| [src/components/Navbar.tsx](src/components/Navbar.tsx) | `Navbar` | Fixed nav — logo, links, auth CTAs, mobile menu with AnimatePresence |
| [src/components/Hero.tsx](src/components/Hero.tsx) | `Hero` | Full-width hero — heading, CTAs, phone mockup, carrier logos, scroll indicator |
| [src/components/Features.tsx](src/components/Features.tsx) | `Features` | 6-card feature grid — colored icon containers, hover effects |
| [src/components/PlanFinder.tsx](src/components/PlanFinder.tsx) | `PlanFinder` | 3-step wizard — progress bar, icon options, recommendation output |
| [src/components/Plans.tsx](src/components/Plans.tsx) | `Plans` | 3-column pricing — badges, price, feature list, CTAs |
| [src/components/Trust.tsx](src/components/Trust.tsx) | `Trust` | Dark section — stats, testimonials with glass cards, animated blur orbs |
| [src/components/ActivationPreview.tsx](src/components/ActivationPreview.tsx) | `ActivationPreview` | 4-step process tracker — connector lines, status box, step states |
| [src/components/Footer.tsx](src/components/Footer.tsx) | `Footer` | Multi-column footer — brand, nav groups, social icons, legal |

### Button Patterns

```tsx
// Primary (teal) — main CTAs
className="flex items-center gap-2 bg-brand-teal text-white
           px-6 py-3 rounded-xl font-medium text-sm tracking-widest
           hover:bg-teal-700 hover:-translate-y-1 active:translate-y-0
           transition-all duration-300 shadow-lg"

// Secondary (outline) — secondary CTAs
className="flex items-center gap-2 border border-slate-200 text-slate-800
           px-6 py-3 rounded-xl font-medium text-sm
           hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0
           transition-all duration-300"

// Dark — for use over light backgrounds
className="flex items-center gap-2 bg-slate-800 text-white
           px-6 py-3 rounded-xl font-medium text-sm
           hover:bg-slate-900 hover:-translate-y-1 active:translate-y-0
           transition-all duration-300 shadow-lg"
```

### Section Eyebrow Pattern

```tsx
// Small label above a section heading
<div className="flex items-center gap-2 mb-4">
  <div className="w-1.5 h-1.5 rounded-full bg-brand-teal" />
  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">
    Section Label
  </span>
</div>
```

### Section Heading Pattern

```tsx
<div className="text-center mb-16 max-w-4xl mx-auto">
  {/* eyebrow */}
  <h2 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">
    Main Heading
  </h2>
  <p className="text-lg text-slate-500 font-light leading-relaxed">
    Supporting description text.
  </p>
</div>
```

### Card Pattern

```tsx
// Standard feature/content card
<div className="bg-white border border-slate-100 rounded-[2rem] p-8
                premium-shadow hover:shadow-xl hover:bg-white hover:border-white
                transition-all duration-300">
  {/* icon container */}
  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-6">
    <Icon className="w-6 h-6 text-teal-600" />
  </div>
  <h3 className="text-xl font-bold text-primary-navy mb-3">Title</h3>
  <p className="text-slate-500 leading-relaxed">Description</p>
</div>
```

### Badge / Pill Pattern

```tsx
// Live / status badge
<span className="flex items-center gap-1.5 bg-brand-teal/10 text-brand-teal
                 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wider">
  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
  Label
</span>
```

### Pricing Card Pattern

```tsx
<div className="relative bg-white rounded-[2.5rem] p-8 premium-shadow
                hover:-translate-y-2 transition-all duration-300">
  {/* Most Popular tag */}
  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
    <span className="bg-brand-teal text-white text-xs font-semibold
                     px-4 py-1.5 rounded-full tracking-[0.1em] uppercase shadow-lg">
      Most Popular
    </span>
  </div>
  {/* Price */}
  <div className="flex items-baseline gap-1 mb-6">
    <span className="text-sm font-medium text-slate-500">$</span>
    <span className="text-5xl font-bold text-primary-navy">XX</span>
    <span className="text-sm font-medium text-slate-500">/mo</span>
  </div>
</div>
```

---

## Icons

Uses **Lucide React** (`lucide-react` v0.546+).

- Default icon size: `w-5 h-5` (20px) or `w-6 h-6` (24px)
- Nav icon: `w-4 h-4` (16px)
- Feature icon: `w-6 h-6` inside a `w-12 h-12` rounded container

```tsx
import { CheckCircle, ChevronRight, Menu, X, Phone } from "lucide-react";

// Standard usage
<CheckCircle className="w-5 h-5 text-brand-teal" />
```

---

## Dark Sections

When building over a dark background (`bg-primary-navy` or `gradient-teal`):

- Body text: `text-white` or `text-white/80`
- Muted text: `text-slate-400`
- Headings: `text-white` (override the default `text-primary-navy`)
- Cards: `bg-white/10 backdrop-blur-sm border border-white/10`
- Buttons: use white or turquoise variants
- Decorative blurs: `absolute rounded-full blur-3xl opacity-20 bg-brand-turquoise`

---

## Do's and Don'ts

### Do
- Use `font-display` (Outfit) for all headings
- Use `premium-shadow` on cards and containers instead of raw `shadow-*`
- Animate entrance with `opacity: 0, y: 20` → `opacity: 1, y: 0`
- Add `viewport={{ once: true }}` to scroll-triggered animations
- Use `tracking-[0.3em] uppercase` for section eyebrow labels
- Use `transition-all duration-300` on interactive elements
- Keep containers at `max-w-7xl mx-auto px-6`

### Don't
- Don't use colors outside the defined palette without a strong reason
- Don't use `font-sans` on headings (use `font-display`)
- Don't skip `active:translate-y-0` when you add `hover:-translate-y-*`
- Don't use raw `box-shadow` values — use `premium-shadow` or Tailwind shadow classes
- Don't use `animate-spin` or aggressive animations — motion should be subtle and purposeful
- Don't mix border-radius styles arbitrarily — follow the radius scale above
