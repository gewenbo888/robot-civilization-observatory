"use client";

import { useApp, t } from "@/contexts/Providers";
import { useEffect, useState } from "react";

type Exp = { id: string; agent: string; field: string; title: { en: string; zh: string }; status: string; eta: string; budget: number };
type Agent = { id: string; field: string; budget_left: number; success: number };

export default function Lab({ data, hue }: { data: { experiments: Exp[]; agents: Agent[] }; hue: string }) {
  const { lang } = useApp();
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((t) => t + 1), 1500); return () => clearInterval(id); }, []);
  // rotate displayed experiments
  const offset = tick % data.experiments.length;
  const display = [...data.experiments.slice(offset), ...data.experiments.slice(0, offset)];

  const STATUS_HUE: Record<string, string> = { running: hue, posted: "#5fa379", queued: "#76766f" };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-px bg-[var(--rule)]">
        <div className="bg-[var(--bg)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{lang === "zh" ? "在跑" : "running"}</div>
          <div className="font-display text-3xl mt-1" style={{ color: hue }}>{data.experiments.filter((e) => e.status === "running").length}</div>
        </div>
        <div className="bg-[var(--bg)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{lang === "zh" ? "已发布" : "posted"}</div>
          <div className="font-display text-3xl mt-1 text-[var(--accent-2,_var(--accent))]">{data.experiments.filter((e) => e.status === "posted").length}</div>
        </div>
        <div className="bg-[var(--bg)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-soft)]">{lang === "zh" ? "排队" : "queued"}</div>
          <div className="font-display text-3xl mt-1 text-[var(--ink-soft)]">{data.experiments.filter((e) => e.status === "queued").length}</div>
        </div>
      </div>

      <div className="border border-[var(--rule)] divide-y divide-[var(--rule)] max-h-[480px] overflow-y-auto no-scrollbar">
        {display.map((e) => (
          <div key={e.id} className="grid grid-cols-[80px_120px_1fr_60px] gap-3 px-4 py-3 hover:bg-[var(--bg-alt)] transition-colors">
            <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: STATUS_HUE[e.status] }}>{e.status}</div>
            <div className="font-mono text-[11px] text-[var(--ink-soft)]">{e.agent}</div>
            <div className="font-display text-base leading-snug">{t(e.title, lang)}</div>
            <div className="font-mono text-[10px] text-right text-[var(--ink-soft)]">{e.status === "running" ? e.eta : ""}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "代理状态" : "Agent roster"}</div>
        <div className="grid sm:grid-cols-5 gap-px bg-[var(--rule)]">
          {data.agents.map((a) => (
            <div key={a.id} className="bg-[var(--bg)] p-3">
              <div className="font-mono text-[12px]" style={{ color: hue }}>{a.id}</div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--ink-soft)] mt-0.5">{a.field}</div>
              <div className="mt-3 space-y-2">
                <div>
                  <div className="font-mono text-[9px] text-[var(--ink-soft)] uppercase tracking-wider">{lang === "zh" ? "预算" : "budget"}</div>
                  <div className="h-1.5 bg-[var(--bg-alt)] mt-1"><div className="h-full" style={{ width: `${a.budget_left * 100}%`, background: hue }} /></div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-[var(--ink-soft)] uppercase tracking-wider">{lang === "zh" ? "成功率" : "success"}</div>
                  <div className="h-1.5 bg-[var(--bg-alt)] mt-1"><div className="h-full" style={{ width: `${a.success * 100}%`, background: "#5fa379" }} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
