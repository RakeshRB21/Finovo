import React from 'react';
import { ArrowRight, BookOpen, TrendingUp, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToTopics = () => {
    const element = document.getElementById('topics');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Master Your
              <span className="text-blue-600 block">Financial Future</span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Learn the fundamentals of personal finance, investing, and the Indian stock market. 
              Build wealth through knowledge and smart financial decisions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToTopics}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200">
                Explore Topics
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Learn Basics</h3>
              <p className="text-gray-600">Master fundamental concepts of personal finance and money management.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mt-8">
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Investing</h3>
              <p className="text-gray-600">Discover investment strategies tailored for the Indian market.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 -mt-8">
              <Shield className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Management</h3>
              <p className="text-gray-600">Learn to protect and grow your wealth with proper risk assessment.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">₹</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Indian Markets</h3>
              <p className="text-gray-600">Navigate NSE, BSE, and understand the Indian financial ecosystem.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;