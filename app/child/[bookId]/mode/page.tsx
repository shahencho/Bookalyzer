"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Trophy } from "lucide-react";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";
import { BookCover } from "@/components/layout/BookCover";

const READING_MODES = [
  { id: "short", labelKey: "modeShort", points: 5, badge: "Bronze", badgeClass: "bk-bg-bronze", icon: BookOpen },
  { id: "extended", labelKey: "modeExtended", points: 5, badge: "Silver", badgeClass: "bk-bg-silver", icon: Sparkles },
  { id: "physical", labelKey: "modePhysical", points: 5, badge: "Gold", badgeClass: "bk-bg-gold", icon: Trophy },
];

interface BookSummary {
  slug: string;
  title: string;
  coverUrl: string | null;
}

export default function ModeSelectPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = use(params);
  const { lang } = useLang();
  const [book, setBook] = useState<BookSummary | null>(null);

  useEffect(() => {
    fetch(`/api/books/${bookId}`)
      .then((r) => r.json())
      .then(setBook);
  }, [bookId]);

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-16 rounded-md overflow-hidden shrink-0 bk-bg-night bk-card">
            {book && (book.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <BookCover bookSlug={book.slug} className="w-full h-full" />
            ))}
          </div>
          <div>
            <h2 className="bk-display text-2xl mb-1">{t(UI.modeHeading, lang)}</h2>
            <p className="bk-slate text-sm">{book ? `${book.title} — ` : ""}{t(UI.modeSub, lang)}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {READING_MODES.map((m) => (
            <Link
              key={m.id}
              href={`/child/${bookId}/read?mode=${m.id}`}
              className="text-left bg-white rounded-2xl p-5 bk-card hover:-translate-y-1 transition-transform block"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-4 ${m.badgeClass}`}>
                <m.icon size={16} className="text-white" />
              </div>
              <div className="bk-display text-lg mb-1">{t(UI[m.labelKey], lang)}</div>
              <div className="flex items-center justify-between bk-mono text-[10px] bk-slate mt-4">
                <span>+{m.points} XP</span>
                <span>{m.badge}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
