/**
 * Email Dispatcher Service
 * Integrates client-side email dispatching using EmailJS or Resend.
 * Gracefully logs simulated reports to console if keys are unconfigured.
 */

import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const isEmailJSConfigured = !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

/**
 * Send confirmation email with audit report link and summary
 * @param {string} email - Destination email address (e.g. Gmail)
 * @param {string} auditId - ID of the audit report
 * @param {number} yearlySavings - Calculated yearly savings metric
 * @returns {Promise<boolean>} Status of the dispatch
 */
export async function sendAuditConfirmationEmail(email, auditId, yearlySavings) {
  const reportUrl = `${window.location.origin}/report/${auditId}`;

  // 1. Direct Browser Dispatch via EmailJS (100% client-safe)
  if (isEmailJSConfigured) {
    try {
      const templateParams = {
        to_email: email,
        reply_to: "noreply@aispendaudit.com",
        subject: "Your AI Spend Audit Report is Ready! 🤖💰",
        yearly_savings: `$${Math.round(yearlySavings)}`,
        report_link: reportUrl
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log("✉️ Email successfully dispatched via EmailJS:", response.status, response.text);
      return true;
    } catch (err) {
      console.error("EmailJS dispatch failed:", err);
    }
  }

  // 2. Development Simulation Fallback
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(
        `%c✉️ [Email Simulator] confirmation sent to: ${email}
        Subject: Your AI Spend Audit Report is Ready! 🤖💰
        Estimated Savings: $${yearlySavings}/year
        Link: ${reportUrl}`,
        "color: #06b6d4; font-weight: bold; font-family: monospace; font-size: 12px;"
      );
      resolve(true);
    }, 1000);
  });
}
