import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAudit } from "../hooks/useAudit";
import ResultCard from "../components/ResultCard";
import SavingsChart from "../components/SavingsChart";
import AIRecommendationCard from "../components/AIRecommendationCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { 
  Cpu, AlertTriangle, ArrowRight, ShieldCheck, Mail, Users, TrendingDown, Clock, Shield
} from "lucide-react";

export default function PublicReportPage() {
  const { id } = useParams();
  const { result, loading, error, loadAuditReport } = useAudit();

  useEffect(() => {
    if (id) {
      loadAuditReport(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="text-center space-y-6 max-w-md mx-auto py-16 glass-panel rounded-2xl p-8 border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.02)]">
        <AlertTriangle className="h-12 w-12 text-rose-500 mx-auto animate-bounce" />
        <h2 className="font-display font-bold text-lg text-slate-100 uppercase">Report Unreachable</h2>
        <p className="text-xs text-slate-400">
          This shareable audit link is invalid, has expired, or is stored in another user's local browser database.
        </p>
        <Link to="/audit">
          <button className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1">
            <span>Run A Free Spend Audit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>
    );
  }

  const { 
    totalCurrentSpend, 
    totalOptimizedSpend, 
    monthlySavings, 
    yearlySavings, 
    optimizationScore, 
    recommendations = [], 
    breakdown = [], 
    teamSize, 
    email,
    created_at
  } = result;

  // Mask email for privacy (e.g. j***@company.com)
  const maskEmail = (rawEmail) => {
    if (!rawEmail) return "anonymous@company.com";
    const parts = rawEmail.split("@");
    if (parts.length < 2) return "anonymous@company.com";
    const name = parts[0];
    const domain = parts[1];
    if (name.length <= 2) return `*@${domain}`;
    return `${name[0]}${"*".repeat(name.length - 2)}${name[name.length - 1]}@${domain}`;
  };

  const formattedDate = created_at 
    ? new Date(created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 py-4 relative">
      
      {/* Top Banner Notice */}
      <div className="glass-panel border-cyan-500/20 bg-cyan-500/5 px-6 py-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Shield className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-450 block">Security Audited Link</span>
            <h3 className="text-xs font-semibold text-slate-200">
              You are viewing a shared, read-only audit report for <span className="font-mono text-cyan-400">{maskEmail(email)}</span>.
            </h3>
          </div>
        </div>

        <Link to="/audit">
          <button className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0">
            <span>Audit Your Stack</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </Link>
      </div>

      {/* Title section */}
      <div className="border-b border-slate-900/60 pb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 tracking-wide uppercase">
            AI SaaS Spend Audit
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-450">
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-cyan-400" /> Team: {teamSize} users</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-cyan-400" /> Compiled: {formattedDate}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 px-3 py-1 bg-slate-950/80 rounded border border-slate-800 font-mono text-[10px] text-slate-500 uppercase tracking-widest self-start sm:self-auto select-none">
          Report ID: {id.substring(0, 13)}...
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ResultCard
          title="Yearly Cost Savings"
          value={`$${yearlySavings}`}
          iconName="TrendingDown"
          color="emerald"
          description="Immediate yearly budget cut options"
          subValue="40% Saved"
        />
        <ResultCard
          title="Optimization Score"
          value={`${optimizationScore}/100`}
          iconName="ShieldCheck"
          color={optimizationScore >= 80 ? "emerald" : optimizationScore >= 60 ? "cyan" : "rose"}
          description="Stack efficiency benchmark rating"
          subValue="Score"
        />
        <ResultCard
          title="Monthly Overspend"
          value={`$${monthlySavings}`}
          iconName="Coins"
          color="rose"
          description="Redundant monthly seat/API waste"
          subValue="Waste"
        />
        <ResultCard
          title="Audited Tiers"
          value={`${breakdown.length}`}
          iconName="Activity"
          color="purple"
          description="Active AI tools scanned by engine"
          subValue="Licenses"
        />
      </div>

      {/* Graph and calculations summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-6 lg:col-span-1 border-slate-900 bg-slate-950/40">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-5 w-5 text-cyan-400" />
              <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200">
                AUDITED SAVINGS PROFILE
              </h4>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on the team parameters inputted by the auditor, this stack shows a potential cost reduction of <span className="text-emerald-400 font-bold">${monthlySavings}/mo</span>.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-900/60 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Unoptimized:</span>
              <span className="text-slate-350">${totalCurrentSpend}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Optimized:</span>
              <span className="text-cyan-400 font-semibold">${totalOptimizedSpend}/mo</span>
            </div>
            <div className="flex justify-between border-t border-slate-900/40 pt-2 text-sm">
              <span className="text-slate-450">Savings:</span>
              <span className="text-emerald-400 font-extrabold">${monthlySavings}/mo</span>
            </div>
          </div>

          <div className="pt-4 text-[10px] text-slate-500 leading-relaxed border-t border-slate-900/40">
            Audit calculations are compiled using current market subscriptions rates.
          </div>
        </div>

        <div className="lg:col-span-2">
          <SavingsChart 
            currentSpend={totalCurrentSpend} 
            optimizedSpend={totalOptimizedSpend} 
            monthlySavings={monthlySavings} 
          />
        </div>
      </div>

      {/* Actionable Recommendations List */}
      <div className="space-y-4">
        <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200 uppercase border-b border-slate-900/60 pb-3">
          Proposed Action Items
        </h4>

        {recommendations.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-2 border-emerald-500/10 bg-emerald-500/5">
            <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto" />
            <h5 className="font-display font-semibold text-sm text-slate-100">Stack is fully optimized</h5>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Our audit engine detected 0 redundancies or overspending limits. This organization uses AI licenses at peak efficiency.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <AIRecommendationCard key={rec.id || idx} recommendation={rec} />
            ))}
          </div>
        )}
      </div>

      {/* Audited Tool Details breakdown table */}
      <div className="space-y-4">
        <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200 uppercase border-b border-slate-900/60 pb-3">
          Detailed Cost Audit breakdown
        </h4>
        
        <div className="glass-panel rounded-2xl overflow-hidden border-slate-900/80 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse select-none">
              <thead>
                <tr className="bg-slate-950/80 text-slate-500 border-b border-slate-900 uppercase font-mono tracking-wider font-semibold text-[10px]">
                  <th className="px-6 py-4">AI Service</th>
                  <th className="px-6 py-4">Selected plan</th>
                  <th className="px-6 py-4 text-center">Seats count</th>
                  <th className="px-6 py-4 text-right">Current cost</th>
                  <th className="px-6 py-4 text-right">Optimized cost</th>
                  <th className="px-6 py-4 text-right text-cyan-400">Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {breakdown.map((row, idx) => {
                  const savings = row.currentCost - row.optimizedCost;
                  return (
                    <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4.5 font-bold text-slate-200">{row.name}</td>
                      <td className="px-6 py-4.5 text-slate-400">{row.planName}</td>
                      <td className="px-6 py-4.5 text-center font-mono text-slate-350">{row.seats !== null ? row.seats : "N/A"}</td>
                      <td className="px-6 py-4.5 text-right font-mono text-slate-350">${row.currentCost}/mo</td>
                      <td className="px-6 py-4.5 text-right font-mono text-cyan-400">${row.optimizedCost}/mo</td>
                      <td className={`px-6 py-4.5 text-right font-mono font-bold ${savings > 0 ? "text-emerald-400" : "text-slate-500"}`}>
                        {savings > 0 ? `-$${savings}/mo` : "$0/mo"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
