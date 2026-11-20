interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, as: Tag = "h2", align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className="inline-flex items-center gap-2 text-sm font-extrabold text-raspberry">
        <span className="h-2 w-2 rounded-full bg-raspberry" aria-hidden="true" />
        {eyebrow}
      </p>
      <Tag
        className={`mt-4 font-display font-black leading-[1.1] tracking-tight text-ink ${
          Tag === "h1" ? "text-4xl sm:text-5xl lg:text-[3.5rem]" : "text-3xl sm:text-4xl lg:text-[2.75rem]"
        }`}
      >
        {title}
      </Tag>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-slate-600">{subtitle}</p>}
    </div>
  );
}
