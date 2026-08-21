export default function AdminLoading() {
  return (
    <div className="flex-1 flex items-center justify-center h-full min-h-[80vh] bg-[#030712] rounded-2xl m-4 border border-gray-800/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="relative flex flex-col items-center">
        {/* Infinity SVG Animation */}
        <div className="relative">
          <svg 
            viewBox="0 0 100 50" 
            className="w-40 h-20 md:w-56 md:h-28 drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]"
          >
            <defs>
              <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Background Track */}
            <path
              d="M 25 40 C 5 40 5 10 25 10 C 45 10 55 40 75 40 C 95 40 95 10 75 10 C 55 10 45 40 25 40 Z"
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="4"
              strokeLinecap="round"
            />
            
            {/* Animated Glowing Stroke */}
            <path
              d="M 25 40 C 5 40 5 10 25 10 C 45 10 55 40 75 40 C 95 40 95 10 75 10 C 55 10 45 40 25 40 Z"
              fill="none"
              stroke="url(#infinityGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow)"
              pathLength="100"
              style={{
                strokeDasharray: "35 65",
                strokeDashoffset: "100",
                animation: "infinityDash 2s linear infinite"
              }}
            />
          </svg>
        </div>
        
        <p className="mt-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold tracking-[0.3em] uppercase text-xs sm:text-sm animate-pulse">
          Loading...
        </p>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes infinityDash {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
        `
      }} />
    </div>
  );
}
