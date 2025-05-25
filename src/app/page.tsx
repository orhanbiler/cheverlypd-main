export default function Home() {
  return (
    <div className="min-h-screen modern-gradient grid-pattern">
      {/* Navigation */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-blue)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">CPD</span>
              </div>
              <div>
                <h1 className="text-white font-semibold text-lg">Cheverly Police</h1>
                <p className="text-[var(--color-text-muted)] text-sm">Serving Our Community</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            Cheverly Police
            <br />
            <span className="text-gradient">Department</span>
          </h1>
          <p className="text-2xl text-[var(--color-text-secondary)] mb-16 max-w-3xl mx-auto leading-relaxed">
            Access your training materials and department policies through our secure portals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Field Training Portal */}
            <div className="glass-card p-10 group animate-fade-in-up">
              <div className="icon-container bg-[var(--color-accent-blue)] w-20 h-20 mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Field Training Portal</h3>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Access training materials, submit reports, and track your progress through our comprehensive field training system.
              </p>
              <a 
                href="https://fieldtraining.cheverlypd.com"
                className="btn-modern btn-primary text-lg px-8 py-4 group/btn"
              >
                Access Portal
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Policy Documentation */}
            <div className="glass-card p-10 group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="icon-container bg-[var(--color-accent-green)] w-20 h-20 mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">Policy Documentation</h3>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                Review department policies, procedures, and operational standards. Stay updated with the latest guidelines.
              </p>
              <a 
                href="https://policy.cheverlypd.com"
                className="btn-modern btn-secondary text-lg px-8 py-4 group/btn"
              >
                View Policies
                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] mt-32">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-blue)] flex items-center justify-center">
                <span className="text-white font-bold text-xs">CPD</span>
              </div>
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