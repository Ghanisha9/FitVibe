import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Replaced with <a>
// import { FaAward, FaArrowLeft, FaCalendarAlt, FaBullseye } from 'react-icons/fa'; // Replaced with SVGs
// import { useAuth } from '../context/AuthContext'; // Mocked
// import { useToast } from '../hooks/useToast'; // Mocked
// import { apiCall } from '../api'; // Mocked
// import { useNavigate } from 'react-router-dom'; // Mocked

// --- SVG Icons (replaces react-icons) ---
const IconAward = ({ size = '1em', className = '' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M464 128h-80V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zM160 80c0-8.84 7.16-16 16-16h160c8.84 0 16 7.16 16 16v48H160V80zm320 352H32V176h448v256zM256 224c-44.11 0-80 35.89-80 80s35.89 80 80 80 80-35.89 80-80-35.89-80-80-80zm0 128c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z"></path>
    </svg>
);
const IconArrowLeft = ({ size = '1em', className = '' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6 9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
    </svg>
);
const IconCalendarAlt = ({ size = '1em', className = '' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
    </svg>
);
const IconBullseye = ({ size = '1em', className = '' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M256 8C119.03 8 8 119.03 8 256s111.03 248 248 248 248-111.03 248-248S392.97 8 256 8zm0 448c-110.53 0-200-89.47-200-200S145.47 56 256 56s200 89.47 200 200-89.47 200-200 200zm0-128c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm0 96c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm0-128c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 224c-52.94 0-96-43.06-96-96s43.06-96 96-96 96 43.06 96 96-43.06 96-96 96z"></path>
    </svg>
);
// --- End SVG Icons ---

// --- Mocks for hooks and API calls ---
const MOCK_CHALLENGES = [
    {
        _id: 'c1',
        title: '30-Day Push-up Challenge',
        description: 'Master the push-up and build upper body strength.',
        goal: 'Complete 100 push-ups in a single day.',
        startDate: '2025-11-01T00:00:00.000Z',
        endDate: '2025-11-30T00:00:00.000Z'
    },
    {
        _id: 'c2',
        title: 'Run 5k Challenge',
        description: 'Go from couch to 5k in just 4 weeks.',
        goal: 'Run 5 kilometers without stopping.',
        startDate: '2025-11-01T00:00:00.000Z',
        endDate: '2025-11-28T00:00:00.000Z'
    },
    {
        _id: 'c3',
        title: 'Morning Meditation Streak',
        description: 'Build a habit of mindfulness and start your day calm.',
        goal: 'Meditate for 10 minutes every morning for 14 days.',
        startDate: '2025-11-05T00:00:00.000Z',
        endDate: null // Ongoing challenge
    }
];

// Mock hooks
const useAuth = () => ({ isAuthenticated: true }); // Assume user is logged in
const useToast = () => (message, type) => console.log(`Toast (${type}): ${message}`);
const useNavigate = () => (path) => console.log(`Maps to: ${path}`);
// Mock apiCall
const apiCall = async (endpoint) => {
    if (endpoint === '/challenges') {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(MOCK_CHALLENGES);
            }, 1000); // Simulate 1-second network delay
        });
    }
    return [];
};
// --- End Mocks ---


const Challenges = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate(); // Using mocked navigate

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
    }, []); // Removed showToast dependency as the mock doesn't change

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
            {/* Back Arrow (replaced Link with <a>) */}
            <a
                href="/"
                className="fixed top-4 left-4 z-20 flex items-center gap-2 text-sm text-purple-200 bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-purple-500/30"
                aria-label="Back to Home"
            >
                <IconArrowLeft /> Home
            </a>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                    <IconAward className="inline-block mr-2 text-purple-400" />
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
                        <IconAward size={60} className="mx-auto mb-6 opacity-30" />
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
                                            <IconAward size={28} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl sm:text-2xl font-bold mb-1 text-purple-200">{challenge.title}</h3>
                                            <p className="text-sm text-purple-300/90">{challenge.description}</p>
                                        </div>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-3 mb-4 border border-purple-500/20 shadow-inner">
                                        <p className="text-xs text-purple-400 mb-0.5 uppercase tracking-wider flex items-center gap-1.5"><IconBullseye size={12} /> Goal:</p>
                                        <p className="font-semibold text-purple-100">{challenge.goal}</p>
                                    </div>

                                    <div className="flex justify-between items-center text-xs text-purple-400/80 mb-5">
                                        <span className="flex items-center gap-1"><IconCalendarAlt /> Start: {formatDate(challenge.startDate)}</span>
                                        {challenge.endDate ? (
                                            <span className="flex items-center gap-1"><IconCalendarAlt /> End: {formatDate(challenge.endDate)}</span>
                                        ) : (
                                            <span className="flex items-center gap-1"><IconCalendarAlt /> Ongoing</span>
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
            {/* Add animations (Fixed: removed <style jsx global>) */}
            <style>{`
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