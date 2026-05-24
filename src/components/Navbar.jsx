import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Cpu, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-x-0 border-t-0 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 group-hover:border-cyan-500/60 group-hover:bg-cyan-500/20 transition-all duration-300">
              <Cpu className="h-5 w-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-slate-100 group-hover:text-glow-cyan transition-all duration-300">
              AI SPEND <span className="text-cyan-400">AUDIT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick("features")} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button 
              onClick={() => handleNavClick("pricing-dataset")} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Supported Tools
            </button>
            <button 
              onClick={() => handleNavClick("cta")} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Why Audit?
            </button>
            
            <Link to="/audit">
              <button className="glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm flex items-center space-x-1.5 transition-all duration-300 cursor-pointer">
                <span>Start Free Audit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-panel border-x-0 border-b border-t-0 bg-slate-950/95"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 flex flex-col items-stretch">
              <button
                onClick={() => handleNavClick("features")}
                className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 transition-all"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick("pricing-dataset")}
                className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 transition-all"
              >
                Supported Tools
              </button>
              <button
                onClick={() => handleNavClick("cta")}
                className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/60 transition-all"
              >
                Why Audit?
              </button>
              <div className="pt-4 px-3">
                <Link to="/audit" onClick={() => setIsOpen(false)}>
                  <button className="w-full glow-btn-cyan bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold py-3 rounded-lg text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer">
                    <span>Start Free Audit</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
