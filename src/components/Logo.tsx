import React from "react";

interface LogoProps {
  className?: string;
  glow?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8 w-8", glow = true }) => {
  return (
    <svg
      className={`${className} ${glow ? "filter drop-shadow-[0_0_8px_rgba(0,198,255,0.5)]" : ""}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" x2="32" y1="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00C6FF" />
          <stop offset="50%" stopColor="#6A5CFF" />
          <stop offset="100%" stopColor="#14F195" />
        </linearGradient>
      </defs>
      {/* Outer futuristic diamond/hexagon path */}
      <path
        d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
        stroke="url(#logo-grad)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Inner geometric A-frame */}
      <path
        d="M16 8L22 20H10L16 8Z"
        fill="url(#logo-grad)"
        opacity="0.85"
      />
      {/* Core glowing crystal node */}
      <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
    </svg>
  );
};
