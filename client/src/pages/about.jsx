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
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const developers = [
  {
    name: "Om Kumavat",
    role: "Lead Developer & Visionary",
    bio: "Driven by a passion for crafting seamless digital experiences and building innovative web solutions.",
    image: "images/omphoto.jpg",
    social: {
      github: "https://github.com/omkumavat",
      linkedin: "https://www.linkedin.com/in/om-kumavat-a34296258/",
    },
  },
  {
    name: "Shivaji Gadekar",
    role: "Backend Architect & Engineer",
    bio: "Focused on building robust, scalable, and efficient backend systems that power the website's core functionality.",
    image: "images/shivajiphoto.jpg",
    social: {
      github: "https://github.com/Shivagad",
      linkedin: "https://www.linkedin.com/in/shivaji-gadekar-bbb871264/",
    },
  },
  {
    name: "Anuj Maheshwari",
    role: "Frontend Developer & UI/UX Designer",
    bio: "Dedicated to creating intuitive, visually appealing, and user-friendly interfaces for an exceptional browsing experience.",
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

const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-12 md:py-20"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          className="mb-10 md:mb-16 text-center"
          variants={fadeIn}
        >
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            About <span className="text-blue-500">Our Website</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 sm:text-xl md:text-2xl">
            The story behind our platform and the passionate team that built it.
          </p>
        </motion.section>

        {/* Our Story Section */}
        <motion.section
          className="bg-white shadow-lg rounded-lg p-8 mb-10 md:mb-16"
          variants={fadeIn}
        >
          <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
            <motion.div variants={fadeIn}>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Journey</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We embarked on this journey with a shared vision: to create a dynamic and user-friendly web platform that empowers [mention the website's purpose - e.g., connects podcast creators and listeners, provides valuable information, etc.].
              </p>
              <p className="text-gray-700 leading-relaxed">
                From initial concept to the final product, our team poured their hearts and expertise into every line of code and every design element. We believe in continuous improvement and are dedicated to providing you with the best possible experience.
              </p>
            </motion.div>
            <motion.div className="flex justify-center" variants={fadeIn}>
              <Code className="text-blue-500 size-24 md:size-32 animate-pulse" />
            </motion.div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          className="bg-blue-50 rounded-lg p-8 mb-10 md:mb-16"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Our Core Values</h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer}>
            <motion.div className="bg-white rounded-md shadow-sm p-4 flex items-center space-x-4" variants={fadeIn}>
              <svg className="h-6 w-6 text-blue-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Innovation</h3>
                <p className="text-gray-600 text-sm">We constantly strive for creative and cutting-edge solutions.</p>
              </div>
            </motion.div>
            <motion.div className="bg-white rounded-md shadow-sm p-4 flex items-center space-x-4" variants={fadeIn}>
              <Users className="h-6 w-6 text-blue-400 animate-bounce" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800">User-Centricity</h3>
                <p className="text-gray-600 text-sm">Our users are at the heart of everything we do.</p>
              </div>
            </motion.div>
            <motion.div className="bg-white rounded-md shadow-sm p-4 flex items-center space-x-4" variants={fadeIn}>
              <Code className="h-6 w-6 text-blue-400 animate-bounce" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Quality</h3>
                <p className="text-gray-600 text-sm">We are committed to delivering a high-quality and reliable platform.</p>
              </div>
            </motion.div>
            <motion.div className="bg-white rounded-md shadow-sm p-4 flex items-center space-x-4" variants={fadeIn}>
              <Palette className="h-6 w-6 text-blue-400 animate-bounce" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Design Excellence</h3>
                <p className="text-gray-600 text-sm">We believe in the power of thoughtful and elegant design.</p>
              </div>
            </motion.div>
            <motion.div className="bg-white rounded-md shadow-sm p-4 flex items-center space-x-4" variants={fadeIn}>
              <svg className="h-6 w-6 text-blue-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0-.566V5.75a.251.251 0 01.25-.25h4.768a.25.25 0 01.25.25v10.624m-2.879 2.879l-2.879-2.879m0-.566V5.75a.251.251 0 01.25-.25h4.768a.25.25 0 01.25.25v10.624m-2.879 2.879l2.879-2.879" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Scalability</h3>
                <p className="text-gray-600 text-sm">Building a platform that can grow and adapt with our users.</p>
              </div>
            </motion.div>
            <motion.div className="bg-white rounded-md shadow-sm p-4 flex items-center space-x-4" variants={fadeIn}>
              <svg className="h-6 w-6 text-blue-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-800">Efficiency</h3>
                <p className="text-gray-600 text-sm">Optimizing performance for a smooth and responsive experience.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Our Developers Section */}
        <motion.section
          className="py-12 bg-white rounded-lg shadow-lg"
          variants={fadeIn}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-8 text-center">Meet the Developers</h2>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {developers.map((developer, index) => (
                <motion.div
                  key={index}
                  className="bg-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  variants={fadeIn}
                >
                  <div className="aspect-w-3 aspect-h-4">
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(20%)' }}
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-blue-900 mb-2">
                      {developer.name}
                    </h3>
                    <p className="text-blue-500 mb-2">{developer.role}</p>
                    <p className="text-gray-700 text-sm mb-4">{developer.bio}</p>
                    <div className="flex justify-center space-x-4 mt-2">
                      {developer.social.github && (
                        <a
                          href={developer.social.github}
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {developer.social.linkedin && (
                        <a
                          href={developer.social.linkedin}
                          className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div className="py-8 text-center" variants={fadeIn}>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ChevronRight className="rotate-180 mr-2" size={20} />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;