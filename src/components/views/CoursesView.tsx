import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Building2
} from 'lucide-react';
import { Course, University, NavigationTab } from '../../types';

interface CoursesViewProps {
  courses: Course[];
  universities: University[];
  onApplyCourse: (course: Course) => void;
  setActiveTab: (tab: NavigationTab) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  onApplyCourse,
  setActiveTab,
}) => {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.universityName.toLowerCase().includes(search.toLowerCase()) ||
      c.overview.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'All' || c.degreeLevel === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Explore Degree Programs & Courses</h1>
          <p className="text-xs text-slate-500">
            Compare international curricula, prerequisites, intake timelines, and accreditation.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filteredCourses.length}</span> programs
        </div>
      </div>

      {/* Search & Level Filter */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search degrees (e.g. Computer Science, Artificial Intelligence, Data Science)..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Bachelor', 'Master'].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setLevelFilter(lvl)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                levelFilter === lvl
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded">
                      {course.degreeLevel}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {course.title}
                  </h3>
                  <div className="text-xs text-blue-700 font-medium flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{course.universityName} • {course.universityCountry}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-slate-900 text-xs">{course.tuition}</div>
                  <div className="text-[10px] text-slate-400">Application Fee: {course.applicationFee}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {course.overview}
              </p>

              {/* Prerequisites Tags */}
              <div className="pt-2 border-t border-slate-100">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Academic Prerequisites
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {course.prerequisites.map((req, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-50 text-slate-600 rounded border border-slate-200/70"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Next Intake: {course.intakeDates[0]}</span>
              </div>

              <button
                type="button"
                onClick={() => onApplyCourse(course)}
                className="px-3.5 py-1.5 font-semibold text-white bg-[#1d4ed8] hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
              >
                <span>Apply</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
