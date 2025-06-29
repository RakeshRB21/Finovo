/*
  # Create users table and related tables

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `age` (integer)
      - `monthly_income` (numeric)
      - `current_savings` (numeric)
      - `risk_tolerance` (enum: low, medium, high)
      - `investment_experience` (enum: beginner, intermediate, advanced)
      - `employment_type` (enum: salaried, business, freelancer, student)
      - `dependents` (integer)
      - `has_health_insurance` (boolean)
      - `has_life_insurance` (boolean)
      - `monthly_expense_target` (numeric)
      - `emergency_fund_target` (numeric)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `financial_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `name` (text)
      - `target_amount` (numeric)
      - `current_amount` (numeric)
      - `target_date` (date)
      - `priority` (enum: high, medium, low)
      - `category` (enum: home, car, education, wedding, retirement, travel, emergency, other)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `expenses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `category` (text)
      - `amount` (numeric)
      - `description` (text)
      - `date` (date)
      - `type` (enum: need, want, savings)
      - `created_at` (timestamp)

    - `investments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `type` (text)
      - `amount` (numeric)
      - `current_value` (numeric)
      - `returns` (numeric)
      - `date` (date)
      - `platform` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create custom types
CREATE TYPE risk_tolerance_type AS ENUM ('low', 'medium', 'high');
CREATE TYPE investment_experience_type AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE employment_type AS ENUM ('salaried', 'business', 'freelancer', 'student');
CREATE TYPE goal_priority_type AS ENUM ('high', 'medium', 'low');
CREATE TYPE goal_category_type AS ENUM ('home', 'car', 'education', 'wedding', 'retirement', 'travel', 'emergency', 'other');
CREATE TYPE expense_type AS ENUM ('need', 'want', 'savings');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  age integer,
  monthly_income numeric,
  current_savings numeric,
  risk_tolerance risk_tolerance_type,
  investment_experience investment_experience_type,
  employment_type employment_type,
  dependents integer DEFAULT 0,
  has_health_insurance boolean,
  has_life_insurance boolean,
  monthly_expense_target numeric,
  emergency_fund_target numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create financial_goals table
CREATE TABLE IF NOT EXISTS financial_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  target_amount numeric NOT NULL,
  current_amount numeric DEFAULT 0,
  target_date date NOT NULL,
  priority goal_priority_type DEFAULT 'medium',
  category goal_category_type DEFAULT 'other',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  amount numeric NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  type expense_type DEFAULT 'need',
  created_at timestamptz DEFAULT now()
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  amount numeric NOT NULL,
  current_value numeric NOT NULL,
  returns numeric NOT NULL,
  date date NOT NULL,
  platform text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for financial_goals table
CREATE POLICY "Users can read own goals"
  ON financial_goals
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON financial_goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON financial_goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON financial_goals
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for expenses table
CREATE POLICY "Users can read own expenses"
  ON expenses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own expenses"
  ON expenses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own expenses"
  ON expenses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own expenses"
  ON expenses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for investments table
CREATE POLICY "Users can read own investments"
  ON investments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own investments"
  ON investments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own investments"
  ON investments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own investments"
  ON investments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_goals_updated_at
  BEFORE UPDATE ON financial_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();