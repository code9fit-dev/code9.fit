"use client";

import { useEffect } from "react";

/**
 * Sets the document theme for the subtree that renders it, restoring the
 * previous theme on unmount.
 *
 * Per C9F_App_Architecture_v1.md §2.8 the theme is auth-state driven, NOT a
 * user toggle: logged-out (marketing) = "warm-sand", logged-in (product) =
 * "signature" (dark). Until real auth exists, mounting this in the logged-in
 * area (onboarding onward) stands in for that boundary. When auth lands, a
 * root-level provider should read auth state as the source of truth instead.
 */
export function ThemeController({
  theme,
}: {
  theme: "warm-sand" | "signature";
}) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.getAttribute("data-theme");
    root.setAttribute("data-theme", theme);
    return () => {
      root.setAttribute("data-theme", previous ?? "warm-sand");
    };
  }, [theme]);

  return null;
}
