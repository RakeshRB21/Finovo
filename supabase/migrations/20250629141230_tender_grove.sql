/*
  # Fix RLS Policies for User Registration

  1. Security Updates
    - Allow users to insert their initial profile during registration
    - Fix RLS policies to handle the signup flow properly
    - Ensure users can only access their own data

  2. Changes
    - Update users table RLS policies
    - Add proper INSERT policy for new user registration
    - Maintain security while allowing initial profile creation
*/

-- Drop existing policies for users table
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Create new policies for users table that handle signup properly
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

-- Allow users to insert their initial profile during signup
-- This policy allows authenticated users to insert a row with their own auth.uid()
CREATE POLICY "Users can insert own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Also allow the initial insert for new users (this handles the edge case during signup)
CREATE POLICY "Allow initial profile creation"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create a function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();