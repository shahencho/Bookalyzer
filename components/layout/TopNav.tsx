"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Rocket, X } from "lucide-react";
import { useLang } from "./LangProvider";
import { t, UI, type Lang } from "@/lib/i18n";

const TABS = [
  { href: "/", labelKey: "navHome" },
  { href: "/child/login", labelKey: "navChild" },
  { href: "/parent/login", labelKey: "navParent" },
  { href: "/admin/login", labelKey: "navAdmin" },
];

const LANGS: Lang[] = ["en", "hy", "ru"];
const LANG_DISPLAY: Record<Lang, string> = { en: "EN", hy: "ՀԱՅ", ru: "РУ" };

export function TopNav() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation rather than leaving it open over
  // the new page underneath.
  useEffect(() => setOpen(false), [pathname]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname?.startsWith(href.split("/login")[0]);
  }

  return (
    <div className="w-full bk-bg-night relative">
      <div className="px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 bk-cream-text">
          <Rocket size={18} className="bk-gold" />
          <span className="bk-display text-lg tracking-tight">Bookalyzer</span>
          <span className="bk-mono text-[10px] bk-cream-slate ml-2 hidden sm:inline">v2.0 TEST ROUND</span>
        </Link>

        <div className="hidden sm:flex items-center gap-3">
          <div className="bk-lang-toggle">
            {LANGS.map((l) => (
              <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>
                {LANG_DISPLAY[l]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`bk-tab px-3 py-1.5 rounded-full transition-colors ${
                  isActive(tab.href) ? "bk-bg-gold" : "bk-cream-slate hover:text-white"
                }`}
                style={isActive(tab.href) ? { color: "#1B2436" } : {}}
              >
                {t(UI[tab.labelKey], lang)}
              </Link>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="sm:hidden bk-avatar-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={16} className="bk-gold" /> : <Menu size={16} className="bk-gold" />}
        </button>
      </div>

      {open && (
        <div className="sm:hidden px-6 pb-5 pt-1 flex flex-col gap-4 border-t border-[#2A3450]">
          <div className="bk-lang-toggle self-start">
            {LANGS.map((l) => (
              <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>
                {LANG_DISPLAY[l]}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`bk-tab px-4 py-3 rounded-lg transition-colors ${
                  isActive(tab.href) ? "bk-bg-gold" : "bk-cream-slate hover:text-white"
                }`}
                style={isActive(tab.href) ? { color: "#1B2436" } : {}}
              >
                {t(UI[tab.labelKey], lang)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
