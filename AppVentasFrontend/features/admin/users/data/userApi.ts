// src/features/users/data/userApi.ts

import odooConfig from "../../../../lib/odooConfig";
import type {
  ResUser,
  BillnovaUser,
  CreateUserPayload,
  UpdateUserPayload,
} from "../types/user.types";

const { baseUrl } = odooConfig;

// ── Helper ────────────────────────────────────────────────────────────────────
function jsonHeaders(): HeadersInit {
  return { "Content-Type": "application/json" };
}

async function checkResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }
  const json = await res.json();
  return (json.data ?? json) as T;
}

// ════════════════════════════════════════════════════════════════════════════
//  res.users  —  /api/users
// ════════════════════════════════════════════════════════════════════════════

export async function apiGetResUsers(): Promise<ResUser[]> {
  const res = await fetch(`${baseUrl}/api/users`, {
    credentials: "include",
    headers:     jsonHeaders(),
  });
  return checkResponse<ResUser[]>(res);
}

export async function apiGetResUserById(id: number): Promise<ResUser> {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    credentials: "include",
    headers:     jsonHeaders(),
  });
  return checkResponse<ResUser>(res);
}

export async function apiCreateResUser(
  payload: Pick<CreateUserPayload, "name" | "login" | "email" | "password">
): Promise<{ id: number; message: string }> {
  const res = await fetch(`${baseUrl}/api/users`, {
    method:      "POST",
    credentials: "include",
    headers:     jsonHeaders(),
    body:        JSON.stringify(payload),
  });
  return checkResponse(res);
}

export async function apiUpdateResUser(
  id:      number,
  payload: Partial<Pick<UpdateUserPayload, "name" | "login" | "email" | "password" | "active">>
): Promise<void> {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    method:      "PUT",
    credentials: "include",
    headers:     jsonHeaders(),
    body:        JSON.stringify(payload),
  });
  await checkResponse(res);
}

export async function apiDeleteResUser(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    method:      "DELETE",
    credentials: "include",
    headers:     jsonHeaders(),
  });
  await checkResponse(res);
}

// ════════════════════════════════════════════════════════════════════════════
//  billnova.user  —  /api/billnova-users
// ════════════════════════════════════════════════════════════════════════════

export async function apiGetBillnovaUsers(): Promise<BillnovaUser[]> {
  const res = await fetch(`${baseUrl}/api/billnova-users`, {
    credentials: "include",
    headers:     jsonHeaders(),
  });
  return checkResponse<BillnovaUser[]>(res);
}

export async function apiGetBillnovaUserByResId(
  resUserId: number
): Promise<BillnovaUser | null> {
  const all = await apiGetBillnovaUsers();
  return all.find((u) => u.res_user_id === resUserId) ?? null;
}

export async function apiCreateBillnovaUser(
  payload: Pick<CreateUserPayload, "name" | "email" | "phone" | "address" | "is_mobile_user"> & {
    res_user_id: number;
  }
): Promise<{ id: number; message: string }> {
  const res = await fetch(`${baseUrl}/api/billnova-users`, {
    method:      "POST",
    credentials: "include",
    headers:     jsonHeaders(),
    body:        JSON.stringify(payload),
  });
  return checkResponse(res);
}

export async function apiUpdateBillnovaUser(
  id:      number,
  payload: Partial<Pick<UpdateUserPayload, "phone" | "address" | "is_mobile_user">>
): Promise<void> {
  const res = await fetch(`${baseUrl}/api/billnova-users/${id}`, {
    method:      "PUT",
    credentials: "include",
    headers:     jsonHeaders(),
    body:        JSON.stringify(payload),
  });
  await checkResponse(res);
}

export async function apiDeleteBillnovaUser(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/api/billnova-users/${id}`, {
    method:      "DELETE",
    credentials: "include",
    headers:     jsonHeaders(),
  });
  await checkResponse(res);
}