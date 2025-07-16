/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const NavigationContext = createContext({
  activeSection: 'hero',
  setActiveSection: (section: string) => {},
  registerSection: (id: string, ref: HTMLElement) => {},
  scrollToSection: (id: string) => {},
  sections: {} as Record<string, HTMLElement>
});

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [sections, setSections] = useState<Record<string, HTMLElement>>({});

  const registerSection = (id: string, ref: HTMLElement) => {
    setSections(prev => ({ ...prev, [id]: ref }));
  };

  const scrollToSection = useCallback((id: string) => {
    if (sections[id]) {
      sections[id].scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  }, [sections]);

  // Handle initial hash on page load
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && sections[hash]) {
      scrollToSection(hash);
    }
  }, [sections, scrollToSection]);

  return (
    <NavigationContext.Provider value={{ 
      activeSection, 
      setActiveSection,
      registerSection,
      scrollToSection,
      sections
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);