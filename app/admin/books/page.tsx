"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Unlock, Upload, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { fetchOrRedirect } from "@/lib/fetchOrRedirect";
import { AdminNavTabs } from "@/components/admin/AdminNavTabs";

interface AdminBook {
  id: number;
  title: string;
  language: string;
  status: "LIVE" | "NOT_LIVE";
  genre: string;
  coverUrl: string | null;
  slug: string;
  questionCount: number;
}

type ContentUploadState = { kind: "error"; message: string } | { kind: "success"; message: string };

export default function AdminBooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<AdminBook[]>([]);
  const [contentStatus, setContentStatus] = useState<Record<number, ContentUploadState>>({});
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});
  const contentFileInputs = useRef<Record<number, HTMLInputElement | null>>({});

  function load() {
    fetchOrRedirect("/api/admin/books", router, "/admin/login", [] as AdminBook[]).then(setBooks);
  }

  useEffect(load, [router]);

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

  function downloadContent(book: AdminBook) {
    window.open(`/api/admin/books/${book.id}/content-file`, "_blank");
  }

  async function uploadContent(book: AdminBook, file: File) {
    setContentStatus((s) => ({ ...s, [book.id]: { kind: "success", message: "Uploading…" } }));
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`/api/admin/books/${book.id}/content-file`, { method: "POST", body: form });
    const body = await res.json();
    if (!res.ok) {
      const message = body.errors ? `${body.error}\n${body.errors.join("\n")}` : body.error ?? "Upload failed";
      setContentStatus((s) => ({ ...s, [book.id]: { kind: "error", message } }));
      return;
    }
    const warningNote = body.warnings?.length ? ` (${body.warnings.length} warning(s))` : "";
    setContentStatus((s) => ({
      ...s,
      [book.id]: { kind: "success", message: `Imported ${body.questionCount} questions${warningNote}` },
    }));
    load();
  }

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <AdminNavTabs active="books" />
        <div className="flex items-center justify-between mb-1">
          <h2 className="bk-display text-2xl">Book Management</h2>
        </div>
        <p className="bk-slate text-sm mb-6">
          New books are added via the JSON import pipeline (<code>npm run import-content</code>). Existing books can
          be corrected right here — download the live question bank JSON, edit it, and upload it back.
        </p>

        <div className="bg-white rounded-2xl bk-card overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 bk-mono text-[9px] bk-slate border-b bk-border">
            <span>TITLE</span>
            <span>LANGUAGE</span>
            <span>STATUS</span>
            <span>COVER</span>
            <span>QUESTION BANK</span>
          </div>
          {books.map((b) => {
            const status = contentStatus[b.id];
            return (
              <div key={b.id} className="border-b bk-border last:border-0">
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-4 items-center">
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
                  <div className="flex flex-col items-start gap-1">
                    <span className="bk-slate text-[10px]">{b.questionCount} question{b.questionCount === 1 ? "" : "s"}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => downloadContent(b)}
                        className="bk-btn-outline rounded-lg px-2 py-1 text-[10px] flex items-center gap-1"
                      >
                        <Download size={10} /> JSON
                      </button>
                      <input
                        ref={(el) => {
                          contentFileInputs.current[b.id] = el;
                        }}
                        type="file"
                        accept="application/json,.json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadContent(b, file);
                          e.target.value = "";
                        }}
                      />
                      <button
                        onClick={() => contentFileInputs.current[b.id]?.click()}
                        className="bk-btn-outline rounded-lg px-2 py-1 text-[10px] flex items-center gap-1"
                      >
                        <Upload size={10} /> Fix
                      </button>
                    </div>
                  </div>
                </div>
                {status && (
                  <div
                    className={`mx-5 mb-3 -mt-1 px-3 py-2 rounded-lg text-[11px] whitespace-pre-wrap flex items-start gap-2 ${
                      status.kind === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                    }`}
                  >
                    {status.kind === "error" ? (
                      <AlertCircle size={12} className="mt-[1px] shrink-0" />
                    ) : (
                      <CheckCircle2 size={12} className="mt-[1px] shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
