import React from 'react';
import { TrendingUp, Shield, DollarSign, Award } from 'lucide-react';

const SharesBonds: React.FC = () => {
  const shareTypes = [
    {
      type: 'Large Cap Stocks',
      description: 'Established companies with market cap > ₹20,000 crores',
      risk: 'Low-Medium',
      examples: 'TCS, Reliance, HDFC Bank',
      suitability: 'Conservative to moderate investors'
    },
    {
      type: 'Mid Cap Stocks',
      description: 'Growing companies with market cap ₹5,000-20,000 crores',
      risk: 'Medium-High',
      examples: 'Pidilite, Page Industries, Torrent Pharma',
      suitability: 'Moderate to aggressive investors'
    },
    {
      type: 'Small Cap Stocks',
      description: 'Smaller companies with market cap < ₹5,000 crores',
      risk: 'High',
      examples: 'Various emerging companies',
      suitability: 'Aggressive investors with high risk tolerance'
    }
  ];

  const bondTypes = [
    {
      type: 'Government Bonds',
      issuer: 'Government of India',
      risk: 'Very Low',
      returns: '6-8%',
      taxation: 'Taxable as per income slab',
      liquidity: 'High (can be sold in secondary market)'
    },
    {
      type: 'Corporate Bonds',
      issuer: 'Private Companies',
      risk: 'Low-Medium',
      returns: '7-10%',
      taxation: 'Taxable as per income slab',
      liquidity: 'Medium (depends on company rating)'
    },
    {
      type: 'RBI Bonds',
      issuer: 'Reserve Bank of India',
      risk: 'Very Low',
      returns: '7.15% (current)',
      taxation: 'Taxable as per income slab',
      liquidity: 'Low (7-year lock-in period)'
    }
  ];

  return (
    <section id="shares-bonds" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shares & Bonds Deep Dive
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understand the fundamentals of equity and debt investments. Learn how to evaluate 
            stocks and bonds for your investment portfolio.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center mb-8">
              <TrendingUp className="h-12 w-12 text-blue-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Equity Shares (Stocks)</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Shares represent ownership in a company. As a shareholder, you have a claim on the 
              company's assets and earnings, and you may receive dividends and voting rights.
            </p>
            
            <div className="space-y-4">
              {shareTypes.map((share, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{share.type}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      share.risk === 'Low-Medium' ? 'bg-yellow-100 text-yellow-800' :
                      share.risk === 'Medium-High' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {share.risk} Risk
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{share.description}</p>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <p><span className="font-semibold">Examples:</span> {share.examples}</p>
                    <p><span className="font-semibold">Best For:</span> {share.suitability}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center mb-8">
              <Shield className="h-12 w-12 text-green-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Bonds (Debt Securities)</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Bonds are debt instruments where you lend money to the issuer in exchange for periodic 
              interest payments and return of principal at maturity.
            </p>
            
            <div className="space-y-4">
              {bondTypes.map((bond, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-gray-900">{bond.type}</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {bond.returns}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                    <p><span className="font-semibold">Issuer:</span> {bond.issuer}</p>
                    <p><span className="font-semibold">Risk:</span> {bond.risk}</p>
                    <p><span className="font-semibold">Liquidity:</span> {bond.liquidity}</p>
                    <p><span className="font-semibold">Tax:</span> {bond.taxation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Stock Valuation Basics</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6">
              <DollarSign className="h-8 w-8 text-blue-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">P/E Ratio</h4>
              <p className="text-sm text-gray-600 mb-3">Price-to-Earnings ratio shows how much investors pay per rupee of earnings.</p>
              <p className="text-xs text-blue-600">Lower P/E may indicate undervaluation</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Revenue Growth</h4>
              <p className="text-sm text-gray-600 mb-3">Consistent revenue growth indicates business expansion and market demand.</p>
              <p className="text-xs text-green-600">Look for 15%+ annual growth</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Debt-to-Equity</h4>
              <p className="text-sm text-gray-600 mb-3">Measures company's financial leverage and ability to handle debt.</p>
              <p className="text-xs text-purple-600">Lower ratios generally better</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <Award className="h-8 w-8 text-orange-600 mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">ROE</h4>
              <p className="text-sm text-gray-600 mb-3">Return on Equity shows how efficiently company uses shareholders' money.</p>
              <p className="text-xs text-orange-600">15%+ ROE is generally good</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Building Your Portfolio</h3>
              <p className="text-green-100 mb-6">
                A balanced portfolio typically includes both stocks and bonds. The allocation depends 
                on your age, risk tolerance, and investment goals.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                  <span>Young investors: 70-80% stocks, 20-30% bonds</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                  <span>Middle-aged: 60-70% stocks, 30-40% bonds</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white rounded-full mr-3"></div>
                  <span>Near retirement: 40-50% stocks, 50-60% bonds</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h4 className="font-bold mb-4">Key Investment Principles:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Diversify across sectors and company sizes</li>
                <li>• Don't put all money in one stock or bond</li>
                <li>• Regular review and rebalancing</li>
                <li>• Focus on quality companies with good fundamentals</li>
                <li>• Stay invested for long-term wealth creation</li>
                <li>• Keep some bonds for stability and regular income</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharesBonds;