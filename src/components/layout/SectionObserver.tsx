import { useEffect } from "react";
import { useNavigation } from "./NavigationContext";

const SectionObserver = () => {
  const { sections, setActiveSection } = useNavigation();

  useEffect(() => {
    // Buffer zone (px) to prevent section flip
    const BUFFER_ZONE = 150;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      let newActiveSection = Object.keys(sections)[0] || "hero";
      let minDistance = Infinity;

      // Find section closest to viewport center
      Object.entries(sections).forEach(([id, element]) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionCenter = sectionTop + rect.height / 2;
        const viewportCenter = scrollPosition + viewportHeight / 2;

        // Distance from section center to viewport center
        const distance = Math.abs(sectionCenter - viewportCenter);

        // Only consider sections within buffer zone of viewport
        const isInView =
          rect.top < viewportHeight - BUFFER_ZONE && rect.bottom > BUFFER_ZONE;

        if (isInView && distance < minDistance) {
          minDistance = distance;
          newActiveSection = id;
        }
      });

      setActiveSection(newActiveSection);
    };

    // Add scroll listener with throttling
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [sections, setActiveSection]);

  return null;
};

export default SectionObserver;
