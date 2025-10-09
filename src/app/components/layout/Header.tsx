'use client';

import Link from 'next/link';
import { useUIStore } from '@/store/ui.store';

export default function Header() {
  const { navOpen, toggleNav } = useUIStore();
  return (
    <header className="border-b border-neutral-800 sticky top-0 bg-bg/70 backdrop-blur-md z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold text-xl">
          THE REALEST
        </Link>
        <nav className={`${navOpen ? 'block' : 'hidden'} md:flex gap-6 text-sm`}>
          <Link href="/">Home</Link>
          <Link href="/contact-us">Contact</Link>
        </nav>
        <button onClick={toggleNav} className="md:hidden text-sm border px-3 py-1 rounded-lg">
          Menu
        </button>
      </div>
    </header>
  );
}

