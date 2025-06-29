import React from 'react';
import { Wallet, PiggyBank, CreditCard, Umbrella, ExternalLink, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';

const PersonalFinancePage: React.FC = () => {
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
      ],
      resources: [
        { title: 'Budget Planning Guide', url: 'https://www.investopedia.com/articles/personal-finance/121514/how-budget-money.asp' },
        { title: '50/30/20 Rule Explained', url: 'https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator' }
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
      ],
      resources: [
        { title: 'Emergency Fund Calculator', url: 'https://www.calculator.net/emergency-fund-calculator.html' },
        { title: 'Best Savings Accounts in India', url: 'https://www.bankbazaar.com/savings-account.html' }
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
      ],
      resources: [
        { title: 'Debt Avalanche vs Snowball', url: 'https://www.investopedia.com/articles/personal-finance/080716/debt-avalanche-vs-debt-snowball-which-best-you.asp' },
        { title: 'Credit Card Debt Management', url: 'https://www.moneycontrol.com/news/business/personal-finance/credit-card-debt-management-tips-2456789.html' }
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
      ],
      resources: [
        { title: 'Life Insurance Calculator', url: 'https://www.policybazaar.com/life-insurance/calculator/' },
        { title: 'Health Insurance Guide', url: 'https://www.coverfox.com/health-insurance/articles/health-insurance-guide/' }
      ]
    }
  ];

  const indianContext = [
    {
      title: 'Tax-Saving Investments',
      description: 'Section 80C allows ₹1.5 lakh tax deduction annually',
      options: ['PPF (Public Provident Fund)', 'ELSS Mutual Funds', 'NSC (National Savings Certificate)', 'Tax-saving FDs']
    },
    {
      title: 'Government Schemes',
      description: 'Take advantage of government-backed savings schemes',
      options: ['Sukanya Samriddhi Yojana', 'Atal Pension Yojana', 'Pradhan Mantri Vaya Vandana Yojana', 'Senior Citizens Savings Scheme']
    },
    {
      title: 'Banking Benefits',
      description: 'Maximize benefits from Indian banking system',
      options: ['Zero-balance savings accounts', 'UPI and digital payments', 'Fixed deposits and recurring deposits', 'Sweep-in facilities']
    }
  ];

  const ageSpecificTips = [
    {
      age: '21-25',
      title: 'Building Foundation',
      tips: [
        'Start with a basic savings account',
        'Build emergency fund of ₹50,000-₹1,00,000',
        'Get health insurance (₹5-10 lakh cover)',
        'Start SIP with ₹1,000-₹2,000/month',
        'Learn about credit cards and build credit history'
      ]
    },
    {
      age: '26-30',
      title: 'Wealth Accumulation',
      tips: [
        'Increase emergency fund to 6 months expenses',
        'Get term life insurance (₹50 lakh - ₹1 crore)',
        'Increase SIP to ₹5,000-₹10,000/month',
        'Consider buying a home if financially ready',
        'Start planning for major life goals'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Personal Finance Fundamentals</h1>
            <p className="text-gray-600 mt-2">Master the building blocks of financial success with comprehensive guides and resources</p>
          </div>

          {/* Age-Specific Tips */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Age-Specific Financial Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ageSpecificTips.map((ageGroup, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">Age {ageGroup.age}</h3>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">{ageGroup.title}</h4>
                  <ul className="space-y-2">
                    {ageGroup.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Core Concepts */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Personal Finance Concepts</h2>
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
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Actions:</h4>
                        {concept.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start mb-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Learn More:</h4>
                        {concept.resources.map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-blue-600 hover:text-blue-800 text-sm mb-2 transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Indian Context */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Indian Financial Context</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {indianContext.map((context, index) => (
                <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{context.title}</h3>
                  <p className="text-gray-700 mb-4 text-sm">{context.description}</p>
                  <ul className="space-y-2">
                    {context.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></div>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Health Checklist */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Health Checklist</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-4">✅ Monthly Must-Dos</h3>
                <ul className="space-y-3">
                  {[
                    'Review and categorize all expenses',
                    'Check progress on savings goals',
                    'Pay all bills on time to avoid late fees',
                    'Review credit card statements',
                    'Update emergency fund if needed',
                    'Track investment performance'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">📊 Annual Reviews</h3>
                <ul className="space-y-3">
                  {[
                    'Review insurance coverage and beneficiaries',
                    'Rebalance investment portfolio',
                    'Update financial goals and timelines',
                    'Tax planning and optimization',
                    'Estate planning and will updates',
                    'Salary negotiation and career planning'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-sm">📅</span>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* External Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Additional Learning Resources</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Personal Finance Books',
                  resources: [
                    { name: 'Rich Dad Poor Dad - Robert Kiyosaki', url: 'https://www.amazon.in/Rich-Dad-Poor-Robert-Kiyosaki/dp/1612680194' },
                    { name: 'The Richest Man in Babylon', url: 'https://www.amazon.in/Richest-Man-Babylon-George-Clason/dp/0451205367' },
                    { name: 'Let\'s Talk Money - Monika Halan', url: 'https://www.amazon.in/Lets-Talk-Money-Monika-Halan/dp/9352779738' }
                  ]
                },
                {
                  title: 'Financial Calculators',
                  resources: [
                    { name: 'SIP Calculator', url: 'https://www.amfiindia.com/investor-corner/online-center/sip-calculator' },
                    { name: 'EMI Calculator', url: 'https://emicalculator.net/' },
                    { name: 'Tax Calculator', url: 'https://cleartax.in/s/income-tax-calculator' }
                  ]
                },
                {
                  title: 'Financial News & Analysis',
                  resources: [
                    { name: 'Moneycontrol', url: 'https://www.moneycontrol.com/' },
                    { name: 'Economic Times', url: 'https://economictimes.indiatimes.com/' },
                    { name: 'Mint', url: 'https://www.livemint.com/' }
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

export default PersonalFinancePage;