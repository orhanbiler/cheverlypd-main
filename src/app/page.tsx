'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

// Portal status checker
function usePortalStatus(url: string) {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  useEffect(() => {
    const checkStatus = async () => {
      try {
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
    const interval = setInterval(checkStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [url]);
  
  return status;
}

// Compact loading button component
function LoadingButton({ href, children, className, status }: { 
  href: string; 
  children: React.ReactNode; 
  className: string;
  status: 'checking' | 'online' | 'offline';
}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    setIsLoading(true);
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

// Simplified typewriter component
function CompactTypewriter() {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  const fullText = 'Cheverly Police Department';
  
  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, fullText]);

  return (
    <div className="relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-2 leading-tight text-center sm:text-left">
        {displayedText}
        {!isComplete && (
          <span className="inline-block w-0.5 h-8 sm:h-10 md:h-12 bg-[var(--color-accent-blue)] ml-1 animate-pulse"></span>
        )}
      </h1>
    </div>
  );
}

export default function Home() {
  const fieldTrainingStatus = usePortalStatus('https://fieldtraining.cheverlypd.com');
  
  return (
    <div className="min-h-screen modern-gradient">
      {/* Compact Hero Section */}
      <section className="relative py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header with logo and title */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8">
            <div className="animate-fade-in">
              <Image 
                src="/logo.png" 
                alt="Cheverly Police Department Logo" 
                width={120}
                height={120}
                className="h-20 sm:h-24 md:h-28 w-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                priority
              />
            </div>
            
            <div className="animate-fade-in-up flex-1 text-center sm:text-left hero-content-container" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
              <CompactTypewriter />
              <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                Access your training materials and department policies through our secure portals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Services Grid */}
      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Field Training Portal */}
            <div className="glass-card-compact group animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
              <div className="flex items-start gap-4">
                <div className="icon-container-compact bg-[var(--color-accent-blue)] flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-2">Field Training Portal</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                    Access training materials, submit reports, and track your progress through our comprehensive field training system.
                  </p>
                  <LoadingButton
                    href="https://fieldtraining.cheverlypd.com"
                    className="btn-modern-compact btn-primary text-sm px-4 py-2 group/btn"
                    status={fieldTrainingStatus}
                  >
                    Access Portal
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </LoadingButton>
                </div>
              </div>
            </div>

            {/* Policy Documentation */}
            <div className="glass-card-compact group animate-fade-in-up relative" style={{animationDelay: '0.8s', animationFillMode: 'both'}}>
              <div className="flex items-start gap-4">
                <div className="icon-container-compact bg-[var(--color-text-muted)] opacity-60 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white opacity-75 flex-1">Policy Documentation</h3>
                    {/* Development Banner - moved inside content area */}
                    <div className="bg-orange-500/20 border border-orange-500/40 rounded-full px-2 py-1 flex-shrink-0">
                      <span className="text-orange-300 text-xs font-medium">In Development</span>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed opacity-75">
                    Review department policies, procedures, and operational standards. Stay updated with the latest guidelines.
                  </p>
                  <button
                    disabled
                    className="btn-modern-compact btn-disabled text-sm px-4 py-2 cursor-not-allowed opacity-50"
                    aria-label="Policy portal is currently in development"
                  >
                    <span className="status-indicator bg-orange-400"></span>
                    Coming Soon
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card-compact animate-fade-in-up" style={{animationDelay: '1s', animationFillMode: 'both'}}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-[var(--color-accent-blue)]">24/7</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Portal Access</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-[var(--color-accent-green)]">Secure</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Data Protection</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-[var(--color-accent-purple)]">Modern</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Interface</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="border-t border-[var(--color-border)] mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/logo.png" 
                alt="Cheverly Police Department Logo" 
                width={24}
                height={24}
                className="h-6 w-auto opacity-80"
              />
              <span className="text-white font-medium text-sm">Cheverly Police Department</span>
            </div>
            <p className="text-[var(--color-text-muted)] text-xs">
              © 2024 Cheverly Police Department. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}