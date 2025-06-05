const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FoodAlternativeService {
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
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'calories', 'protein', 'carbs', 'fats', 'health_score', 'image'],
        orderBy: [
          {
            fieldName: 'health_score',
            SortType: 'DESC'
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('food_alternative', params);
      
      if (!response || !response.data) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching food alternatives:', error);
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
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'calories', 'protein', 'carbs', 'fats', 'health_score', 'image']
      };

      const response = await this.apperClient.getRecordById('food_alternative', id, params);
      
      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching food alternative with ID ${id}:`, error);
      throw error;
    }
  }

  async getHealthierAlternatives(currentHealthScore = 0) {
    await delay(300);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      const params = {
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'calories', 'protein', 'carbs', 'fats', 'health_score', 'image'],
        where: [
          {
            fieldName: 'health_score',
            operator: 'GreaterThan',
            values: [currentHealthScore.toString()]
          }
        ],
        orderBy: [
          {
            fieldName: 'health_score',
            SortType: 'DESC'
          }
        ],
        pagingInfo: {
          limit: 3,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords('food_alternative', params);
      
      if (!response || !response.data) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching healthier alternatives:', error);
      throw error;
    }
  }

  async create(alternativeData) {
    await delay(500);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      // Only include Updateable fields for create operation
      const createData = {
        Name: alternativeData.Name || '',
        Tags: alternativeData.Tags || '',
        Owner: alternativeData.Owner || '',
        calories: parseInt(alternativeData.calories) || 0,
        protein: parseFloat(alternativeData.protein) || 0.0,
        carbs: parseFloat(alternativeData.carbs) || 0.0,
        fats: parseFloat(alternativeData.fats) || 0.0,
        health_score: parseFloat(alternativeData.health_score) || 0.0,
        image: alternativeData.image || ''
      };

      const params = {
        records: [createData]
      };

      const response = await this.apperClient.createRecord('food_alternative', params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error('Failed to create food alternative');
    } catch (error) {
      console.error('Error creating food alternative:', error);
      throw error;
    }
  }

  async update(id, alternativeData) {
    await delay(500);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      // Only include Updateable fields for update operation
      const updateData = {
        Id: id,
        Name: alternativeData.Name || '',
        Tags: alternativeData.Tags || '',
        Owner: alternativeData.Owner || '',
        calories: parseInt(alternativeData.calories) || 0,
        protein: parseFloat(alternativeData.protein) || 0.0,
        carbs: parseFloat(alternativeData.carbs) || 0.0,
        fats: parseFloat(alternativeData.fats) || 0.0,
        health_score: parseFloat(alternativeData.health_score) || 0.0,
        image: alternativeData.image || ''
      };

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord('food_alternative', params);
      
      if (response && response.success && response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      throw new Error('Failed to update food alternative');
    } catch (error) {
      console.error('Error updating food alternative:', error);
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

      const response = await this.apperClient.deleteRecord('food_alternative', params);
      
      if (response && response.success) {
        return true;
      }
      
      throw new Error('Failed to delete food alternative');
    } catch (error) {
      console.error('Error deleting food alternative:', error);
      throw error;
    }
  }
}

export default new FoodAlternativeService();