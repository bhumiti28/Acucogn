import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import SinglePageHome from './components/layouts/SinglePageHome';

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
        <Navbar />
        <main className="flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={<SinglePageHome />} />
            {/* Redirect all other routes to the homepage with appropriate section anchor */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            {/* Fallback for any other routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;