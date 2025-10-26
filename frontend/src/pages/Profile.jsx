import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBoxOpen, FaAward, FaArrowLeft, FaSyncAlt } from 'react-icons/fa'; // Using react-icons
import { useAuth } from '../context/AuthContext'; // To get user info and check login status
import { useToast } from '../hooks/useToast'; // To show messages
import { apiCall } from '../api'; // To fetch orders and challenges

const Profile = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [myChallenges, setMyChallenges] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingChallenges, setLoadingChallenges] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/login');
            showToast('Please log in to view your profile', 'warning');
            return; // Stop execution if not authenticated
        }

        const fetchData = async () => {
            setLoadingOrders(true);
            setLoadingChallenges(true);
            setError(null);
            try {
                // Fetch Orders
                const ordersData = await apiCall('/order'); // GET /order endpoint
                setOrders(ordersData || []);

                // Fetch User's Challenges
                const challengesData = await apiCall('/profile/my-challenges'); // GET /profile/my-challenges endpoint
                setMyChallenges(challengesData || []);

            } catch (err) {
                setError('Failed to load profile data. Please try again later.');
                showToast('Could not load profile data 😥', 'error');
                console.error("Fetch profile data error:", err);
            } finally {
                setLoadingOrders(false);
                setLoadingChallenges(false);
            }
        };

        fetchData();
    }, [isAuthenticated, navigate, showToast]); // Re-fetch if auth status changes

    // Helper to format date strings
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });
        } catch (e) {
            return 'Invalid Date';
        }
    };

    // Helper to get status badge styles
    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30'; // For challenges
            case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'; // For challenges
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 p-4 pt-24 md:p-8 animate-fadeIn">
            {/* Back Arrow */}
            <Link
                to="/"
                className="fixed top-4 left-4 z-20 flex items-center gap-2 text-sm text-purple-200 bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-purple-500/30"
                aria-label="Back to Home"
            >
                <FaArrowLeft /> Home
            </Link>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                    My Profile
                </h1>

                {error && (
                    <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-center mb-6" role="alert">
                        {error}
                    </div>
                )}

                {/* User Info Section */}
                <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 sm:p-8 mb-8 animate-fadeInUp">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg border-2 border-purple-400/50">
                            <FaUserCircle size={40} className="text-white opacity-90" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-purple-100">
                                {user?.firstName} {user?.lastName}
                            </h2>
                            <p className="text-purple-300/80 mt-1">{user?.email}</p>
                            {/* You could add more details here if fetched */}
                        </div>
                         <button
                             onClick={logout}
                             className="mt-4 sm:mt-0 sm:ml-auto bg-red-600/80 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors flex items-center gap-2"
                         >
                            <FaArrowLeft /> Logout
                         </button>
                    </div>
                </div>

                {/* Combined Section for Orders and Challenges */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Order History Section */}
                    <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 sm:p-8 animate-fadeInUp animation-delay-200">
                        <h2 className="text-2xl font-bold mb-5 text-purple-300 flex items-center gap-3">
                            <FaBoxOpen className="text-purple-400" />
                            Order History
                        </h2>

                        {loadingOrders ? (
                            <div className="flex justify-center items-center py-10">
                                <FaSyncAlt className="animate-spin h-6 w-6 text-purple-400" />
                            </div>
                        ) : orders.length === 0 ? (
                            <p className="text-purple-300/70 text-center py-5">You haven't placed any orders yet.</p>
                        ) : (
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {orders.map(order => (
                                    <div key={order._id} className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20 hover:bg-purple-500/10 transition-colors duration-300">
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <div>
                                                <p className="font-semibold text-purple-200">Order #{order._id.slice(-6)}</p>
                                                <p className="text-xs text-purple-400/80">{formatDate(order.date)}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-lg font-bold text-green-400">₹{order.totalPrice.toFixed(2)}</p>
                                                <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusClass(order.status)}`}>
                                                    {order.status || 'Unknown'}
                                                </span>
                                            </div>
                                        </div>
                                        <ul className="text-xs text-purple-300/80 list-disc list-inside space-y-1">
                                             {order.items?.map((item, idx) => (
                                                 <li key={item.productId?._id || idx}>
                                                     {item.quantity} x {item.name || 'Item'} (₹{item.priceAtPurchase?.toFixed(2)})
                                                 </li>
                                             ))}
                                             {(!order.items || order.items.length === 0) && <li>No items listed for this order.</li>}
                                        </ul>
                                        {order.shippingAddress?.fullAddress && (
                                             <p className="text-xs text-purple-400/80 mt-2 border-t border-purple-500/10 pt-2">
                                                 Ships to: {order.shippingAddress.fullAddress}
                                             </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* My Challenges Section */}
                    <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 sm:p-8 animate-fadeInUp animation-delay-400">
                        <h2 className="text-2xl font-bold mb-5 text-purple-300 flex items-center gap-3">
                            <FaAward className="text-purple-400" />
                            My Challenges
                        </h2>

                        {loadingChallenges ? (
                            <div className="flex justify-center items-center py-10">
                                <FaSyncAlt className="animate-spin h-6 w-6 text-purple-400" />
                            </div>
                        ) : myChallenges.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="text-purple-300/70 mb-4">You haven't joined any challenges yet.</p>
                                <Link to="/challenges" className="inline-block bg-purple-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-purple-500 transition-colors">
                                    Explore Challenges
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {myChallenges.map(uc => (
                                    <div key={uc._id || uc.challengeId?._id} className="bg-gray-800/50 p-4 rounded-lg border border-purple-500/20 hover:bg-purple-500/10 transition-colors duration-300">
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <p className="font-semibold text-purple-200">{uc.challengeId?.title || 'Challenge'}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusClass(uc.status)}`}>
                                                {uc.status || 'Unknown'}
                                            </span>
                                        </div>
                                         <p className="text-xs text-purple-300/80 mb-2">{uc.challengeId?.description}</p>
                                        {/* Progress Bar */}
                                        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1 shadow-inner">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
                                                style={{ width: `${uc.progress || 0}%` }}
                                                title={`Progress: ${uc.progress || 0}%`}
                                            ></div>
                                        </div>
                                        <p className="text-right text-xs text-purple-400">{uc.progress || 0}% Complete</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Styles for animations, scrollbar etc. */}
             <style jsx global>{`
                 @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                 }
                .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
                 .animation-delay-200 { animation-delay: 0.2s; }
                 .animation-delay-400 { animation-delay: 0.4s; }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                 }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }

                /* Custom Scrollbar for lists */
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(51, 51, 51, 0.3);
                  border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #cc66ff, #DA70D6);
                  border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                   background: linear-gradient(180deg, #DA70D6, #e08aff);
                }
                /* For Firefox */
                .custom-scrollbar {
                  scrollbar-width: thin;
                  scrollbar-color: #C084FC rgba(51, 51, 51, 0.3);
                }
             `}</style>
        </div>
    );
};

export default Profile;