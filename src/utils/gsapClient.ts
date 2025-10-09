/* eslint-disable @typescript-eslint/no-explicit-any */
let cached: any = null;

export async function loadGsap(): Promise<any> {
  if (typeof window === 'undefined') return null;
  if (cached) return cached;
  const mod = await import('gsap');
  const gsap = (mod as any).gsap || (mod as any).default || (mod as any);
  cached = gsap;
  return cached;
}

