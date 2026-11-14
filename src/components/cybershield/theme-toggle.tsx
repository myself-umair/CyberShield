"use client";

import { useEffect, useState } from "react";
import { Moon, Skull, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  { value: "light", label: "Light mode", icon: Sun },
  { value: "dark", label: "Dark mode", icon: Moon },
  { value: "hacker", label: "Hacker mode", icon: Skull },
] as const;

type ThemeValue = (typeof THEME_OPTIONS)[number]["value"];

/**
 * Tri-mode skin switch (LIGHT · DARK · HACKER) — a compact radiogroup
 * living in the top utility bar.
 *
 * - LIGHT  — crisp white day mode with the red signal accent
 * - DARK   — the classic navy/aqua mission-control glass HUD
 * - HACKER — Hexwall matrix-green skin; the skull segment lights up
 *            with a green glow ring while the skin is active
 *
 * The active segment is gated behind a rAF-deferred mount flag:
 * `resolvedTheme` is undefined on the server and through hydration, so
 * every segment renders neutral first and the right one lights up a
 * frame after mount — no hydration attribute mismatch possible.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const active: ThemeValue | null = mounted
    ? ((resolvedTheme as ThemeValue | undefined) ?? "dark")
    : null;

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-lg border border-cyber-border bg-cyber-surface p-0.5",
        className,
      )}
    >
      {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={cn(
              "flex h-7 w-8 cursor-pointer items-center justify-center rounded-md transition-all duration-200",
              isActive
                ? "bg-cyber-teal/15 text-cyber-teal shadow-[0_0_10px_rgba(var(--teal-rgb),0.45)]"
                : "text-mid hover:bg-cyber-raised hover:text-cyber-teal",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
