"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import type { CSSProperties } from "react";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function SurveyWelcome() {
  // Inline styles cast to CSSProperties:
  const avatarWrapperStyle = {
    boxShadow: "0 0 28px #ffe60099, 0 2px 12px #0008",
    borderRadius: "1.5rem",
    overflow: "visible",
    background: "#252930",
    border: "4px solid #ffe600",
  } as CSSProperties;

  const scanlineStyle = {
    background:
      "repeating-linear-gradient(0deg, transparent, transparent 5px, #222 6px)",
  } as CSSProperties;

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-[#191c22] px-4 relative ${pressStart.className}`}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={scanlineStyle}
      />

      <motion.div
        initial={{ scale: 0.8, y: -30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="mb-8 z-10"
        style={avatarWrapperStyle}
      >
        <Image
          src="/robot.png"
          alt="AI Pixel Robot"
          width={176}
          height={176}
          style={
            {
              imageRendering: "pixelated",
              borderRadius: "1.2rem",
            } as CSSProperties
          }
        />
      </motion.div>

      <motion.h1
        initial={{ letterSpacing: "0.01em", opacity: 0, scale: 0.85 }}
        animate={{ letterSpacing: "0.13em", opacity: 1, scale: 1 }}
        transition={{ delay: 0.38, type: "spring" }}
        className="text-3xl sm:text-4xl text-[#ffe600] drop-shadow-[0_2px_16px_#ffe60077] font-bold mb-4 z-10 tracking-widest text-center"
      >
        <span style={{ color: "#fff", WebkitTextStroke: "2px #ffe600" }}>
          AI MATURITY QUEST
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52 }}
        className="text-white/80 text-sm sm:text-base mb-8 max-w-xs text-center z-10"
      >
        <span className="text-[#ffe600]">Welcome Challenger!</span>
        <br />
        Are you ready to{" "}
        <span className="font-extrabold text-white">Level Up</span> your AI
        Skills?
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="z-10"
      >
        <Link href="/survey/step">
          <button
            className="bg-[#ffe600] border-[3px] border-black hover:bg-yellow-400 text-black px-10 py-3 rounded-lg text-xl shadow-[0_4px_24px_#ffe60055] font-extrabold tracking-widest relative transition-all duration-150 hover:scale-110 active:scale-95 outline-dashed outline-2 outline-offset-2 outline-[#ffe600]"
            style={{ fontFamily: "inherit" } as CSSProperties}
          >
            ▶ START GAME
          </button>
        </Link>
      </motion.div>

      <div className="text-xs text-center text-yellow-400 opacity-90 mt-12 mb-2 z-10 tracking-wide">
        © {new Date().getFullYear()} | Powered by EY &nbsp; | &nbsp;
        <span className="text-white">Insert Coin 💰</span>
      </div>
    </div>
  );
}
