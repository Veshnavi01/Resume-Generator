import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building, AlertCircle } from 'lucide-react';

const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  const [touched, setTouched] = useState({});

  const handleAdd = () => {
    const newEntry = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    addExperience(newEntry);
  };

  const handleRemove = (index) => {
    removeExperience(index);
    // Clean up touched states
    const newTouched = { ...touched };
    Object.keys(newTouched).forEach((key) => {
      if (key.startsWith(`${index}-`)) {
        delete newTouched[key];
      }
    });
    setTouched(newTouched);
  };

  const handleChange = (index, field, value) => {
    const entry = experience[index];
    const updatedEntry = { ...entry, [field]: value };
    
    // If setting current to true, clear the endDate
    if (field === 'current' && value === true) {
      updatedEntry.endDate = '';
    }

    updateExperience(index, updatedEntry);
  };

  const handleBlur = (index, field) => {
    setTouched((prev) => ({
      ...prev,
      [`${index}-${field}`]: true,
    }));
  };

  const hasError = (index, field) => {
    const isTouched = touched[`${index}-${field}`];
    const val = experience[index]?.[field];
    if (field === 'company' || field === 'position') {
      return isTouched && (!val || !val.trim());
    }
    return false;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-xl">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Work Experience</h3>
            <p className="text-xs text-slate-500">Detail your professional career</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">No experience details added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click the button above to add your employment history.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-500/10"
          >
            <Plus className="h-4 w-4" />
            Add Experience Entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-slate-300 transition-all duration-200 relative group animate-fade-in"
            >
              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all"
                title="Delete entry"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span>Entry #{index + 1}</span>
              </h4>

              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={item.company}
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      onBlur={() => handleBlur(index, 'company')}
                      placeholder="e.g. Google"
                      className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        hasError(index, 'company')
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                          : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {hasError(index, 'company') && (
                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Company name is required
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Position/Role */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Position / Role <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Briefcase className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.position}
                        onChange={(e) => handleChange(index, 'position', e.target.value)}
                        onBlur={() => handleBlur(index, 'position')}
                        placeholder="e.g. Software Engineer"
                        className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          hasError(index, 'position')
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                            : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500'
                      }`}
                      />
                    </div>
                    {hasError(index, 'position') && (
                      <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Position / Role is required
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => handleChange(index, 'location', e.target.value)}
                        placeholder="e.g. Mountain View, CA (or Remote)"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Start Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.startDate}
                        onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                        placeholder="e.g. Jan 2021"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      End Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.endDate}
                        onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                        disabled={item.current}
                        placeholder={item.current ? 'Present' : 'e.g. Dec 2023'}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Current Job Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-job-${index}`}
                    checked={item.current}
                    onChange={(e) => handleChange(index, 'current', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`current-job-${index}`} className="text-xs font-semibold text-slate-700 select-none">
                    I currently work here
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Description / Key Responsibilities
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    rows={4}
                    placeholder="Describe your responsibilities, key projects built, achievements, and impact..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
