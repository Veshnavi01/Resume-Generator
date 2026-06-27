import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import ResumeBuilder from './components/ResumeBuilder';
import Login from './pages/Login';
import Register from './pages/Register';
import { Loader2 } from 'lucide-react';

function App() {
  const { user, authLoading } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return authView === 'login' ? (
      <Login onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return <ResumeBuilder />;
}

export default App;
