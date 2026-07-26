// SG Beauty — Photo divider strips between sections
function Divider({ image = "../../assets/images/texture-shell.jpg", scrim = 0.45, height = 180 }) {
  return (
    <div style={{
      width: "100%", height,
      backgroundImage: `linear-gradient(rgba(111,123,97,${scrim}), rgba(111,123,97,${scrim})), url(${image})`,
      backgroundSize: "cover", backgroundPosition: "center",
      backgroundBlendMode: "multiply",
    }}/>
  );
}

function GalleryStrip() {
  // five small lifestyle images at the bottom; we recycle our two photos in 5 slots
  const imgs = [
    "../../assets/images/portrait-1.jpg",
    "../../assets/images/hero-portrait.png",
    "../../assets/images/portrait-1.jpg",
    "../../assets/images/hero-portrait.png",
    "../../assets/images/portrait-1.jpg",
  ];
  return (
    <div id="gallery" style={{ background: "#9CA68B", padding: 16, display: "flex", gap: 8 }}>
      {imgs.map((src, i) => (
        <div key={i} style={{
          flex: 1, aspectRatio: "16/9",
          background: `url(${src}) center/cover`,
          borderRadius: 4,
        }}/>
      ))}
    </div>
  );
}

Object.assign(window, { Divider, GalleryStrip });
