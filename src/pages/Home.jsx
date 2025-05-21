import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const MoonIcon = getIcon('moon');
const SunIcon = getIcon('sun');
const LeafIcon = getIcon('leaf');
const BarChart2Icon = getIcon('bar-chart-2');
const DropletIcon = getIcon('droplet');

const Home = ({ darkMode, toggleDarkMode }) => {
  const [selectedUnit, setSelectedUnit] = useState('metric');
  
  const handleUnitToggle = (unit) => {
    setSelectedUnit(unit);
    toast.info(`Switched to ${unit === 'metric' ? 'Metric (kg/cm)' : 'Imperial (lb/ft)'} units`);
  };

  return (
    <div className="min-h-screen">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-surface-900/70 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center">
                <LeafIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">NutriScan</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
                <button 
                  onClick={() => handleUnitToggle('metric')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedUnit === 'metric' 
                      ? 'bg-white dark:bg-surface-700 shadow-sm' 
                      : 'hover:bg-white/50 dark:hover:bg-surface-700/50'
                  }`}
                >
                  Metric (kg/cm)
                </button>
                <button 
                  onClick={() => handleUnitToggle('imperial')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    selectedUnit === 'imperial' 
                      ? 'bg-white dark:bg-surface-700 shadow-sm' 
                      : 'hover:bg-white/50 dark:hover:bg-surface-700/50'
                  }`}
                >
                  Imperial (lb/ft)
                </button>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-surface-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-light/10 text-primary-dark dark:text-primary-light text-sm font-medium">
                  <DropletIcon className="h-4 w-4 mr-2" />
                  <span>Healthy Eating Made Simple</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                  Discover What's in Your Food with{" "}
                  <span className="text-primary dark:text-primary-light">NutriScan</span>
                </h1>
                
                <p className="text-lg text-surface-600 dark:text-surface-300 max-w-xl text-balance">
                  Upload a photo of your meal and instantly get nutrition facts, calorie counts, and 
                  personalized recommendations based on your health goals.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BarChart2Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm md:text-base">Accurate Nutrition Analysis</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <LeafIcon className="h-5 w-5 text-secondary" />
                    </div>
                    <span className="text-sm md:text-base">Healthier Food Alternatives</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-full"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Healthy food plate" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Floating item */}
              <div className="absolute -bottom-6 -left-6 w-48 h-24 bg-white dark:bg-surface-800 rounded-xl shadow-soft p-3 border border-surface-200 dark:border-surface-700">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Healthy salad"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold mb-1">Quinoa Salad</h4>
                    <div className="flex items-center text-xs text-surface-600 dark:text-surface-400">
                      <span className="font-medium">320</span>
                      <span className="mx-1">cal</span>
                      <span className="ml-2 px-1.5 py-0.5 bg-primary-light/20 text-primary-dark dark:text-primary-light rounded text-xs">
                        Healthy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Main Feature Section */}
        <MainFeature selectedUnit={selectedUnit} />
      </main>

      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-600 dark:text-surface-400">
              © {new Date().getFullYear()} NutriScan. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <a href="#" className="text-sm hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-primary">Terms of Service</a>
              <a href="#" className="text-sm hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;