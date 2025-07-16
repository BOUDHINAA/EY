import React, { useRef } from 'react';
import Image from 'next/image';
import GSMA_Logo from '../../../public/GSMA-Logo-Black-RGB 1.png';
import Frame61_Logo from '../../../public/Frame 61 1.png';
import MaskGroup1_Logo from '../../../public/Mask group-1.png';
import MaskGroup2_Logo from '../../../public/Mask group-2.png';
import MaskGroup_Logo from '../../../public/Mask group.png';
import Section from '@/components/layout/Section'; 

const SponsorsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  return (
    <Section 
      id="sponsors" 
      ref={sectionRef} 
      className="w-full py-24 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[50px] leading-[1.1] font-bold text-foreground mb-4 tracking-tight">
            Our Sponsors & partners
          </h2>
        </div>
        
        {/* Sponsors Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center justify-center">
          {/* Sponsor 1: GSMA */}
          <div className="flex items-center justify-center h-32">
            <Image 
              src={GSMA_Logo} 
              alt="GSMA Logo" 
              className="object-contain max-h-24 w-auto"
              width={160} 
              height={80}
              quality={100}
            />
          </div>
          
          {/* Sponsor 2: World Bank Group */}
          <div className="flex items-center justify-center h-32">
            <Image 
              src={Frame61_Logo} 
              alt="World Bank Group Logo" 
              className="object-contain max-h-24 w-auto"
              width={160} 
              height={80}
              quality={100}
            />
          </div>
          
          {/* Sponsor 3 */}
          <div className="flex items-center justify-center h-32">
            <Image 
              src={MaskGroup_Logo} 
              alt="Sponsor Logo 3" 
              className="object-contain max-h-24 w-auto"
              width={160} 
              height={80}
              quality={100}
            />
          </div>
          
          {/* Sponsor 4 */}
          <div className="flex items-center justify-center h-32">
            <Image 
              src={MaskGroup2_Logo} 
              alt="Sponsor Logo 2" 
              className="object-contain max-h-24 w-auto"
              width={160} 
              height={80}
              quality={100}
            />
          </div>

          {/* Sponsor 5 */}
          <div className="flex items-center justify-center h-32">
            <Image 
              src={MaskGroup1_Logo} 
              alt="Sponsor Logo 1" 
              className="object-contain max-h-24 w-auto"
              width={160} 
              height={80}
              quality={100}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default SponsorsSection;