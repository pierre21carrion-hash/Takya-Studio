"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
}

const fieldBase =
  "peer w-full rounded-2xl border bg-card px-4 pb-2.5 pt-6 text-sm text-foreground outline-none transition-colors";

function Label({ htmlFor, label, lifted }: { htmlFor: string; label: string; lifted: boolean }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "pointer-events-none absolute left-4 origin-left text-muted transition-all duration-200",
        lifted ? "top-2 text-[11px] text-accent-dark" : "top-1/2 -translate-y-1/2 text-sm",
      )}
    >
      {label}
    </label>
  );
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} role="alert" className="mt-1.5 pl-1 text-xs text-red-600">
      {error}
    </p>
  );
}

export function FloatingInput({
  id,
  name,
  label,
  value,
  onChange,
  error,
  disabled,
  type = "text",
}: FieldProps & { type?: string }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, error ? "border-red-400" : "border-border focus:border-accent")}
      />
      <Label htmlFor={id} label={label} lifted={lifted} />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function FloatingSelect({
  id,
  name,
  label,
  value,
  onChange,
  error,
  disabled,
  children,
}: FieldProps & { children: React.ReactNode }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          fieldBase,
          "appearance-none",
          error ? "border-red-400" : "border-border focus:border-accent",
        )}
      >
        {children}
      </select>
      <Label htmlFor={id} label={label} lifted={lifted} />
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        aria-hidden="true"
      >
        <path d="M1 1l5 6 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <ErrorText id={id} error={error} />
    </div>
  );
}
