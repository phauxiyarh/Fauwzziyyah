import { credentialStrip } from "@/content/profile";

export function CredentialStrip() {
  const items = [...credentialStrip, ...credentialStrip];
  return (
    <div className="overflow-hidden border-y border-line bg-paper py-6" aria-label="Institutions and programmes">
      <ul className="animate-marquee flex w-max items-center gap-14 pr-14">
        {items.map((name, i) => (
          <li
            key={i}
            aria-hidden={i >= credentialStrip.length}
            className="font-serif-display flex items-center gap-14 text-xl whitespace-nowrap text-stone md:text-2xl"
          >
            {name}
            <span aria-hidden className="size-1.5 rotate-45 bg-brass" />
          </li>
        ))}
      </ul>
    </div>
  );
}
