export type DealCategory = "all" | "electronics" | "software" | "services" | "hardware" | "accessories";

export type DealTag = "flash" | "top" | "expiring" | "new";

export interface Deal {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: DealCategory;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tag?: DealTag;
  expiresAt?: string; // ISO string for countdown
  soldPercent?: number; // 0-100 for sold bar
}

export interface DealsFilters {
  category: DealCategory;
  minDiscount: number;
  tag: DealTag | "all";
}

export interface FeaturedBanner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  bgFrom: string;
  bgTo: string;
  emoji: string;
  discount: number;
}