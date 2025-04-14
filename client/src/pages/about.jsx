import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  ChevronRight,
  Users,
  BookOpen,
  Bookmark,
  TrendingUp,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";


const teamMembers = [
  {
    name: "Om Kumavat",
    role: "Frontend Developer",
    bio: "Full-stack developer having  experience in building scalable web applications.",
    image: "images/omphoto.jpg",
    social: {
      github: "https://github.com/omkumavat",
      linkedin: "https://www.linkedin.com/in/om-kumavat-a34296258/",
    },
  },
  {
    name: "Shivaji Gadekar",
    role: "Backend Developer",
    bio: "Passionate about building robust and efficient backend systems that power seamless user experiences.",
    image: "images/shivajiphoto.jpg",
    social: {
      github: "https://github.com/Shivagad",
      linkedin: "https://www.linkedin.com/in/shivaji-gadekar-bbb871264/",
    },
  },
  {
    name: "Abhijeet Lahase",
    role: "Backend Engineer",
    bio: "Database expert specializing in high-performance systems.",
    image: "images/art.jpg",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Anuj Maheshwari",
    role: "Frontend Developer",
    bio: "React enthusiast focused on building responsive and accessible interfaces.",
    image: "images/anujphoto.jpg",
    social: {
      github: "https://github.com/infinityedge24",
      linkedin: "http://www.linkedin.com/in/anuj2304",
    },
  },
];

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center -mb-4">
              <h1 className="text-4xl font-bold tracking-tight mt-10 text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">About</span>
                <span className="block text-blue-600 mt-2">
                  Our Story & Team
                </span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                We're a passionate team of developers and designers dedicated to
                creating exceptional content and experiences for our readers.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  We believe in the power of knowledge sharing and continuous
                  learning. Our platform serves as a bridge between experts and
                  learners, fostering a community of growth and innovation.
                </p>
                <p className="text-lg text-gray-600">
                  Through carefully curated content and insightful articles, we
                  aim to make complex topics accessible and engaging for
                  everyone.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">
                    50K+
                  </h3>
                  <p className="text-gray-600">Monthly Readers</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">
                    200+
                  </h3>
                  <p className="text-gray-600">Articles Published</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    15+
                  </h3>
                  <p className="text-gray-600">Expert Writers</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-orange-600 mb-2">
                    4.9/5
                  </h3>
                  <p className="text-gray-600">Reader Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-24  bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 -mt-16">
                Meet Our Team
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                The talented people behind our success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <div className="flex justify-center space-x-4 mt-4">
                      <a
                        href={member.social.github}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="text-center">
              <Link
                to="/blog/categories"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ChevronRight className="rotate-180 mr-2" size={20} />
                Back to Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;