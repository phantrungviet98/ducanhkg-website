import type { ComponentPropsWithoutRef } from "react";

type ContentSectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "default" | "muted";
};

export function ContentSection({ className, tone = "default", ...props }: ContentSectionProps) {
  const classes = ["section", tone === "muted" ? "muted" : "", className].filter(Boolean).join(" ");

  return <section className={classes} {...props} />;
}
