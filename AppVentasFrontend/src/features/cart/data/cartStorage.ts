import type { CartItem } from "../types";

const CART_STORAGE_KEY = "app_cart_items";
export const CART_UPDATED_EVENT = "cart-updated";

function emitCartUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  emitCartUpdated();
}

export function clearCartItems(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
  emitCartUpdated();
}

export function addOrMergeCartItem(item: CartItem): CartItem[] {
  const current = getCartItems();
  const foundIndex = current.findIndex(
    (existing) => existing.id === item.id && existing.billingCycle === item.billingCycle,
  );

  let next: CartItem[];

  if (foundIndex >= 0) {
    next = [...current];
    next[foundIndex] = {
      ...next[foundIndex],
      quantity: next[foundIndex].quantity + item.quantity,
      users: item.users,
      price: item.price,
      img: item.img || next[foundIndex].img,
      category: item.category || next[foundIndex].category,
      name: item.name || next[foundIndex].name,
    };
  } else {
    next = [...current, item];
  }

  saveCartItems(next);
  return next;
}
