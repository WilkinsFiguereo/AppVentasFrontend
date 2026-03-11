// app/src/features/home/sections/BestSellers/BestSellersSection.tsx
"use client";

import SectionHeading from "../../ui/SectionHeading";
import ProductCard from "../Products/ProductCard";
import type { Product } from "../../types/home.types";

export default function BestSellersSection({ products }: { products: Product[] }) {
  return (
    <section>
      <br />
      <SectionHeading label="Top" title="Mas vendidos" showAll />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((p) => (
          <ProductCard
            key={p.id}
            p={{
              ...p,
              badge: "Mas vendido",
            }}
          />
        ))}
      </div>
    </section>
  );
}