import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { FolderGit, Plus, Trash2, Link, Cpu, AlertCircle } from 'lucide-react';

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  const [touched, setTouched] = useState({});

  const handleAdd = () => {
    const newEntry = {
      title: '',
      description: '',
      technologies: '',
      link: '',
    };
    addProject(newEntry);
  };

  const handleRemove = (index) => {
    removeProject(index);
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
    const entry = projects[index];
    const updatedEntry = { ...entry, [field]: value };
    updateProject(index, updatedEntry);
  };

  const handleBlur = (index, field) => {
    setTouched((prev) => ({
      ...prev,
      [`${index}-${field}`]: true,
    }));
  };

  const hasError = (index, field) => {
    const isTouched = touched[`${index}-${field}`];
    const val = projects[index]?.[field];
    if (field === 'title' || field === 'description') {
      return isTouched && (!val || !val.trim());
    }
    return false;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl">
            <FolderGit className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Projects</h3>
            <p className="text-xs text-slate-500">Highlight key projects built</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <FolderGit className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">No projects added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click the button above to showcase your work or personal projects.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-xl text-xs font-semibold transition-all shadow-md shadow-amber-500/10"
          >
            <Plus className="h-4 w-4" />
            Add Project Entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.map((item, index) => (
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
                {/* Project Title */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <FolderGit className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleChange(index, 'title', e.target.value)}
                      onBlur={() => handleBlur(index, 'title')}
                      placeholder="e.g. Portfolio Website"
                      className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        hasError(index, 'title')
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                          : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {hasError(index, 'title') && (
                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Project title is required
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Technologies Used */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Technologies Used
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Cpu className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.technologies}
                        onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                        placeholder="e.g. React, Node.js, MongoDB"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <p className="mt-1 text-[9px] text-slate-400">Separate technologies with commas</p>
                  </div>

                  {/* Project Link */}
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Project Link (URL)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Link className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) => handleChange(index, 'link', e.target.value)}
                        placeholder="e.g. https://github.com/username/project"
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={item.description}
                      onChange={(e) => handleChange(index, 'description', e.target.value)}
                      onBlur={() => handleBlur(index, 'description')}
                      rows={4}
                      placeholder="Describe what the project is, the problem it solves, and your specific role/contribution..."
                      className={`w-full px-3 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all resize-none ${
                        hasError(index, 'description')
                          ? 'border-red-300 focus:ring-red-100 focus:border-red-500'
                          : 'border-slate-200 focus:ring-blue-50/50 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {hasError(index, 'description') && (
                    <p className="mt-1 text-[10px] text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Project description is required
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
