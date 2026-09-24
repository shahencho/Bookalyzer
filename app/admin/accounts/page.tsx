"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { fetchOrRedirect } from "@/lib/fetchOrRedirect";
import { AdminNavTabs } from "@/components/admin/AdminNavTabs";

interface ChildRow {
  id: number;
  name: string;
  nickname: string;
  age: number;
  xp: number;
  createdAt: string;
}
interface ParentRow {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  children: ChildRow[];
}
interface QuickCreateResult {
  parent: { name: string; email: string; password: string };
  child: { name: string; nickname: string; pin: string; age: number };
}

export default function AdminAccountsPage() {
  const router = useRouter();
  const [parents, setParents] = useState<ParentRow[]>([]);
  const [parentName, setParentName] = useState("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("8");
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState<QuickCreateResult | null>(null);

  function load() {
    fetchOrRedirect("/api/admin/accounts", router, "/admin/login", [] as ParentRow[]).then(setParents);
  }

  useEffect(load, [router]);

  async function handleQuickCreate() {
    setCreating(true);
    setError(null);
    const res = await fetch("/api/admin/accounts/quick-create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentName, childName, childAge: Number(childAge) }),
    });
    setCreating(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Could not create account");
      return;
    }
    setResult(await res.json());
    setParentName("");
    setChildName("");
    setChildAge("8");
    load();
  }

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <AdminNavTabs active="accounts" />
        <h2 className="bk-display text-2xl mb-1">Parent &amp; Child Accounts</h2>
        <p className="bk-slate text-sm mb-6">
          Quick-create a test parent + child pair with default credentials so you can hand them straight to a family.
        </p>

        <div className="bg-white rounded-2xl p-5 bk-card mb-6">
          <div className="grid sm:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="bk-mono text-[10px] bk-slate">PARENT NAME</label>
              <input
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Paren1"
                className="w-full border bk-border rounded-lg px-3 py-2 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="bk-mono text-[10px] bk-slate">CHILD NAME</label>
              <input
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Child1"
                className="w-full border bk-border rounded-lg px-3 py-2 mt-1 outline-none"
              />
            </div>
            <div>
              <label className="bk-mono text-[10px] bk-slate">CHILD AGE</label>
              <input
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                type="number"
                min={4}
                max={17}
                className="w-full border bk-border rounded-lg px-3 py-2 mt-1 outline-none"
              />
            </div>
          </div>
          {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
          <button
            disabled={creating || !parentName.trim() || !childName.trim()}
            onClick={handleQuickCreate}
            className="flex items-center gap-1 bk-btn-primary rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            <UserPlus size={14} /> {creating ? "Creating..." : "Quick create (parent 11111111 / child PIN 1111)"}
          </button>

          {result && (
            <div className="mt-4 bk-mono text-xs bg-[#FBF7EF] border bk-border rounded-lg p-3 space-y-1">
              <div>
                Parent login: <b>{result.parent.email}</b> / <b>{result.parent.password}</b>
              </div>
              <div>
                Child login: <b>{result.child.nickname}</b> / <b>{result.child.pin}</b>
              </div>
              <div className="bk-slate">Shown once — write it down before creating another.</div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl bk-card overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-3 bk-mono text-[9px] bk-slate border-b bk-border">
            <span>PARENT</span>
            <span>CHILDREN (NICKNAME · AGE)</span>
            <span>CREATED</span>
          </div>
          {parents.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_1fr_auto] gap-4 px-5 py-4 items-start border-b bk-border last:border-0">
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="bk-slate text-xs">{p.email}</div>
              </div>
              <div className="text-xs space-y-1">
                {p.children.length === 0 && <span className="bk-slate">No children yet</span>}
                {p.children.map((c) => (
                  <div key={c.id}>
                    {c.name} — @{c.nickname} · age {c.age} · {c.xp} XP
                  </div>
                ))}
              </div>
              <span className="bk-mono text-[9px] bk-slate whitespace-nowrap">
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
          {parents.length === 0 && <div className="px-5 py-6 text-sm bk-slate">No parent accounts yet.</div>}
        </div>
      </div>
    </div>
  );
}
