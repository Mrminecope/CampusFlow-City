import React, { useEffect, useState } from 'react';
import { ArrowRight, LayoutDashboard, Menu, Sparkles, User, X } from 'lucide-react';
import { CampusFlowLogo } from '../common/CampusFlowLogo';
import { NavigationTab, UserProfile } from '../../types';

interface LandingNavbarProps {
  user: UserProfile;
  onEnterApp: (tab?: NavigationTab) => void;
  onOpenAuth: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ user, onEnterApp, onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'AI guidance', href: '#ai-intelligence' },
    { label: 'Workspace', href: '#workspace' },
    { label: 'Trust', href: '#trust' },
  ];

  const goTo = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const isAuthenticated = Boolean(user?.uid && user.uid !== 'student-maya-sharma-2025');

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-slate-200/80 bg-white/90 py-3 shadow-sm backdrop-blur-xl' : 'bg-white/70 py-4 backdrop-blur-md'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Go to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30">
            <CampusFlowLogo size="md" />
          </button>
          <span className="hidden h-6 w-px bg-slate-200 sm:block" />
          <div className="hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:flex">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            FundMyCrazy
          </div>
        </div>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Landing page navigation">
          {navLinks.map((link) => (
            <button key={link.href} type="button" onClick={() => goTo(link.href)} className="text-xs font-bold text-slate-600 transition hover:text-blue-700">
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button type="button" onClick={() => onEnterApp('dashboard')} className="rounded-lg px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100">
            Live demo
          </button>
          {isAuthenticated ? (
            <button type="button" onClick={() => onEnterApp('dashboard')} className="inline-flex items-center gap-2 rounded-lg bg-[#0b2340] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-900">
              <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
            </button>
          ) : (
            <button type="button" onClick={onOpenAuth} className="inline-flex items-center gap-2 rounded-lg bg-[#1d4ed8] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden" aria-label="Toggle navigation">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200/80 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button key={link.href} type="button" onClick={() => goTo(link.href)} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-700">
                {link.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
            <button type="button" onClick={() => { setMobileMenuOpen(false); onEnterApp('dashboard'); }} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700">Live demo</button>
            <button type="button" onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }} className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#1d4ed8] px-3 py-2.5 text-xs font-bold text-white">Get started <User className="h-3.5 w-3.5" /></button>
          </div>
        </div>
      )}
    </header>
  );
};
