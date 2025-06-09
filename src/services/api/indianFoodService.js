// Indian Food Recognition and Database Service
// Comprehensive database of Indian cuisine items with nutritional data and recognition capabilities

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class IndianFoodService {
  constructor() {
    // Comprehensive Indian food database with authentic dishes
    this.indianFoodDatabase = [
      // North Indian Curries
      {
        id: 'butter-chicken',
        name: 'Butter Chicken',
        keywords: ['butter chicken', 'murgh makhani', 'makhani', 'creamy chicken'],
        category: 'North Indian Curry',
        calories: 285,
        protein: 22.5,
        carbs: 8.2,
        fats: 18.5,
        healthScore: 6.8,
        portionSize: '150g',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Creamy tomato-based curry with tender chicken pieces',
        region: 'North India'
      },
      {
        id: 'palak-paneer',
        name: 'Palak Paneer',
        keywords: ['palak paneer', 'spinach paneer', 'saag paneer', 'spinach curry'],
        category: 'North Indian Curry',
        calories: 210,
        protein: 12.8,
        carbs: 9.5,
        fats: 14.2,
        healthScore: 8.5,
        portionSize: '150g',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Nutritious spinach curry with soft paneer cubes',
        region: 'North India'
      },
      {
        id: 'chana-masala',
        name: 'Chana Masala',
        keywords: ['chana masala', 'chickpea curry', 'chole', 'garbanzo curry'],
        category: 'North Indian Curry',
        calories: 180,
        protein: 8.5,
        carbs: 24.2,
        fats: 6.8,
        healthScore: 9.2,
        portionSize: '150g',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Protein-rich chickpea curry with aromatic spices',
        region: 'North India'
      },
      {
        id: 'dal-makhani',
        name: 'Dal Makhani',
        keywords: ['dal makhani', 'black dal', 'creamy dal', 'maa ki dal'],
        category: 'North Indian Curry',
        calories: 250,
        protein: 11.5,
        carbs: 22.8,
        fats: 12.5,
        healthScore: 7.5,
        portionSize: '150g',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Rich and creamy black lentil curry',
        region: 'North India'
      },

      // Biryani Varieties
      {
        id: 'chicken-biryani',
        name: 'Chicken Biryani',
        keywords: ['chicken biryani', 'biryani', 'chicken rice', 'hyderabadi biryani'],
        category: 'Biryani',
        calories: 320,
        protein: 18.5,
        carbs: 45.2,
        fats: 8.5,
        healthScore: 7.0,
        portionSize: '200g',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d8bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Aromatic basmati rice with spiced chicken',
        region: 'Hyderabad'
      },
      {
        id: 'mutton-biryani',
        name: 'Mutton Biryani',
        keywords: ['mutton biryani', 'lamb biryani', 'goat biryani', 'lucknowi biryani'],
        category: 'Biryani',
        calories: 380,
        protein: 22.8,
        carbs: 42.5,
        fats: 12.8,
        healthScore: 6.5,
        portionSize: '200g',
        image: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Fragrant rice with tender mutton pieces',
        region: 'Lucknow'
      },
      {
        id: 'vegetable-biryani',
        name: 'Vegetable Biryani',
        keywords: ['vegetable biryani', 'veg biryani', 'mixed vegetable rice'],
        category: 'Biryani',
        calories: 280,
        protein: 8.2,
        carbs: 52.5,
        fats: 6.5,
        healthScore: 8.0,
        portionSize: '200g',
        image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Colorful rice dish with seasonal vegetables',
        region: 'Various'
      },

      // South Indian Items
      {
        id: 'dosa',
        name: 'Dosa',
        keywords: ['dosa', 'masala dosa', 'plain dosa', 'crispy dosa'],
        category: 'South Indian',
        calories: 168,
        protein: 4.2,
        carbs: 32.5,
        fats: 2.8,
        healthScore: 8.5,
        portionSize: '100g',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Crispy fermented rice and lentil crepe',
        region: 'South India'
      },
      {
        id: 'idli',
        name: 'Idli',
        keywords: ['idli', 'steamed rice cake', 'idly'],
        category: 'South Indian',
        calories: 58,
        protein: 2.1,
        carbs: 12.8,
        fats: 0.2,
        healthScore: 9.5,
        portionSize: '50g (2 pieces)',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Soft steamed rice and lentil cakes',
        region: 'South India'
      },
      {
        id: 'sambar',
        name: 'Sambar',
        keywords: ['sambar', 'sambhar', 'lentil soup', 'dal sambar'],
        category: 'South Indian',
        calories: 95,
        protein: 4.8,
        carbs: 16.2,
        fats: 1.5,
        healthScore: 9.0,
        portionSize: '150ml',
        image: 'https://images.unsplash.com/photo-1626132647523-66f2bf0d4c71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Tangy lentil soup with vegetables',
        region: 'South India'
      },
      {
        id: 'vada',
        name: 'Medu Vada',
        keywords: ['vada', 'medu vada', 'medhu vada', 'urad dal vada'],
        category: 'South Indian',
        calories: 145,
        protein: 6.2,
        carbs: 18.5,
        fats: 5.8,
        healthScore: 7.0,
        portionSize: '60g (2 pieces)',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Crispy fried lentil donuts',
        region: 'South India'
      },

      // Indian Breads
      {
        id: 'naan',
        name: 'Naan',
        keywords: ['naan', 'garlic naan', 'butter naan', 'plain naan'],
        category: 'Indian Bread',
        calories: 262,
        protein: 9.1,
        carbs: 45.2,
        fats: 5.8,
        healthScore: 6.0,
        portionSize: '90g (1 piece)',
        image: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Soft leavened flatbread from tandoor',
        region: 'North India'
      },
      {
        id: 'roti',
        name: 'Chapati/Roti',
        keywords: ['roti', 'chapati', 'phulka', 'indian bread'],
        category: 'Indian Bread',
        calories: 71,
        protein: 2.8,
        carbs: 15.2,
        fats: 0.4,
        healthScore: 8.0,
        portionSize: '40g (1 piece)',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Whole wheat unleavened flatbread',
        region: 'All India'
      },
      {
        id: 'paratha',
        name: 'Paratha',
        keywords: ['paratha', 'aloo paratha', 'stuffed paratha', 'layered bread'],
        category: 'Indian Bread',
        calories: 300,
        protein: 8.5,
        carbs: 42.5,
        fats: 11.2,
        healthScore: 6.5,
        portionSize: '100g (1 piece)',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Flaky layered flatbread with filling',
        region: 'North India'
      },

      // Snacks and Appetizers
      {
        id: 'samosa',
        name: 'Samosa',
        keywords: ['samosa', 'samosa chaat', 'aloo samosa'],
        category: 'Indian Snack',
        calories: 150,
        protein: 3.5,
        carbs: 18.2,
        fats: 7.5,
        healthScore: 5.5,
        portionSize: '50g (1 piece)',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Crispy triangular pastry with spiced filling',
        region: 'All India'
      },
      {
        id: 'pakora',
        name: 'Pakora',
        keywords: ['pakora', 'bhaji', 'onion pakora', 'vegetable fritters'],
        category: 'Indian Snack',
        calories: 165,
        protein: 4.8,
        carbs: 22.5,
        fats: 6.8,
        healthScore: 6.0,
        portionSize: '80g (4-5 pieces)',
        image: 'https://images.unsplash.com/photo-1626212092657-7bf476bb726b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Crispy gram flour fritters with vegetables',
        region: 'All India'
      },

      // Lentils and Pulses
      {
        id: 'toor-dal',
        name: 'Toor Dal',
        keywords: ['toor dal', 'arhar dal', 'pigeon pea', 'yellow dal'],
        category: 'Lentils',
        calories: 120,
        protein: 7.8,
        carbs: 19.5,
        fats: 1.2,
        healthScore: 9.5,
        portionSize: '100g',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Nutritious yellow split pigeon peas',
        region: 'All India'
      },
      {
        id: 'moong-dal',
        name: 'Moong Dal',
        keywords: ['moong dal', 'mung dal', 'green gram', 'yellow moong'],
        category: 'Lentils',
        calories: 105,
        protein: 8.2,
        carbs: 17.8,
        fats: 0.8,
        healthScore: 9.8,
        portionSize: '100g',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Easy-to-digest split green gram',
        region: 'All India'
      },

      // Beverages
      {
        id: 'lassi',
        name: 'Lassi',
        keywords: ['lassi', 'mango lassi', 'sweet lassi', 'yogurt drink'],
        category: 'Indian Beverage',
        calories: 180,
        protein: 6.5,
        carbs: 28.5,
        fats: 4.2,
        healthScore: 7.5,
        portionSize: '250ml',
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Refreshing yogurt-based drink',
        region: 'North India'
      },
      {
        id: 'chai',
        name: 'Masala Chai',
        keywords: ['chai', 'masala chai', 'indian tea', 'spiced tea'],
        category: 'Indian Beverage',
        calories: 60,
        protein: 2.2,
        carbs: 8.5,
        fats: 2.8,
        healthScore: 7.0,
        portionSize: '150ml',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Aromatic spiced tea with milk',
        region: 'All India'
      },

      // Common Ingredients
      {
        id: 'basmati-rice',
        name: 'Basmati Rice',
        keywords: ['basmati rice', 'long grain rice', 'aromatic rice'],
        category: 'Grain',
        calories: 150,
        protein: 3.8,
        carbs: 33.2,
        fats: 0.4,
        healthScore: 7.0,
        portionSize: '100g cooked',
        image: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Aromatic long-grain rice variety',
        region: 'North India'
      },
      {
        id: 'turmeric',
        name: 'Turmeric (Haldi)',
        keywords: ['turmeric', 'haldi', 'yellow spice', 'curcumin'],
        category: 'Spice',
        calories: 312,
        protein: 9.7,
        carbs: 67.1,
        fats: 3.2,
        healthScore: 9.8,
        portionSize: '100g',
        image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Golden anti-inflammatory spice',
        region: 'All India'
      }
    ];
  }

  // Intelligent food recognition based on keywords and name matching
  async recognizeFood(foodName) {
    await delay(500); // Simulate processing time
    
    if (!foodName || typeof foodName !== 'string') {
      return null;
    }
    
    const searchTerm = foodName.toLowerCase().trim();
    
    // Try exact name match first
    let matchedFood = this.indianFoodDatabase.find(food => 
      food.name.toLowerCase() === searchTerm
    );
    
    // If no exact match, try keyword matching
    if (!matchedFood) {
      matchedFood = this.indianFoodDatabase.find(food =>
        food.keywords.some(keyword => 
          keyword.includes(searchTerm) || searchTerm.includes(keyword)
        )
      );
    }
    
    // If still no match, try partial name matching
    if (!matchedFood) {
      matchedFood = this.indianFoodDatabase.find(food =>
        food.name.toLowerCase().includes(searchTerm) ||
        searchTerm.includes(food.name.toLowerCase())
      );
    }
    
    return matchedFood ? { ...matchedFood } : null;
  }

  // Get healthier alternatives within the same cuisine category
  async getAlternatives(currentFood, limit = 3) {
    await delay(300);
    
    if (!currentFood) {
      return [];
    }
    
    const currentHealthScore = currentFood.healthScore || 0;
    const currentCategory = currentFood.category;
    
    // Find alternatives in the same category with higher health scores
    let alternatives = this.indianFoodDatabase.filter(food => 
      food.id !== currentFood.id &&
      food.category === currentCategory &&
      food.healthScore > currentHealthScore
    );
    
    // If no alternatives in same category, look across all Indian foods
    if (alternatives.length === 0) {
      alternatives = this.indianFoodDatabase.filter(food => 
        food.id !== currentFood.id &&
        food.healthScore > currentHealthScore
      );
    }
    
    // Sort by health score and return top alternatives
    return alternatives
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, limit)
      .map(food => ({ ...food }));
  }

  // Get all dishes by category
  async getByCategory(category) {
    await delay(200);
    
    if (!category) {
      return [...this.indianFoodDatabase];
    }
    
    return this.indianFoodDatabase
      .filter(food => food.category === category)
      .map(food => ({ ...food }));
  }

  // Get all available categories
  getCategories() {
    const categories = [...new Set(this.indianFoodDatabase.map(food => food.category))];
    return categories;
  }

  // Get dishes by region
  async getByRegion(region) {
    await delay(200);
    
    if (!region) {
      return [...this.indianFoodDatabase];
    }
    
    return this.indianFoodDatabase
      .filter(food => food.region.toLowerCase().includes(region.toLowerCase()))
      .map(food => ({ ...food }));
  }

  // Search for dishes by multiple criteria
  async searchDishes(query) {
    await delay(300);
    
    if (!query || typeof query !== 'string') {
      return [];
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    return this.indianFoodDatabase.filter(food =>
      food.name.toLowerCase().includes(searchTerm) ||
      food.description.toLowerCase().includes(searchTerm) ||
      food.keywords.some(keyword => keyword.includes(searchTerm)) ||
      food.category.toLowerCase().includes(searchTerm) ||
      food.region.toLowerCase().includes(searchTerm)
    ).map(food => ({ ...food }));
  }

  // Get nutritional analysis for a recognized dish
  async getNutritionalAnalysis(dishId) {
    await delay(200);
    
    const dish = this.indianFoodDatabase.find(food => food.id === dishId);
    
    if (!dish) {
      return null;
    }
    
    return {
      ...dish,
      nutritionalBreakdown: {
        caloriesPerGram: dish.calories / 100,
        proteinPercentage: ((dish.protein * 4) / dish.calories * 100).toFixed(1),
        carbsPercentage: ((dish.carbs * 4) / dish.calories * 100).toFixed(1),
        fatsPercentage: ((dish.fats * 9) / dish.calories * 100).toFixed(1)
      },
      healthBenefits: this.getHealthBenefits(dish),
      cookingTips: this.getCookingTips(dish)
    };
  }

  // Get health benefits for a dish
  getHealthBenefits(dish) {
    const benefits = [];
    
    if (dish.category === 'Lentils') {
      benefits.push('High in plant-based protein', 'Rich in fiber', 'Good source of folate');
    }
    
    if (dish.category === 'South Indian') {
      benefits.push('Fermented foods aid digestion', 'Probiotic benefits');
    }
    
    if (dish.healthScore >= 8) {
      benefits.push('Nutrient-dense', 'Supports overall health');
    }
    
    if (dish.protein >= 10) {
      benefits.push('Good protein source');
    }
    
    return benefits;
  }

  // Get cooking tips for a dish
  getCookingTips(dish) {
    const tips = [];
    
    if (dish.category === 'Indian Bread') {
      tips.push('Best served hot', 'Can be made with whole wheat for added nutrition');
    }
    
    if (dish.category === 'North Indian Curry') {
      tips.push('Pair with rice or bread', 'Adjust spice level to taste');
    }
    
    if (dish.category === 'South Indian') {
      tips.push('Serve with coconut chutney and sambar', 'Best consumed fresh');
    }
    
    return tips;
  }

  // Get complete database (for testing/admin purposes)
  getAllDishes() {
    return [...this.indianFoodDatabase];
  }
}

export default new IndianFoodService();