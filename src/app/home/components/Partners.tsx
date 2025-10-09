'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

const partners = [
  'Acme Corp',
  'TechVentures',
  'Innovation Labs',
  'Future Systems',
  'Digital Pioneers',
  'NextGen Capital',
];

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !sectionRef.current || !spacerRef.current) return;

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Set initial opacity to 0 immediately
        gsap.set(sectionRef.current, { opacity: 0 });
        
        // Slide up the section to cover previous content
        gsap.fromTo(sectionRef.current, 
          { 
            yPercent: 100,
            opacity: 0,
          },
          { 
            yPercent: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: spacerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );

        // Fade in and scale the title
        gsap.fromTo('[data-partners-title]', {
          opacity: 0,
          scale: 0.8,
          y: 100,
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: spacerRef.current,
            start: 'top bottom',
            end: 'center bottom',
            scrub: 1,
          },
        });

        // Stagger in partner items
        gsap.fromTo('[data-partner-item]', {
          opacity: 0,
          y: 50,
          scale: 0.9,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: spacerRef.current,
            start: 'top 80%',
            end: 'center 60%',
            scrub: 1,
          },
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* Spacer for scroll distance */}
      <div ref={spacerRef} style={{ height: '100vh', position: 'relative', scrollSnapAlign: 'start', scrollSnapStop: 'always' }} />
      
      {/* Fixed section that slides up */}
      <section 
        ref={sectionRef} 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          backgroundColor: '#1a4d2e',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 20,
          willChange: 'transform',
          opacity: 0,
        }}
      >
      <div className="container text-center">
        <h2 
          data-partners-title
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-16"
          style={{ color: '#FFFCE1' }}
        >
          Our Trusted Partners
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div 
              key={index}
              data-partner-item
              className="text-xl md:text-2xl font-semibold transition-all duration-300 hover:scale-110"
              style={{ color: '#a8d5ba' }}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}

