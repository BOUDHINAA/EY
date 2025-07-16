import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Section from '../layout/Section';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch  {
          console.log("Autoplay prevented, trying with mute");
          videoRef.current.muted = true;
          await videoRef.current.play();
        }
      }
    };

    playVideo();
  }, []);

  return (
    <Section
      id="hero"
      ref={sectionRef}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-[93vh]"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/AI%20Simulation%20Promo%20Video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Video overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(84, 112, 125, 0.7) 0%, rgba(46, 46, 56, 0.8) 100%)",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 py-16 text-center flex flex-col items-center">
        <div className="mb-8">
          <h1
            className="mb-6 text-white"
            style={{
              fontFamily: "Interstate, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.1,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Empower your <br /> journey with{" "}
            <span className="inline-block mt-2" style={{ color: "#FFE600" }}>
              AI maturity
            </span>
          </h1>

          <p
            className="mb-8 text-white opacity-90 max-w-2xl mx-auto"
            style={{
              fontFamily: "Interstate, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            Our platform helps assess your organization&apos;s AI readiness and
            provides tailored, innovative solutions to accelerate transformation
            and drive strategic impact.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link
            href="/survey"
            className="px-8 py-3 rounded-md text-black transition-all transform hover:scale-105 duration-300 shadow-lg hover:shadow-xl"
            style={{
              backgroundColor: "#FFE600",
              fontFamily: "Interstate, sans-serif",
              fontWeight: 500,
              fontSize: "1.1rem",
              minWidth: "200px",
            }}
          >
            Take Survey
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-auto">
          <a href="#sponsors" className="block">
            <svg
              className="mx-auto animate-bounce"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L19 12M12 19L5 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-white text-sm mt-2 block">
              Scroll to explore
            </span>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;