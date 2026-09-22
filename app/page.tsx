"use client";

import Link from "next/link";
import { Rocket, Users, BarChart3, ArrowRight } from "lucide-react";
import { StarField } from "@/components/layout/StarField";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

const CARDS = [
  { href: "/child/login", titleKey: "cardChildTitle", descKey: "cardChildDesc", icon: Rocket },
  { href: "/parent/login", titleKey: "cardParentTitle", descKey: "cardParentDesc", icon: Users },
  { href: "/admin/login", titleKey: "cardAdminTitle", descKey: "cardAdminDesc", icon: BarChart3 },
];

export default function HomePage() {
  const { lang } = useLang();
  return (
    <div className="relative bk-bg-night min-h-[560px] flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <StarField count={60} />
      <div className="relative text-center mb-12">
        <p className="bk-mono text-xs bk-gold mb-3 tracking-widest">{t(UI.landingEyebrow, lang)}</p>
        <h1 className="bk-display bk-cream-text text-4xl sm:text-5xl font-semibold mb-3">Bookalyzer</h1>
        <p className="bk-cream-slate max-w-md mx-auto">{t(UI.landingTagline, lang)}</p>
      </div>
      <div className="relative grid sm:grid-cols-3 gap-4 max-w-3xl w-full">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="bk-bg-cream rounded-2xl p-6 text-left hover:-translate-y-1 transition-transform bk-card block"
          >
            <c.icon size={22} className="bk-gold mb-4" />
            <div className="bk-display text-lg mb-1">{t(UI[c.titleKey], lang)}</div>
            <div className="bk-slate text-sm">{t(UI[c.descKey], lang)}</div>
            <div className="flex items-center gap-1 text-xs bk-mono mt-4 bk-ink">
              {t(UI.enter, lang)} <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
