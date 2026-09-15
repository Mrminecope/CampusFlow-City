import React from 'react';
import { 
  X, 
  ArrowLeftRight, 
  CheckCircle2, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Briefcase, 
  ExternalLink,
  Building2,
  Trash2
} from 'lucide-react';
import { EducationCityPlace, NavigationTab } from '../../types';

interface ComparePlacesModalProps {
  isOpen: boolean;
  onClose: () => void;
  places: EducationCityPlace[];
  onRemovePlace: (placeId: string) => void;
  onSelectPlace: (place: EducationCityPlace) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const ComparePlacesModal: React.FC<ComparePlacesModalProps> = ({
  isOpen,
  onClose,
  places,
  onRemovePlace,
  onSelectPlace,
  onNavigateTab
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-purple-50 text-purple-700 rounded-lg border border-purple-200">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Compare Education City Opportunities
                </h2>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                  Prototype Data
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Comparing {places.length} institutions side-by-side across academic fit, costs, and career pipelines.
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {places.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <ArrowLeftRight className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">No opportunities selected for comparison</p>
              <p className="text-xs text-slate-500">
                Click &quot;Compare&quot; on any university, learning hub, or internship on the map to evaluate them side-by-side.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-w-[700px]">
                {places.map((place) => (
                  <div 
                    key={place.id}
                    className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col justify-between shadow-2xs space-y-4"
                  >
                    {/* Header Card */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                          {place.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemovePlace(place.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                        {place.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{place.city}, {place.country}</span>
                        {place.distanceKm !== undefined && (
                          <span className="text-blue-700 font-semibold bg-blue-50 px-1 rounded text-[10px]">
                            {place.distanceKm.toFixed(1)} km
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Match Score */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Student Match Score
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-slate-900">{place.matchScore}%</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {place.matchTier}
                        </span>
                      </div>
                    </div>

                    {/* Programs */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Key Programs
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {place.programs.slice(0, 2).map((p, i) => (
                          <li key={i} className="line-clamp-1 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Estimated Cost */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Estimated Cost & Aid
                      </span>
                      <p className="text-xs font-bold text-slate-900">
                        {place.estimatedCost.tuitionOrFee}
                      </p>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {place.estimatedCost.financialAid}
                      </p>
                    </div>

                    {/* Opportunity Network Link */}
                    <div className="space-y-1 p-2.5 bg-blue-50/50 rounded-lg border border-blue-200 text-xs">
                      <span className="text-[10px] uppercase font-bold text-blue-800 block">
                        Career Pathway Link
                      </span>
                      <p className="font-semibold text-blue-950 text-[11px] line-clamp-1">
                        {place.opportunityNetwork.careerOutcome}
                      </p>
                      <p className="text-[10px] text-blue-800/80 line-clamp-1">
                        Via: {place.opportunityNetwork.internshipLink}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectPlace(place);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                      >
                        View on Map
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (place.nextAction.tabTarget) {
                            onNavigateTab(place.nextAction.tabTarget);
                            onClose();
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        {place.nextAction.label.slice(0, 16)}...
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Select up to 4 places from Education City to compare parameters.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
