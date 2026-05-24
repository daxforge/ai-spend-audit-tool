import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are set
const isConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

console.log(
  isConfigured 
    ? "⚡ Supabase initialized successfully." 
    : "🔌 Supabase keys missing. Running in LocalStorage fallback mode."
);

/**
 * Save audit data. If Supabase is unconfigured, stores in localStorage.
 * @param {Object} auditData - Full object outputted from auditEngine + input info
 * @returns {Promise<Object>} Saved audit record with ID
 */
export async function saveAudit(auditData) {
  const auditRecord = {
    ...auditData,
    id: auditData.id || crypto.randomUUID(),
    created_at: new Date().toISOString()
  };

  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("audits")
        .insert([auditRecord])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn("Supabase insert failed, falling back to LocalStorage:", err.message);
    }
  }

  // Fallback to LocalStorage
  try {
    const existingRaw = localStorage.getItem("ai_spend_audits") || "[]";
    const existing = JSON.parse(existingRaw);
    existing.push(auditRecord);
    localStorage.setItem("ai_spend_audits", JSON.stringify(existing));
    return auditRecord;
  } catch (err) {
    console.error("LocalStorage write failed:", err);
    return auditRecord;
  }
}

/**
 * Retrieve audit by ID. Checks Supabase or LocalStorage.
 * @param {string} id - UUID of the audit
 * @returns {Promise<Object|null>} The audit record or null
 */
export async function getAudit(id) {
  if (isConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) {
        // If not found in database, check local storage before failing
        if (error.code === "PGRST116") {
          console.log("Not found in Supabase, checking local storage...");
        } else {
          throw error;
        }
      } else {
        return data;
      }
    } catch (err) {
      console.warn("Supabase read failed, checking LocalStorage:", err.message);
    }
  }

  // Fallback to LocalStorage
  try {
    const existingRaw = localStorage.getItem("ai_spend_audits") || "[]";
    const existing = JSON.parse(existingRaw);
    const found = existing.find(audit => audit.id === id);
    return found || null;
  } catch (err) {
    console.error("LocalStorage read failed:", err);
    return null;
  }
}

/*
=========================================
SUPABASE DATABASE SCHEMA (SQL CODE)
=========================================
Copy and paste this into your Supabase SQL Editor to create the required table:

CREATE TABLE audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  email TEXT NOT NULL,
  team_size INTEGER NOT NULL,
  total_current_spend INTEGER NOT NULL,
  total_optimized_spend INTEGER NOT NULL,
  monthly_savings INTEGER NOT NULL,
  yearly_savings INTEGER NOT NULL,
  optimization_score INTEGER NOT NULL,
  breakdown JSONB NOT NULL,
  recommendations JSONB NOT NULL
);

-- Enable public read and write access (or adjust for authentication policy RLS as needed)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON audits
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON audits
  FOR INSERT WITH CHECK (true);
*/
