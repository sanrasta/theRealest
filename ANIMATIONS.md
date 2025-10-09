# Animation Guide

This document explains all animations in THE REALEST landing page and how to customize them.

## Overview

All animations use **GSAP** (GreenSock Animation Platform) following official Next.js patterns:
- Client-side only loading
- Automatic cleanup with `gsap.context()`
- Respect for `prefers-reduced-motion`
- SSR-safe with `useIsomorphicLayoutEffect`

---

## 1. Hero Section — Letter Stagger Animation

**Location**: `src/app/home/components/Hero.tsx`

### What Happens
Each letter of "The Realest" animates in sequentially with:
- Upward slide (from 120% below starting position)
- Fade in (opacity 0 → 1)
- Staggered delay between letters

Then the subtitle fades in after the title completes.

### Code
```tsx
gsap.from('[data-letter]', {
  yPercent: 120,      // Start 120% below
  opacity: 0,         // Fully transparent
  stagger: 0.06,      // 60ms between each letter
  duration: 0.85,     // 850ms per letter animation
  ease: 'power3.out', // Smooth deceleration
});

gsap.from('[data-sub]', {
  opacity: 0,
  y: 10,              // Subtle upward movement
  duration: 0.7,
  delay: 0.35,        // Wait 350ms after title starts
});
```

### Customization

**Speed up the stagger**:
```tsx
stagger: 0.03, // Faster (30ms between letters)
```

**Change the direction**:
```tsx
yPercent: -120,  // Slide in from above
// or
xPercent: 100,   // Slide in from right
```

**Change easing**:
```tsx
ease: 'elastic.out(1, 0.5)', // Bouncy
ease: 'back.out(1.7)',        // Overshoot
ease: 'expo.out',             // Very smooth
```

**Remove animation** (instant appear):
```tsx
// Comment out the gsap.from() calls
// or set duration: 0
```

---

## 2. Scroll Section — Pinned Parallax

**Location**: `src/app/home/components/ScrollSection.tsx`

### What Happens
As you scroll down:
1. **Section pins** to viewport (stays in place while you scroll)
2. **Background** moves up and scales slightly (parallax effect)
3. **First copy** ("We back the bold") fades in, then fades out
4. **Second copy** ("Building humane technology...") fades in and stays

### Code
```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ref.current,
    start: 'top top',      // Pin when section top hits viewport top
    end: '+=150%',         // Unpin after scrolling 150% of viewport height
    scrub: 0.8,            // Smooth scrubbing (80ms delay)
    pin: true,             // Pin the section
  },
});

// Background parallax
tl.fromTo('[data-bg]',
  { y: 0, scale: 1 },
  { y: -120, scale: 1.1, ease: 'none' },
  0
);

// First copy: fade in
tl.from('[data-copy-1]',
  { y: 60, autoAlpha: 0, duration: 0.6, ease: 'power2.out' },
  0.1
);

// First copy: fade out
tl.to('[data-copy-1]',
  { y: -60, autoAlpha: 0, duration: 0.6, ease: 'power2.in' },
  0.65
);

// Second copy: fade in
tl.from('[data-copy-2]',
  { y: 60, autoAlpha: 0, duration: 0.6, ease: 'power2.out' },
  0.85
);
```

### Customization

**Change scroll distance**:
```tsx
end: '+=200%',  // Scroll longer before unpinning
end: '+=100%',  // Scroll shorter
```

**Adjust scrub speed**:
```tsx
scrub: 1.2,  // More laggy/smooth
scrub: 0.3,  // More immediate
scrub: true, // Instant (no lag)
```

**Change parallax intensity**:
```tsx
{ y: -200, scale: 1.2 }  // More dramatic
{ y: -50, scale: 1.05 }  // More subtle
```

**Add more copy transitions**:
```tsx
tl.from('[data-copy-3]', { ... }, 1.2);
```

**Remove pinning** (normal scroll):
```tsx
scrollTrigger: {
  trigger: ref.current,
  start: 'top center',
  end: 'bottom center',
  scrub: 0.8,
  pin: false,  // Don't pin
},
```

---

## 3. About Section

**Location**: `src/app/home/components/About.tsx`

### What Happens
No animations — intentionally static for readability.

### Add Animation (Optional)

If you want to animate the about section on scroll:

```tsx
'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !ref.current) return;

      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from('[data-animate]', {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="section">
      <div className="container grid gap-8 md:grid-cols-2">
        <h2 data-animate className="text-3xl md:text-4xl">About The Realest</h2>
        <p data-animate className="text-muted leading-relaxed">
          We invest at the intersection of craft and impact...
        </p>
      </div>
    </section>
  );
}
```

---

## Common Animation Patterns

### Fade In on Scroll
```tsx
gsap.from('[data-element]', {
  scrollTrigger: {
    trigger: ref.current,
    start: 'top 80%',  // Trigger when top hits 80% down viewport
  },
  opacity: 0,
  y: 20,
  duration: 0.8,
});
```

### Stagger Multiple Items
```tsx
gsap.from('[data-item]', {
  opacity: 0,
  y: 30,
  duration: 0.6,
  stagger: 0.1,  // 100ms between each item
});
```

### Rotate and Scale
```tsx
gsap.from('[data-card]', {
  scale: 0.8,
  rotation: -5,
  opacity: 0,
  duration: 0.7,
  ease: 'back.out(1.4)',
});
```

### Continuous Animation (Loop)
```tsx
gsap.to('[data-float]', {
  y: -10,
  duration: 2,
  ease: 'sine.inOut',
  repeat: -1,       // Infinite
  yoyo: true,       // Reverse on each repeat
});
```

---

## Accessibility: Reduced Motion

All animations check for user's motion preferences:

```tsx
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) return; // Skip animations
```

Users who have enabled "Reduce Motion" in their OS settings will see content appear instantly without animations.

---

## Performance Tips

1. **Use `will-change` sparingly** — Only on elements that will animate:
   ```tsx
   <div className="will-change-transform">...</div>
   ```

2. **Animate transform and opacity** — These are GPU-accelerated:
   ```tsx
   // Good
   gsap.to(el, { x: 100, opacity: 0.5 });
   
   // Avoid
   gsap.to(el, { left: '100px', width: '50%' });
   ```

3. **Clean up animations** — Always use `ctx.revert()`:
   ```tsx
   return () => ctx?.revert();
   ```

4. **Use `data-*` attributes** — Instead of class selectors:
   ```tsx
   // Good
   gsap.from('[data-card]', { ... });
   
   // Avoid
   gsap.from('.card', { ... });
   ```

---

## GSAP Easing Reference

| Ease | Effect |
|------|--------|
| `power1.out` | Gentle deceleration |
| `power2.out` | Moderate deceleration |
| `power3.out` | Strong deceleration (default for most) |
| `power4.out` | Very strong deceleration |
| `back.out(1.7)` | Overshoot and settle |
| `elastic.out(1, 0.5)` | Bouncy spring effect |
| `expo.out` | Very smooth, cinematic |
| `none` | Linear (no easing) |

Try them at: [GSAP Ease Visualizer](https://gsap.com/docs/v3/Eases)

---

## Resources

- [GSAP Docs](https://gsap.com/docs/v3/)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP + Next.js Starters](https://stackblitz.com/@GSAP-dev/collections/gsap-nextjs-starters)
- [Easing Functions](https://gsap.com/docs/v3/Eases)

