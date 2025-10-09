import type { GSAP } from 'gsap';

let cached: GSAP | null = null;

export async function loadGsap(): Promise<GSAP | null> {
  if (typeof window === 'undefined') return null;
  if (cached) return cached;
  const mod = await import('gsap');
  const gsap = (mod as any).gsap || (mod as any).default || (mod as any);
  cached = gsap as GSAP;
  return cached;
}

