// src/context/ToastContext.jsx
import React, { createContext, useState, useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';
import Toast from '../components/Toast';

export const ToastContext = createContext(); // ✅ Named export

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {ReactDOM.createPortal(
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

// ✅ Custom hook
export const useToast = () => useContext(ToastContext);
