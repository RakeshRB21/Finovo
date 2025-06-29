import React from 'react';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    'Learn': [
      'Personal Finance',
      'Investment Basics',
      'Stock Market Guide',
      'Mutual Funds',
      'Tax Planning'
    ],
    'Tools & Resources': [
      'SIP Calculator',
      'Retirement Planner',
      'Goal Setting',
      'Risk Assessment',
      'Portfolio Tracker'
    ],
    'Indian Markets': [
      'BSE & NSE Guide',
      'IPO Basics',
      'Sector Analysis',
      'Economic Indicators',
      'Regulatory Updates'
    ]
  };

  return (
    <footer className="bg-gray-900 text-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Finovo</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering Indians with financial knowledge to build wealth and secure their future 
              through smart investing and money management.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">hello@finovo.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">Ooty, Tamil Nadu</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-6">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>&copy; 2025 Finovo. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-900/50 rounded-lg">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">Disclaimer</h4>
            <p className="text-sm text-gray-300">
              The information provided on this website is for educational purposes only and should not be 
              considered as financial advice. Please consult with a qualified financial advisor before making 
              investment decisions. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;