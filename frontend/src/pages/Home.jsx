import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGamepad, FaBrain, FaDumbbell, FaSpa, FaMusic, FaClipboardList, FaStar, FaBolt, FaHome, FaUtensils, FaArrowRight, FaFacebookF, FaTwitter, FaInstagram, FaRobot } from 'react-icons/fa'; // Using react-icons
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../api'; // Assuming you might fetch featured items later

// Import images (adjust paths as needed)
import heroImage from '../assets/homepage.jpeg';
import gameImage from '../assets/gamifiedchallenge_image.jpeg';
import mindImage from '../assets/mindfullness_image.jpeg';
import pushupImage from '../assets/pushup_image.jpeg';
import yogaImage from '../assets/yogaimage.jpeg';
import zumbaImage from '../assets/zumba_image.jpeg';
import planImage from '../assets/workoutplan_image.jpg';
import workout1 from '../assets/workout1_image.jpeg';
import workout2 from '../assets/workout2_image.jpeg';
import workout3 from '../assets/workout3_image.jpeg';
import card1 from '../assets/1_image.jpg';
import card2 from '../assets/2_image.jpg';
import card3 from '../assets/3_image.jpg';


const Home = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Add state for dynamic content if needed later
    // const [featuredChallenge, setFeaturedChallenge] = useState(null);

    // useEffect(() => {
    //   // Fetch dynamic data like featured challenge if required
    // }, []);

    const getStarted = () => {
        if (isAuthenticated) {
            navigate('/exercises'); // Or profile, or shop
        } else {
            navigate('/signup');
        }
    };

    const showPreview = () => {
        navigate('/exercises');
    };

    return (
        // Applying styles inspired by fitvibe.html and styles.css
        // Note: Direct CSS gradient backgrounds might need custom CSS or Tailwind plugins
        <div className="bg-gradient-to-br from-black via-purple-900/20 to-black text-purple-100 min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fadeInLeft"> {/* Basic animation */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent leading-tight">
                        FITVIBE
                    </h1>
                    <p className="text-xl md:text-2xl text-purple-200/90 mb-8">
                        Fuel your Body, Feel the Vibe!!!
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={getStarted}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                        >
                            <FaBolt /> Get Started
                        </button>
                        <button
                            onClick={showPreview}
                            className="bg-gray-700/50 border-2 border-purple-500/50 text-purple-200 font-bold py-3 px-8 rounded-full hover:bg-purple-500/20 hover:border-purple-500 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                        >
                            <FaDumbbell /> Preview
                        </button>
                    </div>
                </div>
                <div className="animate-fadeInRight"> {/* Basic animation */}
                    <img
                        src={heroImage}
                        alt="Workout"
                        className="rounded-2xl shadow-2xl border-2 border-purple-500/30 w-full h-auto object-cover max-h-[500px]"
                    />
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <GalleryCard icon={<FaGamepad />} title="Gamified Challenge" image={gameImage} link="/game" index={0} />
                <GalleryCard icon={<FaBrain />} title="Mindfulness" image={mindImage} link="/mindfulness" index={1} />
                <GalleryCard icon={<FaDumbbell />} title="Push-up Tracker" image={pushupImage} link="/pushup-tracker" index={2} />
                <GalleryCard icon={<FaSpa />} title="Yoga" image={yogaImage} link="/yoga" index={3} />
                <GalleryCard icon={<FaMusic />} title="Zumba" image={zumbaImage} link="/zumba" index={4} />
                <GalleryCard icon={<FaRobot />} title="AI Workout Plan" image={planImage} link="/workout-ai" index={5} />
            </div>

            {/* "One Membership" Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-16 py-12 bg-gray-900/50 backdrop-blur-md rounded-2xl text-center border border-purple-500/20 shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-300 flex items-center justify-center gap-4">
                    <FaStar className="text-yellow-400" />
                    One membership for all your fitness needs!
                    <FaStar className="text-yellow-400" />
                </h2>
                <button
                    onClick={getStarted}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                    <FaBolt /> Get Started Now
                </button>
            </div>

            {/* Image Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                 <img src={workout1} alt="Workout 1" className="rounded-2xl shadow-lg border border-purple-500/20 hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 w-full h-64 object-cover" />
                 <img src={workout2} alt="Workout 2" className="rounded-2xl shadow-lg border border-purple-500/20 hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 w-full h-64 object-cover" />
                 <img src={workout3} alt="Workout 3" className="rounded-2xl shadow-lg border border-purple-500/20 hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 w-full h-64 object-cover md:col-span-1" />
            </div>

            {/* List Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-4">
                <ListItem index="01" text="Workout at home" icon={<FaHome />} />
                <ListItem index="02" text="Professional gym training" icon={<FaDumbbell />} />
                <ListItem index="03" text="Personalized diet plans" icon={<FaUtensils />} />
            </div>

            {/* Card Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                 <InfoCard
                    image={card1}
                    title="Expert Guidance"
                    description="Access certified trainers and coaches who provide personalized workout plans and continuous support." />
                 <InfoCard
                    image={card2}
                    title="Progress Tracking"
                    description="Monitor your performance with our advanced tracking tools. Log your workouts, track your progress, and see improvements." />
                 <InfoCard
                    image={card3}
                    title="Community & Motivation"
                    description="Join a vibrant community. Share your journey, celebrate achievements, and stay motivated with friends." />
            </div>

            {/* Footer Section - Replaced with Footer Component */}
            {/* <Footer /> */}

             {/* Add basic fade-in animation CSS if not using a library */}
             <style>{`
                @keyframes fadeInLeft {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }

                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
             `}</style>
        </div>
    );
};

// Helper component for Gallery Cards
const GalleryCard = ({ icon, title, image, link, index }) => (
    <Link to={link || '#'} className="block group animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/30 transform hover:-translate-y-2 transition-all duration-300">
            <img src={image} alt={title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <div className="text-purple-400 text-3xl mb-2">{icon}</div>
                <span className="text-white text-lg font-semibold group-hover:text-purple-300 transition-colors">{title}</span>
            </figcaption>
        </div>
    </Link>
);

// Helper component for List Items
const ListItem = ({ index, text, icon }) => (
     <div className="flex justify-between items-center p-6 bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <span className="text-xl font-bold text-purple-400">{index}.</span>
        <span className="flex-1 mx-6 text-lg text-purple-200 group-hover:text-white transition-colors flex items-center gap-3">
             {icon} {text}
        </span>
        <span className="text-purple-400 text-xl group-hover:translate-x-2 transition-transform">
             <FaArrowRight />
        </span>
     </div>
);

// Helper component for Info Cards
const InfoCard = ({ image, title, description }) => (
     <div className="bg-gradient-to-br from-gray-900 to-gray-800/80 rounded-2xl overflow-hidden shadow-lg border border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/30 transform hover:-translate-y-2 transition-all duration-300">
         <img src={image} alt={title} className="w-full h-48 object-cover"/>
         <div className="p-6">
             <h2 className="text-xl font-semibold mb-3 text-purple-300">{title}</h2>
             <p className="text-purple-200/80 text-sm leading-relaxed">{description}</p>
         </div>
     </div>
);


export default Home;