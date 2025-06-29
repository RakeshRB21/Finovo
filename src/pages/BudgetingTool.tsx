import React, { useState, useEffect } from 'react';
import { Plus, Trash2, PieChart, TrendingUp, AlertCircle, Edit3, Calendar } from 'lucide-react';
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

const BudgetingTool: React.FC = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'need' as 'need' | 'want' | 'savings'
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Others'
  ];

  const investmentCategories = [
    'Mutual Funds',
    'Stocks',
    'Fixed Deposits',
    'PPF',
    'ELSS',
    'Gold',
    'Real Estate',
    'Others'
  ];

  useEffect(() => {
    if (user) {
      loadExpenses();
      loadInvestments();
    }
  }, [user]);

  const loadExpenses = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .neq('type', 'savings') // Exclude savings from expenses
        .order('date', { ascending: false });

      if (error) {
        console.error('Error loading expenses:', error);
      } else {
        setExpenses(data || []);
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadInvestments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error loading investments:', error);
      } else {
        setInvestments(data || []);
      }
    } catch (error) {
      console.error('Error loading investments:', error);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newExpense.category || !newExpense.amount || !newExpense.description) return;

    try {
      if (newExpense.type === 'savings') {
        // Add to investments table
        const { error } = await supabase
          .from('investments')
          .insert({
            user_id: user.id,
            type: newExpense.category,
            amount: parseFloat(newExpense.amount),
            current_value: parseFloat(newExpense.amount),
            returns: 0,
            date: newExpense.date,
            platform: newExpense.description
          });

        if (error) {
          console.error('Error adding investment:', error);
          alert('Error adding investment');
        } else {
          setNewExpense({
            category: '',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            type: 'need'
          });
          loadInvestments();
        }
      } else {
        // Add to expenses table
        const { error } = await supabase
          .from('expenses')
          .insert({
            user_id: user.id,
            category: newExpense.category,
            amount: parseFloat(newExpense.amount),
            description: newExpense.description,
            date: newExpense.date,
            type: newExpense.type
          });

        if (error) {
          console.error('Error adding expense:', error);
          alert('Error adding expense');
        } else {
          setNewExpense({
            category: '',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            type: 'need'
          });
          loadExpenses();
        }
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error deleting expense:', error);
        alert('Error deleting expense');
      } else {
        loadExpenses();
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleDeleteInvestment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('investments')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error deleting investment:', error);
        alert('Error deleting investment');
      } else {
        loadInvestments();
      }
    } catch (error) {
      console.error('Error deleting investment:', error);
    }
  };

  const updateExpenseType = async (id: string, type: 'need' | 'want' | 'savings') => {
    try {
      const { error } = await supabase
        .from('expenses')
        .update({ type })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error updating expense:', error);
      } else {
        loadExpenses();
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  if (!user) {
    return <div className="p-8">Please log in to view your budget tracker.</div>;
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

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalInvestments = investments.reduce((sum, investment) => sum + investment.amount, 0);
  const remainingBudget = (user.monthlyIncome || 0) - totalExpenses;
  const budgetUtilization = user.monthlyIncome ? ((totalExpenses / user.monthlyIncome) * 100).toFixed(1) : 0;

  // Category-wise breakdown
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // Type-wise breakdown (needs/wants only, savings tracked separately)
  const typeTotals = expenses.reduce((acc, expense) => {
    acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  // 50/30/20 rule calculations
  const needs = user.monthlyIncome ? user.monthlyIncome * 0.5 : 0;
  const wants = user.monthlyIncome ? user.monthlyIncome * 0.3 : 0;
  const savings = user.monthlyIncome ? user.monthlyIncome * 0.2 : 0;

  // Current month expenses
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthExpenses = expenses.filter(expense => 
    expense.date.startsWith(currentMonth)
  );
  const currentMonthTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Budget & Investment Tracker</h1>
          <p className="text-gray-600 mt-2">Track your expenses and investments separately for better financial management</p>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-2xl font-bold text-green-600">₹{(user.monthlyIncome || 0).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">₹{currentMonthTotal.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{currentMonthExpenses.length} transactions</p>
              </div>
              <PieChart className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Investments</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalInvestments.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{investments.length} investments</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Budget</p>
                <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{remainingBudget.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {remainingBudget >= 0 ? 'Available to spend' : 'Over budget'}
                </p>
              </div>
              <AlertCircle className={`h-8 w-8 ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Transaction Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Add New Transaction</h3>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <select
                  value={newExpense.type}
                  onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value as 'need' | 'want' | 'savings' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="need">Expense (Need)</option>
                  <option value="want">Expense (Want)</option>
                  <option value="savings">Investment/Savings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {newExpense.type === 'savings' ? 
                    investmentCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    )) :
                    categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {newExpense.type === 'savings' ? 'Platform/Details' : 'Description'}
                </label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={newExpense.type === 'savings' ? 'Platform or investment details' : 'What did you spend on?'}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add {newExpense.type === 'savings' ? 'Investment' : 'Expense'}
              </button>
            </form>
          </div>

          {/* 50/30/20 Rule Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">50/30/20 Budget Analysis</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900">50% - Needs</h4>
                  <span className="text-sm text-gray-600">₹{needs.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Essential expenses like rent, groceries, utilities</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min((typeTotals.need || 0) / needs * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Spent: ₹{(typeTotals.need || 0).toLocaleString()} ({((typeTotals.need || 0) / needs * 100).toFixed(1)}%)
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900">30% - Wants</h4>
                  <span className="text-sm text-gray-600">₹{wants.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Entertainment, dining out, hobbies</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${Math.min((typeTotals.want || 0) / wants * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Spent: ₹{(typeTotals.want || 0).toLocaleString()} ({((typeTotals.want || 0) / wants * 100).toFixed(1)}%)
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900">20% - Savings</h4>
                  <span className="text-sm text-gray-600">₹{savings.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Emergency fund, investments, debt repayment</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${Math.min(totalInvestments / savings * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Invested: ₹{totalInvestments.toLocaleString()} ({(totalInvestments / savings * 100).toFixed(1)}%)
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Your Current Status:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Expenses:</span>
                  <span className="font-semibold">₹{totalExpenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Investments:</span>
                  <span className="font-semibold text-blue-600">₹{totalInvestments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Budget:</span>
                  <span className={`font-semibold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{remainingBudget.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investments List */}
        {investments.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Your Investments</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Platform</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Current Value</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Returns</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.slice(0, 10).map((investment) => (
                    <tr key={investment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(investment.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {investment.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{investment.platform}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">₹{investment.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 font-semibold text-blue-600">₹{investment.current_value.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {investment.returns >= 0 ? '+' : ''}₹{investment.returns.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteInvestment(investment.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Expense List */}
        {expenses.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Expenses</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.slice(0, 10).map((expense) => (
                    <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(expense.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{expense.description}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">₹{expense.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <select
                          value={expense.type}
                          onChange={(e) => updateExpenseType(expense.id, e.target.value as 'need' | 'want' | 'savings')}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${
                            expense.type === 'need' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <option value="need">Need</option>
                          <option value="want">Want</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        {Object.keys(categoryTotals).length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Expense Category Breakdown</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryTotals)
                .sort(([,a], [,b]) => b - a)
                .map(([category, amount]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{category}</h4>
                  <p className="text-2xl font-bold text-blue-600">₹{amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">
                    {((amount / totalExpenses) * 100).toFixed(1)}% of total expenses
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetingTool;