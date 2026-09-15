import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  FileText, 
  FolderArchive, 
  CalendarDays, 
  Award, 
  GraduationCap, 
  Bot, 
  ArrowLeftRight, 
  Lightbulb, 
  User, 
  Settings, 
  HelpCircle,
  Compass,
  Sparkles,
  MapPin,
  IdCard,
  Briefcase,
  Mail,
  Edit3
} from 'lucide-react';
import { NavigationTab } from '../../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  shortlistCount: number;
  deadlinesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpen,
  onCloseMobile,
  deadlinesCount,
}) => {
  const mainNavItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox' as NavigationTab, label: 'Admission Inbox', icon: Mail, badge: 'Gmail' },
    { id: 'passport' as NavigationTab, label: 'Education Passport', icon: IdCard, badge: 'Prototype' },
    { id: 'universities' as NavigationTab, label: 'Explore Universities', icon: Building2 },
    { id: 'courses' as NavigationTab, label: 'Explore Courses', icon: BookOpen },
    { id: 'applications' as NavigationTab, label: 'My Applications', icon: FileText, count: 3 },
    { id: 'studio' as NavigationTab, label: 'Application Studio', icon: Edit3, badge: 'Docs' },
    { id: 'documents' as NavigationTab, label: 'Documents', icon: FolderArchive },
    { id: 'deadlines' as NavigationTab, label: 'Deadlines & Calendar', icon: CalendarDays, count: deadlinesCount },
    { id: 'scholarships' as NavigationTab, label: 'Scholarships', icon: Award },
    { id: 'exams' as NavigationTab, label: 'Entrance Exams', icon: GraduationCap },
    { id: 'opportunities' as NavigationTab, label: 'Opportunities', icon: Briefcase },
    { id: 'advisor' as NavigationTab, label: 'AI Advisor', icon: Bot, badge: 'FlowAI' },
    { id: 'simulator' as NavigationTab, label: 'Pathway Simulator', icon: Compass },
    { id: 'city' as NavigationTab, label: 'Google Maps & Campuses', icon: MapPin, badge: 'Maps' },
    { id: 'compare' as NavigationTab, label: 'Compare & Insights', icon: ArrowLeftRight },
  ];

  const bottomNavItems = [
    { id: 'landing' as NavigationTab, label: '✦ Public Landing Page', icon: Sparkles },
    { id: 'profile' as NavigationTab, label: 'Profile', icon: User },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  const handleSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-3 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#1d4ed8] text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {/* Optional badge or counter */}
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.count}
                  </span>
                )}

                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'FlowAI'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Lower section and mountain card */}
        <div className="p-3 space-y-3 pt-2 border-t border-slate-100">
          <div className="space-y-0.5">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`sidebar-bottom-link-${item.id}`}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <a
              href="#help"
              onClick={(e) => {
                e.preventDefault();
                handleSelect('advisor');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span>Help & Support</span>
            </a>
          </div>

          {/* Inspirational Mountain Peak Card matching screenshot UI.png */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 p-4 text-white shadow-xs">
            <div 
              className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-overlay"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80')`
              }}
            />
            <div className="relative z-10 space-y-1">
              <h4 className="font-bold text-xs leading-tight text-white">
                A Brighter Tomorrow Begins Here.
              </h4>
              <p className="text-[10px] text-slate-300 font-medium">
                Explore. Plan. Apply. Achieve.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
