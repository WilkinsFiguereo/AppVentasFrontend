"use client";

import React, { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, width = 480, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "modalOverlayIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes modalOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modalPanelIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-input input,
        .modal-input select,
        .modal-input textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1.5px solid #2a2d3a;
          background: #181b26;
          color: #e8eaf0;
          font-size: 14px;
          outline: none;
          transition: border-color 0.18s;
        }
        .modal-input input:focus,
        .modal-input select:focus,
        .modal-input textarea:focus {
          border-color: #6c63ff;
        }
        .btn-primary {
          padding: 9px 22px;
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, #6c63ff, #4f46e5);
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.12s;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-secondary {
          padding: 9px 22px;
          border-radius: 8px;
          border: 1.5px solid #2a2d3a;
          background: transparent;
          color: #9a9db0;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .btn-secondary:hover { border-color: #6c63ff; color: #e8eaf0; }
      `}</style>

      <div
        className="modal-input"
        style={{
          width: "100%",
          maxWidth: width,
          background: "#12141f",
          borderRadius: 16,
          border: "1px solid #2a2d3a",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          animation: "modalPanelIn 0.22s cubic-bezier(0.34, 1.2, 0.64, 1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px 16px",
            borderBottom: "1px solid #1e2030",
          }}
        >
          {title && (
            <h2
              style={{
                margin: 0,
                fontSize: 17,
                fontWeight: 700,
                color: "#e8eaf0",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "#5a5d72",
              cursor: "pointer",
              padding: 4,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#e8eaf0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#5a5d72")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px 24px 24px" }}>{children}</div>
      </div>
    </div>
  );
}