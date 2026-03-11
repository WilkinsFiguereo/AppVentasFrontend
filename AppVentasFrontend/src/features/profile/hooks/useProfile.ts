"use client";

import { useState, useCallback } from "react";
import { ProfileTab, ProfileFormData, PasswordFormData, NotificationPrefs } from "../types/profile.types";
import { MOCK_USER, MOCK_NOTIFICATIONS } from "../data/mockProfile";

export function useProfile() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("general");
  const [user, setUser] = useState(MOCK_USER);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveProfile = useCallback(async (data: ProfileFormData) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setUser((prev) => ({
      ...prev,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      avatarInitials: `${data.firstName[0]}${data.lastName[0]}`.toUpperCase(),
    }));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  }, []);

  const savePassword = useCallback(async (_data: PasswordFormData) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  }, []);

  const toggleNotification = useCallback((key: keyof NotificationPrefs) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return {
    activeTab, setActiveTab,
    user, notifications,
    isSaving, saveSuccess,
    saveProfile, savePassword, toggleNotification,
  };
}