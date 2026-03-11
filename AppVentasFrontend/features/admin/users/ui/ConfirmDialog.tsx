import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { colors, font } from "../theme/tokens";

interface ConfirmDialogProps {
  open:      boolean;
  onClose:   () => void;
  onConfirm: () => void;
  loading?:  boolean;
}

export function ConfirmDialog({ open, onClose, onConfirm, loading }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Eliminar usuario" width={380}>
      <p style={{
        margin:     "0 0 22px",
        color:      colors.text.secondary,
        fontSize:   font.size.base,
        lineHeight: 1.65,
      }}>
        ¿Seguro que deseas eliminar este usuario? Esta acción no se puede deshacer
        y también eliminará su perfil de la aplicación móvil.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button variant="ghost"  size="sm" onClick={onClose}   disabled={loading}>Cancelar</Button>
        <Button variant="danger" size="sm" onClick={onConfirm} loading={loading}>Eliminar</Button>
      </div>
    </Modal>
  );
}