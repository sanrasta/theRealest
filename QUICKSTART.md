# Quick Start Guide

## What's Built

A single-page landing site for **THE REALEST** with three sections:

1. **Hero** — Animated "The Realest" text with GSAP letter stagger
2. **ScrollSection** — Pinned parallax scroll effect with transitioning copy
3. **About** — Two-column description of the company

Plus:
- Sticky header with mobile nav toggle
- Footer
- React Query + Zustand setup (ready to use)
- GSAP configured following official Next.js patterns

## Run It

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What You'll See

### Hero Animation
- Each letter of "The Realest" animates in with a stagger
- Subtitle fades in after
- Respects `prefers-reduced-motion`

### Scroll Section
- Pins to viewport as you scroll
- Background parallaxes
- Copy transitions: "We back the bold" → "Building humane technology..."
- Uses GSAP ScrollTrigger

### About Section
- Simple two-column grid
- Responsive (stacks on mobile)

## Customize

### Change Hero Text
Edit `src/app/home/components/Hero.tsx`:
```tsx
const title = 'Your New Text';
```

### Update Theme Colors
Edit `src/app/globals.css`:
```css
:root {
  --bg: #your-color;
  --fg: #your-color;
  --muted: #your-color;
}
```

### Adjust Animation Timing
In any component, modify GSAP parameters:
```tsx
gsap.from('[data-letter]', {
  yPercent: 120,
  opacity: 0,
  stagger: 0.06,    // ← Change stagger delay
  duration: 0.85,   // ← Change duration
  ease: 'power3.out' // ← Change easing
});
```

### Add New Section
1. Create `src/app/home/components/NewSection.tsx`
2. Import it in `src/app/page.tsx`
3. Add to the component list:
```tsx
export default function Page() {
  return (
    <>
      <Hero />
      <ScrollSection />
      <NewSection />  {/* ← Add here */}
      <About />
    </>
  );
}
```

## Project Structure (Quick Reference)

```
src/
├── app/
│   ├── components/layout/    # Header, Footer
│   ├── home/components/       # Hero, ScrollSection, About
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx               # Home page (composes sections)
│   ├── providers.tsx          # React Query wrapper
│   └── globals.css            # Tailwind + theme
├── lib/
│   └── queryClient.ts         # React Query config
├── store/
│   └── ui.store.ts            # Zustand UI state
└── utils/
    ├── hooks/
    │   └── useIsomorphicLayoutEffect.ts
    └── gsapClient.ts          # GSAP loader
```

## Next Steps

1. **Customize content** — Update copy in each section component
2. **Add images** — Drop assets in `public/` and use Next.js `<Image>`
3. **Extend animations** — Follow patterns in `Hero.tsx` and `ScrollSection.tsx`
4. **Add pages** — Create `src/app/[route]/page.tsx` for new routes
5. **Connect data** — Use React Query hooks to fetch from APIs

## Common Tasks

### Format Code
```bash
npx prettier --write .
```

### Lint
```bash
npm run lint
```

### Build for Production
```bash
npm run build
npm start
```

### Add a New Dependency
```bash
npm install package-name
```

## Troubleshooting

### GSAP animations not working
- Ensure component has `'use client'` directive
- Check browser console for errors
- Verify `ref` is attached to correct element

### Tailwind classes not applying
- Check `globals.css` is imported in `layout.tsx`
- Verify class names match Tailwind docs
- Custom colors use `bg-bg`, `text-fg`, `text-muted`

### TypeScript errors
- Run `npm run build` to see full type checking
- Check imports use correct paths with `@/` alias

## Resources

- Full docs: `README.md`
- Architecture guide: `ARCHITECTURE.md`
- GSAP examples: [GSAP + Next.js Starters](https://stackblitz.com/@GSAP-dev/collections/gsap-nextjs-starters)

## Need Help?

Check `ARCHITECTURE.md` for detailed patterns and best practices.

