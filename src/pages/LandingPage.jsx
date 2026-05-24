import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, ShieldCheck, Zap, Activity, Coins, Star, 
  MessageSquare, BrainCircuit, Code, Terminal, Sparkles, Cpu, Layers, Network
} from "lucide-react";
import { motion } from "framer-motion";
import { AI_TOOLS, INDUSTRY_AVGS } from "../data/pricingData";

const ICON_MAP = {
  MessageSquare,
  BrainCircuit,
  Code,
  Terminal,
  Sparkles,
  Cpu,
  Layers,
  Network
};

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-24 py-8">
      
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Badge */}
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 tracking-wider uppercase font-mono">
            <Zap className="h-3.5 w-3.5" />
            <span>Next-Gen SaaS Optimization</span>
          </span>

          {/* Heading */}
          <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-[1.1] text-slate-100 uppercase">
            STOP OVERPAYING FOR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-glow-cyan">
              TEAM AI WORKSPACES
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Scan your engineering and support stack. Instantly detect license overlaps, seat waste, and bloated API endpoints. Save up to <span className="text-cyan-400 font-bold">40% monthly</span>.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/audit">
            <button className="w-full sm:w-auto glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer">
              <span>Start Free Spend Audit</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </Link>
          <a href="#features">
            <button className="w-full sm:w-auto bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold px-8 py-3.5 rounded-xl text-sm transition-all cursor-pointer">
              Learn How It Works
            </button>
          </a>
        </motion.div>

        {/* Floating Metrics Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-16"
        >
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="font-display font-extrabold text-2xl text-cyan-400 text-glow-cyan">{INDUSTRY_AVGS.averageOverspendPercent}%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Average Waste</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="font-display font-extrabold text-2xl text-fuchsia-400 text-glow-purple">{INDUSTRY_AVGS.duplicateLicenseRate}%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">IDE Redundancy</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="font-display font-extrabold text-2xl text-emerald-400">{INDUSTRY_AVGS.inactiveSeatRate}%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Seat Slack</div>
          </div>
          <div className="glass-panel p-4 rounded-xl text-center">
            <div className="font-display font-extrabold text-2xl text-slate-200">2 Mins</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Audit Time</div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="space-y-12 scroll-mt-20">
        <div className="text-center space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-slate-100">
            How We Optimize Your AI Spend
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Our audit engine filters subscription sheets and developer configs against three optimization profiles:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl w-fit mb-4">
              <Coins className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-100 mb-2">IDE Redundancy Audits</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find developers with active subscriptions to both Cursor AI and GitHub Copilot. Standardize code editor extensions and eliminate overlapping seat fees.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-fuchsia-500/10 hover:border-fuchsia-500/30 transition-all duration-300">
            <div className="p-3 bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 rounded-xl w-fit mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-100 mb-2">Seat Minimum Guardrails</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identify subscription tiers (like Claude Team or ChatGPT Team) where you pay for seat minimum quotas that exceed your active user count. Downsize safely to individual Pro accounts.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl w-fit mb-4">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-slate-100 mb-2">API Token Streamlining</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyze API usage models. Migrate generic prompts from expensive models (Opus) to highly performant mini models (Sonnet / GPT-4o-mini), and recommend semantic prompt caches.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Tools Grid */}
      <section id="pricing-dataset" className="space-y-10 scroll-mt-20">
        <div className="text-center space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-slate-100">
            Auditable Products & Licenses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            We analyze seat matrices and API costs across all major developer and enterprise assistant providers:
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {Object.values(AI_TOOLS).map(tool => {
            const Icon = ICON_MAP[tool.icon] || Cpu;
            return (
              <motion.div
                key={tool.id}
                variants={itemVariants}
                className="glass-panel p-5 rounded-xl border-slate-900 hover:border-slate-800 transition-all flex flex-col items-start text-left space-y-3"
              >
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-cyan-400">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display uppercase tracking-wide text-slate-200">{tool.name}</h4>
                  <span className="text-[10px] text-slate-500 leading-none">{tool.category}</span>
                </div>
                <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-900 w-full flex justify-between items-center">
                  <span>Tiers audited:</span>
                  <span className="font-semibold text-slate-350">{tool.plans.length}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider text-slate-100">
            Trusted by CTOs & Developers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            See how modern development organizations are cleaning up their AI subscription sprawl:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-slate-400 italic leading-relaxed">
              "We realized 8 developers had active subscriptions to both Cursor Pro and GitHub Copilot. Canceling Copilot for those seats saved us $152/month instantly. Highly recommend running this audit."
            </p>
            <div className="text-left">
              <h4 className="text-xs font-bold text-slate-200">Alex Rivers</h4>
              <span className="text-[10px] text-slate-500 font-mono">CTO, CloudScale Solutions</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-slate-400 italic leading-relaxed">
              "The Claude Team seat minimum check was eye-opening. We paid for 5 Team seats but only had 3 developers using them. Downgrading to individual Pro plans saved us $90/month with zero loss in features."
            </p>
            <div className="text-left">
              <h4 className="text-xs font-bold text-slate-200">Marcus Sterling</h4>
              <span className="text-[10px] text-slate-500 font-mono">Director of Engineering, VeloTech</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex text-amber-500 gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-slate-400 italic leading-relaxed">
              "Transitioning our background classifying pipelines from GPT-4o to GPT-4o-mini as suggested by the API audit cut our monthly developer billing from $1,200 to $450. A total game changer."
            </p>
            <div className="text-left">
              <h4 className="text-xs font-bold text-slate-200">Elena Rostova</h4>
              <span className="text-[10px] text-slate-500 font-mono">VP of AI Operations, SynthGen</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="glass-panel p-10 sm:p-12 rounded-3xl border-cyan-500/10 text-center space-y-6 max-w-4xl mx-auto shadow-[0_0_50px_rgba(6,182,212,0.02)]">
        <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none rounded-3xl" />
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-100 tracking-tight uppercase">
          Ready to trim your AI overhead?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          No credit card required. Our tool scans configurations and provides actionable markdown reports you can export to management.
        </p>
        <div className="pt-2">
          <Link to="/audit">
            <button className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 mx-auto transition-all cursor-pointer">
              <span>Run Spend Audit Now</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}
