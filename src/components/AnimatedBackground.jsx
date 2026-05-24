import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-slate-950 pointer-events-none">
      {/* Glow mesh circles */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-slow"
        style={{ animationDuration: "12s" }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-500/10 blur-[130px] animate-pulse-slow"
        style={{ animationDuration: "16s" }}
      />
      <div 
        className="absolute top-[30%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[100px] animate-pulse-slow"
        style={{ animationDuration: "20s" }}
      />
      <div 
        className="absolute bottom-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/5 blur-[90px] animate-pulse-slow"
        style={{ animationDuration: "14s" }}
      />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      />
      
      {/* Ambient noise or dots */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px]" />
    </div>
  );
}
