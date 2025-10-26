import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext'; // To add items

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation if the card itself is clickable
    addToCart(product._id);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 rounded-2xl overflow-hidden border border-purple-500/30 backdrop-blur-sm hover:border-purple-400 transition-all duration-300 group shadow-md hover:shadow-purple-500/20 transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img
          src={product.imageURL || 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?w=400'} // Default image
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-purple-200 group-hover:text-purple-100 transition-colors">{product.name}</h3>
        {/* Using line-clamp utility from index.css */}
        <p className="text-purple-300 text-sm mb-3 line-clamp-2 h-[2.5em]">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-black text-purple-400 group-hover:text-purple-300 transition-colors">${product.price?.toFixed(2) || '0.00'}</span>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 rounded-full text-xs font-bold text-white hover:from-purple-500 hover:to-pink-500 transition-all duration-300 flex items-center gap-1 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform group-hover:scale-105"
            disabled={product.stock <= 0} // Disable if out of stock
          >
            <Plus size={14} strokeWidth={3} /> Add
          </button>
        </div>
        <div className="mt-2 text-xs text-purple-400/80 flex justify-between">
          <span>{product.category || 'N/A'}</span>
          <span>Stock: {product.stock > 0 ? product.stock : <span className="text-red-400">Out</span>}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;