'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

// Portal status checker
function usePortalStatus(url: string) {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Use a simple approach - try to fetch the URL
        await fetch(url, { 
          method: 'HEAD', 
          mode: 'no-cors',
          cache: 'no-cache'
        });
        setStatus('online');
      } catch {
        setStatus('offline');
      }
    };
    
    checkStatus();
    
    // Check status every 5 minutes
    const interval = setInterval(checkStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [url]);
  
  return status;
}

// Loading button component
function LoadingButton({ href, children, className, status }: { 
  href: string; 
  children: React.ReactNode; 
  className: string;
  status: 'checking' | 'online' | 'offline';
}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    setIsLoading(true);
    // Reset loading state after navigation attempt
    setTimeout(() => setIsLoading(false), 3000);
  };
  
  const getStatusIndicator = () => {
    switch (status) {
      case 'online':
        return <span className="status-indicator status-online"></span>;
      case 'offline':
        return <span className="status-indicator status-offline"></span>;
      default:
        return <span className="status-indicator status-unknown"></span>;
    }
  };
  
  return (
    <a 
      href={href}
      className={`${className} ${isLoading ? 'loading' : ''}`}
      onClick={handleClick}
      aria-label={`${children} - Status: ${status}`}
    >
      {getStatusIndicator()}
      {children}
    </a>
  );
}

// Typewriter component for the hero text
function TypewriterText() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const lines = useMemo(() => ['Cheverly Police', 'Department'], []);
  const typingSpeed = 100; // milliseconds per character
  const lineDelay = 500; // delay between lines
  const cursorBlinkSpeed = 530; // cursor blink interval

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timer = setTimeout(() => {
          setDisplayedText(prev => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        }, typingSpeed);

        return () => clearTimeout(timer);
      } else {
        // Line is complete, move to next line after delay
        if (currentLineIndex < lines.length - 1) {
          const timer = setTimeout(() => {
            setDisplayedText(prev => prev + '\n');
            setCurrentLineIndex(prev => prev + 1);
            setCurrentCharIndex(0);
          }, lineDelay);

          return () => clearTimeout(timer);
        }
      }
    }
  }, [currentCharIndex, currentLineIndex, lines]);

  return (
    <div className="relative w-full text-center">
      {/* Subtle Spotlight effect background */}
      <div className="absolute inset-0 -top-24 -bottom-24 -left-24 -right-24 bg-gradient-radial from-white/8 via-blue-200/5 via-cyan-300/4 to-transparent blur-3xl opacity-60"></div>
      <div className="absolute inset-0 -top-16 -bottom-16 -left-16 -right-16 bg-gradient-radial from-cyan-300/10 via-blue-300/6 to-transparent blur-2xl opacity-50"></div>
      
      {/* Text content */}
      <h1 className="relative z-10 text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-8 leading-tight min-h-[120px] sm:min-h-[200px] md:min-h-[300px] text-shadow-light text-center w-full">
        {displayedText.split('\n').map((line, index) => (
          <div key={index} className="w-full text-center">
            {index === 0 ? line : <span className="text-gradient">{line}</span>}
            {index === displayedText.split('\n').length - 1 && (
              <span className={`inline-block w-1 h-12 sm:h-16 md:h-24 bg-[var(--color-accent-blue)] ml-1 sm:ml-2 shadow-lg shadow-blue-500/50 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
            )}
          </div>
        ))}
      </h1>
    </div>
  );
}

export default function Home() {
  const fieldTrainingStatus = usePortalStatus('https://fieldtraining.cheverlypd.com');
  
  return (
    <div className="min-h-screen modern-gradient grid-pattern">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-40 px-4 sm:px-6 hero-section">
        <div className="max-w-4xl mx-auto text-center w-full">
          {/* Logo */}
          <div className="mb-8 sm:mb-16 animate-fade-in">
            <Image 
              src="/logo.png" 
              alt="Cheverly Police Department Logo" 
              width={200}
              height={200}
              className="mx-auto h-32 sm:h-40 md:h-52 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
              priority
            />
          </div>
          
          <div className="animate-fade-in-up w-full" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
            <TypewriterText />
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in px-4" style={{animationDelay: '3.5s', animationFillMode: 'both'}}>
            Access your training materials and department policies through our secure portals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-6 services-section">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Field Training Portal */}
            <div className="glass-card p-10 group animate-fade-in-up" style={{animationDelay: '4s', animationFillMode: 'both'}}>
              <div className="icon-container bg-[var(--color-accent-blue)] w-20 h-20 mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Field Training Portal</h3>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Access training materials, submit reports, and track your progress through our comprehensive field training system.
              </p>
              <LoadingButton
                href="https://fieldtraining.cheverlypd.com"
                className="btn-modern btn-primary text-lg px-8 py-4 group/btn"
                status={fieldTrainingStatus}
              >
                Access Portal
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </LoadingButton>
            </div>

            {/* Policy Documentation */}
            <div className="glass-card p-10 group animate-fade-in-up relative" style={{animationDelay: '4.5s', animationFillMode: 'both'}}>
              {/* Development Banner */}
              <div className="absolute top-4 right-4 bg-orange-500/20 border border-orange-500/40 rounded-full px-3 py-1">
                <span className="text-orange-300 text-xs font-medium">In Development</span>
              </div>
              
              <div className="icon-container bg-[var(--color-text-muted)] w-20 h-20 mb-8 opacity-60">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6 opacity-75">Policy Documentation</h3>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed opacity-75">
                Review department policies, procedures, and operational standards. Stay updated with the latest guidelines.
              </p>
              <button
                disabled
                className="btn-modern btn-disabled text-lg px-8 py-4 cursor-not-allowed opacity-50"
                aria-label="Policy portal is currently in development"
              >
                <span className="status-indicator bg-orange-400"></span>
                Coming Soon
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] mt-32">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Cheverly Police Department Logo" 
                width={32}
                height={32}
                className="h-8 w-auto opacity-80"
              />
              <span className="text-white font-medium">Cheverly Police Department</span>
            </div>
            <p className="text-[var(--color-text-muted)] text-sm">
              © 2024 Cheverly Police Department. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}