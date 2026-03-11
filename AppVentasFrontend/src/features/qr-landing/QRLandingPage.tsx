/* ═══════════════════════════════════════════════════════
   MAIN PAGE: QR Landing
   Location: src/features/qr-landing/QRLandingPage.tsx
   
   Esta es la página principal que ensambla todas las secciones.
   En producción, los datos vendrían de URL params o API:
   - URL: /qr?promoter=MTZ&category=software&campaign=SCAN25
═══════════════════════════════════════════════════════ */

"use client";


import Navbar from "../home/sections/Navbar/Navbar";
import { Header } from "./sections/Header";
import { PromoterHero } from "./sections/PromoterHero";
import { CampaignBanner } from "./sections/CampaignBanner";
import { TrustBadges } from "./sections/TrustBadges";
import { ProductCard } from "./sections/ProductCard";
import { ContactCTA } from "./sections/ContactCTA";
import { Footer } from "./sections/Footer";
import { QR_DATA, PRODUCTS } from "./data/mockData";
import { tokens } from "./theme/tokens";

export default function QRLandingPage() {
  // En producción, estos datos vendrían de:
  // const params = new URLSearchParams(window.location.search);
  // const data = await fetchQRData(params.get('qrId'));

  const { promoter, category, campaign, qrId } = QR_DATA;

  // Separar productos destacados de regulares
  const highlightedProducts = PRODUCTS.filter((p) => p.highlighted);
  const regularProducts = PRODUCTS.filter((p) => !p.highlighted);

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
        {/* Hero con info del promotor */}
        <PromoterHero promoter={promoter} category={category} campaign={campaign} />

        {/* Banner de campaña con código */}
        <div style={{ marginTop: 28 }}>
          <CampaignBanner campaign={campaign} />
        </div>

        {/* Trust badges */}
        <div style={{ marginTop: 28 }}>
          <TrustBadges />
        </div>

        {/* Productos destacados */}
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
                Más opciones
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
                Otros productos que te pueden interesar
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
        <ContactCTA promoter={promoter} />

        {/* Footer */}
        <Footer qrId={qrId} />
      </main>
    </>
  );
}