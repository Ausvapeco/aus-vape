import { useEffect, useState } from "react";
import { SmokeWisp } from "./SmokeWisp";

const KEY = "ausvape-age-confirmed";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem(KEY)) setOpen(true);
    } catch { setOpen(true); }
  }, []);

  const confirm = () => {
    try { window.sessionStorage.setItem(KEY, "1"); } catch {}
    setOpen(false);
  };
  const exit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#0A0A0C] flex items-center justify-center px-6" role="dialog" aria-modal="true" aria-label="Age verification">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <SmokeWisp className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px]" />
      </div>
      <div className="relative z-10 max-w-md w-full text-center animate-fade-up">
        <div className="font-display font-black text-4xl md:text-5xl tracking-tight">
          <span className="text-platinum" style={{ color: "#F4F4F2" }}>AUS</span>
          <span className="text-gold">VAPE</span>
        </div>
        <div className="mt-2 text-[10px] tracking-[0.5em] text-gold">CO</div>
        <div className="mx-auto my-8 hairline-gold w-40" />
        <h1 className="font-display text-2xl md:text-3xl font-bold">You must be 18 or older to enter.</h1>
        <p className="mt-4 text-sm text-[color:var(--color-smoke)]">
          This site contains nicotine products intended for adult consumers only. By entering, you confirm you are of legal purchasing age in your jurisdiction.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={confirm}
            className="bg-gold text-[#0A0A0C] font-semibold px-8 py-3 rounded-md hover:shadow-[0_0_24px_rgba(240,205,110,0.4)] transition-shadow"
          >
            I am 18 or older — Enter
          </button>
          <button
            onClick={exit}
            className="border border-[#96969B]/30 text-[color:var(--color-smoke)] px-8 py-3 rounded-md hover:border-[#96969B]/60 hover:text-[color:var(--color-platinum)] transition-colors"
          >
            Exit
          </button>
        </div>
        <p className="mt-8 text-[10px] tracking-widest uppercase text-[color:var(--color-smoke)]/70">Nicotine is addictive. Sold in Australia to 18+ only.</p>
      </div>
    </div>
  );
}