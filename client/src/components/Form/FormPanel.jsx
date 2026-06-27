import { useState } from 'react';
import { User, GraduationCap, Briefcase, Award, FolderGit, ChevronLeft, ChevronRight } from 'lucide-react';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';

const SECTIONS = [
  { id: 'personal', name: 'Personal Info', icon: User, component: PersonalDetailsForm },
  { id: 'education', name: 'Education', icon: GraduationCap, component: EducationForm },
  { id: 'experience', name: 'Experience', icon: Briefcase, component: ExperienceForm },
  { id: 'skills', name: 'Skills', icon: Award, component: SkillsForm },
  { id: 'projects', name: 'Projects', icon: FolderGit, component: ProjectsForm },
];

const FormPanel = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeTab);
  const ActiveComponent = SECTIONS[currentIndex].component;

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) {
      setActiveTab(SECTIONS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTab(SECTIONS[currentIndex - 1].id);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm flex items-center justify-between overflow-x-auto gap-1">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = section.id === activeTab;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex-1 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{section.name}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="flex-1 min-h-0 animate-fade-in" key={activeTab}>
        <ActiveComponent />
      </div>

      {/* Prev/Next Buttons */}
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 py-2.5 px-5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === SECTIONS.length - 1}
          className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FormPanel;
