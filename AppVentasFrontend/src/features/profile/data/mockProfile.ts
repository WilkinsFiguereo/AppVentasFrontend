import { UserProfile, Order, Address, NotificationPrefs } from "../types/profile.types";

export const MOCK_USER: UserProfile = {
  id: "u_001",
  firstName: "Juan",
  lastName: "García",
  email: "juan.garcia@empresa.com",
  phone: "+1 (809) 555-0192",
  company: "TechCorp S.A.",
  avatarInitials: "JG",
  avatarColor: "linear-gradient(135deg, #3B82F6, #1E3A8A)",
  memberSince: "Marzo 2023",
  totalOrders: 24,
  totalSpent: 8_420.50,
  savedItems: 7,
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-20241",
    date: "28 feb 2025",
    status: "completed",
    total: 1_649.00,
    items: 2,
    products: [
      { name: "Laptop ThinkPad X1", emoji: "💻" },
      { name: "Teclado Keychron Q1", emoji: "⌨️" },
    ],
  },
  {
    id: "ORD-20198",
    date: "14 feb 2025",
    status: "shipped",
    total: 849.00,
    items: 1,
    products: [{ name: "Monitor UltraWide 34\"", emoji: "🖥️" }],
  },
  {
    id: "ORD-20154",
    date: "02 ene 2025",
    status: "completed",
    total: 299.00,
    items: 1,
    products: [{ name: "Soporte IT Premium", emoji: "🛠️" }],
  },
  {
    id: "ORD-20102",
    date: "18 dic 2024",
    status: "completed",
    total: 189.00,
    items: 1,
    products: [{ name: "Kaspersky Business", emoji: "📦" }],
  },
  {
    id: "ORD-20087",
    date: "05 nov 2024",
    status: "cancelled",
    total: 589.00,
    items: 1,
    products: [{ name: "NAS Synology DS923+", emoji: "🖧" }],
  },
];

export const MOCK_ADDRESSES: Address[] = [
  {
    id: "addr_1",
    label: "Oficina",
    name: "Juan García",
    line1: "Av. Winston Churchill 1099",
    line2: "Piso 8, Of. 801",
    city: "Santo Domingo",
    country: "República Dominicana",
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Casa",
    name: "Juan García",
    line1: "Calle El Conde 55",
    city: "Santo Domingo",
    country: "República Dominicana",
    isDefault: false,
  },
];

export const MOCK_NOTIFICATIONS: NotificationPrefs = {
  orders: true,
  promotions: true,
  security: true,
  newsletter: false,
};

export const PROFILE_TABS = [
  { id: "general",       label: "Información general", icon: "👤" },
  { id: "orders",        label: "Mis pedidos",          icon: "📦" },
  { id: "addresses",     label: "Direcciones",          icon: "📍" },
  { id: "security",      label: "Seguridad",            icon: "🔒" },
  { id: "notifications", label: "Notificaciones",       icon: "🔔" },
] as const;