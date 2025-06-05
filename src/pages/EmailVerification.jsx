import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../store/userSlice';
import { emailVerificationService } from '../services';
import { Mail, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const [isResending, setIsResending] = useState(false);
  
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (token) {
      verifyEmailToken();
    } else {
      setVerificationStatus('pending');
    }
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      setVerificationStatus('verifying');
      const response = await emailVerificationService.verifyEmail(token);
      
      if (response.success) {
        setVerificationStatus('success');
        
        // Update user verification status in Redux
        const updatedUser = { ...response.user, isEmailVerified: true };
        dispatch(setUser(updatedUser));
        
        toast.success('Email verified successfully! Welcome to NutriScan.');
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        setVerificationStatus('failed');
        toast.error('Email verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Email verification error:', error);
      setVerificationStatus('failed');
      toast.error('Email verification failed. Please try again.');
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast.error('Email address not found. Please sign up again.');
      navigate('/signup');
      return;
    }

    try {
      setIsResending(true);
      await emailVerificationService.resendVerification(email);
      toast.success('Verification email sent! Please check your inbox.');
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error('Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (verificationStatus) {
      case 'verifying':
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <RefreshCw className="w-16 h-16 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-4">
              Verifying Your Email
            </h2>
            <p className="text-surface-600 dark:text-surface-400">
              Please wait while we verify your email address...
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-4">
              Email Verified Successfully!
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              Your email has been verified. You now have full access to NutriScan.
            </p>
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Redirecting you to the home page...
            </p>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <XCircle className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-4">
              Verification Failed
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              The verification link is invalid or has expired.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="btn btn-primary w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Resend Verification Email
                  </>
                )}
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="btn btn-outline w-full"
              >
                Sign Up Again
              </button>
            </div>
          </div>
        );

      case 'pending':
      default:
        return (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Mail className="w-16 h-16 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-4">
              Check Your Email
            </h2>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
            <div className="bg-surface-100 dark:bg-surface-700 rounded-lg p-4 mb-6">
              <p className="text-sm text-surface-600 dark:text-surface-400">
                <strong>Didn't receive the email?</strong>
                <br />
                Check your spam folder or click the button below to resend.
              </p>
            </div>
            <button
              onClick={handleResendVerification}
              disabled={isResending}
              className="btn btn-primary w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Resend Verification Email
                </>
              )}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50 dark:bg-surface-900 px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;