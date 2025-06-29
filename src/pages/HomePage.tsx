import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, TrendingUp, Shield, Calculator, PieChart, Target, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const { user, isProfileComplete } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Learn Basics',
      description: 'Master fundamental concepts of personal finance and money management.',
      link: '/personal-finance'
    },
    {
      icon: TrendingUp,
      title: 'Smart Investing',
      description: 'Discover investment strategies tailored for the Indian market.',
      link: '/investing'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Learn to protect and grow your wealth with proper risk assessment.',
      link: '/stock-market'
    },
    {
      icon: Calculator,
      title: 'Financial Tools',
      description: 'Use calculators and budgeting tools to plan your financial future.',
      link: '/tools'
    }
  ];

  const quickActions = [
    {
      title: 'Personal Dashboard',
      description: 'Track your financial progress and goals',
      icon: PieChart,
      link: '/dashboard',
      color: 'blue'
    },
    {
      title: 'Budget Tracker',
      description: 'Monitor your monthly expenses and savings',
      icon: Target,
      link: '/budgeting',
      color: 'green'
    },
    {
      title: 'SIP Calculator',
      description: 'Calculate returns on systematic investment plans',
      icon: Calculator,
      link: '/sip-calculator',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Profile Completion Banner */}
      {user && !isProfileComplete && (
        <div className="bg-orange-50 border-b border-orange-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <p className="text-orange-800">
                  Complete your profile to get personalized financial recommendations
                </p>
              </div>
              <Link
                to="/profile-setup"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
              >
                Complete Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Master Your'}
                <span className="text-blue-600 block">Financial Future</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                {user 
                  ? 'Continue your journey to financial independence with personalized insights and tools.'
                  : 'Learn the fundamentals of personal finance, investing, and the Indian stock market. Build wealth through knowledge and smart financial decisions.'
                }
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to={user ? (isProfileComplete ? "/dashboard" : "/profile-setup") : "/register"}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {user ? (isProfileComplete ? 'Go to Dashboard' : 'Complete Profile') : 'Get Started'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/tools"
                  className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  Explore Tools
                </Link>
              </div>
            </div>

            {/* Fixed Feature Tiles Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={index}
                    to={feature.link}
                    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full ${
                      index % 2 === 1 ? 'mt-8' : ''
                    }`}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <Icon className="h-12 w-12 text-blue-600 mb-4 flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex-shrink-0">{feature.title}</h3>
                      <p className="text-gray-600 text-sm flex-grow leading-relaxed">{feature.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      {user && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <p className="text-xl text-gray-600">Jump right into managing your finances</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className={`bg-gradient-to-br ${
                      action.color === 'blue' ? 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200' :
                      action.color === 'green' ? 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200' :
                      'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200'
                    } rounded-xl p-8 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl`}
                  >
                    <Icon className={`h-12 w-12 ${
                      action.color === 'blue' ? 'text-blue-600' :
                      action.color === 'green' ? 'text-green-600' :
                      'text-purple-600'
                    } mb-6`} />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{action.title}</h3>
                    <p className="text-gray-700">{action.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Learning Modules */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Education Modules</h2>
            <p className="text-xl text-gray-600">Comprehensive learning paths for every stage of your financial journey</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Personal Finance', link: '/personal-finance', color: 'blue', topics: ['Budgeting', 'Emergency Fund', 'Debt Management'] },
              { title: 'Investment Basics', link: '/investing', color: 'green', topics: ['SIP & Mutual Funds', 'Risk Assessment', 'Portfolio Building'] },
              { title: 'Stock Market', link: '/stock-market', color: 'purple', topics: ['NSE & BSE', 'Trading Basics', 'Market Analysis'] },
              { title: 'Shares & Bonds', link: '/shares-bonds', color: 'orange', topics: ['Equity Investing', 'Government Bonds', 'Corporate Bonds'] }
            ].map((module, index) => (
              <Link
                key={index}
                to={module.link}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-12 h-12 ${
                  module.color === 'blue' ? 'bg-blue-100' :
                  module.color === 'green' ? 'bg-green-100' :
                  module.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                } rounded-lg flex items-center justify-center mb-4`}>
                  <span className={`text-2xl font-bold ${
                    module.color === 'blue' ? 'text-blue-600' :
                    module.color === 'green' ? 'text-green-600' :
                    module.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`}>
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{module.title}</h3>
                <ul className="space-y-1">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="text-sm text-gray-600 flex items-center">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      {topic}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;