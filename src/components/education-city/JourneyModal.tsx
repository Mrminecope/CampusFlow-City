import React from 'react';
import { 
  X, 
  Compass, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  Calendar, 
  ArrowRight,
  Sparkles,
  Trash2
} from 'lucide-react';
import { EducationCityPlace, NavigationTab } from '../../types';

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  journeyPlaces: EducationCityPlace[];
  onRemoveFromJourney: (placeId: string) => void;
  onSelectPlace: (place: EducationCityPlace) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const JourneyModal: React.FC<JourneyModalProps> = ({
  isOpen,
  onClose,
  journeyPlaces,
  onRemoveFromJourney,
  onSelectPlace,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  My Education Journey Roadmap
                </h2>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  Prototype Data
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Sequenced milestones across universities, test centers, research hubs, and co-op opportunities.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {journeyPlaces.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No opportunities added to your journey yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore the Education City map and click &quot;+ Journey&quot; on any location to assemble your personalized academic and career trajectory.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {journeyPlaces.map((place, idx) => (
                <div
                  key={place.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{place.name}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded font-semibold bg-slate-100 text-slate-700">
                          {place.category}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {place.matchScore}% Match
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {place.programs[0] || place.subCategory} • {place.city}, {place.country}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-600 mt-2">
                        <span>Next Step: <strong>{place.nextAction.label}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPlace(place);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Map View
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (place.nextAction.tabTarget) {
                          onNavigateTab(place.nextAction.tabTarget);
                          onClose();
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Action</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveFromJourney(place.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove from Journey"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {journeyPlaces.length} milestone{journeyPlaces.length === 1 ? '' : 's'} staged in your Education Journey.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
