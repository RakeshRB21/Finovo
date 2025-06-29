import React, { useState } from 'react';
import { User, DollarSign, Target, Shield, Bell, Lock, Trash2, Save, Download, Eye, EyeOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const UserSettings: React.FC = () => {
  const { user, updateProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Delete account state
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    confirmText: '',
    step: 1
  });

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

  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    targetDate: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    category: 'other' as 'home' | 'car' | 'education' | 'wedding' | 'retirement' | 'travel' | 'emergency' | 'other'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const { error } = await updateProfile(formData);
    if (error) {
      showMessage('error', 'Error updating profile: ' + error);
    } else {
      showMessage('success', 'Profile updated successfully!');
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) {
        showMessage('error', 'Error changing password: ' + error.message);
      } else {
        showMessage('success', 'Password changed successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      showMessage('error', 'An unexpected error occurred');
    }
    setLoading(false);
  };

  const handleExportData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch all user data
      const [expensesRes, investmentsRes, goalsRes] = await Promise.all([
        supabase.from('expenses').select('*').eq('user_id', user.id),
        supabase.from('investments').select('*').eq('user_id', user.id),
        supabase.from('financial_goals').select('*').eq('user_id', user.id)
      ]);

      const userData = {
        profile: {
          name: user.name,
          email: user.email,
          age: user.age,
          monthlyIncome: user.monthlyIncome,
          currentSavings: user.currentSavings,
          riskTolerance: user.riskTolerance,
          investmentExperience: user.investmentExperience,
          employmentType: user.employmentType,
          dependents: user.dependents,
          hasHealthInsurance: user.hasHealthInsurance,
          hasLifeInsurance: user.hasLifeInsurance,
          monthlyExpenseTarget: user.monthlyExpenseTarget,
          emergencyFundTarget: user.emergencyFundTarget
        },
        expenses: expensesRes.data || [],
        investments: investmentsRes.data || [],
        financialGoals: goalsRes.data || [],
        exportDate: new Date().toISOString(),
        exportedBy: 'Finovo Financial Platform'
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `finovo-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showMessage('success', 'Data exported successfully!');
    } catch (error) {
      showMessage('error', 'Error exporting data');
    }
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.confirmText !== 'DELETE MY ACCOUNT') {
      showMessage('error', 'Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }

    setLoading(true);
    try {
      // Delete user data (cascading deletes will handle related data)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user!.id);
      
      if (deleteError) {
        showMessage('error', 'Error deleting account: ' + deleteError.message);
      } else {
        // Sign out and redirect
        await signOut();
        showMessage('success', 'Account deleted successfully');
      }
    } catch (error) {
      showMessage('error', 'An unexpected error occurred');
    }
    setLoading(false);
  };

  const handleAddGoal = async () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.targetDate) {
      const goal = {
        id: Date.now().toString(),
        ...newGoal
      };
      
      const updatedGoals = [...(user?.financialGoals || []), goal];
      const { error } = await updateProfile({ financialGoals: updatedGoals });
      
      if (error) {
        showMessage('error', 'Error adding goal: ' + error);
      } else {
        setNewGoal({
          name: '',
          targetAmount: 0,
          currentAmount: 0,
          targetDate: '',
          priority: 'medium',
          category: 'other'
        });
        showMessage('success', 'Goal added successfully!');
      }
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    const updatedGoals = user?.financialGoals?.filter(goal => goal.id !== goalId) || [];
    const { error } = await updateProfile({ financialGoals: updatedGoals });
    
    if (error) {
      showMessage('error', 'Error deleting goal: ' + error);
    } else {
      showMessage('success', 'Goal deleted successfully!');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'financial', label: 'Financial Info', icon: DollarSign },
    { id: 'goals', label: 'Financial Goals', icon: Target },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const goalCategories = [
    { value: 'home', label: 'Home Purchase', emoji: '🏠' },
    { value: 'car', label: 'Car Purchase', emoji: '🚗' },
    { value: 'education', label: 'Education', emoji: '🎓' },
    { value: 'wedding', label: 'Wedding', emoji: '💒' },
    { value: 'retirement', label: 'Retirement', emoji: '🏖️' },
    { value: 'travel', label: 'Travel', emoji: '✈️' },
    { value: 'emergency', label: 'Emergency Fund', emoji: '🛡️' },
    { value: 'other', label: 'Other', emoji: '🎯' }
  ];

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-yellow-500';
    if (strength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength <= 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your profile and preferences</p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle className="h-5 w-5 mr-3" /> : <AlertTriangle className="h-5 w-5 mr-3" />}
            {message.text}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
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
                  
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="mt-6 flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}

              {/* Financial Tab */}
              {activeTab === 'financial' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                      <input
                        type="number"
                        value={formData.monthlyIncome}
                        onChange={(e) => handleInputChange('monthlyIncome', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Savings (₹)</label>
                      <input
                        type="number"
                        value={formData.currentSavings}
                        onChange={(e) => handleInputChange('currentSavings', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expense Target (₹)</label>
                      <input
                        type="number"
                        value={formData.monthlyExpenseTarget}
                        onChange={(e) => handleInputChange('monthlyExpenseTarget', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Fund Target (₹)</label>
                      <input
                        type="number"
                        value={formData.emergencyFundTarget}
                        onChange={(e) => handleInputChange('emergencyFundTarget', Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                      <select
                        value={formData.riskTolerance}
                        onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Conservative</option>
                        <option value="medium">Moderate</option>
                        <option value="high">Aggressive</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Investment Experience</label>
                      <select
                        value={formData.investmentExperience}
                        onChange={(e) => handleInputChange('investmentExperience', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="mt-6 flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}

              {/* Goals Tab */}
              {activeTab === 'goals' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Goals</h2>
                  
                  {/* Add New Goal */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Goal</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
                        <input
                          type="text"
                          value={newGoal.name}
                          onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., Buy a house"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={newGoal.category}
                          onChange={(e) => setNewGoal({...newGoal, category: e.target.value as any})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {goalCategories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.emoji} {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount (₹)</label>
                        <input
                          type="number"
                          value={newGoal.targetAmount}
                          onChange={(e) => setNewGoal({...newGoal, targetAmount: Number(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Amount (₹)</label>
                        <input
                          type="number"
                          value={newGoal.currentAmount}
                          onChange={(e) => setNewGoal({...newGoal, currentAmount: Number(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                        <input
                          type="date"
                          value={newGoal.targetDate}
                          onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <select
                          value={newGoal.priority}
                          onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as any})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleAddGoal}
                      className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Goal
                    </button>
                  </div>
                  
                  {/* Existing Goals */}
                  <div className="space-y-4">
                    {user?.financialGoals?.map((goal) => {
                      const progress = (goal.currentAmount / goal.targetAmount) * 100;
                      const category = goalCategories.find(cat => cat.value === goal.category);
                      
                      return (
                        <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {category?.emoji} {goal.name}
                              </h4>
                              <p className="text-sm text-gray-600">Target: {goal.targetDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                                goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {goal.priority} priority
                              </span>
                              <button
                                onClick={() => handleDeleteGoal(goal.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between text-sm">
                              <span>₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                              <span>{progress.toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Insurance Tab */}
              {activeTab === 'insurance' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance Information</h2>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Insurance</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.hasHealthInsurance}
                                onChange={(e) => handleInputChange('hasHealthInsurance', e.target.checked)}
                                className="mr-2"
                              />
                              I have health insurance
                            </label>
                          </div>
                          {!formData.hasHealthInsurance && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                              <p className="text-orange-800 text-sm">
                                <strong>Recommendation:</strong> Get health insurance with ₹5-10 lakh coverage. 
                                Medical costs are rising rapidly in India.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Life Insurance</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={formData.hasLifeInsurance}
                                onChange={(e) => handleInputChange('hasLifeInsurance', e.target.checked)}
                                className="mr-2"
                              />
                              I have life insurance
                            </label>
                          </div>
                          {!formData.hasLifeInsurance && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                              <p className="text-orange-800 text-sm">
                                <strong>Recommendation:</strong> Get term life insurance worth 
                                ₹{((formData.monthlyIncome * 120) / 100000).toFixed(0)} lakh 
                                (10x annual income) if you have dependents.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          Weekly financial summary
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          Goal progress updates
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          Investment opportunities
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          Market news and updates
                        </label>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminders</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          Monthly budget review
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          SIP payment reminders
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          Insurance premium due dates
                        </label>
                      </div>
                    </div>

                    <button
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  <div className="space-y-8">
                    {/* Password Change */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                      <div className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? 'text' : 'password'}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPasswords.current ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPasswords.new ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                            </button>
                          </div>
                          {passwordData.newPassword && (
                            <div className="mt-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength(passwordData.newPassword))}`}
                                    style={{ width: `${(getPasswordStrength(passwordData.newPassword) / 4) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-600">
                                  {getStrengthText(getPasswordStrength(passwordData.newPassword))}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPasswords.confirm ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={handleChangePassword}
                          disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          {loading ? 'Changing...' : 'Change Password'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Data Export */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h3>
                      <p className="text-gray-600 mb-4">Download all your financial data in JSON format</p>
                      <button
                        onClick={handleExportData}
                        disabled={loading}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {loading ? 'Exporting...' : 'Export Data'}
                      </button>
                    </div>
                    
                    {/* Account Deletion */}
                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
                      <p className="text-red-700 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      
                      {!deleteConfirmation.isOpen ? (
                        <button
                          onClick={() => setDeleteConfirmation({...deleteConfirmation, isOpen: true})}
                          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </button>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-white border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-900 mb-2">⚠️ This will permanently delete:</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              <li>• Your profile and personal information</li>
                              <li>• All financial data and transaction history</li>
                              <li>• Investment records and portfolio data</li>
                              <li>• Financial goals and progress tracking</li>
                              <li>• All settings and preferences</li>
                            </ul>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-red-700 mb-2">
                              Type "DELETE MY ACCOUNT" to confirm:
                            </label>
                            <input
                              type="text"
                              value={deleteConfirmation.confirmText}
                              onChange={(e) => setDeleteConfirmation({...deleteConfirmation, confirmText: e.target.value})}
                              className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              placeholder="DELETE MY ACCOUNT"
                            />
                          </div>
                          
                          <div className="flex space-x-3">
                            <button
                              onClick={handleDeleteAccount}
                              disabled={loading || deleteConfirmation.confirmText !== 'DELETE MY ACCOUNT'}
                              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              {loading ? 'Deleting...' : 'Permanently Delete Account'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirmation({isOpen: false, confirmText: '', step: 1})}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;