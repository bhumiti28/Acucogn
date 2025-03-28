import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/50 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
            AcuCogn
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a 
            onClick={() => scrollToSection('home')} 
            className="text-white hover:text-primary-500 cursor-pointer"
          >
            Home
          </a>
          <a 
            onClick={() => scrollToSection('about')} 
            className="text-white hover:text-primary-500 cursor-pointer"
          >
            About
          </a>
          <a 
            onClick={() => scrollToSection('services')} 
            className="text-white hover:text-primary-500 cursor-pointer"
          >
            Service
          </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="text-white hover:text-primary-500 cursor-pointer"
          >
            Contact Us
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md py-4 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a 
              onClick={() => scrollToSection('home')} 
              className="text-white hover:text-primary-500 cursor-pointer"
            >
              Home
            </a>
            <a 
              onClick={() => scrollToSection('about')} 
              className="text-white hover:text-primary-500 cursor-pointer"
            >
              About
            </a>
            <a 
              onClick={() => scrollToSection('services')} 
              className="text-white hover:text-primary-500 cursor-pointer"
            >
              Service
            </a>
            <a 
              onClick={() => scrollToSection('contact')} 
              className="text-white hover:text-primary-500 cursor-pointer"
            >
              Contact Us
            </a>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all w-full mt-4"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;