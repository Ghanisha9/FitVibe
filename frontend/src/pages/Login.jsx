import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false); // Add state for remember me if needed

    const { login, loading } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!email || !password) {
            showToast('Please enter both email and password', 'error');
            return;
        }
        try {
            await login(email, password);
            // AuthContext handles navigation on success
        } catch (error) {
            // Toast is shown in AuthContext
            console.error("Login failed:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        // Applying styles inspired by login.html
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Shapes (Optional) */}
            {/* <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-10 animate-float"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-600 to-violet-700 rounded-xl opacity-10 animate-float animation-delay-3000"></div> */}

            <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-8 sm:p-10 z-10 animate-fadeInUp">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                        FITVIBE
                    </h1>
                    <p className="text-purple-300/80 text-sm">Welcome Back! Login to continue.</p>
                </div>

                <form onSubmit={handleLoginSubmit} noValidate>
                    <div className="mb-5 relative">
                        <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-1">
                            Email Address
                        </label>
                        <FaEnvelope className="absolute left-3 top-10 text-purple-400" />
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                        />
                    </div>

                    <div className="mb-5 relative">
                        <label htmlFor="password" className="block text-sm font-medium text-purple-200 mb-1">
                            Password
                        </label>
                        <FaLock className="absolute left-3 top-10 text-purple-400" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
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

                    <div className="flex items-center justify-between mb-6 text-sm">
                        <label htmlFor="rememberMe" className="flex items-center text-purple-300/80 cursor-pointer">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2 h-4 w-4 rounded bg-gray-700 border-purple-500/50 text-purple-600 focus:ring-purple-500"
                            />
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300 transition">
                            Forgot Password?
                        </Link>
                    </div>

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
                                Logging In...
                             </>
                        ) : (
                             <>
                                <FaSignInAlt /> Log In
                             </>
                        )}
                    </button>
                </form>

                <div className="my-6 flex items-center justify-center">
                    <span className="h-px flex-1 bg-purple-500/30"></span>
                    <span className="px-4 text-xs font-semibold uppercase text-purple-300/70">Or</span>
                    <span className="h-px flex-1 bg-purple-500/30"></span>
                </div>

                <p className="text-center text-sm text-purple-300/80">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-purple-400 hover:text-purple-300 transition">
                        Sign Up
                    </Link>
                </p>

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

                 @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                 }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animation-delay-3000 { animation-delay: 3s; }
             `}</style>
        </div>
    );
};

export default Login;