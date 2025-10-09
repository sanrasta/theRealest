# THE REALEST

A modern venture capital landing page built with Next.js, TypeScript, Tailwind CSS, and GSAP animations.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** (with custom theme tokens)
- **GSAP** for advanced animations (ScrollTrigger for pinned parallax)
- **Zustand** for UI state management
- **React Query** (TanStack) for server state
- **ESLint** + **Prettier** for code quality

## Project Structure

```
src/
  app/
    components/
      layout/
        Header.tsx          # Sticky header with nav
        Footer.tsx          # Footer component
    home/
      components/
        Hero.tsx            # Animated hero text with GSAP
        ScrollSection.tsx   # Pinned parallax scroll section
        About.tsx           # About section
    layout.tsx              # Root layout with providers
    page.tsx                # Home page composition
    providers.tsx           # React Query provider wrapper
    globals.css             # Tailwind + custom theme tokens
  lib/
    queryClient.ts          # React Query configuration
  store/
    ui.store.ts             # Zustand UI state (nav toggle, etc.)
  utils/
    hooks/
      useIsomorphicLayoutEffect.ts  # SSR-safe layout effect
    gsapClient.ts           # GSAP loader with caching
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Architecture Principles

### SOLID & Separation of Concerns
- **Pages** (`page.tsx`) contain only composition — no logic
- **Components** are organized by page in dedicated folders
- **State** is separated: Zustand for UI, React Query for server data
- **Utilities** are centralized and reusable

### GSAP Integration (Official Next.js Pattern)
- Client-side only loading via dynamic import
- `useIsomorphicLayoutEffect` prevents SSR warnings
- `gsap.context()` for scoped animations with automatic cleanup
- ScrollTrigger for advanced scroll-based effects
- `prefers-reduced-motion` support built-in

### Styling
- Tailwind v4 with inline theme configuration
- Custom color tokens: `bg`, `fg`, `muted`
- Utility classes: `.section`, `.container`
- Responsive design with mobile-first approach

## Adding New Features

### Add a New Page
1. Create `src/app/[route]/components/` directory
2. Build your section components
3. Create `src/app/[route]/page.tsx` and compose sections:

```tsx
import SectionOne from './components/SectionOne';
import SectionTwo from './components/SectionTwo';

export default function Page() {
  return (
    <>
      <SectionOne />
      <SectionTwo />
    </>
  );
}
```

### Add GSAP Animation
Use this pattern for any animated component:

```tsx
'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function AnimatedComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !ref.current) return;

      // Check for reduced motion preference
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      // Create scoped context for automatic cleanup
      ctx = gsap.context(() => {
        gsap.from('[data-animate]', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out'
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref}>
      <h1 data-animate>Animated Content</h1>
    </div>
  );
}
```

### Add ScrollTrigger Animation
```tsx
const { ScrollTrigger } = await import('gsap/ScrollTrigger');
gsap.registerPlugin(ScrollTrigger);

ctx = gsap.context(() => {
  gsap.from('[data-element]', {
    scrollTrigger: {
      trigger: ref.current,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
    },
    opacity: 0,
    scale: 0.8,
  });
}, ref);
```

## Customization

### Update Theme Colors
Edit `src/app/globals.css`:

```css
:root {
  --bg: #0d0d0d;      /* Background */
  --fg: #eaeaea;      /* Foreground text */
  --muted: #9a9a9a;   /* Muted text */
}
```

### Add Zustand State
Edit `src/store/ui.store.ts` or create new stores:

```tsx
import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));
```

## Resources

- [GSAP + Next.js Official Starters](https://stackblitz.com/@GSAP-dev/collections/gsap-nextjs-starters)
- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [React Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://docs.pmnd.rs/zustand)

## License

Private project for THE REALEST.
