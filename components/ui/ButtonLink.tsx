import Link from "next/link";

export type ButtonVariant = "primary" | "cta" | "secondary" | "light";

export const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-[translate,scale,background-color,border-color,box-shadow] duration-200 ease-out-strong hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:duration-100";

export const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-royal text-white shadow-[0_10px_24px_-10px_rgb(30_79_214/0.7)] hover:bg-royal-dark",
  cta: "bg-raspberry text-white shadow-[0_10px_24px_-10px_rgb(196_18_63/0.7)] hover:bg-raspberry-dark",
  secondary: "border-2 border-ink/10 bg-white text-ink hover:border-ink/30",
  light: "bg-white text-ink shadow-soft hover:bg-royal-soft",
};

interface ButtonLinkProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant = "primary", className = "", children }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${className}`}>
      {children}
    </Link>
  );
}
