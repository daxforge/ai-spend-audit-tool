import React from "react";
import { useNavigate } from "react-router-dom";
import { useAudit } from "../hooks/useAudit";
import SpendForm from "../components/SpendForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { ShieldAlert, HelpCircle } from "lucide-react";

export default function AuditFormPage() {
  const navigate = useNavigate();
  const { loading, error, submitAuditForm } = useAudit();

  const handleFormSubmit = async (formData) => {
    try {
      // Form contains email, teamSize, and selectedTools list
      const savedReport = await submitAuditForm(formData.email, formData.teamSize);
      if (savedReport && savedReport.id) {
        // Redirect to dashboard page
        navigate(`/dashboard/${savedReport.id}`);
      }
    } catch (err) {
      console.error("Audit submission failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-8">
      {/* Intro Header */}
      <div className="text-center space-y-3">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl tracking-wide uppercase text-slate-100">
          AI Spend <span className="text-cyan-400">Optimizer</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Input your licensing metrics below to run audits for seat overlaps, unused limits, and developer endpoint configurations.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-450 rounded-xl text-xs flex items-center space-x-2.5 max-w-md mx-auto">
          <ShieldAlert className="h-5 w-5 text-rose-450 shrink-0" />
          <span>Error running audit: {error}. Please try again.</span>
        </div>
      )}

      {/* Audit form component */}
      <SpendForm onSubmit={handleFormSubmit} />

      {/* Safety info footer */}
      <div className="flex items-start space-x-2.5 max-w-lg mx-auto p-4 rounded-xl border border-slate-900 bg-slate-950/40 text-[11px] text-slate-500 leading-relaxed select-none">
        <HelpCircle className="h-4.5 w-4.5 text-slate-500 shrink-0 mt-0.5" />
        <span>
          <strong>Data Privacy Safeguard</strong>: All computed results and emails are processed inside your browser workspace. Standard encryption keys are used when communicating with our secure Supabase endpoint. If database keys are missing, audits remain stored in local browser state.
        </span>
      </div>
    </div>
  );
}
