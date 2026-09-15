// Source: Google Maps Platform Code Assist
import React, { useState, useEffect } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow,
  useMap
} from '@vis.gl/react-google-maps';
import { 
  Building2, 
  GraduationCap, 
  Sparkles, 
  Award, 
  Users, 
  Briefcase, 
  Globe2, 
  MapPin, 
  Navigation,
  Layers,
  CheckCircle2,
  Network
} from 'lucide-react';
import { EducationCityPlace, EducationCityCategory } from '../../types';

// MapController helper to pan and zoom smoothly when a place is selected
function MapController({ selectedPlace }: { selectedPlace: EducationCityPlace | null }) {
  const map = useMap();

  useEffect(() => {
    if (map && selectedPlace) {
      map.panTo(selectedPlace.coordinates);
      const currentZoom = map.getZoom() || 12;
      if (currentZoom < 13) {
        map.setZoom(14);
      }
    }
  }, [map, selectedPlace]);

  return null;
}

interface EducationMapProps {
  places: EducationCityPlace[];
  selectedPlace: EducationCityPlace | null;
  onSelectPlace: (place: EducationCityPlace) => void;
  centerCoordinates: { lat: number; lng: number };
  zoomLevel?: number;
}

export const EducationMap: React.FC<EducationMapProps> = ({
  places,
  selectedPlace,
  onSelectPlace,
  centerCoordinates,
  zoomLevel = 12
}) => {
  // Read API Key quietly from environment or storage without prompting user
  const envKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';
  const [apiKey] = useState<string>(() => {
    return localStorage.getItem('CAMPUSFLOW_MAPS_KEY') || envKey;
  });

  // Display mode: 'map' (Google Maps vector terrain) or 'network' (Campus Network View)
  const [viewMode, setViewMode] = useState<'map' | 'network'>(() => {
    return apiKey ? 'map' : 'network';
  });

  const [hoveredPlace, setHoveredPlace] = useState<EducationCityPlace | null>(null);

  // Category styling helper
  const getCategoryTheme = (category: EducationCityCategory) => {
    switch (category) {
      case 'University':
        return { bg: '#1d4ed8', border: '#1e40af', glyphColor: '#ffffff', label: 'University' };
      case 'College':
        return { bg: '#4338ca', border: '#3730a3', glyphColor: '#ffffff', label: 'College' };
      case 'Learning Hub':
        return { bg: '#059669', border: '#047857', glyphColor: '#ffffff', label: 'Learning Hub' };
      case 'Exam Center':
        return { bg: '#e11d48', border: '#be123c', glyphColor: '#ffffff', label: 'Exam Center' };
      case 'Mentor':
        return { bg: '#7c3aed', border: '#6d28d9', glyphColor: '#ffffff', label: 'Mentor' };
      case 'Internship':
        return { bg: '#0284c7', border: '#0369a1', glyphColor: '#ffffff', label: 'Internship' };
      case 'Opportunity':
      default:
        return { bg: '#0f766e', border: '#115e59', glyphColor: '#ffffff', label: 'Opportunity' };
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex flex-col bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-white/95 backdrop-blur-xs p-1.5 rounded-lg border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5 px-2 py-0.5 text-blue-700 bg-blue-50 rounded">
            {viewMode === 'map' ? (
              <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            ) : (
              <Network className="w-3.5 h-3.5 text-indigo-600" />
            )}
            <span>{viewMode === 'map' ? 'Google Maps Vector View' : 'Campus Network View'}</span>
          </span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {places.length} institutions & hubs
          </span>
          <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">
            Prototype Data
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'map' ? 'network' : 'map')}
            className="px-2.5 py-1.5 bg-white/95 backdrop-blur-xs text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200/80 shadow-xs text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title={viewMode === 'map' ? 'Switch to Campus Network View' : 'Switch to Google Maps Vector View'}
          >
            {viewMode === 'map' ? (
              <>
                <Network className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Campus Network View</span>
              </>
            ) : (
              <>
                <Globe2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Google Maps View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="w-full h-full flex-1 relative">
        {viewMode === 'map' && apiKey ? (
          <APIProvider apiKey={apiKey}>
            <div className="w-full h-full" style={{ height: '100%', minHeight: '500px' }}>
              <Map
                defaultCenter={centerCoordinates}
                defaultZoom={zoomLevel}
                mapId="CAMPUSFLOW_CITY_MAP"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                gestureHandling="greedy"
                disableDefaultUI={false}
                style={{ width: '100%', height: '100%' }}
              >
                <MapController selectedPlace={selectedPlace} />

                {places.map((place) => {
                  const theme = getCategoryTheme(place.category);
                  const isSelected = selectedPlace?.id === place.id;

                  return (
                    <AdvancedMarker
                      key={place.id}
                      position={place.coordinates}
                      title={place.name}
                      onClick={() => onSelectPlace(place)}
                    >
                      <Pin
                        background={isSelected ? '#0f172a' : theme.bg}
                        borderColor={isSelected ? '#ffffff' : theme.border}
                        glyphColor={theme.glyphColor}
                        scale={isSelected ? 1.25 : 1.0}
                      />
                    </AdvancedMarker>
                  );
                })}

                {selectedPlace && (
                  <InfoWindow
                    position={selectedPlace.coordinates}
                    onCloseClick={() => {}}
                  >
                    <div className="p-2 max-w-[240px] text-slate-900 font-sans">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-900 text-white">
                          {selectedPlace.category}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">
                          {selectedPlace.matchScore}% Match
                        </span>
                        <span className="text-[9px] font-medium text-slate-500">
                          Prototype Data
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {selectedPlace.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {selectedPlace.city}, {selectedPlace.country}
                      </p>
                      {selectedPlace.distanceKm !== undefined && (
                        <p className="text-[10px] font-semibold text-blue-700 mt-1">
                          {selectedPlace.distanceKm.toFixed(1)} km from focal center
                        </p>
                      )}
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </div>
          </APIProvider>
        ) : (
          /* Campus Network View (Polished Interactive Civic Topography Canvas) */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 relative select-none overflow-hidden">
            {/* Background Grid */}
            <div 
              className="absolute inset-0 opacity-[0.06]" 
              style={{
                backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Simulated Civic Node Canvas */}
            <div className="relative w-full max-w-2xl aspect-16/10 bg-white border border-slate-200 rounded-2xl shadow-xs p-6 overflow-hidden">
              <div className="absolute top-3 left-4 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">CampusFlow Education Network</span>
                <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                  Spatial Topography
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 font-medium">
                  Prototype Data
                </span>
              </div>

              {/* Central Map Target Coordinates */}
              <div className="absolute top-3 right-4 text-[10px] font-mono text-slate-400">
                {centerCoordinates.lat.toFixed(4)}° N, {centerCoordinates.lng.toFixed(4)}° E
              </div>

              {/* Interactive Node Markers positioned relative to geographic bounds */}
              <div className="relative w-full h-full pt-8 pb-4">
                {places.map((place, idx) => {
                  const theme = getCategoryTheme(place.category);
                  const isSelected = selectedPlace?.id === place.id;
                  // Map latitude/longitude to 2D percentage grid
                  const posX = 15 + ((idx * 31) % 70);
                  const posY = 20 + ((idx * 23) % 65);

                  return (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => onSelectPlace(place)}
                      onMouseEnter={() => setHoveredPlace(place)}
                      onMouseLeave={() => setHoveredPlace(null)}
                      style={{ left: `${posX}%`, top: `${posY}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 p-1.5 rounded-full transition-all group ${
                        isSelected 
                          ? 'ring-4 ring-blue-500/30 shadow-md scale-110 z-20' 
                          : 'hover:scale-105 z-10'
                      }`}
                    >
                      <div 
                        className="w-7 h-7 rounded-full flex items-center justify-center shadow-xs text-white text-[10px] font-bold"
                        style={{ backgroundColor: theme.bg }}
                      >
                        {place.category[0]}
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs whitespace-nowrap transition-all ${
                        isSelected 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-white/95 text-slate-700 border border-slate-200 group-hover:bg-slate-50'
                      }`}>
                        {place.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Hover snapshot card */}
              {hoveredPlace && (
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-lg flex items-center justify-between animate-in fade-in">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] text-blue-300 font-semibold">{hoveredPlace.category}</span>
                      <span className="text-[9px] text-slate-400 bg-slate-800 px-1 rounded">Prototype Data</span>
                    </div>
                    <h5 className="text-xs font-bold">{hoveredPlace.name}</h5>
                    <p className="text-[11px] text-slate-300">{hoveredPlace.address}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400">{hoveredPlace.matchScore}% Match</span>
                    <p className="text-[10px] text-slate-400">{hoveredPlace.estimatedCost.tuitionOrFee}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 text-center text-xs text-slate-500 max-w-md flex items-center justify-center gap-2">
              <span>Campus Network View shows relational academic pathways.</span>
              {apiKey && (
                <button 
                  type="button" 
                  onClick={() => setViewMode('map')} 
                  className="text-blue-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <Globe2 className="w-3 h-3" />
                  <span>Switch to Google Maps</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Google Maps Attribution per Platform Terms */}
      <div className="px-3 py-1.5 bg-white border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Interactive Education City Network</span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">| Prototype Data</span>
        </span>
        <span className="font-semibold text-slate-700 flex items-center gap-1">
          <Globe2 className="w-3 h-3 text-slate-500" />
          Google Maps
        </span>
      </div>
    </div>
  );
};
