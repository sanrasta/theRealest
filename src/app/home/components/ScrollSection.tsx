'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function ScrollSection() {
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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: '+=150%',
            scrub: 0.8,
            pin: true,
          },
        });

        tl.fromTo('[data-bg]', { y: 0, scale: 1 }, { y: -120, scale: 1.1, ease: 'none' }, 0)
          .from('[data-copy-1]', { y: 60, autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 0.1)
          .to('[data-copy-1]', { y: -60, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, 0.65)
          .from('[data-copy-2]', { y: 60, autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 0.85);
      }, ref);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100vh]">
      <div
        data-bg
        className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900"
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="container relative h-full flex items-center justify-center">
        <div className="max-w-3xl text-center">
          <h2 data-copy-1 className="text-3xl md:text-4xl font-semibold">
            We back the bold.
          </h2>
          <h3 data-copy-2 className="text-2xl md:text-3xl font-medium mt-6 text-muted">
            Building humane technology with taste and rigor.
          </h3>
        </div>
      </div>
    </section>
  );
}

