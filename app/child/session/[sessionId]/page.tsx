"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentScreen, type ClientQuestion } from "@/components/child/AssessmentScreen";
import { ResultsScreen } from "@/components/child/ResultsScreen";

interface SubmitResult {
  overallScore: number;
  xpEarned: number;
  badgeEarned: "BRONZE" | "SILVER" | "GOLD";
  breakdown: {
    questionId: number;
    prompt: string;
    bloomLevel: string;
    score: number;
    explanation: string;
  }[];
}

// Single page handles both the assessment and results phases for a given
// session — simpler than round-tripping submit results through a separate
// route, since the result only exists transiently right after submission.
export default function SessionPage({ params }: { params: Promise<{ sessionId: string }> }) {
  const { sessionId } = use(params);
  const router = useRouter();

  const [questions, setQuestions] = useState<ClientQuestion[] | null>(null);
  const [answers, setAnswers] = useState<Record<number, unknown>>({});
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    fetch(`/api/sessions/${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questions);
        setAnswers(data.answers ?? {});
      });
  }, [sessionId]);

  if (result) {
    return (
      <div className="bk-bg-cream min-h-[560px] px-6 py-10">
        <ResultsScreen
          overallScore={result.overallScore}
          xpEarned={result.xpEarned}
          badgeEarned={result.badgeEarned}
          breakdown={result.breakdown}
          onDone={() => router.push("/child/library")}
        />
      </div>
    );
  }

  if (!questions) {
    return <div className="bk-bg-cream min-h-[560px] px-6 py-10 text-center bk-slate text-sm">Loading...</div>;
  }

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <AssessmentScreen
        sessionId={Number(sessionId)}
        questions={questions}
        initialAnswers={answers}
        onSubmitted={(r) => setResult(r as SubmitResult)}
      />
    </div>
  );
}
