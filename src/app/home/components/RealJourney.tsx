'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function RealJourney() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          stagger: 0.12,
          duration: 1.4,
          ease: 'power3.out',
          force3D: true,
          willChange: 'transform, opacity',
        });
        gsap.from('[data-sub]', { 
          opacity: 0, 
          y: 10, 
          duration: 1, 
          delay: 0.7,
          force3D: true,
        });

        // Main scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // Phase 1: Fade out "The" and "est", fade out subtitle, move "Real" down
        tl.to('[data-the]', { opacity: 0, x: -100, duration: 1 }, 0)
          .to('[data-est]', { opacity: 0, x: 100, duration: 1 }, 0)
          .to('[data-sub]', { opacity: 0, y: -20, duration: 0.8 }, 0)
          .to('[data-real]', { y: '-15vh', scale: 0.9, duration: 1.5 }, 0.5)
          
          // Phase 2: Bring in "Vision" below "Real"
          .to('[data-vision-title]', { opacity: 1, y: 0, duration: 1 }, 1.5)
          .to('[data-vision-content]', { opacity: 1, y: 0, duration: 1 }, 2)
          
          // Phase 3: Horizontal scroll - fade out Vision, fade in Values
          .to('[data-vision-title]', { opacity: 0, x: -100, duration: 0.8 }, 3)
          .to('[data-vision-content]', { opacity: 0, x: -100, duration: 0.8 }, 3)
          .to('[data-values-title]', { opacity: 1, x: 0, duration: 0.8 }, 3.3)
          .to('[data-values-content]', { opacity: 1, x: 0, duration: 0.8 }, 3.3)
          
          // Phase 4: Horizontal scroll - fade out Values, fade in Relationships
          .to('[data-values-title]', { opacity: 0, x: -100, duration: 0.8 }, 4.5)
          .to('[data-values-content]', { opacity: 0, x: -100, duration: 0.8 }, 4.5)
          .to('[data-relationships-title]', { opacity: 1, x: 0, duration: 0.8 }, 4.8)
          .to('[data-relationships-content]', { opacity: 1, x: 0, duration: 0.8 }, 4.8);

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
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>T</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>h</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>e</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>{'\u00A0'}</span>
            </span>
            <span className="inline-block" data-real style={{ position: 'relative', zIndex: 50 }}>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>R</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>e</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>a</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>l</span>
            </span>
            <span className="inline-block" data-est>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>e</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>s</span>
              <span data-letter className="inline-block" style={{ willChange: 'transform, opacity' }}>t</span>
            </span>
          </h1>
          <p data-sub className="mt-6 text-muted text-lg max-w-2xl">
            Capital for ideas that move humanity forward.
          </p>
        </div>
      </section>

      {/* Vision & Values - Centered on screen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-7xl px-6 mx-auto text-center flex flex-col items-center relative">
          {/* Vision Title */}
          <h2 
            data-vision-title 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 md:mb-8 opacity-0"
            style={{ transform: 'translateY(30px)' }}
          >
            Vision
          </h2>
          
          {/* Vision Content */}
          <p
            data-vision-content
            className="text-muted text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed opacity-0 mb-12"
            style={{ transform: 'translateY(30px)' }}
          >
            We see a future where capital flows toward projects that elevate human experience, not
            exploit it. Where design thinking meets deep technical rigor. Where founders build with
            intention, craft, and a genuine commitment to lasting impact.
          </p>
          
          {/* Values Title - positioned in same spot as Vision */}
          <h2 
            data-values-title 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 md:mb-8 opacity-0 absolute top-0"
            style={{ transform: 'translateX(100px)' }}
          >
            Values
          </h2>
          
          {/* Values Content - positioned where Vision content is */}
          <p
            data-values-content
            className="text-muted text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed opacity-0 absolute mb-12"
            style={{ transform: 'translateX(100px)', top: '4.5rem' }}
          >
            We believe in transparency, accountability, and long-term thinking. Our partnerships are 
            built on mutual respect and shared ambition. We invest not just capital, but time, 
            expertise, and unwavering commitment to our founders&apos; success.
          </p>
          
          {/* Relationships Title - positioned in same spot */}
          <h2 
            data-relationships-title 
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 md:mb-8 opacity-0 absolute top-0"
            style={{ transform: 'translateX(100px)' }}
          >
            Relationships
          </h2>
          
          {/* Relationships Content - positioned where Vision content is */}
          <p
            data-relationships-content
            className="text-muted text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed opacity-0 absolute mb-12"
            style={{ transform: 'translateX(100px)', top: '4.5rem' }}
          >
            At the heart of everything we do are the relationships we build. We partner with founders 
            who share our values and vision. Together, we create lasting impact through trust, 
            collaboration, and a commitment to building something truly meaningful.
          </p>
        </div>
      </div>
    </div>
  );
}

