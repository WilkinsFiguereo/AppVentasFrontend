"use client";

import { useRouter } from "next/navigation";

import type { Product } from "../types/search.types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const CATEGORY_ICONS: Record<string, string> = {
  products: "PRD",
  services: "SRV",
  consumables: "CON",
  electronics: "ELC",
  software: "SFT",
  hardware: "HWD",
  accessories: "ACC",
};

const CATEGORY_LABELS: Record<string, string> = {
  products: "Productos",
  services: "Servicios",
  consumables: "Consumibles",
  electronics: "Electronica",
  software: "Software",
  hardware: "Hardware",
  accessories: "Accesorios",
};

const BADGE_MAP: Record<string, { label: string; cls: string }> = {
  oferta: { label: "Oferta", cls: "badge--oferta" },
  nuevo: { label: "Nuevo", cls: "badge--nuevo" },
  popular: { label: "Popular", cls: "badge--popular" },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-DO", { style: "currency", currency: "USD" }).format(price);
}

function calcDiscount(price: number, original: number) {
  return Math.round((1 - price / original) * 100);
}

function renderStars(value: number) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return `${"*".repeat(full)}${"-".repeat(5 - full)}`;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const router = useRouter();
  const badge = product.badge ? BADGE_MAP[product.badge] : null;
  const discount = product.originalPrice ? calcDiscount(product.price, product.originalPrice) : null;

  const goToDetail = () => {
    router.push(`/navigation/products/${product.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={`product-card${!product.inStock ? " product-card--out" : ""}`}
      onClick={goToDetail}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          goToDetail();
        }
      }}
    >
      <div className={`product-img product-img--${product.category}`}>
        <span aria-hidden="true">{CATEGORY_ICONS[product.category] ?? "PRD"}</span>
        {badge ? <span className={`product-badge ${badge.cls}`}>{badge.label}</span> : null}
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-brand">{product.brand}</span>
          <span className="product-cat-tag">{CATEGORY_LABELS[product.category] ?? product.category}</span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-footer">
          <div className="rating">
            <span className="rating-stars">{renderStars(product.rating)}</span>
            <span className="rating-score">{product.rating.toFixed(1)}</span>
            <span className="rating-count">({product.reviewCount.toLocaleString()} resenas)</span>
          </div>

          {product.inStock ? (
            <div className="stock-in">
              <span className="stock-dot" />En stock
            </div>
          ) : (
            <div className="stock-out">
              <span className="stock-dot" />Sin stock
            </div>
          )}
        </div>
      </div>

      <div className="product-action">
        <div className="product-price-wrap">
          <div className="product-price">{formatPrice(product.price)}</div>
          {product.originalPrice ? (
            <>
              <div className="product-price-old">{formatPrice(product.originalPrice)}</div>
              <div className="product-discount">-{discount}%</div>
            </>
          ) : null}
        </div>

        <button
          className="btn-add"
          disabled={!product.inStock}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onAddToCart(product);
          }}
        >
          {product.inStock ? "Agregar" : "Sin stock"}
        </button>
      </div>
    </div>
  );
}
