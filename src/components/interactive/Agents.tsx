"use client";

import { useApp, t } from "@/contexts/Providers";
import { useEffect, useRef, useState } from "react";

type Cell = {
  id: number; x: number; y: number;
  alive: boolean; mrr: number; runway: number;
  policy: "greedy" | "satisficer" | "explorer";
  hue: number; // 0-360
};

const POLICY_HUE: Record<Cell["policy"], string> = {
  greedy:     "#ffb340",
  satisficer: "#7eb0a4",
  explorer:   "#9a4d6e",
};

export default function Agents({ data, hue }: { data: { grid: number; tickRate: number; defaults: any }; hue: string }) {
  const { lang } = useApp();
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const cellsRef = useRef<Cell[]>([]);
  const initRef = useRef(false);

  if (!initRef.current) {
    const arr: Cell[] = [];
    for (let y = 0; y < data.grid; y++) for (let x = 0; x < data.grid; x++) {
      const policies: Cell["policy"][] = ["greedy","satisficer","explorer"];
      arr.push({
        id: y * data.grid + x, x, y,
        alive: true,
        mrr: 50 + Math.random() * 20,
        runway: 100 + Math.random() * 50,
        policy: policies[Math.floor(Math.random() * 3)],
        hue: Math.random() * 360,
      });
    }
    cellsRef.current = arr;
    initRef.current = true;
  }

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const arr = cellsRef.current;
      for (const c of arr) {
        if (!c.alive) continue;
        // each tick: random profit/loss; runway decays with operating cost
        const pol = c.policy;
        const variance = pol === "explorer" ? 30 : pol === "greedy" ? 18 : 10;
        const drift   = pol === "greedy" ? -2 : pol === "satisficer" ? 1 : -1;
        const delta = (Math.random() - 0.5) * variance + drift;
        c.mrr = Math.max(0, c.mrr + delta);
        c.runway -= 5 + (pol === "greedy" ? 3 : 0);
        c.runway += c.mrr * 0.1; // earn back from MRR
        if (c.runway <= 0) c.alive = false;
      }
      setTick((t) => t + 1);
    }, data.tickRate);
    return () => clearInterval(id);
  }, [running, data.tickRate]);

  const arr = cellsRef.current;
  const alive = arr.filter((c) => c.alive);
  const totalMRR = alive.reduce((s, c) => s + c.mrr, 0);

  return (
    <div className="grid lg:grid-cols-[1fr_240px] gap-6">
      <div className="space-y-3">
        <div className="aspect-square border border-[var(--rule)] bg-[var(--bg-alt)]/40 grid" style={{ gridTemplateColumns: `repeat(${data.grid}, 1fr)`, gridTemplateRows: `repeat(${data.grid}, 1fr)` }}>
          {arr.map((c) => (
            <div key={c.id} className="border-r border-b border-[var(--rule)] last:border-r-0 relative flex items-center justify-center"
              style={{ background: c.alive ? `${POLICY_HUE[c.policy]}${Math.floor(c.mrr * 1.5).toString(16).padStart(2, "0")}` : "transparent", opacity: c.alive ? 1 : 0.15 }}>
              <span className="font-mono text-[8px]" style={{ color: "var(--bg)" }}>{c.alive ? Math.round(c.mrr) : "✕"}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setRunning(!running)} className="px-4 py-2 border font-mono text-[11px] uppercase tracking-wider" style={{ borderColor: hue, color: hue }}>
            {running ? (lang === "zh" ? "暂停" : "pause") : (lang === "zh" ? "运行" : "run")}
          </button>
          <button onClick={() => window.location.reload()} className="px-4 py-2 border border-[var(--rule)] hover:border-red-500 font-mono text-[11px] uppercase tracking-wider">
            {lang === "zh" ? "重置" : "reset"}
          </button>
          <span className="ml-auto self-center font-mono text-[11px] text-[var(--ink-soft)] uppercase tracking-wider">tick {tick}</span>
        </div>
      </div>
      <aside className="space-y-4">
        <div className="border border-[var(--rule)] p-3 space-y-2 font-mono text-[11px]">
          <div className="flex justify-between"><span className="text-[var(--ink-soft)] uppercase">{lang === "zh" ? "存活" : "alive"}</span><span style={{ color: hue }}>{alive.length}/{arr.length}</span></div>
          <div className="flex justify-between"><span className="text-[var(--ink-soft)] uppercase">{lang === "zh" ? "总 MRR" : "total MRR"}</span><span style={{ color: hue }}>{totalMRR.toFixed(0)}</span></div>
          <div className="flex justify-between"><span className="text-[var(--ink-soft)] uppercase">{lang === "zh" ? "贪婪存活率" : "greedy alive"}</span><span style={{ color: POLICY_HUE.greedy }}>{(alive.filter((c) => c.policy === "greedy").length / Math.max(arr.filter((c) => c.policy === "greedy").length, 1) * 100).toFixed(0)}%</span></div>
          <div className="flex justify-between"><span className="text-[var(--ink-soft)] uppercase">{lang === "zh" ? "满足存活率" : "satisficer alive"}</span><span style={{ color: POLICY_HUE.satisficer }}>{(alive.filter((c) => c.policy === "satisficer").length / Math.max(arr.filter((c) => c.policy === "satisficer").length, 1) * 100).toFixed(0)}%</span></div>
          <div className="flex justify-between"><span className="text-[var(--ink-soft)] uppercase">{lang === "zh" ? "探索存活率" : "explorer alive"}</span><span style={{ color: POLICY_HUE.explorer }}>{(alive.filter((c) => c.policy === "explorer").length / Math.max(arr.filter((c) => c.policy === "explorer").length, 1) * 100).toFixed(0)}%</span></div>
        </div>
        <p className="font-mono text-[10px] text-[var(--ink-soft)] leading-relaxed">
          {lang === "zh" ? "每格一家自治软件公司。色相 = 策略；亮度 = MRR。耗尽跑道 = 倒闭。" : "Each cell = one autonomous software company. Hue = policy; brightness = MRR. Runway-zero = bankrupt."}
        </p>
      </aside>
    </div>
  );
}
