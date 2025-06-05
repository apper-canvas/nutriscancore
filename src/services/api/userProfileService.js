const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class UserProfileService {
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
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'height', 'weight', 'age', 'gender', 'goal', 'activity_level'],
        orderBy: [
          {
            fieldName: 'CreatedOn',
            SortType: 'DESC'
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('user_profile', params);
      
      if (!response || !response.data) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching user profiles:', error);
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
        fields: ['Name', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy', 'height', 'weight', 'age', 'gender', 'goal', 'activity_level']
      };

      const response = await this.apperClient.getRecordById('user_profile', id, params);
      
      if (!response || !response.data) {
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching user profile with ID ${id}:`, error);
      throw error;
    }
  }

  async create(profileData) {
    await delay(500);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      // Only include Updateable fields for create operation
      const createData = {
        Name: profileData.Name || '',
        Tags: profileData.Tags || '',
        Owner: profileData.Owner || '',
        height: parseInt(profileData.height) || 0,
        weight: parseInt(profileData.weight) || 0,
        age: parseInt(profileData.age) || 0,
        gender: profileData.gender || '',
        goal: profileData.goal || '',
        activity_level: profileData.activity_level || ''
      };

      const params = {
        records: [createData]
      };

      const response = await this.apperClient.createRecord('user_profile', params);
      
      if (response && response.success && response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      throw new Error('Failed to create user profile');
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  async update(id, profileData) {
    await delay(500);
    
    if (!this.apperClient) {
      throw new Error('ApperClient not initialized');
    }

    try {
      // Only include Updateable fields for update operation
      const updateData = {
        Id: id,
        Name: profileData.Name || '',
        Tags: profileData.Tags || '',
        Owner: profileData.Owner || '',
        height: parseInt(profileData.height) || 0,
        weight: parseInt(profileData.weight) || 0,
        age: parseInt(profileData.age) || 0,
        gender: profileData.gender || '',
        goal: profileData.goal || '',
        activity_level: profileData.activity_level || ''
      };

      const params = {
        records: [updateData]
      };

      const response = await this.apperClient.updateRecord('user_profile', params);
      
      if (response && response.success && response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        if (successfulUpdates.length > 0) {
          return successfulUpdates[0].data;
        }
      }
      
      throw new Error('Failed to update user profile');
    } catch (error) {
      console.error('Error updating user profile:', error);
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

      const response = await this.apperClient.deleteRecord('user_profile', params);
      
      if (response && response.success) {
        return true;
      }
      
      throw new Error('Failed to delete user profile');
    } catch (error) {
      console.error('Error deleting user profile:', error);
      throw error;
    }
  }
}

export default new UserProfileService();