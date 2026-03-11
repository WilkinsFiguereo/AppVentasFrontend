// app/src/features/product-detail/components/Gallery.tsx
"use client";

import { T } from "../theme/tokens";
import { useGallery } from "../hooks/useGallery";

export default function Gallery({ images }: { images: string[] }) {
  const { main, setMain } = useGallery(images);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "4/3", background: T.bg, border: `1px solid ${T.border}`, position: "relative" }}>
        <img
          src={images[main]}
          alt="product"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity .3s" }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(8px)",
            borderRadius: 8,
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            color: T.sub,
            fontFamily: "'Sora',sans-serif",
            border: `1px solid ${T.border}`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7 1h4v4M5 7 1 11M1 7v4h4" stroke={T.sub} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Ver en grande
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMain(i)}
            style={{
              flex: 1,
              aspectRatio: "1",
              borderRadius: 10,
              overflow: "hidden",
              border: `2px solid ${i === main ? T.accentMid : T.border}`,
              padding: 0,
              cursor: "pointer",
              background: T.bg,
              transition: "border-color .15s",
            }}
          >
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>
    </div>
  );
}
