"use client";

import { useApp, t } from "@/contexts/Providers";
import { useMemo, useState } from "react";

type Node = { id: string; year: number; label: { en: string; zh: string }; tier: number; deps: string[] };

export default function Tree({ data, hue }: { data: { nodes: Node[] }; hue: string }) {
  const { lang } = useApp();
  const [active, setActive] = useState<string | null>(null);

  const positions = useMemo(() => {
    const tiers = Array.from(new Set(data.nodes.map((n) => n.tier))).sort();
    const out: Record<string, { x: number; y: number }> = {};
    tiers.forEach((tier) => {
      const inTier = data.nodes.filter((n) => n.tier === tier);
      const x = (tier / Math.max(...tiers, 1)) * 86 + 7;
      inTier.forEach((n, i) => {
        const y = ((i + 0.5) / inTier.length) * 90 + 5;
        out[n.id] = { x, y };
      });
    });
    return out;
  }, [data.nodes]);

  const path = useMemo(() => {
    if (!active) return new Set<string>();
    const seen = new Set<string>([active]);
    const queue = [active];
    while (queue.length) {
      const cur = queue.shift()!;
      const node = data.nodes.find((n) => n.id === cur);
      if (!node) continue;
      for (const d of node.deps) if (!seen.has(d)) { seen.add(d); queue.push(d); }
    }
    return seen;
  }, [active, data.nodes]);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/8] border border-[var(--rule)] bg-[var(--bg-alt)]/40 overflow-hidden">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {data.nodes.flatMap((n) => n.deps.map((dep) => {
            const a = positions[dep], b = positions[n.id];
            if (!a || !b) return null;
            const inPath = path.has(n.id) && path.has(dep);
            return <line key={`${dep}-${n.id}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={inPath ? hue : "var(--ink-soft)"} strokeWidth={inPath ? 0.5 : 0.15}
              opacity={inPath ? 0.9 : 0.2} vectorEffect="non-scaling-stroke" />;
          }))}
        </svg>
        {data.nodes.map((n) => {
          const p = positions[n.id];
          const inPath = path.has(n.id);
          const isActive = active === n.id;
          return (
            <button key={n.id} onClick={() => setActive(isActive ? null : n.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}>
              <span className="block rounded-full transition-all" style={{
                width: isActive ? 14 : 10, height: isActive ? 14 : 10,
                background: hue, opacity: active && !inPath ? 0.25 : 0.95,
                boxShadow: inPath ? `0 0 12px ${hue}` : undefined,
              }} />
              <span className={`absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] tracking-wider ${inPath ? "opacity-100" : "opacity-50"}`}>
                {n.year} · {t(n.label, lang)}
              </span>
            </button>
          );
        })}
        <div className="absolute bottom-2 left-3 right-3 flex justify-between font-mono text-[9px] text-[var(--ink-soft)] uppercase tracking-wider">
          <span>2025</span><span>2030</span><span>2040</span><span>2050</span><span>2060</span>
        </div>
      </div>
      {active && (() => {
        const node = data.nodes.find((n) => n.id === active)!;
        return (
          <div className="border border-[var(--accent)] p-4 bg-[var(--bg-alt)]/40">
            <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: hue }}>{node.year} · tier {node.tier}</div>
            <div className="font-display italic text-2xl mt-1">{t(node.label, lang)}</div>
            <div className="font-mono text-[11px] text-[var(--ink-soft)] mt-2">{lang === "zh" ? "依赖路径长度" : "dependency depth"}: {path.size}</div>
          </div>
        );
      })()}
      <p className="font-mono text-[11px] text-[var(--ink-soft)]">{lang === "zh" ? "提示：点击任一节点，看它需要先解锁的所有 2025 节点。" : "Tip: click any future node to see which 2025 nodes have to land first."}</p>
    </div>
  );
}
