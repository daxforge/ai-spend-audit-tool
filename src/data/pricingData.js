/**
 * AI Tool Pricing Dataset
 * Contains pricing tiers, specifications, and optimization logic metadata.
 */

export const AI_TOOLS = {
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "MessageSquare",
    category: "General Assistant",
    plans: [
      { id: "free", name: "Free Tier", cost: 0, billing: "monthly" },
      { id: "plus", name: "Plus", cost: 20, billing: "monthly" },
      { id: "team", name: "Team", cost: 30, billing: "monthly", minSeats: 2 },
      { id: "enterprise", name: "Enterprise", cost: 60, billing: "monthly", minSeats: 20 }
    ],
    optimizations: [
      {
        condition: "team_has_redundancies",
        title: "Consolidate to Claude Team or Single Workspace",
        description: "If your team uses both Claude and ChatGPT, standardize on a single tool. Consolidation can save $20–$30/seat monthly.",
        potentialSavingsPercent: 50
      },
      {
        condition: "light_users",
        title: "Downsize Light Users to Free Tier or API Pay-as-you-go",
        description: "Staff using ChatGPT fewer than 5 times a day do not need Plus accounts. Move them to the Free tier or a lightweight shared API UI.",
        potentialSavingsPercent: 100
      }
    ]
  },
  claude: {
    id: "claude",
    name: "Claude Pro / Team",
    icon: "BrainCircuit",
    category: "General Assistant & Coding",
    plans: [
      { id: "free", name: "Free Tier", cost: 0, billing: "monthly" },
      { id: "pro", name: "Pro", cost: 20, billing: "monthly" },
      { id: "team", name: "Team", cost: 30, billing: "monthly", minSeats: 5 }
    ],
    optimizations: [
      {
        condition: "small_team_seat_waste",
        title: "Optimize Claude Team Seat Count",
        description: "Claude Team requires a minimum of 5 seats ($150/mo). If you have fewer than 5 users, buy individual Pro licenses instead to save up to $60/mo.",
        potentialSavingsPercent: 40
      }
    ]
  },
  copilot: {
    id: "copilot",
    name: "GitHub Copilot",
    icon: "Code",
    category: "Inline Code Completion",
    plans: [
      { id: "individual", name: "Individual", cost: 10, billing: "monthly" },
      { id: "business", name: "Business", cost: 19, billing: "monthly" },
      { id: "enterprise", name: "Enterprise", cost: 39, billing: "monthly" }
    ],
    optimizations: [
      {
        condition: "using_cursor_and_copilot",
        title: "Remove Redundant GitHub Copilot Seats",
        description: "Developers using Cursor AI do not need a GitHub Copilot subscription, since Cursor includes its own built-in high-performance autocomplete. Cancel Copilot to save $10–$39/mo per seat.",
        potentialSavingsPercent: 100
      }
    ]
  },
  cursor: {
    id: "cursor",
    name: "Cursor AI",
    icon: "Terminal",
    category: "AI Code Editor",
    plans: [
      { id: "free", name: "Hobby (Free)", cost: 0, billing: "monthly" },
      { id: "pro", name: "Pro", cost: 20, billing: "monthly" },
      { id: "business", name: "Business", cost: 40, billing: "monthly" }
    ],
    optimizations: [
      {
        condition: "bring_your_own_key",
        title: "Configure API Keys (BYOK) for Peak Savings",
        description: "For highly variable/heavy coding cycles, you can switch developers to Cursor Hobby and plug in a company OpenAI/Anthropic API key. This helps avoid fixed monthly Pro charges for developers with periodic usage.",
        potentialSavingsPercent: 60
      }
    ]
  },
  gemini: {
    id: "gemini",
    name: "Gemini Advanced",
    icon: "Sparkles",
    category: "Google Ecosystem & Assistant",
    plans: [
      { id: "advanced", name: "Advanced (Google One)", cost: 20, billing: "monthly" },
      { id: "business", name: "Gemini Business (Workspace)", cost: 20, billing: "monthly" },
      { id: "enterprise", name: "Gemini Enterprise (Workspace)", cost: 30, billing: "monthly" }
    ],
    optimizations: [
      {
        condition: "workspace_add_on",
        title: "Upgrade via Google Workspace Workspace Add-on",
        description: "Do not let employee expense personal Google One accounts ($20/mo). Consolidate them via Workspace Business Add-on to keep admin control, enterprise security, and audit trailing at identical costs.",
        potentialSavingsPercent: 0 // Compliance & security focus
      }
    ]
  },
  windsurf: {
    id: "windsurf",
    name: "Windsurf",
    icon: "Cpu",
    category: "AI IDE",
    plans: [
      { id: "free", name: "Free Tier", cost: 0, billing: "monthly" },
      { id: "pro", name: "Pro", cost: 15, billing: "monthly" },
      { id: "team", name: "Team", cost: 30, billing: "monthly" }
    ],
    optimizations: [
      {
        condition: "duplicate_ide_subscriptions",
        title: "Standardize AI Coding Editors",
        description: "Developers subscribing to both Cursor and Windsurf cost your team $35–$70/mo. Standardize on one IDE across the engineering team.",
        potentialSavingsPercent: 50
      }
    ]
  },
  openai_api: {
    id: "openai_api",
    name: "OpenAI API",
    icon: "Layers",
    category: "Developer API",
    plans: [
      { id: "payg", name: "Pay-As-You-Go / Tiered", cost: 1, billing: "usage" }
    ],
    optimizations: [
      {
        condition: "high_api_spend",
        title: "Transition to GPT-4o-mini and Semantic Cache",
        description: "Transition secondary calls (classification, routing, summary) from GPT-4o to GPT-4o-mini to reduce API bills by up to 90%. Implement Redis or cloud caching for identical queries.",
        potentialSavingsPercent: 65
      },
      {
        condition: "no_rate_limits",
        title: "Enforce Budgets and Alert Policies",
        description: "Set hard monthly spend limits in the OpenAI developer console to prevent runaway loops or unauthorized scraper costs from spiking your bill.",
        potentialSavingsPercent: 15
      }
    ]
  },
  anthropic_api: {
    id: "anthropic_api",
    name: "Anthropic API",
    icon: "Network",
    category: "Developer API",
    plans: [
      { id: "payg", name: "Pay-As-You-Go / Tiered", cost: 1, billing: "usage" }
    ],
    optimizations: [
      {
        condition: "opus_overspend",
        title: "Replace Claude 3 Opus with Claude 3.5 Sonnet",
        description: "Claude 3.5 Sonnet is smarter, faster, and 5x cheaper than Claude 3 Opus ($3.00/MTok vs $15.00/MTok input). Switch all developer scripts from Opus to Sonnet for massive performance and budget gains.",
        potentialSavingsPercent: 80
      },
      {
        condition: "prompt_caching",
        title: "Enable Prompt Caching",
        description: "Anthropic supports prompt caching for long system prompts and context. Enabling caching cuts costs for repeated large-context requests by up to 90%.",
        potentialSavingsPercent: 50
      }
    ]
  }
};

export const INDUSTRY_AVGS = {
  averageOverspendPercent: 34,
  duplicateLicenseRate: 18,
  inactiveSeatRate: 22,
  apiEfficiencyRate: 40
};
