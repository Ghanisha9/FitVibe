import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaChartBar } from 'react-icons/fa'; // Using react-icons

const BMI = () => {
    const [unit, setUnit] = useState('metric'); // 'metric' or 'imperial'
    const [weight, setWeight] = useState('');
    const [heightCm, setHeightCm] = useState('');
    const [heightFt, setHeightFt] = useState('');
    const [heightIn, setHeightIn] = useState('');
    const [bmiResult, setBmiResult] = useState(null); // { bmi: number, category: string, advice: string, categoryClass: string }
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); // For input validation

    const switchUnit = (newUnit) => {
        setUnit(newUnit);
        setWeight('');
        setHeightCm('');
        setHeightFt('');
        setHeightIn('');
        setBmiResult(null); // Reset result when unit changes
        setErrors({});
    };

    const validateInputs = () => {
        const newErrors = {};
        const w = parseFloat(weight);

        if (!w || w <= 0 || w > (unit === 'metric' ? 500 : 1100)) { // kg vs lbs rough max
            newErrors.weight = `Please enter a valid weight in ${unit === 'metric' ? 'kg' : 'lbs'}`;
        }

        if (unit === 'metric') {
            const hCm = parseFloat(heightCm);
            if (!hCm || hCm < 50 || hCm > 300) {
                newErrors.heightCm = 'Please enter a valid height in cm (50-300)';
            }
        } else {
            const ft = parseInt(heightFt);
            const inch = parseInt(heightIn || '0'); // Default inches to 0 if empty
            if (!ft || ft < 3 || ft > 8 || inch < 0 || inch > 11) {
                newErrors.heightFt = 'Please enter valid feet (3-8) and inches (0-11)';
                // Don't flag inches separately if feet are invalid
                if (inch < 0 || inch > 11) newErrors.heightIn = true; // Flag for styling
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const calculateBMI = () => {
        if (!validateInputs()) return;

        setLoading(true);
        setBmiResult(null); // Clear previous result

        setTimeout(() => { // Simulate calculation delay
            try {
                let w = parseFloat(weight);
                let hMeters;

                if (unit === 'metric') {
                    hMeters = parseFloat(heightCm) / 100;
                } else {
                    const ft = parseInt(heightFt);
                    const inch = parseInt(heightIn || '0');
                    const totalInches = (ft * 12) + inch;
                    hMeters = totalInches * 0.0254;
                    w = w * 0.453592; // Convert lbs to kg
                }

                if (hMeters <= 0 || w <= 0) {
                     throw new Error("Invalid height or weight");
                }

                const bmi = w / (hMeters * hMeters);
                let category = "";
                let categoryClass = "";
                let advice = "";

                if (bmi < 18.5) {
                    category = "Underweight";
                    categoryClass = "underweight"; // Class for styling
                    advice = "Consider consulting a healthcare provider for healthy weight gain advice.";
                } else if (bmi < 25) {
                    category = "Normal";
                    categoryClass = "normal";
                    advice = "Great! Maintain your healthy lifestyle with balanced nutrition and exercise.";
                } else if (bmi < 30) {
                    category = "Overweight";
                    categoryClass = "overweight";
                    advice = "Consider healthier eating habits and increased physical activity.";
                } else {
                    category = "Obese";
                    categoryClass = "obese";
                    advice = "Consult a healthcare provider for a personalized weight management plan.";
                }

                setBmiResult({
                    bmi: bmi.toFixed(1),
                    category,
                    advice,
                    categoryClass
                });

            } catch (error) {
                console.error("BMI calculation error:", error);
                // Optionally show a toast error here
                setErrors({ general: 'Could not calculate BMI. Please check inputs.' });
            } finally {
                setLoading(false);
            }
        }, 800); // Shorter delay than HTML version
    };

    // Calculate indicator position for the scale
    const getIndicatorPosition = () => {
        if (!bmiResult) return '0%';
        const bmi = parseFloat(bmiResult.bmi);
        let position = 0;
        if (bmi < 18.5) {
            position = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
            position = 25 + ((bmi - 18.5) / 6.5) * 35;
        } else if (bmi < 30) {
            position = 60 + ((bmi - 25) / 5) * 25;
        } else {
            position = 85 + ((bmi - 30) / 10) * 15; // Cap slightly below 100%
        }
        return `${Math.min(98, Math.max(2, position))}%`; // Clamp between 2% and 98%
    };

    return (
        // Applying styles inspired by BMIcheck.html
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 flex items-center justify-center p-4 relative overflow-hidden animate-fadeIn">
            {/* Back Arrow */}
            <Link
                to="/"
                className="fixed top-4 left-4 z-20 flex items-center gap-2 text-sm text-purple-200 bg-gray-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-purple-500/30"
            >
                <FaArrowLeft /> Home
            </Link>

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 md:gap-8 z-10">
                {/* Calculator Panel */}
                <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col animate-fadeInUp">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                        BMI Calculator
                    </h1>

                    {/* Unit Toggle */}
                    <div className="flex bg-gray-800/50 p-1 rounded-lg mb-6">
                        <button
                            onClick={() => switchUnit('metric')}
                            className={`flex-1 py-2 px-3 text-sm rounded-md transition-all duration-300 ${unit === 'metric' ? 'bg-purple-600 text-white shadow-md' : 'text-purple-300 hover:bg-purple-500/10'}`}
                        >
                            Metric (kg, cm)
                        </button>
                        <button
                            onClick={() => switchUnit('imperial')}
                            className={`flex-1 py-2 px-3 text-sm rounded-md transition-all duration-300 ${unit === 'imperial' ? 'bg-purple-600 text-white shadow-md' : 'text-purple-300 hover:bg-purple-500/10'}`}
                        >
                            Imperial (lbs, ft, in)
                        </button>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4 flex-grow">
                        <div className="relative">
                            <label htmlFor="weight" className="block text-sm font-medium text-purple-200 mb-1">
                                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                            </label>
                            <input
                                type="number"
                                id="weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
                                min="1"
                                step="0.1"
                                className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.weight ? 'border-red-500/60' : 'border-purple-500/40'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300`}
                                aria-invalid={!!errors.weight}
                                aria-describedby="weight-error"
                            />
                            {errors.weight && <p id="weight-error" className="text-red-400 text-xs mt-1">{errors.weight}</p>}
                        </div>

                        {unit === 'metric' ? (
                            <div className="relative">
                                <label htmlFor="heightCm" className="block text-sm font-medium text-purple-200 mb-1">
                                    Height (cm)
                                </label>
                                <input
                                    type="number"
                                    id="heightCm"
                                    value={heightCm}
                                    onChange={(e) => setHeightCm(e.target.value)}
                                    placeholder="Enter height in cm"
                                    min="50"
                                    max="300"
                                    step="0.1"
                                    className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.heightCm ? 'border-red-500/60' : 'border-purple-500/40'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300`}
                                     aria-invalid={!!errors.heightCm}
                                     aria-describedby="heightCm-error"
                                />
                                {errors.heightCm && <p id="heightCm-error" className="text-red-400 text-xs mt-1">{errors.heightCm}</p>}
                            </div>
                        ) : (
                            <div className="relative">
                                <label className="block text-sm font-medium text-purple-200 mb-1">
                                    Height (ft / in)
                                </label>
                                <div className="flex gap-3">
                                    <input
                                        type="number"
                                        id="heightFt"
                                        value={heightFt}
                                        onChange={(e) => setHeightFt(e.target.value)}
                                        placeholder="Feet"
                                        min="3" max="8" step="1"
                                        className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.heightFt ? 'border-red-500/60' : 'border-purple-500/40'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300`}
                                        aria-invalid={!!errors.heightFt}
                                        aria-describedby="heightFt-error"
                                    />
                                    <input
                                        type="number"
                                        id="heightIn"
                                        value={heightIn}
                                        onChange={(e) => setHeightIn(e.target.value)}
                                        placeholder="Inches"
                                        min="0" max="11" step="1"
                                        className={`w-full px-4 py-3 bg-gray-800/50 border ${errors.heightFt || errors.heightIn ? 'border-red-500/60' : 'border-purple-500/40'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300`}
                                        aria-invalid={!!errors.heightFt} /* Flagged by heightFt error */
                                        aria-describedby="heightFt-error"
                                    />
                                </div>
                                {errors.heightFt && <p id="heightFt-error" className="text-red-400 text-xs mt-1">{errors.heightFt}</p>}
                            </div>
                        )}
                        {errors.general && <p className="text-red-400 text-sm mt-1 text-center">{errors.general}</p>}
                    </div>


                    {/* Calculate Button */}
                    <button
                        onClick={calculateBMI}
                        disabled={loading}
                        className="w-full mt-6 flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                             <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Calculating...
                             </>
                        ) : (
                            'Calculate BMI'
                        )}
                    </button>
                </div>

                {/* Results Panel */}
                <div className={`bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-500 animate-fadeInUp animation-delay-200 ${bmiResult ? '' : 'justify-center'}`}>
                    {bmiResult ? (
                        <div className="text-center w-full animate-fadeIn">
                            {/* Circle with dynamic border color */}
                            <div className={`mx-auto mb-6 w-36 h-36 rounded-full border-4 flex items-center justify-center shadow-lg transition-colors duration-500 border-${bmiResult.categoryClass}-border bg-gradient-to-br from-${bmiResult.categoryClass}-bg/10 via-transparent to-${bmiResult.categoryClass}-bg/10`}>
                                <span className={`text-4xl font-bold text-${bmiResult.categoryClass}-text`}>{bmiResult.bmi}</span>
                            </div>
                            {/* Category text with dynamic color */}
                            <p className={`text-2xl font-semibold mb-3 uppercase tracking-wider text-${bmiResult.categoryClass}-text`}>
                                {bmiResult.category}
                            </p>
                            <p className="text-sm text-purple-200/80 mb-6 max-w-xs mx-auto">{bmiResult.advice}</p>

                            {/* Scale */}
                            <div className="w-full max-w-xs mx-auto">
                                <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-55% to-yellow-400 to-80% to-red-400 relative mb-1.5">
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transition-all duration-1000 ease-out"
                                        style={{ left: getIndicatorPosition() }}
                                        title={`Your BMI: ${bmiResult.bmi}`}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-purple-300/60">
                                    <span>18.5</span>
                                    <span>25</span>
                                    <span>30</span>
                                    <span>40+</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-purple-300/60 animate-fadeIn">
                            <FaChartBar size={50} className="mx-auto mb-4 opacity-30" />
                            <h3 className="text-lg font-semibold mb-2">Your BMI Result</h3>
                            <p className="text-sm">Enter your details to see your Body Mass Index.</p>
                        </div>
                    )}
                </div>
            </div>
             {/* Dynamic styles for category colors - requires Tailwind JIT or safelisting */}
             <style>{`
                 .border-underweight-border { border-color: #87ceeb; }
                 .text-underweight-text { color: #87ceeb; }
                 .from-underweight-bg\\/10 { --tw-gradient-from: rgba(135, 206, 235, 0.1) var(--tw-gradient-from-position); --tw-gradient-to: rgba(135, 206, 235, 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
                 .to-underweight-bg\\/10 { --tw-gradient-to: rgba(135, 206, 235, 0.1) var(--tw-gradient-to-position); }

                 .border-normal-border { border-color: #90ee90; }
                 .text-normal-text { color: #90ee90; }
                 .from-normal-bg\\/10 { --tw-gradient-from: rgba(144, 238, 144, 0.1) var(--tw-gradient-from-position); --tw-gradient-to: rgba(144, 238, 144, 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
                 .to-normal-bg\\/10 { --tw-gradient-to: rgba(144, 238, 144, 0.1) var(--tw-gradient-to-position); }

                 .border-overweight-border { border-color: #ffd700; }
                 .text-overweight-text { color: #ffd700; }
                 .from-overweight-bg\\/10 { --tw-gradient-from: rgba(255, 215, 0, 0.1) var(--tw-gradient-from-position); --tw-gradient-to: rgba(255, 215, 0, 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
                 .to-overweight-bg\\/10 { --tw-gradient-to: rgba(255, 215, 0, 0.1) var(--tw-gradient-to-position); }

                 .border-obese-border { border-color: #ff6b6b; }
                 .text-obese-text { color: #ff6b6b; }
                 .from-obese-bg\\/10 { --tw-gradient-from: rgba(255, 107, 107, 0.1) var(--tw-gradient-from-position); --tw-gradient-to: rgba(255, 107, 107, 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
                 .to-obese-bg\\/10 { --tw-gradient-to: rgba(255, 107, 107, 0.1) var(--tw-gradient-to-position); }

                 @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                 }
                .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
                 .animation-delay-200 { animation-delay: 0.2s; }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                 }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
             `}</style>
        </div>
    );
};

export default BMI;