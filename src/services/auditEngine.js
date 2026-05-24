import { AI_TOOLS } from "../data/pricingData";

/**
 * Perform AI Spend Audit calculations
 * @param {Array} selectedTools - List of tools with plans, seats, and custom costs
 * @param {number} teamSize - Total size of the company/team
 * @returns {Object} Audit results including metrics and recommendations
 */
export function runAudit(selectedTools, teamSize) {
  let totalCurrentSpend = 0;
  let totalOptimizedSpend = 0;
  const recommendations = [];
  const breakdown = [];

  // Index selected tools by ID for overlap detection
  const toolMap = {};
  selectedTools.forEach(t => {
    toolMap[t.toolId] = t;
  });

  // 1. Process individual tools and find standard optimization opportunities
  selectedTools.forEach(toolInput => {
    const toolMeta = AI_TOOLS[toolInput.toolId];
    if (!toolMeta) return;

    let currentCost = 0;
    let optimizedCost = 0;
    const seats = Number(toolInput.seats) || 1;
    const customCost = Number(toolInput.customCost) || 0;

    // Calculate current cost
    if (toolInput.planId === "payg") {
      // API Usage based
      currentCost = customCost;
      optimizedCost = currentCost; // Default baseline
    } else {
      // Subscription based
      const selectedPlan = toolMeta.plans.find(p => p.id === toolInput.planId);
      const planCostPerSeat = selectedPlan ? selectedPlan.cost : 0;
      
      // Calculate taking care of minimum seat restrictions
      if (selectedPlan && selectedPlan.minSeats && seats < selectedPlan.minSeats) {
        // User pays for minimum seats even if they have fewer
        currentCost = selectedPlan.minSeats * planCostPerSeat;
      } else {
        currentCost = seats * planCostPerSeat;
      }
      optimizedCost = currentCost;
    }

    // A. Check for Seat Minimum Waste (e.g. Claude Team with < 5 seats)
    if (toolInput.toolId === "claude" && toolInput.planId === "team" && seats < 5) {
      // Claude Team has a 5 seat minimum ($150/mo). If seats < 5, they should buy individual Pro licenses.
      const individualProCost = seats * 20; // Pro is $20
      const teamCost = 5 * 30; // Team is $30, min 5 seats = $150
      const waste = teamCost - individualProCost;
      
      if (waste > 0) {
        optimizedCost = individualProCost;
        recommendations.push({
          id: "claude_team_seat_waste",
          toolId: "claude",
          toolName: "Claude",
          title: "Downsize Claude Team to Pro Licenses",
          description: `Claude Team requires a 5 seat minimum ($150/mo). Since you only have ${seats} active users, downgrade to individual Claude Pro accounts ($20/mo each) to save money.`,
          impact: "Medium",
          monthlySavings: waste,
          actionable: "Downgrade 5 Team seats to Pro seats"
        });
      }
    }

    // B. Check for ChatGPT Team Seat Waste with < 2 seats
    if (toolInput.toolId === "chatgpt" && toolInput.planId === "team" && seats < 2) {
      const individualPlusCost = seats * 20; // Plus is $20
      const teamCost = 2 * 30; // Team is $30, min 2 seats = $60
      const waste = teamCost - individualPlusCost;
      
      if (waste > 0) {
        optimizedCost = individualPlusCost;
        recommendations.push({
          id: "chatgpt_team_seat_waste",
          toolId: "chatgpt",
          toolName: "ChatGPT",
          title: "Downsize ChatGPT Team to Plus",
          description: `ChatGPT Team requires a minimum of 2 seats ($60/mo). Since you only have 1 active user, switch to a ChatGPT Plus subscription ($20/mo) and save.`,
          impact: "Low",
          monthlySavings: waste,
          actionable: "Downgrade Team license to ChatGPT Plus"
        });
      }
    }

    // C. Check API cost optimization
    if (toolInput.toolId === "openai_api" && currentCost > 100) {
      const apiSavings = currentCost * 0.40; // Assume 40% savings via mini models, caching & rate logs
      optimizedCost = currentCost - apiSavings;
      recommendations.push({
        id: "openai_api_optimization",
        toolId: "openai_api",
        toolName: "OpenAI API",
        title: "Migrate API calls to GPT-4o-mini & caching",
        description: "Move developer scripts and classification workflows from GPT-4o to GPT-4o-mini. Also, implement semantic API caching to bypass duplicate queries.",
        impact: "High",
        monthlySavings: apiSavings,
        actionable: "Route 80% of secondary API requests to GPT-4o-mini"
      });
    }

    if (toolInput.toolId === "anthropic_api" && currentCost > 100) {
      const apiSavings = currentCost * 0.50; // 50% savings via Claude 3.5 Sonnet swap and caching
      optimizedCost = currentCost - apiSavings;
      recommendations.push({
        id: "anthropic_api_optimization",
        toolId: "anthropic_api",
        toolName: "Anthropic API",
        title: "Switch Opus to Claude 3.5 Sonnet & enable Caching",
        description: "Claude 3.5 Sonnet is 5x cheaper than Claude 3 Opus and yields higher benchmark performance. Turn on prompt caching for large system guidelines.",
        impact: "High",
        monthlySavings: apiSavings,
        actionable: "Migrate active engines from Claude 3 Opus to Claude 3.5 Sonnet"
      });
    }

    // D. General volume licensing check (SaaS discount potentials)
    if (seats >= 15 && toolInput.planId === "plus" && toolInput.toolId === "chatgpt") {
      // Recommend Team or Enterprise contract consolidation
      const savings = (seats * 20) * 0.15; // 15% estimated through team workspaces or yearly invoicing
      recommendations.push({
        id: "chatgpt_volume_consolidation",
        toolId: "chatgpt",
        toolName: "ChatGPT",
        title: "Consolidate to ChatGPT Team workspace",
        description: `With ${seats} employees paying via individual expense reports, consolidate under a singular company billing workspace to ease administration and enforce compliance audit policies.`,
        impact: "Medium",
        monthlySavings: savings,
        actionable: "Create a singular ChatGPT Team billing workspace"
      });
    }

    totalCurrentSpend += currentCost;
    totalOptimizedSpend += optimizedCost;

    breakdown.push({
      toolId: toolInput.toolId,
      name: toolMeta.name,
      category: toolMeta.category,
      seats: toolInput.planId === "payg" ? null : seats,
      planName: toolMeta.plans.find(p => p.id === toolInput.planId)?.name || "Usage",
      currentCost,
      optimizedCost
    });
  });

  // 2. Cross-Tool Redundancy Auditing (Overlaps)
  
  // A. Redundancy: GitHub Copilot & Cursor AI
  if (toolMap["copilot"] && toolMap["cursor"]) {
    const copilotSeats = Number(toolMap["copilot"].seats) || 1;
    const cursorSeats = Number(toolMap["cursor"].seats) || 1;
    const overlapSeats = Math.min(copilotSeats, cursorSeats);

    // Get the copilot plan cost to calculate waste
    const copilotMeta = AI_TOOLS["copilot"];
    const copilotPlan = copilotMeta.plans.find(p => p.id === toolMap["copilot"].planId);
    const copilotCostPerSeat = copilotPlan ? copilotPlan.cost : 19; // Default business is $19
    
    const redundancyCost = overlapSeats * copilotCostPerSeat;
    
    if (redundancyCost > 0) {
      totalOptimizedSpend -= redundancyCost;
      recommendations.push({
        id: "copilot_cursor_overlap",
        toolId: "copilot",
        toolName: "GitHub Copilot",
        title: "Cancel redundant GitHub Copilot licenses",
        description: `We detected both GitHub Copilot (${copilotSeats} seats) and Cursor AI (${cursorSeats} seats) in your stack. Cursor has built-in code completion. Deactivating Copilot for those ${overlapSeats} developers will remove double charges.`,
        impact: "High",
        monthlySavings: redundancyCost,
        actionable: `Cancel Copilot seats for the ${overlapSeats} engineers using Cursor IDE`
      });
    }
  }

  // B. Redundancy: Cursor AI & Windsurf IDE
  if (toolMap["cursor"] && toolMap["windsurf"]) {
    const cursorSeats = Number(toolMap["cursor"].seats) || 1;
    const windsurfSeats = Number(toolMap["windsurf"].seats) || 1;
    const overlapSeats = Math.min(cursorSeats, windsurfSeats);
    
    // Assume standardizing on Cursor Pro ($20) or Windsurf Pro ($15). Let's recommend cancelling the cheaper one.
    const windsurfMeta = AI_TOOLS["windsurf"];
    const windsurfPlan = windsurfMeta.plans.find(p => p.id === toolMap["windsurf"].planId);
    const windsurfCost = windsurfPlan ? windsurfPlan.cost : 15;
    
    const overlapWaste = overlapSeats * windsurfCost;
    if (overlapWaste > 0) {
      totalOptimizedSpend -= overlapWaste;
      recommendations.push({
        id: "cursor_windsurf_overlap",
        toolId: "windsurf",
        toolName: "Windsurf",
        title: "Standardize on a single AI IDE editor",
        description: `We detected both Cursor and Windsurf subscription tools in your engineering pool. Select one as the default editor to eliminate double IDE expenditures for ${overlapSeats} developers.`,
        impact: "Medium",
        monthlySavings: overlapWaste,
        actionable: `Standardize team IDE and cancel duplicate ${overlapSeats} seats`
      });
    }
  }

  // C. Redundancy: ChatGPT & Claude (SaaS Consolidation)
  if (toolMap["chatgpt"] && toolMap["claude"]) {
    const gptSeats = Number(toolMap["chatgpt"].seats) || 1;
    const claudeSeats = Number(toolMap["claude"].seats) || 1;
    // If a company uses both widely, recommend standardizing on one for general assistants
    const overlapSeats = Math.min(gptSeats, claudeSeats);
    if (overlapSeats >= 3) {
      // Recommend moving them to Claude Team or ChatGPT Team solely
      const potentialConsolidationSavings = overlapSeats * 15; // Assume saving $15 per seat by moving to single workspace/plan
      // Note: We don't subtract this directly from optimized cost to avoid double counting with seat-level downsizings,
      // but we display it as a massive SaaS recommendation
      recommendations.push({
        id: "chatgpt_claude_consolidation",
        toolId: "chatgpt",
        toolName: "Workspace Consolidation",
        title: "Standardize on ChatGPT or Claude Team",
        description: `Your team actively expenses both Claude (${claudeSeats} seats) and ChatGPT (${gptSeats} seats). Standardizing on one general assistant tool simplifies licensing, increases security compliance, and gains volume discount rates.`,
        impact: "Medium",
        monthlySavings: potentialConsolidationSavings,
        actionable: "Poll team preferences and transition to a single primary assistant tool"
      });
    }
  }

  // Final math safeguards
  if (totalOptimizedSpend < 0) totalOptimizedSpend = 0;
  if (totalOptimizedSpend > totalCurrentSpend) totalOptimizedSpend = totalCurrentSpend;
  
  const monthlySavings = totalCurrentSpend - totalOptimizedSpend;
  const yearlySavings = monthlySavings * 12;
  
  // Calculate Optimization Score (100 - % of spend that is waste)
  let optimizationScore = 100;
  if (totalCurrentSpend > 0) {
    const wastePercent = (monthlySavings / totalCurrentSpend) * 100;
    optimizationScore = Math.max(0, Math.round(100 - wastePercent));
  }

  return {
    totalCurrentSpend: Math.round(totalCurrentSpend),
    totalOptimizedSpend: Math.round(totalOptimizedSpend),
    monthlySavings: Math.round(monthlySavings),
    yearlySavings: Math.round(yearlySavings),
    optimizationScore,
    recommendations,
    breakdown,
    teamSize
  };
}
