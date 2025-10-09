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

export default function RealJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !containerRef.current) return;

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Hero section - Initial animation
        gsap.from('[data-letter]', {
          yPercent: 120,
          opacity: 0,
          stagger: 0.06,
          duration: 0.85,
          ease: 'power3.out',
        });
        gsap.from('[data-sub]', { opacity: 0, y: 10, duration: 0.7, delay: 0.35 });

        // Main scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: 1,
            pin: true,
          },
        });

        // Phase 1: Fade out "The" and "est", fade out subtitle, move "Real" down
        tl.to('[data-the]', { opacity: 0, x: -100, duration: 1 }, 0)
          .to('[data-est]', { opacity: 0, x: 100, duration: 1 }, 0)
          .to('[data-sub]', { opacity: 0, y: -20, duration: 0.8 }, 0)
          .to('[data-real]', { y: '-31vh', scale: 0.9, duration: 1.5 }, 0.5)
          
          // Phase 2: Bring in "Vision" below "Real"
          .to('[data-vision-title]', { opacity: 1, y: 0, duration: 1 }, 1.5)
          .to('[data-vision-content]', { opacity: 1, y: 0, duration: 1 }, 2)
          
          // Phase 3: Horizontal scroll - fade out Vision, fade in Values
          .to('[data-vision-title]', { opacity: 0, x: -100, duration: 0.8 }, 3)
          .to('[data-vision-content]', { opacity: 0, y: -30, duration: 0.8 }, 3)
          .to('[data-values-title]', { opacity: 1, x: 0, duration: 0.8 }, 3.3)
          .to('[data-value-card]', { opacity: 1, y: 0, stagger: 0.15, duration: 1 }, 3.8);

      }, containerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="container text-center flex flex-col items-center relative">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight relative z-10">
            <span className="inline-block" data-the>
              <span data-letter className="inline-block">T</span>
              <span data-letter className="inline-block">h</span>
              <span data-letter className="inline-block">e</span>
              <span data-letter className="inline-block">{'\u00A0'}</span>
            </span>
            <span className="inline-block" data-real style={{ position: 'relative', zIndex: 50 }}>
              <span data-letter className="inline-block">R</span>
              <span data-letter className="inline-block">e</span>
              <span data-letter className="inline-block">a</span>
              <span data-letter className="inline-block">l</span>
            </span>
            <span className="inline-block" data-est>
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

      {/* Vision & Values - Positioned below where Real lands */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none" style={{ top: '20vh' }}>
        <div className="w-full max-w-7xl px-6 mx-auto text-center flex flex-col items-center relative">
          {/* Vision Title */}
          <h2 
            data-vision-title 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            Vision
          </h2>
          
          {/* Vision Content */}
          <p
            data-vision-content
            className="text-muted text-lg md:text-xl max-w-3xl leading-relaxed opacity-0 mb-12"
            style={{ transform: 'translateY(30px)' }}
          >
            We see a future where capital flows toward projects that elevate human experience, not
            exploit it. Where design thinking meets deep technical rigor. Where founders build with
            intention, craft, and a genuine commitment to lasting impact.
          </p>
          
          {/* Values Title - positioned in same spot as Vision */}
          <h2 
            data-values-title 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 opacity-0 absolute top-0"
            style={{ transform: 'translateX(100px)' }}
          >
            Values
          </h2>
          
          {/* Values Cards - positioned where Vision content was */}
          <div className="grid gap-8 md:grid-cols-3 w-full max-w-6xl opacity-0 absolute" style={{ top: '8rem' }}>
            {values.map((value, i) => (
              <div
                key={i}
                data-value-card
                className="rounded-xl border border-neutral-800 p-8 bg-neutral-900/40 backdrop-blur-sm pointer-events-auto"
                style={{ transform: 'translateY(40px)' }}
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

