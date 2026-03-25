// src/features/product/data/productApi.ts

import odooConfig from "../../../lib/odooConfig";
import type { Producto } from "../types/productos.types";

const { baseUrl } = odooConfig;

function jsonHeaders(): HeadersInit {
  return { "Content-Type": "application/json" };
}

async function checkResponse<T>(res: Response): Promise<T> {
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || json.error || `HTTP ${res.status}`);
  }

  // aceptar success o ok
  if (json.success === false || json.ok === false) {
    throw new Error(json.message || json.error || "Error en API");
  }

  return json.data ?? json;
}

function isServiceItem(item: any) {
  const typeValue = (
    item.type ??
    item.product_type ??
    item.type_id?.model ??
    item.product_tmpl_id?.type ??
    ""
  )
    .toString()
    .toLowerCase();

  const categoryValue = (item.categ_id?.name ?? item.category ?? "").toString().toLowerCase();

  if (typeValue === "service" || typeValue === "servicio") return true;

  if (categoryValue.includes("servicio") || categoryValue.includes("service")) return true;

  return false;
}

// ───────────────────────────
// API helpers for productos
// ───────────────────────────

export async function apiListProductos(): Promise<Producto[]> {
  const res = await fetch(`${baseUrl}/api/product/list`, {
    headers: jsonHeaders(),
  });

  const data = await checkResponse<any>(res);
  const items = Array.isArray(data.items) ? data.items : [];

  return items
    .filter((p) => !isServiceItem(p))
    .map((p: any) => {
    const stock = p.quantity_on_hand ?? p.stock ?? 0;
    const typeField = (
      p.type ??
      p.product_type ??
      p.type_id?.model ??
      p.product_tmpl_id?.type ??
      ""
    )
      .toString()
      .toLowerCase();

    return {
      id: String(p.id),
      nombre: p.name ?? "",
      sku: p.default_code ?? "",
      categoria: (p.categ_id?.name ?? "Electrónica"),
      type: typeField,
      stock,
      stockStatus: stock === 0 ? "agotado" : stock < 5 ? "bajo" : "ok",
      precio: p.list_price ?? 0,
      costo: p.cost_price ?? p.standard_price ?? 0,
      proveedor: p.seller_ids?.[0]?.name?.name ?? "",
      ultimaActualizacion:
        p.write_date ?? new Date().toISOString().split("T")[0],
    };
  });
}

export async function apiGetProducto(id: number): Promise<Producto> {
  const res = await fetch(`${baseUrl}/api/product/${id}`, {
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

  const res = await fetch(`${baseUrl}/api/product/create`, {
    method: "POST",
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

  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify(body),
  });
  await checkResponse(res);
}

export async function apiDeleteProducto(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/api/product/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: jsonHeaders(),
  });
  await checkResponse(res);
}
