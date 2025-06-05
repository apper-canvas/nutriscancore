import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

const CameraIcon = getIcon('camera');
const UploadIcon = getIcon('upload');
const InfoIcon = getIcon('info');
const AlertTriangleIcon = getIcon('alert-triangle');
const CheckCircleIcon = getIcon('check-circle');
const ArrowRightIcon = getIcon('arrow-right');
const RefreshCwIcon = getIcon('refresh-cw');
const CalculatorIcon = getIcon('calculator');
const HeartIcon = getIcon('heart');
const LeafIcon = getIcon('leaf');
const ScaleIcon = getIcon('scale');
const TrendingDownIcon = getIcon('trending-down');
const TrendingUpIcon = getIcon('trending-up');
const ZapIcon = getIcon('zap');

const MainFeature = ({ selectedUnit }) => {
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [userProfile, setUserProfile] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
    goal: '',
    activityLevel: ''
  });
const [nutritionData, setNutritionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [alternativesLoading, setAlternativesLoading] = useState(false);
  const [alternatives, setAlternatives] = useState([]);

  // Mock data for alternatives
  const mockAlternatives = [
    {
      id: 1,
      name: 'Sweet Potato',
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fats: 0.1,
      healthScore: 9.2,
      image: 'https://images.unsplash.com/photo-1596097634814-d25a85d5c756?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Quinoa',
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fats: 1.9,
      healthScore: 8.7,
      image: 'https://images.unsplash.com/photo-1598156594096-9aba6e8f8000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Brown Rice',
      calories: 112,
      protein: 2.6,
      carbs: 23.5,
      fats: 0.9,
      healthScore: 7.8,
      image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload an image file");
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to calculate BMI
  const calculateBMI = () => {
    if (!userProfile.height || !userProfile.weight) return null;
    
    let height = parseFloat(userProfile.height);
    let weight = parseFloat(userProfile.weight);
    
    // Convert from imperial to metric if needed
    if (selectedUnit === 'imperial') {
      // Convert pounds to kg
      weight = weight * 0.453592;
      // Convert feet to m
      height = height * 0.0254;
    } else {
      // Convert cm to m
      height = height / 100;
    }
    
    const bmi = weight / (height * height);
    return bmi.toFixed(1);
  };

  // Get BMI category
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obese", color: "text-red-500" };
  };

  // Handle form submission to analyze image
  const handleAnalyzeImage = async () => {
    if (!previewImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data for food nutrition analysis
      const mockNutritionData = {
        name: "White Rice",
        calories: 130,
        protein: 2.7,
        carbs: 28.2,
        fats: 0.3,
        portionSize: "100g",
        healthScore: 6.5,
        recommendedPortionSize: calculateRecommendedPortionSize(),
        dailyCalorieNeeds: calculateDailyCalories()
      };

      setNutritionData(mockNutritionData);
      setIsLoading(false);
      toast.success("Food analyzed successfully!");
      setStep(3);
    }, 2000);
  };

  // Calculate daily calorie needs based on user profile
  const calculateDailyCalories = () => {
    // This is a simplified formula - in a real app, you would use the Harris-Benedict equation
    let bmr = 0;
    const weight = parseFloat(userProfile.weight);
    const height = parseFloat(userProfile.height);
    const age = parseFloat(userProfile.age) || 30;
    
    // Convert from imperial to metric if needed
    let weightInKg = weight;
    let heightInCm = height;
    
    if (selectedUnit === 'imperial') {
      // Convert pounds to kg
      weightInKg = weight * 0.453592;
      // Convert inches to cm
      heightInCm = height * 2.54;
    }
    
    // Basic BMR calculation
    if (userProfile.gender === 'male') {
      bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
    }
    
    // Activity multiplier
    let activityMultiplier = 1.2; // Sedentary
    switch (userProfile.activityLevel) {
      case 'lightly-active':
        activityMultiplier = 1.375;
        break;
      case 'moderately-active':
        activityMultiplier = 1.55;
        break;
      case 'very-active':
        activityMultiplier = 1.725;
        break;
      case 'extra-active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.2;
    }
    
    let calories = Math.round(bmr * activityMultiplier);
    
    // Adjust for goal
    if (userProfile.goal === 'loss') {
      calories -= 500; // Calorie deficit for weight loss
    } else if (userProfile.goal === 'gain') {
      calories += 500; // Calorie surplus for weight gain
    }
    
    return calories;
  };

  // Calculate recommended portion size based on user profile and food calories
  const calculateRecommendedPortionSize = () => {
    // This is a simplified calculation
    const mealCalorieAllocation = 0.3; // 30% of daily calories for one meal
    const dailyCalories = calculateDailyCalories();
    const mealCalories = dailyCalories * mealCalorieAllocation;
    
    // Assuming "White Rice" has 130 calories per 100g
    const caloriesPerGram = 130 / 100;
    const recommendedGrams = Math.round(mealCalories / caloriesPerGram);
    
    return recommendedGrams;
  };

// Reset the analysis
  const handleReset = () => {
    setPreviewImage(null);
    setNutritionData(null);
    setShowAlternatives(false);
    setAlternatives([]);
    setAlternativesLoading(false);
    setStep(1);
    toast.info("Analysis reset. You can upload a new food image.");
  };
// Toggle showing alternatives
  const toggleAlternatives = () => {
    if (!showAlternatives) {
      // Load alternatives when showing them
      setAlternativesLoading(true);
      setTimeout(() => {
        setAlternatives(mockAlternatives);
        setAlternativesLoading(false);
      }, 1000);
}
    setShowAlternatives(!showAlternatives);
  };
  // Render the upload area
// Render the upload area
  const renderUploadArea = () => (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
        isDragging
          ? 'border-primary bg-primary/5' 
          : 'border-surface-300 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {previewImage ? (
        <div className="space-y-4">
          <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden rounded-lg">
            <img 
              src={previewImage} 
              alt="Food preview" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="btn btn-outline"
            >
              <RefreshCwIcon className="h-4 w-4" />
              Change Image
            </button>
            
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn btn-primary"
            >
              Continue
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CameraIcon className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Upload Food Image</h3>
            <p className="text-surface-600 dark:text-surface-400 max-w-md mx-auto">
              Take a photo or upload an image of your food to analyze its nutritional content
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <label className="btn btn-primary cursor-pointer">
              <UploadIcon className="h-4 w-4" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                // For demo purposes, set a sample image
                setPreviewImage('https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');
                toast.success("Sample image loaded for demonstration");
              }}
            >
              Use Sample Image
            </button>
          </div>
          
          <p className="text-xs text-surface-500">
            Supported formats: JPG, PNG, WebP (Max size: 10MB)
          </p>
        </div>
      )}
    </div>
  );

  // Render the user profile form
  const renderProfileForm = () => (
    <div className="card p-6">
      <h3 className="text-xl font-semibold mb-4">Your Information</h3>
      <p className="text-surface-600 dark:text-surface-400 mb-6">
        We'll use this to calculate your personalized nutrition recommendations
      </p>
      
      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="height" className="form-label">
              Height {selectedUnit === 'metric' ? '(cm)' : '(in)'}
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={userProfile.height}
              onChange={handleInputChange}
              placeholder={selectedUnit === 'metric' ? 'Height in cm' : 'Height in inches'}
              className="input-field"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="weight" className="form-label">
              Weight {selectedUnit === 'metric' ? '(kg)' : '(lb)'}
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={userProfile.weight}
              onChange={handleInputChange}
              placeholder={selectedUnit === 'metric' ? 'Weight in kg' : 'Weight in pounds'}
              className="input-field"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={userProfile.age}
              onChange={handleInputChange}
              placeholder="Your age"
              className="input-field"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              name="gender"
              value={userProfile.gender}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other/Prefer not to say</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="goal" className="form-label">Your Goal</label>
            <select
              id="goal"
              name="goal"
              value={userProfile.goal}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Select goal</option>
              <option value="loss">Weight Loss</option>
              <option value="maintain">Maintain Weight</option>
              <option value="gain">Weight Gain</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="activityLevel" className="form-label">Activity Level</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={userProfile.activityLevel}
              onChange={handleInputChange}
              className="input-field"
            >
              <option value="">Select activity level</option>
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="lightly-active">Lightly active (light exercise 1-3 days/week)</option>
              <option value="moderately-active">Moderately active (moderate exercise 3-5 days/week)</option>
              <option value="very-active">Very active (hard exercise 6-7 days/week)</option>
              <option value="extra-active">Extra active (very hard exercise & physical job)</option>
            </select>
          </div>
        </div>
        
        {userProfile.height && userProfile.weight && (
          <div className="p-4 bg-surface-100 dark:bg-surface-800 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CalculatorIcon className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Your BMI</h4>
            </div>
            
            {(() => {
              const bmi = calculateBMI();
              const { category, color } = getBMICategory(bmi);
              
              return (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold">{bmi}</span>
                    <span className={`ml-2 ${color}`}>{category}</span>
                  </div>
                  
                  <div className="text-sm text-surface-600 dark:text-surface-400">
                    {category === "Underweight" && (
                      <div className="flex items-center gap-1">
                        <TrendingUpIcon className="h-4 w-4 text-blue-500" />
                        <span>Consider gaining some weight</span>
                      </div>
                    )}
                    {category === "Normal" && (
                      <div className="flex items-center gap-1">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span>Healthy weight range</span>
                      </div>
                    )}
                    {category === "Overweight" && (
                      <div className="flex items-center gap-1">
                        <TrendingDownIcon className="h-4 w-4 text-yellow-500" />
                        <span>Consider losing some weight</span>
                      </div>
                    )}
                    {category === "Obese" && (
                      <div className="flex items-center gap-1">
                        <AlertTriangleIcon className="h-4 w-4 text-red-500" />
                        <span>Weight loss recommended</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
        
        <div className="flex justify-between pt-3">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="btn btn-outline"
          >
            Back
          </button>
          
          <button
            type="button"
            onClick={handleAnalyzeImage}
            className="btn btn-primary"
            disabled={isLoading || !previewImage || !userProfile.height || !userProfile.weight}
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Analyzing...
              </>
            ) : (
              <>
                Analyze Food
                <ArrowRightIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );

  // Render the nutrition results
  const renderResults = () => (
    <AnimatePresence>
      {nutritionData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Food Image */}
            <div className="lg:col-span-1">
              <div className="card overflow-hidden">
                <div className="relative h-48 sm:h-64">
                  <img 
                    src={previewImage} 
                    alt={nutritionData.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-4">
                    <h3 className="text-xl font-bold">{nutritionData.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm opacity-90">{nutritionData.portionSize} serving</span>
                      <span className="h-1 w-1 rounded-full bg-white/60"></span>
                      <div className="flex items-center gap-1">
                        <HeartIcon className="h-3 w-3" />
                        <span className="text-sm">Health score: {nutritionData.healthScore}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between mb-4">
                    <div className="text-center">
                      <span className="text-sm text-surface-500">Calories</span>
                      <div className="text-xl font-bold">{nutritionData.calories}</div>
                      <span className="text-xs text-surface-500">kcal</span>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-sm text-surface-500">Proteins</span>
                      <div className="text-xl font-bold">{nutritionData.protein}g</div>
                      <span className="text-xs text-surface-500">per serving</span>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-sm text-surface-500">Carbs</span>
                      <div className="text-xl font-bold">{nutritionData.carbs}g</div>
                      <span className="text-xs text-surface-500">per serving</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={toggleAlternatives}
                    className="w-full btn btn-outline mb-2"
                  >
                    {showAlternatives ? 'Hide Alternatives' : 'Show Healthier Alternatives'}
                    <LeafIcon className="h-4 w-4 text-primary" />
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="w-full btn btn-outline"
                  >
                    <RefreshCwIcon className="h-4 w-4" />
                    Analyze Another Food
                  </button>
                </div>
              </div>
            </div>
            
            {/* Personal Recommendations */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Your Personalized Recommendations</h3>
                  <ScaleIcon className="h-5 w-5 text-primary" />
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400 mb-1">
                        <ZapIcon className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-medium">Daily Calorie Needs</span>
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{nutritionData.dailyCalorieNeeds}</span>
                        <span className="text-sm text-surface-500 mb-0.5">calories/day</span>
                      </div>
                      <p className="text-xs text-surface-500 mt-1">
                        Based on your height, weight, age, gender, and activity level
                      </p>
                    </div>
                    
                    <div className="bg-surface-50 dark:bg-surface-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400 mb-1">
                        <InfoIcon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Recommended Portion</span>
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold">{nutritionData.recommendedPortionSize}g</span>
                        <span className="text-sm text-surface-500 mb-0.5">of {nutritionData.name}</span>
                      </div>
                      <p className="text-xs text-surface-500 mt-1">
                        Adjusted for your calorie needs and weight goals
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {userProfile.goal === 'loss' ? (
                          <TrendingDownIcon className="h-5 w-5 text-secondary" />
                        ) : userProfile.goal === 'gain' ? (
                          <TrendingUpIcon className="h-5 w-5 text-primary" />
                        ) : (
                          <ScaleIcon className="h-5 w-5 text-accent" />
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">
                          {userProfile.goal === 'loss' 
                            ? 'Weight Loss Recommendation' 
                            : userProfile.goal === 'gain'
                              ? 'Weight Gain Recommendation'
                              : 'Weight Maintenance Recommendation'}
                        </h4>
                        <p className="text-sm text-surface-600 dark:text-surface-400">
                          {userProfile.goal === 'loss' 
                            ? `This portion of ${nutritionData.name} contributes ${Math.round((nutritionData.calories / nutritionData.dailyCalorieNeeds) * 100)}% to your daily calorie goal. Consider pairing with vegetables to increase volume without adding many calories.` 
                            : userProfile.goal === 'gain'
                              ? `This portion of ${nutritionData.name} provides good carbohydrates for your weight gain goal. Consider adding a protein source to maximize muscle building potential.`
                              : `This balanced portion of ${nutritionData.name} fits well within your maintenance calories. Ensure you're balancing your meals throughout the day for optimal nutrition.`}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Healthier Alternatives */}
                  <AnimatePresence>
                    {showAlternatives && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="space-y-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <LeafIcon className="h-4 w-4 text-primary" />
                            Healthier Alternatives to {nutritionData.name}
</h4>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {alternativesLoading ? (
                              // Loading state for alternatives
                              Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden animate-pulse">
                                  <div className="h-24 bg-surface-200 dark:bg-surface-700"></div>
                                  <div className="p-3">
                                    <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded mb-2"></div>
                                    <div className="flex justify-between">
                                      <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-12"></div>
                                      <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-16"></div>
                                      <div className="h-3 bg-surface-200 dark:bg-surface-700 rounded w-12"></div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : alternatives.length > 0 ? (
                              alternatives.map((alt) => (
                                <div key={alt.id} className="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden hover:border-primary dark:hover:border-primary-light transition-colors">
                                  <div className="relative h-24">
                                    <img 
                                      src={alt.image || 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
                                      alt={alt.name}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                                      +{Math.round(((alt.healthScore || 0) - (nutritionData?.healthScore || 0)) * 10)}% healthier
                                    </div>
                                  </div>
                                  <div className="p-3">
                                    <h5 className="font-medium mb-1">{alt.name}</h5>
                                    <div className="flex items-center justify-between text-xs text-surface-600 dark:text-surface-400">
                                      <span>{alt.calories || 0} kcal</span>
                                      <span>{alt.protein || 0}g protein</span>
                                      <span>{alt.carbs || 0}g carbs</span>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="col-span-3 text-center py-8 text-surface-500">
                                No healthier alternatives found. Try analyzing different foods!
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

return (
    <section className="max-w-7xl mx-auto">
      <div className="mb-10">
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">Analyze Your Food</h2>
          <p className="text-surface-600 dark:text-surface-400">
            Upload a photo of your meal to get nutritional information and personalized recommendations
            based on your health goals.
          </p>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="flex items-center justify-between p-1 bg-surface-100 dark:bg-surface-800 rounded-lg">
            <button
              onClick={() => step === 3 ? handleReset() : setStep(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                step === 1 
                  ? 'bg-white dark:bg-surface-700 shadow-sm' 
                  : 'hover:bg-white/50 dark:hover:bg-surface-700/50'
              }`}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full ${
                step === 1 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300'
              }`}>
                1
              </span>
              <span>Upload Image</span>
            </button>
            
            <button
              onClick={() => previewImage && setStep(2)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                step === 2 
                  ? 'bg-white dark:bg-surface-700 shadow-sm' 
                  : previewImage 
                    ? 'hover:bg-white/50 dark:hover:bg-surface-700/50' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!previewImage}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full ${
                step === 2 
                  ? 'bg-primary text-white' 
                  : previewImage 
                    ? 'bg-surface-200 dark:bg-surface-600 text-surface-700 dark:text-surface-300' 
                    : 'bg-surface-300 dark:bg-surface-700 text-surface-500 dark:text-surface-500'
              }`}>
                2
              </span>
              <span>Your Info</span>
            </button>
            
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                step === 3 
                  ? 'bg-white dark:bg-surface-700 shadow-sm' 
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={step !== 3}
            >
              <span className={`flex items-center justify-center w-6 h-6 rounded-full ${
                step === 3 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-300 dark:bg-surface-700 text-surface-500 dark:text-surface-500'
              }`}>
                3
              </span>
              <span>Results</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        {previewImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sticky Preview Column */}
            <div className="lg:col-span-1">
              <div className="sticky-preview">
                <div className="card overflow-hidden">
                  <div className="relative h-48 sm:h-64">
                    <img 
                      src={previewImage} 
                      alt="Food preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-4">
                      <h3 className="text-lg font-bold">
                        {nutritionData ? nutritionData.name : 'Analyzing...'}
                      </h3>
                      {nutritionData && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm opacity-90">{nutritionData.portionSize} serving</span>
                          <span className="h-1 w-1 rounded-full bg-white/60"></span>
                          <div className="flex items-center gap-1">
                            <HeartIcon className="h-3 w-3" />
                            <span className="text-sm">Health: {nutritionData.healthScore}/10</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {nutritionData && (
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center">
                          <span className="text-xs text-surface-500">Calories</span>
                          <div className="text-lg font-bold">{nutritionData.calories}</div>
                        </div>
                        <div className="text-center">
                          <span className="text-xs text-surface-500">Protein</span>
                          <div className="text-lg font-bold">{nutritionData.protein}g</div>
                        </div>
                        <div className="text-center">
                          <span className="text-xs text-surface-500">Carbs</span>
                          <div className="text-lg font-bold">{nutritionData.carbs}g</div>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleReset}
                        className="w-full btn btn-outline text-sm"
                      >
                        <RefreshCwIcon className="h-4 w-4" />
                        Analyze New Food
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {step === 1 && renderUploadArea()}
              {step === 2 && renderProfileForm()}
              {step === 3 && renderResults()}
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {step === 1 && renderUploadArea()}
            {step === 2 && renderProfileForm()}
            {step === 3 && renderResults()}
          </div>
        )}
      </div>
    </section>
  );
};

export default MainFeature;