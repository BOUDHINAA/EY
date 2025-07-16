import React, { forwardRef, useEffect, useRef } from "react";
import { useNavigation } from "./NavigationContext";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = "" }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const { registerSection } = useNavigation();
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLElement>;

    useEffect(() => {
      if (resolvedRef.current) {
        registerSection(id, resolvedRef.current);
      }
    }, [id, registerSection, resolvedRef]);

    return (
      <section id={id} ref={resolvedRef} className={className}>
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;
