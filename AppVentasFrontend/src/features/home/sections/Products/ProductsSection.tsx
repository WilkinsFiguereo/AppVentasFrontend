// src/features/home/sections/Products/ProductsSection.tsx
"use client";

import type { Product } from "../../types/home.types";
import { T } from "../../theme/tokens";
import SectionHeading from "../../ui/SectionHeading";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "./ProductCard";

export default function ProductsSection({
  cat,
  setCat,
  categories,
  products,
}: {
  cat: string;
  setCat: (v: string) => void;
  categories: string[];
  products: Product[];
}) {
  return (
    <section>
      <br />
      <SectionHeading
        label="Para ti"
        title="Productos recomendados"
        showAll
        showAllHref="http://localhost:3000/navigation/search"
      />
      <CategoryTabs active={cat} set={setCat} categories={categories} />

      {products.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 }}>
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 0", color: T.sub, fontSize: 13 }}>
          Sin productos disponibles para esta categoria.
        </div>
      )}
    </section>
  );
}
