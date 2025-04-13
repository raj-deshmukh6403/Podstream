import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const otpRefs = useRef([]);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://podstreamb.vercel.app/api/auth/forgot-password', { email });
      console.log(res);
      
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://podstreamb.vercel.app/api/auth/verify-otp', { email, otp: otp.join('') });
      toast.success(res.data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('https://podstreamb.vercel.app/api/auth/reset-password', {
        email,
        otp: otp.join(''),
        password
      });
      toast.success(res.data.message);
      setStep(4);
      setTimeout(() => {
        toast.info('Returning back to login page');
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Animated waves */}
        <div className="absolute top-0 left-0 w-full opacity-10">
          <svg viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
              <animate 
                attributeName="d" 
                dur="20s" 
                repeatCount="indefinite"
                values="
                  M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
                  M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
                  M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </path>
          </svg>
        </div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px}`,
              height: `${Math.random() * 8 + 4}px}`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: 'float-up infinite linear'
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="max-w-md w-full z-10">
        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header section */}
          <div className="bg-blue-600 p-6 text-center relative overflow-hidden">
            {/* Animated circles in header */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute left-0 top-0 w-32 h-32 bg-blue-400 rounded-full opacity-20"
                   style={{transform: 'translate(-50%, -50%)'}} />
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-400 rounded-full opacity-20"
                   style={{transform: 'translate(50%, 50%)'}} />
            </div>
            
            <h2 className="text-3xl font-bold text-white relative z-10">Reset Your Password</h2>
            <p className="text-blue-100 mt-1 relative z-10">Follow the steps to reset your password</p>
          </div>
          
          {/* Form section */}
          <div className="p-8">
            {step === 1 && (
              <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); handleSendOtp();}}>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`relative w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-sm ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden group transition-all duration-200`}
                  >
                    <span className="absolute top-0 left-0 w-full h-full opacity-30">
                      <span className="absolute top-3/4 left-0 w-full h-1/4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></span>
                    </span>
                    {loading ? 'Sending...' : 'Send OTP'}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); handleVerifyOtp();}}>
                <div className="group">
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                  <div className="relative flex space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        ref={el => otpRefs.current[index] = el}
                        className="w-12 px-3 py-3 border border-gray-300 rounded-lg text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`relative w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-sm ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden group transition-all duration-200`}
                  >
                    <span className="absolute top-0 left-0 w-full h-full opacity-30">
                      <span className="absolute top-3/4 left-0 w-full h-1/4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></span>
                    </span>
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); handleResetPassword();}}>
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter new password"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                </div>
                
                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`relative w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-sm ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden group transition-all duration-200`}
                  >
                    <span className="absolute top-0 left-0 w-full h-full opacity-30">
                      <span className="absolute top-3/4 left-0 w-full h-1/4 bg-white transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></span>
                    </span>
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="text-center text-green-700 font-semibold">
                ✅ Your password has been reset successfully!
                <div className="text-gray-600 mt-4">Returning back to login page...</div>
                {setTimeout(() => navigate('/login'), 3000)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100px) scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;