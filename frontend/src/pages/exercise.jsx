import React, { useState, useMemo } from 'react';

// --- SVG Icons (replaces react-icons/fa) ---

// Replaces FaPlay
const IconPlay = ({ size = '1em' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
    </svg>
);

// Replaces FaDumbbell
const IconDumbbell = ({ size = '1em' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M576 64H64C28.7 64 0 92.7 0 128v64c0 35.3 28.7 64 64 64h25.4c-3.3 12.5-5.4 25.7-5.4 39.3 0 70.3 52.1 127.8 119.2 138.8 12.3 2 24.2 3.2 35.8 3.2s23.6-1.2 35.8-3.2C337.9 423.8 390 366.3 390 296c0-13.6-2.1-26.8-5.4-39.3H576c35.3 0 64-28.7 64-64v-64c0-35.3-28.7-64-64-64zM128 192c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm384 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path>
    </svg>
);
// --- End SVG Icons ---


// --- All Exercise Data ---
const allExercises = [
    /* --- ORIGINAL 8 VIDEOS REMOVED --- */
    // --- ADDED VIDEOS (NOW THE ONLY VIDEOS) ---
    {
        id: 'ex9',
        title: "20 Min Full Body Workout",
        description: "A complete 20-minute, full-body workout. Perfect for building strength and endurance at home.",
        category: "Full Body",
        youtubeId: 'AdqrTg_hpEQ',
        thumbnail: 'https://i.ytimg.com/vi/AdqrTg_hpEQ/hqdefault.jpg'
    },
    {
        id: 'ex10',
        title: "10 Min Beginner Ab Workout",
        description: "Start building a strong core with this 10-minute ab workout designed specifically for beginners.",
        category: "Core",
        youtubeId: 'FB5-7tIiX-I',
        thumbnail: 'https://i.ytimg.com/vi/FB5-7tIiX-I/hqdefault.jpg'
    },
    {
        id: 'ex11',
        title: "10 Min Full Body Stretch",
        description: "Cool down, improve flexibility, and release tension with this 10-minute full-body stretching routine.",
        category: "Stretch",
        youtubeId: 'enYITYwvPAQ',
        thumbnail: 'https://i.ytimg.com/vi/enYITYwvPAQ/hqdefault.jpg'
    },
    {
        id: 'ex12',
        title: "15 Min Daily Stretch",
        description: "A 15-minute stretching routine perfect for mornings, evenings, or post-workout recovery.",
        category: "Stretch",
        youtubeId: '7W2N-Xcw17U',
        thumbnail: 'https://i.ytimg.com/vi/7W2N-Xcw17U/hqdefault.jpg'
    },
    {
        id: 'ex13',
        title: "5 Min Warm Up",
        description: "Get your body ready for any workout with this quick and effective 5-minute warm-up routine.",
        category: "Warm Up",
        youtubeId: 'itJE4neqDJw',
        thumbnail: 'https://i.ytimg.com/vi/itJE4neqDJw/hqdefault.jpg'
    }
    // --- END OF ADDED VIDEOS ---
];

// --- Categories for filtering (UPDATED to match remaining videos) ---
const categories = ['All', 'Full Body', 'Core', 'Stretch', 'Warm Up'];


const Exercises = () => {
    // --- State for the filter ---
    const [selectedCategory, setSelectedCategory] = useState('All');

    // --- Memoized filtered list ---
    const filteredExercises = useMemo(() => {
        if (selectedCategory === 'All') {
            return allExercises;
        }
        return allExercises.filter(ex => ex.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 p-4 pt-24 md:p-8 animate-fadeIn">
            
            {/* NOTE: The "Back" button has been removed. 
                Navigation should be handled by your main app's navbar, 
                as seen in your screenshot.
            */}

            <div className="max-w-6xl mx-auto">
                {/* --- Header --- */}
                <div className="mb-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-2">
                        Browse Exercises
                    </h1>
                    <p className="text-lg text-purple-200/90">
                        Find the perfect workout. Filter by muscle group below.
                    </p>
                </div>

                {/* --- INTERACTIVE FILTER BUTTONS --- */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-10">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                                px-4 py-2 font-medium rounded-full text-sm backdrop-blur-md border transition-all duration-300
                                ${selectedCategory === category
                                    ? 'bg-pink-600 text-white border-pink-500 shadow-lg shadow-pink-500/20' // Active state
                                    : 'bg-gray-800/60 text-purple-200 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-400' // Inactive state
                                }
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                {/* --- END OF FILTERS --- */}


                {/* --- EXERCISE GRID --- */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredExercises.length > 0 ? (
                        filteredExercises.map((exercise, index) => (
                            <div
                                key={exercise.id} // Use ID for a stable key
                                className="group bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 transform hover:-translate-y-1 animate-fadeInUp"
                                style={{ animationDelay: `${index * 0.05}s` }} // Staggered animation
                            >
                                <div>
                                    {/* Thumbnail Image */}
                                    <div className="aspect-video rounded-xl mb-4 overflow-hidden border border-purple-500/20 shadow-inner">
                                        <img
                                            src={exercise.thumbnail}
                                            alt={`Thumbnail for ${exercise.title}`}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    
                                    {/* Category Tag */}
                                    <span className="inline-block bg-purple-500/20 text-pink-400 rounded-full px-3 py-1 text-xs font-medium mb-3">
                                        {exercise.category}
                                    </span>
                                    
                                    {/* Text Content */}
                                    <h2 className="text-2xl font-bold mb-2 text-purple-200">{exercise.title}</h2>
                                    <p className="text-purple-200/90 mb-6 text-sm leading-relaxed">{exercise.description}</p>
                                </div>
                                
                                {/* Watch Video Button */}
                                <a
                                    href={`https://www.youtube.com/watch?v=${exercise.youtubeId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <IconPlay size="14px" /> Watch Video
                                </a>
                            </div>
                        ))
                    ) : (
                        // --- "No Results" Message ---
                        <div className="md:col-span-2 lg:col-span-3 text-center py-20 bg-gray-900/50 rounded-2xl border border-purple-500/20 animate-fadeIn">
                            <IconDumbbell size="40px" />
                            <h3 className="text-2xl font-bold text-white mt-4 mb-2">No Exercises Found</h3>
                            <p className="text-purple-200/9Same in the Bmi page ">Try selecting a different category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Global Animations (Fixed: removed <style jsx global>) --- */}
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

export default Exercises;