"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, Unlock, Upload } from "lucide-react";

interface AdminBook {
  id: number;
  title: string;
  language: string;
  status: "LIVE" | "NOT_LIVE";
  genre: string;
  coverUrl: string | null;
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<AdminBook[]>([]);
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});

  function load() {
    fetch("/api/admin/books")
      .then((r) => r.json())
      .then(setBooks);
  }

  useEffect(load, []);

  async function toggleStatus(book: AdminBook) {
    const nextStatus = book.status === "LIVE" ? "NOT_LIVE" : "LIVE";
    await fetch(`/api/admin/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    load();
  }

  async function uploadCover(book: AdminBook, file: File) {
    const form = new FormData();
    form.append("cover", file);
    const res = await fetch("/api/admin/covers", { method: "POST", body: form });
    const cover = await res.json();
    if (res.ok) {
      await fetch(`/api/admin/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverImageId: cover.id }),
      });
      load();
    }
  }

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h2 className="bk-display text-2xl">Book Management</h2>
        </div>
        <p className="bk-slate text-sm mb-6">
          New content is added via the JSON import pipeline (<code>npm run import-content</code>), not through this
          screen — this is for publishing status and covers only.
        </p>

        <div className="bg-white rounded-2xl bk-card overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-3 bk-mono text-[9px] bk-slate border-b bk-border">
            <span>TITLE</span>
            <span>LANGUAGE</span>
            <span>STATUS</span>
            <span>COVER</span>
          </div>
          {books.map((b) => (
            <div key={b.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-4 items-center border-b bk-border last:border-0">
              <div>
                <div className="text-sm font-medium">{b.title}</div>
                <div className="bk-slate text-xs">{b.genre}</div>
              </div>
              <span className="bk-mono text-[9px] bk-slate">{b.language.toUpperCase()}</span>
              <button
                onClick={() => toggleStatus(b)}
                className={`bk-mono text-[9px] px-2 py-1 rounded-full flex items-center gap-1 ${
                  b.status === "LIVE" ? "bk-bg-sage text-white" : "bg-[#EDE6D3] bk-slate"
                }`}
              >
                {b.status === "LIVE" ? <Unlock size={10} /> : <Lock size={10} />}
                {b.status === "LIVE" ? "LIVE" : "NOT LIVE"}
              </button>
              <div>
                <input
                  ref={(el) => {
                    fileInputs.current[b.id] = el;
                  }}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) uploadCover(b, file);
                  }}
                />
                <button
                  onClick={() => fileInputs.current[b.id]?.click()}
                  className="bk-btn-outline rounded-lg px-2 py-1 text-[10px] flex items-center gap-1"
                >
                  <Upload size={10} /> {b.coverUrl ? "Replace" : "Upload"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
