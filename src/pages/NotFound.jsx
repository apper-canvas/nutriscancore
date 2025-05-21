import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const HomeIcon = getIcon('home');
const AlertTriangleIcon = getIcon('alert-triangle');
const ArrowLeftIcon = getIcon('arrow-left');

const NotFound = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold flex items-center gap-2">
              <HomeIcon className="h-5 w-5" />
              NutriScan
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary-light/20 text-secondary">
            <AlertTriangleIcon className="h-10 w-10" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-surface-600 dark:text-surface-400 mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track to better nutrition!
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Home
          </Link>
        </motion.div>
      </main>

      <footer className="border-t border-surface-200 dark:border-surface-700 py-4">
        <div className="container mx-auto px-4">
          <p className="text-sm text-center text-surface-500">
            © {new Date().getFullYear()} NutriScan. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;