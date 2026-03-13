// src/features/services/types/services.types.ts

export interface Service {
  id: number;
  name: string;
  default_code: string;
  description: string;
  list_price: number;
  cost_price: number;
  category: string;
  billing: "monthly" | "annual" | "one-time" | "hourly";
  emoji: string;
  featured?: boolean;
  popular?: boolean;
}

export interface ServicesApiResponse {
  success: boolean;
  data?: {
    items: OdooProduct[];
    total: number;
    limit: number;
    offset: number;
  };
  message?: string;
}

// Raw product from Odoo — services have type="service"
export interface OdooProduct {
  id: number;
  name: string;
  default_code: string;
  list_price: number;
  cost_price: number;
  type: string;
}

export type FetchState = "idle" | "loading" | "success" | "error";
export type SortOption = "name_asc" | "price_asc" | "price_desc" | "popular";
export type ViewMode = "grid" | "list";