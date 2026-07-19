export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 text-xs tracking-[0.35em] uppercase">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#A9791F]" />
      <span className="text-gold font-medium">{children}</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#A9791F]" />
    </div>
  );
}