import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Cpu, Mail, Send, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full glass-panel border-x-0 border-b-0 border-t border-slate-800/80 bg-slate-950/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                <Cpu className="h-4.5 w-4.5 text-cyan-400" />
              </div>
              <span className="font-display font-bold text-sm tracking-wider text-slate-100">
                AI SPEND <span className="text-cyan-400">AUDIT</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Helping modern startups and dev teams scan license redundancies, eliminate seat waste, and cut AI subscriptions costs by up to 40% with zero friction.
            </p>
            <div className="text-[10px] text-slate-500 font-mono">
              v1.0.2 • Powered by Gemini & Supabase
            </div>
          </div>

          {/* Supported Tools List */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-semibold text-slate-200 tracking-wider">
              AUDITED SaaS
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>ChatGPT Plus & Team</li>
              <li>Claude Pro & Workspace</li>
              <li>Cursor AI & Windsurf IDE</li>
              <li>GitHub Copilot Seats</li>
              <li>Google Gemini Advanced</li>
            </ul>
          </div>

          {/* API Cost Audits */}
          <div className="space-y-3">
            <h4 className="text-sm font-display font-semibold text-slate-200 tracking-wider">
              API AUDITS
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>OpenAI GPT-4o Tiers</li>
              <li>Anthropic Sonnet Tiers</li>
              <li>Opus Transition Models</li>
              <li>Semantic Cache Triggers</li>
              <li>Spend Invoicing Caps</li>
            </ul>
          </div>

          {/* Lead Capture form */}
          <div className="space-y-4">
            <h4 className="text-sm font-display font-semibold text-slate-200 tracking-wider">
              PRICING UPDATES
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe to get notified whenever OpenAI, Anthropic, or IDE tools change their pricing models.
            </p>
            
            {subscribed ? (
              <div className="flex items-center space-x-2 text-emerald-400 text-xs py-2 bg-emerald-500/10 px-3 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Subscription successful! Stay tuned.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyan-500/60 rounded-lg py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
                  />
                </div>
                <button 
                  type="submit" 
                  className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-3 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        <div className="border-t border-slate-900/80 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AI Spend Audit. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Security Practices</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
