'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/ui.store';
import { useIsomorphicLayoutEffect } from '@/utils/hooks/useIsomorphicLayoutEffect';
import { loadGsap } from '@/utils/gsapClient';

export default function Header() {
  const { navOpen, toggleNav, isDarkMode, toggleTheme } = useUIStore();
  const headerRef = useRef<HTMLElement>(null);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDarkMode) {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }, [isDarkMode]);

  useIsomorphicLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // Color change animation - invert colors on scroll
        const initialBg = isDarkMode ? '#0d0d0d' : '#FFFCE1';
        const initialFg = isDarkMode ? '#FFFCE1' : '#0d0d0d';
        const scrollBg = isDarkMode ? '#FFFCE1' : '#0d0d0d';
        const scrollFg = isDarkMode ? '#0d0d0d' : '#FFFCE1';
        const scrollBorder = isDarkMode ? '#e5e5e5' : '#333333';

        gsap.fromTo(headerRef.current, {
          backgroundColor: initialBg,
          borderBottomColor: isDarkMode ? '#333333' : '#e5e5e5',
        }, {
          backgroundColor: scrollBg,
          borderBottomColor: scrollBorder,
          scrollTrigger: {
            trigger: 'body',
            start: 'top -50',
            end: 'top -100',
            scrub: true,
          },
        });

        // Animate links color
        gsap.fromTo('[data-nav-link]', {
          color: initialFg,
        }, {
          color: scrollFg,
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
  }, [isDarkMode]);

  const headerBg = isDarkMode ? '#0d0d0d' : '#FFFCE1';

  return (
    <header 
      ref={headerRef}
      className="border-b border-neutral-800 backdrop-blur-md transition-colors"
      style={{ backgroundColor: headerBg, zIndex: 9999, position: 'fixed', top: 0, left: 0, right: 0 }}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-xl" data-nav-link>
          THE REALEST
        </Link>
        <div className="flex items-center gap-6">
          <nav className={`${navOpen ? 'block' : 'hidden'} md:flex gap-6 text-sm`}>
            <Link href="/" data-nav-link>Home</Link>
            <Link href="/contact-us" data-nav-link>Contact</Link>
          </nav>
          <button 
            onClick={toggleTheme}
            className="relative w-12 h-6 rounded-full transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: isDarkMode ? '#333333' : '#e5e5e5',
            }}
            aria-label="Toggle theme"
          >
            <span 
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: isDarkMode ? '#FFFCE1' : '#0d0d0d',
                transform: isDarkMode ? 'translateX(0)' : 'translateX(24px)',
              }}
            />
          </button>
          <button onClick={toggleNav} className="md:hidden text-sm border px-3 py-1 rounded-lg" data-nav-link>
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

