import React, { useState, useEffect, useRef } from 'react';

// --- Helper Icon Components ---
// Using inline SVGs for icons as requested for React components
const PlayIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const StopIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
  </svg>
);

const PauseIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
  </svg>
);


/**
 * Main Mindfulness Page Component
 * This single component contains all logic for the mindfulness section.
 */
export default function App() {
  // State for the breathing exercise
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathStateText, setBreathStateText] = useState("Start");
  
  // State for the relaxing sounds
  const [activeSound, setActiveSound] = useState(null); // 'rain', 'drone', or null

  // Refs to store Web Audio API objects
  const audioContextRef = useRef(null);
  const audioSourceRef = useRef(null);
  
  // Ref for the breathing animation text timer
  const breathTimerRef = useRef(null);

  // --- Web Audio API Functions ---

  // Function to create and play a sound
  const playSound = (soundType) => {
    // Stop any currently playing sound first
    stopSound();

    // Initialize AudioContext if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const context = audioContextRef.current;

    let sourceNode;

    if (soundType === 'rain') {
      // Create white noise for rain
      const bufferSize = 2 * context.sampleRate;
      const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      sourceNode = context.createBufferSource();
      sourceNode.buffer = noiseBuffer;
      sourceNode.loop = true;

      // Create a low-pass filter to make it sound like rain
      const filter = context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, context.currentTime); // Adjust for desired rain sound
      
      sourceNode.connect(filter).connect(context.destination);
      
    } else if (soundType === 'drone') {
      // Create a low-frequency oscillator for a calm drone
      sourceNode = context.createOscillator();
      sourceNode.type = 'sine';
      sourceNode.frequency.setValueAtTime(100, context.currentTime); // Low, deep tone
      
      // Add a second oscillator for a richer sound (a perfect fifth)
      const osc2 = context.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(150, context.currentTime); // 100 * 1.5

      const gain1 = context.createGain();
      gain1.gain.setValueAtTime(0.3, context.currentTime);
      
      const gain2 = context.createGain();
      gain2.gain.setValueAtTime(0.2, context.currentTime);

      sourceNode.connect(gain1).connect(context.destination);
      osc2.connect(gain2).connect(context.destination);
      
      // Start both oscillators
      osc2.start();
      // We store the main oscillator as the 'sourceNode' to stop it later
      // A bit of a simplification, but works for this case.
      // A proper implementation would wrap both in a class or object.
      audioSourceRef.current = { main: sourceNode, secondary: osc2 };
      sourceNode.start();
      setActiveSound(soundType);
      return; // Skip default sourceNode.start()
    }

    sourceNode.start();
    audioSourceRef.current = sourceNode; // Store the source to stop it later
    setActiveSound(soundType);
  };

  // Function to stop the currently playing sound
  const stopSound = () => {
    if (audioSourceRef.current) {
      if (activeSound === 'drone' && typeof audioSourceRef.current === 'object') {
        // Special case for our drone object
        audioSourceRef.current.main.stop();
        audioSourceRef.current.secondary.stop();
      } else if (audioSourceRef.current.stop) {
        // Standard case for BufferSource or Oscillator
        audioSourceRef.current.stop();
      }
      audioSourceRef.current.disconnect?.();
    }
    audioSourceRef.current = null;
    setActiveSound(null);
  };
  
  // --- Breathing Exercise Functions ---

  // This effect controls the breathing text cycle
  useEffect(() => {
    if (breathingActive) {
      const cycle = () => {
        setBreathStateText("Breathe In...");
        breathTimerRef.current = setTimeout(() => {
          setBreathStateText("Hold...");
          breathTimerRef.current = setTimeout(() => {
            setBreathStateText("Breathe Out...");
            breathTimerRef.current = setTimeout(cycle, 6000); // 6s exhale
          }, 4000); // 4s hold
        }, 4000); // 4s inhale
      };
      cycle(); // Start the first cycle
    } else {
      // Cleanup when stopped
      clearTimeout(breathTimerRef.current);
      setBreathStateText("Start");
    }
    
    // Cleanup function
    return () => clearTimeout(breathTimerRef.current);
  }, [breathingActive]);

  // Toggle the breathing exercise
  const toggleBreathing = () => {
    setBreathingActive(!breathingActive);
  };

  // --- Component Render ---
  return (
    <>
      {/* We need to define the @keyframes for the breathing animation.
        Since we can't configure Tailwind's theme, we use a <style> tag.
        This is a common and valid pattern for self-contained components.
      */}
      <style>
        {`
          @keyframes breathe-animation {
            0%   { transform: scale(0.6); opacity: 0.7; } /* Start exhale */
            28.5% { transform: scale(1); opacity: 1; }   /* End inhale (4s) */
            57%  { transform: scale(1); opacity: 1; }   /* End hold (4s) */
            100% { transform: scale(0.6); opacity: 0.7; } /* End exhale (6s) */
          }
          
          .animate-breathe {
            animation: breathe-animation 14s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Main container with dark theme matching the screenshot */}
      <div className="flex flex-col items-center min-h-screen w-full bg-slate-900 text-gray-200 p-4 sm:p-8 font-sans">
        
        {/* Header */}
        <div className="w-full max-w-3xl text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Mindfulness</h1>
          <p className="text-lg text-gray-400">Find your calm. Settle your mind.</p>
        </div>

        {/* Main Content Grid */}
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- Guided Breathing Section --- */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-between h-96">
            <h2 className="text-2xl font-semibold text-white mb-4">Guided Breathing</h2>
            
            {/* Visualizer */}
            <div className="flex-grow flex items-center justify-center w-full">
              <div
                className={`relative w-48 h-48 rounded-full bg-purple-600 flex items-center justify-center transition-all duration-1000 ${breathingActive ? 'animate-breathe' : ''}`}
                style={{ transform: breathingActive ? undefined : 'scale(0.6)', opacity: breathingActive ? undefined : 0.7 }}
              >
                {/* Inner guideline circle */}
                <div className="absolute w-full h-full rounded-full border-2 border-purple-400 opacity-50 scale-125"></div>
                
                {/* Text Indicator */}
                <span className="text-xl font-medium text-white z-10">
                  {breathStateText}
                </span>
              </div>
            </div>
            
            {/* Control Button */}
            <button
              onClick={toggleBreathing}
              className={`mt-4 w-full px-6 py-3 rounded-lg text-lg font-semibold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2
                ${breathingActive 
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                  : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                } 
                focus:outline-none focus:ring-4 `}
            >
              {breathingActive ? <PauseIcon /> : <PlayIcon />}
              {breathingActive ? 'Stop' : 'Start Session'}
            </button>
          </div>

          {/* --- Relaxing Sounds Section --- */}
          <div className="bg-slate-800 p-6 rounded-2xl shadow-lg flex flex-col h-96">
            <h2 className="text-2xl font-semibold text-white mb-6">Relaxing Sounds</h2>
            
            <div className="flex flex-col space-y-4 flex-grow">
              
              {/* Rain Sound Button */}
              <button
                onClick={() => activeSound === 'rain' ? stopSound() : playSound('rain')}
                className={`w-full px-5 py-4 rounded-lg text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3
                  ${activeSound === 'rain' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  } 
                  focus:outline-none focus:ring-4 focus:ring-blue-500`}
              >
                {activeSound === 'rain' ? <PauseIcon /> : <PlayIcon />}
                Gentle Rain
              </button>
              
              {/* Drone Sound Button */}
              <button
                onClick={() => activeSound === 'drone' ? stopSound() : playSound('drone')}
                className={`w-full px-5 py-4 rounded-lg text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3
                  ${activeSound === 'drone' 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  } 
                  focus:outline-none focus:ring-4 focus:ring-indigo-500`}
              >
                {activeSound === 'drone' ? <PauseIcon /> : <PlayIcon />}
                Calm Drone
              </button>

            </div>
            
            {/* Master Stop Button */}
            <button
              onClick={stopSound}
              disabled={!activeSound}
              className="mt-6 w-full px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2
                bg-gray-600 text-white
                enabled:hover:bg-gray-500
                disabled:opacity-40 disabled:cursor-not-allowed
                focus:outline-none focus:ring-4 focus:ring-gray-400"
            >
              <StopIcon />
              Stop All Sounds
            </button>
          </div>
          
        </div>

      </div>
    </>
  );
}