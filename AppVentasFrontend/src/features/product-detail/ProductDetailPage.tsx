// app/src/features/product-detail/ProductDetailPage.tsx  (diff: líneas cambiadas marcadas con ◄)
"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "../home/sections/Navbar/Navbar";    // ◄ sin cambio de import
import Gallery from "./components/Gallery";
import PurchasePanel from "./components/PurchasePanel";

import ProductHeader from "./sections/ProductHeader";
import FeaturesSection from "./sections/FeaturesSection";
import SpecsSection from "./sections/SpecsSection";
import ReviewsSection from "./sections/ReviewsSection";    // ◄ sin cambio de import
import RelatedSection from "./sections/RelatedSection";

import Divider from "./ui/Divider";
import { T } from "./theme/tokens";

// ◄ ELIMINADO: import { REVIEWS_DATA } from "./data/reviews.mock";
import type { ProductDetail, RelatedProduct } from "./types/product-detail.types";
import { CART_UPDATED_EVENT, getCartItems } from "../cart/data/cartStorage";

type ApiProductItem = {
  id: number;
  name: string;
  default_code?: string;
  list_price?: number;
  standard_price?: number;
  description?: string;
  description_sale?: string;
  company_name?: string;
  active?: boolean;
};

type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8009").replace(/\/$/, "");

function getCartCount() {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
}

function buildImages(productId: number) {
  return [
    `https://picsum.photos/seed/product-${productId}-1/900/700`,
    `https://picsum.photos/seed/product-${productId}-2/900/700`,
    `https://picsum.photos/seed/product-${productId}-3/900/700`,
    `https://picsum.photos/seed/product-${productId}-4/900/700`,
  ];
}

function parseFeatures(item: ApiProductItem): string[] {
  const source = (item.description_sale || item.description || "").trim();
  if (!source) {
    return [
      "Producto disponible para compra inmediata",
      "Detalle y precio sincronizados con Odoo",
      "Actualizaciones automaticas desde inventario",
      "Soporte para catalogo online",
    ];
  }

  const parts = source
    .split(/\r?\n|\.|;|\u2022|-\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (parts.length ? parts : [source]).slice(0, 8);
}

function mapToProductDetail(item: ApiProductItem): ProductDetail {
  const price = Number(item.list_price ?? 0);
  const standard = Number(item.standard_price ?? 0);
  const oldPrice = standard > price ? standard : Math.max(price + price * 0.2, price + 1);
  const annualPrice = Number((price * 0.85).toFixed(2));
  const features = parseFeatures(item);
  const category = (item.default_code || "Comidas").trim() || "Comidas";
  const tagline = (item.description_sale || item.description || `Producto ${item.name}`).trim();

  return {
    id: item.id,
    name: item.name || "Producto sin nombre",
    tagline,
    category,
    badge: price < oldPrice ? "Oferta" : "Destacado",
    rating: 0,           // ◄ se reemplaza con dato real desde ReviewsSection
    totalReviews: 0,     // ◄ idem
    price,
    oldPrice,
    annualPrice,
    images: buildImages(item.id),
    features,
    specs: [
      { label: "Codigo", value: item.default_code || `PRD-${item.id}` },
      { label: "Empresa", value: item.company_name || "General" },
      { label: "Estado", value: item.active ? "Activo" : "Inactivo" },
      { label: "Precio lista", value: `$${price}` },
      { label: "Precio referencia", value: `$${oldPrice}` },
      { label: "Origen", value: "Odoo" },
    ],
    ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, // ◄ manejado por ReviewsSection
  };
}

function mapToRelated(item: ApiProductItem): RelatedProduct {
  return {
    id: item.id,
    name: item.name || "Producto",
    cat: (item.default_code || "Comidas").trim() || "Comidas",
    price: Number(item.list_price ?? 0),
    rating: 4.6,
    img: `https://picsum.photos/seed/related-${item.id}/300/300`,
  };
}

const SESSION_KEYS = ["access_token", "auth_token", "token", "refresh_token"];

function hasSessionToken() {
  if (typeof window === "undefined") return false;
  return SESSION_KEYS.some((key) => Boolean(localStorage.getItem(key)));
}

export default function ProductDetailPage({ productId }: { productId: number | null }) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(() => hasSessionToken());

  useEffect(() => {
    setCartCount(getCartCount());

    const syncCart = () => setCartCount(getCartCount());
    window.addEventListener("storage", syncCart);
    window.addEventListener(CART_UPDATED_EVENT, syncCart as EventListener);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener(CART_UPDATED_EVENT, syncCart as EventListener);
    };
  }, []);

  useEffect(() => {
    const syncSession = () => setIsLoggedIn(hasSessionToken());
    window.addEventListener("storage", syncSession);
    return () => window.removeEventListener("storage", syncSession);
  }, []);

  useEffect(() => {
    let cancelled = false;
    
    const load = async () => {
      if (!productId) {
        setError("ID de producto invalido");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const productRes = await fetch(`${API_BASE_URL}/api/product/${productId}`, {
          method: "GET",
          cache: "no-store",
        });
        const productBody = (await productRes.json()) as ApiResponse<ApiProductItem>;

        if (!productRes.ok || !productBody.success || !productBody.data) {
          throw new Error(productBody.message || `Error al cargar detalle (${productRes.status})`);
        }

        const mapped = mapToProductDetail(productBody.data);

        const listRes = await fetch(`${API_BASE_URL}/api/product/list?limit=8&offset=0`, {
          method: "GET",
          cache: "no-store",
        });
        const listBody = (await listRes.json()) as ApiResponse<{ items?: ApiProductItem[] }>;

        const relatedItems = (listBody.data?.items || [])
          .filter((i) => i.id !== productId)
          .slice(0, 4)
          .map(mapToRelated);

        if (!cancelled) {
          setProduct(mapped);
          setRelated(relatedItems);
        }
      } catch (err) {
        if (!cancelled) {
          setProduct(null);
          setRelated([]);
          setError(err instanceof Error ? err.message : "No se pudo cargar el detalle del producto");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  const content = useMemo(() => {
    if (loading) {
      return <p style={{ fontSize: 14, color: T.sub }}>Cargando producto...</p>;
    }

    if (!product) {
      return <p style={{ fontSize: 14, color: "#B91C1C" }}>{error || "Producto no encontrado"}</p>;
    }

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "start" }}>
        <div>
          <Gallery images={product.images} />
          <ProductHeader p={product} />
          <Divider />
          <FeaturesSection features={product.features} />
          <Divider />
          <SpecsSection specs={product.specs} />
          <Divider />
          {/* ◄ productId en lugar de p+reviews mock */}
          <ReviewsSection productId={product.id} isLoggedIn={isLoggedIn} />
        </div>

        <div>
          <PurchasePanel product={product} isLoggedIn={isLoggedIn} />
          <RelatedSection related={related} />
        </div>
      </div>
    );
  }, [loading, product, error, related, isLoggedIn]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:${T.bg}; -webkit-font-smoothing:antialiased; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:${T.border}; border-radius:3px; }
      `}</style>

      <Navbar cart={cartCount} />
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 32px 64px" }}>{content}</main>
    </>
  );
}
