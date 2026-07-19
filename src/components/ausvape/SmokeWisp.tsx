export function SmokeWisp({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="wisp-a" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F4F4F2" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#F4F4F2" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#F4F4F2" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wisp-b" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0CD6E" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#F0CD6E" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#F0CD6E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="animate-wisp">
        <ellipse cx="300" cy="200" rx="220" ry="120" fill="url(#wisp-a)" />
      </g>
      <g className="animate-wisp-slow">
        <ellipse cx="360" cy="180" rx="180" ry="90" fill="url(#wisp-b)" />
      </g>
      <g className="animate-wisp" style={{ animationDelay: "-4s" }}>
        <path
          d="M120 260 Q 200 200 260 240 T 420 220 T 560 260"
          stroke="#F4F4F2"
          strokeOpacity="0.12"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function WispDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 40"
      className={`w-full h-8 ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wisp-div" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#A9791F" stopOpacity="0" />
          <stop offset="50%" stopColor="#A9791F" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#A9791F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 20 Q 150 4 300 20 T 600 20 T 900 20 T 1200 20"
        stroke="url(#wisp-div)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}