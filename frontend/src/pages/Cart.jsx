import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaCreditCard, FaTags } from 'react-icons/fa'; // Using react-icons
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import { apiCall } from '../api'; // Import apiCall directly for placing order

const Cart = () => {
    const { cart, removeFromCart, cartTotal, loading: cartLoading, setCart } = useCart();
    const { isAuthenticated } = useAuth();
    const showToast = useToast();
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState('');
    const [promoCode, setPromoCode] = useState(''); // State for promo code input
    const [discount, setDiscount] = useState(0); // Discount percentage
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    // Dummy promo codes - in a real app, verify this on the backend
    const promoCodes = {
        'SAVE10': 10,
        'WELCOME20': 20,
        'FITVIBE15': 15,
    };

    const handleApplyPromo = () => {
        const code = promoCode.trim().toUpperCase();
        if (promoCodes[code]) {
            setDiscount(promoCodes[code]);
            showToast(`Applied ${promoCodes[code]}% discount!`, 'success');
        } else {
            setDiscount(0); // Reset discount if code is invalid
            showToast('Invalid promo code', 'error');
        }
    };

    const subtotal = cartTotal;
    const discountAmount = (subtotal * discount) / 100;
    // Add dummy tax/shipping if needed, or get from backend
    const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 5; // Example: Free shipping over $50
    const taxAmount = (subtotal - discountAmount) * 0.05; // Example: 5% tax
    const finalTotal = subtotal - discountAmount + shippingCost + taxAmount;

    const handlePlaceOrder = async () => {
        if (!shippingAddress.trim()) {
            showToast('Please enter a shipping address', 'error');
            return;
        }
        if (!isAuthenticated) {
            showToast('Please login to place an order', 'error');
            navigate('/login');
            return;
        }

        setIsPlacingOrder(true);
        try {
            const orderData = {
                // Backend expects an object, match its structure
                shippingAddress: {
                    fullAddress: shippingAddress,
                    // You might add more fields like city, zip if needed
                },
                // Add paymentInfo if required by your backend
                // paymentInfo: { method: "MockPayment" }
            };

            await apiCall('/order', {
                method: 'POST',
                body: JSON.stringify(orderData),
            });

            showToast('Order placed successfully! 🎉', 'success');
            setCart([]); // Immediately clear cart in frontend state
            // CartContext's fetchCart might run again, but this provides instant feedback
            // Optionally fetch orders in profile context or navigate differently
            navigate('/profile'); // Redirect to profile to see order history

        } catch (error) {
            showToast(error.message || 'Failed to place order 😥', 'error');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    // Placeholder for quantity update - CartContext doesn't have this,
    // so we just show the quantity or allow removal.
    // If quantity update is needed, add updateCartItemQuantity to CartContext.
    // const handleUpdateQuantity = (productId, change) => {
    //    console.log("Update quantity for", productId, "by", change);
    //    // Call context function here: updateCartItemQuantity(productId, newQuantity);
    // }

    return (
        // Applying styles inspired by cart.html
        <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black text-purple-100 p-4 pt-24 md:p-8 animate-fadeIn">

            {/* Main Grid */}
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

                {/* Cart Items Section (takes 2 columns on large screens) */}
                <div className="lg:col-span-2 bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden animate-fadeInUp">
                    {/* Shimmer effect */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer"></div>

                    <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                        <FaShoppingCart /> Your Cart
                    </h2>

                    {cartLoading && <p className="text-center text-purple-300">Loading cart...</p>}

                    {!cartLoading && cart.length === 0 && (
                        <div className="text-center py-16 text-purple-300/70">
                            <FaShoppingCart size={60} className="mx-auto mb-6 opacity-30 animate-float" />
                            <p className="text-xl font-semibold mb-3">Your cart is empty</p>
                            <p className="mb-6">Looks like you haven't added anything yet.</p>
                            <Link
                                to="/shop" // Link to the Shop page
                                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                <FaPlus className="inline mr-2" /> Start Shopping
                            </Link>
                        </div>
                    )}

                    {!cartLoading && cart.length > 0 && (
                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item, index) => (
                                <div
                                    key={item._id || item.productId?._id || index} // Use a stable key
                                    className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-purple-500/20 hover:bg-purple-500/10 transition-all duration-300 relative overflow-hidden group animate-slideInUp"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Shimmer on hover */}
                                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent transition-all duration-700 group-hover:left-[100%]"></div>

                                    <img
                                        src={item.productId?.imageURL || 'https://via.placeholder.com/80?text=FitVibe'}
                                        alt={item.productId?.name || 'Product Image'}
                                        className="w-20 h-20 object-cover rounded-md flex-shrink-0 border border-purple-500/30"
                                    />
                                    <div className="flex-grow text-center sm:text-left">
                                        <h3 className="font-semibold text-lg text-purple-200">{item.productId?.name || 'Unknown Product'}</h3>
                                        <p className="text-sm text-purple-300/80 mb-1">
                                            Price: ₹{(item.productId?.price || 0).toFixed(2)}
                                        </p>
                                        {/* Display tags/features if available in your product data */}
                                        {/* <div className="flex gap-1 flex-wrap justify-center sm:justify-start">
                                            <span className="text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full border border-purple-700">{item.productId?.category || 'N/A'}</span>
                                        </div> */}
                                    </div>
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        {/* Quantity Display (No Controls as per context) */}
                                        <div className="flex items-center justify-center bg-gray-700/50 rounded-full px-3 py-1 border border-purple-500/30">
                                            <span className="font-semibold text-purple-200">Qty: {item.quantity}</span>
                                        </div>

                                        <p className="font-bold text-lg text-green-400 w-20 text-right">
                                            ₹{((item.productId?.price || 0) * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(item.productId?._id)}
                                            className="w-9 h-9 flex items-center justify-center bg-red-600/20 text-red-400 rounded-full border border-red-500/30 hover:bg-red-500/30 hover:text-red-300 transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                                            title="Remove item"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Summary Section (takes 1 column) */}
                <div className="lg:col-span-1">
                     <div className="bg-gray-900/70 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 sticky top-24 animate-fadeInUp animation-delay-200">
                        <h3 className="text-xl font-bold text-center mb-6 text-purple-300">Order Summary</h3>

                        <div className="space-y-3 mb-5 text-sm">
                            <div className="flex justify-between text-purple-200/90">
                                <span>Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-400">
                                    <span>Discount ({discount}%)</span>
                                    <span>-₹{discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-purple-200/90">
                                <span>Shipping</span>
                                <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-purple-200/90 pb-3 border-b border-purple-500/20">
                                <span>Est. Tax (5%)</span>
                                <span>₹{taxAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-3 text-purple-100">
                                <span>Order Total</span>
                                <span className="text-green-400">₹{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Promo Code */}
                        <div className="mb-6">
                            <label htmlFor="promo-code" className="block text-xs font-medium text-purple-300 mb-1">Promo Code</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="promo-code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="Enter code"
                                    className="flex-grow px-3 py-2 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition"
                                />
                                <button
                                    onClick={handleApplyPromo}
                                    className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-500 transition-colors flex items-center gap-1"
                                >
                                   <FaTags size={12}/> Apply
                                </button>
                            </div>
                        </div>

                         {/* Shipping Address */}
                         <div className="mb-6">
                            <label htmlFor="shippingAddress" className="block text-sm font-medium text-purple-200 mb-1">
                                Shipping Address
                            </label>
                            <textarea
                                id="shippingAddress"
                                rows="3"
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                placeholder="Enter your full shipping address..."
                                required
                                className="w-full px-4 py-3 bg-gray-800/50 border border-purple-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 text-sm"
                            ></textarea>
                         </div>


                        <button
                            onClick={handlePlaceOrder}
                            disabled={cart.length === 0 || isPlacingOrder || !isAuthenticated}
                            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-green-500/40 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                        >
                            {isPlacingOrder ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Placing Order...
                                </>
                            ) : (
                                <>
                                    <FaCreditCard /> Place Order
                                </>
                            )}
                        </button>
                         {!isAuthenticated && cart.length > 0 && (
                              <p className="text-center text-xs text-yellow-400 mt-3">Please log in to place your order.</p>
                         )}
                    </div>
                </div>
            </div>

            {/* Add styles for animations and scrollbar */}
            <style>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%) skewX(-20deg); }
                  100% { transform: translateX(100%) skewX(-20deg); }
                }
                .animate-shimmer { animation: shimmer 1.5s infinite linear; }

                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-8px); }
                }
               .animate-float { animation: float 3s ease-in-out infinite; }

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

                 @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                 }
                .animate-slideInUp { animation: slideInUp 0.4s ease-out forwards; opacity: 0; }

                /* Custom Scrollbar for Cart Items */
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(51, 51, 51, 0.3);
                  border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #cc66ff, #DA70D6);
                  border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                   background: linear-gradient(180deg, #DA70D6, #e08aff);
                }
            `}</style>
        </div>
    );
};

export default Cart;