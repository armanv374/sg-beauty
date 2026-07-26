// SG Beauty — Services
const SERVICES_DATA = [
  {
    category: "Classic", title: "Classic Set",
    desc: "One lightweight extension per natural lash. Polished, undetectable, your-lashes-but-better.",
    price: 140, duration: "120 min", rating: 4.97, reviews: 218,
    features: ["Custom shape consult", "Premium silk lashes · 0.15 mm", "Aftercare kit included"],
    img: "../../assets/images/hero-portrait.png",
  },
  {
    category: "Hybrid", title: "Hybrid Set",
    desc: "A 70/30 mix of classic and hand-made volume fans. Texture, density and that hint of drama.",
    price: 180, was: 210, duration: "135 min", rating: 4.99, reviews: 412,
    features: ["Custom mapped fans", "3 – 5 week retention", "First fill 50% off"],
    img: "../../assets/images/portrait-1.jpg",
    badge: "Most booked",
  },
  {
    category: "Volume", title: "Volume Set",
    desc: "Hand-made fans for dense, fluffy lashes that still feel feather-light.",
    price: 220, duration: "150 min", rating: 4.95, reviews: 168,
    features: ["3D–6D fan density", "Custom shape map", "4 – 5 week retention"],
    img: "../../assets/images/hero-portrait.png",
  },
  {
    category: "Lift", title: "Lash Lift & Tint",
    desc: "For naturally long lashes that just need to face upward. Lasts six to eight weeks.",
    price: 95, duration: "60 min", rating: 4.92, reviews: 96,
    features: ["Keratin-based lift", "Custom black or brown tint", "No upkeep for 6 – 8 weeks"],
    img: "../../assets/images/portrait-1.jpg",
  },
  {
    category: "Brows", title: "Brow Lamination",
    desc: "Brushed-up, sculpted brows. Finished with a custom tint and clean shape.",
    price: 85, duration: "45 min", rating: 4.94, reviews: 74,
    features: ["Shape mapping", "Custom tint", "4 – 6 week wear"],
    img: "../../assets/images/hero-portrait.png",
  },
];

function Services({ onBook }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Classic", "Hybrid", "Volume", "Lift", "Brows"];
  const visible = filter === "All" ? SERVICES_DATA : SERVICES_DATA.filter(s => s.category === filter);

  return (
    <section id="services" style={{ background: "#FFF3E4", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeader
          eyebrow="Services"
          title="Choose your set."
          sub="Five signature treatments — every one tailored to your eye shape, lifestyle and the look you're after."
        />

        {/* Filter tabs */}
        <div style={{
          display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
          marginTop: 36, marginBottom: 40,
        }}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: "8px 18px", borderRadius: 999, border: "1px solid",
              fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
              cursor: "pointer", transition: "all 200ms",
              background: filter === c ? "#9CA68B" : "transparent",
              color:      filter === c ? "#fff" : "#17313E",
              borderColor: filter === c ? "#9CA68B" : "rgba(23,49,62,0.2)",
            }}>{c}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {visible.map(s => <ServiceCard key={s.title} svc={s} onBook={onBook}/>)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc, onBook }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 24,
        border: `1px solid ${hover ? "rgba(65,94,114,0.6)" : "rgba(23,49,62,0.10)"}`,
        boxShadow: hover ? "0 8px 24px rgba(0,0,0,0.12)" : "0 1px 2px rgba(0,0,0,0.04), 0 2px 6px rgba(23,49,62,0.06)",
        padding: 20, display: "flex", flexDirection: "column", gap: 14,
        transition: "all 200ms cubic-bezier(.22,.61,.36,1)",
        transform: hover ? "translateY(-2px)" : "none",
      }}>
      {svc.badge && (
        <span style={{
          position: "absolute", top: 32, right: 32, zIndex: 1,
          padding: "5px 10px", borderRadius: 5, background: "#17313E", color: "#FFF3E4",
          fontFamily: "Inter, sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: "0.08em", textTransform: "uppercase",
        }}>{svc.badge}</span>
      )}
      <div style={{
        height: 200, borderRadius: 20,
        background: `#C7CEB8 url(${svc.img}) center/cover`,
      }}/>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <h3 style={{
          margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 22,
          color: "#17313E", lineHeight: 1.2,
        }}>{svc.title}</h3>
        <span style={{
          fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600,
          letterSpacing: "0.06em", color: "#6F7B61",
        }}>{svc.duration}</span>
      </div>
      <p style={{
        margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14.5,
        lineHeight: 1.55, color: "#6B4F4F",
      }}>{svc.desc}</p>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: "auto", paddingTop: 8,
      }}>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: 22,
          color: "#17313E",
        }}>{svc.price}</span>
        <Button variant="sage" size="sm" onClick={onBook}>Book</Button>
      </div>
    </article>
  );
}

Object.assign(window, { Services });
