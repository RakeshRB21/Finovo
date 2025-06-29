import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  age: number | null;
  monthlyIncome: number | null;
  currentSavings: number | null;
  riskTolerance: 'low' | 'medium' | 'high' | null;
  investmentExperience: 'beginner' | 'intermediate' | 'advanced' | null;
  employmentType: 'salaried' | 'business' | 'freelancer' | 'student' | null;
  dependents: number | null;
  hasHealthInsurance: boolean | null;
  hasLifeInsurance: boolean | null;
  monthlyExpenseTarget: number | null;
  emergencyFundTarget: number | null;
  financialGoals: FinancialGoal[];
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

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string; needsConfirmation?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<AuthUser>) => Promise<{ error?: string }>;
  isProfileComplete: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isProfileComplete = user ? 
    user.monthlyIncome !== null && 
    user.age !== null && 
    user.monthlyExpenseTarget !== null &&
    user.emergencyFundTarget !== null : false;

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user profile with retry logic for new users
      let profile = null;
      let retries = 0;
      const maxRetries = 5;

      while (!profile && retries < maxRetries) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading profile:', error);
          if (retries === maxRetries - 1) {
            setLoading(false);
            return;
          }
        } else if (data) {
          profile = data;
          break;
        }

        retries++;
        if (retries < maxRetries) {
          // Wait a bit before retrying (for new user profile creation)
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
      }

      // If still no profile after retries, create one manually
      if (!profile) {
        console.log('Creating profile manually for user:', supabaseUser.id);
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert({
            id: supabaseUser.id,
            email: supabaseUser.email || '',
            name: supabaseUser.user_metadata?.name || ''
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating profile manually:', createError);
          setLoading(false);
          return;
        }
        profile = newProfile;
      }

      // Get financial goals
      const { data: goals, error: goalsError } = await supabase
        .from('financial_goals')
        .select('*')
        .eq('user_id', supabaseUser.id);

      if (goalsError) {
        console.error('Error loading goals:', goalsError);
      }

      const authUser: AuthUser = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: profile?.name || '',
        age: profile?.age || null,
        monthlyIncome: profile?.monthly_income || null,
        currentSavings: profile?.current_savings || null,
        riskTolerance: profile?.risk_tolerance || null,
        investmentExperience: profile?.investment_experience || null,
        employmentType: profile?.employment_type || null,
        dependents: profile?.dependents || null,
        hasHealthInsurance: profile?.has_health_insurance || null,
        hasLifeInsurance: profile?.has_life_insurance || null,
        monthlyExpenseTarget: profile?.monthly_expense_target || null,
        emergencyFundTarget: profile?.emergency_fund_target || null,
        financialGoals: goals?.map(goal => ({
          id: goal.id,
          name: goal.name,
          targetAmount: goal.target_amount,
          currentAmount: goal.current_amount,
          targetDate: goal.target_date,
          priority: goal.priority,
          category: goal.category
        })) || []
      };

      setUser(authUser);
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Sign up without email confirmation
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name
          }
        }
      });

      if (error) {
        return { error: error.message };
      }

      // Check if user was created successfully
      if (data.user && data.session) {
        // User is immediately signed in, no email confirmation needed
        return {};
      } else if (data.user && !data.session) {
        // This shouldn't happen with email confirmation disabled, but handle it
        return { 
          error: 'Account created but please try signing in directly.', 
          needsConfirmation: false 
        };
      }

      return {};
    } catch (error) {
      console.error('Signup error:', error);
      return { error: 'An unexpected error occurred during signup' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes('Invalid login credentials')) {
          return { error: 'Invalid email or password. Please check your credentials and try again.' };
        }
        if (error.message.includes('Email not confirmed')) {
          return { error: 'Please verify your email address before signing in.' };
        }
        return { error: error.message };
      }

      return {};
    } catch (error) {
      console.error('Signin error:', error);
      return { error: 'An unexpected error occurred during signin' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<AuthUser>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      // Update user profile
      const profileUpdates: any = {};
      if (updates.name !== undefined) profileUpdates.name = updates.name;
      if (updates.age !== undefined) profileUpdates.age = updates.age;
      if (updates.monthlyIncome !== undefined) profileUpdates.monthly_income = updates.monthlyIncome;
      if (updates.currentSavings !== undefined) profileUpdates.current_savings = updates.currentSavings;
      if (updates.riskTolerance !== undefined) profileUpdates.risk_tolerance = updates.riskTolerance;
      if (updates.investmentExperience !== undefined) profileUpdates.investment_experience = updates.investmentExperience;
      if (updates.employmentType !== undefined) profileUpdates.employment_type = updates.employmentType;
      if (updates.dependents !== undefined) profileUpdates.dependents = updates.dependents;
      if (updates.hasHealthInsurance !== undefined) profileUpdates.has_health_insurance = updates.hasHealthInsurance;
      if (updates.hasLifeInsurance !== undefined) profileUpdates.has_life_insurance = updates.hasLifeInsurance;
      if (updates.monthlyExpenseTarget !== undefined) profileUpdates.monthly_expense_target = updates.monthlyExpenseTarget;
      if (updates.emergencyFundTarget !== undefined) profileUpdates.emergency_fund_target = updates.emergencyFundTarget;

      if (Object.keys(profileUpdates).length > 0) {
        profileUpdates.updated_at = new Date().toISOString();
        
        const { error: profileError } = await supabase
          .from('users')
          .update(profileUpdates)
          .eq('id', user.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
          return { error: 'Failed to update profile' };
        }
      }

      // Update financial goals if provided
      if (updates.financialGoals) {
        // Delete existing goals
        await supabase
          .from('financial_goals')
          .delete()
          .eq('user_id', user.id);

        // Insert new goals
        if (updates.financialGoals.length > 0) {
          const goalsToInsert = updates.financialGoals.map(goal => ({
            user_id: user.id,
            name: goal.name,
            target_amount: goal.targetAmount,
            current_amount: goal.currentAmount,
            target_date: goal.targetDate,
            priority: goal.priority,
            category: goal.category
          }));

          const { error: goalsError } = await supabase
            .from('financial_goals')
            .insert(goalsToInsert);

          if (goalsError) {
            console.error('Error updating goals:', goalsError);
            return { error: 'Failed to update financial goals' };
          }
        }
      }

      // Update local state
      setUser(prev => prev ? { ...prev, ...updates } : null);
      return {};
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error: 'An unexpected error occurred' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      isProfileComplete
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};