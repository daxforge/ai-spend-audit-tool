import React from "react";
import { ArrowRight, Sparkles, TrendingDown, Trash2, ArrowUpDown, HelpCircle } from "lucide-react";

export default function AIRecommendationCard({ recommendation }) {
  const { title, description, impact, monthlySavings, actionable, toolName } = recommendation;

  const impactStyles = {
    High: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
  }[impact] || "bg-slate-800 text-slate-300 border-slate-700";

  return (
    <div className="glass-panel p-5 rounded-2xl border-slate-800/80 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.03)] group">
      
      {/* Icon & Description content */}
      <div className="flex items-start gap-4 md:max-w-2xl">
        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mt-1 shrink-0 group-hover:scale-105 transition-all">
          <Sparkles className="h-5 w-5" />
        </div>
        
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">{toolName}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${impactStyles}`}>
              {impact} Impact
            </span>
          </div>
          
          <h4 className="text-base font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
            {title}
          </h4>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            {description}
          </p>

          {/* Action step guide */}
          {actionable && (
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300 mt-2 bg-slate-950/65 p-2 rounded-lg border border-slate-900 w-fit">
              <span className="text-cyan-400 uppercase tracking-widest font-mono text-[9px] px-1.5 py-0.5 bg-cyan-500/10 rounded">ACTION</span>
              <span>{actionable}</span>
            </div>
          )}
        </div>
      </div>

      {/* Savings Metric badge */}
      <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-slate-900/60 pt-4 md:pt-0 shrink-0">
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 md:mb-1">
          Monthly Savings
        </span>
        <div className="flex items-center space-x-1">
          <TrendingDown className="h-4.5 w-4.5 text-emerald-400" />
          <span className="font-display font-extrabold text-xl text-emerald-400">
            ${Math.round(monthlySavings)}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">/mo</span>
        </div>
        <div className="hidden md:block text-[9px] font-semibold text-slate-500 mt-1 font-mono uppercase">
          ${Math.round(monthlySavings * 12)}/yr saved
        </div>
      </div>

    </div>
  );
}
