type BloomLevel = "REMEMBER" | "UNDERSTAND" | "APPLY" | "ANALYZE" | "EVALUATE" | "CREATE";

const FRIENDLY_LABEL: Record<BloomLevel, string> = {
  REMEMBER: "remembering key events and details",
  UNDERSTAND: "understanding the story in her own words",
  APPLY: "applying ideas from the story to new situations",
  ANALYZE: "analyzing characters and their motivations",
  EVALUATE: "evaluating and forming opinions about the story",
  CREATE: "creating new ideas inspired by the story",
};

/**
 * Deterministic, rule-based insight text for the parent dashboard —
 * no AI, consistent with the rest of the app's grading philosophy.
 * Built from the same Bloom-level score aggregation shown in the chart.
 */
export function generateInsight(childName: string, bloomAverages: Record<string, number>): string {
  const entries = Object.entries(bloomAverages).filter(([, v]) => v !== null && !Number.isNaN(v));
  if (entries.length === 0) {
    return `${childName} hasn't completed an assessment yet — insights will appear here after the first one.`;
  }

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const strongestLabel = FRIENDLY_LABEL[strongest[0] as keyof typeof FRIENDLY_LABEL];
  const weakestLabel = FRIENDLY_LABEL[weakest[0] as keyof typeof FRIENDLY_LABEL];

  if (strongest[0] === weakest[0] || sorted.length === 1) {
    return `${childName} is showing consistent strength ${strongestLabel}.`;
  }

  return `${childName} demonstrates strong skill ${strongestLabel}. More practice is recommended ${weakestLabel}.`;
}
