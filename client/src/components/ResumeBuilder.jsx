import { useState, useEffect } from 'react';
import FormPanel from './Form/FormPanel';
import PreviewPanel from './Preview/PreviewPanel';
import Dashboard from './Dashboard/Dashboard';
import { FileText, RotateCcw, LayoutDashboard, FileSpreadsheet, LogOut, User as UserIcon } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';

const ResumeBuilder = () => {
  const {
    resumeData,
    saveStatus,
    error,
    saveResume,
    resetResume,
  } = useResume();

  const { user, logout } = useAuth();
  const [view, setView] = useState('dashboard'); // 'editor' or 'dashboard'
  const [showResetModal, setShowResetModal] = useState(false);

  // Debounced Autosave Logic
  useEffect(() => {
    if (saveStatus !== 'unsaved') return;

    const timer = setTimeout(() => {
      // Basic validation check before autosaving (prevent empty/invalid submissions)
      const name = resumeData.personalDetails?.fullName?.trim();
      const email = resumeData.personalDetails?.email?.trim();
      const isValidEmail = email && /\S+@\S+\.\S+/.test(email);

      if (name && isValidEmail) {
        saveResume();
      }
    }, 2000); // 2 seconds debounce

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeData, saveStatus]);

  const handleReset = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    resetResume();
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between antialiased">
      {/* Top Sticky Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 tracking-tight text-lg leading-tight">Resume Generator</h1>
              <p className="text-xs font-semibold text-slate-500">MERN Stack Document Builder</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 py-1.5 px-3.5 rounded-xl border border-slate-200">
              <UserIcon className="h-3.5 w-3.5 text-slate-500" />
              <span>{user?.name || 'User'}</span>
            </div>

            <div className="flex items-center gap-2.5">
              {view === 'editor' ? (
                <>
                  {/* Autosave Status Badges */}
                  {saveStatus === 'saving' && (
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                      Saving...
                    </span>
                  )}
                  {saveStatus === 'saved' && (
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Saved
                    </span>
                  )}
                  {saveStatus === 'unsaved' && (
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                      Unsaved Changes
                    </span>
                  )}
                  {saveStatus === 'error' && (
                    <span
                      className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200 cursor-help"
                      title={error || 'Validation error'}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                      Autosave Paused
                    </span>
                  )}

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 py-2 px-3 rounded-xl text-xs font-semibold transition-all border border-slate-200"
                    title="Clear inputs for current document"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Reset Form</span>
                  </button>

                  <button
                    onClick={() => setView('dashboard')}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white py-2 px-3.5 rounded-xl text-xs font-semibold transition-all shadow-md shadow-slate-900/10"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>Dashboard</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setView('editor')}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3.5 rounded-xl text-xs font-semibold transition-all shadow-md shadow-blue-500/10"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>Resume Editor</span>
                </button>
              )}

              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-slate-200 hover:border-red-100"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex flex-col justify-start">
        {view === 'dashboard' ? (
          <Dashboard setView={setView} />
        ) : (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form Input Panel */}
              <section className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-premium">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Build Your Resume</h2>
                    <p className="text-xs text-slate-500 mt-1">Complete each section below. Your changes are automatically validated and saved.</p>
                  </div>
                  <FormPanel />
                </div>
              </section>

              {/* Dynamic Live Preview Panel */}
              <section className="lg:col-span-5 lg:sticky lg:top-24">
                <PreviewPanel />
              </section>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Resume Generator. Built with MongoDB, Express, React, Node.js.</p>
        </div>
      </footer>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowResetModal(false)}
          ></div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-sm w-full z-10 space-y-4 animate-fade-in">
            <div className="flex items-center gap-3 text-amber-600 bg-amber-50 p-3 rounded-2xl w-fit">
              <RotateCcw className="h-6 w-6 text-amber-600 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Reset Workspace</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to clear all form fields in the workspace? This will reset the editor, but won't delete your saved documents.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleResetConfirm}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-all shadow-md shadow-amber-500/10"
              >
                Reset Fields
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
