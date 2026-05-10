"use client";

import { useApp } from "@/contexts/Providers";
import { useMemo, useState } from "react";

type Gate = "H" | "X" | "Y" | "Z" | "CNOT";
type Op = { gate: Gate; q: number; ctrl?: number };

// Apply gates to a small state vector. Real complex math kept simple — only real numbers needed for H/X/Z/CNOT, no Y demo here for ease.
function applyGate(state: number[], op: Op, n: number): number[] {
  const N = 1 << n;
  const out = new Array(N).fill(0);
  if (op.gate === "X") {
    for (let s = 0; s < N; s++) {
      const flipped = s ^ (1 << op.q);
      out[flipped] = state[s];
    }
    return out;
  }
  if (op.gate === "Z") {
    for (let s = 0; s < N; s++) {
      const sign = (s >> op.q) & 1 ? -1 : 1;
      out[s] = state[s] * sign;
    }
    return out;
  }
  if (op.gate === "H") {
    const inv = 1 / Math.sqrt(2);
    for (let s = 0; s < N; s++) {
      const bit = (s >> op.q) & 1;
      const flipped = s ^ (1 << op.q);
      out[s] += inv * state[s] * (bit ? -1 : 1);
      out[flipped] += inv * state[s];
    }
    return out;
  }
  if (op.gate === "Y") {
    // Treat Y as X+Z combined for visual demo (simplified — not unitary in real i, but visually informative)
    const tmp = applyGate(state, { gate: "X", q: op.q }, n);
    return applyGate(tmp, { gate: "Z", q: op.q }, n);
  }
  if (op.gate === "CNOT" && op.ctrl !== undefined) {
    for (let s = 0; s < N; s++) {
      let target = s;
      if (((s >> op.ctrl) & 1) === 1) target = s ^ (1 << op.q);
      out[target] = state[s];
    }
    return out;
  }
  return state;
}

export default function Qubit({ data, hue }: { data: { qubits: number; basis: string[]; amplitudes: number[]; gates: string[] }; hue: string }) {
  const { lang } = useApp();
  const n = data.qubits;
  const [program, setProgram] = useState<Op[]>([]);

  const finalState = useMemo(() => {
    let s = data.amplitudes.slice();
    for (const op of program) s = applyGate(s, op, n);
    return s;
  }, [program, data.amplitudes, n]);

  const addGate = (gate: Gate, q: number, ctrl?: number) => setProgram((p) => [...p, { gate, q, ctrl }]);
  const reset = () => setProgram([]);

  return (
    <div className="grid lg:grid-cols-[1fr_280px] gap-6">
      <div className="space-y-4">
        {/* Circuit */}
        <div className="border border-[var(--rule)] p-4 bg-[var(--bg-alt)]/40">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "电路" : "circuit"}</div>
          <div className="space-y-3">
            {Array.from({ length: n }).map((_, q) => (
              <div key={q} className="grid grid-cols-[40px_1fr] gap-2 items-center">
                <span className="font-mono text-[11px] text-[var(--ink-soft)]">q{q}</span>
                <div className="relative h-8 border-t border-[var(--rule)]">
                  {program.map((op, i) => {
                    if (op.q !== q && op.ctrl !== q) return null;
                    return (
                      <span key={i} className="absolute top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center font-mono text-[11px]"
                        style={{ left: `${(i / Math.max(program.length, 1)) * 90 + 4}%`, background: op.ctrl === q ? "transparent" : hue, color: op.ctrl === q ? hue : "var(--bg)", border: op.ctrl === q ? `1.5px solid ${hue}` : `1.5px solid ${hue}`, borderRadius: op.ctrl === q ? "50%" : 0 }}>
                        {op.ctrl === q ? "•" : op.gate}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* State vector */}
        <div className="border border-[var(--rule)] p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">{lang === "zh" ? "状态向量" : "state vector"}</div>
          <div className="space-y-1.5">
            {data.basis.map((b, i) => {
              const amp = finalState[i] || 0;
              const prob = amp * amp;
              return (
                <div key={b} className="grid grid-cols-[60px_1fr_60px] gap-3 items-center">
                  <span className="font-mono text-[11px]" style={{ color: amp !== 0 ? hue : "var(--ink-soft)" }}>{b}</span>
                  <div className="relative h-3 bg-[var(--bg-alt)]"><div className="absolute inset-y-0 left-1/2" style={{ width: `${Math.abs(amp) * 50}%`, background: amp >= 0 ? hue : "#bd5d2c", transform: amp >= 0 ? "none" : "translateX(-100%)" }} /></div>
                  <span className="font-mono text-[10px] text-[var(--ink-soft)] text-right">{prob.toFixed(3)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gate palette */}
      <aside className="space-y-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">{lang === "zh" ? "门面板" : "gates"}</div>
        <div className="grid grid-cols-2 gap-2">
          {(["H","X","Y","Z"] as const).map((g) => (
            <div key={g} className="border border-[var(--rule)] p-2">
              <div className="font-mono text-[12px] mb-1.5" style={{ color: hue }}>{g}</div>
              <div className="flex gap-1">
                {Array.from({ length: n }).map((_, q) => (
                  <button key={q} onClick={() => addGate(g, q)} className="w-7 h-7 font-mono text-[10px] border border-[var(--rule)] hover:border-[var(--accent)]">q{q}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border border-[var(--rule)] p-2">
          <div className="font-mono text-[12px] mb-1.5" style={{ color: hue }}>CNOT</div>
          <div className="font-mono text-[10px] text-[var(--ink-soft)] mb-1">ctrl → target</div>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: n }).flatMap((_, c) => Array.from({ length: n }).map((_, t) => c !== t && (
              <button key={`${c}-${t}`} onClick={() => addGate("CNOT", t, c)} className="font-mono text-[10px] border border-[var(--rule)] hover:border-[var(--accent)] py-1">
                {c}→{t}
              </button>
            )))}
          </div>
        </div>
        <button onClick={reset} className="w-full px-3 py-2 border border-[var(--rule)] hover:border-red-500 hover:text-red-500 font-mono text-[11px] uppercase tracking-wider">
          {lang === "zh" ? "重置" : "reset"}
        </button>
        <div className="font-mono text-[10px] text-[var(--ink-soft)] leading-relaxed">
          {lang === "zh" ? "试试：H q0 → CNOT 0→1 = 贝尔态。" : "Try: H q0 → CNOT 0→1 = Bell state."}
        </div>
      </aside>
    </div>
  );
}
