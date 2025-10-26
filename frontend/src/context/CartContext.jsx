import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiCall } from '../api';
import { useAuth } from './AuthContext'; // Need auth context to know if user is logged in
import { useToast } from './ToastContext'; // For showing messages

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get user state
  const showToast = useToast();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart when user logs in or page loads if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]); // Clear cart if user logs out
    }
  }, [isAuthenticated]); // Dependency on authentication status

  const fetchCart = async () => {
    if (!isAuthenticated) return; // Don't fetch if not logged in
    setLoading(true);
    try {
      const data = await apiCall('/cart');
      setCart(data || []); // Ensure cart is an array even if API returns null/undefined
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // Only show error if it's not a 401/403 (handled by auth check)
      if (error.message !== 'Access token required' && error.message !== 'Invalid or expired token') {
        showToast('Could not load cart 🛒', 'error');
      }
      setCart([]); // Reset cart on error
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      showToast('Please login to add items to cart 🚫', 'error');
      // Consider navigating to login page here if needed
      return;
    }
    setLoading(true);
    try {
      await apiCall('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity }),
      });
      showToast('Item added to cart! ✅', 'success');
      await fetchCart(); // Refresh cart state from backend after adding
    } catch (error) {
      showToast(error.message || 'Failed to add item 😥', 'error');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      await apiCall(`/cart/${productId}`, { method: 'DELETE' });
      showToast('Item removed from cart 🗑️', 'info');
      await fetchCart(); // Refresh cart state after removing
    } catch (error) {
      showToast(error.message || 'Failed to remove item 😥', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Calculate cart count and total based on the current cart state
  const cartItemCount = cart.reduce((count, item) => count + (item.quantity || 0), 0);

  const cartTotal = cart.reduce((total, item) => {
    const price = item.productId?.price || 0; // Safely access price
    const quantity = item.quantity || 0;
    return total + price * quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart, removeFromCart, loading, cartItemCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => useContext(CartContext);