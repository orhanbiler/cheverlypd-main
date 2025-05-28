'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';


// Status indicator component
function StatusBadge({ status }: { status: 'checking' | 'online' | 'offline' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return { color: 'bg-emerald-500', text: 'Online', pulse: true };
      case 'offline':
        return { color: 'bg-red-500', text: 'Offline', pulse: false };
      default:
        return { color: 'bg-amber-500', text: 'Checking', pulse: true };
    }
  };

  const config = getStatusConfig();
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.color} ${config.pulse ? 'animate-pulse' : ''}`} />
      <span className="text-xs text-gray-400 hidden sm:inline">{config.text}</span>
    </div>
  );
}

// Modern button component
function ActionButton({ 
  href, 
  children, 
  status, 
  variant = 'primary',
  disabled = false 
}: { 
  href?: string; 
  children: React.ReactNode; 
  status?: 'checking' | 'online' | 'offline';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    if (disabled) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700';
    }
    
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25';
      case 'secondary':
        return 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:border-gray-600';
      case 'outline':
        return 'border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white hover:bg-gray-800/50';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      {...(href && { href })}
      className={`
        relative inline-flex items-center gap-3 px-6 py-4 rounded-lg font-medium text-xl sm:text-2xl md:text-lg lg:text-xl
        transition-all duration-200 ease-out min-h-[52px] group
        ${getVariantClasses()}
        ${isLoading ? 'pointer-events-none' : ''}
        ${!disabled ? 'hover:translate-y-[-1px] active:translate-y-0' : ''}
      `}
      onClick={handleClick}
      disabled={disabled}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {status && <StatusBadge status={status} />}
      {disabled && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <span className={isLoading ? 'opacity-70' : ''}>{children}</span>
      {!disabled && (
        <svg 
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      )}
    </Component>
  );
}

// Typing animation component
function TypingTitle() {
  const [displayedText, setDisplayedText] = useState('');
  const [setIsComplete] = useState(false);
  
  const fullText = 'Cheverly Police Department';
  
  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, fullText]);

  return (
    <motion.h1 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
      style={{ color: 'var(--color-text-primary)' }}
    >
      {displayedText}
      <motion.span 
        className="inline-block w-1 h-12 sm:h-14 md:h-12 lg:h-14 xl:h-18 ml-2"
        style={{ backgroundColor: 'var(--color-accent-blue)' }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.h1>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Home() {  
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section - Mobile First */}
        <section className="relative px-4 py-0 sm:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div 
                variants={itemVariants}
                className="mb-8"
              >
                <Image 
                  src="/logo.png" 
                  alt="Cheverly Police Department Logo" 
                  width={140}
                  height={140}
                  className="mx-auto h-28 w-28 sm:h-32 sm:w-32 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32 opacity-90 drop-shadow-2xl shadow-blue-500/30 hover:drop-shadow-[0_25px_25px_rgba(59,130,246,0.4)] transition-all duration-300"
                  priority
                />
              </motion.div>
              <TypingTitle />
              <motion.p 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl max-w-4xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Secure access to training resources and department systems
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
              
              {/* Field Training Portal Card */}
              <motion.div 
                variants={cardVariants}
                className="glass-card-compact group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div 
                      className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: 'var(--color-accent-blue)' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg className="w-8 h-8" style={{ color: 'var(--color-text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>Field Training Portal</h3>
                      <p className="text-xl sm:text-2xl md:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Access training materials, submit reports, and track progress
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ActionButton
                        href="https://fieldtraining.cheverlypd.com"
                        variant="primary"
                      >
                        Access Portal
                      </ActionButton>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Policy Documentation Card */}
              <motion.div 
                variants={cardVariants}
                className="glass-card-compact group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <svg className="w-8 h-8" style={{ color: 'var(--color-text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>General Orders</h3>
                          <span className="inline-block px-3 py-1 text-base md:text-sm lg:text-base rounded-full" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
                            Coming Soon
                          </span>
                        </div>
                      </div>
                      <p className="text-xl sm:text-2xl md:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Department policies, procedures, and operational standards
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <ActionButton variant="outline" disabled>
                      In Development
                    </ActionButton>
                  </div>
                </div>
              </motion.div>

              {/* Guides & Tutorials Card */}
              <motion.div 
                variants={cardVariants}
                className="glass-card-compact group"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface)' }}>
                      <svg className="w-8 h-8" style={{ color: 'var(--color-text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Guides & Tutorials</h3>
                          <span className="inline-block px-3 py-1 text-base md:text-sm lg:text-base rounded-full" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
                            Coming Soon
                          </span>
                        </div>
                      </div>
                      <p className="text-xl sm:text-2xl md:text-lg lg:text-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        Training materials, how-to guides, and instructional resources
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <ActionButton variant="outline" disabled>
                      In Development
                    </ActionButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <motion.section 
          variants={itemVariants}
          className="px-4 py-2"
        >
          <div className="max-w-4xl mx-auto">
            <div className="glass-card-compact">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {[
                  { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", bgColor: 'var(--color-accent-green)', textColor: 'var(--color-accent-green)', title: "24/7 Access", desc: "Always available when you need it" },
                  { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", bgColor: 'var(--color-accent-blue)', textColor: 'var(--color-accent-blue)', title: "Secure", desc: "Enterprise-grade security" },
                  { icon: "M13 10V3L4 14h7v7l9-11h-7z", bgColor: 'var(--color-accent-purple)', textColor: 'var(--color-accent-purple)', title: "Fast", desc: "Optimized for performance" }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="space-y-4"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: feature.bgColor }}>
                      <svg className="w-6 h-6" style={{ color: 'var(--color-text-primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-2xl sm:text-3xl md:text-xl lg:text-2xl" style={{ color: feature.textColor }}>{feature.title}</h4>
                    <p className="text-xl sm:text-2xl md:text-base lg:text-lg" style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          variants={itemVariants}
          className="mt-20"
          style={{ borderTop: `1px solid var(--color-border)` }}
        >
          <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <Image 
                  src="/logo.png" 
                  alt="Cheverly Police Department Logo" 
                  width={32}
                  height={32}
                  className="w-8 h-8 opacity-80"
                />
                <span className="font-medium text-2xl sm:text-3xl md:text-xl lg:text-2xl" style={{ color: 'var(--color-text-secondary)' }}>Cheverly Police Department</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-base lg:text-lg" style={{ color: 'var(--color-text-muted)' }}>
                © 2024 All rights reserved
              </p>
            </div>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}