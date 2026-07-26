// SG Beauty — Contact
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", interest: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="contact" style={{ background: "#E8ECDF", padding: "100px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <SectionHeader
          eyebrow="Contact us"
          title="Get in touch."
          sub="Book an appointment, ask a question, or get a recommendation. We answer within the day."
        />

        <div style={{
          marginTop: 56, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40,
          alignItems: "start",
        }}>
          {/* Form */}
          <form onSubmit={submit} style={{
            background: "#FFF3E4",
            border: "1px solid #EED6C4",
            borderRadius: 24, padding: 32,
            display: "flex", flexDirection: "column", gap: 16,
            minHeight: 420,
          }}>
            <span style={{
              fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "#6B4F4F",
            }}>Send us a message</span>
            {submitted ? (
              <div style={{
                display: "flex", flexDirection: "column", gap: 12, padding: "32px 0",
                alignItems: "flex-start",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: "50%", background: "#9CA68B",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: 26, color: "#17313E"}}>Thanks {form.name || "—"}.</h3>
                <p style={{margin: 0, fontFamily: "Inter, sans-serif", fontSize: 15, color: "#6B4F4F", maxWidth: 420}}>We'll be in touch within the day to confirm your slot. Check your inbox for a confirmation.</p>
                <button type="button" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", interest: "", phone: "", message: "" }); }} style={{
                  marginTop: 12, padding: 0, background: "transparent", border: "none",
                  fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: "#6F7B61", cursor: "pointer",
                  textDecoration: "underline", textUnderlineOffset: 4,
                }}>Send another message</button>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <Input placeholder="Your name" value={form.name} onChange={handle("name")}/>
                  <Input placeholder="Email address" type="email" value={form.email} onChange={handle("email")}/>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <Select placeholder="Interested in…" value={form.interest} onChange={handle("interest")} options={["Classic Set", "Hybrid Set", "Volume Set", "Lash Lift & Tint", "Brow Lamination", "Consultation"]}/>
                  <Input placeholder="Phone number" type="tel" value={form.phone} onChange={handle("phone")}/>
                </div>
                <Textarea placeholder="Anything we should know? (eye sensitivity, prior work, the look you want…)" value={form.message} onChange={handle("message")} rows={4}/>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
                  <Button type="submit" variant="dark" size="lg">Send message</Button>
                </div>
              </>
            )}
          </form>

          {/* Contact cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <BenefitCard
              icon={<img src="../../assets/icons/phone.svg" width="18" height="18"/>}
              value="(206) 555-0184"
              title="Call us"
              body="Tuesday – Saturday, 10:00 AM – 7:00 PM Pacific. We pick up if we're not mid-set."
            />
            <BenefitCard
              icon={<img src="../../assets/icons/map-pin.svg" width="18" height="18"/>}
              value="1216 19th Ave E, Seattle"
              title="Visit the studio"
              body="Capitol Hill · two blocks from Volunteer Park. Street parking is easy after 9 AM."
            />
            <BenefitCard
              icon={<img src="../../assets/icons/instagram.svg" width="18" height="18"/>}
              value="@sgbeauty.lashes"
              title="See recent work"
              body="Our gallery is on Instagram — DM us a reference photo and we'll match the shape."
              accent="lilac"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Select({ placeholder, value, onChange, options = [] }) {
  return (
    <div style={{ position: "relative" }}>
      <select value={value} onChange={onChange} style={{
        width: "100%", boxSizing: "border-box",
        padding: "12px 38px 12px 16px",
        borderRadius: "10px 10px 16px 16px",
        fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500,
        color: value ? "#17313E" : "rgba(23,49,62,0.55)",
        background: "rgba(23,49,62,0.04)",
        border: "1px solid rgba(23,49,62,0.4)", outline: "none",
        appearance: "none", WebkitAppearance: "none",
      }}>
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o} style={{color: "#17313E"}}>{o}</option>)}
      </select>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#17313E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><polyline points="6 9 12 15 18 9"/></svg>
    </div>
  );
}

function BenefitCard({ icon, value, title, body, accent = "lilac" }) {
  const halo = accent === "lilac" ? "rgba(188,160,199,0.22)" : "rgba(156,166,139,0.22)";
  return (
    <article style={{
      borderRadius: 16, background: "#FFF3E4",
      border: "1px solid rgba(23,49,62,0.16)",
      boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      padding: 18,
      display: "flex", flexDirection: "column", gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 17, background: halo,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          color: "#6F7B61", flexShrink: 0,
        }}>{icon}</div>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600, fontSize: 20,
          color: "#17313E",
        }}>{value}</span>
      </div>
      <span style={{
        fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14,
        color: "#17313E", marginTop: 4,
      }}>{title}</span>
      <p style={{
        margin: 0, fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 13.5,
        lineHeight: 1.55, color: "#6B4F4F",
      }}>{body}</p>
    </article>
  );
}

Object.assign(window, { Contact, BenefitCard });
