import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Mic,
  Headphones,
  ChevronRight,
  Play,
  Award,
  Music,
  Users,
  Upload,
  GitHub,
  Linkedin,
  Twitter,
  Instagram,
  Radio,
  Globe,
  Hash,
  Zap,
  User,
  Heart,
  MessageCircle,
  Star,
  ArrowRight,
  Code,
  PenTool,
  Coffee,
  Settings,
  Headset,
  PieChart
} from "lucide-react";

// Improved animation utility function with better performance
const useIntersectionObserver = (options = {}) => {
  const observerRef = useRef(null);
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { 
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      root: options.root || null
    });
    
    const elements = document.querySelectorAll('.animate-hidden');
    elements.forEach(el => observerRef.current.observe(el));
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options.threshold, options.rootMargin, options.root]);
  
  return observerRef;
};

// Enhanced team members for leadership section
const leadershipTeam = [
  {
    name: "Jamie Chen",
    role: "CTO",
    bio: "Audio engineer turned developer who built our proprietary sound optimization engine that adapts to any listening environment.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "https://twitter.com/jamiechen",
      github: "https://github.com/jamiechen",
      linkedin: "https://linkedin.com/in/jamiechen"
    }
  },
  {
    name: "Taylor Washington",
    role: "Head of Content",
    bio: "Curator extraordinaire who helps surface emerging creators and develops our featured content programs.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "https://twitter.com/taylorw",
      linkedin: "https://linkedin.com/in/taylorwashington"
    }
  },
  {
    name: "Jordan Patel",
    role: "Community Director",
    bio: "Building bridges between creators and listeners while fostering an inclusive environment for audio storytelling of all kinds.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    social: {
      twitter: "https://twitter.com/jordanpatel",
      linkedin: "https://linkedin.com/in/jordanpatel"
    }
  }
];

// Company values
const companyValues = [
  {
    icon: <Heart className="h-8 w-8 text-indigo-600" />,
    title: "Creator First",
    description: "We build every feature with creators in mind, focusing on sustainable monetization and growth."
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: "Community Driven",
    description: "We believe in the power of community to elevate voices and connect like-minded listeners."
  },
  {
    icon: <Globe className="h-8 w-8 text-indigo-600" />,
    title: "Global Perspective",
    description: "We're committed to amplifying diverse voices from around the world."
  },
  {
    icon: <Zap className="h-8 w-8 text-indigo-600" />,
    title: "Innovation",
    description: "We're constantly pushing the boundaries of what's possible in audio content creation."
  }
];

