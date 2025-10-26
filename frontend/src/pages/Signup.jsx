import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaUserPlus } from 'react-icons/fa'; // Using react-icons
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const { signup, loading } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        if (formData.password.length < 6) {
             showToast('Password must be at least 6 characters', 'error');
             return;
        }
        try {
            await signup(formData.firstName, formData.lastName, formData.email, formData.password);
            // AuthContext handles navigation on success
        } catch (error) {
            // Toast is shown in AuthContext
            console.error("Signup failed:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        // Applying styles inspired by login.html
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 flex items-center justify-center p-4 relative overflow-hidden animate-fadeIn">

            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-8 sm:p-10 z-10 animate-fadeInUp">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                        JOIN FITVIBE
                    </h1>
                    <p className="text-purple-300/80 text-sm">Create your account to start your journey.</p>
                </div>

                <form onSubmit={handleSignupSubmit} noValidate>
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                         <div className="relative">
                            <label htmlFor="firstName" className="block text-sm font-medium text-purple-200 mb-1">First Name</label>
                            <FaUser className="absolute left-3 top-10 text-purple-400 opacity-70" size={14} />
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Ada"
                                required
                                className="w-full pl-9 pr-4 py-3 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            />
                        </div>
                         <div className="relative">
                            <label htmlFor="lastName" className="block text-sm font-medium text-purple-200 mb-1">Last Name</label>
                             <FaUser className="absolute left-3 top-10 text-purple-400 opacity-70" size={14} />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Lovelace"
                                required
                                className="w-full pl-9 pr-4 py-3 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-5 relative">
                        <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-1">Email Address</label>
                         <FaEnvelope className="absolute left-3 top-10 text-purple-400 opacity-70" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-purple-200 mb-1">Password</label>
                         <FaLock className="absolute left-3 top-10 text-purple-400 opacity-70" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="•••••••• (min. 6 characters)"
                            required
                            minLength={6}
                            className="w-full pl-10 pr-10 py-3 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-9 text-purple-400 hover:text-purple-300 transition"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {loading ? (
                             <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                             </>
                        ) : (
                             <>
                                <FaUserPlus /> Create Account
                             </>
                        )}
                    </button>
                </form>

                 {/* Divider */}
                <div className="my-6 flex items-center justify-center">
                    <span className="h-px flex-1 bg-purple-500/30"></span>
                    <span className="px-4 text-xs font-semibold uppercase text-purple-300/70">Or</span>
                    <span className="h-px flex-1 bg-purple-500/30"></span>
                </div>

                 {/* Login Link */}
                <p className="text-center text-sm text-purple-300/80">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-purple-400 hover:text-purple-300 transition">
                        Log In
                    </Link>
                </p>

                 {/* Back Home Link */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-xs text-purple-400/70 hover:text-purple-300 transition flex items-center justify-center gap-1">
                        <FaArrowLeft size={12}/> Back to Home
                    </Link>
                </div>
            </div>
             {/* Add basic fade-in animation CSS if not using a library */}
             <style>{`
                 @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                 }
                .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                 }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
             `}</style>
        </div>
    );
};

export default Signup;