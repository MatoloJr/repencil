import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import About from './pages/About';
import Products from './pages/Products';
import Sustainability from './pages/Sustainability';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/sustainability" element={<Sustainability />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/order" element={<Order />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute roles={['manufacturer', 'admin']}>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
                <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Placeholder component for pages not yet implemented
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          This page is coming soon. We're working hard to bring you more content!
        </p>
      </div>
    </div>
  );
};

export default App;