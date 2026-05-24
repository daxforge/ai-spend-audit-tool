import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Terminal } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border-rose-500/25 shadow-[0_0_30px_rgba(244,63,94,0.03)] text-center space-y-6 relative overflow-hidden select-none">
        
        {/* Glowing background blob */}
        <div className="absolute inset-0 bg-rose-500/5 animate-pulse" />

        {/* Cyber glitch symbol */}
        <div className="relative mb-6">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-rose-500/10 blur-md" />
          <AlertCircle className="h-16 w-16 text-rose-500 mx-auto animate-bounce relative" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h1 className="font-display font-black text-3xl text-slate-100 uppercase tracking-wider">
            ERROR 404
          </h1>
          <p className="text-xs uppercase font-mono tracking-widest text-rose-400">
            Endpoint not found
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed pt-2">
            The page you are trying to query does not exist or has been removed from our routing registry.
          </p>
        </div>

        {/* Simulated terminal logs */}
        <div className="bg-slate-950/80 border border-slate-900 rounded-lg p-4 text-[10px] font-mono text-left space-y-1">
          <div className="flex items-center space-x-1.5 text-slate-500 border-b border-slate-900 pb-1.5 mb-2 uppercase">
            <Terminal className="h-3.5 w-3.5" />
            <span>Developer console logs</span>
          </div>
          <div className="text-rose-450">&gt; GET {window.location.pathname} [FAIL]</div>
          <div className="text-slate-550">&gt; Error Code: 0x404_ROUTE_REGISTRY_MISSING</div>
          <div className="text-slate-550">&gt; Action: Route mapping fallback initiated...</div>
        </div>

        {/* CTA Home Trigger */}
        <div className="pt-2">
          <Link to="/">
            <button className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home registry</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
