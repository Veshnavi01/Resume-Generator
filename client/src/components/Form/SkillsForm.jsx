import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Award, Plus, X, Brain, Languages } from 'lucide-react';

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResume();
  const { skills } = resumeData;

  // Local state for the text input fields
  const [inputs, setInputs] = useState({
    technical: '',
    soft: '',
    languages: '',
  });

  const handleInputChange = (category, value) => {
    setInputs((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleAddSkill = (category) => {
    const value = inputs[category]?.trim();
    if (!value) return;

    const currentList = skills[category] || [];
    // Prevent duplicate skills
    if (!currentList.includes(value)) {
      const updatedList = [...currentList, value];
      updateSkills(category, updatedList);
    }

    setInputs((prev) => ({
      ...prev,
      [category]: '',
    }));
  };

  const handleKeyPress = (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(category);
    }
  };

  const handleRemoveSkill = (category, skillToRemove) => {
    const currentList = skills[category] || [];
    const updatedList = currentList.filter((s) => s !== skillToRemove);
    updateSkills(category, updatedList);
  };

  const categories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      placeholder: 'e.g. React, Node.js, Python',
      icon: Award,
      colorClass: {
        bg: 'bg-violet-50 text-violet-600',
        border: 'border-violet-200 focus-within:ring-violet-100 focus-within:border-violet-500',
        tag: 'bg-violet-50 text-violet-700 border-violet-100 hover:bg-violet-100',
        button: 'bg-violet-600 hover:bg-violet-700 text-white',
      },
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      placeholder: 'e.g. Communication, Leadership',
      icon: Brain,
      colorClass: {
        bg: 'bg-sky-50 text-sky-600',
        border: 'border-sky-200 focus-within:ring-sky-100 focus-within:border-sky-500',
        tag: 'bg-sky-50 text-sky-700 border-sky-100 hover:bg-sky-100',
        button: 'bg-sky-600 hover:bg-sky-700 text-white',
      },
    },
    {
      id: 'languages',
      name: 'Languages',
      placeholder: 'e.g. English, Spanish, German',
      icon: Languages,
      colorClass: {
        bg: 'bg-amber-50 text-amber-600',
        border: 'border-amber-200 focus-within:ring-amber-100 focus-within:border-amber-500',
        tag: 'bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100',
        button: 'bg-amber-600 hover:bg-amber-700 text-white',
      },
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in space-y-6">
      {/* Form Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="bg-violet-50 text-violet-600 p-2.5 rounded-xl">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Skills & Languages</h3>
          <p className="text-xs text-slate-500">List technical expertise, interpersonal qualities, and languages spoken</p>
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const list = skills[category.id] || [];
          return (
            <div key={category.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/30 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <div className={`${category.colorClass.bg} p-1.5 rounded-lg shrink-0`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span>{category.name}</span>
              </h4>

              {/* Tag Display */}
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-white rounded-xl border border-slate-100">
                {list.length === 0 ? (
                  <span className="text-xs text-slate-400 italic self-center px-1">
                    No skills added yet. Use the field below to add.
                  </span>
                ) : (
                  list.map((skill, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold border transition-all ${category.colorClass.tag}`}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(category.id, skill)}
                        className="p-0.5 rounded-full hover:bg-black/5 transition-all text-slate-500"
                        title={`Remove ${skill}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Input Group */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputs[category.id]}
                  onChange={(e) => handleInputChange(category.id, e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, category.id)}
                  placeholder={category.placeholder}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleAddSkill(category.id)}
                  className={`p-2 rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center ${category.colorClass.button}`}
                  title="Add skill tag"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsForm;
