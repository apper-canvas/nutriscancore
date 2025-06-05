const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AnalyzedFoodService {
  constructor() {
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    try {
      if (window.ApperSDK) {
        const { ApperClient } = window.ApperSDK;
        this.apperClient = new ApperClient({
          apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
          apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        });
      }
    } catch (error) {
      console.error('Failed to initialize ApperClient:', error);
    }
  }

  async getAll() {
    await delay(300);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      const params = {
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'calories', 'protein', 'carbs', 'fats', 'portion_size', 'health_score', 'recommended_portion_size', 'daily_calorie_needs', 'user_profile'],
        orderBy: [
          {
            fieldName: 'CreatedOn',
            SortType: 'DESC'
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('analyzed_food', params);
      
      if (!response || !response.data) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching analyzed foods:', error);
      throw error;
    }
  }

  async getById(id) {
    await delay(300);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      const params = {
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'calories', 'protein', 'carbs', 'fats', 'portion_size', 'health_score', 'recommended_portion_size', 'daily_calorie_needs', 'user_profile']
      };

      const response = await this.apperClient.getRecordById('analyzed_food', id, params);
      
      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching analyzed food with ID ${id}:`, error);
      throw error;
    }
  }

  async getByUserProfile(userProfileId) {
    await delay(300);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      const params = {
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'calories', 'protein', 'carbs', 'fats', 'portion_size', 'health_score', 'recommended_portion_size', 'daily_calorie_needs', 'user_profile'],
        where: [
          {
            fieldName: 'user_profile',
            operator: 'EqualTo',
            values: [userProfileId.toString()]
          }
        ],
        orderBy: [
          {
            fieldName: 'CreatedOn',
            SortType: 'DESC'
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('analyzed_food', params);
      
      if (!response || !response.data) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching analyzed foods by user profile:', error);
      throw error;
    }
  }

  async create(foodData) {
    await delay(500);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      // Only include Updateable fields for create operation
      const createData = {
        Name: foodData.Name || '',
        Tags: foodData.Tags || '',
        Owner: foodData.Owner || '',
        calories: parseInt(foodData.calories) || 0,
        protein: parseFloat(foodData.protein) || 0.0,
        carbs: parseFloat(foodData.carbs) || 0.0,
        fats: parseFloat(foodData.fats) || 0.0,
        portion_size: foodData.portion_size || '',
        health_score: parseFloat(foodData.health_score) || 0.0,
        recommended_portion_size: parseInt(foodData.recommended_portion_size) || 0,
        daily_calorie_needs: parseInt(foodData.daily_calorie_needs) || 0,
        user_profile: foodData.user_profile || ''
      };

      const params = {
        records: [createData]
      };

      const response = await this.apperClient.createRecord('analyzed_food', params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error('Failed to create analyzed food');
    } catch (error) {
      console.error('Error creating analyzed food:', error);
      throw error;
    }
  }

  async update(id, foodData) {
    await delay(500);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      // Only include Updateable fields for update operation
      const updateData = {
        Id: id,
        Name: foodData.Name || '',
        Tags: foodData.Tags || '',
        Owner: foodData.Owner || '',
        calories: parseInt(foodData.calories) || 0,
        protein: parseFloat(foodData.protein) || 0.0,
        carbs: parseFloat(foodData.carbs) || 0.0,
        fats: parseFloat(foodData.fats) || 0.0,
        portion_size: foodData.portion_size || '',
        health_score: parseFloat(foodData.health_score) || 0.0,
        recommended_portion_size: parseInt(foodData.recommended_portion_size) || 0,
        daily_calorie_needs: parseInt(foodData.daily_calorie_needs) || 0,
        user_profile: foodData.user_profile || ''
      };

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord('analyzed_food', params);
      
      if (response && response.success && response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      throw new Error('Failed to update analyzed food');
    } catch (error) {
      console.error('Error updating analyzed food:', error);
      throw error;
    }
  }

  async delete(id) {
    await delay(300);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord('analyzed_food', params);
      
      if (response && response.success) {
        return true;
      }
      
      throw new Error('Failed to delete analyzed food');
    } catch (error) {
      console.error('Error deleting analyzed food:', error);
      throw error;
    }
  }
}

export default new AnalyzedFoodService();