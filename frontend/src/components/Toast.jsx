import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react'; // Using lucide-react icons

const Toast = ({ message, type = 'info', onClose }) => {
  // Automatically close after a delay (this logic is primarily handled in ToastContext)
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Give slightly longer for fade-out animation if any
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertTriangle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />, // You can customize warning icon
  };

  const colors = {
    success: 'bg-gradient-to-r from-green-500 to-emerald-500', // Success gradient
    error: 'bg-gradient-to-r from-red-500 to-rose-500', // Error gradient
    info: 'bg-gradient-to-r from-blue-500 to-sky-500', // Info gradient
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-500', // Warning gradient
  };

  return (
    // Applying styles similar to the static HTML versions
    <div
      className={`animate-slide-up flex items-center gap-3 ${colors[type]} text-white px-5 py-3 rounded-full shadow-lg max-w-sm transition-opacity duration-300`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      {icons[type]}
      <span className="flex-grow text-sm font-semibold">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/70 hover:text-white transition-colors">
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;