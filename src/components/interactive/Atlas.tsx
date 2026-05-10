"use client";

import { useApp, t } from "@/contexts/Providers";
import { useState } from "react";

type Node = { id: string; label: string; lat: number; lon: number; score: number; role: { en: string; zh: string } };
type Event = { date: string; title: { en: string; zh: string }; impact: string };

export default function Atlas({ data, hue }: { data: { nodes: Node[]; events: Event[] }; hue: string }) {
  const { lang } = useApp();
  const [active, setActive] = useState<string | null>(null);

  // Convert lat/lon to x/y on a simple equirectangular projection
  const xy = (lat: number, lon: number) => ({
    x: ((lon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  });

  const activeNode = data.nodes.find((n) => n.id === active);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-3">
        <div className="relative aspect-[16/9] border border-[var(--rule)] bg-[var(--bg-alt)]/40 overflow-hidden">
          {/* Faux world rectangle as background */}
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            {/* Latitude grid */}
            {[10, 25, 40].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--rule)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />)}
            {[20, 40, 60, 80].map((x) => <line key={x} x1={x} x2={x} y1="0" y2="50" stroke="var(--rule)" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />)}
          </svg>
          {data.nodes.map((n) => {
            const p = xy(n.lat, n.lon);
            const isHover = active === n.id;
            return (
              <button key={n.id}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${p.x}%`, top: `${p.y * 2}%` }}
              >
                <span className="block rounded-full transition-all" style={{
                  width: 6 + n.score * 8, height: 6 + n.score * 8,
                  background: hue,
                  opacity: 0.45 + n.score * 0.5,
                  boxShadow: isHover ? `0 0 18px ${hue}` : `0 0 6px ${hue}`,
                }} />
                <span className={`absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] tracking-wider ${isHover ? "opacity-100" : "opacity-50"} transition-opacity`}>
                  {n.label}
                </span>
              </button>
            );
          })}
        </div>
        <p className="font-mono text-[10px] text-[var(--ink-soft)] leading-relaxed">
          {lang === "zh" ? "节点大小 = 在该国的栈临界性评分。点击或悬停查看角色。" : "Node size = stack-criticality score for that country. Hover for role."}
        </p>
      </div>

      <aside className="space-y-4">
        <div className="border border-[var(--rule)] p-4 min-h-[10rem]">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-2">{lang === "zh" ? "节点详情" : "Node detail"}</div>
          {activeNode ? (
            <>
              <div className="font-display italic text-2xl">{activeNode.label}</div>
              <div className="font-mono text-[10px] text-[var(--ink-soft)] mt-1">{lang === "zh" ? "临界性" : "criticality"}: {activeNode.score.toFixed(2)}</div>
              <p className="font-body text-sm text-[var(--ink-soft)] mt-3 leading-relaxed">{t(activeNode.role, lang)}</p>
            </>
          ) : (
            <div className="font-mono text-[11px] text-[var(--ink-soft)]">{lang === "zh" ? "悬停一个节点。" : "Hover a node."}</div>
          )}
        </div>
        <div className="border border-[var(--rule)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "近期事件" : "Recent events"}</div>
          <ol className="space-y-2">
            {data.events.map((e, i) => (
              <li key={i} className="font-mono text-[11px]">
                <span style={{ color: hue }}>{e.date}</span> · <span>{t(e.title, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
