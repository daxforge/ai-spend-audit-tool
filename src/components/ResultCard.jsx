import React from "react";
import * as Icons from "lucide-react";

export default function ResultCard({ title, value, iconName, color = "cyan", description, subValue }) {
  const Icon = Icons[iconName] || Icons.HelpCircle;

  const colorStyles = {
    cyan: {
      border: "border-cyan-500/20 hover:border-cyan-500/40",
      iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      text: "text-cyan-400 text-glow-cyan",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.05)]",
    },
    purple: {
      border: "border-fuchsia-500/20 hover:border-fuchsia-500/40",
      iconBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
      text: "text-fuchsia-400 text-glow-purple",
      glow: "shadow-[0_0_20px_rgba(217,70,239,0.05)]",
    },
    emerald: {
      border: "border-emerald-500/20 hover:border-emerald-500/40",
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      text: "text-emerald-400",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.05)]",
    },
    rose: {
      border: "border-rose-500/20 hover:border-rose-500/40",
      iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      text: "text-rose-400",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.05)]",
    }
  }[color];

  return (
    <div className={`glass-panel p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 ${colorStyles.border} ${colorStyles.glow} group hover:-translate-y-1`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{title}</span>
          <h3 className={`font-display text-3xl font-extrabold tracking-tight ${colorStyles.text} transition-all duration-300`}>
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl border ${colorStyles.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium leading-tight">{description}</span>
        {subValue && (
          <span className="font-mono text-slate-300 font-semibold px-2 py-0.5 bg-slate-950/80 rounded border border-slate-800">
            {subValue}
          </span>
        )}
      </div>
    </div>
  );
}
