import type { Metadata } from "next";

import { SearchResults } from "../../../src/features/search/sections/SearchResults";

type RawSearchParams = {
  q?: string | string[];
};

type SearchPageProps = {
  searchParams?: Promise<RawSearchParams> | RawSearchParams;
};

function resolveQuery(params?: RawSearchParams) {
  const raw = params?.q;
  const value = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");
  return value.trim();
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const resolved = searchParams instanceof Promise ? await searchParams : searchParams;
  const q = resolveQuery(resolved);

  return {
    title: q ? `"${q}" - Buscar | Acme` : "Buscar productos | Acme",
    description: q ? `Resultados de busqueda para "${q}" en Acme` : "Explora todos los productos y servicios en Acme",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolved = searchParams instanceof Promise ? await searchParams : searchParams;
  const q = resolveQuery(resolved);

  return <SearchResults initialQuery={q} />;
}
