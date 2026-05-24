# Prompt Catalog - AI Spend Audit Tool

This document catalogs the prompt structures, system logs descriptions, and styling requests used to design the AI Spend Audit platform.

---

## 🎨 UI & Aesthetics Prompt Design

To create the dark futuristic glassmorphism theme, the following style prompts were translated into the [index.css](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/styles/index.css) file:

```text
"Create a futuristic, dark SaaS theme matching security console aesthetics:
- Primary background: deep slate (#020617) with glowing mesh gradients of cyan, fuchsia, and blue.
- Cards: glassmorphism panels (rgba(15, 23, 42, 0.45) with blur filters and thin 1px white border outlines at 8% opacity).
- Accents: neon cyan (#06b6d4), fuchsia (#d946ef), and emerald (#10b981) glowing outlines and text shadow values.
- Typography: Orbitron for high-tech display numbers/titles and Inter for readability."
```

---

## 🤖 Calculation Engine Optimization Scenarios

The engine logic inside [auditEngine.js](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/services/auditEngine.js) is built around three core prompts:

1. **Redundancy Analysis Prompt**:
   *"If a team has both Cursor AI and GitHub Copilot enabled, calculate the overlapping seat sizes and recommend canceling GitHub Copilot for those users."*
2. **Quota Minimum Analysis Prompt**:
   *"If a team is on Claude Team or ChatGPT Team but possesses fewer members than the required plan minimum, calculate the cost of downsizing to individual Pro licenses."*
3. **API Streamlining Prompt**:
   *"If a team uses the OpenAI or Anthropic developer APIs, recommend migrating background tasks to cheaper mini models (GPT-4o-mini / Sonnet 3.5) and setting up prompt caches."*

---

## ✉️ Email Dispatch Templates

The HTML template used inside [email.js](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/services/email.js) was configured around:

```text
Subject: Your AI Spend Audit Report is Ready! 🤖💰
Body:
- Acknowledge their team size and details.
- Display a highlighted green panel detailing: "Potential Savings Identified: {{yearly_savings}} / year".
- Provide a clear, glowing call-to-action button pointing to: "{{report_link}}".
```
