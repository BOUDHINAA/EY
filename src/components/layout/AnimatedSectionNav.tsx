import React from "react";
import { motion } from "framer-motion";
import { useNavigation } from "./NavigationContext";

const AnimatedSectionNav = () => {
  const { activeSection, scrollToSection } = useNavigation();

  // Update this array to match your actual section IDs in order
  const sections = [
    "hero",
    "sponsors",
    "about",
    "how-it-works",
    "features",
    "services",
    "testimonials",
    "pricing",
    "newsletter",
    "faq",
  ];

  // Calculate positions for the wavy line
  const getWavePoints = () => {
    const height = sections.length * 50 - 50;
    const points = [];

    for (let i = 0; i <= 100; i++) {
      const x = i;
      // Sine wave calculation for smooth wave effect
      const y = 25 * Math.sin(i / 10) + (i * height) / 100;
      points.push(`${x}% ${y}%`);
    }

    return points.join(", ");
  };

  return (
    <motion.nav
      className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-full">
        {/* Wavy line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full overflow-hidden">
          <motion.div
            className="absolute w-full h-full"
            initial={{ y: -100 }}
            animate={{ y: 100 }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d={`M ${getWavePoints()}`}
                fill="none"
                stroke="#FFE600"
                strokeWidth="2"
                strokeDasharray="5, 5"
                opacity="0.7"
              />
            </svg>
          </motion.div>
        </div>

        {/* Glowing trail effect */}
        <motion.div
          className="absolute top-0 left-1/2 w-2 h-full transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFE600]/20 to-transparent" />
        </motion.div>

        {/* Navigation dots */}
        <div className="relative flex flex-col items-center justify-between h-full py-2">
          {sections.map((section, index) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              className="relative z-10 w-6 h-6 rounded-full focus:outline-none flex items-center justify-center"
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to ${section} section`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {/* Dot */}
              <motion.div
                className={`absolute rounded-full ${
                  activeSection === section
                    ? "bg-[#FFE600] shadow-[0_0_15px_3px_rgba(255,230,0,0.7)]"
                    : "bg-gray-300"
                }`}
                animate={{
                  scale: activeSection === section ? [1, 1.2, 1] : 1,
                  boxShadow:
                    activeSection === section
                      ? [
                          "0 0 0 0 rgba(255,230,0,0.4)",
                          "0 0 0 10px rgba(255,230,0,0)",
                          "0 0 0 0 rgba(255,230,0,0)",
                        ]
                      : "0 0 0 0 rgba(0,0,0,0)",
                }}
                transition={{
                  scale: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  },
                }}
                style={{
                  width: activeSection === section ? "16px" : "12px",
                  height: activeSection === section ? "16px" : "12px",
                }}
              />

              {/* 3D effect */}
              {activeSection === section && (
                <>
                  <motion.div
                    className="absolute rounded-full bg-[#FFE600] opacity-70"
                    animate={{
                      scale: [1, 1.8],
                      opacity: [0.7, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    style={{ width: "16px", height: "16px" }}
                  />
                  <motion.div
                    className="absolute rounded-full bg-white opacity-30"
                    animate={{
                      scale: [1, 1.5],
                      opacity: [0.3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: "easeOut",
                    }}
                    style={{ width: "16px", height: "16px" }}
                  />
                </>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default AnimatedSectionNav;
