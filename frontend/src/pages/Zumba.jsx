import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaMusic, FaBolt } from 'react-icons/fa'; // Using react-icons
// Import apiCall if you plan to fetch dynamic content
// import { apiCall } from '../api';

const Zumba = () => {
    // --- State for Dynamic Content (Example - Adapt as needed) ---
    // const [zumbaContent, setZumbaContent] = useState({ title: '', intro: '', videos: [] });
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchZumbaData = async () => {
    //         setLoading(true);
    //         setError(null);
    //         try {
    //             const data = await apiCall('/activities/zumba'); // Fetch from backend
    //             setZumbaContent(data);
    //         } catch (err) {
    //             setError('Failed to load Zumba content.');
    //             console.error("Fetch zumba error:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchZumbaData();
    // }, []);
    // --- End State ---


    // Placeholder static data structure (replace with fetched data)
    const staticContent = {
        title: "Zumba Dance Fitness",
        videos: [
            { id: 'vid1', title: "Beginner Zumba", description: "Learn the basics of Zumba with easy-to-follow dance moves. Get fit while having fun!", icon: <FaMusic size={50} /> },
            { id: 'vid2', title: "Cardio Blast", description: "High-energy cardio workout with Latin-inspired dance moves. Burn calories and tone your body.", icon: <FaBolt size={50} /> },
            // Add more static video objects if needed
        ]
    };

    // --- Render Logic ---
    // if (loading) return <div className="text-center py-20 text-purple-300">Loading Zumba Content...</div>;
    // if (error) return <div className="text-center py-20 text-red-400">{error}</div>;

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

            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-center sm:text-left bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                    {staticContent.title} {/* Use zumbaContent.title if dynamic */}
                </h1>

                {/* Optional Intro Text */}
                {/* <p className="text-lg text-purple-200/90 mb-10 text-center sm:text-left">
                    {staticContent.intro || "Dance your way to fitness with our energetic Zumba sessions!"}
                </p> */}

                <div className="grid md:grid-cols-2 gap-8">
                    {staticContent.videos.map((video, index) => ( // Use zumbaContent.videos if dynamic
                        <div
                            key={video.id}
                            className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 transform hover:-translate-y-1 animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-purple-200">{video.title}</h2>
                                {/* Placeholder for Video Embed/Image */}
                                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl mb-4 flex items-center justify-center border border-purple-500/20 shadow-inner">
                                    <div className="text-purple-400 opacity-60">
                                        {video.icon || <FaMusic size={50} />}
                                    </div>
                                    {/* In a dynamic version, you'd put an iframe or image here */}
                                    {/* <iframe src={`https://www.youtube.com/embed/${video.youtubeId}`} title={video.title} className="w-full h-full rounded-xl" allowFullScreen></iframe> */}
                                </div>
                                <p className="text-purple-200/90 mb-6 text-sm leading-relaxed">{video.description}</p>
                            </div>
                            <button className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                                <FaPlay size={14}/> Start Dancing
                            </button>
                        </div>
                    ))}
                    {/* Add more cards if needed */}
                     {!staticContent.videos || staticContent.videos.length === 0 && (
                          <p className="md:col-span-2 text-center text-purple-300/70 py-10">No Zumba content available at the moment.</p>
                     )}
                </div>
            </div>

             {/* Add animations */}
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

export default Zumba;