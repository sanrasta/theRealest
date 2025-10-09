'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

const projects = [
  {
    name: 'Project Alpha',
    description: 'Revolutionary AI-powered healthcare platform',
  },
  {
    name: 'Project Beta',
    description: 'Sustainable energy distribution network',
  },
  {
    name: 'Project Gamma',
    description: 'Next-generation education technology',
  },
  {
    name: 'Project Delta',
    description: 'Urban mobility transformation',
  },
];

export default function Projects() {
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
        gsap.fromTo('[data-projects-title]', {
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

        // Stagger in project items
        gsap.fromTo('[data-project-item]', {
          opacity: 0,
          x: -50,
          scale: 0.95,
        }, {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.2,
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
          backgroundColor: '#2d3561',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
          willChange: 'transform',
          opacity: 0,
        }}
      >
      <div className="container px-4 md:px-6">
        <h2 
          data-projects-title
          className="text-3xl md:text-6xl font-extrabold tracking-tight mb-8 md:mb-16 text-center"
          style={{ color: '#FFFCE1' }}
        >
          Our Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index}
              data-project-item
              className="p-4 md:p-6 rounded-lg transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: 'rgba(255, 252, 225, 0.1)',
                borderLeft: '4px solid #8b9dc3',
              }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#FFFCE1' }}>
                {project.name}
              </h3>
              <p className="text-base md:text-lg" style={{ color: '#b8c5db' }}>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      </section>
    </>
  );
}

