"use client";
import React, { useState } from "react";
import { Eye, Edit2, Trash2, Smartphone } from "lucide-react";
import { colors, font, radius } from "../theme/tokens";
import { Avatar, Badge } from "../ui/Badge";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import type { ResUser, BillnovaUser, UserModalState } from "../types/user.types";

interface UsersTableProps {
  resUsers:      ResUser[];
  billnovaUsers: BillnovaUser[];
  deleting:      number | null;
  onDelete:      (id: number) => void;
  onModalOpen:   (state: UserModalState) => void;
}

// Anchos de columna
const COLS = [
  { label: "Usuario",   w: "30%" },
  { label: "Contacto",  w: "28%" },
  { label: "Estado",    w: "14%" },
  { label: "Móvil",     w: "12%" },
  { label: "Acciones",  w: "16%" },
];

export function UsersTable({
  resUsers, billnovaUsers, deleting, onDelete, onModalOpen,
}: UsersTableProps) {
  const [confirmId, setConfirmId] = useState<number | null>(null);

  // Estado vacío
  if (resUsers.length === 0) {
    return (
      <div style={{
        padding:      "64px 24px",
        textAlign:    "center",
        background:   colors.bg.secondary,
        border:       `1.5px dashed ${colors.border}`,
        borderRadius: radius.lg,
        color:        colors.text.disabled,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 10, opacity: .5 }}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <div style={{ fontWeight: font.weight.semibold, color: colors.text.secondary }}>
          No hay usuarios
        </div>
        <div style={{ fontSize: font.size.sm, marginTop: 4 }}>
          Crea el primer usuario para comenzar
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{
        background:   colors.bg.secondary,
        border:       `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        overflow:     "hidden",
      }}>
        {/* ── Head ── */}
        <div style={{
          display:      "flex",
          background:   colors.bg.alt,
          borderBottom: `1px solid ${colors.border}`,
          padding:      "0 16px",
        }}>
          {COLS.map((c) => (
            <div key={c.label} style={{
              width:         c.w,
              padding:       "10px 10px",
              fontSize:      font.size.xs,
              fontWeight:    font.weight.bold,
              color:         colors.text.disabled,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}>
              {c.label}
            </div>
          ))}
        </div>

        {/* ── Rows ── */}
        {resUsers.map((user, i) => {
          const bu     = billnovaUsers.find((b) => b.res_user_id === user.id);
          const isLast = i === resUsers.length - 1;

          return (
            <div
              key={user.id}
              style={{
                display:      "flex",
                alignItems:   "center",
                padding:      "0 16px",
                borderBottom: isLast ? "none" : `1px solid ${colors.borderSub}`,
                transition:   "background .1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.bg.alt)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Usuario */}
              <div style={{ width: "30%", padding: "13px 10px", display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar name={user.name} size={34} />
                <div>
                  <div style={{ fontSize: font.size.base, fontWeight: font.weight.semibold, color: colors.text.primary }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: font.size.xs, color: colors.text.disabled }}>
                    @{user.login}
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div style={{ width: "28%", padding: "13px 10px" }}>
                <div style={{ fontSize: font.size.sm, color: colors.text.secondary }}>{user.email}</div>
                {bu?.phone && (
                  <div style={{ fontSize: font.size.xs, color: colors.text.disabled, marginTop: 2 }}>
                    {bu.phone}
                  </div>
                )}
              </div>

              {/* Estado */}
              <div style={{ width: "14%", padding: "13px 10px" }}>
                <Badge variant={user.active ? "success" : "error"}>
                  {user.active ? "Activo" : "Inactivo"}
                </Badge>
              </div>

              {/* Móvil */}
              <div style={{ width: "12%", padding: "13px 10px" }}>
                {bu?.is_mobile_user
                  ? <span style={{ color: colors.brand[400], display: "flex", alignItems: "center", gap: 4, fontSize: font.size.sm, fontWeight: font.weight.semibold }}>
                      <Smartphone size={12} /> Sí
                    </span>
                  : <span style={{ color: colors.text.disabled, fontSize: font.size.sm }}>—</span>
                }
              </div>

              {/* Acciones */}
              <div style={{ width: "16%", padding: "13px 10px", display: "flex", gap: 4 }}>
                <ActionBtn
                  title="Ver"
                  color={colors.text.disabled}
                  hoverBg={colors.bg.alt}
                  hoverColor={colors.text.primary}
                  onClick={() => onModalOpen({ open: true, mode: "view", userId: user.id })}
                >
                  <Eye size={14} />
                </ActionBtn>
                <ActionBtn
                  title="Editar"
                  color={colors.brand[600]}
                  hoverBg={colors.brand[100]}
                  hoverColor={colors.brand[700]}
                  onClick={() => onModalOpen({ open: true, mode: "edit", userId: user.id })}
                >
                  <Edit2 size={14} />
                </ActionBtn>
                <ActionBtn
                  title="Eliminar"
                  color={colors.error.DEFAULT}
                  hoverBg={colors.error.soft}
                  hoverColor={colors.error.DEFAULT}
                  disabled={deleting === user.id}
                  onClick={() => setConfirmId(user.id)}
                >
                  <Trash2 size={14} />
                </ActionBtn>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        open={confirmId !== null}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          if (confirmId !== null) {
            onDelete(confirmId);
            setConfirmId(null);
          }
        }}
        loading={deleting !== null}
      />
    </>
  );
}

// ── Botón de icono ─────────────────────────────────────────────────────────
interface ActionBtnProps {
  children:   React.ReactNode;
  title:      string;
  color:      string;
  hoverBg:    string;
  hoverColor: string;
  disabled?:  boolean;
  onClick:    () => void;
}
function ActionBtn({ children, title, color, hoverBg, hoverColor, disabled, onClick }: ActionBtnProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      style={{
        background:   "none",
        border:       "none",
        cursor:       disabled ? "not-allowed" : "pointer",
        color,
        padding:      6,
        borderRadius: radius.sm,
        display:      "flex",
        alignItems:   "center",
        opacity:      disabled ? 0.4 : 1,
        transition:   "background .12s, color .12s",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = hoverBg;
          e.currentTarget.style.color      = hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "none";
        e.currentTarget.style.color      = color;
      }}
    >
      {children}
    </button>
  );
}