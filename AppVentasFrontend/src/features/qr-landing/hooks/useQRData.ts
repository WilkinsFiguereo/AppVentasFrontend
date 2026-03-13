/* ═══════════════════════════════════════════════════════
   HOOK: useQRData
   Location: src/features/qr-landing/hooks/useQRData.ts
═══════════════════════════════════════════════════════ */

import { useState, useEffect } from "react";
import type { QRData, Product } from "../types";

const API_BASE = "http://localhost:8009";

interface UseQRDataResult {
  qrData: QRData | null;
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Mapea un producto de serialize_for_api al tipo Product del frontend
function mapProduct(p: any): Product {
  return {
    id:          p.id,
    name:        p.name,
    category:    p.category ?? "General",
    img:         p.image_url
                   ? `${API_BASE}${p.image_url}`
                   : "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80&fit=crop",
    price:       p.price ?? 0,
    oldPrice:    p.old_price ?? null,
    rating:      p.rating ?? 4.5,
    reviews:     p.reviews ?? 0,
    badge:       p.badge ?? null,
    highlighted: p.highlighted ?? false,
    desc:        p.description ?? "",
  };
}

// Mapea la respuesta de /api/user/:id/selection al tipo QRData
function mapQRData(selection: any): QRData {
  const u = selection.user ?? {};
  return {
    promoter: {
      name:     u.name     ?? "Asesor Comercial",
      initials: u.name
                  ? u.name.split(" ").map((w: string) => w[0]).join("").slice(0, 3).toUpperCase()
                  : "AC",
      role:     u.role     ?? "Asesor Comercial",
      company:  u.company  ?? "NexusStore",
      phone:    u.phone    ?? "",
      email:    u.email    ?? "",
      photo:    u.photo
                  ? `${API_BASE}${u.photo}`
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop",
      badge:    u.badge    ?? "Asesor Verificado",
    },
    // La primera categoría seleccionada se usa como "categoría principal"
    category: {
      id:      selection.categories?.[0]?.id?.toString() ?? "general",
      name:    selection.categories?.[0]?.name ?? "Productos Seleccionados",
      tagline: "Selección personalizada para ti",
    },
    campaign: {
      code:       "NEXUS25",
      discount:   15,
      validUntil: "31 de diciembre 2026",
    },
    qrId:      `QR-${selection.id}`,
    scannedAt: new Date().toISOString(),
  };
}

// fetch con timeout — nunca se queda colgado
async function fetchWithTimeout(url: string, ms = 10000): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    return res;
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === "AbortError")
      throw new Error(`Timeout: la API no respondió en ${ms / 1000}s`);
    throw new Error(
      `No se pudo conectar con la API (${err.message}). ¿Está corriendo Odoo en ${API_BASE}?`
    );
  }
}

export function useQRData(promoterId: string): UseQRDataResult {
  const [qrData,   setQrData]   = useState<QRData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    if (!promoterId) {
      setError("No se proporcionó un ID de promotor en la URL.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        // ── 1. Selección del promotor ──────────────────────────
        console.log(`[QR] GET /api/user/${promoterId}/selection`);
        const selRes = await fetchWithTimeout(`${API_BASE}/api/user/${promoterId}/selection`);

        if (!selRes.ok)
          throw new Error(`API error ${selRes.status}: ${selRes.statusText}`);

        const selJson = await selRes.json();
        console.log("[QR] selection response →", selJson);

        if (selJson.success === false)
          throw new Error(selJson.message ?? "La API devolvió success: false");

        // Soporta { success, data: {...} }  y  respuesta directa
        const selection: any = selJson.data ?? selJson;

        const mapped = mapQRData(selection);

        // ── 2. Productos directos del promotor ─────────────────
        // serialize_for_api devuelve "products" como array de objetos completos
        const selectedProducts: Product[] = Array.isArray(selection.products)
          ? selection.products.map(mapProduct)
          : [];

        console.log("[QR] productos directos →", selectedProducts.length);

        // ── 3. Productos de las categorías seleccionadas ───────
        const categoryIds: number[] = Array.isArray(selection.categories)
          ? selection.categories.map((c: any) => (typeof c === "object" ? c.id : c))
          : [];

        console.log("[QR] category IDs →", categoryIds);

        let categoryProducts: Product[] = [];

        if (categoryIds.length > 0) {
          const fetches = categoryIds.map((catId) =>
            fetchWithTimeout(`${API_BASE}/api/products?category_id=${catId}`)
              .then((r) => r.json())
              .then((json) => {
                console.log(`[QR] productos categoría ${catId} →`, json);
                // Soporta { data: [...] }, { products: [...] } o array directo
                const items = json.data ?? json.products ?? (Array.isArray(json) ? json : []);
                return items.map(mapProduct);
              })
              .catch((err) => {
                console.warn(`[QR] falló categoría ${catId}:`, err);
                return [];
              })
          );
          categoryProducts = (await Promise.all(fetches)).flat();
        }

        // ── 4. Merge sin duplicados ────────────────────────────
        const seen = new Set(selectedProducts.map((p) => p.id));
        const allProducts = [
          ...selectedProducts,
          ...categoryProducts.filter((p) => !seen.has(p.id)),
        ];

        console.log("[QR] total productos →", allProducts.length);

        if (!cancelled) {
          setQrData(mapped);
          setProducts(allProducts);
        }
      } catch (err: any) {
        console.error("[QR] error →", err);
        if (!cancelled) setError(err.message ?? "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [promoterId]);

  return { qrData, products, loading, error };
}