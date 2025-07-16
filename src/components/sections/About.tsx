import React, { useState } from 'react';
import Section from '../layout/Section';
//import Image from 'next/image';

const AboutUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Placeholder images for the carousel
  const teamImages = [
    { id: 1, alt: "Team working in office" },
    { id: 2, alt: "Team meeting" },
    { id: 3, alt: "Team collaboration" },
  ];

  const stats = [
    { value: "2.7K", label: "Users" },
    { value: "1.8K", label: "Subscriptions" },
    { value: "112", label: "Downloads" },
    { value: "4", label: "Products" },
  ];

  return (
    <Section id="about" className="w-full py-24 bg-[#2E2E38] text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
          {/* Left Column - Image Carousel */}
          <div className="lg:w-1/2">
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              {/* Carousel placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3D3D48] to-[#2A2A34] flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-12 w-12 text-gray-400" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg">Team carousel images</p>
                  
                  {/* Carousel indicators */}
                  <div className="flex justify-center mt-8 space-x-2">
                    {teamImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          currentSlide === index ? 'bg-[#FFE600]' : 'bg-gray-600'
                        }`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:w-1/2">
            <h2 
              className="text-5xl font-bold mb-8"
              style={{ 
                fontFamily: 'Interstate, sans-serif',
                fontWeight: 700,
                letterSpacing: '-0.5px'
              }}
            >
              About Us
            </h2>
            
            <div className="space-y-6 mb-10">
              <p 
                className="text-gray-300 text-xl leading-relaxed"
                style={{ fontFamily: 'Interstate, sans-serif', fontWeight: 400 }}
              >
                Join us behind the scenes and discover the passion driving our work in AI-powered design.
              </p>
              
              <p 
                className="text-gray-300 text-xl leading-relaxed"
                style={{ fontFamily: 'Interstate, sans-serif', fontWeight: 400 }}
              >
                We&apos;re a diverse team of designers, researchers, and strategists united by a mission: to create thoughtful, user-centered products that evolve with technology and human needs.
              </p>
              
              <p 
                className="text-gray-300 text-xl leading-relaxed"
                style={{ fontFamily: 'Interstate, sans-serif', fontWeight: 400 }}
              >
                Specializing in AI simulation and product maturity, we help teams move from early concepts to intelligent, scalable solutions.
              </p>
              
              <p 
                className=" text-xl leading-relaxed mt-10"
                style={{ fontFamily: 'Interstate, sans-serif', fontWeight: 400 , color: '#FFE600' }}
              >
                Visit us to meet the people shaping tomorrow&apos;s experiences with meaningful design and adaptive AI.
              </p>
            </div>
          </div>
        </div>
        
        
        
        {/* Stats Grid - Centered below button */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div 
                className="text-5xl font-bold mb-3"
                style={{ 
                  fontFamily: 'Interstate, sans-serif',
                  fontWeight: 700,
                  color: '#FFE600'
                }}
              >
                {stat.value}
              </div>
              <div 
                className="text-gray-400 text-lg"
                style={{ fontFamily: 'Interstate, sans-serif', fontWeight: 400 }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AboutUs;