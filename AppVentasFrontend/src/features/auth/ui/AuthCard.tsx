import React from "react";
import Link from "next/link";

// ─── Google SVG icon ───────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

// ─── Branding (left panel) config ─────────────────────────────────────────
interface BrandingConfig {
  headline: React.ReactNode;
  subtext: string;
  stats: Array<{ value: string; label: string }>;
  testimonial: { quote: string; name: string; role: string; initials: string };
}

// ─── AuthCard ──────────────────────────────────────────────────────────────
interface AuthCardProps {
  title: string;
  subtitle: string;
  googleLabel: string;
  onGoogleClick?: () => void;
  dividerLabel?: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
  branding: BrandingConfig;
}

export function AuthCard({
  title,
  subtitle,
  googleLabel,
  onGoogleClick,
  dividerLabel = "o continúa con email",
  children,
  footerText,
  footerLinkLabel,
  footerLinkHref,
  branding,
}: AuthCardProps) {
  return (
    <div className="auth-layout">
      {/* ── Left branding panel ── */}
      <div className="auth-panel-left">
        <div className="auth-left-top">
          <div className="auth-logo">
            <div className="auth-logo-mark">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="auth-logo-name">Acme</span>
          </div>

          <h2 className="auth-panel-headline">{branding.headline}</h2>
          <p className="auth-panel-sub">{branding.subtext}</p>

          <div className="auth-stats">
            {branding.stats.map((s) => (
              <div key={s.label}>
                <div className="auth-stat-num">{s.value}</div>
                <div className="auth-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-left-bottom">
          <div className="auth-testimonial">
            <p>"{branding.testimonial.quote}"</p>
            <div className="auth-t-author">
              <div className="auth-t-avatar">{branding.testimonial.initials}</div>
              <div>
                <div className="auth-t-name">{branding.testimonial.name}</div>
                <div className="auth-t-role">{branding.testimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-panel-right">
        <div className="auth-form-wrap">
          <h1 className="auth-form-title">{title}</h1>
          <p className="auth-form-subtitle">{subtitle}</p>

          <button
            type="button"
            className="auth-btn-google"
            onClick={onGoogleClick}
          >
            <GoogleIcon />
            {googleLabel}
          </button>

          <div className="auth-divider">
            <span>{dividerLabel}</span>
          </div>

          {children}

          <p className="auth-footer-text">
            {footerText}{" "}
            <Link href={footerLinkHref} className="auth-link">
              {footerLinkLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}