"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Press_Start_2P } from "next/font/google";
import { calculateDimensions, getPersona } from "@/lib/surveyLogic.ts";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// ------- MAIN QUESTIONS -------- //
const baseQuestions = [
  {
    key: "position",
    type: "options" as const,
    question: "What is your main role?",
    options: ["CEO", "CTO", "Consultant", "Other"],
  },
  {
    key: "taille_entreprise",
    type: "options" as const,
    question: "How many employees are there?",
    options: ["-10", "11-50", "51-250", "251-1000", "+1000"],
  },
  {
    key: "secteur",
    type: "options" as const,
    question: "Which sector are you in?",
    options: ["B2B", "B2C", "Tech", "Public"],
  },
  {
    key: "sous_secteur",
    type: "input" as const,
    question: "Please specify your sub-sector",
  },
];

const transversalQuestions = [
  {
    key: "culture_innovation",
    type: "options" as const,
    question: "How does your team react to novelty?",
    options: ["Exploratrice", "Curieuse", "Précautionneuse"],
  },
  {
    key: "vision_ia",
    type: "options" as const,
    question: "In AI discussions, you are a...",
    options: ["Idéateur", "Analyste", "Observateur"],
  },
  {
    key: "process_internes",
    type: "options" as const,
    question: "Your current processes are...",
    options: ["Ultra structurés", "Digitalisés", "Largement manuels"],
  },
  {
    key: "donnees_disponibles",
    type: "options" as const,
    question: "Data in your organization is...",
    options: ["Facilement accessible", "Fragmentée", "Opaque"],
  },
  {
    key: "decisions_data",
    type: "options" as const,
    question: "To what extent are decisions data-based?",
    options: ["Toujours", "Parfois", "Rarement"],
  },
];

// ----------- CONDITIONAL QUESTIONS BY ROLE ----------- //
type Question = {
  key: string;
  type: "options" | "input";
  question: string;
  options?: string[];
};

const roleConditionalQuestions: Record<string, Question[]> = {
  CEO: [
    {
      key: "ceo_projet_ia",
      type: "options",
      question: "An AI project is...",
      options: [
        "An investment for the future",
        "A strategic lever",
        "A controllable threat",
      ],
    },
    {
      key: "ceo_ethique_ia",
      type: "options",
      question: "An AI ethics committee is...",
      options: ["Essential", "Important", "Optional"],
    },
    {
      key: "ceo_ia_devrait",
      type: "options",
      question: "AI should...",
      options: ["Augment humans", "Optimize costs", "Replace jobs"],
    },
  ],
  CTO: [
    {
      key: "cto_projet_ia",
      type: "options",
      question: "An AI project starts with...",
      options: ["Data audit", "Quick POC", "Compliance first"],
    },
    {
      key: "cto_expliquer_ia",
      type: "options",
      question: "To explain AI, you say...",
      options: ["A smart tool", "A very fast colleague", "Just another tech"],
    },
    {
      key: "cto_utile",
      type: "options",
      question: "AI is useful when...",
      options: [
        "Integrated in processes",
        "Reduces errors",
        "Does what Excel does",
      ],
    },
  ],
  Consultant: [
    {
      key: "consultant_parler_client",
      type: "options",
      question: "When you talk about AI to a client, you...",
      options: [
        "Explains with images",
        "Uses sector example",
        "Starts a debate",
      ],
    },
    {
      key: "consultant_atelier",
      type: "options",
      question: "In a workshop, you...",
      options: ["Reconnects to needs", "Provokes ideas", "Follows the trend"],
    },
    {
      key: "consultant_client_ideal",
      type: "options",
      question: "Your ideal client regarding AI is...",
      options: [
        "An active curious",
        "An awakened follower",
        "A passive convinced",
      ],
    },
  ],
};
// 'Other' is always treated as Consultant for questions
roleConditionalQuestions["Other"] = roleConditionalQuestions["Consultant"];

// ------------------------------------------------------ //

