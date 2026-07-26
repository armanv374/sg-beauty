// SG Beauty — Footer
function Footer() {
  const cols = [
    { heading: "Services", links: ["Classic Set", "Hybrid Set", "Volume Set", "Lash Lift & Tint", "Brow Lamination", "Removals"] },
    { heading: "Studio",   links: ["About", "Our team", "Gallery", "Reviews", "Aftercare"] },
    { heading: "Visit",    links: ["Book appointment", "FAQs", "Cancellation policy", "Gift cards", "Press"] },
  ];

  return (
    <footer style={{ background: "#17313E", color: "#FFF3E4", marginTop: 0 }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "72px 32px 32px",
        display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr 0.8fr", gap: 36,
      }}>
        {/* brand col */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
          <img src="../../assets/logo-sg-beauty-black.png" alt="SG Beauty"
            style={{ height: 72, width: "auto", marginLeft: -8 }}/>
          <p style={{
            margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 14.5,
            lineHeight: 1.6, color: "rgba(255,243,228,0.78)",
          }}>
            Soft, precise lash extensions in Capitol Hill, Seattle.<br/>
            Beautiful, long-lasting lashes that enhance your natural confidence.
          </p>
          <div style={{
            display: "flex", flexDirection: "column", gap: 6,
            fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "rgba(255,243,228,0.7)",
          }}>
            <span>1216 19th Ave E · Seattle, WA</span>
            <span>(206) 555-0184 · hello@sgbeauty.studio</span>
          </div>
        </div>

        {cols.map(c => (
          <div key={c.heading} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <h4 style={{
              margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#FFF3E4", marginBottom: 6,
            }}>{c.heading}</h4>
            {c.links.map(l => (
              <a key={l} href="#" style={{
                fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgba(255,243,228,0.78)",
                textDecoration: "none", transition: "color 200ms",
              }}
              onMouseOver={e=>e.currentTarget.style.color="#9CA68B"}
              onMouseOut={e=>e.currentTarget.style.color="rgba(255,243,228,0.78)"}
              >{l}</a>
            ))}
          </div>
        ))}

        {/* social */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h4 style={{
            margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 14,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#FFF3E4", marginBottom: 6,
          }}>Follow</h4>
          <div style={{ display: "flex", gap: 8 }}>
            <SocialDot name="instagram"/>
            <SocialDot name="phone"/>
            <SocialDot name="mail"/>
            <SocialDot name="map-pin"/>
          </div>
        </div>
      </div>

      {/* bottom strip */}
      <div style={{
        background: "#fff", color: "#17313E",
        padding: "20px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "Inter, sans-serif", fontSize: 13.5,
      }}>
        <span style={{maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between"}}>
          <span>© 2026 SG Beauty. All rights reserved.</span>
          <span style={{display: "flex", gap: 24}}>
            <a href="#" style={{color: "#17313E", textDecoration: "none"}}>Terms</a>
            <a href="#" style={{color: "#17313E", textDecoration: "none"}}>Privacy</a>
            <a href="#" style={{color: "#17313E", textDecoration: "none"}}>Aftercare</a>
          </span>
        </span>
      </div>
    </footer>
  );
}

function SocialDot({ name }) {
  return (
    <a href="#" style={{
      width: 38, height: 38, borderRadius: "50%",
      background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
      transition: "background 200ms",
    }}
    onMouseOver={e => e.currentTarget.style.background = "#9CA68B"}
    onMouseOut={e => e.currentTarget.style.background = "#fff"}>
      <img src={`../../assets/icons/${name}.svg`} width="16" height="16" alt=""/>
    </a>
  );
}

Object.assign(window, { Footer });
