import Link from "next/link";

/** Text-only logo: "Glob" + "lly" in navy, the central "A" in royal blue, "Study" in raspberry. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="GlobAlly Study"
      className={`inline-flex items-baseline rounded-lg font-display text-[1.4rem] font-black sm:text-[1.65rem] leading-none tracking-tight ${className}`}
    >
      <span aria-hidden="true">
        <span className="text-ink">Glob</span>
        <span className="text-royal">A</span>
        <span className="text-ink">lly</span>
        <span className="text-raspberry"> Study</span>
      </span>
    </Link>
  );
}
