"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function AnimatedGreetingScreen() {
  const avatarSrc = "https://tenor.com/fr/view/man-talking-presenter-gif-9847167"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] px-4">
      
      {/* Avatar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        <Image
          src={avatarSrc}
          alt="Speaking Avatar"
          width={128}
          height={128}
          className="rounded-full"
        />
      </motion.div>

      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="mt-4 bg-white px-4 py-3 rounded-lg shadow-lg text-gray-800 text-base max-w-xs text-center"
      >
        👋 Hello! Welcome back — ready to start?
      </motion.div>

      {/* Pixel-Styled Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8"
      >
        <Link href="/start">
          <div className="inline-block">
            <div className="bg-black p-1">
              <div className="bg-yellow-400 px-8 py-3 font-bold pixel-button text-lg select-none">
                Start Game
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
