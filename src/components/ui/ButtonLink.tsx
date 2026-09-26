import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ children, className, variant = "primary", ...props }: ButtonLinkProps) {
  const classes = ["button", variant, className].filter(Boolean).join(" ");

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}
