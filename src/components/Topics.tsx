import React from 'react';
import { Wallet, TrendingUp, Building2, PieChart, Calculator, Target } from 'lucide-react';

const Topics: React.FC = () => {
  const topics = [
    {
      icon: Wallet,
      title: 'Personal Finance',
      description: 'Budgeting, saving, debt management, and emergency funds',
      color: 'blue',
      items: ['Monthly Budgeting', 'Emergency Fund', 'Debt Management', 'Tax Planning']
    },
    {
      icon: TrendingUp,
      title: 'Investment Basics',
      description: 'Understanding different investment vehicles and strategies',
      color: 'green',
      items: ['SIP & Mutual Funds', 'Risk Assessment', 'Portfolio Building', 'Investment Goals']
    },
    {
      icon: Building2,
      title: 'Stock Market',
      description: 'NSE, BSE, trading basics, and market analysis',
      color: 'purple',
      items: ['Market Basics', 'Trading vs Investing', 'Technical Analysis', 'Fundamental Analysis']
    },
    {
      icon: PieChart,
      title: 'Shares & Bonds',
      description: 'Equity investments, government securities, and corporate bonds',
      color: 'orange',
      items: ['Share Valuation', 'Government Bonds', 'Corporate Bonds', 'Dividend Investing']
    },
    {
      icon: Calculator,
      title: 'Financial Planning',
      description: 'Long-term wealth creation and retirement planning',
      color: 'indigo',
      items: ['Retirement Planning', 'Insurance Needs', 'Goal Setting', 'Wealth Creation']
    },
    {
      icon: Target,
      title: 'Advanced Strategies',
      description: 'Options, derivatives, and advanced investment techniques',
      color: 'red',
      items: ['Options Trading', 'Derivatives', 'Hedge Strategies', 'Alternative Investments']
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200',
      orange: 'text-orange-600 bg-orange-50 border-orange-200',
      indigo: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      red: 'text-red-600 bg-red-50 border-red-200',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="topics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Financial Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From basic budgeting to advanced investment strategies, master every aspect of 
            personal finance and build lasting wealth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-lg ${getColorClasses(topic.color)} mb-6`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.title}</h3>
                <p className="text-gray-600 mb-6">{topic.description}</p>
                <ul className="space-y-2">
                  {topic.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Topics;