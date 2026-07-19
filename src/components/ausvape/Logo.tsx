export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-baseline gap-0.5 font-display font-black tracking-tight leading-none ${className}`}>
      <span style={{ color: "#F4F4F2" }}>AUS</span>
      <span className="text-gold">VAPE</span>
      <span className="ml-1 text-[0.4em] tracking-[0.4em] text-gold self-center">CO</span>
    </div>
  );
}