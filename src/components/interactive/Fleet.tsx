"use client";

import { useApp, t } from "@/contexts/Providers";
import { useState } from "react";

type Fleet = { id: string; label: { en: string; zh: string }; count: number; growth: number; vendor: string; category: string };

export default function FleetPanel({ data, hue }: { data: { fleets: Fleet[] }; hue: string }) {
  const { lang } = useApp();
  const [filter, setFilter] = useState<string>("all");
  const cats = ["all", ...Array.from(new Set(data.fleets.map((f) => f.category)))];
  const filtered = filter === "all" ? data.fleets : data.fleets.filter((f) => f.category === filter);
  const sorted = [...filtered].sort((a, b) => b.count - a.count);
  const total = filtered.reduce((s, f) => s + f.count, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 font-mono text-[11px]">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 border uppercase tracking-wider ${filter === c ? "" : "text-[var(--ink-soft)]"}`}
            style={{ borderColor: filter === c ? hue : "var(--rule)", color: filter === c ? hue : undefined }}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-px bg-[var(--rule)]">
        <div className="bg-[var(--bg)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{lang === "zh" ? "总机队" : "total fleet"}</div>
          <div className="font-display italic text-3xl mt-1" style={{ color: hue }}>{total.toLocaleString()}</div>
        </div>
        <div className="bg-[var(--bg)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{lang === "zh" ? "类别" : "categories"}</div>
          <div className="font-display italic text-3xl mt-1" style={{ color: hue }}>{cats.length - 1}</div>
        </div>
        <div className="bg-[var(--bg)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{lang === "zh" ? "最快增长" : "fastest growing"}</div>
          <div className="font-display italic text-2xl mt-1 leading-tight" style={{ color: hue }}>{sorted.sort((a,b) => b.growth - a.growth)[0]?.vendor}</div>
        </div>
      </div>

      <div className="border border-[var(--rule)]">
        <div className="grid grid-cols-[1fr_120px_120px_100px] font-mono text-[10px] uppercase tracking-wider bg-[var(--bg-alt)]/50 border-b border-[var(--rule)]">
          <div className="px-3 py-2 text-[var(--ink-soft)]">{lang === "zh" ? "机队" : "fleet"}</div>
          <div className="px-3 py-2 text-[var(--ink-soft)] text-right border-l border-[var(--rule)]">{lang === "zh" ? "数量" : "count"}</div>
          <div className="px-3 py-2 text-[var(--ink-soft)] text-right border-l border-[var(--rule)]">{lang === "zh" ? "月增长 %" : "growth %/mo"}</div>
          <div className="px-3 py-2 text-[var(--ink-soft)] text-right border-l border-[var(--rule)]">{lang === "zh" ? "类别" : "category"}</div>
        </div>
        {sorted.sort((a,b) => b.count - a.count).map((f) => (
          <div key={f.id} className="grid grid-cols-[1fr_120px_120px_100px] border-b border-[var(--rule)] last:border-b-0">
            <div className="px-3 py-2.5 font-display italic text-base">{t(f.label, lang)} <span className="font-mono text-[10px] text-[var(--ink-soft)] ml-2">{f.vendor}</span></div>
            <div className="px-3 py-2.5 font-mono text-[12px] text-right border-l border-[var(--rule)]" style={{ color: hue }}>{f.count.toLocaleString()}</div>
            <div className="px-3 py-2.5 font-mono text-[12px] text-right border-l border-[var(--rule)]" style={{ color: f.growth > 30 ? "#5fa379" : f.growth > 10 ? hue : "var(--ink-soft)" }}>+{f.growth}%</div>
            <div className="px-3 py-2.5 font-mono text-[10px] text-right border-l border-[var(--rule)] uppercase tracking-wider text-[var(--ink-soft)]">{f.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
