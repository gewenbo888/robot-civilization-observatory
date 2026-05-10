"use client";

import { useApp, t } from "@/contexts/Providers";
import { useEffect, useRef, useState } from "react";

type Program = { id: string; label: { en: string; zh: string }; channels: number; recipients: number; type: string; status: string };

export default function BCI({ data, hue }: { data: { programs: Program[]; signal_channels: number; signal_hz: number }; hue: string }) {
  const { lang } = useApp();
  const [tick, setTick] = useState(0);
  useEffect(() => { const id = setInterval(() => setTick((t) => t + 1), 80); return () => clearInterval(id); }, []);

  // Generate fake live multi-channel waveform
  const channels = data.signal_channels;
  const points = 80;
  const waves = Array.from({ length: channels }).map((_, ch) => {
    const seedA = (ch + 1) * 0.7;
    const seedB = (ch + 1) * 1.3;
    return Array.from({ length: points }).map((_, i) => {
      const x = i + tick;
      return 0.4 * Math.sin(x * 0.18 + seedA) + 0.3 * Math.sin(x * 0.4 + seedB) + 0.15 * Math.sin(x * 0.05);
    });
  });

  const sorted = [...data.programs].sort((a, b) => b.channels - a.channels);

  return (
    <div className="space-y-6">
      <div className="border border-[var(--rule)] bg-[var(--bg-alt)]/40 p-4">
        <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-wider mb-3">
          <span style={{ color: hue }}>{lang === "zh" ? "实时信号" : "live signal"}</span>
          <span className="text-[var(--ink-soft)]">{channels} ch · {data.signal_hz} Hz · sample</span>
        </div>
        <svg viewBox={`0 0 ${points} ${channels * 12}`} preserveAspectRatio="none" className="w-full" style={{ height: channels * 16 }}>
          {waves.map((w, ch) => (
            <polyline key={ch} fill="none" stroke={hue} strokeWidth="0.4" opacity={0.6 + (ch / channels) * 0.3}
              points={w.map((y, i) => `${i},${ch * 12 + 6 - y * 4}`).join(" ")} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      </div>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "活跃项目（按通道数排序）" : "Active programs (by channel count)"}</div>
        <div className="border border-[var(--rule)]">
          <div className="grid grid-cols-[1fr_100px_100px_120px_120px] font-mono text-[10px] uppercase tracking-wider bg-[var(--bg-alt)]/50 border-b border-[var(--rule)]">
            <div className="px-3 py-2 text-[var(--ink-soft)]">{lang === "zh" ? "项目" : "program"}</div>
            <div className="px-3 py-2 text-[var(--ink-soft)] text-right border-l border-[var(--rule)]">{lang === "zh" ? "通道" : "channels"}</div>
            <div className="px-3 py-2 text-[var(--ink-soft)] text-right border-l border-[var(--rule)]">{lang === "zh" ? "受试者" : "recipients"}</div>
            <div className="px-3 py-2 text-[var(--ink-soft)] border-l border-[var(--rule)]">{lang === "zh" ? "类型" : "type"}</div>
            <div className="px-3 py-2 text-[var(--ink-soft)] border-l border-[var(--rule)]">{lang === "zh" ? "阶段" : "status"}</div>
          </div>
          {sorted.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_100px_100px_120px_120px] border-b border-[var(--rule)] last:border-b-0">
              <div className="px-3 py-2.5 font-display italic text-base">{t(p.label, lang)}</div>
              <div className="px-3 py-2.5 font-mono text-[12px] text-right border-l border-[var(--rule)]" style={{ color: hue }}>{p.channels.toLocaleString()}</div>
              <div className="px-3 py-2.5 font-mono text-[12px] text-right border-l border-[var(--rule)] text-[var(--ink-soft)]">{p.recipients}</div>
              <div className="px-3 py-2.5 font-mono text-[11px] border-l border-[var(--rule)] text-[var(--ink-soft)]">{p.type}</div>
              <div className="px-3 py-2.5 font-mono text-[11px] border-l border-[var(--rule)] text-[var(--ink-soft)]">{p.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
