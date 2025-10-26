import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BMI from './pages/BMI';
import Yoga from './pages/Yoga';
import Zumba from './pages/Zumba';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/bmi" element={<BMI />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/zumba" element={<Zumba />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
