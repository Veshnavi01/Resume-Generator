import { useEffect, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useNotification } from '../../context/NotificationContext';
import { resumeService } from '../../services/api';
import { 
  FileText, 
  Plus, 
  Search, 
  Trash2, 
  Copy, 
  Calendar, 
  RefreshCw, 
  Edit2, 
  Check, 
  X, 
  ArrowUpDown,
  AlertTriangle
} from 'lucide-react';

const Dashboard = ({ setView }) => {
  const {
    savedResumes,
    loading,
    fetchResumes,
    loadResume,
    deleteResume,
    duplicateResume,
    createNewResume,
  } = useResume();

  const { showToast } = useNotification();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' | 'oldest' | 'alphabetical'
  const [editingId, setEditingId] = useState(null);
  const [renameTitle, setRenameTitle] = useState('');
  const [renameLoading, setRenameLoading] = useState(false);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    id: null,
    name: '',
  });

  useEffect(() => {
    fetchResumes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateNew = () => {
    createNewResume();
    setView('editor');
    showToast('Created new resume template.', 'success');
  };

  const handleOpen = async (id) => {
    showToast('Loading resume...', 'loading', 1000);
    await loadResume(id);
    setView('editor');
  };

  // Open Delete Confirmation Modal
  const confirmDelete = (e, id, name) => {
    e.stopPropagation();
    setDeleteModal({
      show: true,
      id,
      name: name || 'Untitled Resume',
    });
  };

  // Execute Delete from Modal
  const handleDeleteExecute = async () => {
    const { id, name } = deleteModal;
    setDeleteModal({ show: false, id: null, name: '' });
    showToast(`Deleting "${name}"...`, 'loading', 0);
    
    try {
      await deleteResume(id);
      showToast('Resume deleted successfully.', 'success');
    } catch (err) {
      showToast('Failed to delete resume.', 'error');
    }
  };

  const handleDuplicate = async (e, id) => {
    e.stopPropagation();
    showToast('Duplicating resume...', 'loading', 0);
    try {
      await duplicateResume(id);
      showToast('Resume duplicated successfully.', 'success');
    } catch (err) {
      showToast('Failed to duplicate resume.', 'error');
    }
  };

  // Start Rename Inline
  const startRename = (e, id, currentName) => {
    e.stopPropagation();
    setEditingId(id);
    setRenameTitle(currentName || '');
  };

  // Cancel Rename
  const cancelRename = (e) => {
    e.stopPropagation();
    setEditingId(null);
    setRenameTitle('');
  };

  // Save Rename to Backend
  const saveRename = async (e, resume) => {
    e.stopPropagation();
    if (!renameTitle.trim()) {
      showToast('Candidate name cannot be empty.', 'warning');
      return;
    }

    setRenameLoading(true);
    showToast('Renaming...', 'loading', 0);

    try {
      // Build updated resume details payload
      const updatedDetails = {
        ...resume.personalDetails,
        fullName: renameTitle.trim(),
      };
      
      const res = await resumeService.updateResume(resume._id, {
        ...resume,
        personalDetails: updatedDetails,
      });

      if (res.success) {
        showToast('Resume renamed successfully.', 'success');
        setEditingId(null);
        await fetchResumes(); // Refresh dashboard list
      }
    } catch (err) {
      showToast('Failed to rename resume.', 'error');
    } finally {
      setRenameLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter and Sort Resumes list
  const getProcessedResumes = () => {
    let list = [...(savedResumes || [])];

    // Filter
    if (searchQuery.trim()) {
      list = list.filter((r) => {
        const name = r.personalDetails?.fullName || '';
        return name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === 'latest') {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      }
      if (sortBy === 'alphabetical') {
        const nameA = (a.personalDetails?.fullName || '').toLowerCase();
        const nameB = (b.personalDetails?.fullName || '').toLowerCase();
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

    return list;
  };

  const processedResumes = getProcessedResumes();

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Saved Resumes</h2>
          <p className="text-sm text-slate-500 mt-1">Manage, edit, duplicate, and download your resumes all in one place.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-2xl text-sm transition-all shadow-md shadow-blue-500/15 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Create New Resume
        </button>
      </div>

      {/* Search & Sort Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <ArrowUpDown className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-50/50 focus:border-blue-500"
          >
            <option value="latest">Sort by: Latest Updated</option>
            <option value="oldest">Sort by: Oldest Updated</option>
            <option value="alphabetical">Sort by: Name (A-Z)</option>
          </select>
        </div>

        {/* Refresh count status */}
        <div className="flex items-center gap-2 shrink-0 ml-auto text-xs text-slate-550">
          <button
            onClick={fetchResumes}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
            title="Refresh resume list"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <span className="text-xs text-slate-500 font-semibold">
            Showing {processedResumes.length} of {savedResumes.length} resumes
          </span>
        </div>
      </div>

      {/* Grid of Resumes */}
      {loading && savedResumes.length === 0 ? (
        <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <RefreshCw className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Loading your saved resumes...</p>
        </div>
      ) : processedResumes.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl shadow-sm border-dashed">
          {/* SVG Empty State illustration */}
          <svg className="mx-auto h-24 w-24 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-base font-bold text-slate-700">No resumes found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery 
              ? `No results match your search "${searchQuery}". Try another keyword.` 
              : "Get started by creating a new professional resume using our interactive builder."}
          </p>
          {!searchQuery && (
            <button
              onClick={handleCreateNew}
              className="mt-5 inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-all shadow-md shadow-blue-500/10"
            >
              <Plus className="h-4 w-4" />
              Build a Resume
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Resume Card */}
          <div
            onClick={handleCreateNew}
            className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-md rounded-3xl p-6 min-h-[200px] cursor-pointer transition-all duration-205 group text-center"
          >
            <div className="bg-slate-100 text-slate-650 p-3 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-650 transition-all mb-3">
              <Plus className="h-6 w-6" />
            </div>
            <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-all text-sm">Create New Resume</h4>
            <p className="text-xs text-slate-400 mt-1">Start writing from a fresh document template.</p>
          </div>

          {/* Existing Resumes cards */}
          {processedResumes.map((resume) => {
            const isEditing = editingId === resume._id;
            const name = resume.personalDetails?.fullName || 'Untitled Resume';
            const email = resume.personalDetails?.email || '';
            const summary = resume.personalDetails?.summary || '';
            
            return (
              <div
                key={resume._id}
                onClick={() => !isEditing && handleOpen(resume._id)}
                className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-lg rounded-3xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 relative group animate-fade-in"
              >
                <div>
                  {/* Card Header Info */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                      <FileText className="h-5 w-5" />
                    </div>
                    
                    {/* Action buttons (Rename, Duplicate, Delete) */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={(e) => startRename(e, resume._id, name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        title="Rename candidate"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDuplicate(e, resume._id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        title="Duplicate resume"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={(e) => confirmDelete(e, resume._id, name)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        title="Delete resume"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title or inline edit name input */}
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 mt-2 mb-1" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={renameTitle}
                        onChange={(e) => setRenameTitle(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 px-2.5 py-1 text-sm rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={(e) => saveRename(e, resume)}
                        disabled={renameLoading}
                        className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-all"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={cancelRename}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-all"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-all text-base truncate mt-1">
                      {name}
                    </h4>
                  )}
                  
                  {email && <p className="text-xs text-slate-500 truncate mt-0.5">{email}</p>}
                  
                  {summary ? (
                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {summary}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-350 italic mt-2.5">
                      No professional summary added yet.
                    </p>
                  )}
                </div>

                {/* Footer Metadata */}
                <div className="border-t border-slate-100 pt-4 mt-5 flex items-center justify-between text-[11px] text-slate-505 text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>{formatDate(resume.updatedAt)}</span>
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg font-bold capitalize">
                    {resume.templateId || 'modern'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal Overlay */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setDeleteModal({ show: false, id: null, name: '' })}
          ></div>
          
          {/* Modal Content Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl max-w-sm w-full z-10 space-y-4 animate-fade-in">
            <div className="flex items-center gap-3 text-red-650 bg-red-50 p-3 rounded-2xl w-fit">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Delete Resume</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Are you sure you want to permanently delete the resume for <strong className="text-slate-800">"{deleteModal.name}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteModal({ show: false, id: null, name: '' })}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteExecute}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-md shadow-red-500/10"
              >
                Delete Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
