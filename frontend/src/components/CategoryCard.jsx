import React from 'react';

const CategoryCard = ({ title, icon, description, onClick, image }) => (
  <div
    onClick={onClick}
    className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-purple-500/30 border border-purple-500/20 hover:border-purple-500/50"
  >
    <img
      src={image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'} // Default image
      alt={title}
      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
    {/* Content */}
    <div className="absolute inset-0 p-5 flex flex-col justify-end">
      <div className="text-purple-400 mb-2 transition-transform duration-300 group-hover:translate-y-[-5px]">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-1 text-white transition-colors duration-300 group-hover:text-purple-300">{title}</h3>
      <p className="text-purple-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
    </div>
  </div>
);

export default CategoryCard;