"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchProfile,
  updateProfile,
  changePassword,
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  fetchNotifications,
  updateNotifications,
  fetchOrders,
  ProfileData,
  Address,
  NotificationPrefs,
  Order,
  OrdersResponse,
  AddressPayload,
  ChangePasswordPayload,
  UpdateProfilePayload,
} from "../api/profileApi";

export type ProfileTab = "general" | "orders" | "addresses" | "security" | "notifications";

// ── State shapes ──────────────────────────────────────────────────────────────
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface MutationState {
  saving: boolean;
  success: boolean;
  error: string | null;
}

function useMutation() {
  const [state, setState] = useState<MutationState>({ saving: false, success: false, error: null });

  async function run<T>(fn: () => Promise<T>): Promise<T | null> {
    setState({ saving: true, success: false, error: null });
    try {
      const result = await fn();
      setState({ saving: false, success: true, error: null });
      setTimeout(() => setState((s) => ({ ...s, success: false })), 2500);
      return result;
    } catch (e) {
      setState({ saving: false, success: false, error: (e as Error).message });
      return null;
    }
  }

  return { ...state, run };
}

// ── Main hook ─────────────────────────────────────────────────────────────────
export function useProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("general");

  // ── Profile ──────────────────────────────────────────────────────────────────
  const [profile, setProfile] = useState<AsyncState<ProfileData>>({ data: null, loading: true, error: null });
  const profileMut = useMutation();

  useEffect(() => {
    fetchProfile()
      .then((data) => setProfile({ data, loading: false, error: null }))
      .catch((e) => setProfile({ data: null, loading: false, error: e.message }));
  }, []);

  const saveProfile = useCallback(
    async (payload: UpdateProfilePayload) => {
      const updated = await profileMut.run(() => updateProfile(payload));
      if (updated) setProfile((s) => ({ ...s, data: updated }));
    },
    [profileMut]
  );

  // ── Password ──────────────────────────────────────────────────────────────────
  const passwordMut = useMutation();

  const savePassword = useCallback(
    async (payload: ChangePasswordPayload) => {
      await passwordMut.run(() => changePassword(payload));
    },
    [passwordMut]
  );

  // ── Addresses ─────────────────────────────────────────────────────────────────
  const [addresses, setAddresses] = useState<AsyncState<Address[]>>({ data: null, loading: false, error: null });
  const addressMut = useMutation();

  const loadAddresses = useCallback(async () => {
    setAddresses((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchAddresses();
      setAddresses({ data, loading: false, error: null });
    } catch (e) {
      setAddresses({ data: null, loading: false, error: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    if (activeTab === "addresses") loadAddresses();
  }, [activeTab, loadAddresses]);

  const addAddress = useCallback(
    async (payload: AddressPayload) => {
      const newAddr = await addressMut.run(() => createAddress(payload));
      if (newAddr) setAddresses((s) => ({ ...s, data: [...(s.data ?? []), newAddr] }));
    },
    [addressMut]
  );

  const editAddress = useCallback(
    async (id: number, payload: Partial<AddressPayload>) => {
      const updated = await addressMut.run(() => updateAddress(id, payload));
      if (updated)
        setAddresses((s) => ({
          ...s,
          data: s.data?.map((a) => (a.id === id ? updated : a)) ?? [],
        }));
    },
    [addressMut]
  );

  const removeAddress = useCallback(
    async (id: number) => {
      const ok = await addressMut.run(() => deleteAddress(id));
      if (ok) setAddresses((s) => ({ ...s, data: s.data?.filter((a) => a.id !== id) ?? [] }));
    },
    [addressMut]
  );

  const makeDefaultAddress = useCallback(
    async (id: number) => {
      const ok = await addressMut.run(() => setDefaultAddress(id));
      if (ok)
        setAddresses((s) => ({
          ...s,
          data: s.data?.map((a) => ({ ...a, is_default: a.id === id })) ?? [],
        }));
    },
    [addressMut]
  );

  // ── Notifications ─────────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState<AsyncState<NotificationPrefs>>({
    data: null,
    loading: false,
    error: null,
  });
  const notifMut = useMutation();

  const loadNotifications = useCallback(async () => {
    setNotifications((s) => ({ ...s, loading: true }));
    try {
      const data = await fetchNotifications();
      setNotifications({ data, loading: false, error: null });
    } catch (e) {
      setNotifications({ data: null, loading: false, error: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    if (activeTab === "notifications") loadNotifications();
  }, [activeTab, loadNotifications]);

  const toggleNotification = useCallback(
    async (key: keyof NotificationPrefs) => {
      if (!notifications.data) return;
      const next = { ...notifications.data, [key]: !notifications.data[key] };
      setNotifications((s) => ({ ...s, data: next })); // optimistic
      const saved = await notifMut.run(() => updateNotifications({ [key]: next[key] }));
      if (!saved) setNotifications((s) => ({ ...s, data: notifications.data })); // rollback
    },
    [notifications.data, notifMut]
  );

  // ── Orders ────────────────────────────────────────────────────────────────────
  const [orders, setOrders] = useState<AsyncState<OrdersResponse>>({ data: null, loading: false, error: null });

  const loadOrders = useCallback(async (limit = 20, offset = 0) => {
    setOrders((s) => ({ ...s, loading: true }));
    try {
      const data = await fetchOrders(limit, offset);
      setOrders({ data, loading: false, error: null });
    } catch (e) {
      setOrders({ data: null, loading: false, error: (e as Error).message });
    }
  }, []);

  useEffect(() => {
    if (activeTab === "orders") loadOrders();
  }, [activeTab, loadOrders]);

  return {
    activeTab,
    setActiveTab,

    profile,
    profileMut,
    saveProfile,

    passwordMut,
    savePassword,

    addresses,
    addressMut,
    addAddress,
    editAddress,
    removeAddress,
    makeDefaultAddress,

    notifications,
    notifMut,
    toggleNotification,

    orders,
    loadOrders,
  };
}