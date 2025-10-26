// src/hooks/useToast.js
import { useContext } from 'react';
// Correct the import path based on your context folder structure
import { ToastContext } from '../context/ToastContext';

/**
 * Custom hook to easily access the showToast function from ToastContext.
 * @returns {function(message: string, type?: string, duration?: number): void} The showToast function.
 */
export const useToast = () => {
  const showToast = useContext(ToastContext);
  if (showToast === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return showToast;
};

// You don't need a default export if you only have one named export
// export default useToast; // This line is not needed