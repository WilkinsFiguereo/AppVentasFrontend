// app/src/features/home/HomePage.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "./sections/Navbar/Navbar";
import HeroSlider from "./sections/Hero/HeroSlider";
import ProductsSection from "./sections/Products/ProductsSection";
import BestSellersSection from "./sections/BestSellers/BestSellersSection";
import OffersSection from "./sections/Offers/OffersSection";
import ServicesSection from "./sections/Services/ServicesSection";
import Footer from "./sections/Footer/Footer";

import type { Product, Service } from "./types/home.types";
import { useCategoryFilter } from "./hooks/useCategoryFilter";
import { CART_UPDATED_EVENT, getCartItems } from "../cart/data/cartStorage";

type ApiProductItem = {
  id: number;
  name: string;
  default_code?: string;
  list_price?: number;
  standard_price?: number;
  description?: string;
  description_sale?: string;
  type?: string;
};

type ApiProductListResponse = {
  success?: boolean;
  message?: string;
  data?: {
    items?: ApiProductItem[];
  };
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8009").replace(/\/$/, "");
const TOKEN_STORAGE_KEYS = ["access_token", "token", "auth_token"];

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  for (const key of TOKEN_STORAGE_KEYS) {
    const value = window.localStorage.getItem(key);
    if (value) return value;
  }

  return null;
}

function getCartCount() {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
}

function mapApiProductToHomeProduct(item: ApiProductItem, index: number): Product {
  const price = Number(item.list_price ?? 0);
  const oldPrice = Number(item.standard_price ?? 0);
  const hasOffer = oldPrice > price;

  return {
    id: item.id,
    name: item.name || "Producto sin nombre",
    cat: (item.default_code || "General").trim() || "General",
    img: `https://picsum.photos/seed/product-${item.id}/600/420`,
    price,
    old: hasOffer ? oldPrice : null,
    rating: Number((4.4 + (index % 6) * 0.1).toFixed(1)),
    reviews: 120 + index * 37,
    badge: hasOffer ? "Oferta" : index < 4 ? "Mas vendido" : null,
  };
}

function mapApiProductToService(item: ApiProductItem, index: number): Service {
  const source = (item.description_sale || item.description || "Servicio disponible").trim();
  const desc = source.length > 120 ? `${source.slice(0, 117)}...` : source;

  const badges = ["Recomendado", "Premium", "Rapido", "Oferta"];

  return {
    id: item.id,
    title: item.name || "Servicio",
    desc,
    img: `https://picsum.photos/seed/service-${item.id}/900/560`,
    badge: badges[index % badges.length],
  };
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

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
    let cancelled = false;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getAccessToken();
        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}/api/product/list?limit=8&offset=0`, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        const body = (await response.json()) as ApiProductListResponse;

        if (!response.ok || !body.success) {
          throw new Error(body.message || `Error al cargar productos (${response.status})`);
        }

        const items = Array.isArray(body.data?.items) ? body.data.items : [];
        const mapped = items.map(mapApiProductToHomeProduct).slice(0, 8);

        if (!cancelled) {
          setProducts(mapped);
        }
      } catch (err) {
        if (!cancelled) {
          setProducts([]);
          setError(err instanceof Error ? err.message : "No se pudieron cargar los productos");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    const loadServices = async () => {
      setServicesLoading(true);
      setServicesError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/product/list?type=service&limit=8&offset=0`, {
          method: "GET",
          cache: "no-store",
        });

        const body = (await response.json()) as ApiProductListResponse;

        if (!response.ok || !body.success) {
          throw new Error(body.message || `Error al cargar servicios (${response.status})`);
        }

        const items = Array.isArray(body.data?.items) ? body.data.items : [];
        const mapped = items
          .filter((item) => (item.type || "").toLowerCase() === "service")
          .map(mapApiProductToService)
          .slice(0, 8);

        if (!cancelled) {
          setServices(mapped);
        }
      } catch (err) {
        if (!cancelled) {
          setServices([]);
          setServicesError(err instanceof Error ? err.message : "No se pudieron cargar los servicios");
        }
      } finally {
        if (!cancelled) {
          setServicesLoading(false);
        }
      }
    };

    loadProducts();
    loadServices();

    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => ["Todo", ...Array.from(new Set(products.map((p) => p.cat).filter(Boolean)))],
    [products],
  );

  const { cat, setCat, visible } = useCategoryFilter(products);

  useEffect(() => {
    if (!categories.includes(cat)) {
      setCat("Todo");
    }
  }, [categories, cat, setCat]);

  const bestSellers = useMemo(() => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4), [products]);

  return (
    <>
      <Navbar cart={cartCount} />

      <main className="main-wrapper">
        <HeroSlider />

        {error && !loading ? (
          <p style={{ margin: "14px 0", color: "#B91C1C", fontSize: 13, fontWeight: 600 }}>{error}</p>
        ) : null}

        <ProductsSection
          cat={cat}
          setCat={setCat}
          categories={categories}
          products={loading ? [] : visible}
        />

        <ServicesSection services={services} loading={servicesLoading} error={servicesError} />

        <BestSellersSection products={bestSellers} />

        <OffersSection products={products} />

        <Footer />
      </main>
    </>
  );
}
