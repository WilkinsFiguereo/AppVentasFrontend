import { useState, useEffect } from "react";
import {
  apiGetResUserById,
  apiGetBillnovaUsers,
  apiCreateResUser,
  apiCreateBillnovaUser,
  apiUpdateResUser,
  apiUpdateBillnovaUser,
} from "../data/userApi";
import type { CreateUserPayload, UserModalMode } from "../types/user.types";

const EMPTY_FORM: CreateUserPayload = {
  name:           "",
  login:          "",
  email:          "",
  password:       "",
  phone:          "",
  address:        "",
  is_mobile_user: false,
};

export interface UseUserFormReturn {
  form:        CreateUserPayload;
  loading:     boolean;
  submitting:  boolean;
  error:       string | null;
  setField:    <K extends keyof CreateUserPayload>(key: K, value: CreateUserPayload[K]) => void;
  handleSubmit:(onSuccess: () => void) => Promise<void>;
}

export function useUserForm(
  mode:    UserModalMode,
  userId?: number
): UseUserFormReturn {
  const [form,       setForm]       = useState<CreateUserPayload>(EMPTY_FORM);
  const [loading,    setLoading]    = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  // Cargar datos cuando mode = edit | view
  useEffect(() => {
    if ((mode === "edit" || mode === "view") && userId) {
      setLoading(true);
      Promise.all([apiGetResUserById(userId), apiGetBillnovaUsers()])
        .then(([ru, bus]) => {
          const bu = bus.find((b) => b.res_user_id === userId);
          setForm({
            name:           ru.name,
            login:          ru.login,
            email:          ru.email,
            password:       "",
            phone:          bu?.phone          ?? "",
            address:        bu?.address        ?? "",
            is_mobile_user: bu?.is_mobile_user ?? false,
          });
        })
        .catch((e) => setError((e as Error).message))
        .finally(()  => setLoading(false));
    } else {
      setForm(EMPTY_FORM);
      setError(null);
    }
  }, [mode, userId]);

  function setField<K extends keyof CreateUserPayload>(
    key:   K,
    value: CreateUserPayload[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  async function handleSubmit(onSuccess: () => void) {
    setSubmitting(true);
    setError(null);
    try {
      if (mode === "create") {
        // 1. Crea res.users
        const { id: resUserId } = await apiCreateResUser({
          name:     form.name,
          login:    form.login,
          email:    form.email,
          password: form.password,
        });
        // 2. Crea billnova.user vinculado
        await apiCreateBillnovaUser({
          name:           form.name,
          email:          form.email,
          phone:          form.phone,
          address:        form.address,
          is_mobile_user: form.is_mobile_user,
          res_user_id:    resUserId,
        });

      } else if (mode === "edit" && userId) {
        // Actualiza res.users (solo campos que tienen valor)
        await apiUpdateResUser(userId, {
          name:     form.name     || undefined,
          login:    form.login    || undefined,
          email:    form.email    || undefined,
          password: form.password || undefined,
        });
        // Actualiza billnova.user
        const bus = await apiGetBillnovaUsers();
        const bu  = bus.find((b) => b.res_user_id === userId);
        if (bu) {
          await apiUpdateBillnovaUser(bu.id, {
            phone:          form.phone,
            address:        form.address,
            is_mobile_user: form.is_mobile_user,
          });
        }
      }
      onSuccess();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return { form, loading, submitting, error, setField, handleSubmit };
}