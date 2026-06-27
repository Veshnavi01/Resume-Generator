/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, Loader2 } from 'lucide-react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' | 'error' | 'warning' | 'info' | 'loading'
  });

  const showToast = (message, type = 'success', duration = 3500) => {
    setToast({ show: true, message, type });

    if (type !== 'loading' && duration > 0) {
      setTimeout(() => {
        setToast((prev) => (prev.message === message ? { ...prev, show: false } : prev));
      }, duration);
    }
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  return (
    <NotificationContext.Provider value={{ showToast, hideToast }}>
      {children}

      {/* Floating premium toast container */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[9999] max-w-md animate-fade-in">
          <div className={`flex items-center gap-3 py-3.5 px-5 rounded-2xl border shadow-xl bg-white ${
            toast.type === 'success' ? 'border-emerald-100 text-emerald-800' :
            toast.type === 'error' ? 'border-red-100 text-red-800' :
            toast.type === 'warning' ? 'border-amber-100 text-amber-800' :
            toast.type === 'loading' ? 'border-blue-100 text-blue-800' :
            'border-slate-100 text-slate-800'
          }`}>
            {/* Icon Selection */}
            {toast.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />}
            {toast.type === 'error' && <XCircle className="h-5 w-5 text-red-500 shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-slate-500 shrink-0" />}
            {toast.type === 'loading' && <Loader2 className="h-5 w-5 text-blue-500 shrink-0 animate-spin" />}

            {/* Message Text */}
            <p className="text-xs font-semibold select-none leading-relaxed text-slate-700">
              {toast.message}
            </p>

            {/* Close Button (only for non-loading states) */}
            {toast.type !== 'loading' && (
              <button
                onClick={hideToast}
                className="ml-3 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all text-[10px] font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
