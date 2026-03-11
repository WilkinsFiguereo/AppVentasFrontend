"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { colors, font, radius } from "../theme/tokens";

interface ModalProps {
  open:     boolean;
  onClose:  () => void;
  title:    string;
  children: React.ReactNode;
  width?:   number;
}

export function Modal({ open, onClose, title, children, width = 540 }: ModalProps) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position:       "fixed",
        inset:          0,
        background:     "rgba(15,23,42,.42)",
        backdropFilter: "blur(4px)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        zIndex:         1000,
        padding:        16,
        animation:      "bn-fade .18s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width:         "100%",
          maxWidth:      width,
          background:    colors.bg.secondary,
          borderRadius:  radius.xl,
          boxShadow:     "0 24px 80px rgba(15,23,42,.14), 0 0 0 1px rgba(0,0,0,.05)",
          animation:     "bn-slide .22s ease",
          maxHeight:     "90vh",
          display:       "flex",
          flexDirection: "column",
          overflow:      "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "18px 22px",
          borderBottom:   `1px solid ${colors.border}`,
          flexShrink:     0,
        }}>
          <span style={{ fontSize: font.size.md, fontWeight: font.weight.bold, color: colors.text.primary }}>
            {title}
          </span>
          <button
            onClick={onClose}
            style={{
              background:   "none",
              border:       "none",
              cursor:       "pointer",
              color:        colors.text.disabled,
              display:      "flex",
              padding:      4,
              borderRadius: radius.sm,
              transition:   "color .12s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.text.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.text.disabled)}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 22, overflowY: "auto", flexGrow: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
}