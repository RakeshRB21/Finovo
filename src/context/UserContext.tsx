import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  monthlyIncome: number;
  currentSavings: number;
  financialGoals: FinancialGoal[];
  riskTolerance: 'low' | 'medium' | 'high';
  investmentExperience: 'beginner' | 'intermediate' | 'advanced';
  employmentType: 'salaried' | 'business' | 'freelancer' | 'student';
  dependents: number;
  hasHealthInsurance: boolean;
  hasLifeInsurance: boolean;
  monthlyExpenseTarget: number;
  emergencyFundTarget: number;
}

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  category: 'home' | 'car' | 'education' | 'wedding' | 'retirement' | 'travel' | 'emergency' | 'other';
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  investments: Investment[];
  setInvestments: (investments: Investment[]) => void;
  isProfileComplete: boolean;
}

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
  currentValue: number;
  returns: number;
  date: string;
  platform: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('finlit-user', JSON.stringify(updatedUser));
    }
  };

  const isProfileComplete = user ? 
    user.monthlyIncome > 0 && 
    user.age > 0 && 
    user.monthlyExpenseTarget > 0 &&
    user.emergencyFundTarget > 0 : false;

  useEffect(() => {
    // Load user data from localStorage
    const savedUser = localStorage.getItem('finlit-user');
    const savedExpenses = localStorage.getItem('finlit-expenses');
    const savedInvestments = localStorage.getItem('finlit-investments');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    if (savedInvestments) {
      setInvestments(JSON.parse(savedInvestments));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('finlit-user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('finlit-expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('finlit-investments', JSON.stringify(investments));
  }, [investments]);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      updateUser, 
      expenses, 
      setExpenses, 
      investments, 
      setInvestments,
      isProfileComplete 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};