# Testing & Verification Plan - AI Spend Audit Tool

This document outlines the testing checklists and manual cases used to verify the audit calculations, styling layouts, database saves, and email dispatch features.

---

## 🧪 Calculation Verification Checklist

### Case 1: IDE License Overlap Mappings
* **Input Config**:
  * GitHub Copilot: 5 Business seats ($19/mo per seat = $95/mo)
  * Cursor AI: 5 Pro seats ($20/mo per seat = $100/mo)
* **Expected Result**:
  * The engine should detect that all 5 GitHub Copilot seats are redundant because the developers also use Cursor.
  * **Monthly Savings**: $95/mo.
  * **Yearly Savings**: $1,140/yr.
  * **Action Card**: "Cancel redundant GitHub Copilot licenses for 5 engineers using Cursor IDE."

### Case 2: Claude Team Minimum Seats Warning
* **Input Config**:
  * Claude: 3 Team seats ($30/mo per seat, but 5 seats minimum = $150/mo)
* **Expected Result**:
  * The engine should detect that the team size (3) is below the minimum (5).
  * **Optimized Cost**: 3 Pro seats * $20/mo = $60/mo.
  * **Monthly Savings**: $150 - $60 = $90/mo.
  * **Action Card**: "Downsize Claude Team to Pro Licenses."

### Case 3: API Volume Tuning
* **Input Config**:
  * OpenAI API: $500 monthly spend
  * Anthropic API: $300 monthly spend
* **Expected Result**:
  * **OpenAI API Optimization**: Saves $200/mo (40% savings) by suggesting a transition to GPT-4o-mini and semantic caching.
  * **Anthropic API Optimization**: Saves $150/mo (50% savings) by suggesting a switch from Claude Opus to Claude 3.5 Sonnet and prompt caching.

---

## 🎨 Layout & Interaction Checks

* [ ] **Responsive Navigation**: Drag viewport down to mobile width (<768px). Confirm the navbar hamburger icon toggles the menu drawer cleanly.
* [ ] **Form Validation**: Try submitting Step 1 with a blank email or invalid format. Verify the rose alert banner pops up.
* [ ] **Live Math Sync**: In Step 2 of the form, toggle tools on and off and verify the live list updates immediately.
* [ ] **Chart Tooltips**: In the Results Dashboard, hover over the months on both the "Monthly Cost Comparison" and "Cumulative Savings" tabs. Verify the floating tooltip displays exact prices.
* [ ] **Copy to Clipboard**: Click the "Share Audit Report" button. Verify the green check icon appears and the custom toast notification fades in at the top of the viewport.
