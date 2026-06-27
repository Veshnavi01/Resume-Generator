import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Mail, Phone, MapPin, Linkedin, Github, FileText, AlertCircle, Globe } from 'lucide-react';

const PersonalDetailsForm = () => {
  const { resumeData, updatePersonalDetails } = useResume();
  const { personalDetails } = resumeData;

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Email format validation helper
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // URL validation helper
  const validateUrl = (url) => {
    if (!url || !url.trim()) return true;
    const re = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    return re.test(url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updatePersonalDetails({ [name]: value });

    // Validate on change if touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    if (name === 'fullName' && !value.trim()) {
      errorMsg = 'Full Name is required';
    } else if (name === 'email') {
      if (!value.trim()) {
        errorMsg = 'Email is required';
      } else if (!validateEmail(value)) {
        errorMsg = 'Please enter a valid email address';
      }
    } else if (['linkedin', 'github', 'website'].includes(name)) {
      if (value.trim() && !validateUrl(value)) {
        errorMsg = 'Please enter a valid URL';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Personal Details</h3>
            <p className="text-xs text-slate-500">How employers can contact you</p>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          Auto-saving to state
        </span>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={personalDetails.fullName || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                    : touched.fullName && !errors.fullName
                    ? 'border-emerald-200 focus:ring-emerald-50/50 focus:border-emerald-500'
                    : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={personalDetails.email || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="john.doe@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                    : touched.email && !errors.email
                    ? 'border-emerald-200 focus:ring-emerald-50/50 focus:border-emerald-500'
                    : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={personalDetails.phone || ''}
                onChange={handleInputChange}
                placeholder="+1 (555) 019-2834"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300 transition-all"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Location / Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="address"
                name="address"
                value={personalDetails.address || ''}
                onChange={handleInputChange}
                placeholder="San Francisco, CA"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300 transition-all"
              />
            </div>
          </div>
          {/* Website URL */}
          <div>
            <label htmlFor="website" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Portfolio Website URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Globe className="h-4 w-4" />
              </div>
              <input
                type="url"
                id="website"
                name="website"
                value={personalDetails.website || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="https://myportfolio.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.website
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                    : touched.website && !errors.website
                    ? 'border-emerald-200 focus:ring-emerald-50/50 focus:border-emerald-500'
                    : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300'
                }`}
              />
            </div>
            {errors.website && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.website}
              </p>
            )}
          </div>

          {/* LinkedIn URL */}
          <div>
            <label htmlFor="linkedin" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              LinkedIn URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Linkedin className="h-4 w-4" />
              </div>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={personalDetails.linkedin || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="https://linkedin.com/in/johndoe"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.linkedin
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                    : touched.linkedin && !errors.linkedin
                    ? 'border-emerald-200 focus:ring-emerald-50/50 focus:border-emerald-500'
                    : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300'
                }`}
              />
            </div>
            {errors.linkedin && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.linkedin}
              </p>
            )}
          </div>

          {/* GitHub URL */}
          <div>
            <label htmlFor="github" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              GitHub URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Github className="h-4 w-4" />
              </div>
              <input
                type="url"
                id="github"
                name="github"
                value={personalDetails.github || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="https://github.com/johndoe"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.github
                    ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                    : touched.github && !errors.github
                    ? 'border-emerald-200 focus:ring-emerald-50/50 focus:border-emerald-500'
                    : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300'
                }`}
              />
            </div>
            {errors.github && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.github}
              </p>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <label htmlFor="summary" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Professional Summary
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
              <FileText className="h-4 w-4" />
            </div>
            <textarea
              id="summary"
              name="summary"
              value={personalDetails.summary || ''}
              onChange={handleInputChange}
              rows={4}
              placeholder="Detail your professional highlights, skillsets, and goals..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 hover:border-slate-300 transition-all resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
