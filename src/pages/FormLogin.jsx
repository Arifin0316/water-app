import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Refs for animations
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const buttonRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set([titleRef.current, emailRef.current, passwordRef.current, buttonRef.current, linksRef.current], {
      opacity: 0,
      y: 20
    });

    // Create entrance animation
    const tl = gsap.timeline();

    tl.to(formRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 0,
      ease: "power3.out"
    })
    .to(titleRef.current, {
      duration: 0.5,
      opacity: 1,
      y: 0,
      ease: "back.out"
    })
    .to([emailRef.current, passwordRef.current], {
      duration: 0.5,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "power2.out"
    })
    .to([buttonRef.current, linksRef.current], {
      duration: 0.5,
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Cleanup
    return () => tl.kill();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      
      // Shake animation for error
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.out"
      });
      return;
    }

    console.log('Logging in with:', { email, password });
    setEmail('');
    setPassword('');
    setError('');
  };

  // Hover animation for button
  const handleButtonHover = (enter) => {
    gsap.to(buttonRef.current, {
      scale: enter ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl -top-10 -right-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl -bottom-10 -left-10 animate-pulse"></div>

      <div 
        ref={formRef}
        className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-white/60 mt-2">Please sign in to continue</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm py-2 px-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div ref={emailRef}>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div ref={passwordRef}>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-blue-500/40 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div ref={buttonRef} className="flex items-center justify-between">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300"
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
            >
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>

            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Forgot Password?
            </a>
          </div>
        </form>

        <div ref={linksRef} className="text-sm text-center text-white/60 mt-8">
          Don't have an account?{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
            Sign up here
          </a>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;