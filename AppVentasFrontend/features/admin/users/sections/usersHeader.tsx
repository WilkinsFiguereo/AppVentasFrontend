"use client";
import React from "react";
import { Users, Plus, Search } from "lucide-react";
import { colors, font, radius } from "../theme/tokens";
import { Button } from "../ui/Button";

interface UsersHeaderProps {
  total:       number;
  query:       string;
  onSearch:    (q: string) => void;
  onCreateNew: () => void;
}

export function UsersHeader({ total, query, onSearch, onCreateNew }: UsersHeaderProps) {
  return (
    <div style={{ marginBottom: 28 }}>

      {/* Título + botón */}
      <div style={{
        display:        "flex",
        alignItems:     "flex-end",
        justifyContent: "space-between",
        marginBottom:   22,
        gap:            12,
        flexWrap:       "wrap",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{
              background:   colors.brand[100],
              color:        colors.brand[600],
              padding:      8,
              borderRadius: radius.md,
              display:      "flex",
            }}>
              <Users size={18} />
            </div>
            <h1 style={{
              margin:        0,
              fontSize:      font.size["2xl"],
              fontWeight:    font.weight.extrabold,
              color:         colors.text.primary,
              letterSpacing: "-.03em",
            }}>
              Usuarios
            </h1>
          </div>
          <p style={{
            margin:      0,
            fontSize:    font.size.base,
            color:       colors.text.disabled,
            paddingLeft: 46,
          }}>
            {total} usuario{total !== 1 ? "s" : ""} registrado{total !== 1 ? "s" : ""}
          </p>
        </div>

        <Button icon={<Plus size={15} />} onClick={onCreateNew}>
          Nuevo usuario
        </Button>
      </div>

      {/* Buscador */}
      <div style={{ maxWidth: 340 }}>
        <div style={{ position: "relative" }}>
          <span style={{
            position:   "absolute",
            left:       10,
            top:        "50%",
            transform:  "translateY(-50%)",
            color:      colors.text.disabled,
            display:    "flex",
          }}>
            <Search size={14} />
          </span>
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar nombre, email, login..."
            style={{
              width:        "100%",
              padding:      "8px 12px 8px 32px",
              border:       `1.5px solid ${colors.border}`,
              borderRadius: radius.md,
              fontSize:     font.size.base,
              color:        colors.text.primary,
              background:   colors.bg.secondary,
              outline:      "none",
              fontFamily:   font.family,
              boxSizing:    "border-box",
              transition:   "border-color .15s, box-shadow .15s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = colors.brand[400];
              e.currentTarget.style.boxShadow   = `0 0 0 3px ${colors.brand[100]}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = colors.border;
              e.currentTarget.style.boxShadow   = "none";
            }}
          />
        </div>
      </div>

      <div style={{ height: 1, background: colors.border, marginTop: 20 }} />
    </div>
  );
}