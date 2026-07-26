// SG Beauty — Header
function Header({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "Gallery", "About", "Contact"];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(255, 243, 228, 0.92)" : "transparent",
      backdropFilter: scrolled ? "saturate(140%) blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(23,49,62,0.08)" : "1px solid transparent",
      transition: "background 300ms ease, border-color 300ms ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "18px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="../../assets/logo-sg-beauty-transparent.png" alt="SG Beauty"
            style={{ height: 56, width: "auto", display: "block" }}/>
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500,
              color: "#17313E", textDecoration: "none",
              transition: "color 200ms",
            }}
            onMouseOver={(e)=>e.currentTarget.style.color="#6F7B61"}
            onMouseOut={(e)=>e.currentTarget.style.color="#17313E"}
            >{l}</a>
          ))}
          <Button variant="dark" size="sm" onClick={onBook}>Book now</Button>
        </nav>
      </div>
    </header>
  );
}
Object.assign(window, { Header });
