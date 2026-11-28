import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";

/**
 * Wordmark: the brand "G" mark followed by "lob" + "lly" in navy, the central "A" in royal blue, "Study" in raspberry.
 * The mark is sized in em from Nunito Black metrics so the G body matches the text's capital height
 * (0.727em including overshoot), sits 0.011em below the baseline like a round glyph, and keeps the
 * font's own G side bearings (0.046em / 0.059em, minus the tracking applied to the text).
 * The negative top margin cancels the cap overhang (0.341em) so it does not grow the line box.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="GlobAlly Study"
      className={`inline-flex items-baseline rounded-lg font-display text-[1.4rem] font-black sm:text-[1.65rem] leading-none tracking-tight ${className}`}
    >
      <span aria-hidden="true" className="whitespace-nowrap">
        <LogoMark className="-mt-[0.341em] ml-[0.046em] mr-[0.034em] inline-block h-[1.068em] w-[0.712em] align-[-0.011em]" />
        <span className="text-ink">lob</span>
        <span className="text-royal">A</span>
        <span className="text-ink">lly</span>
        <span className="text-raspberry"> Study</span>
      </span>
    </Link>
  );
}
