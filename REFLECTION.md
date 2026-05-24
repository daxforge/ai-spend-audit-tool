# Architectural Reflection - AI Spend Audit Tool

Technical reflection on the engineering choices, challenges, and future development roads for the Spend Audit application.

---

## 🧐 Technology Stack Evaluation

### 1. React 19 + Vite
* **Pros**: Lightning-fast Hot Module Replacement (HMR). Using Vite drastically improves page reload speeds during styling audits. React 19 provides standard state management without needing external Redux/Zustand structures for a medium SaaS calculator.
* **Cons**: React 19 occasionally triggers warnings for third-party libraries designed for React 18. We avoided this by building custom integrations.

### 2. Tailwind CSS v4 + @tailwindcss/vite
* **Pros**: Extremely fast compile times. Theme setup is simplified by declaring custom styling presets inside [index.css](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/styles/index.css) instead of maintaining a bulky `tailwind.config.js`.
* **Cons**: The syntax change for some v4 configurations (like using `@theme` instead of `theme.extend` inside config files) can require slight adjustment.

### 3. Custom SVG Charting
* **Decision**: We chose to implement a pure SVG chart in [SavingsChart.jsx](file:///Users/daksh/Documents/GSSOC_OPEN%20SOURCE/Credex%20Task/src/components/SavingsChart.jsx) rather than loading libraries like Recharts or Chart.js.
* **Result**: This cut bundle sizes by over 120KB, bypassed React 19 package version conflicts, and gave us full control over glassmorphism styling, hover state tooltips, and cumulative gradient curves.

---

## 🔌 Database Fallback Strategy

* **Approach**: The app attempts to initialize Supabase. If credentials are missing, it falls back to LocalStorage.
* **Benefit**: This guarantees that the project compiles and runs immediately in dev/production environments without crashing, while still allowing teams to easily connect their databases when ready.

---

## 📈 Future Feature Roadmap

1. **Workspace Directory API Integrations**: Automate the audit process by letting IT administrators upload CSV files or connect OKTA / Google Workspace APIs to fetch active user sheets automatically.
2. **Subscription Invoice Scanning (OCR)**: Let users upload PDF invoices from OpenAI or Claude. Parse the PDF using an AI model to extract seats and usage costs automatically.
3. **Automated Team Slack Alert Integrations**: Send Slack alerts when someone expenses a duplicate IDE seat (such as subscribing to Cursor while already possessing a GitHub Copilot license).
