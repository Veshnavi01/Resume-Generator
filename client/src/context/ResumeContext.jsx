/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import { resumeService } from '../services/api';

const ResumeContext = createContext();

const initialResumeState = {
  personalDetails: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  projects: [],
  templateId: 'modern',
};

// Helper: Translate from Frontend state to Mongoose Model
const formatResumeForBackend = (data) => {
  return {
    ...data,
    projects: (data.projects || []).map((proj) => ({
      ...proj,
      technologies: typeof proj.technologies === 'string'
        ? proj.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : proj.technologies || [],
    })),
  };
};

// Helper: Translate from Mongoose Model to Frontend state
const formatResumeForFrontend = (data) => {
  return {
    ...initialResumeState,
    ...data,
    personalDetails: {
      ...initialResumeState.personalDetails,
      ...(data.personalDetails || {}),
    },
    education: data.education || [],
    experience: data.experience || [],
    skills: {
      technical: data.skills?.technical || [],
      soft: data.skills?.soft || [],
      languages: data.skills?.languages || [],
    },
    projects: (data.projects || []).map((proj) => ({
      ...proj,
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies.join(', ')
        : proj.technologies || '',
    })),
  };
};

// Frontend validation before API request
export const validateResume = (data) => {
  if (!data?.personalDetails?.fullName?.trim()) return false;
  if (!data?.personalDetails?.email?.trim() || !/\S+@\S+\.\S+/.test(data.personalDetails.email)) return false;

  if (data.education?.length > 0) {
    for (const edu of data.education) {
      if (!edu.institution?.trim() || !edu.degree?.trim()) return false;
    }
  }

  if (data.experience?.length > 0) {
    for (const exp of data.experience) {
      if (!exp.company?.trim() || !exp.position?.trim()) return false;
    }
  }

  if (data.projects?.length > 0) {
    for (const proj of data.projects) {
      if (!proj.title?.trim() || !proj.description?.trim()) return false;
    }
  }

  return true;
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeState);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saving', 'saved', 'error'
  const [error, setError] = useState(null);

  const updatePersonalDetails = (details) => {
    setResumeData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, ...details },
    }));
    setSaveStatus('unsaved');
  };

  const addEducation = (edu) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, edu],
    }));
    setSaveStatus('unsaved');
  };

  const updateEducation = (index, updatedEducation) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => (i === index ? updatedEducation : edu)),
    }));
    setSaveStatus('unsaved');
  };

  const removeEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
    setSaveStatus('unsaved');
  };

  const addExperience = (exp) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, exp],
    }));
    setSaveStatus('unsaved');
  };

  const removeExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
    setSaveStatus('unsaved');
  };

  const updateExperience = (index, updatedExperience) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? updatedExperience : exp)),
    }));
    setSaveStatus('unsaved');
  };

  const addProject = (project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
    setSaveStatus('unsaved');
  };

  const updateProject = (index, updatedProject) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) => (i === index ? updatedProject : proj)),
    }));
    setSaveStatus('unsaved');
  };

  const removeProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
    setSaveStatus('unsaved');
  };

  const updateSkills = (type, skillsList) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: skillsList,
      },
    }));
    setSaveStatus('unsaved');
  };

  const changeTemplate = (templateId) => {
    setResumeData((prev) => ({
      ...prev,
      templateId,
    }));
    setSaveStatus('unsaved');
  };

  const resetResume = () => {
    setResumeData(initialResumeState);
    setCurrentResumeId(null);
    setSaveStatus(null);
  };

  // FETCH ALL RESUMES
  const fetchResumes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await resumeService.getResumes('guest');
      if (res.success) {
        setSavedResumes(res.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load saved resumes');
    } finally {
      setLoading(false);
    }
  };

  // LOAD SINGLE RESUME
  const loadResume = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await resumeService.getResumeById(id);
      if (res.success) {
        const formatted = formatResumeForFrontend(res.data);
        setResumeData(formatted);
        setCurrentResumeId(res.data._id);
        setSaveStatus('saved');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load resume');
    } finally {
      setLoading(false);
    }
  };

  // SAVE OR UPDATE RESUME (CRITICAL FOR AUTOSAVE)
  const saveResume = async (data = resumeData) => {
    if (!validateResume(data)) {
      setSaveStatus('error');
      setError('Please resolve all validation errors (required fields, valid email) before saving.');
      return;
    }

    setSaving(true);
    setSaveStatus('saving');
    setError(null);
    try {
      const formatted = formatResumeForBackend(data);
      if (currentResumeId) {
        const res = await resumeService.updateResume(currentResumeId, formatted);
        if (res.success) {
          setSaveStatus('saved');
          // Update the cache list
          setSavedResumes((prev) =>
            prev.map((r) => (r._id === currentResumeId ? res.data : r))
          );
        }
      } else {
        const res = await resumeService.createResume(formatted);
        if (res.success) {
          setCurrentResumeId(res.data._id);
          setSaveStatus('saved');
          setSavedResumes((prev) => [res.data, ...prev]);
        }
      }
    } catch (err) {
      setSaveStatus('error');
      setError(err.response?.data?.message || err.message || 'Error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  // DELETE RESUME
  const deleteResume = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await resumeService.deleteResume(id);
      if (res.success) {
        setSavedResumes((prev) => prev.filter((r) => r._id !== id));
        if (currentResumeId === id) {
          resetResume();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete resume');
    } finally {
      setLoading(false);
    }
  };

  // DUPLICATE RESUME
  const duplicateResume = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await resumeService.getResumeById(id);
      if (res.success) {
        const original = res.data;
        const duplicate = {
          ...original,
          personalDetails: {
            ...original.personalDetails,
            fullName: `${original.personalDetails?.fullName || 'Untitled'} (Copy)`,
          },
        };
        delete duplicate._id;
        delete duplicate.createdAt;
        delete duplicate.updatedAt;

        const createRes = await resumeService.createResume(duplicate);
        if (createRes.success) {
          setSavedResumes((prev) => [createRes.data, ...prev]);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to duplicate resume');
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = () => {
    resetResume();
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        currentResumeId,
        setCurrentResumeId,
        savedResumes,
        loading,
        setLoading,
        saving,
        saveStatus,
        setSaveStatus,
        error,
        setError,
        updatePersonalDetails,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        removeExperience,
        updateExperience,
        addProject,
        updateProject,
        removeProject,
        updateSkills,
        changeTemplate,
        resetResume,
        fetchResumes,
        loadResume,
        saveResume,
        deleteResume,
        duplicateResume,
        createNewResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
