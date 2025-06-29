import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, TrendingUp, User, Home, BarChart3, Calculator, Settings, AlertCircle, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isProfileComplete, signOut } = useAuth();
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3, protected: true },
    { path: '/personal-finance', label: 'Personal Finance', icon: null },
    { path: '/investing', label: 'Investing', icon: null },
    { path: '/stock-market', label: 'Stock Market', icon: null },
    { path: '/shares-bonds', label: 'Shares & Bonds', icon: null },
    { path: '/tools', label: 'Tools', icon: Calculator },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isProfileOpen]);

  // Close dropdown when route changes
  useEffect(() => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    if (isSigningOut) return; // Prevent multiple clicks
    
    setIsSigningOut(true);
    setIsProfileOpen(false);
    
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const profileMenuItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/profile-setup', label: 'Complete Profile', icon: AlertCircle, condition: !isProfileComplete },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left: Logo */}
          <div className="flex items-center space-x-4 flex-grow">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-7 w-7 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Finovo</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 ml-6">
              {navItems.map((item) => {
                if (item.protected && !user) return null;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 hover:text-blue-600 px-4 py-2 rounded-lg ${
                      location.pathname === item.path ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Desktop User Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {!isProfileComplete && (
                  <Link
                    to="/profile-setup"
                    className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <span>Complete Profile</span>
                  </Link>
                )}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                    disabled={isSigningOut}
                  >
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      {profileMenuItems.map((item) => {
                        if (item.condition === false) return null;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleSignOut}
                          disabled={isSigningOut}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => {
                if (item.protected && !user) return null;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 text-base font-medium transition-colors duration-200 hover:text-blue-600 rounded-lg ${
                      location.pathname === item.path ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  {!isProfileComplete && (
                    <Link
                      to="/profile-setup"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-3 py-2 bg-orange-100 text-orange-800 rounded-lg mb-2"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <span>Complete Profile</span>
                    </Link>
                  )}

                  <div className="flex items-center space-x-3 px-3 py-2 bg-gray-100 rounded-lg mb-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/settings"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-blue-600 rounded-lg"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleSignOut();
                    }}
                    disabled={isSigningOut}
                    className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:text-red-800 rounded-lg mt-2 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-blue-600 rounded-lg font-medium">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-medium">
                    <User className="h-4 w-4" />
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;