export default function About() {
  return (
    <section 
      className="section" 
      style={{ 
        position: 'relative', 
        zIndex: 50, 
        backgroundColor: 'var(--fg)',
        color: 'var(--bg)',
      }}
    >
      <div className="container grid gap-8 md:grid-cols-2">
        <h2 className="text-3xl md:text-4xl" style={{ color: 'var(--bg)' }}>About The Realest</h2>
        <p className="leading-relaxed" style={{ color: '#666666' }}>
          We invest at the intersection of craft and impact. Our thesis centers on human‑centric
          products that elevate everyday life — pairing principled capital with hands‑on support in
          brand, product, and go‑to‑market.
        </p>
      </div>
    </section>
  );
}

