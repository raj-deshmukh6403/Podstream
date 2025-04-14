import React from "react";
import {
  Calendar,
  Clock,
  ChevronRight,
  Users,
  Code,
  Palette,
  Github,
  Linkedin,
  Headphones,
  Music,
  Share2,
  Mic,
  Radio,
  Speaker,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const developers = [
  {
    name: "Om Kumavat",
    role: "Lead Developer & Visionary",
    bio: "Driven by a passion for crafting seamless digital experiences and building innovative audio streaming solutions.",
    image: "images/omphoto.jpg",
    social: {
      github: "https://github.com/omkumavat",
      linkedin: "https://www.linkedin.com/in/om-kumavat-a34296258/",
    },
  },
  {
    name: "Shivaji Gadekar",
    role: "Backend Architect & Engineer",
    bio: "Focused on building robust, scalable, and efficient backend systems that power PodStream's core functionality and audio processing.",
    image: "images/shivajiphoto.jpg",
    social: {
      github: "https://github.com/Shivagad",
      linkedin: "https://www.linkedin.com/in/shivaji-gadekar-bbb871264/",
    },
  },
  {
    name: "Anuj Maheshwari",
    role: "Frontend Developer & UI/UX Designer",
    bio: "Dedicated to creating intuitive, visually appealing, and user-friendly interfaces for an exceptional podcast browsing experience.",
    image: "images/anujphoto.jpg",
    social: {
      github: "https://github.com/infinityedge24",
      linkedin: "http://www.linkedin.com/in/anuj2304",
    },
  },
];

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

const About = () => {
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
            <Headphones className="size-16 md:size-24 text-purple-600 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-extrabold text-purple-900 tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            About <span className="font-black">PodStream</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700 sm:text-2xl md:text-3xl max-w-3xl mx-auto">
            Where creators and listeners unite in the world of podcasting.
          </p>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          className="bg-white shadow-xl rounded-2xl p-8 md:p-12 mb-16 md:mb-24 border border-purple-100"
          variants={fadeIn}
        >
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-purple-800 mb-6">Our Journey</h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                PodStream was born from a simple yet powerful idea: to create the ultimate destination for podcast creators and listeners alike. We envisioned a platform that combines the best of Spotify's audio experience with YouTube's visual engagement.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our mission is to democratize podcasting by giving creators powerful tools to share their voices while offering listeners a seamless discovery experience. From passionate discussions to educational content, PodStream is where audio stories come to life.
              </p>
            </motion.div>
            <motion.div className="flex justify-center mt-10 md:mt-0" variants={fadeIn}>
              <div className="grid grid-cols-2 gap-6">
                <Mic className="text-purple-500 size-16 md:size-20 animate-pulse justify-self-end" />
                <Speaker className="text-blue-500 size-16 md:size-20 animate-pulse justify-self-start" />
                <Radio className="text-indigo-500 size-16 md:size-20 animate-pulse justify-self-end" />
                <Music className="text-violet-500 size-16 md:size-20 animate-pulse justify-self-start" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* What Makes Us Unique */}
        <motion.section
          className="bg-gradient-to-r from-purple-900 to-blue-800 text-white rounded-2xl p-8 md:p-12 mb-16 md:mb-24 shadow-lg"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">What Makes PodStream Unique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="rounded-full bg-purple-600 w-12 h-12 flex items-center justify-center mb-4">
                <Mic size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Creator-Friendly Platform</h3>
              <p className="text-white/80">
                Upload, manage, and distribute your podcasts with professional tools designed for creators of all levels.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="rounded-full bg-blue-600 w-12 h-12 flex items-center justify-center mb-4">
                <Headphones size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Immersive Listening</h3>
              <p className="text-white/80">
                Enjoy podcasts with high-quality audio streaming, customizable playback, and personalized recommendations.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <div className="rounded-full bg-indigo-600 w-12 h-12 flex items-center justify-center mb-4">
                <Share2 size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
              <p className="text-white/80">
                Connect with like-minded listeners, follow your favorite creators, and be part of vibrant podcast communities.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-16 md:mb-24 shadow-md border border-blue-100"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Our Core Values</h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
            <motion.div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="text-purple-500 mb-4">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Innovation</h3>
              <p className="text-gray-600">We constantly push the boundaries of what a podcast platform can be, implementing cutting-edge audio technology.</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="text-purple-500 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Community First</h3>
              <p className="text-gray-600">We're building more than a platform—we're fostering a vibrant ecosystem where creators and listeners thrive together.</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="text-purple-500 mb-4">
                <Code className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Technical Excellence</h3>
              <p className="text-gray-600">We're committed to delivering a high-quality, reliable platform with exceptional performance and uptime.</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="text-purple-500 mb-4">
                <Palette className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Design Excellence</h3>
              <p className="text-gray-600">We believe in the power of intuitive interfaces that make podcast discovery and creation a delight.</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="text-purple-500 mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Accessibility</h3>
              <p className="text-gray-600">Making podcast creation and consumption available to everyone, regardless of technical expertise.</p>
            </motion.div>
            <motion.div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300" variants={fadeIn}>
              <div className="text-purple-500 mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">Consistency</h3>
              <p className="text-gray-600">Delivering a reliable service that creators and listeners can depend on day after day.</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Our Developers Section */}
        <motion.section
          className="py-12 bg-white rounded-2xl shadow-xl border border-purple-100"
          variants={fadeIn}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-purple-900 mb-12 text-center">Meet the Team Behind PodStream</h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" variants={staggerContainer}>
              {developers.map((developer, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-b from-purple-50 to-blue-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  variants={fadeIn}
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(10%)' }}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">
                      {developer.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">{developer.role}</p>
                    <p className="text-gray-700 mb-5">{developer.bio}</p>
                    <div className="flex justify-center space-x-5 mt-4">
                      {developer.social.github && (
                        <a
                          href={developer.social.github}
                          className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={22} />
                        </a>
                      )}
                      {developer.social.linkedin && (
                        <a
                          href={developer.social.linkedin}
                          className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin size={22} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Join Us Call to Action */}
        <motion.section
          className="my-16 text-center"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold text-purple-900 mb-6">Join the PodStream Revolution</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Whether you're a creator with stories to share or a listener seeking your next favorite podcast, 
            PodStream is the place where audio content comes to life.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
              Start Listening
            </button>
            <button className="bg-white text-purple-600 border-2 border-purple-600 font-bold py-3 px-8 rounded-full shadow-md transform transition-all duration-300 hover:scale-105 hover:bg-purple-50">
              Create Account
            </button>
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

export default About;