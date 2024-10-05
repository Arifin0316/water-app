import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cloud, Sun, Sparkles } from 'lucide-react';

const AboutUs = () => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const cloudRef = useRef(null);
  const sunRef = useRef(null);
  const sparklesRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set([cardRef.current, titleRef.current, ".text-content"], {
      opacity: 0
    });
    
    gsap.set([cloudRef.current, sunRef.current, sparklesRef.current], {
      opacity: 0,
      scale: 0
    });

    // Initial animations
    const tl = gsap.timeline();
    
    tl.to(cardRef.current, {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power4.out"
    })
    .to(titleRef.current, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      ease: "back.out"
    }, "-=0.5")
    .to([cloudRef.current, sunRef.current, sparklesRef.current], {
      duration: 0.8,
      scale: 1,
      opacity: 1,
      stagger: 0.2,
      ease: "elastic.out"
    }, "-=0.5")
    .to(".text-content", {
      duration: 0.8,
      x: 0,
      opacity: 1,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.3");

    // Floating animation for icons
    gsap.to([cloudRef.current, sunRef.current, sparklesRef.current], {
      y: -10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "power1.inOut",
      delay: 1
    });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 overflow-hidden">
      <div 
        ref={cardRef}
        className="relative bg-white/90 backdrop-blur-xl p-12 rounded-2xl shadow-2xl w-full max-w-4xl transform hover:scale-[1.02] transition-transform duration-300"
        style={{ opacity: 0, transform: 'translateY(100px)' }}
      >
        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-400 to-indigo-600 w-24 h-24 rounded-full opacity-50 blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-400 to-pink-600 w-24 h-24 rounded-full opacity-50 blur-xl"></div>
        
        {/* Icons */}
        <div className="flex justify-center gap-8 mb-8">
          <div ref={cloudRef}>
            <Cloud className="text-blue-500 w-12 h-12" />
          </div>
          <div ref={sunRef}>
            <Sun className="text-yellow-500 w-12 h-12" />
          </div>
          <div ref={sparklesRef}>
            <Sparkles className="text-purple-500 w-12 h-12" />
          </div>
        </div>

        <h2 
          ref={titleRef}
          className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8"
          style={{ opacity: 0, transform: 'translateY(-50px)' }}
        >
          About Us
        </h2>

        <div ref={contentRef} className="space-y-6">
          <p className="text-content text-lg text-slate-700 leading-relaxed" style={{ opacity: 0, transform: 'translateX(-50px)' }}>
            Welcome to our weather app! We are a dedicated team passionate about bringing you accurate, real-time weather information. Our mission is to help you plan your day with the most reliable weather forecasts available.
          </p>

          <p className="text-content text-lg text-slate-700 leading-relaxed" style={{ opacity: 0, transform: 'translateX(-50px)' }}>
            Our team works tirelessly to ensure that our data is up-to-date and accessible. We believe in the power of technology to make your life easier, and we aim to deliver a smooth, intuitive user experience through our app.
          </p>

          <p className="text-content text-lg text-slate-700 leading-relaxed" style={{ opacity: 0, transform: 'translateX(-50px)' }}>
            Thank you for trusting us with your weather needs. If you have any questions or feedback, feel free to reach out!
          </p>
        </div>

        {/* Contact Button */}
        <div className="mt-8 text-center">
          <button 
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;