# Architecture Overview

## Component Hierarchy

```
RootLayout (src/app/layout.tsx)
├── Providers (React Query + DevTools)
├── Header (sticky nav)
├── <main>
│   └── Page Content
└── Footer

Home Page (src/app/page.tsx)
├── Hero
│   └── Animated "The Realest" text (GSAP stagger)
├── ScrollSection
│   └── Pinned parallax with copy transitions (GSAP + ScrollTrigger)
└── About
    └── Two-column layout (grid)
```

## Data Flow

### UI State (Zustand)
- Location: `src/store/ui.store.ts`
- Purpose: Client-side UI state (nav open/close, modals, etc.)
- Pattern: Direct hook usage `useUIStore()`

### Server State (React Query)
- Location: `src/lib/queryClient.ts`
- Purpose: Data fetching, caching, synchronization
- Pattern: Wrap in `QueryClientProvider` (done in `providers.tsx`)

### Animation State (GSAP)
- Location: `src/utils/gsapClient.ts`
- Purpose: Performant animations with cleanup
- Pattern: 
  1. Load GSAP dynamically (client-only)
  2. Use `gsap.context()` for scoping
  3. Clean up with `ctx.revert()` on unmount

## File Organization

### Page-Specific Components
- Located in: `src/app/[page]/components/`
- Naming: PascalCase (e.g., `Hero.tsx`, `About.tsx`)
- Purpose: Components unique to a single page

### Shared Layout Components
- Located in: `src/app/components/layout/`
- Naming: PascalCase (e.g., `Header.tsx`, `Footer.tsx`)
- Purpose: Components used across all pages

### Global Sections (Future)
- Location: `src/app/components/sections/`
- Purpose: Reusable sections that appear on multiple pages
- Example: CTA blocks, testimonials, feature grids

### Utilities
- Hooks: `src/utils/hooks/`
- Clients: `src/utils/`
- Purpose: Pure functions, custom hooks, client wrappers

## Styling Strategy

### Tailwind v4 Theme
Custom tokens defined in `src/app/globals.css`:
- `--bg` → `bg-bg` (background)
- `--fg` → `text-fg` (foreground)
- `--muted` → `text-muted` (muted text)

### Utility Classes
- `.section` → `py-24` (vertical section spacing)
- `.container` → `max-w-7xl mx-auto px-6` (content width)

### Responsive Design
- Mobile-first approach
- Breakpoints: `md:`, `lg:`, `xl:`
- Typography scales with `clamp()` or breakpoints

## Animation Patterns

### Basic GSAP Animation
```tsx
'use client';
import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function Component() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !ref.current) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      ctx = gsap.context(() => {
        gsap.from('[data-animate]', { opacity: 0, y: 20, duration: 0.8 });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  return <div ref={ref} data-animate>Content</div>;
}
```

### ScrollTrigger Pattern
```tsx
const { ScrollTrigger } = await import('gsap/ScrollTrigger');
gsap.registerPlugin(ScrollTrigger);

ctx = gsap.context(() => {
  gsap.from('[data-el]', {
    scrollTrigger: {
      trigger: ref.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.8,
    },
    opacity: 0,
    scale: 0.9,
  });
}, ref);
```

## Best Practices

### Component Design
1. Keep pages (`page.tsx`) lean — composition only
2. Extract logic into custom hooks
3. Use client components (`'use client'`) only when needed
4. Prefer server components for static content

### State Management
1. Use Zustand for UI state (ephemeral)
2. Use React Query for server state (persistent)
3. Avoid prop drilling with context or stores
4. Keep state as local as possible

### Animation
1. Always check `prefers-reduced-motion`
2. Clean up animations on unmount
3. Use `gsap.context()` for scoping
4. Lazy load GSAP (client-only)
5. Use `data-*` attributes for animation targets

### Performance
1. Use Next.js Image component for images
2. Lazy load heavy components with `next/dynamic`
3. Minimize client-side JavaScript
4. Use React Server Components by default

## Adding Features

### New Page
1. Create `src/app/[route]/components/`
2. Build section components
3. Create `src/app/[route]/page.tsx`
4. Import and compose sections

### New Animation
1. Follow GSAP pattern (see above)
2. Use scoped context with `ref`
3. Clean up with `ctx.revert()`
4. Test with reduced motion

### New API Route
1. Create `src/app/api/[route]/route.ts`
2. Export handler functions
3. Use in React Query hooks

### New Store
1. Create `src/store/[name].store.ts`
2. Define interface and create store
3. Export hook for usage

## Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [GSAP + Next.js Starters](https://stackblitz.com/@GSAP-dev/collections/gsap-nextjs-starters)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand)
- [React Query](https://tanstack.com/query/latest)

