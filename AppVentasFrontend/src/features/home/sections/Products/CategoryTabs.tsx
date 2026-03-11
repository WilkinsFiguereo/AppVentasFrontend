// src/features/home/sections/Products/CategoryTabs.tsx
"use client";

import { T } from "../../theme/tokens";

export default function CategoryTabs({
  active,
  set,
  categories,
}: {
  active: string;
  set: (v: string) => void;
  categories: string[];
}) {
  return (
    <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.border}`, marginBottom: 24 }}>
      {categories.map((c) => {
        const on = c === active;
        return (
          <button
            key={c}
            onClick={() => set(c)}
            style={{
              padding: "9px 15px",
              border: "none",
              background: "transparent",
              fontSize: 13,
              fontWeight: on ? 600 : 500,
              color: on ? T.accent : T.sub,
              cursor: "pointer",
              position: "relative",
              transition: "color .15s",
            }}
          >
            {c}
            {on ? (
              <span
                style={{
                  position: "absolute",
                  bottom: -1,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: T.accent,
                  borderRadius: "2px 2px 0 0",
                }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}