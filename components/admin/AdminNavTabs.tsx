import Link from "next/link";

const TABS = [
  { key: "books", href: "/admin/books", label: "Books" },
  { key: "accounts", href: "/admin/accounts", label: "Accounts" },
];

export function AdminNavTabs({ active }: { active: "books" | "accounts" }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {TABS.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`bk-mono text-[10px] px-3 py-1.5 rounded-full ${
            active === tab.key ? "bk-bg-gold" : "bg-[#EDE6D3] bk-slate"
          }`}
          style={active === tab.key ? { color: "#1B2436" } : {}}
        >
          {tab.label.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
