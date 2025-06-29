import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, PieChart, Target, TrendingUp, Home, Car, GraduationCap, Heart } from 'lucide-react';
import Footer from '../components/Footer';

const FinancialTools: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  // EMI Calculator
  const [emiInputs, setEmiInputs] = useState({
    principal: 1000000,
    rate: 8.5,
    tenure: 20
  });

  const calculateEMI = () => {
    const P = emiInputs.principal;
    const r = emiInputs.rate / 100 / 12;
    const n = emiInputs.tenure * 12;
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;
    
    return { emi, totalAmount, totalInterest };
  };

  // Retirement Calculator
  const [retirementInputs, setRetirementInputs] = useState({
    currentAge: 25,
    retirementAge: 60,
    monthlyExpenses: 50000,
    inflationRate: 6,
    expectedReturn: 12
  });

  const calculateRetirement = () => {
    const yearsToRetirement = retirementInputs.retirementAge - retirementInputs.currentAge;
    const futureExpenses = retirementInputs.monthlyExpenses * Math.pow(1 + retirementInputs.inflationRate / 100, yearsToRetirement);
    const requiredCorpus = (futureExpenses * 12) / (retirementInputs.expectedReturn / 100);
    const monthlySIP = (requiredCorpus * (retirementInputs.expectedReturn / 100 / 12)) / (Math.pow(1 + retirementInputs.expectedReturn / 100 / 12, yearsToRetirement * 12) - 1);
    
    return { futureExpenses, requiredCorpus, monthlySIP };
  };

  // Goal Calculator
  const [goalInputs, setGoalInputs] = useState({
    goalAmount: 2000000,
    timeFrame: 5,
    expectedReturn: 12
  });

  const calculateGoal = () => {
    const monthlyRate = goalInputs.expectedReturn / 100 / 12;
    const months = goalInputs.timeFrame * 12;
    const monthlySIP = (goalInputs.goalAmount * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1);
    
    return { monthlySIP };
  };

  const tools = [
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Calculate returns on systematic investment plans',
      icon: TrendingUp,
      color: 'blue',
      link: '/sip-calculator'
    },
    {
      id: 'budget',
      title: 'Budget Tracker',
      description: 'Track expenses and manage monthly budget',
      icon: PieChart,
      color: 'green',
      link: '/budgeting'
    },
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate loan EMIs for home, car, and personal loans',
      icon: Calculator,
      color: 'purple',
      internal: true
    },
    {
      id: 'retirement',
      title: 'Retirement Planner',
      description: 'Plan for your retirement and calculate corpus needed',
      icon: Target,
      color: 'orange',
      internal: true
    },
    {
      id: 'goal',
      title: 'Goal Calculator',
      description: 'Calculate SIP needed to achieve financial goals',
      icon: Target,
      color: 'red',
      internal: true
    }
  ];

  const emiResult = calculateEMI();
  const retirementResult = calculateRetirement();
  const goalResult = calculateGoal();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Financial Tools</h1>
            <p className="text-gray-600 mt-2">Comprehensive calculators and tools for your financial planning needs</p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const colorClasses = {
                blue: 'from-blue-50 to-blue-100 text-blue-600 border-blue-200',
                green: 'from-green-50 to-green-100 text-green-600 border-green-200',
                purple: 'from-purple-50 to-purple-100 text-purple-600 border-purple-200',
                orange: 'from-orange-50 to-orange-100 text-orange-600 border-orange-200',
                red: 'from-red-50 to-red-100 text-red-600 border-red-200'
              };

              const content = (
                <div className={`bg-gradient-to-br ${colorClasses[tool.color as keyof typeof colorClasses]} rounded-xl p-6 border-2 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  activeCalculator === tool.id ? 'ring-2 ring-blue-500' : ''
                }`}>
                  <Icon className="h-12 w-12 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                  <p className="text-gray-700">{tool.description}</p>
                </div>
              );

              if (tool.link) {
                return (
                  <Link key={tool.id} to={tool.link}>
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveCalculator(activeCalculator === tool.id ? null : tool.id)}
                  className="text-left w-full"
                >
                  {content}
                </button>
              );
            })}
          </div>

          {/* EMI Calculator */}
          {activeCalculator === 'emi' && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-6">
                <Calculator className="h-8 w-8 text-purple-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">EMI Calculator</h3>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                    <input
                      type="number"
                      value={emiInputs.principal}
                      onChange={(e) => setEmiInputs({...emiInputs, principal: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% per annum)</label>
                    <input
                      type="number"
                      value={emiInputs.rate}
                      onChange={(e) => setEmiInputs({...emiInputs, rate: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Years)</label>
                    <input
                      type="number"
                      value={emiInputs.tenure}
                      onChange={(e) => setEmiInputs({...emiInputs, tenure: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-purple-600">Monthly EMI</p>
                    <p className="text-3xl font-bold text-purple-900">₹{Math.round(emiResult.emi).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Total Amount Payable</p>
                    <p className="text-xl font-bold text-gray-900">₹{Math.round(emiResult.totalAmount).toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-600">Total Interest</p>
                    <p className="text-xl font-bold text-red-900">₹{Math.round(emiResult.totalInterest).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Retirement Calculator */}
          {activeCalculator === 'retirement' && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-orange-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Retirement Planner</h3>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Age</label>
                    <input
                      type="number"
                      value={retirementInputs.currentAge}
                      onChange={(e) => setRetirementInputs({...retirementInputs, currentAge: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Age</label>
                    <input
                      type="number"
                      value={retirementInputs.retirementAge}
                      onChange={(e) => setRetirementInputs({...retirementInputs, retirementAge: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Expenses (₹)</label>
                    <input
                      type="number"
                      value={retirementInputs.monthlyExpenses}
                      onChange={(e) => setRetirementInputs({...retirementInputs, monthlyExpenses: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Inflation Rate (%)</label>
                    <input
                      type="number"
                      value={retirementInputs.inflationRate}
                      onChange={(e) => setRetirementInputs({...retirementInputs, inflationRate: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                    <input
                      type="number"
                      value={retirementInputs.expectedReturn}
                      onChange={(e) => setRetirementInputs({...retirementInputs, expectedReturn: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-orange-600">Required Monthly SIP</p>
                    <p className="text-3xl font-bold text-orange-900">₹{Math.round(retirementResult.monthlySIP).toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-blue-600">Future Monthly Expenses</p>
                    <p className="text-xl font-bold text-blue-900">₹{Math.round(retirementResult.futureExpenses).toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-600">Required Retirement Corpus</p>
                    <p className="text-xl font-bold text-green-900">₹{Math.round(retirementResult.requiredCorpus).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goal Calculator */}
          {activeCalculator === 'goal' && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Goal Calculator</h3>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Goal Amount (₹)</label>
                    <input
                      type="number"
                      value={goalInputs.goalAmount}
                      onChange={(e) => setGoalInputs({...goalInputs, goalAmount: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Frame (Years)</label>
                    <input
                      type="number"
                      value={goalInputs.timeFrame}
                      onChange={(e) => setGoalInputs({...goalInputs, timeFrame: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                    <input
                      type="number"
                      value={goalInputs.expectedReturn}
                      onChange={(e) => setGoalInputs({...goalInputs, expectedReturn: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      step="0.1"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Popular Goals:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: 'Home', amount: 5000000, icon: Home },
                        { name: 'Car', amount: 1500000, icon: Car },
                        { name: 'Education', amount: 2500000, icon: GraduationCap },
                        { name: 'Wedding', amount: 2000000, icon: Heart }
                      ].map((goal) => {
                        const Icon = goal.icon;
                        return (
                          <button
                            key={goal.name}
                            onClick={() => setGoalInputs({...goalInputs, goalAmount: goal.amount})}
                            className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Icon className="h-4 w-4 text-gray-600" />
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">{goal.name}</p>
                              <p className="text-xs text-gray-600">₹{(goal.amount / 100000).toFixed(0)}L</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-red-600">Required Monthly SIP</p>
                    <p className="text-3xl font-bold text-red-900">₹{Math.round(goalResult.monthlySIP).toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-600">Total Investment</p>
                    <p className="text-xl font-bold text-gray-900">₹{Math.round(goalResult.monthlySIP * goalInputs.timeFrame * 12).toLocaleString()}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-600">Expected Returns</p>
                    <p className="text-xl font-bold text-green-900">₹{Math.round(goalInputs.goalAmount - (goalResult.monthlySIP * goalInputs.timeFrame * 12)).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* External Resources */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Resources</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Mutual Fund Research',
                  description: 'Research and compare mutual funds',
                  url: 'https://www.valueresearchonline.com',
                  color: 'blue'
                },
                {
                  title: 'Stock Analysis',
                  description: 'Detailed stock analysis and screeners',
                  url: 'https://www.screener.in',
                  color: 'green'
                },
                {
                  title: 'Market News',
                  description: 'Latest financial news and updates',
                  url: 'https://www.moneycontrol.com',
                  color: 'purple'
                },
                {
                  title: 'Tax Calculator',
                  description: 'Calculate income tax and plan savings',
                  url: 'https://cleartax.in/s/income-tax-calculator',
                  color: 'orange'
                },
                {
                  title: 'Credit Score',
                  description: 'Check your credit score for free',
                  url: 'https://www.cibil.com',
                  color: 'red'
                },
                {
                  title: 'Insurance Calculator',
                  description: 'Calculate insurance coverage needed',
                  url: 'https://www.policybazaar.com/life-insurance/calculator/',
                  color: 'indigo'
                }
              ].map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block p-4 border-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    resource.color === 'blue' ? 'border-blue-200 hover:border-blue-400' :
                    resource.color === 'green' ? 'border-green-200 hover:border-green-400' :
                    resource.color === 'purple' ? 'border-purple-200 hover:border-purple-400' :
                    resource.color === 'orange' ? 'border-orange-200 hover:border-orange-400' :
                    resource.color === 'red' ? 'border-red-200 hover:border-red-400' :
                    'border-indigo-200 hover:border-indigo-400'
                  }`}
                >
                  <h4 className="font-bold text-gray-900 mb-2">{resource.title}</h4>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </a>
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

export default FinancialTools;