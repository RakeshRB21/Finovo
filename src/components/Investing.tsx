import React from 'react';
import { TrendingUp, BarChart3, Target, Clock } from 'lucide-react';

const Investing: React.FC = () => {
  const investmentTypes = [
    {
      name: 'Mutual Funds',
      risk: 'Medium',
      returns: '10-15% annually',
      description: 'Professionally managed diversified portfolios',
      suitableFor: 'Beginners to intermediate investors'
    },
    {
      name: 'Direct Stocks',
      risk: 'High',
      returns: '15-25% annually',
      description: 'Individual company shares',
      suitableFor: 'Experienced investors with research skills'
    },
    {
      name: 'Fixed Deposits',
      risk: 'Low',
      returns: '5-7% annually',
      description: 'Guaranteed returns with capital protection',
      suitableFor: 'Conservative investors'
    },
    {
      name: 'PPF/ELSS',
      risk: 'Low-Medium',
      returns: '7-12% annually',
      description: 'Tax-saving investments with lock-in periods',
      suitableFor: 'Long-term tax planning'
    }
  ];

  return (
    <section id="investing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Investment Fundamentals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to make your money work for you through smart investment strategies 
            tailored for the Indian market.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8">
            <TrendingUp className="h-12 w-12 text-blue-600 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Power of Compounding</h3>
            <p className="text-gray-700 mb-4">
              Starting early is the key to wealth creation. Even small amounts grow significantly over time.
            </p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600">Example: ₹5,000/month SIP</p>
              <p className="text-lg font-bold text-blue-600">20 years = ₹45 lakhs*</p>
              <p className="text-xs text-gray-500">*Assuming 12% annual returns</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8">
            <BarChart3 className="h-12 w-12 text-green-600 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Diversification</h3>
            <p className="text-gray-700 mb-4">
              Spread risk across different asset classes, sectors, and investment types.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Equity</span>
                <span className="text-sm font-semibold">60%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Debt</span>
                <span className="text-sm font-semibold">30%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Gold/Others</span>
                <span className="text-sm font-semibold">10%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8">
            <Target className="h-12 w-12 text-orange-600 mb-6" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">Goal-Based Investing</h3>
            <p className="text-gray-700 mb-4">
              Align investments with specific financial goals and time horizons.
            </p>
            <div className="space-y-2 text-sm">
              <p>🏠 Home Purchase: 5-7 years</p>
              <p>🎓 Child Education: 10-15 years</p>
              <p>🏖️ Retirement: 20-30 years</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Investment Options Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Investment Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Risk Level</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Expected Returns</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody>
                {investmentTypes.map((investment, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-white transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{investment.name}</p>
                        <p className="text-sm text-gray-600">{investment.description}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        investment.risk === 'Low' ? 'bg-green-100 text-green-800' :
                        investment.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        investment.risk === 'Low-Medium' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {investment.risk}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">{investment.returns}</td>
                    <td className="py-4 px-4 text-gray-700">{investment.suitableFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-blue-600 rounded-xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Clock className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Start Your Investment Journey Today</h3>
              <p className="text-blue-100">
                The best time to start investing was 20 years ago. The second best time is now. 
                Begin with small amounts and gradually increase as you learn.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Getting Started Checklist:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Complete KYC with any mutual fund house
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Start with index funds or large-cap funds
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Set up automatic SIP for consistency
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Review and rebalance quarterly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Investing;