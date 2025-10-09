'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function VisionSection() {
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
        // Fade in "Vision" text
        gsap.from('[data-vision]', {
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

        // Fade in content
        gsap.from('[data-content]', {
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 50%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
        });
      }, ref);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-bg via-neutral-900 to-bg">
      <div className="container text-center flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          <span className="text-muted">Real</span>
          <span data-vision className="ml-3">Vision</span>
        </h2>
        <p data-content className="text-muted text-lg md:text-xl max-w-3xl leading-relaxed">
          We see a future where capital flows toward projects that elevate human experience, not
          exploit it. Where design thinking meets deep technical rigor. Where founders build with
          intention, craft, and a genuine commitment to lasting impact.
        </p>
      </div>
    </section>
  );
}

