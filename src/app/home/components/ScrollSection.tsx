'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function ScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !sectionRef.current) return;

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Pin the section and animate content
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%', // Makes it longer - adjust this value to make it longer or shorter
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        // Fade in and scale the title
        tl.fromTo('[data-scroll-title]', {
          opacity: 0,
          scale: 0.8,
          y: 100,
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          duration: 1,
        }, 0)
        
        // Stagger in the content paragraphs
        .fromTo('[data-scroll-item]', {
          opacity: 0,
          y: 80,
          scale: 0.95,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.3,
          ease: 'power2.out',
          duration: 1,
        }, 0.5)
        
        // Final scale and fade effect
        .to('[data-scroll-content]', {
          scale: 0.95,
          opacity: 0.8,
          ease: 'power2.in',
          duration: 1,
        }, 2);

      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center"
      style={{ 
        position: 'relative',
        zIndex: 50,
        backgroundColor: 'var(--bg)',
      }}
    >
      <div data-scroll-content className="container text-center px-6">
        <h2 
          data-scroll-title
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-12 md:mb-16"
        >
          Building The Future
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <p 
            data-scroll-item
            className="text-lg md:text-2xl text-muted leading-relaxed"
          >
            We partner with visionary founders who aren&apos;t afraid to challenge the status quo.
          </p>
          <p 
            data-scroll-item
            className="text-lg md:text-2xl text-muted leading-relaxed"
          >
            Together, we build products that matter, companies that last, and legacies that inspire.
          </p>
          <p 
            data-scroll-item
            className="text-lg md:text-2xl text-muted leading-relaxed"
          >
            This is more than investment—it&apos;s a commitment to real impact.
          </p>
        </div>
      </div>
    </section>
  );
}

