'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function Motto() {
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
        // Fade in and scale the motto text
        gsap.fromTo('[data-motto-text]', {
          opacity: 0,
          scale: 0.9,
          y: 80,
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        });

        // Fade in the subtext
        gsap.fromTo('[data-motto-sub]', {
          opacity: 0,
          y: 40,
        }, {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 25%',
            scrub: 1,
          },
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center"
      style={{ 
        backgroundColor: '#6b2d5c',
        position: 'relative',
        zIndex: 40,
      }}
    >
      <div className="container text-center px-6">
        <blockquote 
          data-motto-text
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-12 leading-tight"
          style={{ color: '#FFFCE1' }}
        >
          &quot;Invest in vision,<br />
          build with purpose,<br />
          grow with integrity.&quot;
        </blockquote>
        <p 
          data-motto-sub
          className="text-xl md:text-2xl max-w-2xl mx-auto"
          style={{ color: '#d4a5d0' }}
        >
          Our commitment to founders who dare to make a difference.
        </p>
      </div>
    </section>
  );
}

