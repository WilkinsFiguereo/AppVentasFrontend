import React from "react";

type IconName = "user" | "at-sign" | "mail" | "lock" | "phone" | "map-pin";

const paths: Record<IconName, React.ReactNode> = {
  "user": (
    <>
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2 14.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  "at-sign": (
    <>
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.5 8c0 2 .8 2.5 1.5 2.5S14 9.5 14 8a6 6 0 1 0-1.7 4.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  "mail": (
    <>
      <rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 6l6.5 4 6.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  "lock": (
    <>
      <rect x="3.5" y="7.5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  "phone": (
    <>
      <path d="M3 2.5h3L7.5 6l-2 1.2A9 9 0 0 0 10.8 11l1.2-2 3.5 1.5v2.5A2 2 0 0 1 14 15C7 15 1 9 1 2a2 2 0 0 1 2-2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3.5-4.5 8.5-4.5 8.5S3.5 9.5 3.5 6A4.5 4.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
};

interface FieldIconProps {
  name: string;
  className?: string;
}

export function FieldIcon({ name, className = "w-4 h-4" }: FieldIconProps) {
  const icon = paths[name as IconName];
  if (!icon) return null;
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      {icon}
    </svg>
  );
}