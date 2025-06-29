import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PersonalFinancePage from './pages/PersonalFinancePage';
import InvestingPage from './pages/InvestingPage';
import StockMarketPage from './pages/StockMarketPage';
import SharesBondsPage from './pages/SharesBondsPage';
import BudgetingTool from './pages/BudgetingTool';
import SIPCalculator from './pages/SIPCalculator';
import FinancialTools from './pages/FinancialTools';
import ProfileSetup from './pages/ProfileSetup';
import UserSettings from './pages/UserSettings';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Routes with navigation */}
            <Route path="/*" element={
              <>
                <Navigation />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/personal-finance" element={<PersonalFinancePage />} />
                    <Route path="/investing" element={<InvestingPage />} />
                    <Route path="/stock-market" element={<StockMarketPage />} />
                    <Route path="/shares-bonds" element={<SharesBondsPage />} />
                    <Route path="/sip-calculator" element={<SIPCalculator />} />
                    <Route path="/tools" element={<FinancialTools />} />
                    
                    {/* Protected routes */}
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/budgeting" element={
                      <ProtectedRoute>
                        <BudgetingTool />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile-setup" element={
                      <ProtectedRoute>
                        <ProfileSetup />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <UserSettings />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;