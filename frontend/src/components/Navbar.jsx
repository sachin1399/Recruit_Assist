import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-black text-gray-900 tracking-tighter">
            Q<span className="text-orange-500">spiders</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/chatbot" 
            className={`text-sm font-medium transition-colors ${isActive('/chatbot') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
          >
            Interview Chatbot
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-orange-500 transition">
            Login
          </Link>
          <Link to="/signup" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;