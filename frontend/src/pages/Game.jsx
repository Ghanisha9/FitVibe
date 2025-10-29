import React, { useState, useEffect } from 'react';

// --- SVG Icons ---
const IconArrowLeft = ({ size = '1em', className = '' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6 9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
    </svg>
);

const IconAward = ({ size = '1em', className = '' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M464 128h-80V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v256c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zM160 80c0-8.84 7.16-16 16-16h160c8.84 0 16 7.16 16 16v48H160V80zm320 352H32V176h448v256zM256 224c-44.11 0-80 35.89-80 80s35.89 80 80 80 80-35.89 80-80-35.89-80-80-80zm0 128c-26.47 0-48-21.53-48-48s21.53-48 48-48 48 21.53 48 48-21.53 48-48 48z"></path>
    </svg>
);

const IconTimer = ({ size = '1em', className = '' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8l-22.4 30.9c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
    </svg>
);
// --- End SVG Icons ---

// --- Game Data ---
const POSES = [
    {
        id: 'p1',
        title: 'Tree Pose',
        difficulty: 'Beginner',
        duration: 30, // seconds
        points: 50,
        img: 'https://theyogahub.ie/wp-content/uploads/2018/06/Tree.jpg' // <-- New Image
    },
    {
        id: 'p2',
        title: 'Warrior II',
        difficulty: 'Intermediate',
        duration: 45, // seconds
        points: 75,
        img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // <-- Unchanged
    },
    {
        id: 'p3',
        title: 'Plank',
        difficulty: 'Intermediate',
        duration: 60, // seconds
        points: 100,
        img: 'https://media.istockphoto.com/id/623619166/photo/working-on-her-core.jpg?s=612x612&w=0&k=20&c=Dr7o51e6u6E559N_51r2pt_8IQ_Kc5nP_T6PxTxiPr8=' // <-- New Image
    },
    {
        id: 'p4',
        title: 'Crow Pose',
        difficulty: 'Advanced',
        duration: 15, // seconds
        points: 150,
        img: 'https://yogagardenphilly.com/wp-content/uploads/2023/12/P1060447-Crop-scaled.jpg' // <-- New Image
    }
];

// --- Game Component ---
const GamifiedChallenges = () => {
    // Game state can be: 'select', 'ready', 'holding', 'success', 'failed'
    const [gameState, setGameState] = useState('select');
    const [selectedPose, setSelectedPose] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [score, setScore] = useState(0);

    // --- Timer Logic ---
    useEffect(() => {
        // Only run the timer if we are in the 'holding' state
        if (gameState !== 'holding') {
            return;
        }

        // Check for success condition
        if (timeLeft <= 0) {
            setGameState('success');
            setScore(prevScore => prevScore + selectedPose.points);
            return;
        }

        // Interval to tick down the timer
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Cleanup function to clear the interval
        return () => clearInterval(timerId);

    }, [gameState, timeLeft, selectedPose]);

    // --- Event Handlers ---
    const handleSelectPose = (pose) => {
        setSelectedPose(pose);
        setGameState('ready');
    };

    const handleStartHold = () => {
        setTimeLeft(selectedPose.duration);
        setGameState('holding');
    };

    const handleGiveUp = () => {
        setGameState('failed');
    };

    const handleTryAgain = () => {
        setGameState('ready'); // Go back to the "Ready" screen for the same pose
    };

    const handleNextPose = () => {
        setSelectedPose(null);
        setGameState('select');
    };

    // --- Render Functions for different states ---

    const renderSelectionScreen = () => (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-center text-purple-200 mb-8">Select Your Challenge</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {POSES.map(pose => (
                    <div
                        key={pose.id}
                        className="group bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 transform hover:-translate-y-1"
                    >
                        <img src={pose.img} alt={pose.title} className="aspect-video w-full rounded-lg mb-4 border border-purple-500/20" />
                        <h3 className="text-2xl font-bold text-white mb-2">{pose.title}</h3>
                        <div className="flex justify-between items-center mb-4">
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${pose.difficulty === 'Beginner' ? 'bg-green-600/30 text-green-300' : pose.difficulty === 'Intermediate' ? 'bg-yellow-600/30 text-yellow-300' : 'bg-red-600/30 text-red-300'}`}>
                                {pose.difficulty}
                            </span>
                            <span className="text-lg font-bold text-pink-400">{pose.points} PTS</span>
                        </div>
                        <p className="text-purple-300/90 text-sm mb-5">Hold for <span className="font-bold">{pose.duration}</span> seconds.</p>
                        <button
                            onClick={() => handleSelectPose(pose)}
                            className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderReadyScreen = () => (
        <div className="animate-fadeIn text-center max-w-lg mx-auto bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Get Ready!</h2>
            <img src={selectedPose.img} alt={selectedPose.title} className="aspect-video w-full rounded-lg mb-6 border border-purple-500/20" />
            <h3 className="text-4xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-2">
                {selectedPose.title}
            </h3>
            <p className="text-purple-200 text-lg mb-6">Hold this pose for <span className="font-bold text-white">{selectedPose.duration}</span> seconds.</p>
            <button
                onClick={handleStartHold}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-green-500/40 transform hover:-translate-y-0.5 transition-all duration-300 text-xl"
            >
                Start Hold
            </button>
            <button
                onClick={handleNextPose}
                className="w-full mt-4 text-purple-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
            >
                Choose a different pose
            </button>
        </div>
    );

    const renderHoldingScreen = () => (
        <div className="animate-fadeIn text-center max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-purple-200 mb-4">Holding...</h2>
            <h3 className="text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-8">
                {selectedPose.title}
            </h3>
            <div className="relative w-72 h-72 mx-auto mb-8 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-gray-800"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        className="text-pink-500"
                        strokeWidth="8"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={(timeLeft / selectedPose.duration) * (2 * Math.PI * 45)}
                        style={{ transition: 'stroke-dashoffset 1s linear' }}
                    />
                </svg>
                <div className="absolute text-7xl font-bold text-white">{timeLeft}s</div>
            </div>
            <button
                onClick={handleGiveUp}
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-red-500/40 transform hover:-translate-y-0.5 transition-all duration-300 text-lg"
            >
                Give Up
            </button>
        </div>
    );

    const renderSuccessScreen = () => (
        <div className="animate-fadeIn text-center max-w-lg mx-auto bg-gray-900/70 backdrop-blur-xl border border-green-500/30 rounded-2xl shadow-xl p-8">
            <h2 className="text-4xl font-black text-green-400 mb-4">Success!</h2>
            <IconAward size="80px" className="text-green-400 mx-auto mb-4" />
            <p className="text-purple-200 text-2xl mb-6">
                You earned <span className="font-bold text-white">+{selectedPose.points}</span> points!
            </p>
            <button
                onClick={handleNextPose}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 text-xl"
            >
                Next Pose
            </button>
        </div>
    );

    const renderFailedScreen = () => (
        <div className="animate-fadeIn text-center max-w-lg mx-auto bg-gray-900/70 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-xl p-8">
            <h2 className="text-4xl font-black text-red-400 mb-4">Don't Give Up!</h2>
            <p className="text-purple-200 text-xl mb-6">
                You can do it! <span className="font-bold text-white">{selectedPose.title}</span> is tough.
            </p>
            <button
                onClick={handleTryAgain}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 text-xl"
            >
                Try Again
            </button>
            <button
                onClick={handleNextPose}
                className="w-full mt-4 text-purple-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
            >
                Choose a different pose
            </button>
        </div>
    );

    const renderCurrentState = () => {
        switch (gameState) {
            case 'select':
                return renderSelectionScreen();
            case 'ready':
                return renderReadyScreen();
            case 'holding':
                return renderHoldingScreen();
            case 'success':
                return renderSuccessScreen();
            case 'failed':
                return renderFailedScreen();
            default:
                return renderSelectionScreen();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 p-4 pt-24 md:p-8">
            {/* Back Arrow (replaced Link with <a>) */}
            <a
                href="/"
                className="fixed top-4 left-4 z-20 flex items-center gap-2 text-sm text-purple-200 bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-purple-500/30"
                aria-label="Back to Home"
            >
                <IconArrowLeft /> Home
            </a>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                    <IconTimer className="inline-block mr-3" />
                    Yoga Pose Hold
                </h1>
                <div className="text-center text-3xl font-bold text-white mb-8">
                    Score: <span className="text-pink-400">{score}</span>
                </div>

                {/* Render the current part of the game */}
                {renderCurrentState()}
            </div>

            {/* Add animations */}
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

export default GamifiedChallenges;