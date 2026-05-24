# Development Log - AI Spend Audit Tool

Chronological log of changes, features added, issues solved, and design choices made during development.

---

## 🛠️ Step-by-Step Milestones

### Milestone 1: Initial Scaffolding & Setup
* Scaffolded a new React SPA project using Vite CLI.
* Installed production dependencies: `react-router-dom`, `framer-motion`, `lucide-react`, `@supabase/supabase-js`, `tailwindcss`, and `@tailwindcss/vite`.
* Checked Vite configurations to verify the Tailwind CSS v4 compiler plugin was mapped correctly.

### Milestone 2: Design Language & Themes
* Configured [index.html](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/index.html) to fetch Orbitron (futuristic displays/numbers) and Inter (clean body text) Google Fonts.
* Replaced [index.css](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/styles/index.css) to import Tailwind and define custom `@theme` variables for neon cyan/purple pulsing blobs and glassmorphic cards.
* Cleaned out default Vite stylesheets to avoid layout overlaps.

### Milestone 3: Audit Engine Logic
* Drafted [pricingData.js](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/data/pricingData.js) mapping pricing schedules for ChatGPT, Claude, Copilot, Cursor, Gemini Advanced, Windsurf, OpenAI API, and Anthropic API.
* Implemented [auditEngine.js](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/services/auditEngine.js) containing cost aggregation functions, seat volume limits, IDE duplicates, and API optimization calculations.
* Coded [supabase.js](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/services/supabase.js) setting up fallback LocalStorage storage logic.

### Milestone 4: Steppers & SVG Charts
* Coded [SpendForm.jsx](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/components/SpendForm.jsx) as a two-stage input form using local state.
* Built [SavingsChart.jsx](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/components/SavingsChart.jsx) using custom SVGs to bypass heavy charts dependencies, rendering bar cost comparisons and line savings projections.

### Milestone 5: Page Routing & Route Transitions
* Coded page containers: Landing, Audit Form, Results, Public Shared reports, and 404 terminal logs.
* Setup [AppRouter.jsx](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/router/AppRouter.jsx) with `<AnimatePresence>` to slide pages during transitions.

### Milestone 6: Bug Fix - LandingPage ReferenceError
* **Symptom**: Localhost render showed a blank dark screen.
* **Root Cause**: Vite console reported `ReferenceError: INDU_AVGS is not defined` inside `src/pages/LandingPage.jsx:94`.
* **Fix**: Replaced references to `INDU_AVGS` with the correct imported object name `INDUSTRY_AVGS` (lines 94, 98, 102). HMR reloaded the module and resolved the blank screen.

### Milestone 7: Email Confirmation Integration
* Installed `@emailjs/browser` library.
* Created [email.js](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/services/email.js) to trigger browser-side email dispatching.
* Updated [useAudit.js](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/hooks/useAudit.js) to dispatch email confirmations after saves.
* Integrated email notification banner in [ResultsDashboard.jsx](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/pages/ResultsDashboard.jsx).
