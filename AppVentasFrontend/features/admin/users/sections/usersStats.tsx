import React from "react";
import { Users, CheckCircle, AlertCircle, Smartphone } from "lucide-react";
import { colors } from "../theme/tokens";
import { StatCard } from "../ui/StatCard";
import type { ResUser, BillnovaUser } from "../types/user.types";

interface UsersStatsProps {
  resUsers:      ResUser[];
  billnovaUsers: BillnovaUser[];
}

export function UsersStats({ resUsers, billnovaUsers }: UsersStatsProps) {
  const total    = resUsers.length;
  const active   = resUsers.filter((u) => u.active).length;
  const inactive = total - active;
  const mobile   = billnovaUsers.filter((b) => b.is_mobile_user).length;

  return (
    <div style={{
      display:             "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
      gap:                 14,
      marginBottom:        24,
    }}>
      <StatCard
        label="Total"
        value={total}
        icon={<Users size={16} />}
        trend={12}
        trendLabel="vs mes ant."
        accent={colors.brand[600]}
        accentSoft={colors.brand[100]}
      />
      <StatCard
        label="Activos"
        value={active}
        icon={<CheckCircle size={16} />}
        trend={8}
        trendLabel="vs mes ant."
        accent={colors.success.DEFAULT}
        accentSoft={colors.success.soft}
      />
      <StatCard
        label="Inactivos"
        value={inactive}
        icon={<AlertCircle size={16} />}
        trend={-2}
        trendLabel="vs mes ant."
        accent={colors.error.DEFAULT}
        accentSoft={colors.error.soft}
      />
      <StatCard
        label="Usuarios móvil"
        value={mobile}
        icon={<Smartphone size={16} />}
        trend={15}
        trendLabel="vs mes ant."
        accent={colors.warning.DEFAULT}
        accentSoft={colors.warning.soft}
      />
    </div>
  );
}