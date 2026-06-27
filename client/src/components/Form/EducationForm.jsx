import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2, Calendar, BookOpen, School, AlertCircle } from 'lucide-react';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const [touched, setTouched] = useState({});

  const handleAdd = () => {
    const newEntry = {
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    addEducation(newEntry);
  };

  const handleRemove = (index) => {
    removeEducation(index);
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
    const entry = education[index];
    const updatedEntry = { ...entry, [field]: value };
    
    // If setting current to true, we clear the endDate
    if (field === 'current' && value === true) {
      updatedEntry.endDate = '';
    }

    updateEducation(index, updatedEntry);
  };

  const handleBlur = (index, field) => {
    setTouched((prev) => ({
      ...prev,
      [`${index}-${field}`]: true,
    }));
  };

  const hasError = (index, field) => {
    const isTouched = touched[`${index}-${field}`];
    const val = education[index]?.[field];
    if (field === 'institution' || field === 'degree') {
      return isTouched && (!val || !val.trim());
    }
    return false;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Education</h3>
            <p className="text-xs text-slate-500">Your academic background and credentials</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <GraduationCap className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">No education details added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click the button above to add your school, college, or course details.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl text-xs font-semibold transition-all shadow-md shadow-emerald-500/10"
          >
            <Plus className="h-4 w-4" />
            Add Education Entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((item, index) => (
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
                {/* School Name */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    School / College / Institution <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <School className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => handleChange(index, 'institution', e.target.value)}
                      onBlur={() => handleBlur(index, 'institution')}
                      placeholder="e.g. Stanford University"
                      className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        hasError(index, 'institution')
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                          : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {hasError(index, 'institution') && (
                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Institution name is required
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Degree */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <GraduationCap className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.degree}
                        onChange={(e) => handleChange(index, 'degree', e.target.value)}
                        onBlur={() => handleBlur(index, 'degree')}
                        placeholder="e.g. Bachelor of Science"
                        className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                          hasError(index, 'degree')
                            ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                            : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {hasError(index, 'degree') && (
                      <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Degree is required
                      </p>
                    )}
                  </div>

                  {/* Field of Study */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Field of Study
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.fieldOfStudy}
                        onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                        placeholder="e.g. Computer Science"
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
                        placeholder="e.g. Sept 2020"
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
                        placeholder={item.current ? 'Present' : 'e.g. June 2024'}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Current Study Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={item.current}
                    onChange={(e) => handleChange(index, 'current', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={`current-${index}`} className="text-xs font-semibold text-slate-700 select-none">
                    I am currently studying here
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Description / Key Achievements (Optional)
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    rows={3}
                    placeholder="Describe your achievements, relevant coursework,GPA, or details..."
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

export default EducationForm;
