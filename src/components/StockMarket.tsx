import React from 'react';
import { Building2, TrendingUp, BarChart, Users } from 'lucide-react';

const StockMarket: React.FC = () => {
  const exchanges = [
    {
      name: 'BSE (Bombay Stock Exchange)',
      established: '1875',
      companies: '5,000+',
      benchmark: 'Sensex (30 companies)',
      description: 'Asia\'s oldest stock exchange'
    },
    {
      name: 'NSE (National Stock Exchange)',
      established: '1992',
      companies: '2,000+',
      benchmark: 'Nifty 50',
      description: 'India\'s largest stock exchange by volume'
    }
  ];

  const marketBasics = [
    {
      icon: Building2,
      title: 'What are Stocks?',
      content: 'Stocks represent ownership shares in a company. When you buy stocks, you become a partial owner and can benefit from the company\'s growth and profits through capital appreciation and dividends.'
    },
    {
      icon: TrendingUp,
      title: 'How Markets Work',
      content: 'Stock prices are determined by supply and demand. More buyers than sellers drive prices up, while more sellers than buyers drive prices down. Market sentiment, company performance, and economic factors all influence prices.'
    },
    {
      icon: BarChart,
      title: 'Market Indices',
      content: 'Indices like Sensex and Nifty track the performance of select stocks and represent overall market movement. They help investors gauge market trends and compare individual stock performance.'
    },
    {
      icon: Users,
      title: 'Market Participants',
      content: 'The market includes retail investors (individuals), institutional investors (mutual funds, insurance companies), foreign investors (FIIs), and traders who provide liquidity to the market.'
    }
  ];

  return (
    <section id="stock-market" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Understanding Indian Stock Markets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how BSE and NSE work, understand market mechanisms, and discover how to 
            participate in India's growing equity markets.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {exchanges.map((exchange, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{exchange.name}</h3>
                  <p className="text-gray-600">{exchange.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{exchange.established}</p>
                  <p className="text-sm text-gray-600">Established</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{exchange.companies}</p>
                  <p className="text-sm text-gray-600">Listed Companies</p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-blue-900 mb-2">Benchmark Index:</p>
                <p className="text-blue-800">{exchange.benchmark}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {marketBasics.map((basic, index) => {
            const Icon = basic.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{basic.title}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{basic.content}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Trading vs Investing</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-red-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-red-600 mb-4">Trading</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Short-term focus (days to months)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">High risk, high reward potential</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Requires technical analysis skills</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Time-intensive activity</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Higher brokerage and tax implications</span>
                </li>
              </ul>
            </div>
            
            <div className="border-2 border-green-200 rounded-lg p-6">
              <h4 className="text-xl font-bold text-green-600 mb-4">Investing</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Long-term focus (years to decades)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Moderate risk with compounding benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Focus on fundamental analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Less time-intensive</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">Lower costs and better tax treatment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Market Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Begin with thorough research, start small, and focus on learning. The stock market 
              rewards patience, discipline, and continuous education.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold mb-2">Step 1: Learn</h4>
                <p className="text-sm text-blue-100">Understand market basics and company analysis</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold mb-2">Step 2: Practice</h4>
                <p className="text-sm text-blue-100">Use paper trading or small amounts initially</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-bold mb-2">Step 3: Invest</h4>
                <p className="text-sm text-blue-100">Start with quality stocks and hold long-term</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockMarket;