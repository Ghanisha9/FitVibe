import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHeart, FaDumbbell, FaPlay } from 'react-icons/fa';

const Yoga = () => {
    const staticContent = {
        title: "Yoga & Mindfulness",
        videos: [
            {
                id: 'vid1',
                title: "Morning Yoga Flow",
                description: "Start your day with this energizing 20-minute yoga sequence. Perfect for beginners and experienced practitioners alike.",
                icon: <FaHeart size={50} />,
                youtubeId: 'g_tea8ZNk5A',
                thumbnail: 'https://i.ytimg.com/vi/g_tea8ZNk5A/hqdefault.jpg'
            },
            {
                id: 'vid2',
                title: "Meditation Guide",
                description: "Find inner peace with a 10-minute guided meditation. Learn breathing techniques and mindfulness practices.",
                icon: <FaHeart size={50} />,
                youtubeId: 'U9YKY7fdwyg',
                thumbnail: 'https://i.ytimg.com/vi/U9YKY7fdwyg/hqdefault.jpg'
            },
            {
                id: 'vid3',
                title: "30-Minute Full Body Stretch Yoga", // Updated title for the new video
                description: "Release tension and improve flexibility with this comprehensive 30-minute full-body stretching yoga session.", // Updated description for the new video
                icon: <FaDumbbell size={50} />,
                youtubeId: 'C4bofW53sO8', // <-- UPDATED YouTube Video ID
                thumbnail: 'https://i.ytimg.com/vi/C4bofW53sO8/hqdefault.jpg' // <-- UPDATED Thumbnail URL
            },
            {
                id: 'vid4',
                title: "Evening Relaxation - Yoga Nidra for Deep Sleep",
                description: "Experience deep relaxation and prepare for restful sleep with this calming Yoga Nidra session. Perfect for stress relief.",
                icon: <FaHeart size={50} />,
                youtubeId: 'HzXkMnvqojE',
                thumbnail: 'https://i.ytimg.com/vi/HzXkMnvqojE/hqdefault.jpg'
            },
        ]
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

            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-center sm:text-left bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                    {staticContent.title}
                </h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {staticContent.videos.map((video, index) => (
                        <div
                            key={video.id}
                            className="group bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/20 transform hover:-translate-y-1 animate-fadeInUp"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-purple-200">{video.title}</h2>

                                <div className="aspect-video rounded-xl mb-4 overflow-hidden border border-purple-500/20 shadow-inner">
                                    <img
                                        src={video.thumbnail}
                                        alt={`Thumbnail for ${video.title}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <p className="text-purple-200/90 mb-6 text-sm leading-relaxed">{video.description}</p>
                            </div>
                            <a
                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FaPlay size={14} /> Watch Video
                            </a>
                        </div>
                    ))}
                </div>
            </div>
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

export default Yoga;