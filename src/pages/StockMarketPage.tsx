import React from 'react';
import { Building2, TrendingUp, BarChart, Users, ExternalLink, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';

const StockMarketPage: React.FC = () => {
  const exchanges = [
    {
      name: 'BSE (Bombay Stock Exchange)',
      established: '1875',
      companies: '5,000+',
      benchmark: 'Sensex (30 companies)',
      description: 'Asia\'s oldest stock exchange',
      website: 'https://www.bseindia.com/',
      marketCap: '₹280+ trillion'
    },
    {
      name: 'NSE (National Stock Exchange)',
      established: '1992',
      companies: '2,000+',
      benchmark: 'Nifty 50',
      description: 'India\'s largest stock exchange by volume',
      website: 'https://www.nseindia.com/',
      marketCap: '₹270+ trillion'
    }
  ];

  const marketBasics = [
    {
      icon: Building2,
      title: 'What are Stocks?',
      content: 'Stocks represent ownership shares in a company. When you buy stocks, you become a partial owner and can benefit from the company\'s growth and profits through capital appreciation and dividends.',
      resources: [
        { name: 'Stock Market Basics - NSE', url: 'https://www.nseindia.com/education/content/stock-market-basics' },
        { name: 'Equity Investment Guide', url: 'https://zerodha.com/varsity/chapter/the-stock-markets/' }
      ]
    },
    {
      icon: TrendingUp,
      title: 'How Markets Work',
      content: 'Stock prices are determined by supply and demand. More buyers than sellers drive prices up, while more sellers than buyers drive prices down. Market sentiment, company performance, and economic factors all influence prices.',
      resources: [
        { name: 'Market Mechanics - Zerodha Varsity', url: 'https://zerodha.com/varsity/chapter/the-stock-exchanges/' },
        { name: 'Price Discovery Process', url: 'https://www.investopedia.com/terms/p/pricediscovery.asp' }
      ]
    },
    {
      icon: BarChart,
      title: 'Market Indices',
      content: 'Indices like Sensex and Nifty track the performance of select stocks and represent overall market movement. They help investors gauge market trends and compare individual stock performance.',
      resources: [
        { name: 'Understanding Nifty 50', url: 'https://www.niftyindices.com/indices/equity/broad-based-indices/nifty-50' },
        { name: 'Sensex Composition', url: 'https://www.bseindia.com/indices/IndexArchiveData.html' }
      ]
    },
    {
      icon: Users,
      title: 'Market Participants',
      content: 'The market includes retail investors (individuals), institutional investors (mutual funds, insurance companies), foreign investors (FIIs), and traders who provide liquidity to the market.',
      resources: [
        { name: 'Types of Market Participants', url: 'https://zerodha.com/varsity/chapter/clearing-and-settlement-process/' },
        { name: 'FII vs DII Impact', url: 'https://www.moneycontrol.com/news/business/markets/understanding-fii-dii-flows-2456789.html' }
      ]
    }
  ];

  const tradingVsInvesting = {
    trading: [
      'Short-term focus (days to months)',
      'High risk, high reward potential',
      'Requires technical analysis skills',
      'Time-intensive activity',
      'Higher brokerage and tax implications',
      'Suitable for experienced individuals'
    ],
    investing: [
      'Long-term focus (years to decades)',
      'Moderate risk with compounding benefits',
      'Focus on fundamental analysis',
      'Less time-intensive',
      'Lower costs and better tax treatment',
      'Suitable for most individuals'
    ]
  
  };

  const stockAnalysisMetrics = [
    {
      metric: 'P/E Ratio',
      description: 'Price-to-Earnings ratio shows how much investors pay per rupee of earnings',
      goodRange: 'Industry average or lower',
      calculation: 'Market Price per Share ÷ Earnings per Share'
    },
    {
      metric: 'P/B Ratio',
      description: 'Price-to-Book ratio compares market value to book value',
      goodRange: 'Below 3 for most sectors',
      calculation: 'Market Price per Share ÷ Book Value per Share'
    },
    {
      metric: 'ROE',
      description: 'Return on Equity shows how efficiently company uses shareholders\' money',
      goodRange: '15%+ is generally good',
      calculation: 'Net Income ÷ Shareholders\' Equity × 100'
    },
    {
      metric: 'Debt-to-Equity',
      description: 'Measures company\'s financial leverage and ability to handle debt',
      goodRange: 'Lower ratios generally better',
      calculation: 'Total Debt ÷ Total Equity'
    },
    {
      metric: 'Revenue Growth',
      description: 'Consistent revenue growth indicates business expansion',
      goodRange: '15%+ annual growth',
      calculation: '(Current Year Revenue - Previous Year) ÷ Previous Year × 100'
    },
    {
      metric: 'Profit Margin',
      description: 'Shows how much profit company makes from each rupee of revenue',
      goodRange: 'Higher than industry average',
      calculation: 'Net Profit ÷ Revenue × 100'
    }
  ];

  const gettingStartedSteps = [
    {
      step: 1,
      title: 'Open Demat Account',
      description: 'Choose a reliable broker and complete KYC process',
      resources: [
        { name: 'Compare Brokers', url: 'https://www.chittorgarh.com/report/indian-stock-brokers-comparison/80/' },
        { name: 'Zerodha Account Opening', url: 'https://zerodha.com/open-account' }
      ]
    },
    {
      step: 2,
      title: 'Learn the Basics',
      description: 'Understand market fundamentals and analysis techniques',
      resources: [
        { name: 'Zerodha Varsity', url: 'https://zerodha.com/varsity/' },
        { name: 'NSE Academy', url: 'https://www.nseindia.com/education' }
      ]
    },
    {
      step: 3,
      title: 'Start Small',
      description: 'Begin with blue-chip stocks or index funds',
      resources: [
        { name: 'Nifty 50 Companies', url: 'https://www.niftyindices.com/indices/equity/broad-based-indices/nifty-50' },
        { name: 'Blue Chip Stocks List', url: 'https://www.screener.in/screens/71/blue-chip-stocks/' }
      ]
    },
    {
      step: 4,
      title: 'Research & Analyze',
      description: 'Use fundamental and technical analysis tools',
      resources: [
        { name: 'Screener.in', url: 'https://www.screener.in/' },
        { name: 'TradingView', url: 'https://in.tradingview.com/' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Understanding Indian Stock Markets</h1>
            <p className="text-gray-600 mt-2">Learn how BSE and NSE work, understand market mechanisms, and discover how to participate in India's growing equity markets</p>
          </div>

          {/* Stock Exchanges */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Indian Stock Exchanges</h2>
            <div className="grid lg:grid-cols-2 gap-8">
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
                  
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-blue-900 mb-1">Benchmark Index:</p>
                      <p className="text-blue-800">{exchange.benchmark}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-semibold text-green-900 mb-1">Market Cap:</p>
                      <p className="text-green-800">{exchange.marketCap}</p>
                    </div>
                    <a
                      href={exchange.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Official Website
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Basics */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Stock Market Fundamentals</h2>
            <div className="grid md:grid-cols-2 gap-8">
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
                    <p className="text-gray-700 leading-relaxed mb-6">{basic.content}</p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Learn More:</h4>
                      {basic.resources.map((resource, resourceIndex) => (
                        <a
                          key={resourceIndex}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {resource.name}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trading vs Investing */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Trading vs Investing</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-red-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-red-600 mb-4">Trading</h4>
                  <ul className="space-y-3">
                    {tradingVsInvesting.trading.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-2 border-green-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-green-600 mb-4">Investing</h4>
                  <ul className="space-y-3">
                    {tradingVsInvesting.investing.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Analysis Metrics */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Stock Analysis Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stockAnalysisMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{metric.metric}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{metric.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Good Range: </span>
                      <span className="text-green-600">{metric.goodRange}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Formula: </span>
                      <span className="text-blue-600">{metric.calculation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Getting Started */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Getting Started in Stock Market</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gettingStartedSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{step.description}</p>
                  
                  <div className="space-y-2">
                    {step.resources.map((resource, resourceIndex) => (
                      <a
                        key={resourceIndex}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 text-xs transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {resource.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-16">
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

          {/* External Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Stock Market Learning Resources</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Educational Platforms',
                  resources: [
                    { name: 'Zerodha Varsity', url: 'https://zerodha.com/varsity/' },
                    { name: 'NSE Academy', url: 'https://www.nseindia.com/education' },
                    { name: 'BSE Institute', url: 'https://www.bseindia.com/education/index.html' }
                  ]
                },
                {
                  title: 'Analysis Tools',
                  resources: [
                    { name: 'Screener.in', url: 'https://www.screener.in/' },
                    { name: 'TradingView', url: 'https://in.tradingview.com/' },
                    { name: 'ChartInk', url: 'https://chartink.com/' }
                  ]
                },
                {
                  title: 'Market Data',
                  resources: [
                    { name: 'NSE Live Data', url: 'https://www.nseindia.com/' },
                    { name: 'BSE Live Data', url: 'https://www.bseindia.com/' },
                    { name: 'MoneyControl', url: 'https://www.moneycontrol.com/' }
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

export default StockMarketPage;