/* Book cover art.
   Mowgli (The Jungle Book, 1894) and Pollyanna (1913) are public domain in the
   US, so their real first-edition cover art is used, sourced from Wikimedia
   Commons. Everything else uses original stylized art in the app's own
   visual language instead of real cover art (either because of copyright
   status, or simply to keep the visual set consistent and reliable). */
const COVERS: Record<string, { type: "image"; url: string } | { type: "art"; art: string }> = {
  "little-prince": { type: "art", art: "planet" },
  "the-little-prince": { type: "art", art: "planet" },
  mowgli: { type: "image", url: "https://commons.wikimedia.org/wiki/Special:FilePath/JunglebookCover.jpg" },
  pollyanna: {
    type: "image",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Pollyanna_(Eleanor_Porter_book)_first_edition_cover.jpg",
  },
  "harry-potter": { type: "art", art: "castle" },
  neznaika: { type: "art", art: "hat" },
  "emerald-city": { type: "art", art: "emerald" },
  karlsson: { type: "art", art: "propeller" },
  prostokvashino: { type: "art", art: "cottage" },
  buratino: { type: "art", art: "key" },
  "crooked-mirrors": { type: "art", art: "mirror" },
  "alice-in-wonderland": { type: "art", art: "cards" },
  "winnie-the-pooh": { type: "art", art: "honey" },
  "emil-of-lonneberga": { type: "art", art: "overalls" },
  "pippi-longstocking": { type: "art", art: "braids" },
  "the-secret-garden": { type: "art", art: "garden" },
};

