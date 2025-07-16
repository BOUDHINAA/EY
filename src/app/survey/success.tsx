"use client";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function SurveySuccess() {
  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-[#191c22] ${pressStart.className}`}
    >
      <div className="max-w-lg w-full px-2 py-10 flex flex-col items-center text-center">
        <h2
          className="text-2xl sm:text-3xl text-[#ffe600] font-bold mb-6"
          style={{ WebkitTextStroke: "1px #191c22" }}
        >
          🎉 Survey Complete!
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Thanks for playing the AI Maturity Quest.
          <br />
          Your answers are saved!
        <Link
          href="/"
          className="inline-block bg-[#ffe600] border-4 border-black text-black px-8 py-4 rounded-lg text-xl font-extrabold transition-all duration-150 hover:bg-yellow-400 hover:scale-105"
        >
          Back to Home
        </Link>
        </p>
      </div>
    </div>
  );
}
