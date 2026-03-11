import { UserProfile, ProfileTab } from "../types/profile.types";
import { PROFILE_TABS } from "../data/mockProfile";

interface ProfileSidebarProps {
  user: UserProfile;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

export function ProfileSidebar({ user, activeTab, onTabChange }: ProfileSidebarProps) {
  return (
    <aside className="profile-sidebar">

      {/* Avatar card */}
      <div className="avatar-card">
        <div className="avatar-card-top" />
        <div className="avatar-wrap">
          <div className="avatar">{user.avatarInitials}</div>
          <button className="avatar-edit" aria-label="Cambiar foto">✏️</button>
        </div>
        <div className="avatar-info">
          <p className="avatar-name">{user.firstName} {user.lastName}</p>
          <p className="avatar-email">{user.email}</p>
          <div className="avatar-stats">
            <div className="a-stat">
              <div className="a-stat-num">{user.totalOrders}</div>
              <div className="a-stat-label">pedidos</div>
            </div>
            <div className="a-stat">
              <div className="a-stat-num">${(user.totalSpent / 1000).toFixed(1)}k</div>
              <div className="a-stat-label">gastado</div>
            </div>
            <div className="a-stat">
              <div className="a-stat-num">{user.savedItems}</div>
              <div className="a-stat-label">guardados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="profile-nav">
        {PROFILE_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`pnav-item${activeTab === tab.id ? " active" : ""}`}
            onClick={() => onTabChange(tab.id as ProfileTab)}
          >
            <span className="pnav-icon">{tab.icon}</span>
            {tab.label}
            <span className="pnav-arrow">›</span>
          </button>
        ))}
      </nav>

      {/* Member since */}
      <div className="member-card">
        <div className="member-icon">🗓️</div>
        <div>
          <div className="member-label">Miembro desde</div>
          <div className="member-value">{user.memberSince}</div>
        </div>
      </div>
    </aside>
  );
}