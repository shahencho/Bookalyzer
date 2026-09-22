"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, Sparkles, BookOpen } from "lucide-react";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";
import { BookCover } from "@/components/layout/BookCover";
import { fetchOrRedirect } from "@/lib/fetchOrRedirect";

// Static placeholder list — books not yet on the platform, shown to signal
// future growth. Not wired to any book/mode/assessment flow.
const RECOMMENDATIONS = [
  { title: { en: "Charlotte's Web", hy: "Շառլոթի ցանցը", ru: "Паутина Шарлотты" }, author: "E.B. White" },
  { title: { en: "The Wind in the Willows", hy: "Քամին ուռիների մեջ", ru: "Ветер в ивах" }, author: "Kenneth Grahame" },
  { title: { en: "Charlie and the Chocolate Factory", hy: "Չարլին և շոկոլադի ֆաբրիկան", ru: "Чарли и шоколадная фабрика" }, author: "Roald Dahl" },
];

interface LibraryBook {
  id: number;
  slug: string;
  title: string;
  author: string;
  genre: string;
  shortSummary: string;
  coverUrl: string | null;
}

export default function ChildLibraryPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams({ lang });
    if (q) params.set("q", q);
    if (genre) params.set("genre", genre);
    setLoading(true);
    fetchOrRedirect(`/api/books?${params.toString()}`, router, "/child/login", [] as LibraryBook[])
      .then(setBooks)
      .finally(() => setLoading(false));
  }, [q, genre, lang, router]);

  const genres = [...new Set(books.map((b) => b.genre))];

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10 relative">
      <Link href="/child/profile" className="bk-avatar-btn absolute top-6 right-6" title={t(UI.profileHeading, lang)}>
        <User size={16} className="bk-gold" />
      </Link>
      <div className="max-w-3xl mx-auto">
        <h2 className="bk-display text-2xl mb-1">{t(UI.libraryHeading, lang)}</h2>
        <p className="bk-slate text-sm mb-6">{t(UI.librarySub, lang)}</p>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 bk-slate" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(UI.searchPlaceholder, lang)}
              className="w-full border bk-border rounded-lg pl-9 pr-3 py-2 text-sm outline-none"
            />
          </div>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border bk-border rounded-lg px-3 py-2 text-sm outline-none"
          >
            <option value="">{lang === "hy" ? "Բոլոր ժանրերը" : lang === "ru" ? "Все жанры" : "All genres"}</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="bk-slate text-sm">...</p>
        ) : books.length === 0 ? (
          <p className="bk-slate text-sm">{t(UI.noResults, lang)}</p>
        ) : (
          <div className="grid sm:grid-cols-3 gap-4">
            {books.map((b) => (
              <Link
                key={b.id}
                href={`/child/${b.id}/mode`}
                className="rounded-2xl p-5 bk-card bk-bg-night block hover:-translate-y-1 transition-transform"
              >
                <div className="h-28 rounded-lg mb-4 overflow-hidden">
                  {b.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.coverUrl} alt={b.title} className="w-full h-full object-cover" />
                  ) : (
                    <BookCover bookSlug={b.slug} className="w-full h-full" />
                  )}
                </div>
                <div className="bk-display text-lg mb-1 bk-cream-text">{b.title}</div>
                <div className="text-xs mb-2 bk-cream-slate">{b.author}</div>
                <div className="bk-mono text-[9px] bk-cream-slate">{b.genre.toUpperCase()}</div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={15} className="bk-gold" />
            <h3 className="bk-display text-lg">{t(UI.recommendedHeading, lang)}</h3>
          </div>
          <p className="bk-slate text-xs mb-4">{t(UI.recommendedSub, lang)}</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {RECOMMENDATIONS.map((r, i) => (
              <div key={i} className="rounded-2xl p-5 bg-white border bk-border">
                <div className="h-20 rounded-lg mb-4 flex items-center justify-center bg-[#EDE6D3]">
                  <BookOpen size={22} className="bk-slate" />
                </div>
                <div className="bk-display text-base mb-1">{t(r.title, lang)}</div>
                <div className="bk-slate text-xs mb-4">{r.author}</div>
                <div className="w-full text-center bk-mono text-[9px] bk-slate py-2 border bk-border rounded-lg">
                  {t(UI.notOnPlatform, lang)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
