export type ProfileTab = "general" | "orders" | "addresses" | "security" | "notifications";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  avatarInitials: string;
  avatarColor: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  savedItems: number;
}

export interface Order {
  id: string;
  date: string;
  status: "completed" | "processing" | "shipped" | "cancelled";
  total: number;
  items: number;
  products: { name: string; emoji: string }[];
}

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  country: string;
  isDefault: boolean;
}

export interface NotificationPrefs {
  orders: boolean;
  promotions: boolean;
  security: boolean;
  newsletter: boolean;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}