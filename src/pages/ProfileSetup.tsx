import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, DollarSign, Target, Shield, TrendingUp, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileSetup: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || 25,
    monthlyIncome: user?.monthlyIncome || 0,
    currentSavings: user?.currentSavings || 0,
    riskTolerance: user?.riskTolerance || 'medium',
    investmentExperience: user?.investmentExperience || 'beginner',
    employmentType: user?.employmentType || 'salaried',
    dependents: user?.dependents || 0,
    hasHealthInsurance: user?.hasHealthInsurance || false,
    hasLifeInsurance: user?.hasLifeInsurance || false,
    monthlyExpenseTarget: user?.monthlyExpenseTarget || 0,
    emergencyFundTarget: user?.emergencyFundTarget || 0
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const totalSteps = 4;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    const { error } = await updateProfile(formData);
    
    if (error) {
      alert('Error updating profile: ' + error);
    } else {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const calculateRecommendations = () => {
    const income = formData.monthlyIncome;
    return {
      emergencyFund: income * 6,
      monthlyExpenses: income * 0.7,
      monthlySavings: income * 0.2,
      lifeInsurance: income * 120 // 10 years of income
    };
  };

  const recommendations = calculateRecommendations();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Financial Profile</h1>
          <p className="text-gray-600 mt-2">Help us personalize your financial journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-700">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <User className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="18"
                    max="65"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) => handleInputChange('employmentType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="salaried">Salaried Employee</option>
                    <option value="business">Business Owner</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Dependents</label>
                  <input
                    type="number"
                    value={formData.dependents}
                    onChange={(e) => handleInputChange('dependents', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Financial Information */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <DollarSign className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Financial Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                  <input
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your monthly income"
                  />
                  <p className="text-xs text-gray-500 mt-1">Include salary, business income, and other regular income</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Savings (₹)</label>
                  <input
                    type="number"
                    value={formData.currentSavings}
                    onChange={(e) => handleInputChange('currentSavings', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your current savings"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total amount in savings accounts, FDs, etc.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expense Target (₹)</label>
                  <input
                    type="number"
                    value={formData.monthlyExpenseTarget}
                    onChange={(e) => handleInputChange('monthlyExpenseTarget', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your monthly expense budget"
                  />
                  <p className="text-xs text-blue-600 mt-1">Recommended: ₹{recommendations.monthlyExpenses.toLocaleString()} (70% of income)</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Fund Target (₹)</label>
                  <input
                    type="number"
                    value={formData.emergencyFundTarget}
                    onChange={(e) => handleInputChange('emergencyFundTarget', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your emergency fund target"
                  />
                  <p className="text-xs text-blue-600 mt-1">Recommended: ₹{recommendations.emergencyFund.toLocaleString()} (6 months of income)</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Insurance & Risk Profile */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Insurance & Risk Profile</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Do you have Health Insurance?</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="healthInsurance"
                          checked={formData.hasHealthInsurance}
                          onChange={() => handleInputChange('hasHealthInsurance', true)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="healthInsurance"
                          checked={!formData.hasHealthInsurance}
                          onChange={() => handleInputChange('hasHealthInsurance', false)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Do you have Life Insurance?</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="lifeInsurance"
                          checked={formData.hasLifeInsurance}
                          onChange={() => handleInputChange('hasLifeInsurance', true)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="lifeInsurance"
                          checked={!formData.hasLifeInsurance}
                          onChange={() => handleInputChange('hasLifeInsurance', false)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                    {!formData.hasLifeInsurance && (
                      <p className="text-xs text-orange-600 mt-1">
                        Recommended coverage: ₹{recommendations.lifeInsurance.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Risk Tolerance</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'low', label: 'Conservative', desc: 'Prefer stable returns, avoid volatility' },
                      { value: 'medium', label: 'Moderate', desc: 'Balanced approach to risk and returns' },
                      { value: 'high', label: 'Aggressive', desc: 'Comfortable with high risk for high returns' }
                    ].map((option) => (
                      <div
                        key={option.value}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          formData.riskTolerance === option.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('riskTolerance', option.value)}
                      >
                        <h4 className="font-semibold text-gray-900">{option.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Investment Experience</label>
                  <select
                    value={formData.investmentExperience}
                    onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner (New to investing)</option>
                    <option value="intermediate">Intermediate (Some experience)</option>
                    <option value="advanced">Advanced (Experienced investor)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Recommendations */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Review & Recommendations</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{formData.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Income:</span>
                      <span className="font-medium">₹{formData.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Savings:</span>
                      <span className="font-medium">₹{formData.currentSavings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Tolerance:</span>
                      <span className="font-medium capitalize">{formData.riskTolerance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium capitalize">{formData.investmentExperience}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900">Monthly Budget Allocation</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Needs (50%):</span>
                          <span>₹{(formData.monthlyIncome * 0.5).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Wants (30%):</span>
                          <span>₹{(formData.monthlyIncome * 0.3).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Savings (20%):</span>
                          <span>₹{(formData.monthlyIncome * 0.2).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900">Investment Suggestions</h4>
                      <div className="mt-2 text-sm">
                        {formData.riskTolerance === 'low' && (
                          <p>Focus on debt funds, FDs, and PPF for stable returns</p>
                        )}
                        {formData.riskTolerance === 'medium' && (
                          <p>Balanced portfolio with 60% equity and 40% debt funds</p>
                        )}
                        {formData.riskTolerance === 'high' && (
                          <p>Aggressive portfolio with 80% equity and 20% debt funds</p>
                        )}
                      </div>
                    </div>
                    
                    {(!formData.hasHealthInsurance || !formData.hasLifeInsurance) && (
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-900">Insurance Priorities</h4>
                        <div className="mt-2 text-sm space-y-1">
                          {!formData.hasHealthInsurance && (
                            <p>• Get health insurance (₹5-10 lakh coverage)</p>
                          )}
                          {!formData.hasLifeInsurance && (
                            <p>• Get term life insurance (₹{(recommendations.lifeInsurance / 100000).toFixed(0)} lakh coverage)</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;