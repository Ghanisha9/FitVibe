import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaArrowLeft, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa'; // Using react-icons
import ProductCard from '../components/ProductCard'; // Import the ProductCard component
import { apiCall } from '../api';
import { useToast } from '../hooks/useToast';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const showToast = useToast();

    // Filter and Sort State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState(''); // 'price_asc' or 'price_desc'
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    // Debounce search input to avoid excessive API calls
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // Wait 500ms after user stops typing

        // Cleanup function to cancel the timeout if the user types again
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);

    // Fetch products whenever filters or debounced search query change
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Construct query parameters
            const params = new URLSearchParams();
            if (debouncedSearchQuery) params.append('q', debouncedSearchQuery);
            if (selectedCategory) params.append('category', selectedCategory);
            if (sortBy) params.append('sort', sortBy);
            // Add minPrice/maxPrice here if you implement price range filters

            const queryString = params.toString();
            const data = await apiCall(`/products${queryString ? `?${queryString}` : ''}`);
            setProducts(data || []); // Ensure products is always an array
        } catch (err) {
            setError('Failed to load products. Please try refreshing.');
            showToast('Could not load products 😥', 'error');
            console.error("Fetch products error:", err);
            setProducts([]); // Clear products on error
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchQuery, selectedCategory, sortBy, showToast]); // Dependencies for useCallback

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // fetchProducts is now stable due to useCallback

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

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                    FitVibe Shop
                </h1>

                {/* Filters Section */}
                <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-xl p-4 sm:p-6 mb-8 sticky top-20 z-10 animate-fadeInUp">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <label htmlFor="search" className="sr-only">Search Products</label>
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 opacity-70" />
                            <input
                                type="text"
                                id="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 text-sm"
                            />
                        </div>

                        {/* Category Select */}
                        <div className="relative">
                             <label htmlFor="category" className="sr-only">Filter by Category</label>
                             <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 opacity-70 pointer-events-none" size={14}/>
                             <select
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full appearance-none pl-10 pr-8 py-2.5 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 text-sm cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                <option value="apparel">Apparel</option>
                                <option value="equipment">Equipment</option>
                                <option value="supplements">Supplements</option>
                                {/* Add more categories if needed */}
                            </select>
                             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current text-purple-400 opacity-70" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>

                        {/* Sort Select */}
                        <div className="relative sm:col-span-2 lg:col-span-1">
                             <label htmlFor="sort" className="sr-only">Sort By</label>
                              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 opacity-70 pointer-events-none">
                                {sortBy === 'price_desc' ? <FaSortAmountUp size={14} /> : <FaSortAmountDown size={14} />}
                             </div>
                             <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full appearance-none pl-10 pr-8 py-2.5 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 text-sm cursor-pointer"
                            >
                                <option value="">Default Sort</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                {/* Add other sort options if needed (e.g., name, newest) */}
                            </select>
                             <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current text-purple-400 opacity-70" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid / Loading / Error */}
                {loading ? (
                    <div className="text-center py-20">
                         <FaSyncAlt className="animate-spin h-10 w-10 text-purple-400 mx-auto" />
                         <p className="mt-3 text-purple-300">Loading Products...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-900/20 border border-red-500/40 rounded-lg">
                        <FaExclamationTriangle className="h-10 w-10 text-red-400 mx-auto mb-3" />
                        <p className="text-red-300">{error}</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800/30 rounded-lg">
                        <p className="text-xl text-purple-300/80">No products match your criteria.</p>
                        <p className="text-sm text-purple-400/60 mt-2">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div
                                key={product._id}
                                className="animate-fadeInUp"
                                style={{ animationDelay: `${index * 50}ms` }} // Stagger animation
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add animations if needed */}
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

export default Shop;