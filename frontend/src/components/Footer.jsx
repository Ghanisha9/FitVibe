import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // Example icons

const Footer = () => {
  return (
    // Styling adapted from the rectangle in fitvibe.html
    <footer className="bg-gradient-to-t from-black via-gray-900/80 to-gray-900/95 mt-16 py-8 border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
          Join the FitVibe Community!
        </h3>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Facebook size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
            <Instagram size={24} />
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FitVibe. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Empowering wellness through technology and innovation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;