"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";
import { StockStatus, InvoiceStatus } from "./types/dashboard.types";
import { NavItemData } from "./data/chart.data";
import { dashboardTheme as t } from "./theme/dashboard.theme";

// ─── Stock Badge ────────────────────────────────────────────────────
interface StockBadgeProps {
  status: StockStatus;
}

export function StockBadge({ status }: StockBadgeProps) {
  const map: Record<StockStatus, { label: string; color: string; bg: string }> = {
    ok:      { label: "En Stock",   color: t.success, bg: t.successBg },
    bajo:    { label: "Stock Bajo", color: t.warning, bg: t.warningBg },
    agotado: { label: "Agotado",    color: t.error,   bg: t.errorBg   },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.03em",
    }}>
      {s.label}
    </span>
  );
}

// ─── Invoice Badge ──────────────────────────────────────────────────
interface InvoiceBadgeProps {
  status: InvoiceStatus;
}

export function InvoiceBadge({ status }: InvoiceBadgeProps) {
  const map: Record<InvoiceStatus, { label: string; color: string; bg: string }> = {
    pagada:    { label: "Pagada",    color: t.success, bg: t.successBg },
    pendiente: { label: "Pendiente", color: t.warning, bg: t.warningBg },
    vencida:   { label: "Vencida",   color: t.error,   bg: t.errorBg   },
  };
  const s = map[status];
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.03em",
    }}>
      {s.label}
    </span>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────
interface SidebarProps {
  navItems: NavItemData[];
}

export function Sidebar({ navItems }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 220, background: t.bgCard, borderRight: `1px solid ${t.border}`,
      display: "flex", flexDirection: "column", padding: "24px 16px",
      position: "sticky", top: 0, height: "100vh",
    }}>
      {/* Logo */}
      <div style={{ padding: "0 8px 28px", borderBottom: `1px solid ${t.border}` }}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36,
              background: `linear-gradient(135deg, ${t.brand600}, ${t.brand400})`,
              borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", color: "white",
            }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: t.textPrimary }}>BizAdmin</div>
              <div style={{ fontSize: 10, color: t.textDisabled, letterSpacing: "0.05em" }}>ENTERPRISE</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav style={{ marginTop: 20, flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: t.textDisabled,
          letterSpacing: "0.1em", padding: "0 8px", marginBottom: 8,
        }}>
          MENÚ PRINCIPAL
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.id} href={item.href} style={{ textDecoration: "none" }}>
              <div className={`nav-item ${isActive ? "active" : ""}`}>
                <item.Icon size={18} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Avatar */}
      <div style={{
        marginTop: "auto", padding: "12px", background: t.bgAlt,
        borderRadius: 12, display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: `linear-gradient(135deg, ${t.brand600}, ${t.brand400})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, color: "white", fontWeight: 700,
        }}>
          JR
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: t.textPrimary }}>Juan Ramírez</div>
          <div style={{ fontSize: 10, color: t.textDisabled }}>Administrador</div>
        </div>
      </div>
    </aside>
  );
}

// ─── Toast Notification ──────────────────────────────────────────────
export function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24,
      background: t.brand600, color: "white",
      padding: "12px 20px", borderRadius: 12,
      fontSize: 13, fontWeight: 500,
      boxShadow: "0 8px 24px rgba(30,58,138,0.3)",
      animation: "toastIn 0.3s ease", zIndex: 9999,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      {message}
    </div>
  );
}