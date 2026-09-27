import { answerMentions, answersMatch } from "./answerMatching";

export type QuestionType =
  | "mc"
  | "ordering"
  | "ranking"
  | "matching"
  | "fillblank"
  | "classification"
  | "open"
  | "crossword";

export interface McContent {
  options: string[];
  correct: number;
}

export interface OrderingContent {
  items: string[];
  correctOrder: number[];
}

export interface MatchingContent {
  left: string[];
  right: string[];
  correctMap: Record<string, number>;
}

export interface FillblankContent {
  answer: string;
  altAnswers?: string[];
}

export interface ClassificationOption {
  label: string;
  group: "A" | "B";
}

export interface ClassificationContent {
  groupA: string;
  groupB: string;
  options: ClassificationOption[];
}

export interface OpenContent {
  keywords: string[];
}

export interface CrosswordWord {
  answer: string;
  clue: string;
  row: number;
  col: number;
  direction: "across" | "down";
}

export interface CrosswordContent {
  gridSize: { rows: number; cols: number };
  words: CrosswordWord[];
}

export type QuestionContent =
  | McContent
  | OrderingContent
  | MatchingContent
  | FillblankContent
  | ClassificationContent
  | OpenContent
  | CrosswordContent;

/**
 * Grades a single question attempt. Returns a score from 0 to 1 (partial
 * credit for multi-part types, all-or-nothing for mc/fillblank).
 * `answer` shapes mirror each type's `content` shape — see
 * docs/bookalyzer-content-json-template.md and components/child/questions/*.
 */
export function gradeQuestion(
  type: QuestionType,
  content: QuestionContent,
  answer: unknown
): number {
  if (answer === undefined || answer === null) return 0;

  switch (type) {
    case "mc": {
      const c = content as McContent;
      return answer === c.correct ? 1 : 0;
    }

    case "fillblank": {
      const c = content as FillblankContent;
      return [c.answer, ...(c.altAnswers ?? [])].some((a) => answersMatch(answer, a)) ? 1 : 0;
    }

    case "ordering":
    case "ranking": {
      const c = content as OrderingContent;
      const given = answer as number[];
      if (!Array.isArray(given) || given.length !== c.correctOrder.length) return 0;
      const correctCount = given.filter((v, i) => v === c.correctOrder[i]).length;
      return correctCount / c.correctOrder.length;
    }

    case "matching": {
      const c = content as MatchingContent;
      const given = answer as Record<string, number>;
      const total = c.left.length;
      let correct = 0;
      for (let i = 0; i < total; i++) {
        if (given?.[String(i)] === c.correctMap[String(i)]) correct++;
      }
      return total === 0 ? 0 : correct / total;
    }

    case "classification": {
      const c = content as ClassificationContent;
      const given = answer as Record<string, "A" | "B">;
      const total = c.options.length;
      let correct = 0;
      c.options.forEach((opt, i) => {
        if (given?.[String(i)] === opt.group) correct++;
      });
      return total === 0 ? 0 : correct / total;
    }

    case "open": {
      const c = content as OpenContent;
      // Whole-word match, so a keyword is not found inside an unrelated
      // longer word. A miss here is what sends the answer to the LLM.
      return c.keywords.some((k) => answerMentions(answer, k)) ? 1 : 0;
    }

    case "crossword": {
      const c = content as CrosswordContent;
      const given = answer as Record<string, string>; // keyed by word index (as string)
      const total = c.words.length;
      if (total === 0) return 0;
      let correct = 0;
      c.words.forEach((w, i) => {
        const givenWord = String(given?.[String(i)] ?? "").trim().toLowerCase();
        if (givenWord === w.answer.trim().toLowerCase()) correct++;
      });
      return correct / total;
    }

    default:
      return 0;
  }
}
