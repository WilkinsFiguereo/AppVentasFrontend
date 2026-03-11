import { useState, useMemo } from "react";
import type { ResUser, BillnovaUser } from "../types/user.types";

export function useUserSearch(
  resUsers:      ResUser[],
  billnovaUsers: BillnovaUser[]
) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return resUsers;

    return resUsers.filter((u) => {
      const bu = billnovaUsers.find((b) => b.res_user_id === u.id);

      const searchable = [
        u.name,
        u.login,
        u.email,
        bu?.phone,
        bu?.address,
      ]
        .map((v) => (typeof v === "string" ? v.toLowerCase() : ""))
        .join(" ");

      return searchable.includes(q);
    });
  }, [query, resUsers, billnovaUsers]);

  return { query, setQuery, filtered };
}