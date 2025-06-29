import React from 'react';
import { TrendingUp, Shield, DollarSign, Award, ExternalLink, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';

const SharesBondsPage: React.FC = () => {
  const shareTypes = [
    {
      type: 'Large Cap Stocks',
      description: 'Established companies with market cap > ₹20,000 crores',
      risk: 'Low-Medium',
      examples: 'TCS, Reliance, HDFC Bank, Infosys',
      suitability: 'Conservative to moderate investors',
      resources: [
        { name: 'Nifty 50 List', url: 'https://www.niftyindices.com/indices/equity/broad-based-indices/nifty-50' },
        { name: 'Large Cap Analysis', url: 'https://www.screener.in/screens/71/blue-chip-stocks/' }
      ]
    },
    {
      type: 'Mid Cap Stocks',
      description: 'Growing companies with market cap ₹5,000-20,000 crores',
      risk: 'Medium-High',
      examples: 'Pidilite, Page Industries, Torrent Pharma',
      suitability: 'Moderate to aggressive investors',
      resources: [
        { name: 'Nifty Midcap 100', url: 'https://www.niftyindices.com/indices/equity/broad-based-indices/nifty-midcap-100' },
        { name: 'Mid Cap Screener', url: 'https://www.screener.in/screens/67/mid-cap-stocks/' }
      ]
    },
    {
      type: 'Small Cap Stocks',
      description: 'Smaller companies with market cap < ₹5,000 crores',
      risk: 'High',
      examples: 'Various emerging companies across sectors',
      suitability: 'Aggressive investors with high risk tolerance',
      resources: [
        { name: 'Nifty Smallcap 100', url: 'https://www.niftyindices.com/indices/equity/broad-based-indices/nifty-smallcap-100' },
        { name: 'Small Cap Research', url: 'https://www.valueresearchonline.com/stocks/selector/primary-market/equity/?market-cap=small-cap' }
      ]
    }
  ];

  const bondTypes = [
    {
      type: 'Government Bonds',
      issuer: 'Government of India',
      risk: 'Very Low',
      returns: '6-8%',
      taxation: 'Taxable as per income slab',
      liquidity: 'High (can be sold in secondary market)',
      resources: [
        { name: 'RBI Retail Direct', url: 'https://rbiretaildirect.org.in/' },
        { name: 'Government Securities', url: 'https://www.rbi.org.in/Scripts/BS_ViewMasCirculardetails.aspx?id=12270' }
      ]
    },
    {
      type: 'Corporate Bonds',
      issuer: 'Private Companies',
      risk: 'Low-Medium',
      returns: '7-10%',
      taxation: 'Taxable as per income slab',
      liquidity: 'Medium (depends on company rating)',
      resources: [
        { name: 'Corporate Bond Platform', url: 'https://www.nseindia.com/products-services/debt-market/corporate-bonds' },
        { name: 'Bond Ratings Guide', url: 'https://www.crisil.com/en/home/our-businesses/ratings.html' }
      ]
    },
    {
      type: 'RBI Bonds',
      issuer: 'Reserve Bank of India',
      risk: 'Very Low',
      returns: '7.15% (current)',
      taxation: 'Taxable as per income slab',
      liquidity: 'Low (7-year lock-in period)',
      resources: [
        { name: 'RBI Floating Rate Bonds', url: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12077' },
        { name: 'How to Invest', url: 'https://rbiretaildirect.org.in/login' }
      ]
    }
  ];

  const valuationMetrics = [
    {
      metric: 'P/E Ratio',
      description: 'Price-to-Earnings ratio shows how much investors pay per rupee of earnings',
      goodRange: 'Lower P/E may indicate undervaluation',
      formula: 'Market Price ÷ Earnings Per Share'
    },
    {
      metric: 'Revenue Growth',
      description: 'Consistent revenue growth indicates business expansion and market demand',
      goodRange: 'Look for 15%+ annual growth',
      formula: '(Current Year Revenue - Previous Year) ÷ Previous Year × 100'
    },
    {
      metric: 'Debt-to-Equity',
      description: 'Measures company\'s financial leverage and ability to handle debt',
      goodRange: 'Lower ratios generally better',
      formula: 'Total Debt ÷ Total Equity'
    },
    {
      metric: 'ROE',
      description: 'Return on Equity shows how efficiently company uses shareholders\' money',
      goodRange: '15%+ ROE is generally good',
      formula: 'Net Income ÷ Shareholders\' Equity × 100'
    }
  ];

  const portfolioAllocation = [
    {
      age: 'Young investors (20-30)',
      stocks: '70-80%',
      bonds: '20-30%',
      rationale: 'High growth potential with long investment horizon'
    },
    {
      age: 'Middle-aged (30-50)',
      stocks: '60-70%',
      bonds: '30-40%',
      rationale: 'Balanced approach with moderate risk'
    },
    {
      age: 'Near retirement (50+)',
      stocks: '40-50%',
      bonds: '50-60%',
      rationale: 'Capital preservation with steady income'
    }
  ];

  const investmentPrinciples = [
    'Diversify across sectors and company sizes',
    'Don\'t put all money in one stock or bond',
    'Regular review and rebalancing',
    'Focus on quality companies with good fundamentals',
    'Stay invested for long-term wealth creation',
    'Keep some bonds for stability and regular income'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shares & Bonds Deep Dive</h1>
            <p className="text-gray-600 mt-2">Understand the fundamentals of equity and debt investments with comprehensive analysis and resources</p>
          </div>

          {/* Equity Shares Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="h-12 w-12 text-blue-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Equity Shares (Stocks)</h2>
                <p className="text-gray-600">Ownership stakes in companies with potential for capital appreciation and dividends</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {shareTypes.map((share, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{share.type}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      share.risk === 'Low-Medium' ? 'bg-yellow-100 text-yellow-800' :
                      share.risk === 'Medium-High' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {share.risk} Risk
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{share.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <p><span className="font-semibold">Examples:</span> {share.examples}</p>
                    <p><span className="font-semibold">Best For:</span> {share.suitability}</p>
                  </div>
                  <div className="space-y-1">
                    {share.resources.map((resource, resourceIndex) => (
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

          {/* Bonds Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <Shield className="h-12 w-12 text-green-600 mr-4" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Bonds (Debt Securities)</h2>
                <p className="text-gray-600">Fixed-income investments providing regular interest payments and capital preservation</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {bondTypes.map((bond, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{bond.type}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {bond.returns}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-semibold">Issuer:</span> {bond.issuer}</p>
                    <p><span className="font-semibold">Risk:</span> {bond.risk}</p>
                    <p><span className="font-semibold">Liquidity:</span> {bond.liquidity}</p>
                    <p><span className="font-semibold">Tax:</span> {bond.taxation}</p>
                  </div>
                  <div className="space-y-1">
                    {bond.resources.map((resource, resourceIndex) => (
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

          {/* Stock Valuation Metrics */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Stock Valuation Basics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuationMetrics.map((metric, index) => {
                const icons = [DollarSign, TrendingUp, Shield, Award];
                const Icon = icons[index];
                const colors = ['blue', 'green', 'purple', 'orange'];
                const color = colors[index];
                
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                    <Icon className={`h-8 w-8 text-${color}-600 mb-4`} />
                    <h4 className="font-bold text-gray-900 mb-2">{metric.metric}</h4>
                    <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
                    <div className="space-y-1 text-xs">
                      <p className={`text-${color}-600`}>{metric.goodRange}</p>
                      <p className="text-gray-500">{metric.formula}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Portfolio Allocation */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Age-Based Portfolio Allocation</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid md:grid-cols-3 gap-6">
                {portfolioAllocation.map((allocation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{allocation.age}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Stocks:</span>
                        <span className="font-bold text-blue-600">{allocation.stocks}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Bonds:</span>
                        <span className="font-bold text-green-600">{allocation.bonds}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{allocation.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Investment Principles */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Building Your Portfolio</h3>
                  <p className="text-green-100 mb-6">
                    A balanced portfolio typically includes both stocks and bonds. The allocation depends 
                    on your age, risk tolerance, and investment goals.
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="font-bold mb-4">Key Investment Principles:</h4>
                  <ul className="space-y-2 text-sm">
                    {investmentPrinciples.map((principle, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-4 h-4 bg-white rounded-full mr-3 flex-shrink-0"></div>
                        <span>{principle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* External Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Investment Research Resources</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Stock Research',
                  resources: [
                    { name: 'Screener.in', url: 'https://www.screener.in/' },
                    { name: 'Tijori Finance', url: 'https://tijori.com/' },
                    { name: 'Value Research', url: 'https://www.valueresearchonline.com/stocks/' }
                  ]
                },
                {
                  title: 'Bond Platforms',
                  resources: [
                    { name: 'RBI Retail Direct', url: 'https://rbiretaildirect.org.in/' },
                    { name: 'NSE Corporate Bonds', url: 'https://www.nseindia.com/products-services/debt-market' },
                    { name: 'BSE Bond Platform', url: 'https://www.bseindia.com/markets/debt/debt_home.aspx' }
                  ]
                },
                {
                  title: 'Analysis Tools',
                  resources: [
                    { name: 'TradingView', url: 'https://in.tradingview.com/' },
                    { name: 'ChartInk', url: 'https://chartink.com/' },
                    { name: 'Trendlyne', url: 'https://trendlyne.com/' }
                  ]
                },
                {
                  title: 'Educational Content',
                  resources: [
                    { name: 'Zerodha Varsity', url: 'https://zerodha.com/varsity/' },
                    { name: 'NSE Academy', url: 'https://www.nseindia.com/education' },
                    { name: 'SEBI Investor Education', url: 'https://investor.sebi.gov.in/' }
                  ]
                },
                {
                  title: 'Market Data',
                  resources: [
                    { name: 'MoneyControl', url: 'https://www.moneycontrol.com/' },
                    { name: 'Economic Times Markets', url: 'https://economictimes.indiatimes.com/markets' },
                    { name: 'BSE/NSE Live Data', url: 'https://www.nseindia.com/market-data/live-equity-market' }
                  ]
                },
                {
                  title: 'Investment Platforms',
                  resources: [
                    { name: 'Zerodha', url: 'https://zerodha.com/' },
                    { name: 'Groww', url: 'https://groww.in/' },
                    { name: 'Upstox', url: 'https://upstox.com/' }
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

export default SharesBondsPage;