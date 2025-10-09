'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !ref.current) return;

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      ctx = gsap.context(() => {
        // Initial letter stagger animation
        gsap.from('[data-letter]', {
          yPercent: 120,
          opacity: 0,
          stagger: 0.06,
          duration: 0.85,
          ease: 'power3.out',
        });
        gsap.from('[data-sub]', { opacity: 0, y: 10, duration: 0.7, delay: 0.35 });
      }, ref);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative">
      <div className="container text-center flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
          <span className="inline-block">
            <span data-letter className="inline-block">T</span>
            <span data-letter className="inline-block">h</span>
            <span data-letter className="inline-block">e</span>
            <span data-letter className="inline-block">{'\u00A0'}</span>
          </span>
          <span className="inline-block" id="real-word">
            <span data-letter className="inline-block">R</span>
            <span data-letter className="inline-block">e</span>
            <span data-letter className="inline-block">a</span>
            <span data-letter className="inline-block">l</span>
          </span>
          <span className="inline-block" id="est-word">
            <span data-letter className="inline-block">e</span>
            <span data-letter className="inline-block">s</span>
            <span data-letter className="inline-block">t</span>
          </span>
        </h1>
        <p data-sub className="mt-6 text-muted text-lg max-w-2xl">
          Capital for ideas that move humanity forward.
        </p>
      </div>
    </section>
  );
}

