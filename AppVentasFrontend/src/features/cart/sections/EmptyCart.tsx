import { tokens } from "../theme/tokens";

export function EmptyCart() {
  return (
    <div style={{ textAlign: "center", padding: "80px 20px", background: tokens.surface, borderRadius: 14, border: `1px solid ${tokens.border}` }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: tokens.bg,
          margin: "0 auto 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          fontWeight: 700,
          color: tokens.sub,
          fontFamily: "'Sora',sans-serif",
        }}
      >
        Cart
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: tokens.text, fontFamily: "'Sora',sans-serif", marginBottom: 8, letterSpacing: "-0.3px" }}>
        Tu carrito esta vacio
      </h2>
      <p style={{ fontSize: 14, color: tokens.sub, fontFamily: "'Sora',sans-serif", marginBottom: 24, lineHeight: 1.6 }}>
        Agrega productos para comenzar tu compra
      </p>
      <a
        href="/navigation/home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "12px 24px",
          borderRadius: 9,
          background: tokens.accent,
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          fontFamily: "'Sora',sans-serif",
          transition: "background .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1D4ED8")}
        onMouseLeave={(e) => (e.currentTarget.style.background = tokens.accent)}
      >
        Ver productos
      </a>
    </div>
  );
}
