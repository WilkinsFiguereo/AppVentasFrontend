import React from "react";

// ─── InputField ─────────────────────────────────────────────────────────────
interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  labelSuffix?: React.ReactNode;
}

export function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  labelSuffix,
}: InputFieldProps) {
  return (
    <div className="auth-field">
      <label className="auth-label" htmlFor={name}>
        {label}
        {labelSuffix && (
          <span style={{ fontWeight: 400, color: "var(--auth-text-3)", marginLeft: 4 }}>
            {labelSuffix}
          </span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`auth-input${error ? " auth-input--error" : ""}`}
      />
      {error && <span className="auth-field-error">{error}</span>}
    </div>
  );
}

// ─── FieldRow (two columns) ──────────────────────────────────────────────────
export function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="auth-field-row">{children}</div>;
}

// ─── SubmitButton ─────────────────────────────────────────────────────────────
interface SubmitButtonProps {
  label: string;
  isLoading: boolean;
}
export function SubmitButton({ label, isLoading }: SubmitButtonProps) {
  return (
    <button type="submit" className="auth-btn-primary" disabled={isLoading}>
      {isLoading ? <span className="auth-btn-spinner" /> : label}
    </button>
  );
}

// ─── ErrorBanner ─────────────────────────────────────────────────────────────
export function ErrorBanner({ message }: { message: string }) {
  return <div className="auth-error-banner">{message}</div>;
}

// ─── RowBetween ───────────────────────────────────────────────────────────────
export function RowBetween({ children }: { children: React.ReactNode }) {
  return <div className="auth-row-between">{children}</div>;
}

// ─── CheckboxField (terms) ────────────────────────────────────────────────────
interface CheckboxFieldProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  children: React.ReactNode;
}
export function CheckboxField({ name, checked, onChange, error, children }: CheckboxFieldProps) {
  return (
    <div>
      <label className="auth-terms-label">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} />
        <span>{children}</span>
      </label>
      {error && <span className="auth-field-error" style={{ marginTop: 4, display: "block" }}>{error}</span>}
    </div>
  );
}

// ─── RememberRow ─────────────────────────────────────────────────────────────
interface RememberRowProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  forgotHref: string;
}
export function RememberRow({ checked, onChange, forgotHref }: RememberRowProps) {
  return (
    <div className="auth-row-between">
      <label className="auth-check-label">
        <input type="checkbox" name="rememberMe" checked={checked} onChange={onChange} />
        Recordarme
      </label>
      <a href={forgotHref} className="auth-link">
        ¿Olvidaste tu contraseña?
      </a>
    </div>
  );
}