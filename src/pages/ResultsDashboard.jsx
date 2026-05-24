import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAudit } from "../hooks/useAudit";
import ResultCard from "../components/ResultCard";
import SavingsChart from "../components/SavingsChart";
import AIRecommendationCard from "../components/AIRecommendationCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { 
  ArrowLeft, Share2, Copy, Check, Sparkles, RefreshCw, AlertTriangle, 
  ChevronRight, ArrowRight, ShieldCheck, Mail, Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultsDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { result, loading, error, loadAuditReport, clearForm } = useAudit();
  
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (id) {
      loadAuditReport(id);
    }
  }, [id]);

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/report/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 3000);
  };

  const handleStartOver = () => {
    clearForm();
    navigate("/audit");
  };

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
        <h2 className="font-display font-bold text-lg text-slate-100 uppercase">Audit Load Failed</h2>
        <p className="text-xs text-slate-400">
          We couldn't retrieve the audit report with ID <span className="font-mono text-cyan-400">{id}</span>. It may have expired or is not stored in this browser state.
        </p>
        <button 
          onClick={handleStartOver}
          className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Start New Audit</span>
        </button>
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
    email 
  } = result;

  // Render score severity color styles
  const scoreColors = optimizationScore >= 80 
    ? { border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-400" }
    : optimizationScore >= 60
    ? { border: "border-amber-500/20", bg: "bg-amber-500/5", text: "text-amber-400" }
    : { border: "border-rose-500/20", bg: "bg-rose-500/5", text: "text-rose-400" };

  return (
    <div className="space-y-8 py-4 relative">
      
      {/* Toast Alert popup notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass-panel border-cyan-500/30 px-5 py-3 rounded-xl flex items-center space-x-2 text-xs font-bold text-slate-200 shadow-2xl bg-slate-950/95"
          >
            <div className="h-4.5 w-4.5 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span>Shareable public report link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header bar controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900/60 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-350 transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-400">Reports</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-300 font-semibold">{id.substring(0, 8)}...</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-100 tracking-wide uppercase">
            AUDIT REPORT
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-cyan-400" /> {email}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-cyan-400" /> {teamSize} users</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleCopyLink}
            className="bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-slate-300 px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-cyan-400" /> : <Copy className="h-4 w-4" />}
            <span>Share Audit Report</span>
          </button>
          
          <button 
            onClick={handleStartOver}
            className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            <span>New Audit</span>
          </button>
        </div>
      </div>

      {/* Email confirmation info banner */}
      <div className="glass-panel border-cyan-500/20 bg-cyan-500/5 px-4 py-3.5 rounded-xl flex items-center gap-2.5 text-xs text-slate-300">
        <Mail className="h-4.5 w-4.5 text-cyan-450 shrink-0 animate-pulse" />
        <span>
          A secure audit report link has been dispatched to: <strong className="text-cyan-400 font-mono">{email}</strong>.
        </span>
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

      {/* Score Overview and Graph row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score block */}
        <div className={`glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-6 ${scoreColors.border} ${scoreColors.bg} lg:col-span-1`}>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200">
                AUDIT ASSESSMENT
              </h4>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Your organization scored a <span className={`font-bold ${scoreColors.text}`}>{optimizationScore}/100</span> in AI stack optimization. We identified <span className="text-slate-200 font-semibold">${monthlySavings}/month</span> in redundant licenses and model configuration overspend.
            </p>
          </div>

          {/* Savings breakdown numbers */}
          <div className="space-y-3 pt-6 border-t border-slate-900/60 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Current Cost:</span>
              <span className="text-slate-350">${totalCurrentSpend}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Optimized Cost:</span>
              <span className="text-cyan-400 font-semibold">${totalOptimizedSpend}/mo</span>
            </div>
            <div className="flex justify-between border-t border-slate-900/40 pt-2 text-sm">
              <span className="text-slate-450">Net Savings:</span>
              <span className="text-emerald-400 font-extrabold">${monthlySavings}/mo</span>
            </div>
          </div>

          <div className="pt-4 text-[10px] text-slate-500 leading-relaxed italic border-t border-slate-900/40">
            Applying the suggestions below immediately updates billing profiles to these optimized configurations.
          </div>
        </div>

        {/* SVG interactive comparative chart */}
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
        <div className="flex items-center space-x-2 border-b border-slate-900/60 pb-3">
          <h4 className="font-display text-sm font-semibold tracking-wider text-slate-200 uppercase">
            Optimization Action Items
          </h4>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800">
            {recommendations.length} Steps
          </span>
        </div>

        {recommendations.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center space-y-2 border-emerald-500/10 bg-emerald-500/5">
            <ShieldCheck className="h-8 w-8 text-emerald-400 mx-auto" />
            <h5 className="font-display font-semibold text-sm text-slate-100">Your stack is optimized!</h5>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Our audit engine detected 0 redundancies or overspending limits. You are currently utilizing AI licenses at maximum efficiency.
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
          Scanned Cost Breakdown
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
