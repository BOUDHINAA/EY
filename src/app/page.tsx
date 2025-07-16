"use client"
import AboutUs from "@/components/sections/About";

import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import  Hero  from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Newsletter } from "@/components/sections/Newsletter";
import { Pricing } from "@/components/sections/Pricing";
import { ScrollToTop } from "@/components/sections/ScrollToTop";
import Sponsors from "@/components/sections/Sponsors";

import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import React from "react";
import { Services

 } from "@/components/sections/Services";
import { NavigationProvider } from "./context/NavigationContext";
import SectionObserver from "@/components/layout/SectionObserver";
import AnimatedSectionNav from "@/components/layout/AnimatedSectionNav";

export default function HomePage() {
  return (
    <NavigationProvider>
      <AnimatedSectionNav />
      <SectionObserver />
      <Hero />
      <Sponsors />
      <AboutUs />
      <HowItWorks />
      <Features />
      <Services />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </NavigationProvider>
    
  );
}