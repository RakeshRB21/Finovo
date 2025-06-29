import React from 'react';
import { Wallet, PiggyBank, CreditCard, Umbrella } from 'lucide-react';

const PersonalFinance: React.FC = () => {
  const concepts = [
    {
      icon: Wallet,
      title: 'Monthly Budgeting',
      description: 'Create and maintain a budget using the 50/30/20 rule - 50% needs, 30% wants, 20% savings.',
      tips: [
        'Track all income and expenses',
        'Use budgeting apps like YNAB or Mint',
        'Review and adjust monthly',
        'Automate savings transfers'
      ]
    },
    {
      icon: PiggyBank,
      title: 'Emergency Fund',
      description: 'Build 6-12 months of expenses in liquid savings for unexpected situations.',
      tips: [
        'Start with ₹1,000 as initial goal',
        'Keep in high-yield savings account',
        'Gradually build to 6 months expenses',
        'Only use for true emergencies'
      ]
    },
    {
      icon: CreditCard,
      title: 'Debt Management',
      description: 'Strategically pay off debts using avalanche or snowball methods.',
      tips: [
        'List all debts with interest rates',
        'Pay minimums on all debts',
        'Focus extra payments on highest interest',
        'Consider debt consolidation if beneficial'
      ]
    },
    {
      icon: Umbrella,
      title: 'Insurance Planning',
      description: 'Protect your financial future with adequate life and health insurance coverage.',
      tips: [
        'Term life insurance: 10-12x annual income',
        'Health insurance: family floater plans',
        'Consider disability insurance',
        'Review coverage annually'
      ]
    }
  ];

  return (
    <section id="personal-finance" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Personal Finance Fundamentals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the building blocks of financial success. These core concepts form the 
            foundation of all wealth-building strategies.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">The Financial Foundation</h3>
            <p className="text-lg text-gray-600 mb-6">
              Before investing in stocks or mutual funds, establish a solid financial foundation. 
              This includes having a budget, emergency fund, and proper insurance coverage.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Indian Context:</h4>
              <ul className="space-y-2 text-blue-800">
                <li>• Average household savings rate in India: 20-30%</li>
                <li>• PPF (Public Provident Fund) offers tax benefits</li>
                <li>• Section 80C allows ₹1.5 lakh tax deduction</li>
                <li>• Health insurance is crucial due to rising medical costs</li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">Monthly Financial Checklist</h4>
            <div className="space-y-4">
              {[
                'Review and categorize all expenses',
                'Check progress on savings goals',
                'Pay all bills on time to avoid late fees',
                'Review credit card statements',
                'Update emergency fund if needed',
                'Review insurance coverage annually'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{concept.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{concept.description}</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Key Actions:</h4>
                  {concept.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PersonalFinance;