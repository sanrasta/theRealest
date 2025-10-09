'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

const values = [
  {
    title: 'Craft over speed',
    description: 'We believe in the power of deliberate design and thoughtful execution.',
  },
  {
    title: 'Impact over scale',
    description: 'Meaningful outcomes for real people, not vanity metrics.',
  },
  {
    title: 'Partnership over transaction',
    description: 'We build alongside founders, not from a distance.',
  },
];

export default function ValuesSection() {
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

      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Fade in "Values" text
        gsap.from('[data-values]', {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: -30,
          duration: 0.8,
          ease: 'power2.out',
        });

        // Stagger in value cards
        gsap.from('[data-value-card]', {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative">
      <div className="container flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-12 text-center">
          <span className="text-muted">Real</span>
          <span data-values className="ml-3">Values</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl w-full">
          {values.map((value, i) => (
            <div
              key={i}
              data-value-card
              className="rounded-xl border border-neutral-800 p-8 bg-neutral-900/40 backdrop-blur-sm"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4">{value.title}</h3>
              <p className="text-muted leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

