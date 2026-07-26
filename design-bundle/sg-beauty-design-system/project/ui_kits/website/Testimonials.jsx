// SG Beauty — Testimonials
const TESTIMONIALS = [
  {
    quote: "The most natural set I've ever had. I'd been to four studios before SG and this is the only place I've come back to.",
    name: "Maya R.",
    set: "Hybrid · 3-week fill",
    stars: 5,
  },
  {
    quote: "Light as nothing, lasted the full four weeks. Worth every penny — booking my next appointment before I leave.",
    name: "Hailey K.",
    set: "Volume",
    stars: 5,
  },
  {
    quote: "I asked for something I could wear to work without looking made up. They nailed the shape on the first try.",
    name: "Priya S.",
    set: "Classic",
    stars: 5,
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="reviews" style={{
      background: "#9CA68B",
      padding: "100px 0",
      position: "relative",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          {/* dual comma motif */}
          <div style={{ display: "flex", marginBottom: 24, marginLeft: -4 }}>
            <QuoteGlyph/>
            <QuoteGlyph style={{ marginLeft: -10 }}/>
          </div>
          <Eyebrow color="rgba(255,243,228,0.85)" style={{ fontSize: 13 }}>Why clients trust us</Eyebrow>
          <p style={{
            margin: "16px 0 0",
            fontFamily: "Inter, sans-serif", fontSize: 18, lineHeight: 1.55,
            color: "#FFF3E4", maxWidth: 600, textWrap: "pretty",
          }}>
            Gentle, safe lash care with results that last. Here's what clients say after their first set.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} state={i === active ? "read" : "unread"} />
          ))}
        </div>

        {/* progress bar pagination */}
        <div style={{ display: "flex", gap: 12, marginTop: 40, maxWidth: 480 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              flex: i === active ? 1.5 : 1,
              height: 6, padding: 0,
              borderRadius: 999, border: "none",
              background: i === active ? "#FFF3E4" : "rgba(255,243,228,0.35)",
              cursor: "pointer", transition: "all 300ms ease",
            }} aria-label={`Show testimonial ${i+1}`}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteGlyph({ style }) {
  return (
    <svg width="44" height="44" viewBox="0 0 50 50" fill="#FFF3E4" style={style}>
      <path d="M9 28 Q9 18, 19 14 L19 18 Q14 21, 14 28 L19 28 L19 38 L9 38 Z"/>
      <path d="M27 28 Q27 18, 37 14 L37 18 Q32 21, 32 28 L37 28 L37 38 L27 38 Z"/>
    </svg>
  );
}

function TestimonialCard({ t, state }) {
  const isRead = state === "read";
  return (
    <article style={{
      borderRadius: 24, padding: "28px 32px",
      display: "flex", flexDirection: "column", gap: 22,
      background: isRead ? "rgba(23,49,62,0.32)" : "#FFF3E4",
      color: isRead ? "#FFF3E4" : "#17313E",
      minHeight: 280,
    }}>
      <blockquote style={{
        margin: 0,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 600, fontSize: 22, lineHeight: 1.3,
        color: isRead ? "#FFF3E4" : "#17313E",
      }}>"{t.quote}"</blockquote>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "url(../../assets/images/testimonial-avatar.jpg) center/cover",
          flexShrink: 0,
        }}/>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600, fontSize: 18,
            color: isRead ? "#fff" : "#17313E",
          }}>{t.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <div style={{ display: "flex", gap: 2, color: isRead ? "#FFF3E4" : "#C9A86B" }}>
              {Array.from({length: t.stars}).map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 14.269 13.628" fill="currentColor"><path d="M7.134 11.417L3.676 13.5C3.523 13.597 3.363 13.639 3.197 13.625C3.03 13.611 2.884 13.556 2.759 13.458C2.634 13.361 2.537 13.24 2.467 13.094C2.398 12.949 2.384 12.785 2.426 12.604L3.342 8.667L0.28 6.021C0.141 5.896 0.054 5.753 0.02 5.593C-0.015 5.433 -0.004 5.277 0.051 5.125C0.106 4.973 0.189 4.848 0.301 4.75C0.412 4.652 0.565 4.59 0.759 4.563L4.801 4.208L6.363 0.5C6.433 0.333 6.54 0.208 6.687 0.125C6.833 0.042 6.982 0 7.134 0C7.286 0 7.435 0.042 7.582 0.125C7.728 0.208 7.835 0.333 7.905 0.5L9.467 4.208L13.509 4.563C13.704 4.59 13.856 4.653 13.967 4.75C14.079 4.847 14.162 4.972 14.217 5.125C14.273 5.278 14.284 5.434 14.249 5.594C14.215 5.754 14.128 5.896 13.988 6.021L10.926 8.667L11.842 12.604C11.884 12.785 11.87 12.948 11.801 13.094C11.731 13.24 11.634 13.362 11.509 13.458C11.384 13.555 11.238 13.611 11.072 13.625C10.905 13.639 10.745 13.598 10.592 13.5L7.134 11.417Z"/></svg>
              ))}
            </div>
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500,
              color: isRead ? "rgba(255,243,228,0.85)" : "#6B4F4F",
            }}>· {t.set}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { Testimonials });
