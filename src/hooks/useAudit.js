import { useState, useEffect } from "react";
import { runAudit } from "../services/auditEngine";
import { saveAudit, getAudit } from "../services/supabase";
import { sendAuditConfirmationEmail } from "../services/email";

const LOCAL_STORAGE_KEY = "ai_spend_audit_current_form";

export function useAudit() {
  const [selectedTools, setSelectedTools] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [teamSize, setTeamSize] = useState(5);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Sync current form state with local storage for persistence on page refreshes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedTools));
  }, [selectedTools]);

  const addTool = (toolId, planId, seats = 1, customCost = 0) => {
    setSelectedTools(prev => {
      const existingIdx = prev.findIndex(t => t.toolId === toolId);
      const newTool = { toolId, planId, seats: Number(seats), customCost: Number(customCost) };
      
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = newTool;
        return updated;
      } else {
        return [...prev, newTool];
      }
    });
  };

  const removeTool = (toolId) => {
    setSelectedTools(prev => prev.filter(t => t.toolId !== toolId));
  };

  const clearForm = () => {
    setSelectedTools([]);
    setTeamSize(5);
    setEmail("");
    setResult(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const calculateLiveSavings = () => {
    return runAudit(selectedTools, teamSize);
  };

  const submitAuditForm = async (userEmail, userTeamSize) => {
    setLoading(true);
    setError(null);
    try {
      const currentEmail = userEmail || email;
      const currentTeamSize = Number(userTeamSize) || teamSize;

      const auditData = runAudit(selectedTools, currentTeamSize);
      const payload = {
        ...auditData,
        email: currentEmail
      };

      // Save to Supabase (with LocalStorage fallback)
      const savedRecord = await saveAudit(payload);
      
      // Dispatch email confirmation in background
      try {
        await sendAuditConfirmationEmail(
          currentEmail, 
          savedRecord.id, 
          savedRecord.yearlySavings || savedRecord.yearly_savings || 0
        );
      } catch (emailErr) {
        console.warn("Confirmation email dispatch failed:", emailErr.message);
      }

      setResult(savedRecord);
      return savedRecord;
    } catch (err) {
      setError(err.message || "An error occurred while running the audit.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadAuditReport = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const record = await getAudit(id);
      if (!record) {
        throw new Error("Audit report not found.");
      }
      setResult(record);
      // Optional: reconstruct form fields if the user wants to re-edit
      if (record.breakdown) {
        const reconstructed = record.breakdown.map(b => ({
          toolId: b.toolId,
          planId: b.toolId.endsWith("_api") ? "payg" : (b.planName ? b.planName.toLowerCase().replace(/ /g, "_") : "free"),
          seats: b.seats || 1,
          customCost: b.currentCost
        }));
        setSelectedTools(reconstructed);
      }
      if (record.team_size) setTeamSize(record.team_size);
      if (record.email) setEmail(record.email);
      return record;
    } catch (err) {
      setError(err.message || "Failed to load audit report.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedTools,
    teamSize,
    email,
    loading,
    error,
    result,
    setSelectedTools,
    setTeamSize,
    setEmail,
    addTool,
    removeTool,
    clearForm,
    calculateLiveSavings,
    submitAuditForm,
    loadAuditReport
  };
}
