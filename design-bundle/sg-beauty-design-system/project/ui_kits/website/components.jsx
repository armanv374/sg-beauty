// ─────────────────────────────────────────────────────────
// SG Beauty — primitive components
// Buttons, inputs, eyebrow, section header, icon-wrappers.
// All globals — see Object.assign(window, ...) at the bottom.
// ─────────────────────────────────────────────────────────

const { useState, useEffect, useRef } = React;

// ── Icon ────────────────────────────────────────────────
function Icon({ name, size = 18, color = "currentColor", style }) {
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", width: size, height: size, color, ...style }}>
      <img src={`../../assets/icons/${name}.svg`} alt="" style={{ width: "100%", height: "100%", filter: "var(--icon-filter, none)" }} />
    </span>
  );
}

// Inline-SVG icon (currentColor) for one-offs Lucide-style.
// We only ship glyphs that are absent from the Figma set (eye / sparkle / calendar / scissors / heart).
function GlyphIcon({ name, size = 18, stroke = 1.6 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "eye") return <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
  if (name === "sparkle") return <svg {...common}><path d="M12 3l1.8 5.5L19 10l-5.2 1.5L12 17l-1.8-5.5L5 10l5.2-1.5z"/><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>;
  if (name === "calendar") return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
  if (name === "heart") return <svg {...common}><path d="M12 21s-7-4.5-9.5-9C.7 8.5 3 5 6.5 5 8.7 5 10.8 6.4 12 8c1.2-1.6 3.3-3 5.5-3C21 5 23.3 8.5 21.5 12 19 16.5 12 21 12 21z"/></svg>;
  if (name === "scissors") return <svg {...common}><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/></svg>;
  if (name === "leaf") return <svg {...common}><path d="M11 20A7 7 0 0 1 9.8 6.3C15.5 1 21 2 21 2s1 5.5-4.3 11.2A7 7 0 0 1 11 20z"/><path d="M2 22s2-3 5.5-3.5"/></svg>;
  return null;
}

// ── Button ──────────────────────────────────────────────
function Button({ children, variant = "primary", size = "md", onClick, icon, disabled, type = "button", style }) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 14, iconSize: 12 },
    md: { padding: "10px 22px", fontSize: 15, iconSize: 14 },
    lg: { padding: "14px 28px", fontSize: 16, iconSize: 16 },
  }[size];

  const variants = {
    primary:   { background: "#415E72", color: "#fff", border: "1px solid transparent" },
    sage:      { background: "#9CA68B", color: "#fff", border: "1px solid transparent" },
    dark:      { background: "#17313E", color: "#fff", border: "1px solid transparent" },
    secondary: { background: "transparent", color: "#17313E", border: "1px solid #17313E" },
    ghost:     { background: "transparent", color: "#17313E", border: "1px solid transparent" },
    cream:     { background: "#FFF3E4", color: "#17313E", border: "1px solid #EED6C4" },
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`sg-btn sg-btn--${variant}`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "Inter, sans-serif", fontWeight: 700, lineHeight: 1,
        borderRadius: 999, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 200ms cubic-bezier(.22,.61,.36,1)",
        ...sizes, ...variants, ...style,
      }}
    >
      {children}
      {icon !== false && (
        <span style={{ display: "inline-flex", width: sizes.iconSize, height: sizes.iconSize }}>
          <svg viewBox="0 0 6.391 11.095" fill="currentColor" width="100%" height="100%"><path d="M 6.147 4.948 C 6.303 5.104 6.391 5.316 6.391 5.537 C 6.391 5.758 6.303 5.97 6.147 6.126 L 1.433 10.841 C 1.276 10.998 1.065 11.082 0.847 11.08 C 0.628 11.078 0.419 10.99 0.265 10.836 C 0.11 10.681 0.022 10.472 0.021 10.254 C 0.019 10.035 0.103 9.825 0.254 9.668 L 4.379 5.537 L 0.254 1.412 C 0.103 1.255 0.019 1.045 0.021 0.826 C 0.022 0.608 0.11 0.399 0.265 0.244 C 0.419 0.09 0.628 0.002 0.847 0 C 1.065 -0.002 1.276 0.082 1.433 0.234 L 6.147 4.948 Z" fillRule="evenodd"/></svg>
        </span>
      )}
    </button>
  );
}

// ── Input ───────────────────────────────────────────────
function Input({ placeholder, type = "text", value, onChange, error, disabled, style }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "12px 16px",
        borderRadius: "10px 10px 16px 16px",
        fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500,
        color: "#17313E",
        background: disabled ? "#f3f0ea" : "rgba(23,49,62,0.04)",
        border: `1px solid ${error ? "#D66363" : "rgba(23,49,62,0.4)"}`,
        outline: "none",
        transition: "all 200ms cubic-bezier(.22,.61,.36,1)",
        ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = "#6F7B61"; e.target.style.boxShadow = "0 0 0 3px rgba(156,166,139,0.35)"; }}
      onBlur={(e) => { e.target.style.borderColor = error ? "#D66363" : "rgba(23,49,62,0.4)"; e.target.style.boxShadow = "none"; }}
    />
  );
}

function Textarea({ placeholder, value, onChange, rows = 5, style }) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      style={{
        width: "100%", boxSizing: "border-box",
        padding: "12px 16px",
        borderRadius: 16,
        fontFamily: "Inter, sans-serif", fontSize: 15, fontWeight: 500,
        color: "#17313E", background: "rgba(23,49,62,0.04)",
        border: "1px solid rgba(23,49,62,0.4)", outline: "none", resize: "vertical",
        transition: "all 200ms cubic-bezier(.22,.61,.36,1)",
        ...style,
      }}
      onFocus={(e) => { e.target.style.borderColor = "#6F7B61"; e.target.style.boxShadow = "0 0 0 3px rgba(156,166,139,0.35)"; }}
      onBlur={(e) => { e.target.style.borderColor = "rgba(23,49,62,0.4)"; e.target.style.boxShadow = "none"; }}
    />
  );
}

// ── Eyebrow + SectionHeader ─────────────────────────────
function Eyebrow({ children, color = "#6F7B61", style }) {
  return (
    <span style={{
      fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 12,
      letterSpacing: "0.18em", textTransform: "uppercase",
      color, ...style,
    }}>{children}</span>
  );
}

function SectionHeader({ eyebrow, title, sub, align = "center", style }) {
  return (
    <header style={{
      display: "flex", flexDirection: "column", gap: 10,
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align, maxWidth: 600,
      margin: align === "center" ? "0 auto" : undefined,
      ...style,
    }}>
      {eyebrow && <Eyebrow color="#6B4F4F">{eyebrow}</Eyebrow>}
      <h2 style={{
        margin: 0,
        fontFamily: "'Playfair Display', Georgia, serif",
        fontWeight: 600, fontSize: 40, lineHeight: 1.15,
        color: "#17313E", letterSpacing: "-0.01em", textWrap: "balance",
      }}>{title}</h2>
      {sub && (
        <p style={{
          margin: "4px 0 0",
          fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 16,
          lineHeight: 1.55, color: "#6B4F4F", maxWidth: 520, textWrap: "pretty",
        }}>{sub}</p>
      )}
    </header>
  );
}

Object.assign(window, { Icon, GlyphIcon, Button, Input, Textarea, Eyebrow, SectionHeader });
