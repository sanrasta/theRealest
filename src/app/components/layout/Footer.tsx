export default function Footer() {
  return (
    <footer 
      className="border-t border-neutral-800 text-center text-sm text-muted"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg)',
        zIndex: 100,
        padding: '1rem 0',
      }}
    >
      © {new Date().getFullYear()} THE REALEST — Investing in what matters.
    </footer>
  );
}

