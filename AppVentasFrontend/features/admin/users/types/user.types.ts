// ── Odoo res.users  (API REST del controller que nos diste) ─────────────────
export interface ResUser {
  id:     number;
  name:   string;
  login:  string;
  email:  string;
  active: boolean;
}

// ── billnova.user  (modelo propio, vía JSON-RPC) ─────────────────────────────
export interface BillnovaUser {
  id:             number;
  name:           string;
  email:          string;
  phone:          string;
  address:        string;
  is_mobile_user: boolean;
  res_user_id:    number; // Many2one → id del res.users relacionado
}

// ── Payload para crear ───────────────────────────────────────────────────────
export interface CreateUserPayload {
  // res.users
  name:           string;
  login:          string;
  email:          string;
  password:       string;
  // billnova.user
  phone:          string;
  address:        string;
  is_mobile_user: boolean;
}

// ── Payload para editar ──────────────────────────────────────────────────────
export type UpdateUserPayload = Partial<CreateUserPayload> & {
  active?: boolean;
};

// ── Estado del modal ─────────────────────────────────────────────────────────
export type UserModalMode = "create" | "edit" | "view";

export interface UserModalState {
  open:    boolean;
  mode:    UserModalMode;
  userId?: number;
}