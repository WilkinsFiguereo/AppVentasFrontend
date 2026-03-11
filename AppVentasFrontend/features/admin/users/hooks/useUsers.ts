import { useState, useEffect, useCallback } from "react";
import {
  apiGetResUsers,
  apiGetBillnovaUsers,
  apiDeleteResUser,
  apiDeleteBillnovaUser,
} from "../data/userApi";
import type { ResUser, BillnovaUser } from "../types/user.types";

export interface UseUsersReturn {
  resUsers:      ResUser[];
  billnovaUsers: BillnovaUser[];
  loading:       boolean;
  error:         string | null;
  deleting:      number | null;
  refresh:       () => Promise<void>;
  removeUser:    (resUserId: number) => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [resUsers,      setResUsers]      = useState<ResUser[]>([]);
  const [billnovaUsers, setBillnovaUsers] = useState<BillnovaUser[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);
  const [deleting,      setDeleting]      = useState<number | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [ru, bu] = await Promise.all([
        apiGetResUsers(),
        apiGetBillnovaUsers(),
      ]);
      setResUsers(ru);
      setBillnovaUsers(bu);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const removeUser = useCallback(async (resUserId: number) => {
    setDeleting(resUserId);
    try {
      // Primero elimina billnova.user (el cascade lo haría igual, pero lo hacemos explícito)
      const bu = billnovaUsers.find((b) => b.res_user_id === resUserId);
      if (bu) await apiDeleteBillnovaUser(bu.id);
      await apiDeleteResUser(resUserId);
      await refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setDeleting(null);
    }
  }, [billnovaUsers, refresh]);

  return { resUsers, billnovaUsers, loading, error, deleting, refresh, removeUser };
}