// Added testimonials data
const testimonials = [
  {
    quote: "This platform has completely transformed how I interact with my audience. The community features are unmatched.",
    author: "Emma Stone",
    role: "Host of 'Creative Minds'",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    quote: "I've been able to grow my podcast from just 100 listeners to over 50,000 in six months thanks to the discovery tools.",
    author: "Marcus Johnson",
    role: "Host of 'History Uncovered'",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    quote: "The analytics provided have helped me understand my audience better and create content they truly love.",
    author: "Priya Sharma",
    role: "Host of 'The Daily Wellness'",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const AboutUs = () => {
  // Initialize animation observer with improved options
  const observerRef = useIntersectionObserver({
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with enhanced animation */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-800 to-violet-900 border-b">
        <div className="absolute opacity-10 -right-64 -top-64">
          <Radio className="w-96 h-96 text-white" />
        </div>
        <div className="absolute opacity-10 -left-32 -bottom-32">
          <Headphones className="w-64 h-64 text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-hidden transition-all duration-1000 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
            <div className="flex justify-center mb-8">
              <div className="bg-white/15 p-5 rounded-full backdrop-blur-sm border border-white/20 shadow-xl shadow-purple-900/20">
                <Mic className="h-14 w-14 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Our Story</span>
              <span className="block text-violet-300 mt-2 font-light">
                Amplifying Voices, Connecting Listeners
              </span>
            </h1>
            <p className="mt-8 max-w-2xl mx-auto text-xl text-indigo-100 font-light">
              We're building the next generation of podcast creation, discovery and community.
            </p>
            
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link to="/explore" className="px-8 py-4 rounded-xl bg-white text-indigo-800 font-medium hover:bg-indigo-100 transition-colors shadow-lg shadow-indigo-900/20 transform hover:-translate-y-1 duration-300">
                Explore Podcasts
              </Link>
              <Link to="/start-creating" className="px-8 py-4 rounded-xl bg-indigo-600/80 backdrop-blur-sm text-white font-medium hover:bg-indigo-700 border border-indigo-500/50 transition-colors shadow-lg shadow-indigo-900/20 transform hover:-translate-y-1 duration-300">
                Start Creating
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave SVG divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-16 w-full fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.63C57.1,67.33,134.09,63.58,198.45,69.25A588.34,588.34,0,0,1,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Our Mission Section with improved design */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 animate-hidden transition-all duration-1000 delay-100 transform -translate-x-8 opacity-0 animate-in:translate-x-0 animate-in:opacity-100">
              <div className="relative">
                <div className="absolute -top-6 -left-6 bg-indigo-100 w-24 h-24 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 bg-purple-100 w-32 h-32 rounded-full"></div>
                <div className="relative z-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-1">
                  <div className="bg-white rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Podcast recording studio" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-7 animate-hidden transition-all duration-1000 delay-300 transform translate-x-8 opacity-0 animate-in:translate-x-0 animate-in:opacity-100">
              <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium text-sm mb-6">
                Our Mission
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                Democratizing Audio Content <span className="text-indigo-600">For Everyone</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We created this platform to transform how podcasts are shared, discovered, and monetized. 
                Our mission is to provide both creators and listeners with the ultimate audio 
                experience - where great content finds its audience and new voices can break through.
              </p>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                By combining the best aspects of audio streaming services with the community and 
                creator-focus of video platforms, we've built a home for the next generation 
                of podcasting. We believe in fair compensation for creators and exceptional 
                discovery for listeners.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                    <Heart className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Creator First</h3>
                    <p className="text-gray-600">Built with creators in mind, focusing on sustainable monetization</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                    <Globe className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Global Reach</h3>
                    <p className="text-gray-600">Connecting voices and listeners around the world</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Values Section */}
      <div className="py-24 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-hidden transition-all duration-1000 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
            <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium text-sm mb-6">
              Our Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What <span className="text-indigo-600">Drives Us</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              The core principles that guide every decision we make and feature we build.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className={`animate-hidden transition-all duration-700 delay-${index * 100} transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100">
                  <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-hidden transition-all duration-1000 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
            <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium text-sm mb-6">
              Our Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              From Idea to <span className="text-indigo-600">Reality</span>
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>
            
            {/* Timeline items */}
            <div className="relative z-10">
              {/* Item 1 */}
              <div className="mb-16 animate-hidden transition-all duration-700 delay-100 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <div className="text-indigo-600 font-semibold mb-3">2021</div>
                      <h3 className="text-xl font-bold mb-3">The Beginning</h3>
                      <p className="text-gray-600">
                        Founded with a vision to create a platform where podcast creators could thrive
                        and listeners could discover amazing content.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-indigo-200 bg-indigo-600 flex items-center justify-center">
                    <Radio className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 md:pl-12 hidden md:block"></div>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="mb-16 animate-hidden transition-all duration-700 delay-200 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 hidden md:block"></div>
                  
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-indigo-200 bg-indigo-600 flex items-center justify-center">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 md:pl-12 mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <div className="text-indigo-600 font-semibold mb-3">2022</div>
                      <h3 className="text-xl font-bold mb-3">Beta Launch</h3>
                      <p className="text-gray-600">
                        Our first version launched to 1,000 beta users who helped shape the future of the platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="mb-16 animate-hidden transition-all duration-700 delay-300 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <div className="text-indigo-600 font-semibold mb-3">2023</div>
                      <h3 className="text-xl font-bold mb-3">Global Expansion</h3>
                      <p className="text-gray-600">
                        Expanded to support 20 languages and creators from over 100 countries.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-indigo-200 bg-indigo-600 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 md:pl-12 hidden md:block"></div>
                </div>
              </div>
              
              {/* Item 4 */}
              <div className="mb-16 animate-hidden transition-all duration-700 delay-400 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 hidden md:block"></div>
                  
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-indigo-200 bg-indigo-600 flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 md:pl-12 mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <div className="text-indigo-600 font-semibold mb-3">2024</div>
                      <h3 className="text-xl font-bold mb-3">Creator Program</h3>
                      <p className="text-gray-600">
                        Launched our Creator Fund and Accelerator Program to support emerging podcasters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Item 5 */}
              <div className="animate-hidden transition-all duration-700 delay-500 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:text-right md:pr-12 mb-6 md:mb-0">
                    <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                      <div className="text-indigo-600 font-semibold mb-3">Today</div>
                      <h3 className="text-xl font-bold mb-3">Industry Leader</h3>
                      <p className="text-gray-600">
                        Now serving millions of users with cutting-edge features and the most vibrant podcast community.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border-4 border-indigo-200 bg-indigo-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 md:pl-12 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="py-24 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-hidden transition-all duration-1000 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
            <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium text-sm mb-6">
              Leadership
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-indigo-600">Leadership Team</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              The visionaries guiding our platform's growth and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <div
                key={index}
                className={`animate-hidden transition-all duration-1000 delay-${index * 150} transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-center space-x-3">
                          {member.social.github && (
                            <a href={member.social.github} className="text-white hover:text-indigo-200 transition-colors">
                              <GitHub className="h-5 w-5" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a href={member.social.linkedin} className="text-white hover:text-indigo-200 transition-colors">
                              <Linkedin className="h-5 w-5" />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a href={member.social.twitter} className="text-white hover:text-indigo-200 transition-colors">
                              <Twitter className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-hidden transition-all duration-1000 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
            <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium text-sm mb-6">
              Testimonials
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-indigo-600">Creators Say</span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Hear from the podcasters who've grown their audience on our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`animate-hidden transition-all duration-1000 delay-${index * 150} transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative">
                  <div className="absolute -top-4 left-8">
                    <div className="bg-indigo-600 w-8 h-8 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 inline-block" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-6">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 relative overflow-hidden">
        <div className="absolute opacity-10 -right-64 -bottom-64">
          <Headphones className="w-96 h-96 text-white" />
        </div>
        <div className="absolute opacity-10 -left-32 -top-32">
          <Music className="w-64 h-64 text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-hidden transition-all duration-1000 transform translate-y-8 opacity-0 animate-in:translate-y-0 animate-in:opacity-100">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Podcast Journey?
            </h2>
            <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
              Join thousands of creators who are building their audience and sharing their stories with the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/start-creating" className="px-8 py-4 rounded-xl bg-white text-indigo-800 font-medium hover:bg-indigo-100 transition-colors shadow-lg shadow-indigo-900/20">
                Start Creating
              </Link>
              <Link to="/explore" className="px-8 py-4 rounded-xl bg-indigo-600/80 backdrop-blur-sm text-white font-medium hover:bg-indigo-700 border border-indigo-500/50 transition-colors shadow-lg shadow-indigo-900/20">
                Explore Podcasts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;