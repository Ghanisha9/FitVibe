import React from 'react';
// Import BrowserRouter specifically, and rename it to Router for clarity
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

// Import Components
import Header from './components/Header';
import Footer from './components/Footer';

// Import Page Components
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
import Exercises from './pages/exercise';
import Game from './pages/Game';
import Mindfulness from './pages/mindfullness';
import Pushup from './pages/Pushup';
import Workout from './pages/Workout';
// ... import other pages ...

function App() {
  return (
    // Router MUST wrap the context providers that use routing hooks (like useNavigate)
    <Router>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen bg-black">
              <Header />
              <main className="flex-grow pt-16">
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
                  <Route path="/exercises" element={<Exercises />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/mindfulness" element={<Mindfulness/>} />
                  <Route path="/pushup" element={<Pushup />} />
                  <Route path="/workout" element={<Workout />} />
                  
                  {/* ... other routes ... */}
                  <Route path="*" element={<div className="text-center py-20 text-purple-300 text-xl">404 - Page Not Found</div>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;