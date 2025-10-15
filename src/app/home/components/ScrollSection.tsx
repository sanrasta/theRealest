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
            end: '+=150%', // Single scroll transition
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
        
        // Hold the content briefly
        .to('[data-scroll-content]', {
          scale: 0.98,
          opacity: 1,
          duration: 0.3,
        }, 1.2)
        
        // Fade out existing content
        .to('[data-scroll-content]', {
          opacity: 0,
          scale: 0.9,
          y: -30,
          filter: 'blur(5px)',
          ease: 'power2.in',
          duration: 0.4,
        }, 1.5)
        
        // Bring in the words quickly
        .fromTo('[data-join-word]', {
          opacity: 0,
          y: 40,
          scale: 0.9,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.06,
          ease: 'power3.out',
          duration: 0.4,
        }, 1.8)
        
        // Quickly bring words closer and morph to input
        .to('[data-join-words]', {
          gap: '0.25rem',
          duration: 0.3,
          ease: 'power2.inOut',
        }, 2.4)
        .to('[data-join-words]', {
          opacity: 0,
          scale: 0.9,
          filter: 'blur(5px)',
          ease: 'power2.in',
          duration: 0.3,
        }, 2.7)
        
        // Input appearance with glow
        .fromTo('[data-waitlist-input]', {
          opacity: 0,
          scale: 0.95,
          y: 20,
        }, {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power3.out',
          duration: 0.6,
        }, 2.9)
        
        .to('[data-input-glow]', {
          opacity: 0.3,
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.out',
        }, 2.9);

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

      {/* Words that join together */}
      <div 
        data-join-words
        className="absolute inset-0 flex items-center justify-center gap-4 md:gap-8 opacity-0"
        style={{ 
          pointerEvents: 'none',
        }}
      >
        <span 
          data-join-word 
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Join
        </span>
        <span 
          data-join-word 
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          the
        </span>
        <span 
          data-join-word 
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Waitlist
        </span>
      </div>

      {/* Final input box */}
      <div 
        data-waitlist-input
        className="absolute inset-0 flex items-center justify-center opacity-0"
        style={{ 
          transform: 'translateY(30px) scale(0.9)',
        }}
      >
        <div className="w-full max-w-md px-6 relative">
          {/* Glow effect behind input */}
          <div
            data-input-glow
            className="absolute inset-0 bg-fg opacity-0 blur-xl rounded-lg"
            style={{ transform: 'scale(0.95)' }}
          />
          <input
            type="email"
            placeholder="Join the Waitlist"
            className="relative w-full px-6 py-4 text-lg border-2 border-fg bg-bg text-fg placeholder:text-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-fg focus:border-transparent transition-all"
            style={{ backdropFilter: 'blur(10px)' }}
          />
        </div>
      </div>
    </section>
  );
}

