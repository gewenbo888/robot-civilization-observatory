"use client";

import { useApp, t } from "@/contexts/Providers";
import { useMemo, useState } from "react";

type Material = { id: string; label: { en: string; zh: string }; trl: number; delta: string; origin: string; window: string; domain: string };

export default function MatGrid({ data, hue }: { data: { materials: Material[] }; hue: string }) {
  const { lang } = useApp();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const domains = useMemo(() => ["all", ...Array.from(new Set(data.materials.map((m) => m.domain)))], [data.materials]);

  const filtered = data.materials.filter((m) => {
    if (filter !== "all" && m.domain !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!t(m.label, lang).toLowerCase().includes(q) && !m.delta.toLowerCase().includes(q) && !m.origin.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-[1fr_220px] gap-3">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={lang === "zh" ? "搜材料…" : "Search materials…"} className="px-3 py-2 font-mono text-[12px]" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 font-mono text-[12px] bg-[var(--bg)] border border-[var(--rule)]">
          {domains.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{filtered.length} {lang === "zh" ? "条" : "results"}</div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)]">
        {filtered.map((m) => (
          <article key={m.id} className="bg-[var(--bg)] p-5 flex flex-col gap-2 min-h-[12rem]">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{m.domain}</span>
              <span className="font-mono text-[10px]" style={{ color: hue }}>TRL {m.trl}/9</span>
            </div>
            <h3 className="font-display italic text-xl leading-tight">{t(m.label, lang)}</h3>
            <div className="font-mono text-[11px]" style={{ color: hue }}>{m.delta}</div>
            <div className="mt-auto pt-3 border-t border-[var(--rule)] grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">
              <div>{lang === "zh" ? "起源" : "origin"}: <span className="text-[var(--ink)]">{m.origin}</span></div>
              <div>{lang === "zh" ? "上市" : "ships"}: <span className="text-[var(--ink)]">{m.window}</span></div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
