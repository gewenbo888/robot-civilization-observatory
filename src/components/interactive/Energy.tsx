"use client";

import { useApp, t } from "@/contexts/Providers";
import { useMemo, useState } from "react";

type Source = { id: string; label: { en: string; zh: string }; min: number; max: number; default: number; capacity_factor: number; hue: string };

export default function Energy({ data, hue }: { data: { sources: Source[]; demand_TW: number; demand_growth_pct: number; target_year: number; storage_hours: number }; hue: string }) {
  const { lang } = useApp();
  const [vals, setVals] = useState<Record<string, number>>(Object.fromEntries(data.sources.map((s) => [s.id, s.default])));

  const computed = useMemo(() => {
    const totalCap = data.sources.reduce((s, src) => s + vals[src.id], 0); // TW capacity
    const avgFreshFlow = data.sources.reduce((s, src) => s + vals[src.id] * src.capacity_factor, 0); // TW average
    const years = data.target_year - 2025;
    const demand2050 = data.demand_TW * Math.pow(1 + data.demand_growth_pct / 100, years);
    const ratio = avgFreshFlow / demand2050;
    let verdict: "brownout" | "tight" | "ok" | "surplus" = "brownout";
    if (ratio >= 1.4) verdict = "surplus";
    else if (ratio >= 1.05) verdict = "ok";
    else if (ratio >= 0.85) verdict = "tight";
    return { totalCap, avgFreshFlow, demand2050, ratio, verdict };
  }, [vals, data]);

  const VERDICT_LABEL: Record<string, { en: string; zh: string; color: string }> = {
    brownout: { en: "BROWNOUT — demand exceeds supply", zh: "限电 — 需求超过供应", color: "#bd3a2c" },
    tight:    { en: "TIGHT — vulnerable to peaks",      zh: "吃紧 — 高峰时易缺",       color: "#bd5d2c" },
    ok:       { en: "OK — meets target",                zh: "可控 — 满足目标",          color: "#5fa379" },
    surplus:  { en: "SURPLUS — exports possible",       zh: "盈余 — 可外送",            color: "#7eb0a4" },
  };
  const v = VERDICT_LABEL[computed.verdict];

  return (
    <div className="grid lg:grid-cols-[300px_1fr] gap-6">
      <div className="space-y-5">
        {data.sources.map((s) => (
          <div key={s.id}>
            <div className="flex items-baseline justify-between font-mono text-[11px] mb-1">
              <span className="text-[var(--ink-soft)] uppercase tracking-wider">{t(s.label, lang)}</span>
              <span style={{ color: s.hue }}>{vals[s.id].toFixed(1)} TW</span>
            </div>
            <input type="range" min={s.min} max={s.max} step={0.1}
              value={vals[s.id]}
              onChange={(e) => setVals({ ...vals, [s.id]: Number(e.target.value) })}
              style={{ accentColor: s.hue }} className="w-full" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="border p-5" style={{ borderColor: v.color, background: `${v.color}10` }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: v.color }}>{lang === "zh" ? "结论" : "verdict"}</div>
          <div className="font-display italic text-3xl mt-1" style={{ color: v.color }}>{t(v, lang)}</div>
          <div className="font-mono text-[11px] text-[var(--ink-soft)] mt-2">
            {lang === "zh" ? "供应 / 需求" : "supply / demand"}: {computed.avgFreshFlow.toFixed(1)} TW / {computed.demand2050.toFixed(1)} TW · ratio {computed.ratio.toFixed(2)}
          </div>
        </div>

        <div className="border border-[var(--rule)] p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "构成" : "mix"}</div>
          <div className="space-y-1.5">
            {data.sources.map((s) => {
              const flow = vals[s.id] * s.capacity_factor;
              const pct = computed.avgFreshFlow > 0 ? (flow / computed.avgFreshFlow) * 100 : 0;
              return (
                <div key={s.id} className="grid grid-cols-[120px_1fr_60px] gap-3 items-center font-mono text-[11px]">
                  <span className="text-[var(--ink-soft)] uppercase tracking-wider">{t(s.label, lang).split(" (")[0]}</span>
                  <div className="h-3 bg-[var(--bg-alt)]"><div className="h-full" style={{ width: `${pct}%`, background: s.hue }} /></div>
                  <span className="text-right" style={{ color: s.hue }}>{pct.toFixed(0)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="font-mono text-[11px] text-[var(--ink-soft)] leading-relaxed">
          {lang === "zh" ? `2025 年负荷 ${data.demand_TW} TW · 假设 ${data.demand_growth_pct}%/年增长至 ${data.target_year} 年。储能 ${data.storage_hours} 小时（未在此模型计入峰谷调节）。` : `Baseline 2025 load ${data.demand_TW} TW; ${data.demand_growth_pct}%/yr growth to ${data.target_year}. Storage ${data.storage_hours} hours (not modeled for peak shifting).`}
        </p>
      </div>
    </div>
  );
}
