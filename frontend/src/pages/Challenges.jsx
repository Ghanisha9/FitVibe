import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAward, FaArrowLeft, FaCalendarAlt, FaBullseye } from 'react-icons/fa'; // Using react-icons
import { useAuth } from '../context/AuthContext'; // To check if user is logged in
import { useToast } from '../hooks/useToast'; // To show messages
import { apiCall } from '../api'; // To fetch challenges

const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate(); // Import useNavigate for redirection

    useEffect(() => {
        const fetchChallenges = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiCall('/challenges');
                setChallenges(data || []); // Ensure it's always an array
            } catch (err) {
                setError('Failed to load challenges. Please try again later.');
                showToast('Could not load challenges 😥', 'error');
                console.error("Fetch challenges error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [showToast]); // Added showToast dependency

    const handleJoinChallenge = (challengeId, challengeTitle) => {
        if (!isAuthenticated) {
            showToast('Please log in to join a challenge', 'warning');
            navigate('/login'); // Redirect to login page
            return;
        }
        // In a real application, you would make an API call here
        // e.g., apiCall('/profile/my-challenges', { method: 'POST', body: JSON.stringify({ challengeId }) });
        console.log(`Attempting to join challenge: ${challengeId}`);
        showToast(`You joined the "${challengeTitle}" challenge! 💪`, 'success');
        // You might want to update the UI or user's state after joining
    };

    // Helper to format date strings
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            });
        } catch (e) {
            return 'Invalid Date';
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
                    <FaAward className="inline-block mr-2 text-purple-400" />
                    Fitness Challenges
                </h1>

                {loading && (
                    <div className="text-center py-10">
                        <svg className="animate-spin h-8 w-8 text-purple-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-purple-300">Loading Challenges...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                        {error}
                    </div>
                )}

                {!loading && !error && challenges.length === 0 && (
                    <div className="text-center py-16 text-purple-300/70 bg-gray-900/50 backdrop-blur-md rounded-2xl border border-purple-500/20">
                        <FaAward size={60} className="mx-auto mb-6 opacity-30" />
                        <p className="text-xl font-semibold mb-3">No Challenges Available</p>
                        <p>Check back soon for new fitness challenges!</p>
                    </div>
                )}

                {!loading && !error && challenges.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {challenges.map((challenge, index) => (
                            <div
                                key={challenge._id || index} // Use _id if available
                                className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 transform hover:-translate-y-1 animate-fadeInUp"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div>
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl shadow-md">
                                            <FaAward size={28} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl sm:text-2xl font-bold mb-1 text-purple-200">{challenge.title}</h3>
                                            <p className="text-sm text-purple-300/90">{challenge.description}</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-3 mb-4 border border-purple-500/20 shadow-inner">
                                        <p className="text-xs text-purple-400 mb-0.5 uppercase tracking-wider flex items-center gap-1.5"><FaBullseye size={12}/> Goal:</p>
                                        <p className="font-semibold text-purple-100">{challenge.goal}</p>
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-purple-400/80 mb-5">
                                        <span className="flex items-center gap-1"><FaCalendarAlt /> Start: {formatDate(challenge.startDate)}</span>
                                        {challenge.endDate && (
                                            <span className="flex items-center gap-1"><FaCalendarAlt /> End: {formatDate(challenge.endDate)}</span>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleJoinChallenge(challenge._id, challenge.title)}
                                    className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                >
                                    Join Challenge
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Add animations if needed */}
             <style jsx global>{`
                 @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                 }
                .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                 }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
             `}</style>
        </div>
    );
};

export default Challenges;