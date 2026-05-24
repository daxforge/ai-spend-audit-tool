# AI Pricing Dataset - AI Spend Audit Tool

Pricing tiers, specifications, and optimization rules mapped in the application database.

---

## 💻 Developer Assistants & IDEs

| Tool Name | Plan | Monthly Cost (per seat) | Minimum Seat Requirement | Key Features |
| :--- | :--- | :--- | :--- | :--- |
| **ChatGPT** | Plus | $20 | None | General Assistant |
| | Team | $30 | 2 seats | Shared workspace |
| | Enterprise | $60 | 20 seats | Dedicated admin security |
| **Claude Pro** | Pro | $20 | None | General Assistant / Coding |
| | Team | $30 | 5 seats | Shared workspace |
| **GitHub Copilot** | Individual | $10 | None | IDE Autocomplete |
| | Business | $19 | None | Team admin control |
| | Enterprise | $39 | None | Fine-tuned models |
| **Cursor AI** | Pro | $20 | None | AI IDE Editor |
| | Business | $40 | None | Admin control |
| **Gemini Advanced**| Advanced | $20 | None | Google One storage |
| | Business | $20 | None | Workspace admin |
| | Enterprise | $30 | None | Workspace enterprise |
| **Windsurf** | Pro | $15 | None | AI IDE editor |
| | Team | $30 | None | Team editor workspace |

---

## 🔌 API Token Cost Models

### 1. OpenAI API Tiers
* **GPT-4o**: $2.50 / Million input tokens, $10.00 / Million output tokens.
* **GPT-4o-mini**: $0.150 / Million input tokens, $0.600 / Million output tokens.
* *Optimization Math*: Migrating secondary background tasks (e.g. classification, text parsing) to GPT-4o-mini cuts costs by **90%+**.

### 2. Anthropic API Tiers
* **Claude 3 Opus**: $15.00 / Million input tokens, $75.00 / Million output tokens.
* **Claude 3.5 Sonnet**: $3.00 / Million input tokens, $15.00 / Million output tokens.
* *Optimization Math*: Swapping from Opus to Sonnet cuts costs by **80%** while yielding better benchmarks.

---

## ⚙️ Overlap Optimization Formulas

### 1. Copilot + Cursor Redundancy
* If the user selects both `copilot` and `cursor`:
  $$\text{Waste} = \min(\text{copilot\_seats}, \text{cursor\_seats}) \times \text{copilot\_cost}$$

### 2. Claude Team Seat Waste
* If `claude_seats` < 5 on a `team` plan:
  $$\text{Waste} = (5 \times 30) - (\text{claude\_seats} \times 20)$$
  *(This is because Claude Team bills for 5 seats minimum ($150), whereas individual Pro accounts cost $20 each).*
