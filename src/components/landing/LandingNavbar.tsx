import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  LayoutDashboard
} from 'lucide-react';
import { CampusFlowLogo } from '../common/CampusFlowLogo';
import { UserProfile, NavigationTab } from '../../types';

interface LandingNavbarProps {
  user: UserProfile;
  onEnterApp: (tab?: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  user,
  onEnterApp,
  onOpenAuth,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products & Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'AI Intelligence', href: '#ai-intelligence' },
    { label: 'Google Workspace', href: '#workspace' },
    { label: 'Security & Trust', href: '#trust' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isAuthenticated = Boolean(user?.uid && user.uid !== 'student-maya-sharma-2025');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-xs border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & FundMyCrazy Partnership Badge */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center focus:outline-none"
            >
              <CampusFlowLogo size="md" />
            </button>

            {/* FundMyCrazy Co-Badge */}
            <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">for</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-900 border border-amber-300/40">
                <Sparkles className="w-3 h-3 text-amber-600" />
                FundMyCrazy
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs font-semibold text-slate-600 hover:text-blue-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Launcher */}
            <button
              id="nav-demo-btn"
              type="button"
              onClick={() => onEnterApp('dashboard')}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200"
            >
              Explore Live Demo
            </button>

            {/* Authenticated vs Guest Action */}
            {isAuthenticated ? (
              <button
                id="nav-dashboard-btn"
                type="button"
                onClick={() => onEnterApp('dashboard')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Dashboard</span>
              </button>
            ) : (
              <button
                id="nav-signin-btn"
                type="button"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0a2540] hover:bg-slate-900 rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <button
              id="mobile-landing-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700">Navigation</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              FundMyCrazy Phase 2
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="py-1.5 text-sm font-semibold text-slate-700 hover:text-blue-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onEnterApp('dashboard');
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg border border-slate-200 text-center"
            >
              Explore Live Demo
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#1d4ed8] rounded-lg shadow-sm"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
