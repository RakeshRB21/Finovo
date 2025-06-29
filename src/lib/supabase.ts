import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          age: number | null;
          monthly_income: number | null;
          current_savings: number | null;
          risk_tolerance: 'low' | 'medium' | 'high' | null;
          investment_experience: 'beginner' | 'intermediate' | 'advanced' | null;
          employment_type: 'salaried' | 'business' | 'freelancer' | 'student' | null;
          dependents: number | null;
          has_health_insurance: boolean | null;
          has_life_insurance: boolean | null;
          monthly_expense_target: number | null;
          emergency_fund_target: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          age?: number | null;
          monthly_income?: number | null;
          current_savings?: number | null;
          risk_tolerance?: 'low' | 'medium' | 'high' | null;
          investment_experience?: 'beginner' | 'intermediate' | 'advanced' | null;
          employment_type?: 'salaried' | 'business' | 'freelancer' | 'student' | null;
          dependents?: number | null;
          has_health_insurance?: boolean | null;
          has_life_insurance?: boolean | null;
          monthly_expense_target?: number | null;
          emergency_fund_target?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          age?: number | null;
          monthly_income?: number | null;
          current_savings?: number | null;
          risk_tolerance?: 'low' | 'medium' | 'high' | null;
          investment_experience?: 'beginner' | 'intermediate' | 'advanced' | null;
          employment_type?: 'salaried' | 'business' | 'freelancer' | 'student' | null;
          dependents?: number | null;
          has_health_insurance?: boolean | null;
          has_life_insurance?: boolean | null;
          monthly_expense_target?: number | null;
          emergency_fund_target?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      financial_goals: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          target_amount: number;
          current_amount: number;
          target_date: string;
          priority: 'high' | 'medium' | 'low';
          category: 'home' | 'car' | 'education' | 'wedding' | 'retirement' | 'travel' | 'emergency' | 'other';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          target_amount: number;
          current_amount?: number;
          target_date: string;
          priority?: 'high' | 'medium' | 'low';
          category?: 'home' | 'car' | 'education' | 'wedding' | 'retirement' | 'travel' | 'emergency' | 'other';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          target_amount?: number;
          current_amount?: number;
          target_date?: string;
          priority?: 'high' | 'medium' | 'low';
          category?: 'home' | 'car' | 'education' | 'wedding' | 'retirement' | 'travel' | 'emergency' | 'other';
          created_at?: string;
          updated_at?: string;
        };
      };
      expenses: {
        Row: {
          id: string;
          user_id: string;
          category: string;
          amount: number;
          description: string;
          date: string;
          type: 'need' | 'want' | 'savings';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category: string;
          amount: number;
          description: string;
          date: string;
          type?: 'need' | 'want' | 'savings';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category?: string;
          amount?: number;
          description?: string;
          date?: string;
          type?: 'need' | 'want' | 'savings';
          created_at?: string;
        };
      };
      investments: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          amount: number;
          current_value: number;
          returns: number;
          date: string;
          platform: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          amount: number;
          current_value: number;
          returns: number;
          date: string;
          platform: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: string;
          amount?: number;
          current_value?: number;
          returns?: number;
          date?: string;
          platform?: string;
          created_at?: string;
        };
      };
    };
  };
};