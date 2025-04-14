import React from "react";
import { Link } from "react-router-dom";
import {
  Headphones,
  Mic,
  Play,
  ChevronLeft,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Award,
  Users,
  Clock,
  Zap
} from "lucide-react";

const About = () => {
  const founders = [
    {
      name: "Alex Rivera",
      role: "CEO & Audio Engineer",
      bio: "Former Spotify audio engineer with a passion for creating immersive listening experiences. Alex leads our technical development and ensures sound quality meets professional standards.",
      image: "/api/placeholder/400/400",
      social: {
        twitter: "https://twitter.com/alexrivera",
        linkedin: "https://linkedin.com/in/alexrivera",
        instagram: "https://instagram.com/alexrivera"
      }
    },
    {
      name: "Maya Johnson",
      role: "Chief Content Officer",
      bio: "With 8 years of experience producing award-winning podcasts, Maya oversees our content strategy and creator relationships. She's dedicated to amplifying diverse voices in the podcasting space.",
      image: "/api/placeholder/400/400",
      social: {
        twitter: "https://twitter.com/mayajohnson",
        linkedin: "https://linkedin.com/in/mayajohnson",
        instagram: "https://instagram.com/maya_podcasts"
      }
    },
    {
      name: "Raj Patel",
      role: "Head of Product & Design",
      bio: "Former UX lead at YouTube, Raj crafts our intuitive user experience. He's passionate about creating digital spaces that foster community engagement and creative expression.",
      image: "/api/placeholder/400/400",
      social: {
        twitter: "https://twitter.com/rajpateldesign",
        linkedin: "https://linkedin.com/in/rajpatel",
        github: "https://github.com/rajpatel"
      }
    }
  ];

  const stats = [
    { icon: <Headphones size={24} />, value: "50K+", label: "Active Listeners" },
    { icon: <Mic size={24} />, value: "10K+", label: "Creator Channels" },
    { icon: <Play size={24} />, value: "1M+", label: "Monthly Plays" },
    { icon: <Clock size={24} />, value: "250K+", label: "Hours Streamed Daily" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/600')] bg-cover bg-center opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6">
              <span className="block">Changing How the World</span>
              <span className="block text-purple-400 mt-2">Creates & Listens</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
              We're building the ultimate home for podcast creators and listeners alike,
              combining the best of discovery, engagement, and creation.
            </p>
            <div className="mt-10">
              <Link 
                to="/explore" 
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-purple-400 hover:bg-purple-500 transition-colors duration-300 mr-4"
              >
                <Headphones className="mr-2" size={20} />
                Start Listening
              </Link>
              <Link 
                to="/create" 
                className="inline-flex items-center px-8 py-4 border border-purple-400 text-base font-medium rounded-full shadow-sm text-purple-400 bg-transparent hover:bg-purple-900 hover:bg-opacity-30 transition-colors duration-300"
              >
                <Mic className="mr-2" size={20} />
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6">
                We believe in a world where anyone with a voice deserves to be heard. 
                Our platform bridges the gap between creators and listeners, revolutionizing 
                how audio stories are shared and discovered.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                By combining the discovery focus of Spotify with the creator-centric 
                approach of YouTube, we're building a new ecosystem where podcasting 
                can reach its full potential.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <Mic size={18} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Creator First</h3>
                    <p className="text-gray-400">Powerful tools to record, edit, and monetize your content</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <Users size={18} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Community Driven</h3>
                    <p className="text-gray-400">Direct connection between creators and their audience</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                    <Zap size={18} className="text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Innovation Focused</h3>
                    <p className="text-gray-400">Continuously evolving the podcast experience</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors duration-300">
                  <div className="text-purple-400 mb-2">{stat.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/800/800')] bg-cover bg-center opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Meet Our Founders</h2>
            <p className="mt-4 text-xl text-gray-300">
              The passionate minds behind the platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
              >
                <div className="aspect-w-1 aspect-h-1 relative">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                </div>
                
                <div className="p-8 relative">
                  <div className="absolute right-8 top-0 transform -translate-y-1/2 bg-purple-500 rounded-full p-3">
                    <Mic size={24} className="text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white">{founder.name}</h3>
                  <p className="text-purple-400 font-medium mb-4">{founder.role}</p>
                  <p className="text-gray-300 mb-6">{founder.bio}</p>
                  
                  <div className="flex space-x-4 pt-4 border-t border-gray-700">
                    {founder.social.twitter && (
                      <a href={founder.social.twitter} className="text-gray-400 hover:text-purple-400 transition-colors">
                        <Twitter size={20} />
                      </a>
                    )}
                    {founder.social.linkedin && (
                      <a href={founder.social.linkedin} className="text-gray-400 hover:text-purple-400 transition-colors">
                        <Linkedin size={20} />
                      </a>
                    )}
                    {founder.social.instagram && (
                      <a href={founder.social.instagram} className="text-gray-400 hover:text-purple-400 transition-colors">
                        <Instagram size={20} />
                      </a>
                    )}
                    {founder.social.github && (
                      <a href={founder.social.github} className="text-gray-400 hover:text-purple-400 transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Our Values</h2>
            <p className="mt-4 text-lg text-gray-300">
              What drives us to build the future of podcasting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-purple-500 bg-opacity-20 flex items-center justify-center mb-6">
                <Mic size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Creative Freedom</h3>
              <p className="text-gray-300">
                We empower creators with tools and resources to express themselves 
                authentically without unnecessary restrictions.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-purple-500 bg-opacity-20 flex items-center justify-center mb-6">
                <Users size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Inclusive Community</h3>
              <p className="text-gray-300">
                We're building a platform where diverse voices are celebrated and 
                listeners can discover content that resonates with them.
              </p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <div className="h-12 w-12 rounded-lg bg-purple-500 bg-opacity-20 flex items-center justify-center mb-6">
                <Award size={24} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Quality First</h3>
              <p className="text-gray-300">
                We're relentlessly focused on delivering the highest quality audio 
                experience for both creators and listeners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/600')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
          <p className="text-xl text-purple-200 mb-8">
            Whether you're a creator with stories to tell or a listener seeking new perspectives,
            there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-full bg-white text-purple-900 font-bold hover:bg-gray-100 transition-colors duration-300"
            >
              Create Your Account
            </Link>
            <Link
              to="/explore"
              className="px-8 py-4 rounded-full bg-transparent border border-white text-white font-bold hover:bg-white hover:bg-opacity-10 transition-colors duration-300"
            >
              Explore Podcasts
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ChevronLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;