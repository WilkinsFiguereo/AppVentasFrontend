export type OdooProductItem = {
  id: number;
  name: string;
  default_code?: string;
  list_price?: number;
  standard_price?: number;
  description?: string;
  description_sale?: string;
  type?: string;
  active?: boolean;
  company_name?: string;
};

type OdooListResponse = {
  success?: boolean;
  message?: string;
  data?: {
    items?: OdooProductItem[];
    total?: number;
    limit?: number;
    offset?: number;
  };
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8009").replace(/\/$/, "");

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;

  const keys = ["access_token", "token", "auth_token"];
  for (const key of keys) {
    const value = window.localStorage.getItem(key);
    if (value) return value;
  }

  return null;
}

export async function listOdooProducts(limit = 100, offset = 0): Promise<OdooProductItem[]> {
  const token = getAccessToken();
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/product/list?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const body = (await response.json()) as OdooListResponse;

  if (!response.ok || !body.success) {
    throw new Error(body.message || `Error al cargar productos (${response.status})`);
  }

  return Array.isArray(body.data?.items) ? body.data.items : [];
}
