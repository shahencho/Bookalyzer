"use client";

import { useMemo, useRef } from "react";

interface CrosswordWord {
  clue: string;
  row: number;
  col: number;
  direction: "across" | "down";
  answer: string; // length is meaningful even though sanitized to "" server-side
}

interface CrosswordContent {
  gridSize: { rows: number; cols: number };
  words: CrosswordWord[];
}

type Grid = Record<string, string>; // "row,col" -> single uppercase char

function key(row: number, col: number) {
  return `${row},${col}`;
}

function gridFromAnswers(words: CrosswordWord[], answers: Record<string, string>): Grid {
  const grid: Grid = {};
  words.forEach((w, i) => {
    const word = answers[String(i)] ?? "";
    for (let li = 0; li < word.length; li++) {
      const r = w.direction === "down" ? w.row + li : w.row;
      const c = w.direction === "across" ? w.col + li : w.col;
      if (word[li]) grid[key(r, c)] = word[li].toUpperCase();
    }
  });
  return grid;
}

export function CrosswordInput({
  content,
  value,
  onChange,
}: {
  content: CrosswordContent;
  value: Record<string, string> | undefined;
  onChange: (value: Record<string, string>) => void;
}) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // The server never sends real letters — sanitizeQuestionForClient replaces
  // `answer` with a same-length placeholder so the grid layout is still
  // correct without leaking the solution.
  const wordLengths = content.words.map((w) => w.answer.length || 1);

  const grid = useMemo(() => gridFromAnswers(content.words, value ?? {}), [content.words, value]);

  const cellWordMap = useMemo(() => {
    const map = new Map<string, { wordIndex: number; letterPos: number; direction: "across" | "down" }[]>();
    content.words.forEach((w, wi) => {
      const len = wordLengths[wi];
      for (let li = 0; li < len; li++) {
        const r = w.direction === "down" ? w.row + li : w.row;
        const c = w.direction === "across" ? w.col + li : w.col;
        const k = key(r, c);
        if (!map.has(k)) map.set(k, []);
        map.get(k)!.push({ wordIndex: wi, letterPos: li, direction: w.direction });
      }
    });
    return map;
  }, [content.words, wordLengths]);

  const startNumbers = useMemo(() => {
    const map = new Map<string, number>();
    content.words.forEach((w, i) => map.set(key(w.row, w.col), i + 1));
    return map;
  }, [content.words]);

  function setCellChar(row: number, col: number, char: string) {
    const entries = cellWordMap.get(key(row, col)) ?? [];
    const answers: Record<string, string> = { ...(value ?? {}) };

    for (const { wordIndex, letterPos } of entries) {
      const len = wordLengths[wordIndex];
      const current = (answers[String(wordIndex)] ?? " ".repeat(len)).padEnd(len, " ").split("");
      current[letterPos] = char.toUpperCase();
      answers[String(wordIndex)] = current.join("");
    }
    onChange(answers);

    // Auto-advance to the next cell of the first word occupying this cell.
    if (char && entries.length > 0) {
      const { wordIndex, letterPos, direction } = entries[0];
      const w = content.words[wordIndex];
      const len = wordLengths[wordIndex];
      if (letterPos + 1 < len) {
        const nr = direction === "down" ? w.row + letterPos + 1 : w.row;
        const nc = direction === "across" ? w.col + letterPos + 1 : w.col;
        inputRefs.current[key(nr, nc)]?.focus();
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) {
    if (e.key === "Backspace" && !grid[key(row, col)]) {
      const entries = cellWordMap.get(key(row, col)) ?? [];
      if (entries.length > 0) {
        const { wordIndex, letterPos, direction } = entries[0];
        const w = content.words[wordIndex];
        if (letterPos > 0) {
          const pr = direction === "down" ? w.row + letterPos - 1 : w.row;
          const pc = direction === "across" ? w.col + letterPos - 1 : w.col;
          inputRefs.current[key(pr, pc)]?.focus();
        }
      }
    }
  }

  const rows = Array.from({ length: content.gridSize.rows }, (_, r) => r);
  const cols = Array.from({ length: content.gridSize.cols }, (_, c) => c);

  return (
    <div className="flex flex-col sm:flex-row gap-6">
      {/* gridSize can exceed the viewport width on phones (each cell is a
          fixed 32px) — scroll horizontally instead of breaking page layout,
          rather than trying to shrink cells below a tappable size. */}
      <div className="w-full overflow-x-auto">
        <div
          className="grid gap-[2px] bg-[#E7DFCC] p-[2px] rounded-lg w-fit"
          style={{ gridTemplateColumns: `repeat(${content.gridSize.cols}, 32px)` }}
        >
          {rows.map((r) =>
          cols.map((c) => {
            const k = key(r, c);
            const occupied = cellWordMap.has(k);
            const startNumber = startNumbers.get(k);
            if (!occupied) {
              return <div key={k} className="w-8 h-8 bg-transparent" />;
            }
            return (
              <div key={k} className="relative w-8 h-8 bg-white">
                {startNumber && (
                  <span className="absolute top-0 left-0.5 text-[8px] bk-mono bk-slate leading-none">
                    {startNumber}
                  </span>
                )}
                <input
                  ref={(el) => {
                    inputRefs.current[k] = el;
                  }}
                  maxLength={1}
                  value={grid[k] ?? ""}
                  onChange={(e) => setCellChar(r, c, e.target.value.slice(-1).replace(/[^a-zA-Z]/g, ""))}
                  onKeyDown={(e) => handleKeyDown(e, r, c)}
                  className="w-8 h-8 text-center text-sm uppercase outline-none border border-transparent focus:border-[#E3A94F]"
                />
              </div>
            );
          })
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        {content.words.map((w, i) => (
          <div key={i} className="text-sm">
            <span className="bk-mono text-[10px] bk-gold mr-1">
              {i + 1} {w.direction === "across" ? "→" : "↓"}
            </span>
            {w.clue}
          </div>
        ))}
      </div>
    </div>
  );
}
