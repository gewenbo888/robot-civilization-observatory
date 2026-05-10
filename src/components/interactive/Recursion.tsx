"use client";

import { useApp } from "@/contexts/Providers";
import { useEffect, useState } from "react";

export default function Recursion({ data, hue }: { data: { depth: number; seed: number }; hue: string }) {
  const { lang } = useApp();
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT((x) => x + 1), 100); return () => clearInterval(id); }, []);

  const layers: { x: number; y: number; w: number; h: number; rot: number; key: number }[] = [];
  const centerX = 50, centerY = 50;
  const startSize = 90;
  for (let i = 0; i < data.depth; i++) {
    const ratio = 1 - (i + 1) * 0.13;
    const w = startSize * ratio;
    const h = startSize * ratio;
    const rot = Math.sin(t * 0.04 + i) * 6 + i * 1.5;
    layers.push({ x: centerX - w / 2, y: centerY - h / 2, w, h, rot, key: i });
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-square max-w-[640px] mx-auto border border-[var(--rule)] bg-[var(--bg-alt)]/40 overflow-hidden">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {layers.map((l) => (
            <g key={l.key} transform={`rotate(${l.rot} ${centerX} ${centerY})`}>
              <rect x={l.x} y={l.y} width={l.w} height={l.h} fill="none" stroke={hue} strokeWidth="0.25" opacity={0.5 + (data.depth - l.key) * 0.07} vectorEffect="non-scaling-stroke" />
              <circle cx={l.x + l.w / 2} cy={l.y + l.h / 2} r="0.5" fill={hue} opacity="0.6" />
            </g>
          ))}
          <text x="50" y="50.6" textAnchor="middle" fontSize="2.4" fill={hue} className="font-mono" opacity="0.7">tick {t}</text>
        </svg>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 font-mono text-[11px]">
        <div className="border border-[var(--rule)] p-3">
          <div className="text-[var(--ink-soft)] uppercase tracking-wider text-[10px] mb-1">{lang === "zh" ? "递归深度" : "recursion depth"}</div>
          <div className="text-2xl" style={{ color: hue }}>{data.depth}</div>
        </div>
        <div className="border border-[var(--rule)] p-3">
          <div className="text-[var(--ink-soft)] uppercase tracking-wider text-[10px] mb-1">{lang === "zh" ? "种子" : "seed"}</div>
          <div className="text-2xl" style={{ color: hue }}>{data.seed}</div>
        </div>
      </div>
      <p className="font-mono text-[11px] text-[var(--ink-soft)] leading-relaxed">
        {lang === "zh" ? "每层都是同一模拟的内嵌副本——同样的物理、同样的种子、不同的尺度。这是『现实模拟引擎』的视觉隐喻：再向内一层即得另一文明。" : "Each layer is a nested copy of the same simulation — same physics, same seed, different scale. Visual metaphor for Reality Simulation Engine: one more level in = another civilization."}
      </p>
    </div>
  );
}
