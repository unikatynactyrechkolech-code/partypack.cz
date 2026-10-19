type IconProps = { className?: string };

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CookieIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" />
      <path d="M16 15.5v.01" />
      <path d="M12 12v.01" />
      <path d="M11 17v.01" />
      <path d="M7 14v.01" />
    </svg>
  );
}

/** Hamburger podle vzoru: dvě silné zaoblené linky, horní kratší. */
export function MenuIcon() {
  return (
    <span className="flex w-7 flex-col items-start gap-[6px]" aria-hidden>
      <span className="block h-[3px] w-4 rounded-full bg-current transition-[width] duration-300 group-hover:w-7" />
      <span className="block h-[3px] w-7 rounded-full bg-current" />
    </span>
  );
}

export function CloseIcon({ size = "md" }: { size?: "md" | "sm" }) {
  const box = size === "md" ? "h-7 w-7" : "h-5 w-5";
  const bar = size === "md" ? "h-[3px] w-7" : "h-[2px] w-5";
  return (
    <span className={`relative block ${box}`} aria-hidden>
      <span className={`absolute left-0 top-1/2 block ${bar} -translate-y-1/2 rotate-45 rounded-full bg-current`} />
      <span className={`absolute left-0 top-1/2 block ${bar} -translate-y-1/2 -rotate-45 rounded-full bg-current`} />
    </span>
  );
}

export function SocialLinks({
  facebook,
  instagram,
  className = "",
  iconClassName = "h-5 w-5",
}: {
  facebook: string;
  instagram: string;
  className?: string;
  iconClassName?: string;
}) {
  const link =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-current/15 transition-colors hover:bg-ink hover:text-white";
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      <li>
        <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Partypack na Facebooku" className={link}>
          <FacebookIcon className={iconClassName} />
        </a>
      </li>
      <li>
        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Partypack na Instagramu" className={link}>
          <InstagramIcon className={iconClassName} />
        </a>
      </li>
    </ul>
  );
}
