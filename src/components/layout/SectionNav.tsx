import React from "react";
import { useNavigation } from "./NavigationContext";

const SectionNav = () => {
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

  return (
    <nav className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 z-50">
      <div className="flex flex-col gap-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSection === section
                ? "bg-yellow-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </nav>
  );
};

export default SectionNav;
