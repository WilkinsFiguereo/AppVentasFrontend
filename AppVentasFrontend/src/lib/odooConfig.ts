// src/lib/odooConfig.ts

type OdooConfig = {
  baseUrl: string;
  timeout?: number;
};

const odooConfig: OdooConfig = {
  // URL de tu servidor Odoo o tu API proxy
  baseUrl: process.env.NEXT_PUBLIC_ODOO_URL || "http://localhost:8009",

  // opcional: tiempo máximo de espera
  timeout: 15000,
};

export default odooConfig;