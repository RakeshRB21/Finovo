import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, PieChart, Target } from 'lucide-react';
import Footer from '../components/Footer';

const SIPCalculator: React.FC = () => {
  const [sipAmount, setSipAmount] = useState(5000);
  const [duration, setDuration] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [results, setResults] = useState({
    totalInvestment: 0,
    futureValue: 0,
    totalReturns: 0
  });

  useEffect(() => {
    calculateSIP();
  }, [sipAmount, duration, expectedReturn]);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = duration * 12;
    const totalInvestment = sipAmount * totalMonths;
    
    // SIP Future Value Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
    const futureValue = sipAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalReturns = futureValue - totalInvestment;

    setResults({
      totalInvestment,
      futureValue,
      totalReturns
    });
  };

  const yearlyBreakdown = [];
  for (let year = 1; year <= duration; year++) {
    const months = year * 12;
    const monthlyRate = expectedReturn / 100 / 12;
    const investment = sipAmount * months;
    const value = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const returns = value - investment;
    
    yearlyBreakdown.push({
      year,
      investment,
      value,
      returns
    });
  }

  const popularSIPAmounts = [1000, 2000, 5000, 10000, 15000, 25000];
  const popularDurations = [5, 10, 15, 20, 25, 30];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">SIP Calculator</h1>
            <p className="text-gray-600 mt-2">Calculate the future value of your Systematic Investment Plan</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Input */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <Calculator className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">SIP Parameters</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly SIP Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={sipAmount}
                    onChange={(e) => setSipAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="500"
                    step="500"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularSIPAmounts.map(amount => (
                      <button
                        key={amount}
                        onClick={() => setSipAmount(amount)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          sipAmount === amount 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Duration (Years)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="50"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {popularDurations.map(years => (
                      <button
                        key={years}
                        onClick={() => setDuration(years)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          duration === years 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {years}Y
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="30"
                    step="0.5"
                  />
                  <div className="mt-2 text-sm text-gray-600">
                    <p>• Equity funds: 10-15% (historical average)</p>
                    <p>• Debt funds: 6-8% (historical average)</p>
                    <p>• Hybrid funds: 8-12% (historical average)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Investment Results</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-600">Total Investment</p>
                    <p className="text-2xl font-bold text-blue-900">₹{results.totalInvestment.toLocaleString()}</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-600">Future Value</p>
                    <p className="text-2xl font-bold text-green-900">₹{Math.round(results.futureValue).toLocaleString()}</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-purple-600">Total Returns</p>
                    <p className="text-2xl font-bold text-purple-900">₹{Math.round(results.totalReturns).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Insights:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Your money will grow {(results.futureValue / results.totalInvestment).toFixed(1)}x in {duration} years</li>
                    <li>• Monthly commitment: ₹{sipAmount.toLocaleString()}</li>
                    <li>• Wealth creation: ₹{Math.round(results.totalReturns).toLocaleString()}</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <PieChart className="h-6 w-6 text-orange-600 mr-2" />
                  <h4 className="text-lg font-bold text-gray-900">Investment vs Returns</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">Investment: {((results.totalInvestment / results.futureValue) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-700">Returns: {((results.totalReturns / results.futureValue) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Year-wise Breakdown */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-bold text-gray-900">Year-wise Growth</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Investment</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Portfolio Value</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyBreakdown.map((row) => (
                    <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold text-gray-900">{row.year}</td>
                      <td className="py-3 px-4 text-blue-600">₹{Math.round(row.investment).toLocaleString()}</td>
                      <td className="py-3 px-4 text-green-600 font-semibold">₹{Math.round(row.value).toLocaleString()}</td>
                      <td className="py-3 px-4 text-purple-600">₹{Math.round(row.returns).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIP Benefits */}
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Why Choose SIP?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-bold mb-2">Rupee Cost Averaging</h4>
                <p className="text-blue-100 text-sm">Buy more units when prices are low, fewer when high</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Power of Compounding</h4>
                <p className="text-blue-100 text-sm">Your returns generate their own returns over time</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Disciplined Investing</h4>
                <p className="text-blue-100 text-sm">Automated investments build wealth consistently</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">Flexibility</h4>
                <p className="text-blue-100 text-sm">Start with as little as ₹500 per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SIPCalculator;