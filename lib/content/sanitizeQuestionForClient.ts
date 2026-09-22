import type {
  QuestionContent,
  QuestionType,
  McContent,
  OrderingContent,
  MatchingContent,
  FillblankContent,
  ClassificationContent,
  OpenContent,
  CrosswordContent,
} from "@/lib/grading";

/**
 * Strips the answer key out of a question's `content` before it is ever
 * sent to a child's browser. The old demo shipped `correct`/`correctOrder`/
 * etc. straight to the client — this is the fix for that.
 */
export function sanitizeQuestionForClient(
  type: QuestionType,
  content: QuestionContent
): QuestionContent {
  switch (type) {
    case "mc": {
      const { options } = content as McContent;
      return { options } as McContent;
    }
    case "ordering":
    case "ranking": {
      const { items } = content as OrderingContent;
      return { items, correctOrder: [] } as OrderingContent;
    }
    case "matching": {
      const { left, right } = content as MatchingContent;
      return { left, right, correctMap: {} } as MatchingContent;
    }
    case "fillblank": {
      return { answer: "", altAnswers: [] } as FillblankContent;
    }
    case "classification": {
      const c = content as ClassificationContent;
      return {
        groupA: c.groupA,
        groupB: c.groupB,
        options: c.options.map((o) => ({ label: o.label, group: undefined as unknown as "A" })),
      } as ClassificationContent;
    }
    case "open": {
      return { keywords: [] } as OpenContent;
    }
    case "crossword": {
      // The client needs each word's *length* to render the right number of
      // grid cells, but must never see the letters — replace `answer` with
      // a same-length placeholder instead of blanking it entirely.
      const c = content as CrosswordContent;
      return {
        gridSize: c.gridSize,
        words: c.words.map((w) => ({ ...w, answer: "\u0000".repeat(w.answer.length) })),
      } as CrosswordContent;
    }
    default:
      return content;
  }
}
