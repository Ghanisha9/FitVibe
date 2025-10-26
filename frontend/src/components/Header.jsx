import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Dumbbell, Calculator, Leaf, Music, Tag, ShoppingCart, UserCircle, LogIn, LogOut, Menu, X, Bot, Gamepad } from 'lucide-react'; // Added Bot and Gamepad
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // To get cart count

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

  // Close profile dropdown if clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setIsProfileDropdownOpen(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", icon: <Home size={18} />, text: "HOME" },
    { to: "/exercises", icon: <Dumbbell size={18} />, text: "EXERCISES" }, // Link to exercises.html equivalent
    { to: "/bmi", icon: <Calculator size={18} />, text: "BMI" },
    { to: "/yoga", icon: <Leaf size={18} />, text: "YOGA" },
    { to: "/zumba", icon: <Music size={18} />, text: "ZUMBA" },
    { to: "/shop", icon: <Tag size={18} />, text: "SHOP" }, // Added Shop link if needed
    // Add other links like Pricing if you have a page for it
  ];

  const profileLinks = [
    { to: "/profile", icon: <UserCircle size={18} />, text: "Profile" },
    { to: "/workout-ai", icon: <Bot size={18} />, text: "AI Trainer" }, // Link to workoutplanaichatbot.html
    { to: "/game", icon: <Gamepad size={18} />, text: "Game" }, // Link to game.html
    // Add other profile-related links here
  ];

  return (
    // Styles adapted from fitvibe.html header
    <header className="bg-black/95 backdrop-blur-xl sticky top-0 z-40 border-b border-purple-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            FitVibe
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} icon={link.icon} text={link.text} />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative text-purple-300 hover:text-purple-100 transition-colors p-2 rounded-full hover:bg-purple-500/10">
                  <ShoppingCart size={22} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                {/* Profile Dropdown */}
                <div className="relative">
                  <button onClick={toggleProfileDropdown} className={`p-2 rounded-full transition-colors ${userIcon.classList.add('logged-in') ? 'text-green-400 hover:text-green-300' : 'text-purple-300 hover:text-purple-100'} hover:bg-purple-500/10`}>
                    <UserCircle size={24} />
                  </button>
                  {isProfileDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-gray-900 border border-purple-500/30 rounded-lg shadow-lg py-1 z-50 animate-dropdown"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                      <div className="px-4 py-2 text-sm text-purple-300 border-b border-purple-500/20">
                        Hi, {user?.firstName || 'User'}!
                      </div>
                      {profileLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-purple-500/20 hover:text-purple-100"
                          onClick={() => setIsProfileDropdownOpen(false)} // Close on click
                        >
                          {link.icon} {link.text}
                        </Link>
                      ))}
                      <button
                        onClick={() => { logout(); setIsProfileDropdownOpen(false); }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <LogOut size={18} /> Logout
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
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-purple-300 hover:text-purple-100 p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-purple-500/20 py-4 px-4 shadow-xl animate-slide-down">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <MobileNavLink key={link.to} to={link.to} icon={link.icon} text={link.text} onClick={closeMobileMenu} />
            ))}
            <hr className="border-purple-500/20 my-2" />
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/cart" icon={<ShoppingCart size={18} />} text={`Cart (${cartItemCount})`} onClick={closeMobileMenu} />
                <MobileNavLink to="/profile" icon={<UserCircle size={18} />} text="Profile" onClick={closeMobileMenu} />
                <MobileNavLink to="/workout-ai" icon={<Bot size={18} />} text="AI Trainer" onClick={closeMobileMenu} />
                <MobileNavLink to="/game" icon={<Gamepad size={18} />} text="Game" onClick={closeMobileMenu} />
                <button
                  onClick={() => { logout(); closeMobileMenu(); }}
                  className="flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <MobileNavLink to="/login" icon={<LogIn size={18} />} text="Login / Sign Up" onClick={closeMobileMenu} />
            )}
          </nav>
        </div>
      )}

      {/* Add keyframes for animations if not using Tailwind's built-in */}
      <style jsx global>{`
        @keyframes dropdownSlide {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-dropdown { animation: dropdownSlide 0.2s ease-out forwards; }

        @keyframes slide-down {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }
      `}</style>
    </header>
  );
};

// Helper components for Nav Links (similar to your previous code)
const NavLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 hover:text-purple-300 transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
  >
    {icon} {text}
  </Link>
);

const MobileNavLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-2 text-base font-medium rounded-md text-gray-200 hover:bg-purple-500/10 hover:text-purple-100"
  >
    {icon} {text}
  </Link>
);

export default Header;