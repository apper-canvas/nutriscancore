import { createContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setUser, clearUser } from './store/userSlice';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Callback from './pages/Callback'
import ErrorPage from './pages/ErrorPage'
import EmailVerification from './pages/EmailVerification'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import 'react-toastify/dist/ReactToastify.css'

export const AuthContext = createContext(null);

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Get authentication status with proper error handling
  const userState = useSelector((state) => state.user);
  const isAuthenticated = userState?.isAuthenticated || false;

  useEffect(() => {
    // Apply the dark mode class to the document element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save user preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Initialize ApperUI once when the app loads
  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const client = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Initialize but don't show login yet
    ApperUI.setup(client, {
      target: '#authentication',
      clientId: import.meta.env.VITE_APPER_PROJECT_ID,
      view: 'both',
      onSuccess: function (user) {
        setIsInitialized(true);
// CRITICAL: This exact currentPath logic must be preserved in all implementations
        // DO NOT simplify or modify this pattern as it ensures proper redirection flow
        let currentPath = window.location.pathname + window.location.search;
        let redirectPath = null;
        try {
          if (typeof URLSearchParams !== 'undefined') {
            redirectPath = new URLSearchParams(window.location.search).get('redirect');
          } else if (window.location.search) {
            const match = window.location.search.match(/[?&]redirect=([^&]*)/);
            redirectPath = match ? decodeURIComponent(match[1]) : null;
          }
        } catch (error) {
          console.warn('Error parsing redirect parameter:', error);
          redirectPath = null;
        }
        const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup') || currentPath.includes(
          '/callback') || currentPath.includes('/error');
        if (user) {
          // User is authenticated
          if (redirectPath) {
            navigate(redirectPath);
          } else if (!isAuthPage) {
            if (!currentPath.includes('/login') && !currentPath.includes('/signup')) {
              navigate(currentPath);
            } else {
              navigate('/');
            }
          } else {
            navigate('/');
          }
          // Store user information in Redux
          dispatch(setUser(JSON.parse(JSON.stringify(user))));
        } else {
          // User is not authenticated
          if (!isAuthPage) {
            navigate(
              currentPath.includes('/signup')
                ? `/signup?redirect=${currentPath}`
                : currentPath.includes('/login')
                  ? `/login?redirect=${currentPath}`
                  : '/login');
          } else if (redirectPath) {
            if (
              ![
                'error',
                'signup',
                'login',
                'callback'
              ].some((path) => currentPath.includes(path)))
              navigate(`/login?redirect=${redirectPath}`);
            else {
              navigate(currentPath);
            }
          } else if (isAuthPage) {
            navigate(currentPath);
          } else {
            navigate('/login');
          }
          dispatch(clearUser());
        }
      },
      onError: function (error) {
        console.error("Authentication failed:", error);
      }
    });
  }, [navigate, dispatch]);

  // Authentication methods to share via context
  const authMethods = {
    isInitialized,
    logout: async () => {
      try {
        const { ApperUI } = window.ApperSDK;
        await ApperUI.logout();
        dispatch(clearUser());
        navigate('/login');
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  // Don't render routes until initialization is complete
  if (!isInitialized) {
    return <div className="loading">Initializing application...</div>;
  }

  return (
    <AuthContext.Provider value={authMethods}>
      <div className="min-h-screen transition-colors duration-300">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<Home darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          <Route path="*" element={<NotFound darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="z-50"
      />
    </AuthContext.Provider>
  );
}

export default App;