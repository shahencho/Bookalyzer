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

  "fox-without-a-tail": { type: "art", art: "foxtail" },
  "the-dog-and-the-cat": { type: "art", art: "ring" },
  "gndlik-bokh": { type: "art", art: "beetle" },
  "the-gruffalo": { type: "art", art: "gruffalo" },
  "the-very-hungry-caterpillar": { type: "art", art: "caterpillar" },
  "brave-nazar": { type: "art", art: "belt" },
  anahit: { type: "art", art: "blossom" },
  "the-happy-prince": { type: "art", art: "swallow" },
  pinocchio: { type: "art", art: "nose" },
  "nils-wonderful-adventures": { type: "art", art: "goose" },

  gikor: { type: "art", art: "shoes" },
  "the-liar-tumanyan": { type: "art", art: "wolfbubble" },
  "the-bear-and-the-fox": { type: "art", art: "turnip" },
  "wizard-of-oz": { type: "art", art: "silvershoes" },
  "peter-pan": { type: "art", art: "pixiedust" },
  "operas-courtyard": { type: "art", art: "archway" },
  "komitas-soul-of-the-people": { type: "art", art: "duduk" },
  "dreams-come-true-elon-musk": { type: "art", art: "rocket" },
  "happy-prince-and-other-tales": { type: "art", art: "rose" },
  "mio-my-mio": { type: "art", art: "farawayland" },

  "the-railway-children": { type: "art", art: "steamtrain" },
  "the-crystal-glass-man": { type: "art", art: "crystal" },
  "wizard-plus-raven": { type: "art", art: "raven" },
  "charlie-and-the-great-glass-elevator": { type: "art", art: "elevator" },
  coraline: { type: "art", art: "buttondoor" },
  heidi: { type: "art", art: "alpine" },
  "tom-sawyer": { type: "art", art: "fence" },
  "agatha-odli-mysterious-key": { type: "art", art: "oldkey" },
  "3a-class-expedition": { type: "art", art: "compass" },
  "on-the-shore-of-sevan": { type: "art", art: "rowboat" },

  "treasure-island": { type: "art", art: "treasuremap" },
  "white-fang": { type: "art", art: "wolfsnow" },
  "ballet-shoes": { type: "art", art: "balletshoes" },
  "emil-and-the-detectives": { type: "art", art: "berlin" },
  "secret-of-the-dragon-rock": { type: "art", art: "vishap" },
  "carpathian-castle": { type: "art", art: "hauntedcastle" },
  "twenty-thousand-leagues": { type: "art", art: "nautilus" },
  "the-hobbit": { type: "art", art: "hobbitdoor" },
  "sherlock-holmes-adventures": { type: "art", art: "deerstalker" },
  "david-of-sassoun": { type: "art", art: "sassoun" },

  vardanank: { type: "art", art: "candle" },
  "anne-of-green-gables": { type: "art", art: "braidgable" },
  "a-little-princess": { type: "art", art: "tincrown" },
  "the-graveyard-book": { type: "art", art: "gravestone" },
  "the-madman-raffi": { type: "art", art: "torch" },
  "the-white-horse-bakunts": { type: "art", art: "fieldhorse" },
  "the-superfluous-one": { type: "art", art: "apart" },
  "anne-frank-diary": { type: "art", art: "window" },
  skellig: { type: "art", art: "wings" },
  "the-owl-service": { type: "art", art: "owlplate" },
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
  if (art === "foxtail") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-fox-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-fox-bg)" />
        <path d="M60 145 Q60 95 100 82 Q140 95 140 145 Z" fill="#141A28" />
        <polygon points="70,88 58,58 86,82" fill="#141A28" />
        <polygon points="130,88 142,58 114,82" fill="#141A28" />
        <polygon points="100,112 132,122 100,132" fill="#F3ECDD" />
        <ellipse cx="146" cy="146" rx="9" ry="7" fill="#141A28" />
        <circle cx="151" cy="140" r="5" fill="#F3ECDD" />
      </svg>
    );
  }
  if (art === "ring") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-ring-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4E9E7A" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-ring-bg)" />
        <circle cx="100" cy="65" r="18" fill="none" stroke="#E3A94F" strokeWidth="7" />
        <circle cx="62" cy="140" r="14" fill="#141A28" />
        <circle cx="47" cy="118" r="6" fill="#141A28" />
        <circle cx="62" cy="112" r="6" fill="#141A28" />
        <circle cx="77" cy="118" r="6" fill="#141A28" />
        <polygon points="122,152 152,142 152,162" fill="#7FCBA4" />
        <circle cx="152" cy="152" r="9" fill="#7FCBA4" />
      </svg>
    );
  }
  if (art === "beetle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-beetle-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7FCBA4" />
            <stop offset="100%" stopColor="#4E9E7A" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-beetle-bg)" />
        <rect x="0" y="132" width="200" height="26" fill="#B4772F" opacity="0.55" />
        <circle cx="100" cy="108" r="28" fill="#141A28" />
        <path d="M100 80 A28 28 0 0 1 100 136" stroke="#D8697A" strokeWidth="4" fill="none" />
        <circle cx="90" cy="94" r="4" fill="#F3E3B8" />
        <circle cx="100" cy="78" r="6" fill="#141A28" />
      </svg>
    );
  }
  if (art === "gruffalo") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-gruf-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B9080" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-gruf-bg)" />
        <polygon points="20,200 60,120 100,200" fill="#4E9E7A" opacity="0.7" />
        <polygon points="100,200 140,110 190,200" fill="#4E9E7A" opacity="0.7" />
        <polygon points="60,200 100,140 140,200" fill="#6B9080" opacity="0.85" />
        <circle cx="82" cy="112" r="9" fill="#E3A94F" />
        <circle cx="118" cy="112" r="9" fill="#E3A94F" />
        <path d="M75 137 Q80 152 90 140" stroke="#F3ECDD" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M125 137 Q120 152 110 140" stroke="#F3ECDD" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "caterpillar") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-cat-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F3E3B8" />
            <stop offset="100%" stopColor="#7FCBA4" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-cat-bg)" />
        <circle cx="40" cy="152" r="14" fill="#4E9E7A" />
        <circle cx="62" cy="136" r="14" fill="#7FCBA4" />
        <circle cx="86" cy="123" r="14" fill="#4E9E7A" />
        <circle cx="110" cy="119" r="14" fill="#7FCBA4" />
        <circle cx="132" cy="128" r="12" fill="#4E9E7A" />
        <circle cx="150" cy="88" r="22" fill="#D8697A" />
        <rect x="147" y="64" width="6" height="14" fill="#6B9080" />
      </svg>
    );
  }
  if (art === "belt") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-belt-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-belt-bg)" />
        <rect x="30" y="108" width="140" height="26" rx="4" fill="#7A5C7E" transform="rotate(-4 100 121)" />
        <rect x="30" y="108" width="140" height="6" fill="#E3A94F" transform="rotate(-4 100 121)" />
        <rect x="30" y="128" width="140" height="6" fill="#E3A94F" transform="rotate(-4 100 121)" />
        <path d="M87 113 H113 L95 145" stroke="#F3E3B8" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="152" cy="66" r="3.5" fill="#141A28" />
        <path d="M147 64 L153 60 M147 68 L153 72" stroke="#141A28" strokeWidth="1.5" />
      </svg>
    );
  }
  if (art === "blossom") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-blossom-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8697A" />
            <stop offset="100%" stopColor="#F3ECDD" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-blossom-bg)" />
        <circle cx="95" cy="80" r="26" fill="#2F4066" />
        <path d="M50 170 Q50 120 95 118 Q140 120 140 170 Z" fill="#2F4066" />
        <circle cx="145" cy="150" r="5" fill="#D8697A" />
        <circle cx="138" cy="145" r="5" fill="#D8697A" />
        <circle cx="152" cy="145" r="5" fill="#D8697A" />
        <circle cx="145" cy="140" r="5" fill="#D8697A" />
        <circle cx="145" cy="146" r="3" fill="#E3A94F" />
      </svg>
    );
  }
  if (art === "swallow") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-prince-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B4772F" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-prince-bg)" />
        <circle cx="95" cy="60" r="16" fill="#E3A94F" />
        <path d="M65 165 Q65 90 95 85 Q125 90 125 165 Z" fill="#E3A94F" />
        <path d="M120 95 Q136 89 147 98 Q135 101 127 106 Z" fill="#141A28" />
        <circle cx="95" cy="130" r="5" fill="#D8697A" />
      </svg>
    );
  }
  if (art === "nose") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-nose-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-nose-bg)" />
        <circle cx="90" cy="112" r="34" fill="#F3E3B8" />
        <polygon points="122,110 175,102 122,120" fill="#B4772F" />
        <polygon points="58,82 90,28 122,82" fill="#D8697A" />
        <circle cx="90" cy="32" r="5" fill="#4E9E7A" />
      </svg>
    );
  }
  if (art === "goose") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-goose-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E3F0" />
            <stop offset="100%" stopColor="#3A4A75" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-goose-bg)" />
        <ellipse cx="100" cy="120" rx="42" ry="24" fill="#F3ECDD" />
        <path d="M70 110 Q40 80 60 58 Q80 90 90 108 Z" fill="#D8E3F0" />
        <path d="M130 110 Q160 80 140 58 Q120 90 110 108 Z" fill="#D8E3F0" />
        <circle cx="145" cy="106" r="10" fill="#F3ECDD" />
        <polygon points="155,104 169,108 155,112" fill="#E3A94F" />
        <circle cx="95" cy="96" r="7" fill="#141A28" />
        <rect x="90" y="101" width="10" height="14" rx="3" fill="#141A28" />
      </svg>
    );
  }
  if (art === "shoes") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-shoes-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-shoes-bg)" />
        <polygon points="15,150 85,75 135,150" fill="#141A28" opacity="0.55" />
        <rect x="148" y="128" width="9" height="18" fill="#141A28" opacity="0.75" />
        <rect x="160" y="120" width="8" height="26" fill="#141A28" opacity="0.75" />
        <rect x="171" y="132" width="9" height="14" fill="#141A28" opacity="0.75" />
        <rect x="30" y="172" width="140" height="5" fill="#141A28" opacity="0.5" />
        <path d="M55 168 Q50 157 63 155 Q76 153 81 160 Q84 167 75 169 Z" fill="#B4772F" />
        <path d="M92 168 Q87 157 100 155 Q113 153 118 160 Q121 167 112 169 Z" fill="#B4772F" />
      </svg>
    );
  }
  if (art === "wolfbubble") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-wolf-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-wolf-bg)" />
        <circle cx="58" cy="108" r="15" fill="#141A28" />
        <path d="M43 128 Q58 120 73 128 L78 175 L38 175 Z" fill="#141A28" />
        <path d="M71 116 L96 92" stroke="#141A28" strokeWidth="8" strokeLinecap="round" />
        <path d="M108 92 Q108 62 140 62 Q172 62 172 92 Q172 112 148 116 L108 96 Z" fill="#F3ECDD" opacity="0.92" />
        <polygon points="122,78 130,62 137,80" fill="#7A5C7E" />
        <polygon points="150,80 158,62 165,78" fill="#7A5C7E" />
        <ellipse cx="143" cy="92" rx="19" ry="14" fill="#7A5C7E" />
        <polygon points="135,100 143,111 151,100" fill="#7A5C7E" />
      </svg>
    );
  }
  if (art === "turnip") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-turnip-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B9080" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-turnip-bg)" />
        <ellipse cx="55" cy="138" rx="22" ry="14" fill="#D8697A" />
        <polygon points="45,126 50,105 59,124" fill="#D8697A" />
        <polygon points="62,124 71,105 76,126" fill="#D8697A" />
        <path d="M33 138 Q19 143 24 127" stroke="#D8697A" strokeWidth="6" fill="none" strokeLinecap="round" />
        <ellipse cx="145" cy="138" rx="27" ry="19" fill="#141A28" />
        <circle cx="127" cy="114" r="8" fill="#141A28" />
        <circle cx="163" cy="114" r="8" fill="#141A28" />
        <rect x="83" y="160" width="34" height="5" rx="2.5" fill="#7A5C7E" opacity="0.6" />
        <path d="M93 160 Q88 145 93 133" stroke="#4E9E7A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M107 160 Q114 145 109 133" stroke="#4E9E7A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="100" cy="163" rx="11" ry="6" fill="#F3ECDD" opacity="0.9" />
      </svg>
    );
  }
  if (art === "silvershoes") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-oz-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E3F0" />
            <stop offset="100%" stopColor="#3A4A75" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-oz-bg)" />
        <rect x="96" y="88" width="10" height="14" fill="#4E9E7A" />
        <rect x="112" y="70" width="11" height="32" fill="#4E9E7A" />
        <rect x="128" y="82" width="10" height="20" fill="#4E9E7A" />
        <rect x="142" y="65" width="12" height="37" fill="#4E9E7A" />
        {[...Array(6)].map((_, i) => (
          <rect key={i} x={40 + i * 16} y={150 - (i % 3) * 6} width="12" height="12" rx="2" fill="#E3A94F" />
        ))}
        <path d="M56 175 Q51 164 64 162 Q76 160 80 167 Q83 173 75 175 Z" fill="#D8E3F0" />
        <path d="M88 175 Q83 164 96 162 Q108 160 112 167 Q115 173 107 175 Z" fill="#D8E3F0" />
      </svg>
    );
  }
  if (art === "pixiedust") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-pixie-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2F4066" />
            <stop offset="100%" stopColor="#4E9E7A" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-pixie-bg)" />
        <path d="M155 40 A28 28 0 1 0 155 96 A20 20 0 1 1 155 40 Z" fill="#F3E3B8" opacity="0.85" />
        <circle cx="112" cy="98" r="9" fill="#141A28" />
        <path d="M104 106 Q90 112 80 125 Q66 133 58 148 L64 152 Q75 138 88 130 Q100 122 110 116 Z" fill="#141A28" />
        {[...Array(7)].map((_, i) => (
          <circle key={i} cx={60 + i * 8} cy={150 - i * 9} r={i % 2 === 0 ? 2 : 1.2} fill="#7FCBA4" opacity={0.9 - i * 0.1} />
        ))}
      </svg>
    );
  }
  if (art === "archway") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-arch-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#D8697A" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-arch-bg)" />
        <circle cx="100" cy="72" r="38" fill="#F3ECDD" opacity="0.3" />
        <path d="M55 175 V112 Q55 70 100 70 Q145 70 145 112 V175 Z" fill="none" stroke="#7A5C7E" strokeWidth="10" />
        <rect x="48" y="170" width="104" height="8" fill="#7A5C7E" />
        <circle cx="85" cy="150" r="8" fill="#141A28" />
        <rect x="79" y="158" width="12" height="18" fill="#141A28" />
        <circle cx="113" cy="153" r="7" fill="#141A28" />
        <rect x="107" y="160" width="10" height="15" fill="#141A28" />
      </svg>
    );
  }
  if (art === "duduk") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-duduk-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-duduk-bg)" />
        <rect x="90" y="42" width="14" height="122" rx="7" fill="#B4772F" />
        <circle cx="97" cy="68" r="2.5" fill="#F3ECDD" />
        <circle cx="97" cy="83" r="2.5" fill="#F3ECDD" />
        <circle cx="97" cy="98" r="2.5" fill="#F3ECDD" />
        <circle cx="97" cy="113" r="2.5" fill="#F3ECDD" />
        <circle cx="134" cy="118" r="8" fill="#F3E3B8" />
        <rect x="140" y="70" width="4" height="48" fill="#F3E3B8" />
        <path d="M144 70 Q160 75 157 91" fill="none" stroke="#F3E3B8" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "rocket") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-rocket-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141A28" />
            <stop offset="100%" stopColor="#7A5C7E" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-rocket-bg)" />
        {[...Array(10)].map((_, i) => (
          <circle key={i} cx={(i * 53) % 200} cy={(i * 37) % 70} r={i % 3 === 0 ? 1.8 : 1} fill="#F3E3B8" opacity={0.5 + (i % 4) * 0.12} />
        ))}
        <polygon points="90,145 100,168 110,145" fill="#E3A94F" />
        <rect x="90" y="90" width="20" height="55" rx="8" fill="#F3ECDD" />
        <polygon points="90,90 100,58 110,90" fill="#D8697A" />
        <polygon points="90,128 74,153 90,146" fill="#3A4A75" />
        <polygon points="110,128 126,153 110,146" fill="#3A4A75" />
        <circle cx="100" cy="108" r="6" fill="#7A5C7E" />
      </svg>
    );
  }
  if (art === "rose") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-rose-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8697A" />
            <stop offset="100%" stopColor="#E3A94F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-rose-bg)" />
        <path d="M100 152 V98" stroke="#4E9E7A" strokeWidth="4" />
        <path d="M100 132 L84 141 M100 121 L119 129" stroke="#4E9E7A" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 95 Q79 90 81 69 Q83 54 100 59 Q117 54 119 69 Q121 90 100 95 Z" fill="#7A5C7E" />
        <path d="M100 89 Q84 84 87 69 Q89 59 100 62 Q111 59 113 69 Q116 84 100 89 Z" fill="#D8697A" />
        <path d="M100 81 Q91 77 93 69 Q95 64 100 66 Q105 64 107 69 Q109 77 100 81 Z" fill="#F3ECDD" opacity="0.9" />
      </svg>
    );
  }
  if (art === "farawayland") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-mio-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4E9E7A" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-mio-bg)" />
        <circle cx="148" cy="55" r="16" fill="#F3E3B8" opacity="0.4" />
        <rect x="130" y="95" width="14" height="45" fill="#2F4066" />
        <polygon points="130,95 137,80 144,95" fill="#2F4066" />
        <rect x="150" y="105" width="20" height="35" fill="#2F4066" />
        <polygon points="150,105 160,88 170,105" fill="#2F4066" />
        <ellipse cx="58" cy="150" rx="26" ry="12" fill="#F3ECDD" />
        <path d="M38 148 Q28 138 33 126" stroke="#F3ECDD" strokeWidth="8" strokeLinecap="round" fill="none" />
        <rect x="36" y="150" width="6" height="18" fill="#F3ECDD" />
        <rect x="73" y="150" width="6" height="18" fill="#F3ECDD" />
        <circle cx="53" cy="126" r="7" fill="#141A28" />
        <path d="M48 133 Q58 128 63 138 L61 148 L45 148 Z" fill="#141A28" />
      </svg>
    );
  }
  if (art === "steamtrain") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-train-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E3F0" />
            <stop offset="100%" stopColor="#6B9080" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-train-bg)" />
        <polygon points="145,115 168,95 191,115" fill="#B4772F" />
        <rect x="153" y="115" width="30" height="30" fill="#F3ECDD" opacity="0.9" />
        <rect x="158" y="92" width="4" height="10" fill="#3A4A75" />
        <rect x="166" y="88" width="4" height="14" fill="#3A4A75" />
        <rect x="174" y="92" width="4" height="10" fill="#3A4A75" />
        <rect x="15" y="118" width="80" height="26" rx="6" fill="#3A4A75" />
        <rect x="25" y="98" width="10" height="22" fill="#141A28" />
        <circle cx="35" cy="150" r="9" fill="#141A28" />
        <circle cx="75" cy="150" r="9" fill="#141A28" />
      </svg>
    );
  }
  if (art === "crystal") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-crystal-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#D8E3F0" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-crystal-bg)" />
        <circle cx="100" cy="105" r="55" fill="#F3ECDD" opacity="0.15" />
        <polygon points="100,40 135,95 118,165 82,165 65,95" fill="#D8E3F0" opacity="0.35" stroke="#F3ECDD" strokeWidth="3" />
        <polygon points="100,40 135,95 65,95" fill="#F3ECDD" opacity="0.35" />
        <circle cx="100" cy="90" r="9" fill="none" stroke="#2F4066" strokeWidth="3" opacity="0.8" />
        <path d="M88 100 Q100 95 112 100 L114 145 Q100 154 86 145 Z" fill="none" stroke="#2F4066" strokeWidth="3" opacity="0.8" />
      </svg>
    );
  }
  if (art === "raven") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-raven-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F4066" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-raven-bg)" />
        <path d="M100 50 Q110 90 128 138 L72 138 Q90 90 100 50 Z" fill="#7A5C7E" />
        <ellipse cx="100" cy="138" rx="36" ry="8" fill="#141A28" />
        <ellipse cx="148" cy="128" rx="15" ry="10" fill="#141A28" />
        <polygon points="161,126 170,129 161,133" fill="#E3A94F" />
        <circle cx="55" cy="65" r="3" fill="#F3E3B8" opacity="0.8" />
        <circle cx="70" cy="48" r="2" fill="#F3E3B8" opacity="0.6" />
      </svg>
    );
  }
  if (art === "elevator") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-elevator-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141A28" />
            <stop offset="100%" stopColor="#7A5C7E" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-elevator-bg)" />
        {[...Array(6)].map((_, i) => (
          <circle key={i} cx={20 + ((i * 31) % 160)} cy={20 + ((i * 53) % 60)} r={i % 2 === 0 ? 1.6 : 1} fill="#F3E3B8" opacity="0.7" />
        ))}
        <circle cx="150" cy="45" r="13" fill="#4E9E7A" />
        <ellipse cx="146" cy="41" rx="6" ry="3" fill="#7FCBA4" opacity="0.8" />
        <rect x="78" y="95" width="52" height="72" rx="5" fill="#D8E3F0" opacity="0.25" stroke="#F3ECDD" strokeWidth="3" />
        <rect x="88" y="110" width="32" height="4" fill="#F3ECDD" opacity="0.7" />
        <rect x="88" y="122" width="32" height="4" fill="#F3ECDD" opacity="0.7" />
      </svg>
    );
  }
  if (art === "buttondoor") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-door-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B9080" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-door-bg)" />
        <rect x="65" y="55" width="60" height="115" fill="#141A28" />
        <rect x="65" y="55" width="42" height="115" fill="#3A4A75" transform="rotate(-10 65 55)" />
        <circle cx="100" cy="112" r="3" fill="#E3A94F" transform="rotate(-10 65 55)" />
        <ellipse cx="150" cy="162" rx="14" ry="9" fill="#141A28" />
        <polygon points="140,155 144,144 149,155" fill="#141A28" />
        <polygon points="152,155 157,144 161,155" fill="#141A28" />
        <path d="M163 163 Q176 152 171 137" stroke="#141A28" strokeWidth="3" fill="none" />
      </svg>
    );
  }
  if (art === "alpine") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-alpine-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E3F0" />
            <stop offset="100%" stopColor="#6B9080" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-alpine-bg)" />
        <polygon points="100,45 155,150 45,150" fill="#3A4A75" />
        <polygon points="100,45 117,80 83,80" fill="#F3ECDD" />
        <circle cx="68" cy="158" r="6" fill="#141A28" />
        <polygon points="60,164 76,164 72,182 64,182" fill="#D8697A" />
        <ellipse cx="122" cy="170" rx="12" ry="7" fill="#F3ECDD" />
        <circle cx="132" cy="164" r="4" fill="#F3ECDD" />
      </svg>
    );
  }
  if (art === "fence") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-fence-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#3A4A75" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-fence-bg)" />
        <path d="M15 140 Q60 128 100 140 T185 140" stroke="#D8E3F0" strokeWidth="4" fill="none" opacity="0.7" />
        {[30, 55, 80, 120, 145, 170].map((x, i) => (
          <rect key={i} x={x} y="128" width="10" height="45" fill="#F3ECDD" opacity="0.9" />
        ))}
        <circle cx="102" cy="118" r="8" fill="#141A28" />
        <rect x="95" y="124" width="14" height="20" fill="#141A28" />
        <path d="M108 128 L155 150" stroke="#B4772F" strokeWidth="2" fill="none" />
        <circle cx="155" cy="150" r="2.5" fill="#D8697A" />
      </svg>
    );
  }
  if (art === "oldkey") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-oldkey-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B4772F" />
            <stop offset="100%" stopColor="#F3E3B8" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-oldkey-bg)" />
        <rect x="45" y="100" width="105" height="68" rx="3" fill="#F3ECDD" opacity="0.95" />
        <rect x="96" y="100" width="3" height="68" fill="#D8E3F0" opacity="0.6" />
        <circle cx="70" cy="90" r="14" fill="none" stroke="#E3A94F" strokeWidth="6" transform="rotate(-14 70 90)" />
        <rect x="83" y="87" width="62" height="7" fill="#E3A94F" transform="rotate(-14 70 90)" />
        <rect x="138" y="87" width="7" height="12" fill="#E3A94F" transform="rotate(-14 70 90)" />
        <rect x="128" y="87" width="6" height="9" fill="#E3A94F" transform="rotate(-14 70 90)" />
        <circle cx="158" cy="140" r="13" fill="none" stroke="#3A4A75" strokeWidth="4" />
        <rect x="166" y="147" width="18" height="5" rx="2" fill="#3A4A75" transform="rotate(45 166 147)" />
      </svg>
    );
  }
  if (art === "compass") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-compass-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7FCBA4" />
            <stop offset="100%" stopColor="#3A4A75" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-compass-bg)" />
        <polygon points="0,145 35,105 65,132 105,85 145,128 200,112 200,165 0,165" fill="#2F4066" opacity="0.55" />
        <circle cx="100" cy="98" r="30" fill="#F3ECDD" stroke="#B4772F" strokeWidth="4" />
        <polygon points="100,76 109,98 100,120 91,98" fill="#D8697A" />
        <rect x="48" y="150" width="18" height="24" rx="4" fill="#B4772F" />
        <rect x="134" y="150" width="18" height="24" rx="4" fill="#6B9080" />
      </svg>
    );
  }
  if (art === "rowboat") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-rowboat-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#E3A94F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-rowboat-bg)" />
        <circle cx="100" cy="70" r="20" fill="#F3E3B8" opacity="0.8" />
        <polygon points="0,118 40,94 80,113 120,88 160,108 200,98 200,128 0,128" fill="#7A5C7E" opacity="0.6" />
        <rect x="97" y="122" width="6" height="28" fill="#B4772F" transform="rotate(8 100 136)" />
        <path d="M68 156 Q100 178 132 156 L123 148 H77 Z" fill="#B4772F" />
      </svg>
    );
  }
  if (art === "treasuremap") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-map-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F3E3B8" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-map-bg)" />
        <rect x="35" y="35" width="130" height="130" rx="4" fill="#F3ECDD" stroke="#B4772F" strokeWidth="3" transform="rotate(-4 100 100)" />
        <path d="M120 70 l10 10 m-10 0 l10 -10" stroke="#D8697A" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 130 L100 100" stroke="#3A4A75" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 100 L100 130" stroke="#141A28" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="130" r="4" fill="#B4772F" />
        <circle cx="60" cy="100" r="4" fill="#141A28" />
      </svg>
    );
  }
  if (art === "wolfsnow") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-wolfsnow-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E3F0" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-wolfsnow-bg)" />
        <path d="M50 150 L50 130 Q50 115 62 112 L68 92 Q72 82 80 88 L86 102 L112 102 Q126 96 138 106 L150 102 L144 118 L138 120 L134 150 L120 150 L120 130 L96 130 L96 150 L82 150 L82 132 L62 132 L62 150 Z" fill="#141A28" />
        <path d="M62 112 Q48 105 52 90" stroke="#141A28" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="165" cy="55" r="5" fill="#E3A94F" opacity="0.9" />
        <rect x="0" y="165" width="200" height="35" fill="#D8E3F0" opacity="0.3" />
      </svg>
    );
  }
  if (art === "balletshoes") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-ballet-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8697A" />
            <stop offset="100%" stopColor="#F3ECDD" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-ballet-bg)" />
        <circle cx="100" cy="105" r="22" fill="none" stroke="#B4772F" strokeWidth="3" opacity="0.85" />
        <path d="M100 90 Q112 95 108 108 Q100 118 92 108 Q88 95 100 90 Z" fill="#B4772F" opacity="0.6" />
        <path d="M55 155 Q48 140 62 133 Q78 130 80 143 Q78 155 63 156 Z" fill="#F3ECDD" />
        <path d="M62 133 L57 112" stroke="#F3ECDD" strokeWidth="2" />
        <path d="M145 155 Q152 140 138 133 Q122 130 120 143 Q122 155 137 156 Z" fill="#F3ECDD" />
        <path d="M138 133 L143 112" stroke="#F3ECDD" strokeWidth="2" />
        <rect x="35" y="55" width="26" height="9" rx="4" fill="#F3E3B8" />
        <path d="M140 55 L162 61 L140 67 Z" fill="#7A5C7E" />
        <rect x="128" y="59" width="16" height="4" fill="#7A5C7E" />
      </svg>
    );
  }
  if (art === "berlin") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-berlin-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#E3A94F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-berlin-bg)" />
        <path d="M20 60 H180 M60 30 V90 M130 40 V100 M20 120 H150" stroke="#F3ECDD" strokeWidth="1.5" opacity="0.25" fill="none" />
        <rect x="45" y="95" width="80" height="40" rx="6" fill="#141A28" />
        <rect x="58" y="103" width="20" height="14" rx="2" fill="#F3E3B8" opacity="0.85" />
        <circle cx="60" cy="140" r="8" fill="#141A28" />
        <circle cx="110" cy="140" r="8" fill="#141A28" />
        <path d="M128 100 q10 -3 8 6 q-2 7 -10 5" stroke="#B4772F" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="145" cy="60" r="16" fill="none" stroke="#F3ECDD" strokeWidth="4" />
        <path d="M156 71 L172 87" stroke="#F3ECDD" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "vishap") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-vishap-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5C7E" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-vishap-bg)" />
        <polygon points="0,170 60,120 110,160 160,110 200,170 200,200 0,200" fill="#141A28" opacity="0.8" />
        <path d="M85 160 V80 Q85 65 100 65 Q115 65 115 80 V160 Z" fill="#3A4A75" />
        <path d="M90 110 Q100 100 110 110 Q100 108 95 118 Q90 112 90 110 Z" fill="none" stroke="#D8E3F0" strokeWidth="2" opacity="0.7" />
        <circle cx="60" cy="90" r="4" fill="#E3A94F" opacity="0.9" />
        <circle cx="130" cy="105" r="3.5" fill="#E3A94F" opacity="0.8" />
      </svg>
    );
  }
  if (art === "hauntedcastle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-haunted-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F4066" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-haunted-bg)" />
        <ellipse cx="125" cy="50" rx="20" ry="26" fill="#F3ECDD" opacity="0.12" />
        <polygon points="25,175 100,85 175,175" fill="#3A4A75" opacity="0.6" />
        <polygon points="65,150 72,125 80,140 90,105 100,132 110,115 118,140 128,150 128,175 65,175" fill="#141A28" />
        <rect x="92" y="148" width="12" height="12" fill="#E3A94F" opacity="0.9" />
      </svg>
    );
  }
  if (art === "nautilus") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-nautilus-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2F4066" />
            <stop offset="100%" stopColor="#4E9E7A" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-nautilus-bg)" />
        <path d="M120 60 Q90 40 60 65 Q95 55 130 90 Q150 105 145 130 Q120 105 90 85" stroke="#7FCBA4" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="100" cy="110" rx="55" ry="22" fill="#141A28" />
        <path d="M45 110 Q30 108 25 118 Q35 122 45 116 Z" fill="#141A28" />
        <circle cx="105" cy="108" r="9" fill="#D8E3F0" opacity="0.85" />
        <circle cx="105" cy="108" r="9" fill="none" stroke="#F3ECDD" strokeWidth="2" />
      </svg>
    );
  }
  if (art === "hobbitdoor") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-hobbit-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D8E3F0" />
            <stop offset="100%" stopColor="#6B9080" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-hobbit-bg)" />
        <polygon points="140,120 165,70 190,120" fill="#7A5C7E" opacity="0.35" />
        <circle cx="95" cy="110" r="48" fill="#4E9E7A" stroke="#2F4066" strokeWidth="5" />
        <circle cx="112" cy="110" r="6" fill="#E3A94F" />
        <circle cx="90" cy="168" r="9" fill="none" stroke="#E3A94F" strokeWidth="4" />
      </svg>
    );
  }
  if (art === "deerstalker") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-deerstalker-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-deerstalker-bg)" />
        <path d="M140 40 Q165 45 160 65 Q150 60 148 50 Q145 42 140 40 Z" fill="none" stroke="#F3ECDD" strokeWidth="1.5" opacity="0.25" />
        <path d="M65 95 Q65 78 85 75 L115 75 Q135 78 135 95 L135 105 L65 105 Z" fill="#141A28" />
        <polygon points="55,100 70,85 70,105" fill="#141A28" />
        <polygon points="145,100 130,85 130,105" fill="#141A28" />
        <path d="M80 118 Q62 122 60 138 Q59 148 70 150 Q72 142 68 136 Q66 128 80 124 Z" fill="#141A28" />
        <circle cx="100" cy="155" r="20" fill="none" stroke="#F3ECDD" strokeWidth="4" />
        <path d="M115 170 L130 185" stroke="#F3ECDD" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }
  if (art === "sassoun") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-sassoun-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-sassoun-bg)" />
        <polygon points="0,180 40,150 80,170 120,140 160,165 200,150 200,200 0,200" fill="#141A28" />
        <path d="M70 150 Q65 120 80 100 Q75 90 85 80 Q90 70 95 78 Q100 65 108 75 L100 90 Q115 95 112 110 Q125 100 128 115 Q118 130 105 125 Q110 145 95 150 Q90 135 92 122 Q80 130 70 150 Z" fill="#B4772F" />
        <path d="M120 50 L108 75 L118 75 L102 105" stroke="#F3E3B8" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (art === "candle") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-candle-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B4772F" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-candle-bg)" />
        <polygon points="30,160 42,150 54,160 54,172 42,180 30,172" fill="#141A28" opacity="0.35" />
        <polygon points="60,164 72,154 84,164 84,176 72,184 60,176" fill="#141A28" opacity="0.3" />
        <polygon points="140,164 152,154 164,164 164,176 152,184 140,176" fill="#141A28" opacity="0.3" />
        <polygon points="166,160 178,150 190,160 190,172 178,180 166,172" fill="#141A28" opacity="0.35" />
        <rect x="94" y="110" width="12" height="60" rx="3" fill="#F3ECDD" />
        <path d="M100 70 Q112 90 100 110 Q88 90 100 70 Z" fill="#E3A94F" />
      </svg>
    );
  }
  if (art === "braidgable") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-braidgable-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#D8697A" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-braidgable-bg)" />
        <rect x="55" y="140" width="90" height="30" fill="#7A5C7E" opacity="0.5" />
        <polygon points="60,140 100,90 140,140" fill="#4E9E7A" />
        <path d="M100 92 Q82 108 90 128 Q72 136 68 158 Q80 166 90 154 Q96 138 100 128" fill="#D8697A" />
      </svg>
    );
  }
  if (art === "tincrown") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-tincrown-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7A5C7E" />
            <stop offset="100%" stopColor="#B4772F" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-tincrown-bg)" />
        <rect x="50" y="130" width="100" height="14" rx="2" fill="#3A4A75" />
        <polygon points="80,130 85,108 95,122 100,102 105,122 115,108 120,130" fill="#F3E3B8" />
        <rect x="135" y="105" width="6" height="25" fill="#F3ECDD" />
        <path d="M138 92 Q144 102 138 112 Q132 102 138 92 Z" fill="#E3A94F" />
      </svg>
    );
  }
  if (art === "gravestone") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-gravestone-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#141A28" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-gravestone-bg)" />
        <circle cx="155" cy="45" r="16" fill="#D8E3F0" opacity="0.85" />
        <rect x="68" y="105" width="34" height="65" rx="14" fill="#2F4066" />
        <circle cx="115" cy="150" r="8" fill="#141A28" />
        <rect x="108" y="158" width="14" height="24" rx="4" fill="#141A28" />
        <path d="M145 170 Q145 110 160 95 Q175 110 175 170 Z" fill="#141A28" />
        <circle cx="160" cy="100" r="9" fill="#141A28" />
      </svg>
    );
  }
  if (art === "torch") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-torch-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-torch-bg)" />
        <path d="M0 150 Q100 110 200 150 V200 H0 Z" fill="#141A28" />
        <polygon points="40,150 48,140 56,150" fill="#141A28" opacity="0.6" />
        <polygon points="150,150 158,140 166,150" fill="#141A28" opacity="0.6" />
        <path d="M92 150 L100 100 L108 150 Z" fill="#141A28" />
        <circle cx="100" cy="94" r="6" fill="#141A28" />
        <rect x="108" y="70" width="4" height="35" fill="#141A28" />
        <path d="M110 70 Q116 58 110 46 Q104 58 110 70 Z" fill="#E3A94F" />
      </svg>
    );
  }
  if (art === "fieldhorse") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-fieldhorse-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#6B9080" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-fieldhorse-bg)" />
        <path d="M20 150 Q100 130 180 150 V200 H20 Z" fill="#4E9E7A" />
        <polygon points="130,120 150,80 170,120" fill="#7A5C7E" opacity="0.6" />
        <ellipse cx="90" cy="130" rx="28" ry="16" fill="#F3ECDD" />
        <path d="M115 122 Q130 110 128 95 Q122 98 118 108 Q112 112 110 122 Z" fill="#F3ECDD" />
        <rect x="70" y="140" width="6" height="20" fill="#F3ECDD" />
        <rect x="100" y="140" width="6" height="20" fill="#F3ECDD" />
      </svg>
    );
  }
  if (art === "apart") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-apart-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3A4A75" />
            <stop offset="100%" stopColor="#7A5C7E" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-apart-bg)" />
        <circle cx="50" cy="100" r="8" fill="#2F4066" />
        <rect x="42" y="108" width="16" height="35" rx="6" fill="#2F4066" />
        <circle cx="68" cy="105" r="7" fill="#2F4066" />
        <rect x="61" y="112" width="14" height="30" rx="6" fill="#2F4066" />
        <circle cx="150" cy="95" r="9" fill="#141A28" />
        <rect x="141" y="104" width="18" height="40" rx="6" fill="#141A28" />
      </svg>
    );
  }
  if (art === "window") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-window-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141A28" />
            <stop offset="100%" stopColor="#2F4066" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-window-bg)" />
        <rect x="60" y="55" width="80" height="95" rx="4" fill="#E3A94F" />
        <rect x="60" y="55" width="80" height="95" rx="4" fill="#F3E3B8" opacity="0.35" />
        <path d="M96 55 H104 V150 H96 Z M60 98 H140 V106 H60 Z" fill="#2F4066" opacity="0.6" />
        <path d="M85 165 Q85 150 100 150 Q115 150 115 165 Z" fill="#6B9080" />
        <path d="M92 150 Q88 138 95 128 Q100 138 98 150 Z" fill="#4E9E7A" />
      </svg>
    );
  }
  if (art === "wings") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-wings-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3A94F" />
            <stop offset="100%" stopColor="#7A5C7E" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-wings-bg)" />
        <rect x="45" y="60" width="110" height="90" fill="none" stroke="#3A4A75" strokeWidth="5" opacity="0.6" />
        <path d="M100 130 Q70 100 75 60 Q95 85 100 130 Z" fill="#F3E3B8" opacity="0.85" />
        <path d="M100 130 Q130 100 125 60 Q105 85 100 130 Z" fill="#F3E3B8" opacity="0.7" />
        <path d="M100 130 Q80 115 78 90 Q95 100 100 130 Z" fill="#F3ECDD" opacity="0.6" />
      </svg>
    );
  }
  if (art === "owlplate") {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <defs>
          <linearGradient id="pp-owlplate-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4E9E7A" />
            <stop offset="100%" stopColor="#7A5C7E" />
          </linearGradient>
        </defs>
        <rect width="200" height="200" fill="url(#pp-owlplate-bg)" />
        <circle cx="100" cy="100" r="65" fill="none" stroke="#F3E3B8" strokeWidth="5" />
        <path d="M60 120 Q75 100 90 120 Q75 135 60 120 Z" fill="#7FCBA4" opacity="0.8" />
        <path d="M140 120 Q125 100 110 120 Q125 135 140 120 Z" fill="#7FCBA4" opacity="0.8" />
        <circle cx="80" cy="90" r="14" fill="#F3ECDD" opacity="0.9" />
        <circle cx="120" cy="90" r="14" fill="#F3ECDD" opacity="0.9" />
        <circle cx="80" cy="90" r="5" fill="#2F4066" />
        <circle cx="120" cy="90" r="5" fill="#2F4066" />
      </svg>
    );
  }
  return null;
}
