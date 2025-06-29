import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, PiggyBank, AlertCircle, Plus, Edit3, Calendar, ArrowRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  type: 'need' | 'want' | 'savings';
}

interface Investment {
  id: string;
  type: string;
  amount: number;
  current_value: number;
  returns: number;
  date: string;
  platform: string;
}

const Dashboard: React.FC = () => {
  const { user, isProfileComplete } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickExpense, setQuickExpense] = useState({
    category: '',
    amount: '',
    description: '',
    type: 'need' as 'need' | 'want' | 'savings'
  });

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      // Load expenses (excluding savings type)
      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .neq('type', 'savings') // Exclude savings from expenses
        .order('date', { ascending: false });

      if (expensesError) {
        console.error('Error loading expenses:', expensesError);
      } else {
        setExpenses(expensesData || []);
      }

      // Load investments
      const { data: investmentsData, error: investmentsError } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (investmentsError) {
        console.error('Error loading investments:', investmentsError);
      } else {
        setInvestments(investmentsData || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addQuickExpense = async () => {
    if (!user || !quickExpense.category || !quickExpense.amount || !quickExpense.description) return;

    try {
      // If it's savings/investment, add to investments table instead
      if (quickExpense.type === 'savings') {
        const { error } = await supabase
          .from('investments')
          .insert({
            user_id: user.id,
            type: quickExpense.category,
            amount: parseFloat(quickExpense.amount),
            current_value: parseFloat(quickExpense.amount), // Initial value same as investment
            returns: 0, // No returns initially
            date: new Date().toISOString().split('T')[0],
            platform: quickExpense.description
          });

        if (error) {
          console.error('Error adding investment:', error);
          alert('Error adding investment');
        } else {
          setQuickExpense({ category: '', amount: '', description: '', type: 'need' });
          loadUserData(); // Reload data
        }
      } else {
        // Regular expense
        const { error } = await supabase
          .from('expenses')
          .insert({
            user_id: user.id,
            category: quickExpense.category,
            amount: parseFloat(quickExpense.amount),
            description: quickExpense.description,
            date: new Date().toISOString().split('T')[0],
            type: quickExpense.type
          });

        if (error) {
          console.error('Error adding expense:', error);
          alert('Error adding expense');
        } else {
          setQuickExpense({ category: '', amount: '', description: '', type: 'need' });
          loadUserData(); // Reload data
        }
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please log in</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your dashboard</p>
          <Link
            to="/login"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Target className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Profile</h1>
            <p className="text-xl text-gray-600 mb-8">
              To see your personalized dashboard, please complete your financial profile first.
            </p>
            <Link
              to="/profile-setup"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Complete Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your financial data...</p>
        </div>
      </div>
    );
  }

  // Calculate financial metrics from real data (excluding savings from expenses)
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalInvestments = investments.reduce((sum, investment) => sum + investment.current_value, 0);
  const totalReturns = investments.reduce((sum, investment) => sum + investment.returns, 0);
  const totalSavingsInvested = investments.reduce((sum, investment) => sum + investment.amount, 0);
  const monthlySavings = (user.monthlyIncome || 0) - totalExpenses;
  const savingsRate = user.monthlyIncome ? ((monthlySavings / user.monthlyIncome) * 100).toFixed(1) : '0';

  // Category-wise expense breakdown (excluding savings)
  const expenseCategories = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const expenseData = Object.entries(expenseCategories).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Monthly trend (last 6 months)
  const monthlyTrend = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = date.toISOString().slice(0, 7); // YYYY-MM format
    
    const monthExpenses = expenses
      .filter(expense => expense.date.startsWith(monthKey))
      .reduce((sum, expense) => sum + expense.amount, 0);
    
    const monthSavings = (user.monthlyIncome || 0) - monthExpenses;
    
    monthlyTrend.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      expenses: monthExpenses,
      savings: monthSavings
    });
  }

  // Financial goals progress
  const goalProgress = user.financialGoals?.map(goal => ({
    goal: goal.name,
    target: goal.targetAmount,
    current: goal.currentAmount,
    percentage: (goal.currentAmount / goal.targetAmount) * 100,
    category: goal.category,
    priority: goal.priority,
    targetDate: goal.targetDate
  })) || [];

  // Budget analysis (50/30/20 rule)
  const budgetAnalysis = {
    needs: (user.monthlyIncome || 0) * 0.5,
    wants: (user.monthlyIncome || 0) * 0.3,
    savings: (user.monthlyIncome || 0) * 0.2,
    actualExpenses: totalExpenses,
    actualSavings: monthlySavings
  };

  const expenseCategories2 = [
    'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
    'Bills & Utilities', 'Healthcare', 'Education', 'Others'
  ];

  const investmentCategories = [
    'Mutual Funds', 'Stocks', 'Fixed Deposits', 'PPF', 'ELSS', 'Gold', 'Real Estate', 'Others'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.name}! Here's your real-time financial overview.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">₹{(user.monthlyIncome || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500">Target set in profile</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Savings & Investments</p>
                <p className="text-2xl font-bold text-gray-900">₹{((user.currentSavings || 0) + totalSavingsInvested).toLocaleString()}</p>
                <p className="text-sm text-green-600">₹{totalSavingsInvested.toLocaleString()} invested</p>
              </div>
              <PiggyBank className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{expenses.length} transactions</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Investment Returns</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalReturns.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  {totalReturns >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <p className={`text-sm ${totalReturns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Portfolio value: ₹{totalInvestments.toLocaleString()}
                  </p>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Add Transaction */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Add Transaction</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <div>
              <select
                value={quickExpense.type}
                onChange={(e) => setQuickExpense({...quickExpense, type: e.target.value as 'need' | 'want' | 'savings'})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="need">Expense (Need)</option>
                <option value="want">Expense (Want)</option>
                <option value="savings">Investment/Savings</option>
              </select>
            </div>
            <div>
              <select
                value={quickExpense.category}
                onChange={(e) => setQuickExpense({...quickExpense, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {quickExpense.type === 'savings' ? 
                  investmentCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  )) :
                  expenseCategories2.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <input
                type="number"
                value={quickExpense.amount}
                onChange={(e) => setQuickExpense({...quickExpense, amount: e.target.value})}
                placeholder="Amount (₹)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="text"
                value={quickExpense.description}
                onChange={(e) => setQuickExpense({...quickExpense, description: e.target.value})}
                placeholder={quickExpense.type === 'savings' ? 'Platform/Details' : 'Description'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <button
                onClick={addQuickExpense}
                disabled={!quickExpense.category || !quickExpense.amount || !quickExpense.description}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {quickExpense.type === 'savings' ? 
              'Investments and savings will be tracked separately from expenses' : 
              'Expenses will be categorized as needs or wants for budget analysis'
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Expense Breakdown</h3>
            {expenseData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                  <p>No expenses recorded yet</p>
                  <p className="text-sm">Add your first expense above to see insights</p>
                </div>
              </div>
            )}
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={2} name="Available Savings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investment Portfolio */}
        {investments.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Investment Portfolio</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Invested</p>
                <p className="text-xl font-bold text-blue-600">₹{totalSavingsInvested.toLocaleString()}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {investments.slice(0, 6).map((investment) => (
                <div key={investment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{investment.type}</h4>
                    <span className={`text-sm ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {investment.returns >= 0 ? '+' : ''}₹{investment.returns.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{investment.platform}</p>
                  <div className="flex justify-between text-sm">
                    <span>Invested: ₹{investment.amount.toLocaleString()}</span>
                    <span>Current: ₹{investment.current_value.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Budget Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Budget Analysis (50/30/20 Rule)</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 mb-2">Needs (50%)</h4>
                <p className="text-2xl font-bold text-green-600">₹{budgetAnalysis.needs.toLocaleString()}</p>
                <p className="text-sm text-green-700 mt-2">Recommended</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Wants (30%)</h4>
                <p className="text-2xl font-bold text-blue-600">₹{budgetAnalysis.wants.toLocaleString()}</p>
                <p className="text-sm text-blue-700 mt-2">Recommended</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-purple-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 mb-2">Savings (20%)</h4>
                <p className="text-2xl font-bold text-purple-600">₹{budgetAnalysis.savings.toLocaleString()}</p>
                <p className="text-sm text-purple-700 mt-2">Recommended</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Your Current Status:</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Expenses:</span>
                <span className="font-semibold ml-2">₹{budgetAnalysis.actualExpenses.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600">Available for Savings:</span>
                <span className={`font-semibold ml-2 ${budgetAnalysis.actualSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{budgetAnalysis.actualSavings.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Already Invested:</span>
                <span className="font-semibold ml-2 text-blue-600">₹{totalSavingsInvested.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Goals */}
        {goalProgress.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Financial Goals Progress</h3>
              <Link
                to="/settings"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Manage Goals
              </Link>
            </div>
            <div className="space-y-6">
              {goalProgress.slice(0, 3).map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{goal.goal}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        goal.priority === 'high' ? 'bg-red-100 text-red-800' :
                        goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {goal.priority}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">
                        ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{goal.percentage.toFixed(1)}% complete</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Transactions */}
        {(expenses.length > 0 || investments.length > 0) && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
              <Link
                to="/budgeting"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {/* Show recent expenses */}
              {expenses.slice(0, 3).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-600">{expense.category} • {expense.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">-₹{expense.amount.toLocaleString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      expense.type === 'need' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expense.type}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Show recent investments */}
              {investments.slice(0, 2).map((investment) => (
                <div key={investment.id} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{investment.type}</p>
                    <p className="text-sm text-gray-600">{investment.platform} • {investment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">+₹{investment.amount.toLocaleString()}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                      investment
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/budgeting"
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <Edit3 className="h-8 w-8 text-blue-600 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Manage Budget</h4>
            <p className="text-gray-600 text-sm mb-4">Track expenses and manage your monthly budget</p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Go to Budgeting <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link
            to="/sip-calculator"
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <Calculator className="h-8 w-8 text-green-600 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Plan Investment</h4>
            <p className="text-gray-600 text-sm mb-4">Calculate SIP returns and plan your investments</p>
            <div className="flex items-center text-green-600 text-sm font-medium">
              Use Calculator <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>

          <Link
            to="/settings"
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <Target className="h-8 w-8 text-purple-600 mb-4" />
            <h4 className="font-bold text-gray-900 mb-2">Update Profile</h4>
            <p className="text-gray-600 text-sm mb-4">Manage goals and update your financial information</p>
            <div className="flex items-center text-purple-600 text-sm font-medium">
              Go to Settings <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;