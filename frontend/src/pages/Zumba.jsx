import React from 'react'; // Removed useState and useEffect

// --- SVG Icons (replaces react-icons/fa) ---

// Replaces FaArrowLeft
const IconArrowLeft = ({ size = '1em' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
    </svg>
);

// Replaces FaPlay
const IconPlay = ({ size = '1em' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
    </svg>
);

// Replaces FaMusic
const IconMusic = ({ size = '1em' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.4A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l288-72.21V384a139 139 0 0 0-32-3.51c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V32a32 32 0 0 0-41.62-30.49z"></path>
    </svg>
);

// Replaces FaBolt
const IconBolt = ({ size = '1em' }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height={size} width={size} xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block' }}>
        <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 11.2 .2 24 10.9 30l16 16c8.1 8.1 21.1 8.1 29.1 0l160-160c8.1-8.1 8.1-21.1 0-29.1L296 160z"></path>
    </svg>
);
// --- End SVG Icons ---


const Zumba = () => {
    // Placeholder static data structure (now with real videos)
    const staticContent = {
        title: "Zumba Dance Fitness",
        videos: [
            {
                id: 'vid1',
                title: "Zumba Workout for Beginners",
                description: "Learn the basics of Zumba with this step-by-step fitness dance workout for beginners.",
                youtubeId: 'zL-rYcKcC6k',
                thumbnail: 'https://i.ytimg.com/vi/zL-rYcKcC6k/hqdefault.jpg'
            },
            {
                id: 'vid2',
                title: "30-Min Zumba Dance Workout",
                description: "A high-energy, 30-minute cardio workout. A fun dance session for beginners and beyond.",
                youtubeId: 'mZeFvX3ALKY',
                thumbnail: 'https://i.ytimg.com/vi/mZeFvX3ALKY/hqdefault.jpg'
            },
            {
                id: 'vid3',
                title: "Zumba for Weight Loss",
                description: "A fun and effective Zumba dance workout designed to help with weight loss. Get ready to sweat!",
                youtubeId: 'rV7ZFnd-DM0',
                thumbnail: 'https://i.ytimg.com/vi/rV7ZFnd-DM0/hqdefault.jpg'
            },
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 p-4 pt-24 md:p-8 animate-fadeIn">
            {/* Back Arrow - Replaced Link with <a> tag */}
            <a
                href="/"
                className="fixed top-4 left-4 z-20 flex items-center gap-2 text-sm text-purple-200 bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-purple-500/30"
                aria-label="Back to Home"
            >
                <IconArrowLeft /> Home
            </a>

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
                                
                                {/* This is the fix for the grey box. It now uses an <img> tag */}
                                <div className="aspect-video rounded-xl mb-4 overflow-hidden border border-purple-500/20 shadow-inner">
                                    <img
                                        src={video.thumbnail}
                                        alt={`Thumbnail for ${video.title}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <p className="text-purple-200/90 mb-6 text-sm leading-relaxed">{video.description}</p>
                            </div>
                            {/* Watch Video Button - Replaced <button> with <a> tag */}
                            <a
                                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2.5 px-4 rounded-lg shadow-md hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <IconPlay size="14px" /> Start Dancing
                            </a>
                        </div>
                    ))}
                </div>
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

export default Zumba;