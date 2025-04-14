import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Email validation on client side
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }
    
    try {
      // Replace with your actual deployed API endpoint
      const response = await fetch('https://podstreamb.vercel.app/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }
      
      // Success! Show the confirmation message
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Stay Updated</h2>
        <p className="mb-8 text-blue-100">Subscribe to our newsletter for the latest podcast releases and exclusive content.</p>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="px-4 py-3 rounded-full focus:outline-none text-blue-900 w-full sm:w-80 shadow-lg"
              disabled={isLoading}
            />
            <button 
              type="submit"
              className={`bg-white text-blue-700 px-6 py-3 rounded-full font-bold transition shadow-lg ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-50'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-green-600 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-2">Successfully Subscribed!</h3>
            <p className="text-blue-600 mb-3">Thank you for subscribing to our newsletter.</p>
            <p className="text-gray-600 mb-4">We've sent a confirmation email to <span className="font-medium">{email}</span></p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="text-blue-700 underline hover:text-blue-500"
            >
              Subscribe another email
            </button>
          </div>
        )}
        
        {error && <p className="text-red-300 mt-2">{error}</p>}
        <p className="text-blue-200 text-xs mt-4">We respect your privacy and will never share your information.</p>
      </div>
    </section>
  );
}