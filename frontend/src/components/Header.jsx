import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom'; // Use NavLink for active styling
import { Home, Dumbbell, Calculator, Leaf, Music, Tag, ShoppingCart, UserCircle, LogIn, LogOut, Menu, X, Bot, Gamepad } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleProfileDropdown = (e) => {
    e.stopPropagation(); // Prevent closing immediately if clicking icon
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = document.getElementById('profile-dropdown-menu');
      // Also check if the click target is the button that opens the dropdown
      const profileButton = document.getElementById('profile-button');
      if (dropdownElement && !dropdownElement.contains(event.target) && !profileButton?.contains(event.target) ) {
        setIsProfileDropdownOpen(false);
      }
    };
    if (isProfileDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    // Cleanup listener on component unmount or when dropdown closes
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileDropdownOpen]);


  // Navigation links data
  const navLinks = [
    { to: "/", icon: <Home size={16} />, text: "HOME" },
    { to: "/exercises", icon: <Dumbbell size={16} />, text: "EXERCISES" },
    { to: "/bmi", icon: <Calculator size={16} />, text: "BMI" },
    { to: "/yoga", icon: <Leaf size={16} />, text: "YOGA" },
    { to: "/zumba", icon: <Music size={16} />, text: "ZUMBA" },
    { to: "/shop", icon: <Tag size={16} />, text: "SHOP" },
    // { to: "/pricing", icon: <Tag size={16}/>, text: "PRICING" },
    { to: "/challenges", icon: <Tag size={16}/>, text: "Challenges" }, // Added Challenges Link
  ];

  // Profile dropdown links data
  const profileLinks = [
    { to: "/profile", icon: <UserCircle size={16} />, text: "Profile" },
    { to: "/workout-ai", icon: <Bot size={16} />, text: "AI Trainer" },
    { to: "/game", icon: <Gamepad size={16} />, text: "Game" },
  ];

  // Active NavLink style
  const activeClassName = "text-purple-300 border-b-2 border-purple-400";
  const inactiveClassName = "text-gray-300 hover:text-purple-300 transition-colors";

  return (
    <header className="bg-black/95 backdrop-blur-md sticky top-0 z-40 border-b border-purple-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity flex-shrink-0">
            FitVibe
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 ml-10 overflow-x-auto"> {/* Added overflow-x-auto for smaller screens if needed */}
            {navLinks.map((link) => (
              <RouterNavLink
                key={link.to}
                to={link.to}
                // Apply active/inactive classes based on NavLink's isActive prop
                className={({ isActive }) =>
                  `flex items-center gap-1.5 text-xs lg:text-sm font-semibold py-1 px-2 whitespace-nowrap ${isActive ? activeClassName : inactiveClassName}`
                }
              >
                {link.icon} {link.text}
              </RouterNavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 ml-auto flex-shrink-0">
            {isAuthenticated ? (
              <>
                {/* Cart Icon */}
                <Link to="/cart" className="relative text-purple-300 hover:text-purple-100 transition-colors p-2 rounded-full hover:bg-purple-500/10" aria-label={`Shopping Cart with ${cartItemCount} items`}>
                  <ShoppingCart size={22} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                {/* Profile Dropdown */}
                <div className="relative">
                  {/* --- CORRECTED BUTTON --- */}
                  <button
                    id="profile-button" // Added ID for click outside logic
                    onClick={toggleProfileDropdown}
                    // Conditional styling based on isAuthenticated
                    className={`p-2 rounded-full transition-colors ${isAuthenticated ? 'text-green-400 hover:text-green-300' : 'text-purple-300 hover:text-purple-100'} hover:bg-purple-500/10`}
                  >
                    <UserCircle size={24} />
                  </button>
                  {/* --- END CORRECTION --- */}
                  {isProfileDropdownOpen && (
                    <div
                      id="profile-dropdown-menu" // Added ID for click outside logic
                      className="absolute right-0 mt-2 w-48 bg-gray-900 border border-purple-500/30 rounded-lg shadow-lg py-1 z-50 animate-dropdown"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                      <div className="px-4 py-2 text-sm text-purple-300 border-b border-purple-500/20 truncate"> {/* Added truncate */}
                        Hi, {user?.firstName || 'User'}!
                      </div>
                      {profileLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-purple-500/20 hover:text-purple-100 transition-colors"
                          onClick={() => setIsProfileDropdownOpen(false)} // Close on click
                        >
                          {link.icon} {link.text}
                        </Link>
                      ))}
                      <button
                        onClick={() => { logout(); setIsProfileDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md hover:shadow-lg">
                <LogIn size={16} /> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
              {/* Show cart icon on mobile too when logged in */}
              {isAuthenticated && (
                   <Link to="/cart" className="relative text-purple-300 hover:text-purple-100 transition-colors p-2 rounded-full hover:bg-purple-500/10" aria-label={`Shopping Cart with ${cartItemCount} items`}>
                      <ShoppingCart size={22} />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
              )}
            <button onClick={toggleMobileMenu} className="text-purple-300 hover:text-purple-100 p-2" aria-label="Toggle Menu">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-purple-500/20 py-4 px-4 shadow-xl animate-slide-down z-30"> {/* Ensure z-index */}
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
               <RouterNavLink
                  key={'mobile-' + link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md ${isActive ? 'bg-purple-500/20 text-purple-100' : 'text-gray-200 hover:bg-purple-500/10 hover:text-purple-100'}`
                  }
               >
                 {link.icon} {link.text}
               </RouterNavLink>
            ))}
            <hr className="border-purple-500/20 my-2" />
            {isAuthenticated ? (
              <>
                {/* Mobile profile links */}
                {profileLinks.map((link) => (
                    <RouterNavLink
                        key={'mobile-' + link.to}
                        to={link.to}
                        onClick={closeMobileMenu}
                         className={({ isActive }) =>
                           `flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md ${isActive ? 'bg-purple-500/20 text-purple-100' : 'text-gray-200 hover:bg-purple-500/10 hover:text-purple-100'}`
                         }
                     >
                      {link.icon} {link.text}
                    </RouterNavLink>
                ))}
                <button
                  onClick={() => { logout(); closeMobileMenu(); }}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 w-full text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <RouterNavLink
                to="/login"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md ${isActive ? 'bg-purple-500/20 text-purple-100' : 'text-gray-200 hover:bg-purple-500/10 hover:text-purple-100'}`
                }
              >
                  <LogIn size={18} /> Login / Sign Up
               </RouterNavLink>
            )}
          </nav>
        </div>
      )}

      {/* Add keyframes for animations */}
      <style jsx global>{`
        @keyframes dropdownSlide {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-dropdown { animation: dropdownSlide 0.2s ease-out forwards; }

        @keyframes slide-down {
            from { opacity: 0; transform: translateY(-15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }
      `}</style>
    </header>
  );
};

export default Header;
