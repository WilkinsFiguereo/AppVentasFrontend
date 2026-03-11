export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: "nuevo" | "oferta" | "popular";
  image?: string; // placeholder color
}

export interface SearchFilters {
  query: string;
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  inStockOnly: boolean;
  sortBy: SortOption;
}

export type SortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "rating"
  | "newest";

export interface Category {
  id: string;
  label: string;
  count: number;
}