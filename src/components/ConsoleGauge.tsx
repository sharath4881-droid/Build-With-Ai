import React from 'react';

interface ConsoleGaugeProps {
  psi: number; // 0 - 100
  label?: string;
  onClick?: () => void;
}

export const ConsoleGauge: React.FC<ConsoleGaugeProps> = ({
  psi,
  label = 'SLA PRESSURE',
  onClick,
}) => {
  // Map PSI (0 to 100) to rotation angle in degrees (-60 to +95)
  // At 84% PSI it's approx 68-70 degrees
  const angle = Math.min(Math.max(-60 + (psi / 100) * 155, -60), 95);

  const getGaugeColor = () => {
    if (psi > 80) return '#ffb4ab'; // critical redline
    if (psi > 60) return '#ffb77d'; // amber warning
    return '#4edea3'; // emerald safe
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center cursor-pointer group"
      title={`SLA Pressure: ${psi}% PSI (Click to inspect load curves)`}
    >
      {/* Outer Knurled Bezel */}
      <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-br from-[#363941] via-[#32353d] to-[#0b0e15] shadow-[0_6px_16px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center transition-transform group-hover:scale-105">
        {/* Glass Reflection Ring */}
        <div className="relative w-full h-full rounded-full bg-[#0b0e15] p-2 shadow-[inset_0_4px_10px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col items-center justify-center">
          {/* Glare Overlay 315-deg sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-full" />

          {/* Pressure Gauge SVG with Redline Zone & Needle */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background Arc */}
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="38"
              stroke="#272a32"
              strokeDasharray="180 60"
              strokeWidth="6"
              transform="rotate(135 50 50)"
            />
            {/* Green Safety Arc */}
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="38"
              stroke="#4edea3"
              strokeDasharray="90 150"
              strokeWidth="6"
              transform="rotate(135 50 50)"
            />
            {/* Amber Caution Arc */}
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="38"
              stroke="#ffb77d"
              strokeDasharray="45 195"
              strokeWidth="6"
              transform="rotate(225 50 50)"
            />
            {/* Redline Critical Arc */}
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="38"
              stroke="#ffb4ab"
              strokeDasharray="45 195"
              strokeWidth="6"
              transform="rotate(270 50 50)"
            />
            {/* Calibration Ticks */}
            <line stroke="#86948a" strokeWidth="1.5" x1="50" x2="50" y1="14" y2="19" />
            <line stroke="#86948a" strokeWidth="1.5" x1="26" x2="29" y1="24" y2="28" />
            <line stroke="#86948a" strokeWidth="1.5" x1="74" x2="71" y1="24" y2="28" />
            <line stroke="#86948a" strokeWidth="1.2" x1="16" x2="21" y1="42" y2="44" />
            <line stroke="#86948a" strokeWidth="1.2" x1="84" x2="79" y1="42" y2="44" />

            {/* Active Metallic Needle pegged with smooth CSS transition */}
            <g
              transform={`rotate(${angle} 50 50)`}
              style={{ transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <polygon
                fill={getGaugeColor()}
                filter="drop-shadow(0 0 3px rgba(255,183,125,0.8))"
                points="49,15 51,15 52,50 48,50"
              />
            </g>

            {/* Center Cap Screw */}
            <circle cx="50" cy="50" fill="#32353d" r="7" stroke="#86948a" strokeWidth="1" />
            <circle cx="50" cy="50" fill="#181b23" r="3" />
            <line stroke="#4a5568" strokeWidth="1" x1="47" x2="53" y1="50" y2="50" />
          </svg>

          {/* Digital Readout inside gauge bed */}
          <div className="absolute bottom-2.5 flex flex-col items-center pointer-events-none">
            <span className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest text-[#ffb77d] font-bold">
              PSI {psi}%
            </span>
          </div>
        </div>
      </div>
      <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider text-[#bbcabf] mt-1 font-semibold">
        {label}
      </span>
    </div>
  );
};
