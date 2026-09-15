import React, { useState, useMemo, useEffect } from 'react';
import { 
  Globe2, 
  MapPin, 
  Search, 
  Filter, 
  Building2, 
  GraduationCap, 
  Sparkles, 
  Award, 
  Users, 
  Briefcase, 
  Compass, 
  Bookmark, 
  ArrowLeftRight, 
  SlidersHorizontal,
  Navigation,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { 
  EducationCityPlace, 
  EducationCityCategory, 
  UserProfile, 
  EducationPassport, 
  NavigationTab 
} from '../../types';
import { INITIAL_EDUCATION_CITY_PLACES } from '../../data/educationCityData';
import { EducationMap } from '../education-city/EducationMap';
import { PlaceDetailDrawer } from '../education-city/PlaceDetailDrawer';
import { ComparePlacesModal } from '../education-city/ComparePlacesModal';
import { JourneyModal } from '../education-city/JourneyModal';

interface EducationCityViewProps {
  user?: UserProfile;
  passport?: EducationPassport;
  setActiveTab: (tab: NavigationTab) => void;
  onApplyUniversity?: (university: any) => void;
}

// Predefined civic focal hubs (Delhi is primary demo focal point)
const FOCAL_LOCATIONS = [
  { id: 'delhi', name: 'Delhi NCR (National Capital Region & Education Hub)', lat: 28.5457, lng: 77.1928, region: 'India' },
  { id: 'bengaluru', name: 'Bengaluru (Karnataka Tech & Research Belt)', lat: 12.9716, lng: 77.5946, region: 'India' },
  { id: 'mumbai', name: 'Mumbai (Maharashtra Academic Hub)', lat: 19.0760, lng: 72.8777, region: 'India' },
  { id: 'toronto', name: 'Toronto, ON (MaRS & Innovation Hub)', lat: 43.6629, lng: -79.3957, region: 'International' },
  { id: 'boston', name: 'Boston / Cambridge, MA (Kendall Square)', lat: 42.3601, lng: -71.0942, region: 'International' },
  { id: 'london', name: 'London, UK (Golden Triangle)', lat: 51.5115, lng: -0.1160, region: 'International' },
];

// Calculate Haversine distance in Kilometers
function calculateHaversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const EducationCityView: React.FC<EducationCityViewProps> = ({
  user = {
    uid: 'prototype-user',
    name: 'Maya Sharma',
    email: 'maya.sharma@example.edu',
    role: 'Student',
    headline: 'Aspiring AI Researcher & STEM Scholar',
    passportId: 'CF-EDU-2026-8891',
    currentSchool: 'Delhi Public School, R.K. Puram',
    graduationYear: 2026,
    gpa: 3.85,
    maxGpa: 4.0,
    targetDegree: 'Bachelor of Technology / B.Sc.',
    targetMajor: 'Computer Science & Artificial Intelligence',
    targetCountries: ['India', 'Canada', 'United States', 'United Kingdom'],
    satScore: 1490,
    ieltsScore: 8.0,
    profileCompletion: 92,
    skills: ['Python', 'Machine Learning', 'Linear Algebra', 'PyTorch'],
    interests: ['Deep Learning', 'Robotics', 'Quantum Computing'],
    careerGoal: 'AI Research Scientist',
    budget: '₹4,00,000 - ₹12,00,000 / yr',
    preferredLocation: 'Delhi NCR, India'
  },
  passport = {
    passportNumber: 'CF-EDU-2026-8891',
    issueDate: '2025-09-01',
    expiryDate: '2029-09-01',
    institution: 'Central Board of Secondary Education (CBSE) / IB Collegiate',
    status: 'Verified',
    qrData: 'CAMPUSFLOW:VERIFIED:8891:MAYA_SHARMA',
    verifiedBadges: [
      { id: 'b1', title: 'JEE Advanced High Percentile Qualifier', issuedBy: 'NTA / IIT Board', date: '2025', icon: 'Award' },
      { id: 'b2', title: 'KVPY / INSPIRE Fellow Finalist', issuedBy: 'DST India', date: '2025', icon: 'GraduationCap' },
      { id: 'b3', title: 'Verified IELTS Band 8.0', issuedBy: 'British Council', date: '2025', icon: 'CheckCircle2' },
    ],
    academicScores: [
      { subject: 'Math & Analytical Reasoning', grade: '98 / 100', level: 'HL' },
      { subject: 'Physics & Electronics', grade: '95 / 100', level: 'HL' },
      { subject: 'Computer Science & Algorithms', grade: '99 / 100', level: 'HL' },
      { subject: 'English & Technical Communication', grade: '94 / 100', level: 'SL' },
    ]
  },
  setActiveTab,
}) => {
  const [places, setPlaces] = useState<EducationCityPlace[]>(INITIAL_EDUCATION_CITY_PLACES);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(INITIAL_EDUCATION_CITY_PLACES[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<'India' | 'International' | 'All'>('India');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'match' | 'distance' | 'name'>('match');
  const [selectedLocation, setSelectedLocation] = useState(FOCAL_LOCATIONS[0]);
  const [isUsingGps, setIsUsingGps] = useState(false);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(0); // 0 = any distance

  // Modals state
  const [comparedPlaceIds, setComparedPlaceIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);

  // Ask for device location
  const handleUseGpsLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedLocation({
            id: 'gps',
            name: 'My Current Location (GPS)',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            region: 'Local'
          });
          setIsUsingGps(true);
        },
        (err) => {
          console.warn('Geolocation denied or unavailable:', err);
          alert('Location permission not granted. Reverting to Delhi NCR Civic Hub.');
        }
      );
    } else {
      alert('Geolocation is not supported in this browser.');
    }
  };

  // Compute live distances from current focal location
  const placesWithDistances = useMemo(() => {
    return places.map((place) => {
      const distance = calculateHaversineKm(
        selectedLocation.lat,
        selectedLocation.lng,
        place.coordinates.lat,
        place.coordinates.lng
      );
      return {
        ...place,
        distanceKm: distance
      };
    });
  }, [places, selectedLocation]);

  // Filter and Sort places
  const filteredPlaces = useMemo(() => {
    return placesWithDistances
      .filter((place) => {
        // Region filter: Delhi & India is primary demo experience; International is optional filter/search
        const query = searchQuery.toLowerCase().trim();
        let matchesRegion = true;
        if (!query && maxDistanceKm === 0 && selectedLocation.region === 'India') {
          if (regionFilter === 'India') {
            matchesRegion = place.country === 'India';
          } else if (regionFilter === 'International') {
            matchesRegion = place.country !== 'India';
          }
        } else if (!query && maxDistanceKm === 0 && selectedLocation.region === 'International') {
          if (regionFilter === 'International') {
            matchesRegion = place.country !== 'India';
          } else if (regionFilter === 'India') {
            matchesRegion = place.country === 'India';
          }
        }

        // Category filter
        const matchesCategory =
          selectedCategory === 'All' || place.category === selectedCategory;

        // Search query filter (searches across all locations seamlessly)
        const matchesSearch =
          !query ||
          place.name.toLowerCase().includes(query) ||
          place.city.toLowerCase().includes(query) ||
          place.country.toLowerCase().includes(query) ||
          place.subCategory.toLowerCase().includes(query) ||
          place.programs.some((p) => p.toLowerCase().includes(query)) ||
          place.opportunities.some((o) => o.toLowerCase().includes(query));

        // Distance filter
        const matchesDistance =
          maxDistanceKm === 0 || (place.distanceKm !== undefined && place.distanceKm <= maxDistanceKm);

        return matchesRegion && matchesCategory && matchesSearch && matchesDistance;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          return b.matchScore - a.matchScore;
        } else if (sortBy === 'distance') {
          return (a.distanceKm || 0) - (b.distanceKm || 0);
        } else {
          return a.name.localeCompare(b.name);
        }
      });
  }, [placesWithDistances, selectedCategory, regionFilter, selectedLocation, searchQuery, maxDistanceKm, sortBy]);

  const selectedPlace = useMemo(() => {
    return (
      placesWithDistances.find((p) => p.id === selectedPlaceId) ||
      filteredPlaces[0] ||
      placesWithDistances[0]
    );
  }, [placesWithDistances, selectedPlaceId, filteredPlaces]);

  // Toggle Save
  const handleToggleSave = (placeId: string) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === placeId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  // Toggle Journey
  const handleToggleJourney = (placeId: string) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === placeId ? { ...p, inJourney: !p.inJourney } : p))
    );
  };

  // Toggle Compare
  const handleToggleCompare = (place: EducationCityPlace) => {
    setComparedPlaceIds((prev) => {
      if (prev.includes(place.id)) {
        return prev.filter((id) => id !== place.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 opportunities simultaneously.');
          return prev;
        }
        return [...prev, place.id];
      }
    });
  };

  // Comparison places list
  const comparedPlaces = useMemo(() => {
    return placesWithDistances.filter((p) => comparedPlaceIds.includes(p.id));
  }, [placesWithDistances, comparedPlaceIds]);

  // Journey places list
  const journeyPlaces = useMemo(() => {
    return placesWithDistances.filter((p) => p.inJourney);
  }, [placesWithDistances]);

  // Categories list
  const categories: { label: string; value: string; icon: React.ElementType }[] = [
    { label: 'All Categories', value: 'All', icon: Globe2 },
    { label: 'Universities', value: 'University', icon: Building2 },
    { label: 'Colleges', value: 'College', icon: GraduationCap },
    { label: 'Learning Hubs', value: 'Learning Hub', icon: Sparkles },
    { label: 'Exam Centers', value: 'Exam Center', icon: Award },
    { label: 'Mentors', value: 'Mentor', icon: Users },
    { label: 'Internships', value: 'Internship', icon: Briefcase },
    { label: 'Education Opportunities', value: 'Opportunity', icon: Compass },
  ];

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900">CampusFlow Education City</h1>
              <span className="px-2 py-0.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-full flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5" />
                Interactive Map
              </span>
              <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                Prototype Data
              </span>
            </div>
            <p className="text-xs text-slate-500">
              One connected education matrix: Universities, Colleges, Learning Hubs, Exam Centers, Mentors, and Internships grounded in Google Maps.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* My Journey Button */}
            <button
              type="button"
              onClick={() => setIsJourneyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg shadow-2xs transition-colors"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>My Journey</span>
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {journeyPlaces.length}
              </span>
            </button>

            {/* Compare Button */}
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg shadow-2xs transition-colors"
            >
              <ArrowLeftRight className="w-4 h-4 text-purple-600" />
              <span>Compare</span>
              {comparedPlaceIds.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {comparedPlaceIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter and Location Controls Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search universities, hubs, exams..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          {/* Focal Location Selector */}
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <select
              value={selectedLocation.id}
              onChange={(e) => {
                if (e.target.value === 'gps') {
                  handleUseGpsLocation();
                } else {
                  const loc = FOCAL_LOCATIONS.find((l) => l.id === e.target.value);
                  if (loc) {
                    setSelectedLocation(loc);
                    setIsUsingGps(false);
                  }
                }
              }}
              className="w-full pl-9 pr-7 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
            >
              {FOCAL_LOCATIONS.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
              <option value="gps">Use My Current Location (GPS)...</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Distance Filter */}
          <div className="relative">
            <Navigation className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <select
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
              className="w-full pl-9 pr-7 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
            >
              <option value={0}>Distance: Any Distance</option>
              <option value={25}>Distance: Within 25 km</option>
              <option value={100}>Distance: Within 100 km</option>
              <option value={500}>Distance: Within 500 km</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-9 pr-7 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
            >
              <option value="match">Sort: Student Match Score</option>
              <option value="distance">Sort: Nearest Distance</option>
              <option value="name">Sort: Alphabetical (A-Z)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Region Experience Selector */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Region:
            </span>
            <button
              type="button"
              onClick={() => setRegionFilter('India')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                regionFilter === 'India'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Delhi & India (Primary Demo)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                regionFilter === 'India' ? 'bg-emerald-900 text-emerald-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {places.filter((p) => p.country === 'India').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRegionFilter('International')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                regionFilter === 'International'
                  ? 'bg-indigo-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>International Opportunities</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                regionFilter === 'International' ? 'bg-indigo-900 text-indigo-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {places.filter((p) => p.country !== 'India').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRegionFilter('All')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                regionFilter === 'All'
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>All Locations</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                regionFilter === 'All' ? 'bg-slate-950 text-slate-200' : 'bg-slate-200 text-slate-700'
              }`}>
                {places.length}
              </span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-medium hidden sm:flex items-center gap-2">
            <span>Showing {filteredPlaces.length} matching nodes</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Delhi NCR Default</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.value;
            const count =
              cat.value === 'All'
                ? places.length
                : places.filter((p) => p.category === cat.value).length;

            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#1d4ed8] text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-blue-800 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage: Map & Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[620px]">
        {/* Map Canvas (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col h-[520px] lg:h-[680px]">
          <EducationMap
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={(p) => setSelectedPlaceId(p.id)}
            centerCoordinates={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
          />

          {/* Quick Snapshot List below map */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            {filteredPlaces.map((p) => {
              const isSelected = selectedPlace?.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlaceId(p.id)}
                  className={`shrink-0 p-2 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20 shadow-2xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-white">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700">
                      {p.matchScore}%
                    </span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 max-w-[150px] truncate">
                    {p.name}
                  </h5>
                  {p.distanceKm !== undefined && (
                    <span className="text-[10px] text-slate-500 block">
                      {p.distanceKm.toFixed(1)} km away
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Location Detailed Drawer (5 cols on lg) */}
        <div className="lg:col-span-5 h-[520px] lg:h-[680px] rounded-xl overflow-hidden border border-slate-200 bg-white">
          <PlaceDetailDrawer
            place={selectedPlace}
            user={user}
            passport={passport}
            onClose={() => {}}
            onToggleSave={handleToggleSave}
            onToggleJourney={handleToggleJourney}
            onToggleCompare={handleToggleCompare}
            isSaved={Boolean(selectedPlace?.isSaved)}
            isInJourney={Boolean(selectedPlace?.inJourney)}
            isCompared={comparedPlaceIds.includes(selectedPlace?.id || '')}
            onNavigateTab={setActiveTab}
          />
        </div>
      </div>

      {/* Comparison Modal */}
      <ComparePlacesModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        places={comparedPlaces}
        onRemovePlace={(id) => setComparedPlaceIds((prev) => prev.filter((i) => i !== id))}
        onSelectPlace={(p) => setSelectedPlaceId(p.id)}
        onNavigateTab={setActiveTab}
      />

      {/* Journey Roadmap Modal */}
      <JourneyModal
        isOpen={isJourneyModalOpen}
        onClose={() => setIsJourneyModalOpen(false)}
        journeyPlaces={journeyPlaces}
        onRemoveFromJourney={handleToggleJourney}
        onSelectPlace={(p) => setSelectedPlaceId(p.id)}
        onNavigateTab={setActiveTab}
      />
    </div>
  );
};
