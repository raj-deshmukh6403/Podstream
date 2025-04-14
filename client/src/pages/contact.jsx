import React, { useState } from "react";
import {
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Send,
  Headphones,
  ArrowRight,
  Check,
  AlertCircle,
  MessageCircle,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: { 
      repeat: Infinity, 
      duration: 2,
      ease: "easeInOut" 
    }
  }
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    // For demo purposes, we'll just simulate a successful submission
    setSubmitStatus('pending');
    
    setTimeout(() => {
      // Simulate response
      if (formState.name && formState.email && formState.message) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus('error');
      }
    }, 1500);
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white py-12 md:py-20"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          className="mb-16 md:mb-24 text-center"
          variants={fadeIn}
        >
          <motion.div 
            className="inline-block mb-6"
            variants={pulseAnimation}
          >
            <MessageCircle className="size-16 md:size-24 text-purple-600 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-purple-900 tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Contact <span className="font-black">PodStream</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 sm:text-2xl md:text-3xl max-w-3xl mx-auto">
            We'd love to hear from you. Get in touch with our team.
          </p>
        </motion.section>

        {/* Contact Information & Form Section */}
        <motion.section
          className="mb-16 md:mb-24"
          variants={fadeIn}
        >
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="md:grid md:grid-cols-5">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-purple-700 to-blue-700 text-white p-8 md:p-10 md:col-span-2">
                <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-purple-200 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg text-purple-100">Our Location</h3>
                      <p className="text-white/80 mt-1">
                        123 Podcast Avenue<br />
                        Digital District<br />
                        Tech City, TC 10101
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="text-purple-200 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg text-purple-100">Phone</h3>
                      <p className="text-white/80 mt-1">
                        +1 (555) 123-4567<br />
                        Mon-Fri, 9AM-6PM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="text-purple-200 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-lg text-purple-100">Email</h3>
                      <p className="text-white/80 mt-1">
                        hello@podstream.com<br />
                        support@podstream.com
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-medium text-lg text-purple-100 mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300">
                      <Instagram size={20} className="text-white" />
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300">
                      <Twitter size={20} className="text-white" />
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300">
                      <Facebook size={20} className="text-white" />
                    </a>
                    <a href="#" className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300">
                      <Youtube size={20} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 md:p-10 md:col-span-3">
                <h2 className="text-2xl font-bold text-purple-800 mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200"
                      placeholder="Tell us what you need..."
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={submitStatus === 'pending'}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] flex justify-center items-center"
                    >
                      {submitStatus === 'pending' ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2" size={18} />
                          Send Message
                        </span>
                      )}
                    </button>

                    {submitStatus === 'success' && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
                        <Check className="mr-2" size={18} />
                        Your message has been sent successfully! We'll get back to you soon.
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                        <AlertCircle className="mr-2" size={18} />
                        Please fill out all required fields before submitting.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          className="mb-16 md:mb-24"
          variants={fadeIn}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find quick answers to commonly asked questions about PodStream.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">How do I upload my podcast?</h3>
              <p className="text-gray-700">
                After creating an account, navigate to your dashboard and click on "Upload New Podcast." You can upload audio files, add show notes, cover art, and set distribution preferences all in one place.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Is PodStream free to use?</h3>
              <p className="text-gray-700">
                PodStream offers both free and premium tiers. Our free tier allows basic podcast uploads and listening, while our premium subscription unlocks advanced analytics, unlimited storage, and monetization options.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">How can I monetize my podcast?</h3>
              <p className="text-gray-700">
                Premium creators can monetize through our integrated ad marketplace, listener subscriptions, and direct support features. Our team can help you set up the best monetization strategy for your content.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">How do I report technical issues?</h3>
              <p className="text-gray-700">
                For any technical difficulties, please contact our support team via the form above or email support@podstream.com. Our technical team aims to respond within 24 hours on business days.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
            >
              View all FAQs
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </motion.section>

        {/* Map Section */}
        <motion.section
          className="mb-16 md:mb-24 bg-white rounded-2xl shadow-lg p-6 overflow-hidden"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-purple-900 mb-6 text-center">Visit Our Studio</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
            {/* Placeholder for an actual map integration */}
            <div className="bg-gray-200 w-full h-64 md:h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-4 text-purple-500" size={40} />
                <p className="text-gray-600 font-medium">
                  Interactive map would be displayed here.<br />
                  123 Podcast Avenue, Tech City
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          className="mb-16 md:mb-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 md:p-12 text-white"
          variants={fadeIn}
        >
          <div className="md:grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with PodStream</h2>
              <p className="text-white/90 text-lg mb-4">
                Subscribe to our newsletter and be the first to know about new features, podcast trends, and creator opportunities.
              </p>
              <ul className="list-disc list-inside text-white/80 mb-6 space-y-2">
                <li>Weekly podcast recommendations</li>
                <li>Platform updates and new features</li>
                <li>Creator tips and industry insights</li>
                <li>Exclusive PodStream events</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <form className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-white outline-none bg-white/20 backdrop-blur-sm placeholder-white/70 text-white border border-white/30"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center"
                >
                  <Headphones className="mr-2" size={18} />
                  Subscribe Now
                </button>
              </form>
              <p className="text-white/70 text-sm mt-4">
                By subscribing, you agree to receive marketing emails from PodStream. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div className="py-10 text-center" variants={fadeIn}>
          <Link
            to="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium text-lg"
          >
            <ChevronRight className="rotate-180 mr-2" size={20} />
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;