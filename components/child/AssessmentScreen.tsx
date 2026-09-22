"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { McInput } from "./questions/McInput";
import { OrderingInput } from "./questions/OrderingInput";
import { MatchingInput } from "./questions/MatchingInput";
import { ClassificationInput } from "./questions/ClassificationInput";
import { FillblankInput } from "./questions/FillblankInput";
import { OpenInput } from "./questions/OpenInput";
import { CrosswordInput } from "./questions/CrosswordInput";
import { AssessmentTimer } from "./AssessmentTimer";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

export interface ClientQuestion {
  id: number;
  type: "mc" | "ordering" | "ranking" | "matching" | "fillblank" | "classification" | "open" | "crossword";
  bloomLevel: string;
  prompt: string;
  content: unknown;
}

interface QuestionInputProps {
  content: unknown;
  value: unknown;
  onChange: (value: unknown) => void;
}

const INPUT_BY_TYPE: Record<ClientQuestion["type"], React.ComponentType<QuestionInputProps>> = {
  mc: McInput,
  ordering: OrderingInput,
  ranking: OrderingInput,
  matching: MatchingInput,
  classification: ClassificationInput,
  fillblank: FillblankInput,
  open: OpenInput,
  crossword: CrosswordInput,
} as unknown as Record<ClientQuestion["type"], React.ComponentType<QuestionInputProps>>;

export function AssessmentScreen({
  sessionId,
  questions,
  initialAnswers,
  onSubmitted,
}: {
  sessionId: number;
  questions: ClientQuestion[];
  initialAnswers: Record<number, unknown>;
  onSubmitted: (result: unknown) => void;
}) {
  const { lang } = useLang();
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, unknown>>(initialAnswers);
  const [submitting, setSubmitting] = useState(false);
  const durationRef = useRef(0);

  const q = questions[qIndex];
  const Input = INPUT_BY_TYPE[q.type];

  async function setAnswer(value: unknown) {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    await fetch(`/api/sessions/${sessionId}/answer`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: q.id, answer: value }),
    }).catch(() => {
      // Best-effort autosave; the child can keep answering, and a later
      // successful save will still capture the current value.
    });
  }

  async function handleSubmit() {
    setSubmitting(true);
    const res = await fetch(`/api/sessions/${sessionId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ durationSeconds: durationRef.current }),
    });
    const result = await res.json();
    setSubmitting(false);
    onSubmitted(result);
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl p-5 sm:p-8 bk-card">
      <div className="flex items-center justify-between mb-1">
        <span className="bk-mono text-[10px] bk-gold">
          {t(UI.questionLabel, lang)} {qIndex + 1} / {questions.length}
        </span>
        <div className="flex items-center gap-3">
          <AssessmentTimer onTick={(s) => (durationRef.current = s)} />
          <span className="bk-mono text-[10px] bk-slate">{t(UI.bloomLabel, lang)}: {q.bloomLevel.toUpperCase()}</span>
        </div>
      </div>
      <div className="w-full h-1 bg-[#EDE6D3] rounded-full mb-6 overflow-hidden">
        <div className="h-full bk-bg-gold" style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} />
      </div>

      <h3 className="bk-display text-xl mb-6 leading-snug">{q.prompt}</h3>

      <Input content={q.content} value={answers[q.id]} onChange={setAnswer} />

      <div className="flex items-center justify-between mt-8">
        <button
          disabled={qIndex === 0}
          onClick={() => setQIndex((i) => i - 1)}
          className="flex items-center gap-1 bk-btn-outline rounded-lg px-4 py-2 text-sm disabled:opacity-20"
        >
          <ArrowLeft size={14} /> {t(UI.previous, lang)}
        </button>
        {qIndex < questions.length - 1 ? (
          <button
            onClick={() => setQIndex((i) => i + 1)}
            className="flex items-center gap-1 bk-btn-dark rounded-lg px-4 py-2 text-sm"
          >
            {t(UI.next, lang)} <ArrowRight size={14} />
          </button>
        ) : (
          <button
            disabled={submitting}
            onClick={handleSubmit}
            className="flex items-center gap-1 bk-btn-primary rounded-lg px-5 py-2 text-sm font-medium disabled:opacity-50"
          >
            {t(UI.submitAssessment, lang)} <Check size={14} />
          </button>
        )}
      </div>
      <p className="bk-mono text-[9px] bk-slate mt-4">{t(UI.autosaveNote, lang)}</p>
    </div>
  );
}
