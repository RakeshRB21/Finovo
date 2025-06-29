import React from 'react';
import { TrendingUp, BarChart3, Target, Clock, ExternalLink, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';

const InvestingPage: React.FC = () => {
  const investmentTypes = [
    {
      name: 'Mutual Funds',
      risk: 'Medium',
      returns: '10-15% annually',
      description: 'Professionally managed diversified portfolios',
      suitableFor: 'Beginners to intermediate investors',
      resources: [
        { title: 'Value Research Online', url: 'https://www.valueresearchonline.com/' },
        { title: 'Morningstar India', url: 'https://www.morningstar.in/' }
      ]
    },
    {
      name: 'Direct Stocks',
      risk: 'High',
      returns: '15-25% annually',
      description: 'Individual company shares',
      suitableFor: 'Experienced investors with research skills',
      resources: [
        { title: 'Screener.in', url: 'https://www.screener.in/' },
        { title: 'Tijori Finance', url: 'https://tijori.com/' }
      ]
    },
    {
      name: 'Fixed Deposits',
      risk: 'Low',
      returns: '5-7% annually',
      description: 'Guaranteed returns with capital protection',
      suitableFor: 'Conservative investors',
      resources: [
        { title: 'FD Rates Comparison', url: 'https://www.bankbazaar.com/fixed-deposit.html' },
        { title: 'Tax on FD Interest', url: 'https://cleartax.in/s/tax-on-fixed-deposit-interest' }
      ]
    },
    {
      name: 'PPF/ELSS',
      risk: 'Low-Medium',
      returns: '7-12% annually',
      description: 'Tax-saving investments with lock-in periods',
      suitableFor: 'Long-term tax planning',
      resources: [
        { title: 'PPF Calculator', url: 'https://www.bankbazaar.com/tax/ppf-calculator.html' },
        { title: 'Best ELSS Funds', url: 'https://www.valueresearchonline.com/funds/selector/category/21/equity-linked-savings-scheme/?tab=snapshot' }
      ]
    }
  ];

  const investmentStrategies = [
    {
      strategy: 'Dollar Cost Averaging (SIP)',
      description: 'Invest fixed amount regularly regardless of market conditions',
      benefits: ['Reduces timing risk', 'Builds discipline', 'Rupee cost averaging'],
      example: '₹5,000 monthly SIP for 10 years = ₹6 lakhs invested, potential value ₹11.6 lakhs at 12% returns'
    },
    {
      strategy: 'Asset Allocation',
      description: 'Diversify across different asset classes based on age and risk tolerance',
      benefits: ['Risk management', 'Balanced growth', 'Reduces volatility'],
      example: 'Age 25: 70% equity, 20% debt, 10% gold | Age 45: 50% equity, 40% debt, 10% gold'
    },
    {
      strategy: 'Goal-Based Investing',
      description: 'Align investments with specific financial goals and timelines',
      benefits: ['Clear objectives', 'Appropriate risk-return', 'Better planning'],
      example: 'Home purchase (5 years): Balanced funds | Retirement (25 years): Equity funds'
    }
  ];

  const mutualFundCategories = [
    {
      category: 'Large Cap Funds',
      description: 'Invest in top 100 companies by market cap',
      risk: 'Low-Medium',
      returns: '10-12%',
      timeHorizon: '3+ years'
    },
    {
      category: 'Mid Cap Funds',
      description: 'Invest in companies ranked 101-250 by market cap',
      risk: 'Medium-High',
      returns: '12-15%',
      timeHorizon: '5+ years'
    },
    {
      category: 'Small Cap Funds',
      description: 'Invest in companies ranked 251+ by market cap',
      risk: 'High',
      returns: '15-18%',
      timeHorizon: '7+ years'
    },
    {
      category: 'Index Funds',
      description: 'Track market indices like Nifty 50 or Sensex',
      risk: 'Medium',
      returns: '10-12%',
      timeHorizon: '5+ years'
    },
    {
      category: 'Debt Funds',
      description: 'Invest in bonds and fixed income securities',
      risk: 'Low',
      returns: '6-8%',
      timeHorizon: '1+ years'
    },
    {
      category: 'Hybrid Funds',
      description: 'Mix of equity and debt investments',
      risk: 'Medium',
      returns: '8-12%',
      timeHorizon: '3+ years'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Investment Fundamentals</h1>
            <p className="text-gray-600 mt-2">Learn how to make your money work for you through smart investment strategies</p>
          </div>

          {/* Investment Basics */}
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

          {/* Investment Options */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Investment Options Comparison</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Investment Type</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Risk Level</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Expected Returns</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Best For</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Resources</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investmentTypes.map((investment, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-semibold text-gray-900">{investment.name}</p>
                            <p className="text-sm text-gray-600">{investment.description}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            investment.risk === 'Low' ? 'bg-green-100 text-green-800' :
                            investment.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            investment.risk === 'Low-Medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {investment.risk}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-gray-900">{investment.returns}</td>
                        <td className="py-4 px-6 text-gray-700">{investment.suitableFor}</td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            {investment.resources.map((resource, resourceIndex) => (
                              <a
                                key={resourceIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-800 text-xs transition-colors"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Investment Strategies */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Investment Strategies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {investmentStrategies.map((strategy, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{strategy.strategy}</h3>
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="space-y-1">
                      {strategy.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-900 mb-1">Example:</h4>
                    <p className="text-sm text-blue-800">{strategy.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mutual Fund Categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Mutual Fund Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mutualFundCategories.map((fund, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{fund.category}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{fund.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk:</span>
                      <span className={`font-semibold ${
                        fund.risk === 'Low' ? 'text-green-600' :
                        fund.risk === 'Medium' ? 'text-yellow-600' :
                        fund.risk === 'Low-Medium' ? 'text-blue-600' :
                        fund.risk === 'Medium-High' ? 'text-orange-600' :
                        'text-red-600'
                      }`}>{fund.risk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Returns:</span>
                      <span className="font-semibold text-gray-900">{fund.returns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Horizon:</span>
                      <span className="font-semibold text-gray-900">{fund.timeHorizon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-blue-600 rounded-xl p-8 text-white mb-16">
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

          {/* External Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Investment Learning Resources</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Research Platforms',
                  resources: [
                    { name: 'Value Research Online', url: 'https://www.valueresearchonline.com/' },
                    { name: 'Morningstar India', url: 'https://www.morningstar.in/' },
                    { name: 'Screener.in', url: 'https://www.screener.in/' }
                  ]
                },
                {
                  title: 'Investment Platforms',
                  resources: [
                    { name: 'Zerodha Coin', url: 'https://coin.zerodha.com/' },
                    { name: 'Groww', url: 'https://groww.in/' },
                    { name: 'Paytm Money', url: 'https://www.paytmmoney.com/' }
                  ]
                },
                {
                  title: 'Educational Content',
                  resources: [
                    { name: 'Varsity by Zerodha', url: 'https://zerodha.com/varsity/' },
                    { name: 'AMFI Investor Education', url: 'https://www.amfiindia.com/investor-corner' },
                    { name: 'NSE Academy', url: 'https://www.nseindia.com/education/content/nse-academy' }
                  ]
                }
              ].map((category, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm transition-colors"
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InvestingPage;