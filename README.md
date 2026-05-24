# AI Spend Audit Tool 🤖💰

[![Deploy with Vercel](https://vercel.com/button)](ai-spend-audit-tool-zeta.vercel.app)
> **Live Demo**: [[https://ai-spend-audit-tool.vercel.app/](https://ai-spend-audit-tool.vercel.app/)](https://ai-spend-audit-tool-zeta.vercel.app)

A premium, startup-style SaaS platform that helps organizations audit, optimize, and streamline their overspending on AI tool workspaces (like ChatGPT, Claude, GitHub Copilot, Cursor, Gemini Advanced, Windsurf) and developer endpoints (OpenAI API, Anthropic API). Built with React + Vite, Tailwind CSS v4, Framer Motion, and Supabase.

---

## 📚 Repository Documentation Index

We have compiled comprehensive project design, economics, and operational parameters across the following files:

* [ARCHITECTURE.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/ARCHITECTURE.md) - Structural layouts, hook states, database schemas, and data flow.
* [DEVLOG.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/DEVLOG.md) - Chronological log of milestones, commits, and bug resolutions.
* [REFLECTION.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/REFLECTION.md) - Engineering evaluations of React 19, Tailwind v4, and SVG charting.
* [TESTS.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/TESTS.md) - Manual test checklist and validation case studies.
* [PRICING_DATA.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/PRICING_DATA.md) - Tool pricing metrics and cost optimization math.
* [PROMPTS.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/PROMPTS.md) - System logs descriptions and UI style prompts.
* [GTM.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/GTM.md) - Target personas, distribution, and organic viral growth loops.
* [ECONOMICS.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/ECONOMICS.md) - Freemium model, operational overheads, and Pro tiers.
* [USER_INTERVIEWS.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/USER_INTERVIEWS.md) - Case studies and transcripts from initial adopters.
* [LANDING_COPY.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/LANDING_COPY.md) - Sales copy, value propositions, and FAQs.
* [METRICS.md](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/METRICS.md) - Industry overspend averages and platform KPIs.

---

## 🚀 Key Features

* **Multi-Step Audit Profiling**: Collects team metrics and structures tool configurations (seats, license plans, custom API spends) within a gorgeous glassmorphic stepper.
* **Audit Calculation Engine**: Matches subscription items against seat minimums, scans IDE duplicate seats (e.g. Cursor & GitHub Copilot active side-by-side), and checks API token caching/model downgrade suggestions.
* **Interactive SVG Charts**: Responsive comparison charts visualizing Monthly Unoptimized vs. Optimized spends and 12-Month Cumulative savings.
* **Actionable AI-Generated Insights**: Categorized cards (High/Medium/Low Impact) with clear instructions (e.g. "Downgrade Team workspace seats to individual Pro keys").
* **Supabase Integration & Offline Fallback**: Saves audit reports to a PostgreSQL database with a shareable read-only public URL, while falling back gracefully to LocalStorage for out-of-the-box operations.
* **Premium Futuristic UI**: Styled in a dark neon glassmorphic palette using Orbitron typography, floating gradient drift animations, custom loaders, and micro-interactions.

---

## 🛠️ Technology Stack

1. **Frontend**: React 19 + Vite (Fast HMR)
2. **Styling**: Tailwind CSS v4 (native `@import` in CSS layer, theme configurations in `@theme` layer)
3. **Animations**: Framer Motion
4. **Icons**: Lucide React Icons
5. **Database**: Supabase JS Client (Postgres)
6. **Router**: React Router DOM (wraps pages with `<AnimatePresence>` transitions)

---

## 📁 Folder Structure

```text
├── ARCHITECTURE.md
├── DEVLOG.md
├── REFLECTION.md
├── TESTS.md
├── PRICING_DATA.md
├── PROMPTS.md
├── GTM.md
├── ECONOMICS.md
├── USER_INTERVIEWS.md
├── LANDING_COPY.md
├── METRICS.md
├── README.md
├── package.json
├── vite.config.js
├── index.html
├── src/
│   ├── assets/        # Visual icons and SVG static images
│   ├── components/    # Reusable UI widgets (Navbar, Footer, SavingsChart, SpendForm, ResultCard)
│   ├── data/          # Pricing dataset metadata (ChatGPT, Claude, Cursor, API rates)
│   ├── hooks/         # Custom state orchestration hook (useAudit)
│   ├── layouts/       # Global template outlet page layout wrappers
│   ├── pages/         # Main app routing pages (Landing, Audit Form, Dashboard, Public Share Page, 404)
│   ├── router/        # AppRouter setup with Framer Motion page switch transitions
│   ├── services/      # Integrations: audit calculation engine and Supabase client fallbacks
│   └── styles/        # Global index.css loading Tailwind CSS v4 and glass-panel rules
```

---

## ⚙️ Installation & Local Development

### 1. Clone & Set Up Directory
Run npm install to pull down all dependencies:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase variables. If you leave these values empty, the application will run in **LocalStorage Fallback Mode**, allowing you to test the calculators instantly.

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## ⚡ Database Setup (Supabase SQL)

To enable live report saving and public URL sharing, create a table named `audits` in your Supabase SQL Editor. Copy and run the query below:

```sql
-- Create Audits table
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

-- Enable Row Level Security (RLS)
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read audit reports by ID (for sharing public report links)
CREATE POLICY "Enable read access for all users" ON audits
  FOR SELECT USING (true);

-- Allow anyone to create audit reports (from form submission)
CREATE POLICY "Enable insert access for all users" ON audits
  FOR INSERT WITH CHECK (true);
```

---

## ✉️ Email Dispatcher Setup (EmailJS)

To receive real cost audit confirmation emails on your phone or Gmail inbox instantly, follow these steps to configure EmailJS:

1. **Sign Up**: Create a free account at [https://www.emailjs.com](https://www.emailjs.com).
2. **Add Email Service**: Connect your Gmail account inside EmailJS. Copy the **Service ID**.
3. **Create Email Template**: Create a new template and set the **Subject** and **Content**. The template must map our state parameters:
   * `{{to_email}}`: recipient email address.
   * `{{yearly_savings}}`: calculated annual budget savings.
   * `{{report_link}}`: secure public shareable audit URL.
   * *Example template layout*:
     ```text
     Hello! Your AI Spend Audit report is ready.
     We found {{yearly_savings}} in potential annual savings.
     View the report details here: {{report_link}}
     ```
4. **Copy credentials**: Copy your **Service ID**, **Template ID**, and **Public Key** (from Account > API Keys).
5. **Update `.env`**: Add them directly to your local `.env` file:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

---

## 🚀 Deployment Instructions

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the root directory.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables in your Vercel Dashboard if using a live database.

### Deploy to Netlify
1. Run `npm run build` to generate the production build in the `dist/` folder.
2. Drag and drop the `dist/` folder into Netlify, or link your GitHub repository.
3. Configure Redirects for Single Page Apps (SPA) by creating a `_redirects` file in the `public` folder containing: `/* /index.html 200`.
