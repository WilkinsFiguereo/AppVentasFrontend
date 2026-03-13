/* ═══════════════════════════════════════════════════════
   MAIN PAGE: QR Landing (DYNAMIC)
   Location: src/features/qr-landing/QRLandingPage.tsx
   
   Recibe `promoterId` desde la ruta: /qr/[id]
   Consume:
     - GET /api/user/:id/selection  → datos del promotor + productos + categorías asignadas
     - GET /api/products?category_id=X → productos por categoría
═══════════════════════════════════════════════════════ */

"use client";

import Navbar from "../home/sections/Navbar/Navbar";
import { PromoterHero } from "./sections/PromoterHero";
import { CampaignBanner } from "./sections/CampaignBanner";
import { TrustBadges } from "./sections/TrustBadges";
import { ProductCard } from "./sections/ProductCard";
import { ContactCTA } from "./sections/ContactCTA";
import { Footer } from "./sections/Footer";
import { tokens } from "./theme/tokens";
import { useQRData } from "./hooks/useQRData";

/* ── Skeleton loader ── */
function SkeletonBlock({ h = 200, radius = 12 }: { h?: number; radius?: number }) {
  return (
    <div
      style={{
        height: h,
        borderRadius: radius,
        background: `linear-gradient(90deg, ${tokens.border} 25%, ${tokens.accentSoft} 50%, ${tokens.border} 75%)`,
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

function LoadingSkeleton() {
  return (
    <>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <SkeletonBlock h={260} />
        <SkeletonBlock h={80} />
        <SkeletonBlock h={72} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {[1, 2, 3].map((i) => <SkeletonBlock key={i} h={340} />)}
        </div>
      </div>
    </>
  );
}

/* ── Error state ── */
function ErrorState({ message, promoterId }: { message: string; promoterId: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 32px",
        background: tokens.surface,
        borderRadius: 16,
        border: `1px solid ${tokens.border}`,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: tokens.text,
          fontFamily: "'Sora',sans-serif",
          marginBottom: 8,
        }}
      >
        No se pudo cargar la información
      </h2>
      <p
        style={{
          fontSize: 14,
          color: tokens.sub,
          fontFamily: "'Sora',sans-serif",
          marginBottom: 6,
        }}
      >
        {message}
      </p>
      <p style={{ fontSize: 12, color: tokens.border, fontFamily: "monospace" }}>
        Promotor ID: {promoterId}
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */

interface QRLandingPageProps {
  promoterId: string;
}

export default function QRLandingPage({ promoterId }: QRLandingPageProps) {
  const { qrData, products, loading, error } = useQRData(promoterId);

  const highlightedProducts = products.filter((p) => p.highlighted);
  const regularProducts = products.filter((p) => !p.highlighted);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:${tokens.bg}; -webkit-font-smoothing:antialiased; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:${tokens.border}; border-radius:3px; }
      `}</style>

      <Navbar cart={3} />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 28px 48px" }}>

        {/* ── LOADING ── */}
        {loading && <LoadingSkeleton />}

        {/* ── ERROR ── */}
        {!loading && error && <ErrorState message={error} promoterId={promoterId} />}

        {/* ── CONTENT ── */}
        {!loading && !error && qrData && (
          <>
            {/* Hero con info del promotor */}
            <PromoterHero
              promoter={qrData.promoter}
              category={qrData.category}
              campaign={qrData.campaign}
            />

            {/* Banner de campaña con código */}
            <div style={{ marginTop: 28 }}>
              <CampaignBanner campaign={qrData.campaign} />
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: 28 }}>
              <TrustBadges />
            </div>

            {/* Productos sin encontrar */}
            {products.length === 0 && (
              <div
                style={{
                  marginTop: 48,
                  textAlign: "center",
                  padding: "60px 32px",
                  background: tokens.surface,
                  borderRadius: 14,
                  border: `1px solid ${tokens.border}`,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>📦</div>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: tokens.text,
                    fontFamily: "'Sora',sans-serif",
                  }}
                >
                  No hay productos asignados aún
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: tokens.sub,
                    fontFamily: "'Sora',sans-serif",
                    marginTop: 6,
                  }}
                >
                  Este asesor no tiene productos o categorías seleccionadas.
                </p>
              </div>
            )}

            {/* Productos destacados (highlighted) */}
            {highlightedProducts.length > 0 && (
              <section style={{ marginTop: 48 }}>
                <div style={{ marginBottom: 22 }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "2.2px",
                      textTransform: "uppercase",
                      color: tokens.accentMid,
                      marginBottom: 5,
                      fontFamily: "'Sora',sans-serif",
                    }}
                  >
                    Recomendación especial
                  </p>
                  <h2
                    style={{
                      fontSize: "clamp(18px, 2.5vw, 24px)",
                      fontWeight: 700,
                      color: tokens.text,
                      letterSpacing: "-0.4px",
                      fontFamily: "'Sora',sans-serif",
                    }}
                  >
                    La mejor opción para ti
                  </h2>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 20,
                  }}
                >
                  {highlightedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} isHighlighted />
                  ))}
                </div>
              </section>
            )}

            {/* Productos regulares */}
            {regularProducts.length > 0 && (
              <section style={{ marginTop: 48 }}>
                <div style={{ marginBottom: 22 }}>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "2.2px",
                      textTransform: "uppercase",
                      color: tokens.accentMid,
                      marginBottom: 5,
                      fontFamily: "'Sora',sans-serif",
                    }}
                  >
                    {highlightedProducts.length > 0 ? "Más opciones" : "Productos seleccionados"}
                  </p>
                  <h2
                    style={{
                      fontSize: "clamp(18px, 2.5vw, 24px)",
                      fontWeight: 700,
                      color: tokens.text,
                      letterSpacing: "-0.4px",
                      fontFamily: "'Sora',sans-serif",
                    }}
                  >
                    {highlightedProducts.length > 0
                      ? "Otros productos que te pueden interesar"
                      : `Selección de ${qrData.promoter.name.split(" ")[0]}`}
                  </h2>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 18,
                  }}
                >
                  {regularProducts.map((product) => (
                    <ProductCard key={product.id} product={product} isHighlighted={false} />
                  ))}
                </div>
              </section>
            )}

            {/* CTA de contacto */}
            <ContactCTA promoter={qrData.promoter} />

            {/* Footer */}
            <Footer qrId={qrData.qrId} />
          </>
        )}
      </main>
    </>
  );
}