import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, ShieldAlert } from "lucide-react";

const SCAN_STEPS = [
  "Initializing spend analyzer model...",
  "Querying ChatGPT/Claude license workspaces...",
  "Comparing development editor tool counts...",
  "Evaluating Cursor & Copilot redundant seats...",
  "Analyzing developer API token profiles...",
  "Estimating potential prompt caching rates...",
  "Executing pricing optimization algorithm...",
  "Generating final spend recommendations..."
];

export default function LoadingSpinner() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIdx(prev => (prev < SCAN_STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] w-full max-w-lg mx-auto p-8 rounded-2xl glass-panel relative overflow-hidden">
      {/* Pulse background */}
      <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
      
      {/* Glowing Radar animation */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />
        <div className="h-24 w-24 rounded-full border-2 border-cyan-500/10 border-t-cyan-500 animate-spin flex items-center justify-center">
          <Cpu className="h-10 w-10 text-cyan-400 animate-pulse" />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold text-slate-100 mb-2 tracking-wide flex items-center gap-2">
        <Terminal className="h-4 w-4 text-cyan-400" />
        AUDITING AI SPEND
      </h3>

      {/* Subtext info */}
      <p className="text-xs text-slate-400 mb-6 text-center max-w-sm">
        Running security-approved audit checks to compare subscriptions and detect redundant tooling costs.
      </p>

      {/* Simulated Scanner Logs */}
      <div className="w-full bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 font-mono text-left space-y-2 select-none">
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2 mb-2">
          <span className="text-[10px] text-slate-500">AUDIT STREAM LOG</span>
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
        </div>

        <div className="h-[96px] overflow-hidden text-xs flex flex-col justify-end space-y-1.5">
          {SCAN_STEPS.slice(Math.max(0, currentStepIdx - 3), currentStepIdx + 1).map((step, idx, arr) => {
            const isLast = idx === arr.length - 1;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isLast ? 1 : 0.4, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-2 ${isLast ? "text-cyan-400" : "text-slate-400"}`}
              >
                <span className="text-slate-600 shrink-0">&gt;</span>
                <span className="break-all">{step}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Loading Percentage indicator */}
      <div className="w-full bg-slate-900 h-1.5 rounded-full mt-6 overflow-hidden border border-slate-800">
        <motion.div
          className="bg-cyan-500 h-full glow-btn-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.round(((currentStepIdx + 1) / SCAN_STEPS.length) * 100)}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}
