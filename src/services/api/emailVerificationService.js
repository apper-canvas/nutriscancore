const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class EmailVerificationService {
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

  async sendVerificationEmail(email, userId) {
    await delay(400);
    
    try {
      // Generate verification token
      const verificationToken = this.generateVerificationToken();
      
      // In a real implementation, this would store the token in the database
      // and send an actual email through a service like SendGrid or AWS SES
      
      if (this.apperClient) {
        // Store verification record in database
        const verificationData = {
          email: email,
          userId: userId,
          token: verificationToken,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          verified: false
        };

        const params = {
          records: [verificationData]
        };

        await this.apperClient.createRecord('email_verification', params);
      }

      // Simulate email sending delay
      await delay(800);

      // In development, log the verification link
      const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}&email=${email}`;
      console.log('🔗 Email Verification Link:', verificationLink);

      return {
        success: true,
        message: 'Verification email sent successfully',
        token: verificationToken
      };
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async verifyEmail(token) {
    await delay(500);
    
    try {
      if (!token) {
        throw new Error('Verification token is required');
      }

      // In a real implementation, this would validate the token against the database
      if (this.apperClient) {
        // Find verification record by token
        const params = {
          fields: ['email', 'userId', 'token', 'verified', 'expiresAt'],
          filter: {
            token: token
          }
        };

        const response = await this.apperClient.fetchRecords('email_verification', params);
        
        if (!response?.data || response.data.length === 0) {
          throw new Error('Invalid verification token');
        }

        const verificationRecord = response.data[0];
        
        // Check if token is expired
        if (new Date() > new Date(verificationRecord.expiresAt)) {
          throw new Error('Verification token has expired');
        }

        // Check if already verified
        if (verificationRecord.verified) {
          throw new Error('Email already verified');
        }

        // Mark as verified
        const updateParams = {
          records: [{
            Id: verificationRecord.Id,
            verified: true,
            verifiedAt: new Date().toISOString()
          }]
        };

        await this.apperClient.updateRecord('email_verification', updateParams);

        // Get user information
        const userResponse = await this.apperClient.getRecordById('user_profile', verificationRecord.userId);
        
        return {
          success: true,
          message: 'Email verified successfully',
          user: userResponse?.data || { email: verificationRecord.email }
        };
      }

      // Fallback for development
      return {
        success: true,
        message: 'Email verified successfully',
        user: { email: 'user@example.com', isEmailVerified: true }
      };
    } catch (error) {
      console.error('Error verifying email:', error);
      return {
        success: false,
        message: error.message || 'Email verification failed'
      };
    }
  }

  async resendVerification(email) {
    await delay(300);
    
    try {
      if (!email) {
        throw new Error('Email address is required');
      }

      // Generate new verification token
      const newToken = this.generateVerificationToken();
      
      if (this.apperClient) {
        // Find existing verification record
        const params = {
          fields: ['Id', 'email', 'userId'],
          filter: {
            email: email,
            verified: false
          }
        };

        const response = await this.apperClient.fetchRecords('email_verification', params);
        
        if (response?.data && response.data.length > 0) {
          // Update existing record with new token
          const existingRecord = response.data[0];
          const updateParams = {
            records: [{
              Id: existingRecord.Id,
              token: newToken,
              createdAt: new Date().toISOString(),
              expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
            }]
          };

          await this.apperClient.updateRecord('email_verification', updateParams);
        }
      }

      // Simulate email sending
      await delay(600);

      // Log verification link for development
      const verificationLink = `${window.location.origin}/verify-email?token=${newToken}&email=${email}`;
      console.log('🔗 Resent Email Verification Link:', verificationLink);

      return {
        success: true,
        message: 'Verification email resent successfully'
      };
    } catch (error) {
      console.error('Error resending verification email:', error);
      throw new Error('Failed to resend verification email');
    }
  }

  async checkVerificationStatus(email) {
    await delay(200);
    
    try {
      if (!this.apperClient) {
        return { verified: false };
      }

      const params = {
        fields: ['verified', 'verifiedAt'],
        filter: {
          email: email
        }
      };

      const response = await this.apperClient.fetchRecords('email_verification', params);
      
      if (response?.data && response.data.length > 0) {
        const verificationRecord = response.data[0];
        return {
          verified: verificationRecord.verified || false,
          verifiedAt: verificationRecord.verifiedAt || null
        };
      }

      return { verified: false };
    } catch (error) {
      console.error('Error checking verification status:', error);
      return { verified: false };
    }
  }

  generateVerificationToken() {
    // Generate a secure random token
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

export default new EmailVerificationService();