import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AI_TOOLS } from "../data/pricingData";
import { 
  Users, Mail, Check, Sparkles, Plus, Trash2, ArrowRight, ArrowLeft, Info,
  MessageSquare, BrainCircuit, Code, Terminal, Sparkles as GeminiIcon, Cpu, Layers, Network
} from "lucide-react";

const ICON_MAP = {
  MessageSquare,
  BrainCircuit,
  Code,
  Terminal,
  Sparkles: GeminiIcon,
  Cpu,
  Layers,
  Network
};

export default function SpendForm({ onSubmit, initialTools = [], initialTeamSize = 5, initialEmail = "" }) {
  const [step, setStep] = useState(1);
  const [teamSize, setTeamSize] = useState(initialTeamSize);
  const [email, setEmail] = useState(initialEmail);
  const [selectedToolsState, setSelectedToolsState] = useState(initialTools);
  const [formError, setFormError] = useState("");

  const handleToolToggle = (toolId) => {
    const isSelected = selectedToolsState.some(t => t.toolId === toolId);
    if (isSelected) {
      setSelectedToolsState(prev => prev.filter(t => t.toolId !== toolId));
    } else {
      const toolMeta = AI_TOOLS[toolId];
      // Default configurations
      const defaultPlan = toolMeta.plans[0]?.id || "payg";
      setSelectedToolsState(prev => [
        ...prev, 
        { 
          toolId, 
          planId: defaultPlan, 
          seats: toolId.endsWith("_api") ? null : 1, 
          customCost: toolId.endsWith("_api") ? 100 : 0 
        }
      ]);
    }
  };

  const handleToolChange = (toolId, field, value) => {
    setSelectedToolsState(prev => prev.map(t => {
      if (t.toolId === toolId) {
        return { ...t, [field]: value };
      }
      return t;
    }));
  };

  const validateStep1 = () => {
    setFormError("");
    if (!email) {
      setFormError("Please enter your business email.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return false;
    }
    if (teamSize <= 0) {
      setFormError("Team size must be at least 1.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setFormError("");
    if (selectedToolsState.length === 0) {
      setFormError("Please select at least one AI tool or API to audit.");
      return false;
    }

    // Verify inputs inside selected tools
    for (const tool of selectedToolsState) {
      if (tool.toolId.endsWith("_api")) {
        if (tool.customCost === null || tool.customCost < 0) {
          setFormError(`Please enter a valid monthly spend for ${AI_TOOLS[tool.toolId].name}.`);
          return false;
        }
      } else {
        if (!tool.seats || tool.seats <= 0) {
          setFormError(`Seats count for ${AI_TOOLS[tool.toolId].name} must be at least 1.`);
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePrev = () => {
    setStep(1);
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else {
      if (validateStep2()) {
        onSubmit({
          email,
          teamSize,
          selectedTools: selectedToolsState
        });
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border-slate-800/80 shadow-[0_0_50px_rgba(6,182,212,0.02)]">
      
      {/* Form Stepper indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-10 text-xs font-semibold select-none">
        <div className={`flex items-center space-x-2 transition-all ${step === 1 ? "text-cyan-400" : "text-slate-400"}`}>
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border font-mono ${
            step === 1 ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" : "border-slate-800 text-slate-500"
          }`}>
            1
          </span>
          <span>Team Profile</span>
        </div>
        
        <div className="h-[1px] flex-1 bg-slate-800 mx-4" />
        
        <div className={`flex items-center space-x-2 transition-all ${step === 2 ? "text-cyan-400" : "text-slate-400"}`}>
          <span className={`h-6 w-6 rounded-full flex items-center justify-center border font-mono ${
            step === 2 ? "border-cyan-500 bg-cyan-500/10 text-cyan-400" : "border-slate-800 text-slate-500"
          }`}>
            2
          </span>
          <span>SaaS Stack configuration</span>
        </div>
      </div>

      {formError && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-rose-500/10 border border-rose-500/25 text-rose-400 rounded-xl text-xs font-semibold text-center"
        >
          {formError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: GENERAL METRICS */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-slate-100">
                  Analyze Your Team Size
                </h3>
                <p className="text-xs text-slate-400">
                  We use your team size to identify licensing margins and calculate standard tool benchmarks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Team Size */}
                <div className="space-y-2 bg-slate-950/40 p-5 rounded-2xl border border-slate-900/80">
                  <label className="text-xs uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-cyan-400" />
                    Team Size (Users)
                  </label>
                  <p className="text-[10px] text-slate-500 mb-4">How many people are utilizing AI tools?</p>
                  
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      required
                      value={teamSize}
                      onChange={(e) => setTeamSize(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg py-2 text-center text-sm font-mono text-cyan-400 focus:outline-none"
                    />
                    
                    <input
                      type="range"
                      min="1"
                      max="150"
                      value={teamSize}
                      onChange={(e) => setTeamSize(parseInt(e.target.value))}
                      className="flex-1 accent-cyan-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Contact Email */}
                <div className="space-y-2 bg-slate-950/40 p-5 rounded-2xl border border-slate-900/80">
                  <label className="text-xs uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-cyan-400" />
                    Business Email
                  </label>
                  <p className="text-[10px] text-slate-500 mb-4">Where should we deliver your shareable report?</p>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 focus:border-cyan-500 rounded-lg py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Next navigation trigger */}
              <div className="flex justify-end pt-4 border-t border-slate-900/60">
                <button
                  type="button"
                  onClick={handleNext}
                  className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <span>Select AI Tools</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: STACK MAPPING */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-slate-100">
                  Configure Your Tool Stack
                </h3>
                <p className="text-xs text-slate-400">
                  Select the AI subscriptions and APIs currently used by your team to run the optimizer.
                </p>
              </div>

              {/* Tool Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.values(AI_TOOLS).map(tool => {
                  const isSelected = selectedToolsState.some(t => t.toolId === tool.id);
                  const Icon = ICON_MAP[tool.icon] || Cpu;

                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => handleToolToggle(tool.id)}
                      className={`relative p-4 rounded-xl border text-left flex flex-col items-start space-y-2 transition-all duration-300 select-none cursor-pointer ${
                        isSelected 
                          ? "bg-cyan-500/10 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.1)] text-slate-100" 
                          : "bg-slate-950/40 border-slate-900/80 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                      }`}
                    >
                      {/* Check badge */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 h-4 w-4 bg-cyan-500 rounded-full flex items-center justify-center text-slate-950">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      )}

                      <div className={`p-2 rounded-lg border ${
                        isSelected ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/20" : "bg-slate-900 border-slate-800 text-slate-500"
                      }`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-bold font-display tracking-wide">{tool.name}</h4>
                        <span className="text-[9px] text-slate-500 font-medium block leading-tight">{tool.category}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Configurations for Selected Tools */}
              {selectedToolsState.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-slate-900/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
                    Adjust Licenses & Costs
                  </h4>

                  <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                    {selectedToolsState.map(toolConfig => {
                      const toolMeta = AI_TOOLS[toolConfig.toolId];
                      const Icon = ICON_MAP[toolMeta.icon] || Cpu;

                      return (
                        <motion.div
                          key={toolConfig.toolId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-900/80 bg-slate-950/30"
                        >
                          <div className="flex items-center space-x-3 shrink-0">
                            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="text-xs font-bold block">{toolMeta.name}</span>
                              <span className="text-[10px] text-slate-500">{toolMeta.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 flex-1 justify-end">
                            {/* For API Tiers */}
                            {toolConfig.toolId.endsWith("_api") ? (
                              <div className="flex items-center space-x-2">
                                <label className="text-[10px] text-slate-400 font-bold uppercase">Monthly API Spend:</label>
                                <div className="relative">
                                  <span className="absolute left-3 top-2 text-slate-500 text-xs font-semibold">$</span>
                                  <input
                                    type="number"
                                    min="0"
                                    required
                                    value={toolConfig.customCost}
                                    onChange={(e) => handleToolChange(toolConfig.toolId, "customCost", Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-28 bg-slate-900 border border-slate-800 rounded-lg py-1.5 pl-7 pr-3 text-xs font-mono text-right text-cyan-400 focus:outline-none"
                                  />
                                </div>
                              </div>
                            ) : (
                              /* For Subscription seats */
                              <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center space-x-2">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase">Plan:</label>
                                  <select
                                    value={toolConfig.planId}
                                    onChange={(e) => handleToolChange(toolConfig.toolId, "planId", e.target.value)}
                                    className="bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-3 text-xs text-slate-350 focus:outline-none cursor-pointer"
                                  >
                                    {toolMeta.plans.filter(p => p.id !== "free").map(p => (
                                      <option key={p.id} value={p.id}>
                                        {p.name} (${p.cost}/mo)
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <label className="text-[10px] text-slate-400 font-bold uppercase">Seats:</label>
                                  <input
                                    type="number"
                                    min="1"
                                    required
                                    value={toolConfig.seats}
                                    onChange={(e) => handleToolChange(toolConfig.toolId, "seats", Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 bg-slate-900 border border-slate-800 rounded-lg py-1.5 text-center text-xs font-mono text-cyan-400 focus:outline-none"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Delete item button */}
                            <button
                              type="button"
                              onClick={() => handleToolToggle(toolConfig.toolId)}
                              className="p-1.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500 hover:text-slate-950 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Prev / Submit actions navigation */}
              <div className="flex justify-between pt-6 border-t border-slate-900/60">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="bg-slate-950/60 border border-slate-800 text-slate-300 px-6 py-2.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>General Profile</span>
                </button>

                <button
                  type="submit"
                  className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-lg text-xs font-bold flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Execute Audit</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </form>
    </div>
  );
}
