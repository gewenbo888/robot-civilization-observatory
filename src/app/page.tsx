"use client";

import { useApp, t } from "@/contexts/Providers";
import { PLATFORM_BY_ID } from "@/data/spec";
import { PLATFORM_ID } from "@/data/self";
import Interactive from "@/components/Interactive";

export default function PlatformPage() {
  const { lang } = useApp();
  const s = PLATFORM_BY_ID[PLATFORM_ID];

  return (
    <>
      {/* HERO */}
      <section id="overview" className="relative">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: `radial-gradient(circle at 30% 20%, ${s.hue} 0%, transparent 55%), radial-gradient(circle at 80% 70%, ${s.hue2} 0%, transparent 55%)` }} />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-32 pb-20">
          <div className="font-mono text-[11px] tracking-[0.4em] uppercase mb-6 flex flex-wrap gap-x-3 gap-y-1 items-center">
            <span style={{ color: s.hue }}>civ/tech</span>
            <span className="text-[var(--ink-soft)]">·</span>
            <span className="text-[var(--ink-soft)]">{s.slug}.psyverse.fun</span>
            <span className="text-[var(--ink-soft)]">·</span>
            <span className="text-[var(--ink-soft)]">{t(s.tagline, lang)}</span>
          </div>
          <h1 className="font-display italic text-[3rem] md:text-[5.5rem] xl:text-[7.5rem] leading-[1.02] tracking-tight max-w-6xl">
            {t(s.name, lang)}
          </h1>
          <p className="mt-10 max-w-3xl serif-body text-2xl">{t(s.oneLine, lang)}</p>
          <div className="mt-10 max-w-3xl font-body text-base md:text-lg leading-relaxed">
            {t(s.body, lang).split("\n\n").map((p, i) => <p key={i} className="mb-4">{p}</p>)}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section id="demo" className="border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "可交互演示" : "Interactive demo"}</div>
          <h2 className="font-display italic text-3xl md:text-5xl mb-10">
            {lang === "zh" ? "动手玩。" : "Use it."}
          </h2>
          <Interactive />
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="border-t border-[var(--rule)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "模块" : "Modules"}</div>
          <h2 className="font-display italic text-3xl md:text-5xl mb-10">{lang === "zh" ? "组成本平台的部分。" : "What's inside."}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--rule)]">
            {s.modules.map((m, i) => (
              <div key={m.id} className="bg-[var(--bg)] p-6 flex flex-col gap-2 min-h-[12rem]">
                <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: s.hue }}>{String(i + 1).padStart(2, "0")} · {m.id}</div>
                <h3 className="font-display italic text-xl leading-tight">{t(m.name, lang)}</h3>
                <p className="font-body text-sm text-[var(--ink-soft)] leading-relaxed">{t(m.body, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
