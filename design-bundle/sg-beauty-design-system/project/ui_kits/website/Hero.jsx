// SG Beauty — Hero
function Hero({ onBook }) {
  return (
    <section id="top" style={{
      position: "relative", background: "#E8ECDF",
      paddingTop: 24, paddingBottom: 80,
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "40px 32px",
        display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56, alignItems: "center",
        minHeight: 580,
      }}>
        {/* Text column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Eyebrow color="#6F7B61">Lash Studio · Capitol Hill, Seattle</Eyebrow>
          <h1 style={{
            margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600, fontSize: 64, lineHeight: 1.05,
            color: "#17313E", letterSpacing: "-0.015em", textWrap: "balance",
          }}>
            Lashes designed<br/>
            <em style={{ fontStyle: "italic", color: "#6F7B61" }}>around your eyes.</em>
          </h1>
          <p style={{
            margin: 0, maxWidth: 460,
            fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 18,
            lineHeight: 1.55, color: "#3D4A4F", textWrap: "pretty",
          }}>
            Classic, hybrid and volume sets, applied one lash at a time by certified artists who actually love what they do. Lightweight, long-lasting, made for everyday.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <Button variant="dark" size="lg" onClick={onBook}>Book an appointment</Button>
            <Button variant="secondary" size="lg" icon={false}><a href="#services" style={{color:"inherit",textDecoration:"none"}}>View services</a></Button>
          </div>
          {/* trust strip */}
          <div style={{
            display: "flex", gap: 24, alignItems: "center", marginTop: 28,
            paddingTop: 24, borderTop: "1px solid rgba(23,49,62,0.12)",
          }}>
            <div>
              <div style={{fontFamily:"'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: "#17313E", lineHeight: 1}}>4.97<span style={{color:"#9CA68B"}}>★</span></div>
              <div style={{fontFamily:"Inter", fontSize: 12, fontWeight: 500, color: "#6B4F4F", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4}}>340+ Google reviews</div>
            </div>
            <div style={{width:1, height: 36, background: "rgba(23,49,62,0.15)"}} />
            <div>
              <div style={{fontFamily:"'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: "#17313E", lineHeight: 1}}>6 yrs</div>
              <div style={{fontFamily:"Inter", fontSize: 12, fontWeight: 500, color: "#6B4F4F", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4}}>Lashing experience</div>
            </div>
            <div style={{width:1, height: 36, background: "rgba(23,49,62,0.15)"}} />
            <div>
              <div style={{fontFamily:"'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: "#17313E", lineHeight: 1}}>0.03g</div>
              <div style={{fontFamily:"Inter", fontSize: 12, fontWeight: 500, color: "#6B4F4F", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4}}>Per single lash</div>
            </div>
          </div>
        </div>

        {/* Image column */}
        <div style={{ position: "relative", height: 580 }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "url(../../assets/images/hero-portrait.png)",
            backgroundSize: "cover", backgroundPosition: "center 30%",
            borderRadius: 24,
            boxShadow: "0 24px 60px rgba(23,49,62,0.18)",
          }} />
          {/* Floating chips */}
          <FloatingChip label="Classic" top={36} left={-30} variant="dark"/>
          <FloatingChip label="Hybrid"  top={140} right={20} variant="dark"/>
          <FloatingChip label="Volume"  bottom={140} left={-26} variant="dark"/>
          <FloatingChip label="Lash lift" bottom={50} right={40} variant="dark"/>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({ label, top, bottom, left, right, variant = "dark" }) {
  return (
    <div style={{
      position: "absolute", top, bottom, left, right,
      padding: "8px 18px", borderRadius: 999,
      background: variant === "dark" ? "#17313E" : "#fff",
      color: variant === "dark" ? "#FFF3E4" : "#17313E",
      fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
      letterSpacing: "0.02em",
      boxShadow: "0 6px 20px rgba(23,49,62,0.25)",
      display: "inline-flex", alignItems: "center", gap: 8,
    }}>
      {label}
      <svg width="11" height="11" viewBox="0 0 6.391 11.095" fill="currentColor"><path d="M 6.147 4.948 L 1.433 0.234 C 1.276 0.082 1.065 -0.002 0.847 0 C 0.628 0.002 0.419 0.09 0.265 0.244 C 0.11 0.399 0.022 0.608 0.021 0.826 C 0.019 1.045 0.103 1.255 0.254 1.412 L 4.379 5.537 L 0.254 9.668 C 0.103 9.825 0.019 10.035 0.021 10.254 C 0.022 10.472 0.11 10.681 0.265 10.836 C 0.419 10.99 0.628 11.078 0.847 11.08 C 1.065 11.082 1.276 10.998 1.433 10.841 L 6.147 6.126 C 6.303 5.97 6.391 5.758 6.391 5.537 C 6.391 5.316 6.303 5.104 6.147 4.948 Z" fillRule="evenodd"/></svg>
    </div>
  );
}

Object.assign(window, { Hero });
