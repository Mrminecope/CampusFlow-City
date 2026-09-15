import React, { useEffect } from 'react';
import { LandingNavbar } from './LandingNavbar';
import { LandingHero } from './LandingHero';
import { ProductOverviewSection } from './ProductOverviewSection';
import { HowItWorksSection } from './HowItWorksSection';
import { AIIntelligenceSection } from './AIIntelligenceSection';
import { GoogleWorkspaceSection } from './GoogleWorkspaceSection';
import { TrustPrivacySection } from './TrustPrivacySection';
import { FundMyCrazyBanner } from './FundMyCrazyBanner';
import { FinalCtaSection } from './FinalCtaSection';
import { LandingFooter } from './LandingFooter';
import { UserProfile, NavigationTab } from '../../types';

interface LandingViewProps {
  user: UserProfile;
  onEnterApp: (tab?: NavigationTab) => void;
  onOpenAuth: () => void;
  onConnectGoogle: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  user,
  onEnterApp,
  onOpenAuth,
  onConnectGoogle,
}) => {
  // Scroll to top upon landing mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* 1. Public Sticky Navigation */}
      <LandingNavbar
        user={user}
        onEnterApp={onEnterApp}
        onOpenAuth={onOpenAuth}
      />

      {/* 2. Hero Section with Value Prop & Interactive Live Showcase */}
      <LandingHero
        onEnterApp={onEnterApp}
        onOpenAuth={onOpenAuth}
      />

      {/* 3. Product Overview: The 7 Pillars of CampusFlow City */}
      <ProductOverviewSection
        onEnterApp={onEnterApp}
      />

      {/* 4. How It Works: 4-Step Student Progression */}
      <HowItWorksSection
        onEnterApp={onEnterApp}
        onOpenAuth={onOpenAuth}
      />

      {/* 5. AI & Gemini-Powered Intelligence Section */}
      <AIIntelligenceSection
        onEnterApp={onEnterApp}
      />

      {/* 6. Google Workspace Integration Section (Drive, Gmail, Calendar, OAuth) */}
      <GoogleWorkspaceSection
        onEnterApp={onEnterApp}
      />

      {/* 7. FundMyCrazy Mission & Partner Grants Banner */}
      <FundMyCrazyBanner
        onEnterApp={onEnterApp}
        onOpenAuth={onOpenAuth}
      />

      {/* 8. Trust & Privacy Section (Zero-Trust Firestore & Data Portability) */}
      <TrustPrivacySection
        onEnterApp={onEnterApp}
      />

      {/* 9. Final High-Converting Call to Action */}
      <FinalCtaSection
        onEnterApp={onEnterApp}
        onOpenAuth={onOpenAuth}
      />

      {/* 10. Polished Footer */}
      <LandingFooter
        onEnterApp={onEnterApp}
        onOpenAuth={onOpenAuth}
      />
    </div>
  );
};
