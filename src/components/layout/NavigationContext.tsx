"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface NavigationContextType {
  activeSection: string;
  sections: Record<string, HTMLElement>;
  setActiveSection: (id: string) => void;
  registerSection: (id: string, ref: HTMLElement) => void;
  scrollToSection: (id: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [sections, setSections] = useState<Record<string, HTMLElement>>({});

  const registerSection = useCallback((id: string, ref: HTMLElement) => {
    setSections((prev) => ({ ...prev, [id]: ref }));
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      if (sections[id]) {
        window.scrollTo({
          top: sections[id].offsetTop,
          behavior: "smooth",
        });
        setActiveSection(id);
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [sections]
  );

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && sections[hash]) {
      scrollToSection(hash);
    }
  }, [sections, scrollToSection]);
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && sections[hash]) {
        scrollToSection(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [sections, scrollToSection]);

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        sections,
        setActiveSection,
        registerSection,
        scrollToSection,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
