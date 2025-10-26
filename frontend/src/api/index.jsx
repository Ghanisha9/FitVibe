// src/api/index.js

const API_BASE_URL = 'http://localhost:5000'; // Your backend URL

/**
 * Gets the authentication token from localStorage.
 * @returns {string|null} The token or null if not found.
 */
const getAuthToken = () => localStorage.getItem('token');

/**
 * Makes an API call to the backend.
 * Automatically adds Authorization header if a token exists.
 * Throws an error if the response is not ok.
 * @param {string} endpoint - The API endpoint (e.g., '/products').
 * @param {object} [options={}] - Optional fetch options (method, body, headers).
 * @returns {Promise<any>} The JSON response data.
 */
export const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), // Add token if present
    ...options.headers, // Allow overriding headers
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // Use the error message from the backend if available
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data; // Return the JSON data on success
  } catch (error) {
    console.error('API Call Failed:', error);
    // Re-throw the error so components can handle it (e.g., show a toast)
    throw error;
  }
};

// You can add specific API functions here if needed, e.g.:
// export const fetchProducts = () => apiCall('/products');
// export const loginUser = (email, password) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });