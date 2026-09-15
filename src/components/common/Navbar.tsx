import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  Bell, 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  User as UserIcon, 
  SlidersHorizontal, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { CampusFlowLogo } from './CampusFlowLogo';
import { UserProfile, NavigationTab } from '../../types';

interface NavbarProps {
  user: UserProfile;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isFirebaseActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenAuth,
  onLogout,
  isSidebarOpen,
  setIsSidebarOpen,
  isFirebaseActive,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Worldwide');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'University of Toronto',
      text: 'Document submission deadline in 5 days (14 Oct).',
      time: '2h ago',
      urgent: true,
      tab: 'deadlines' as NavigationTab,
    },
    {
      id: 2,
      title: 'Scholarship Match',
      text: 'New matching award: Amsterdam Merit Scholarship (€25,000).',
      time: 'Yesterday',
      urgent: false,
      tab: 'scholarships' as NavigationTab,
    },
    {
      id: 3,
      title: 'Education Passport',
      text: 'Academic transcripts uploaded to profile records.',
      time: '3 days ago',
      urgent: false,
      tab: 'passport' as NavigationTab,
    },
  ];

  const regions = ['Worldwide', 'North America', 'Europe', 'Asia-Pacific', 'United Kingdom'];
  const filterCategories = ['All', 'Universities', 'Courses', 'Scholarships', 'Exams'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 gap-4">
        {/* Left side: Mobile Hamburger & CampusFlow Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg lg:hidden hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center text-left focus:outline-none"
          >
            <CampusFlowLogo size="md" />
          </button>

          <div className="hidden lg:flex items-center pl-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 border border-slate-200 tracking-wide uppercase">
              Prototype Data
            </span>
          </div>
        </div>

        {/* Center: Search Bar with "All ▾" selector */}
        <div className="flex-1 max-w-2xl mx-2 hidden sm:block">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search universities, courses, scholarships, exams..."
              className="w-full pl-10 pr-24 py-2 text-sm bg-slate-50/70 hover:bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200/90 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
            />
            
            {/* Category Dropdown inside search input */}
            <div className="absolute right-1.5">
              <button
                id="search-filter-category-btn"
                type="button"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-2xs"
              >
                <SlidersHorizontal className="w-3 h-3 text-slate-500" />
                <span>{filterCategory}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setFilterCategory(cat);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs ${
                        filterCategory === cat
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side utilities: Google Maps button, Worldwide selector, Notifications, User pill */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Quick Google Maps Button */}
          <button
            id="navbar-google-maps-btn"
            type="button"
            onClick={() => setActiveTab('city')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100/90 rounded-lg transition-colors border border-blue-200 shadow-2xs"
            title="Explore Global Universities and Hubs on Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden md:inline">Google Maps</span>
          </button>

          {/* Region selector */}
          <div className="relative hidden md:block">
            <button
              id="region-selector-btn"
              type="button"
              onClick={() => setShowRegionMenu(!showRegionMenu)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100/80 transition-colors border border-transparent hover:border-slate-200"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{selectedRegion}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRegionMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Hub
                </div>
                {regions.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(r);
                      setShowRegionMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between ${
                      selectedRegion === r
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{r}</span>
                    {selectedRegion === r && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Public Landing Page Button */}
          <button
            id="navbar-landing-toggle-btn"
            type="button"
            onClick={() => setActiveTab('landing')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100/90 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200"
            title="View Public Landing Page"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Landing Page</span>
          </button>

          {/* Notifications button with dropdown */}
          <div className="relative">
            <button
              id="notifications-bell-btn"
              type="button"
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-900">Notifications</span>
                  <span className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setActiveTab(n.tab);
                        setShowNotifMenu(false);
                      }}
                      className="px-3.5 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill matching screenshot ("MS", Maya Sharma, Student, Caret) */}
          <div className="relative">
            <button
              id="user-profile-menu-btn"
              type="button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 pl-1.5 pr-2 rounded-lg hover:bg-slate-100/90 transition-colors border border-slate-200/70"
            >
              {/* Navy circle with initials or avatar */}
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#0a2540] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  {user.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
              )}

              <div className="text-left hidden sm:block leading-tight">
                <div className="text-xs font-bold text-slate-900">{user.name}</div>
                <div className="text-[11px] text-slate-500 font-normal">{user.role}</div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                <div className="px-3.5 py-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{user.name}</span>
                    {isFirebaseActive && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.5 rounded border border-emerald-200">
                        <ShieldCheck className="w-2.5 h-2.5" /> Firebase Sync
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                  <div className="text-[10px] text-blue-600 font-mono mt-0.5">{user.passportId}</div>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('landing');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-blue-700 hover:bg-blue-50 font-semibold"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Public Landing Page</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <span>View Profile & Credentials</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('passport');
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Education Passport</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onOpenAuth();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-blue-600 hover:bg-blue-50 font-medium"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-500" />
                    <span>Google Sign-In / Account Setup</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-600 hover:bg-red-50 font-medium"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
