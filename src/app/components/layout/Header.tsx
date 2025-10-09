'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/ui.store';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function Header() {
  const { navOpen, toggleNav } = useUIStore();
  const headerRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    (async () => {
      const gsap = await loadGsap();
      if (!gsap || !headerRef.current) return;

      const reduce =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;

      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Color change animation
        gsap.to(headerRef.current, {
          backgroundColor: '#ffffff',
          color: '#0d0d0d',
          borderBottomColor: '#e5e5e5',
          scrollTrigger: {
            trigger: 'body',
            start: 'top -50',
            end: 'top -100',
            scrub: true,
          },
        });

        // Animate links color
        gsap.to('[data-nav-link]', {
          color: '#0d0d0d',
          scrollTrigger: {
            trigger: 'body',
            start: 'top -50',
            end: 'top -100',
            scrub: true,
          },
        });
      }, headerRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <header 
      ref={headerRef}
      className="border-b border-neutral-800 backdrop-blur-md transition-colors"
      style={{ backgroundColor: '#0d0d0d', zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0 }}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-xl" data-nav-link>
          THE REALEST
        </Link>
        <nav className={`${navOpen ? 'block' : 'hidden'} md:flex gap-6 text-sm`}>
          <Link href="/" data-nav-link>Home</Link>
          <Link href="/contact-us" data-nav-link>Contact</Link>
        </nav>
        <button onClick={toggleNav} className="md:hidden text-sm border px-3 py-1 rounded-lg" data-nav-link>
          Menu
        </button>
      </div>
    </header>
  );
}

