import React from "react";

interface GlobeProps {
  className?: string;
}

const Globe: React.FC<GlobeProps> = ({ className = "h-screen" }) => {
  return (
    <>
      <style>
        {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 560px 0; }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        `}
      </style>
      <div className={`flex items-center justify-center relative ${className}`}>
        {/* Stars (placed outside overflow-hidden container to remain visible) */}
        <div
          className="absolute left-[calc(50%-180px)] top-[20%] w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{ animation: "twinkling 3s infinite" }}
        />
        <div
          className="absolute left-[calc(50%-220px)] top-[70%] w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{ animation: "twinkling-slow 2.5s infinite" }}
        />
        <div
          className="absolute left-[calc(50%+200px)] top-[35%] w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{ animation: "twinkling-long 4s infinite" }}
        />
        <div
          className="absolute left-[calc(50%+180px)] top-[80%] w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{ animation: "twinkling 3s infinite" }}
        />
        <div
          className="absolute left-[calc(50%-60px)] top-[-40px] w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{ animation: "twinkling-fast 1.5s infinite" }}
        />
        <div
          className="absolute left-[calc(50%+120px)] top-[-30px] w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{ animation: "twinkling-long 3.5s infinite" }}
        />
        <div
          className="absolute left-[calc(50%+70px)] top-[110%] w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{ animation: "twinkling-slow 2s infinite" }}
        />

        {/* Globe */}
        <div
          className="relative w-[350px] h-[350px] rounded-full overflow-hidden shadow-[0_0_35px_rgba(255,255,255,0.15),-7px_0_11px_#c3f4ff_inset,20px_3px_35px_#000_inset,-32px_-3px_48px_#c3f4ff99_inset,350px_0_60px_#00000066_inset,210px_0_50px_#000000aa_inset]"
          style={{
            backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "left",
            animation: "earthRotate 30s linear infinite",
          }}
        />
      </div>
    </>
  );
};

export default Globe;
