/* ═══════════════════════════════════════════════════════
   SECTION: CampaignBanner
   Location: src/features/qr-landing/sections/CampaignBanner.tsx
═══════════════════════════════════════════════════════ */

import type { Campaign } from "../types";
import { tokens } from "../theme/tokens";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

interface CampaignBannerProps {
  campaign: Campaign;
}

export function CampaignBanner({ campaign }: CampaignBannerProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div
      style={{
        background: tokens.successBg,
        border: `1px solid ${tokens.success}30`,
        borderRadius: 12,
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: tokens.success,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          🎁
        </div>
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: tokens.text,
              fontFamily: "'Sora',sans-serif",
              marginBottom: 2,
            }}
          >
            Código de descuento exclusivo
          </p>
          <p style={{ fontSize: 12, color: tokens.sub, fontFamily: "'Sora',sans-serif" }}>
            Válido hasta el {campaign.validUntil}
          </p>
        </div>
      </div>

      <button
        onClick={() => copy(campaign.code)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 18px",
          borderRadius: 9,
          background: copied ? tokens.success : tokens.surface,
          border: `1px solid ${copied ? tokens.success : tokens.border}`,
          color: copied ? "#fff" : tokens.text,
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "'Sora',sans-serif",
          letterSpacing: "1px",
          transition: "all .2s",
        }}
      >
        {copied ? "✓ Copiado" : campaign.code}
        {!copied && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="2" y="4" width="8" height="8" rx="1.5" stroke={tokens.sub} strokeWidth="1.3" />
            <path
              d="M4 4V2.5A1.5 1.5 0 015.5 1h6A1.5 1.5 0 0113 2.5v6A1.5 1.5 0 0111.5 10H10"
              stroke={tokens.sub}
              strokeWidth="1.3"
            />
          </svg>
        )}
      </button>
    </div>
  );
}