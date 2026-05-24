import React, { useState } from "react";
import { TrendingUp, BarChart3, HelpCircle } from "lucide-react";

export default function SavingsChart({ currentSpend, optimizedSpend, monthlySavings }) {
  const [activeTab, setActiveTab] = useState("bars"); // "bars" | "cumulative"
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonthly = currentSpend;
  const optimizedMonthly = optimizedSpend;

  // Chart Dimension constants
  const width = 600;
  const height = 260;
  const paddingX = 50;
  const paddingY = 40;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Bar Chart calculations
  const maxSpend = Math.max(currentMonthly * 1.15, 100);
  const getBarHeight = (value) => (value / maxSpend) * chartHeight;

  // Cumulative Chart calculations
  const cumulativeData = Array.from({ length: 12 }, (_, i) => (i + 1) * monthlySavings);
  const maxCumulative = Math.max(cumulativeData[11] * 1.1, 100);
  
  // Generate coordinates for cumulative SVG path
  const points = cumulativeData.map((val, i) => {
    const x = paddingX + (i / 11) * chartWidth;
    const y = paddingY + chartHeight - (val / maxCumulative) * chartHeight;
    return { x, y, val };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = points.length > 0 
    ? `${pathD} L ${points[points.length - 1].x} ${paddingY + chartHeight} L ${points[0].x} ${paddingY + chartHeight} Z`
    : "";

  return (
    <div className="glass-panel p-6 rounded-2xl border-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.02)] flex flex-col h-full">
      {/* Header and tab switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-900/60 pb-4">
        <div>
          <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200 uppercase">
            Financial Projections
          </h4>
          <p className="text-xs text-slate-400">
            Compare cost models and project yearly budget margins.
          </p>
        </div>
        
        <div className="flex space-x-1 p-0.5 bg-slate-950/80 rounded-lg border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("bars")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === "bars"
                ? "bg-cyan-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Monthly Compare</span>
          </button>
          <button
            onClick={() => setActiveTab("cumulative")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              activeTab === "cumulative"
                ? "bg-fuchsia-500 text-slate-950 shadow"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Cumulative Savings</span>
          </button>
        </div>
      </div>

      {/* Render SVG content */}
      <div className="relative w-full flex-1 min-h-[220px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full font-sans select-none overflow-visible">
          {/* Y Axis Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = paddingY + chartHeight - ratio * chartHeight;
            const gridVal = activeTab === "bars" 
              ? Math.round(ratio * maxSpend) 
              : Math.round(ratio * maxCumulative);
            return (
              <g key={idx} className="opacity-40">
                <line 
                  x1={paddingX} 
                  y1={y} 
                  x2={width - paddingX} 
                  y2={y} 
                  stroke="rgba(255, 255, 255, 0.06)" 
                  strokeWidth="1"
                />
                <text 
                  x={paddingX - 10} 
                  y={y + 4} 
                  fill="#94a3b8" 
                  fontSize="10" 
                  textAnchor="end"
                  className="font-mono"
                >
                  ${gridVal}
                </text>
              </g>
            );
          })}

          {/* Bar Chart rendering */}
          {activeTab === "bars" && (
            <g>
              {/* Labels and Bars */}
              {months.map((m, i) => {
                const groupWidth = chartWidth / 12;
                const groupX = paddingX + i * groupWidth;
                const barWidth = groupWidth * 0.35;
                const spacer = groupWidth * 0.08;

                const curHeight = getBarHeight(currentMonthly);
                const optHeight = getBarHeight(optimizedMonthly);
                
                const curY = paddingY + chartHeight - curHeight;
                const optY = paddingY + chartHeight - optHeight;

                const isHovered = hoveredIndex === i;

                return (
                  <g 
                    key={m}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    {/* Current Spend Bar (Rose Red/Amber) */}
                    <rect
                      x={groupX + groupWidth / 2 - barWidth - spacer}
                      y={curY}
                      width={barWidth}
                      height={curHeight}
                      fill="url(#roseGradient)"
                      rx="3"
                      className="transition-all duration-300 opacity-80 hover:opacity-100"
                    />

                    {/* Optimized Spend Bar (Cyan) */}
                    <rect
                      x={groupX + groupWidth / 2 + spacer}
                      y={optY}
                      width={barWidth}
                      height={optHeight}
                      fill="url(#cyanGradient)"
                      rx="3"
                      className="transition-all duration-300 opacity-80 hover:opacity-100"
                    />

                    {/* Transparent hover guide box */}
                    <rect
                      x={groupX}
                      y={paddingY}
                      width={groupWidth}
                      height={chartHeight}
                      fill="transparent"
                    />

                    {/* Month Label */}
                    <text
                      x={groupX + groupWidth / 2}
                      y={height - paddingY + 16}
                      fill={isHovered ? "#06b6d4" : "#64748b"}
                      fontSize="9"
                      fontWeight={isHovered ? "bold" : "normal"}
                      textAnchor="middle"
                    >
                      {m}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Cumulative line rendering */}
          {activeTab === "cumulative" && (
            <g>
              {/* Background gradient area fill */}
              <path
                d={areaD}
                fill="url(#fuchsiaAreaGradient)"
                opacity="0.3"
              />

              {/* Line path */}
              <path
                d={pathD}
                fill="none"
                stroke="url(#fuchsiaLineGradient)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              {points.map((p, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <g 
                    key={i}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 6 : 4}
                      fill="#d946ef"
                      stroke="#020617"
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    
                    {/* Hover hotspot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="16"
                      fill="transparent"
                    />

                    {/* Month Label */}
                    <text
                      x={p.x}
                      y={height - paddingY + 16}
                      fill={isHovered ? "#d946ef" : "#64748b"}
                      fontSize="9"
                      fontWeight={isHovered ? "bold" : "normal"}
                      textAnchor="middle"
                    >
                      {months[i]}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* Definitions / Gradients */}
          <defs>
            <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#e11d48" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="fuchsiaLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="fuchsiaAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d946ef" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Live dynamic HTML tooltips inside SVG space */}
        {hoveredIndex !== null && (
          <div 
            className="absolute z-10 glass-panel px-3 py-2 rounded-lg pointer-events-none text-xs border-slate-700 shadow-xl"
            style={{
              left: `${(hoveredIndex / 11) * 75 + 10}%`,
              top: activeTab === "bars" ? "20px" : "15px",
              transform: "translateX(-50%)"
            }}
          >
            {activeTab === "bars" ? (
              <div className="space-y-1">
                <p className="font-semibold text-slate-300 mb-0.5">{months[hoveredIndex]} Costs</p>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="text-slate-400">Current:</span>
                  <span className="font-mono font-bold text-rose-400">${currentMonthly}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" />
                  <span className="text-slate-400">Optimized:</span>
                  <span className="font-mono font-bold text-cyan-400">${optimizedMonthly}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-300">{months[hoveredIndex]} Accrued</p>
                <div className="flex items-center space-x-1.5">
                  <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                  <span className="text-slate-400">Savings:</span>
                  <span className="font-mono font-bold text-fuchsia-400">${cumulativeData[hoveredIndex]}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer statistics legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-900/60 pt-4 mt-4 text-xs font-medium">
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded bg-rose-500 shrink-0" />
          <span className="text-slate-400">Unoptimized Cost</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 rounded bg-cyan-500 shrink-0" />
          <span className="text-slate-400">Optimized cost</span>
        </div>
        <div className="col-span-2 sm:col-span-1 flex items-center space-x-2 text-slate-300 text-glow-cyan">
          <TrendingUp className="h-4 w-4 text-cyan-400" />
          <span>Save ${monthlySavings * 12}/yr</span>
        </div>
      </div>
    </div>
  );
}
