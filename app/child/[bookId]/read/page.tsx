"use client";

import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";
import { BookCover } from "@/components/layout/BookCover";
import { fetchOrRedirect } from "@/lib/fetchOrRedirect";

interface BookDetail {
  id: number;
  slug: string;
  title: string;
  shortSummary: string;
  extendedSummary: string;
  coverUrl: string | null;
}

const MODE_LABEL_KEY: Record<string, string> = { short: "modeShort", extended: "modeExtended", physical: "modePhysical" };

export default function ReadPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "short";
  const { lang } = useLang();

  const [book, setBook] = useState<BookDetail | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    fetchOrRedirect<BookDetail | null>(`/api/books/${bookId}`, router, "/child/login", null).then(setBook);
  }, [bookId, router]);

  async function handleStart() {
    setStarting(true);
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: Number(bookId), readingMode: mode.toUpperCase() }),
    });
    const data = await res.json();
    setStarting(false);
    if (res.ok) {
      router.push(`/child/session/${data.sessionId}`);
    }
  }

  if (!book) return <div className="bk-bg-cream min-h-[560px] px-6 py-10 text-center bk-slate text-sm">...</div>;

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-5 sm:p-8 bk-card">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-16 rounded-md overflow-hidden shrink-0 bk-bg-night bk-card">
            {book.coverUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={book.coverUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <BookCover bookSlug={book.slug} className="w-full h-full" />
            )}
          </div>
          <div>
            <div className="bk-mono text-[10px] bk-gold mb-1">{t(UI[MODE_LABEL_KEY[mode]], lang).toUpperCase()}</div>
            <h2 className="bk-display text-2xl">{book.title}</h2>
          </div>
        </div>
        {mode === "physical" ? (
          <div>
            <p className="bk-slate text-sm mb-6 leading-relaxed">{t(UI.physicalInstructions, lang)}</p>
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">{t(UI.physicalConfirm, lang)}</span>
            </label>
          </div>
        ) : (
          <p className="bk-slate text-sm mb-6 leading-relaxed whitespace-pre-line">
            {mode === "short" ? book.shortSummary : book.extendedSummary}
          </p>
        )}
        <button
          disabled={(mode === "physical" && !confirmed) || starting}
          onClick={handleStart}
          className="bk-btn-dark rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-30"
        >
          {t(UI.startAssessment, lang)}
        </button>
      </div>
    </div>
  );
}