export default function SurveyStepper({ userId }: { userId?: string }) {
  // State for the stepper
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherValue, setOtherValue] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<{
    persona: ReturnType<typeof getPersona>;
    scores: ReturnType<typeof calculateDimensions>;
  } | null>(null);

  // Build the question list dynamically based on role choice
  const selectedRole =
    answers["position"] ||
    (baseQuestions[0].type === "options" && baseQuestions[0].options
      ? baseQuestions[0].options[0]
      : "");
  const allQuestions = [
    ...baseQuestions,
    ...transversalQuestions,
    ...(roleConditionalQuestions[selectedRole] || []),
  ];

  const current = allQuestions[step];

  // Helper for moving to next question
  const next = (key: string, value: string) => {
    const nextAns = { ...answers, [key]: value };
    setAnswers(nextAns);
    setOtherValue("");
    setShowOtherInput(false);

    if (step < allQuestions.length - 1) {
      setStep(step + 1);
    } else {
      // Compute score & persona
      const scores = calculateDimensions(nextAns);
      const persona = getPersona(scores);
      setResult({ scores, persona });
      setFinished(true);

      // Optional: persist to backend
      fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          answers: nextAns,
          scores,
          persona: persona.key,
        }),
      });
    }
  };

  // ----- CARD STYLES ----- //
  const cardStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.15)",
    WebkitBackdropFilter: "blur(8px)",
    backdropFilter: "blur(8px)",
    border: "4px solid #ffe600",
    boxSizing: "border-box",
    padding: 0,
    width: "100%",
    maxWidth: "420px",
  };

  // ----- RESULT PAGE ----- //
  if (finished && result) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center bg-[#191c22] px-2 ${pressStart.className}`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="flex flex-col items-center rounded-2xl px-6 py-14 sm:px-10 shadow-xl w-full"
          style={cardStyle}
        >
          <Image
            src={result.persona.image}
            alt={result.persona.label}
            width={110}
            height={110}
            className="mb-4 rounded-full shadow-md"
          />
          <div className="text-2xl text-[#ffe600] font-bold mb-2">
            {result.persona.label}
          </div>
          <div className="text-white/90 mb-4 text-center">
            {result.persona.description}
          </div>
          <div className="text-[#ffe600] font-bold mb-2">Scores :</div>
          <ul className="mb-7 text-black/80 bg-[#ffe600] rounded px-4 py-2 w-52">
            {Object.entries(result.scores).map(([dim, val]) => (
              <li key={dim} className="flex justify-between capitalize">
                <span>{dim}</span>
                <span className="font-extrabold">{String(val)}</span>
              </li>
            ))}
          </ul>
          <button
            className="bg-black text-[#ffe600] border-2 border-yellow-400 px-6 py-3 rounded-lg font-bold hover:scale-105 transition"
            onClick={() => window.location.reload()}
          >
            ▶ Replay
          </button>
        </motion.div>
      </div>
    );
  }

  // ----- QUESTION PAGE ----- //
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-[#191c22] px-2 ${pressStart.className}`}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 0.15 }}
        className="flex flex-col items-center rounded-2xl px-6 py-14 sm:px-10 shadow-lg w-full max-w-md"
        style={cardStyle}
      >
        <div className="text-lg text-white mb-6 text-center w-full">
          <span className="text-[#ffe600]">
            Question {step + 1} / {allQuestions.length}
          </span>
        </div>

        <div className="text-2xl text-[#ffe600] font-bold mb-7 text-center w-full break-words">
          {current.question}
        </div>

        {/* Option Buttons or Input */}
        {current.type === "options" && (
          <div className="flex flex-col gap-5 w-full max-w-xs mb-3">
            {current.options?.map((opt: string) =>
              opt === "Other" && current.key === "position" ? (
                <div key={opt}>
                  <button
                    className="bg-[#ffe600] text-black font-bold px-8 py-4 rounded-lg border-2 border-black shadow-md hover:scale-105 transition-all w-full mb-2"
                    onClick={() => setShowOtherInput(true)}
                  >
                    Other (please specify)
                  </button>
                  {showOtherInput && (
                    <div className="mt-3 flex flex-col gap-4 pb-2">
                      <input
                        type="text"
                        value={otherValue}
                        placeholder="Your role"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setOtherValue(e.target.value)
                        }
                        className="bg-white text-black border-2 border-[#ffe600] rounded-lg p-3 text-lg"
                        autoFocus
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (e.key === "Enter" && otherValue.trim()) {
                            next(current.key, otherValue.trim());
                          }
                        }}
                      />
                      <button
                        className="bg-[#ffe600] text-black font-bold px-6 py-3 rounded-lg hover:scale-105 transition self-center"
                        onClick={() =>
                          otherValue.trim() &&
                          next(current.key, otherValue.trim())
                        }
                        disabled={!otherValue.trim()}
                        style={{ marginTop: "0.2rem" }}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={opt}
                  className="bg-[#ffe600] text-black font-bold px-8 py-4 rounded-lg border-2 border-black shadow-md hover:scale-105 transition-all w-full"
                  onClick={() => next(current.key, opt)}
                >
                  {opt}
                </button>
              )
            )}
          </div>
        )}

        {current.type === "input" && (
          <div className="flex flex-col gap-4 w-full max-w-xs mb-3">
            <input
              type="text"
              className="bg-[#fff] text-black rounded-lg p-3 text-lg mb-2"
              placeholder="Type your answer…"
              value={otherValue}
              onChange={(e) => setOtherValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && otherValue.trim())
                  next(current.key, otherValue.trim());
              }}
              autoFocus
            />
            <button
              className="bg-[#ffe600] text-black font-bold px-6 py-3 rounded-lg hover:scale-105 transition self-center"
              onClick={() =>
                otherValue.trim() && next(current.key, otherValue.trim())
              }
              disabled={!otherValue.trim()}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
      <div className="mt-8 text-xs text-yellow-400 opacity-70 text-center">
        Arcade AI Game EY
      </div>
    </div>
  );
}
