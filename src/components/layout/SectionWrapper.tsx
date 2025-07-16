"use client";

import React, { forwardRef, useEffect, useRef } from 'react';
import { useNavigation } from './NavigationContext';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; // Optional style prop for inline styles
}

const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(({ 
  id, 
  children, 
  className = '', 
  style 
}, ref) => {
  const internalRef = useRef<HTMLElement>(null);
  const { registerSection } = useNavigation();
  const resolvedRef = (ref || internalRef) as React.RefObject<HTMLElement>;
  
  useEffect(() => {
    if (resolvedRef.current) {
      registerSection(id, resolvedRef.current);
    }
  }, [id, registerSection, resolvedRef]);

  return (
    <section 
      id={id}
      ref={resolvedRef}
      className={className}
      style={style} 
    >
      {children}
    </section>
  );
});

SectionWrapper.displayName = 'SectionWrapper';

export default SectionWrapper;