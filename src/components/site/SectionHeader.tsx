import clsx from "clsx";

type Props = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  dark?: boolean;
  className?: string;
};

export function SectionHeader({ index, eyebrow, title, lede, dark, className }: Props) {
  return (
    <header className={clsx("reveal max-w-3xl", className)}>
      <p className={clsx("eyebrow flex items-center gap-3", dark ? "text-brass" : "text-brass-deep")}>
        <span>{index}</span>
        <span aria-hidden className={clsx("h-px w-8", dark ? "bg-brass/60" : "bg-brass")} />
        <span>{eyebrow}</span>
      </p>
      <h2
        className={clsx(
          "font-serif-display mt-5 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.04] font-medium",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={clsx("mt-5 max-w-2xl text-[1.0625rem] leading-relaxed", dark ? "text-mist" : "text-stone")}>
          {lede}
        </p>
      )}
    </header>
  );
}
