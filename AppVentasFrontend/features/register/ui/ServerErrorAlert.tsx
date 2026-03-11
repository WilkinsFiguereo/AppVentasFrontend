/* ─────────────────────────────────────────
   REGISTER FEATURE — UI / ServerErrorAlert
───────────────────────────────────────── */

interface ServerErrorAlertProps {
  message: string;
}

export function ServerErrorAlert({ message }: ServerErrorAlertProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-[2px] border border-[#f47c7c]/25 bg-[#f47c7c]/8 px-4 py-3"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden>
        <circle cx="8" cy="8" r="7" stroke="#f47c7c" strokeWidth="1.3" />
        <path d="M8 5v4M8 10.5v.5" stroke="#f47c7c" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
      <p className="text-[13px] text-[#f47c7c] leading-snug">{message}</p>
    </div>
  );
}