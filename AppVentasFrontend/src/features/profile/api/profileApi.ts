import { TOKEN_KEYS, AUTH_ROUTES } from "../../auth/data/constants";

// BASE = "/odoo" — Next.js rewrite: /odoo/:path* → http://localhost:8009/:path*
// Browser calls /odoo/api/user/profile (same origin, no CORS).
// Next.js forwards server-side to http://localhost:8009/api/user/profile.
const BASE = "/odoo";

/** Safe — never throws in SSR / during hydration */
function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    window.localStorage.getItem(TOKEN_KEYS.access) ||
    window.localStorage.getItem(TOKEN_KEYS.legacy) ||
    null
  );
}

function authHeaders(): HeadersInit {
  const token = getToken();
  if (!token) throw new Error("No hay sesión activa. Por favor inicia sesión.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

function handleUnauthorized() {
  if (typeof window === "undefined") return;
  // Clear stale tokens and redirect to login
  Object.values(TOKEN_KEYS).forEach((k) => window.localStorage.removeItem(k));
  window.location.href = AUTH_ROUTES.login;
}

async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data: T; message: string }> {
  let headers: HeadersInit;
  try {
    headers = authHeaders();
  } catch (e) {
    handleUnauthorized();
    throw e;
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers ?? {}) },
  });

  // Token expired or revoked on the server side → force re-login
  if (res.status === 401) {
    handleUnauthorized();
    throw new Error("Sesión expirada. Redirigiendo al login…");
  }

  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Error inesperado");
  return json;
}

// ── Profile ────────────────────────────────────────────────────────────────────
export async function fetchProfile() {
  const r = await apiFetch<ProfileData>("/api/user/profile");
  return r.data;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  const r = await apiFetch<ProfileData>("/api/user/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return r.data;
}

export async function updateAvatar(imageBase64: string) {
  return apiFetch("/api/user/avatar", {
    method: "POST",
    body: JSON.stringify({ image: imageBase64 }),
  });
}

// ── Password ───────────────────────────────────────────────────────────────────
export async function changePassword(payload: ChangePasswordPayload) {
  return apiFetch("/api/user/password", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// ── Addresses ─────────────────────────────────────────────────────────────────
export async function fetchAddresses() {
  const r = await apiFetch<{ addresses: Address[] }>("/api/user/addresses");
  return r.data.addresses;
}

export async function createAddress(payload: AddressPayload) {
  const r = await apiFetch<Address>("/api/user/addresses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return r.data;
}

export async function updateAddress(id: number, payload: Partial<AddressPayload>) {
  const r = await apiFetch<Address>(`/api/user/addresses/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return r.data;
}

export async function deleteAddress(id: number) {
  return apiFetch(`/api/user/addresses/${id}`, { method: "DELETE" });
}

export async function setDefaultAddress(id: number) {
  return apiFetch(`/api/user/addresses/${id}/default`, { method: "PUT" });
}

// ── Notifications ─────────────────────────────────────────────────────────────
export async function fetchNotifications() {
  const r = await apiFetch<NotificationPrefs>("/api/user/notifications");
  return r.data;
}

export async function updateNotifications(payload: Partial<NotificationPrefs>) {
  const r = await apiFetch<NotificationPrefs>("/api/user/notifications", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return r.data;
}

// ── Orders ────────────────────────────────────────────────────────────────────
export async function fetchOrders(limit = 20, offset = 0) {
  const r = await apiFetch<OrdersResponse>(`/api/user/orders?limit=${limit}&offset=${offset}`);
  return r.data;
}

// ── Account ───────────────────────────────────────────────────────────────────
export async function deleteAccount(password: string) {
  return apiFetch("/api/user/account", {
    method: "DELETE",
    body: JSON.stringify({ password }),
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ProfileData {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar_initials: string;
  member_since: string;
  role: string;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export interface Address {
  id: number;
  label: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  zip: string;
  country: string;
  country_id: number | false;
  state_id: number | false;
  is_default: boolean;
}

export interface AddressPayload {
  name: string;
  street: string;
  street2?: string;
  city?: string;
  zip?: string;
  country_id?: number;
  label?: string;
  is_default?: boolean;
}

export interface NotificationPrefs {
  orders: boolean;
  promotions: boolean;
  security: boolean;
  newsletter: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "completed" | "shipped" | "processing" | "cancelled";
  label: string;
  total: number;
  currency: string;
  items: number;
  products: { name: string; emoji: string }[];
}

export interface OrdersResponse {
  total: number;
  limit: number;
  offset: number;
  orders: Order[];
}