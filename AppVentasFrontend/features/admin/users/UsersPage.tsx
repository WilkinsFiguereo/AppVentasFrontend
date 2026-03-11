"use client";
import React, { useState } from "react";
import { useUsers }        from "./hooks/useUsers";
import { useUserSearch }   from "./hooks/useUserSearch";
import { UsersHeader }     from "./sections/usersHeader";
import { UsersStats }      from "./sections/usersStats";
import { UsersTable }      from "./sections/usersTable";
import { UserForm }        from "./sections/userForm";
import { Modal }           from "./ui/Modal";
import { colors, font, radius } from "./theme/tokens";
import type { UserModalState } from "./types/user.types";

const CLOSED: UserModalState = { open: false, mode: "create" };

const MODAL_TITLE = {
  create: "Nuevo usuario",
  edit:   "Editar usuario",
  view:   "Detalle del usuario",
} as const;

export function UsersPage() {
  const {
    resUsers, billnovaUsers,
    loading, error,
    deleting, refresh, removeUser,
  } = useUsers();

  const { query, setQuery, filtered } = useUserSearch(resUsers, billnovaUsers);
  const [modal, setModal] = useState<UserModalState>(CLOSED);

  const closeModal = () => setModal(CLOSED);

  return (
    <div style={{
      padding:    "32px 36px",
      maxWidth:   1080,
      margin:     "0 auto",
      fontFamily: font.family,
    }}>

      <UsersHeader
        total={resUsers.length}
        query={query}
        onSearch={setQuery}
        onCreateNew={() => setModal({ open: true, mode: "create" })}
      />

      {/* Stats — solo si hay datos */}
      {!loading && !error && (
        <UsersStats resUsers={resUsers} billnovaUsers={billnovaUsers} />
      )}

      {/* ── Estado: cargando ── */}
      {loading && (
        <div style={{
          textAlign:    "center",
          padding:      80,
          background:   colors.bg.secondary,
          borderRadius: radius.lg,
          border:       `1px solid ${colors.border}`,
          color:        colors.text.disabled,
          fontSize:     font.size.base,
        }}>
          <div style={{
            width:        30,
            height:       30,
            border:       `2.5px solid ${colors.brand[100]}`,
            borderTop:    `2.5px solid ${colors.brand[600]}`,
            borderRadius: "50%",
            margin:       "0 auto 14px",
            animation:    "bn-spin .8s linear infinite",
          }} />
          Cargando usuarios...
        </div>
      )}

      {/* ── Estado: error ── */}
      {error && !loading && (
        <div style={{
          padding:      "16px 20px",
          background:   colors.error.soft,
          borderRadius: radius.lg,
          color:        colors.error.text,
          border:       `1px solid #FECACA`,
          fontSize:     font.size.base,
        }}>
          <strong>Error:</strong> {error}{" "}
          <button
            onClick={refresh}
            style={{
              background:     "none",
              border:         "none",
              cursor:         "pointer",
              color:          colors.error.DEFAULT,
              fontWeight:     font.weight.semibold,
              textDecoration: "underline",
              fontFamily:     "inherit",
            }}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* ── Tabla ── */}
      {!loading && !error && (
        <UsersTable
          resUsers={filtered}
          billnovaUsers={billnovaUsers}
          deleting={deleting}
          onDelete={removeUser}
          onModalOpen={setModal}
        />
      )}

      {/* ── Modal crear / editar / ver ── */}
      <Modal
        open={modal.open}
        onClose={closeModal}
        title={MODAL_TITLE[modal.mode]}
        width={560}
      >
        <UserForm
          mode={modal.mode}
          userId={modal.userId}
          onSuccess={() => { closeModal(); refresh(); }}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}