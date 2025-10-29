import React, { useState, useMemo } from 'react';

// --- Helper Icon Components ---
// Using inline SVGs for icons
const PlusIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

const BookmarkSquareIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
  </svg>
);

const ArrowPathIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.185a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-3.185l-1.903 1.903a7.5 7.5 0 01-12.548 3.364c-.42.232-.824.51-1.186.831a.75.75 0 01-1.06-1.06c.362-.32.752-.604 1.186-.831zM12 15.75a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-3.185l-1.903 1.903a7.5 7.5 0 01-12.548-3.364c.42-.232.824-.51 1.186-.831a.75.75 0 011.06 1.06c-.362.32-.752.604-1.186.831a7.5 7.5 0 0112.548 3.364l1.903-1.903h-3.185a.75.75 0 010-1.5h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-3.185l-1.903-1.903A7.5 7.5 0 0112 15.75z" clipRule="evenodd" />
  </svg>
);


/**
 * Main Pushup Tracker Page Component
 * This component allows users to count and log sets of pushups.
 */
export default function App() {
  // State for the current set's count
  const [currentCount, setCurrentCount] = useState(0);
  
  // State for the list of completed sets
  const [loggedSets, setLoggedSets] = useState([]);

  // Calculate total pushups from logged sets
  const totalPushups = useMemo(() => {
    return loggedSets.reduce((total, count) => total + count, 0);
  }, [loggedSets]);

  // --- Handler Functions ---

  // Increment the counter for the current set
  const incrementCount = () => {
    setCurrentCount(count => count + 1);
  };

  // Log the current set and reset the counter
  const logSet = () => {
    if (currentCount > 0) {
      setLoggedSets([...loggedSets, currentCount]);
      setCurrentCount(0);
    }
  };

  // Reset the entire session
  const resetAll = () => {
    setCurrentCount(0);
    setLoggedSets([]);
  };

  // --- Component Render ---
  return (
    <>
      {/* Main container with dark theme */}
      <div className="flex flex-col items-center min-h-screen w-full bg-slate-900 text-gray-200 p-4 sm:p-8 font-sans">
        
        {/* Header */}
        <div className="w-full max-w-3xl text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Pushup Tracker</h1>
          <p className="text-lg text-gray-400">Log your sets and track your progress.</p>
        </div>

        {/* Main Content Grid */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- Main Counter Section --- */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-between h-96">
            <h2 className="text-2xl font-semibold text-white mb-4">Current Set</h2>
            
            {/* Clickable Counter */}
            <div className="flex-grow flex items-center justify-center w-full">
              <button
                onClick={incrementCount}
                className="w-48 h-48 rounded-full bg-purple-600 flex flex-col items-center justify-center transition-all duration-150 ease-in-out
                           hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 active:scale-95 shadow-lg"
              >
                <span className="text-6xl font-bold text-white">{currentCount}</span>
                <span className="text-lg font-medium text-purple-200">Tap to Add</span>
              </button>
            </div>
            
            {/* Log Set Button */}
            <button
              onClick={logSet}
              disabled={currentCount === 0}
              className={`mt-4 w-full px-6 py-3 rounded-lg text-lg font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2
                bg-green-600
                enabled:hover:bg-green-700
                focus:outline-none focus:ring-4 focus:ring-green-500
                disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <BookmarkSquareIcon />
              Log Set
            </button>
          </div>

          {/* --- Session Log Section --- */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col h-96">
            <h2 className="text-2xl font-semibold text-white mb-6">Session Log</h2>
            
            {/* Stats */}
            <div className="mb-4 text-center">
              <p className="text-3xl font-bold text-white">{totalPushups}</p>
              <p className="text-lg text-gray-400">Total Pushups</p>
            </div>

            {/* Log List */}
            <div className="flex-grow bg-slate-900 rounded-lg p-3 overflow-y-auto">
              {loggedSets.length === 0 ? (
                <p className="text-gray-500 text-center italic pt-4">Your logged sets will appear here.</p>
              ) : (
                <ul className="space-y-2">
                  {loggedSets.map((count, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-slate-700 px-4 py-2 rounded-md shadow"
                    >
                      <span className="font-medium text-gray-300">Set {index + 1}</span>
                      <span className="font-bold text-white text-lg">{count}</span>
                    </li>
                  )).reverse()} {/* Show most recent set first */}
                </ul>
              )}
            </div>
            
            {/* Reset Button */}
            <button
              onClick={resetAll}
              disabled={loggedSets.length === 0 && currentCount === 0}
              className="mt-6 w-full px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2
                bg-red-600 text-white
                enabled:hover:bg-red-700
                disabled:opacity-40 disabled:cursor-not-allowed
                focus:outline-none focus:ring-4 focus:ring-red-500"
            >
              <ArrowPathIcon />
              Reset Session
            </button>
          </div>
          
        </div>

      </div>
    </>
  );
}