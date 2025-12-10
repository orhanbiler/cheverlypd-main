'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Service data
const services = [
  {
    id: 'field-training',
    title: 'Field Training',
    subtitle: 'Portal',
    description: 'Access training materials, submit reports, and track progress',
    href: 'https://fieldtraining.cheverlypd.com',
    status: 'live',
    gradient: 'from-blue-600 via-blue-800 to-blue-950',
    accentColor: '#3b82f6',
    image: '/FieldTraining.png',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'crime-map',
    title: 'Crime',
    subtitle: 'Map',
    description: 'Interactive crime mapping and incident tracking',
    href: 'https://crimes-black.vercel.app/',
    status: 'live',
    gradient: 'from-red-600 via-red-800 to-red-950',
    accentColor: '#ef4444',
    image: null,
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'wmata',
    title: 'WMATA',
    subtitle: 'Metro',
    description: 'Real-time Metro schedule and transit information',
    href: 'https://metro-schedule.vercel.app/login',
    status: 'live',
    gradient: 'from-emerald-600 via-emerald-800 to-emerald-950',
    accentColor: '#10b981',
    image: '/Schedule.png',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: 'it-management',
    title: 'IT',
    subtitle: 'Management',
    description: 'Manage ORI, PID, serial numbers, and department equipment',
    href: 'https://management-murex.vercel.app',
    status: 'live',
    gradient: 'from-cyan-600 via-cyan-800 to-cyan-950',
    accentColor: '#06b6d4',
    image: '/IT-Management.png',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'general-orders',
    title: 'General',
    subtitle: 'Orders',
    description: 'Department policies, procedures, and operational standards',
    href: '#',
    status: 'coming-soon',
    gradient: 'from-amber-600 via-amber-800 to-amber-950',
    accentColor: '#f59e0b',
    image: null,
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'guides',
    title: 'Guides &',
    subtitle: 'Tutorials',
    description: 'Training materials, how-to guides, and instructional resources',
    href: '#',
    status: 'coming-soon',
    gradient: 'from-purple-600 via-purple-800 to-purple-950',
    accentColor: '#a855f7',
    image: null,
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// Floating Particles Component - Only renders on client to avoid hydration mismatch
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side
    const generated = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Command Palette / Quick Search
function CommandPalette({ 
  isOpen, 
  onClose,
  onSelect 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onSelect: (href: string) => void;
}) {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-xl mx-4 bg-[#1a1a1f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-white text-lg placeholder-gray-500 outline-none"
          />
          <kbd className="px-2 py-1 text-xs text-gray-500 bg-white/5 rounded">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filteredServices.length === 0 ? (
            <div className="px-4 py-8 text-center text-gray-500">
              No services found
            </div>
          ) : (
            filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  if (service.status === 'live') {
                    onSelect(service.href);
                    onClose();
                  }
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors text-left ${
                  service.status === 'coming-soon' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${service.accentColor}20`, color: service.accentColor }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {service.id === 'field-training' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    )}
                    {service.id === 'crime-map' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    )}
                    {service.id === 'wmata' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    )}
                    {service.id === 'it-management' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    )}
                    {service.id === 'general-orders' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {service.id === 'guides' && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    )}
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      {service.title} {service.subtitle}
                    </span>
                    {service.status === 'live' ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    ) : (
                      <span className="text-xs text-amber-400">Soon</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{service.description}</p>
                </div>
                {service.status === 'live' && (
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded">↵</kbd>
              Open
            </span>
          </div>
          <span>Cheverly PD Quick Access</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HomeClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Command palette toggle
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandPaletteOpen((prev) => !prev);
      return;
    }

    // Close command palette on Escape
    if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
      return;
    }

    // Don't handle navigation if command palette is open
    if (isCommandPaletteOpen) return;

    // Arrow key navigation
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setIsKeyboardMode(true);
      setSelectedIndex((prev) => (prev + 1) % services.length);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setIsKeyboardMode(true);
      setSelectedIndex((prev) => (prev - 1 + services.length) % services.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const service = services[selectedIndex];
      if (service.status === 'live') {
        window.location.href = service.href;
      }
    }
  }, [selectedIndex, isCommandPaletteOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Update activeIndex when in keyboard mode
  useEffect(() => {
    if (isKeyboardMode) {
      setActiveIndex(selectedIndex);
    }
  }, [selectedIndex, isKeyboardMode]);

  const handleMouseEnter = (index: number) => {
    setIsKeyboardMode(false);
    setActiveIndex(index);
    setSelectedIndex(index);
  };

  const handleMouseLeave = () => {
    if (!isKeyboardMode) {
      setActiveIndex(null);
    }
  };

  const handleNavigate = (href: string) => {
    window.location.href = href;
  };

  // Mobile layout - stacked cards
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] relative overflow-hidden">
        {/* Police Light Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 z-50 overflow-hidden">
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-police-light-left" />
            <div className="flex-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-police-light-right" />
          </div>
        </div>

        {/* Scanline Overlay */}
        <div className="scanline-overlay" />

        {/* Header */}
        <header className="pt-8 pb-6 px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/logo.png"
              alt="Cheverly Police Department"
              width={80}
              height={80}
              className="mx-auto mb-4 drop-shadow-2xl"
              priority
            />
            <h1 className="text-2xl font-bold text-white mb-1">Cheverly Police</h1>
            <p className="text-gray-400 text-sm">Department Services</p>
          </motion.div>
        </header>

        {/* Mobile Cards */}
        <div className="px-4 pb-8 space-y-3 relative z-10">
          {services.map((service, index) => (
            <motion.a
              key={service.id}
              href={service.status === 'live' ? service.href : undefined}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`block relative overflow-hidden rounded-xl ${
                service.status === 'coming-soon' ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              style={{
                border: `1px solid ${service.accentColor}30`,
              }}
            >
              {/* Background Image for mobile */}
              {service.image ? (
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
                </div>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${service.accentColor}20, ${service.accentColor}05)`,
                  }}
                />
              )}
              
              <div className="relative z-10 flex items-center gap-4 p-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm"
                  style={{ backgroundColor: `${service.accentColor}30`, color: service.image ? 'white' : service.accentColor }}
                >
                  {service.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-lg">
                      {service.title} {service.subtitle}
                    </h3>
                    {service.status === 'live' ? (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-400 backdrop-blur-sm">
                        Live
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400 backdrop-blur-sm">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm truncate">{service.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-gray-800/50 relative z-10">
          <p className="text-gray-500 text-xs">© 2025 Cheverly Police Department</p>
        </footer>
      </div>
    );
  }

  // Desktop layout - vertical strips
  return (
    <div className="h-screen bg-[#0a0a0b] relative overflow-hidden flex flex-col">
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Scanline Overlay */}
      <div className="scanline-overlay" />

      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Police Light Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-50 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-police-light-left" />
          <div className="flex-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-police-light-right" />
        </div>
      </div>

      {/* Top Logo Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4"
        >
          <Image
            src="/logo.png"
            alt="Cheverly Police Department"
            width={70}
            height={70}
            className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            priority
          />
          <div className="text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg tracking-tight">
              Cheverly Police
            </h1>
            <p className="text-gray-300 text-sm tracking-widest uppercase">Department</p>
          </div>
        </motion.div>
      </div>

      {/* Vertical Strips Container */}
      <div className="flex-1 flex">
        {services.map((service, index) => (
          <motion.a
            key={service.id}
            href={service.status === 'live' ? service.href : undefined}
            className={`relative flex-1 group cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
              service.status === 'coming-soon' ? 'cursor-not-allowed' : ''
            } ${selectedIndex === index && isKeyboardMode ? 'ring-2 ring-white/50 ring-inset' : ''}`}
            style={{
              flex: activeIndex === index ? 2.5 : 1,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Background Image */}
            {service.image && (
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
              </div>
            )}

            {/* Dark Overlay for readability */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                service.image
                  ? 'bg-gradient-to-b from-black/70 via-black/50 to-black/80 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/70'
                  : ''
              }`}
            />

            {/* Background Gradient (shown when no image or as overlay) */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${service.gradient} ${
                service.image ? 'opacity-30 group-hover:opacity-20' : 'opacity-60 group-hover:opacity-90'
              } transition-opacity duration-500`}
            />

            {/* Animated Glow Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at center, ${service.accentColor}30 0%, transparent 70%)`,
              }}
            />

            {/* Selection Highlight */}
            {selectedIndex === index && isKeyboardMode && (
              <motion.div
                className="absolute inset-0 border-2 pointer-events-none z-20"
                style={{ borderColor: service.accentColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layoutId="selection"
              />
            )}

            {/* Vertical Line Separator */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-end pb-24 px-4">
              {/* Icon */}
              <motion.div
                className="mb-6 p-4 rounded-2xl transition-all duration-300"
                style={{
                  backgroundColor: `${service.accentColor}20`,
                  color: 'white',
                  boxShadow: activeIndex === index ? `0 0 30px ${service.accentColor}50` : 'none',
                }}
              >
                {service.icon}
              </motion.div>

              {/* Title - Always Visible */}
              <div className="text-center">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 tracking-tight whitespace-nowrap">
                  {service.title}
                </h3>
                <h3 className="text-xl lg:text-2xl font-bold text-white/80 tracking-tight whitespace-nowrap">
                  {service.subtitle}
                </h3>
              </div>

              {/* Description - Shown on Hover */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 text-center max-w-[200px]"
                  >
                    <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                    {service.status === 'live' ? (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Access Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Coming Soon
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Badge - Shown when not hovering */}
              {activeIndex !== index && (
                <div className="mt-3">
                  {service.status === 'live' ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  )}
                </div>
              )}
            </div>

            {/* Top Label */}
            <div className="absolute top-8 left-0 right-0 text-center">
              <span
                className="text-xs font-medium tracking-widest uppercase opacity-50"
                style={{ color: service.accentColor }}
              >
                {service.status === 'live' ? 'Active' : 'Upcoming'}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="h-16 bg-black/50 backdrop-blur-lg border-t border-white/10 flex items-center justify-center gap-8 px-8 z-30">
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <kbd className="px-2 py-1 rounded bg-white/10 text-xs">←</kbd>
          <kbd className="px-2 py-1 rounded bg-white/10 text-xs">→</kbd>
          <span className="ml-2">Navigate</span>
        </div>
        <div className="w-px h-6 bg-white/20" />
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <kbd className="px-2 py-1 rounded bg-white/10 text-xs">Enter</kbd>
          <span className="ml-2">Select</span>
        </div>
        <div className="w-px h-6 bg-white/20" />
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
        >
          <kbd className="px-2 py-1 rounded bg-white/10 text-xs">⌘K</kbd>
          <span className="ml-2">Quick Search</span>
        </button>
        <div className="w-px h-6 bg-white/20" />
        <p className="text-gray-500 text-sm">© 2025 Cheverly Police Department</p>
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            onSelect={handleNavigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