export function BookCover({ bookSlug, className = "" }: { bookSlug: string; className?: string }) {
  const cover = COVERS[bookSlug];
  if (cover?.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={cover.url} alt="" className={`object-cover ${className}`} loading="lazy" />;
  }
  const art = cover?.art;

  if (art === "planet") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <radialGradient id="pp-sky" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#141A28" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-sky)" />
        {[...Array(18)].map((_, i) => (
          <circle key={i} cx={(i * 47) % 200} cy={(i * 71) % 140} r={i % 3 === 0 ? 1.6 : 0.9} fill="#F3E3B8" opacity={0.4 + (i % 4) * 0.15} />
        ))}
        <circle cx="100" cy="150" r="34" fill="#E3A94F" />
        <rect x="96" y="94" width="8" height="30" rx="4" fill="#6B9080" />
        <circle cx="100" cy="88" r="7" fill="#D8697A" />
      </svg>
    );
  }
  if (art === "castle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-castle" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F4066" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-castle)" />
        <circle cx="150" cy="40" r="14" fill="#F3E3B8" opacity="0.85" />
        <path d="M40 170 V110 L55 95 V110 H70 V90 L85 75 V110 H100 V70 L115 55 V110 H130 V95 L145 110 V170 Z" fill="#0F1420" opacity="0.9" />
        <rect x="40" y="170" width="105" height="10" fill="#0F1420" />
      </svg>
    );
  }
  if (art === "hat") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-hat-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-hat-bg)" />
        <ellipse cx="100" cy="120" rx="70" ry="16" fill="#1B2436" />
        <path d="M65 120 Q65 65 100 65 Q135 65 135 120 Z" fill="#D8697A" />
        <circle cx="100" cy="60" r="9" fill="#F3ECDD" />
        {[...Array(10)].map((_, i) => (
          <circle key={i} cx={40 + ((i * 13) % 130)} cy={150 + (i % 3) * 12} r="3" fill="#F3ECDD" opacity="0.6" />
        ))}
      </svg>
    );
  }
  if (art === "emerald") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-em-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B2436" />
            <stop offset="100%" stopColor="#0F1420" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-em-bg)" />
        <path d="M20 150 Q100 110 180 150" stroke="#E3A94F" strokeWidth="6" fill="none" opacity="0.8" />
        <polygon points="100,45 130,75 118,120 82,120 70,75" fill="#4E9E7A" stroke="#7FCBA4" strokeWidth="3" />
      </svg>
    );
  }
  if (art === "propeller") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-roof-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-roof-bg)" />
        <polygon points="30,140 100,90 170,140" fill="#B4772F" />
        <rect x="45" y="140" width="110" height="35" fill="#D8697A" opacity="0.85" />
        <circle cx="100" cy="70" r="6" fill="#F3ECDD" />
        <ellipse cx="100" cy="70" rx="26" ry="5" fill="#F3E3B8" opacity="0.8" />
        <ellipse cx="100" cy="70" rx="5" ry="26" fill="#F3E3B8" opacity="0.6" />
      </svg>
    );
  }
  if (art === "cottage") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-cot-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B9080" />
            <stop offset="100%" stopColor="#3A4A66" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-cot-bg)" />
        <polygon points="60,120 100,85 140,120" fill="#B4772F" />
        <rect x="70" y="120" width="60" height="45" fill="#F3ECDD" opacity="0.9" />
        <rect x="93" y="135" width="14" height="30" fill="#7A5C7E" />
        <circle cx="150" cy="60" r="12" fill="#F3E3B8" opacity="0.8" />
      </svg>
    );
  }
  if (art === "key") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-key-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F4066" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-key-bg)" />
        <circle cx="80" cy="80" r="22" fill="none" stroke="#E3A94F" strokeWidth="8" />
        <rect x="95" y="95" width="10" height="55" fill="#E3A94F" />
        <rect x="95" y="130" width="24" height="9" fill="#E3A94F" />
        <rect x="95" y="115" width="18" height="9" fill="#E3A94F" />
      </svg>
    );
  }
  if (art === "mirror") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-mir-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5C7E" />
            <stop offset="100%" stopColor="#1B2436" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-mir-bg)" />
        <ellipse cx="100" cy="100" rx="45" ry="60" fill="#D8E3F0" opacity="0.25" />
        <ellipse cx="100" cy="100" rx="45" ry="60" fill="none" stroke="#F3E3B8" strokeWidth="6" />
        <path d="M70 70 Q100 100 70 130" stroke="#F3ECDD" strokeWidth="3" fill="none" opacity="0.7" />
      </svg>
    );
  }
  if (art === "cards") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-cards-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8697A" />
            <stop offset="100%" stopColor="#1B2436" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-cards-bg)" />
        <rect x="60" y="60" width="45" height="65" rx="4" fill="#F3ECDD" transform="rotate(-8 82 92)" />
        <rect x="95" y="60" width="45" height="65" rx="4" fill="#F3ECDD" transform="rotate(8 117 92)" />
        <path d="M92 100 l-9 -12 h5 l4 5 4 -5 h5 z" fill="#D8697A" transform="rotate(-8 82 92)" />
        <circle cx="100" cy="60" r="10" fill="#F3E3B8" opacity="0.8" />
      </svg>
    );
  }
  if (art === "honey") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-honey-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#6B9080" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-honey-bg)" />
        <path d="M75 80 Q75 60 100 60 Q125 60 125 80 V140 Q125 155 100 155 Q75 155 75 140 Z" fill="#B4772F" />
        <rect x="80" y="75" width="40" height="10" fill="#F3ECDD" opacity="0.85" />
        <text x="100" y="120" fontSize="22" textAnchor="middle" fill="#F3ECDD" fontFamily="serif">
          🍯
        </text>
      </svg>
    );
  }
  if (art === "overalls") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-overalls-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B9080" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-overalls-bg)" />
        <rect x="70" y="90" width="60" height="70" rx="6" fill="#3A4A75" />
        <rect x="75" y="70" width="14" height="30" fill="#3A4A75" />
        <rect x="111" y="70" width="14" height="30" fill="#3A4A75" />
        <circle cx="82" cy="105" r="4" fill="#E3A94F" />
        <circle cx="118" cy="105" r="4" fill="#E3A94F" />
        <ellipse cx="100" cy="55" rx="20" ry="12" fill="#B4772F" />
      </svg>
    );
  }
  if (art === "braids") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-braids-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8697A" />
            <stop offset="100%" stopColor="#E3A94F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-braids-bg)" />
        <circle cx="100" cy="90" r="34" fill="#F3ECDD" />
        <path d="M70 85 Q40 100 45 140 Q55 145 60 130 Q55 105 70 95 Z" fill="#E3A94F" />
        <path d="M130 85 Q160 100 155 140 Q145 145 140 130 Q145 105 130 95 Z" fill="#E3A94F" />
        <circle cx="45" cy="140" r="6" fill="#D8697A" />
        <circle cx="155" cy="140" r="6" fill="#D8697A" />
      </svg>
    );
  }
  if (art === "garden") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-garden-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B9080" />
            <stop offset="100%" stopColor="#3A4A66" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-garden-bg)" />
        <rect x="55" y="50" width="90" height="110" rx="4" fill="#7A5C7E" opacity="0.5" />
        <circle cx="100" cy="105" r="18" fill="none" stroke="#E3A94F" strokeWidth="5" />
        <circle cx="100" cy="105" r="4" fill="#E3A94F" />
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={60 + ((i * 23) % 90)} cy={45 + ((i * 37) % 110)} r="4" fill="#F3E3B8" opacity="0.7" />
        ))}
      </svg>
    );
  }
  return null;
}
