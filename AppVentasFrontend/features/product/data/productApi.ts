// src/features/product/data/productApi.ts

import odooConfig from "@/lib/odooConfig";
import type { Producto } from "../types/productos.types";

const { baseUrl } = odooConfig;

function jsonHeaders(): HeadersInit {
  return { "Content-Type": "application/json" };
}

async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  const json = await res.json();
  // Odoo response structure: { ok: true, data: [...] } or { ok: false, error: "..." }
  if (!json.ok) {
    throw new Error(json.error ?? "Error desconocido");
  }
  return (json.data ?? json) as T;
}

// ───────────────────────────
// API helpers for productos
// ───────────────────────────

export async function apiListProductos(): Promise<Producto[]> {
  const res = await fetch(`${baseUrl}/api/products`, {
    credentials: "include",
    headers: jsonHeaders(),
  });
  const data = await checkResponse<any[]>(res);
  
  // Mapear campos de Odoo -> Producto
  return data.map((p) => {
    const stock = p.quantity_on_hand ?? p.stock ?? 0;
    return {
      id: String(p.id),
      nombre: p.name ?? "",
      sku: p.default_code ?? "",
      categoria: (p.categ_id?.name ?? "Electrónica") as Producto["categoria"],
      stock: stock,
      stockStatus: stock === 0 ? "agotado" : stock < 5 ? "bajo" : "ok",
      precio: p.list_price ?? 0,
      costo: p.cost_price ?? p.standard_price ?? 0,
      proveedor: p.seller_ids?.[0]?.name?.name ?? "",
      ultimaActualizacion: p.write_date ?? new Date().toISOString().split('T')[0],
    };
  });
}

export async function apiGetProducto(id: number): Promise<Producto> {
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    credentials: "include",
    headers: jsonHeaders(),
  });
  const p = await checkResponse<any>(res);
  const stock = p.quantity_on_hand ?? p.stock ?? 0;
  return {
    id: String(p.id),
    nombre: p.name ?? "",
    sku: p.default_code ?? "",
    categoria: (p.categ_id?.name ?? "Electrónica") as Producto["categoria"],
    stock: stock,
    stockStatus: stock === 0 ? "agotado" : stock < 5 ? "bajo" : "ok",
    precio: p.list_price ?? 0,
    costo: p.cost_price ?? p.standard_price ?? 0,
    proveedor: p.seller_ids?.[0]?.name?.name ?? "",
    ultimaActualizacion: p.write_date ?? new Date().toISOString().split('T')[0],
  };
}

export async function apiCreateProducto(payload: Partial<Producto>): Promise<{ id: number }> {
  // Map frontend model to backend fields
  const body: any = {};
  if (payload.nombre) body.name = payload.nombre;
  if (payload.sku) body.default_code = payload.sku;
  if (payload.precio !== undefined) body.list_price = payload.precio;
  if (payload.costo !== undefined) body.cost_price = payload.costo;
  if (payload.stock !== undefined) body.quantity = payload.stock;
  if (payload.categoria) body.category = payload.categoria;
  if (payload.proveedor) body.supplier = payload.proveedor;

  const res = await fetch(`${baseUrl}/api/products/create`, {
    method: "POST",
    credentials: "include",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  return checkResponse<{ id: number }>(res);
}

export async function apiUpdateProducto(
  id: number,
  payload: Partial<Producto>
): Promise<void> {
  const body: any = {};
  if (payload.nombre) body.name = payload.nombre;
  if (payload.sku) body.default_code = payload.sku;
  if (payload.precio !== undefined) body.list_price = payload.precio;
  if (payload.costo !== undefined) body.cost_price = payload.costo;
  if (payload.stock !== undefined) body.quantity = payload.stock;
  if (payload.categoria) body.category = payload.categoria;
  if (payload.proveedor) body.supplier = payload.proveedor;

  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  await checkResponse(res);
}

export async function apiDeleteProducto(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: jsonHeaders(),
  });
  await checkResponse(res);
}
