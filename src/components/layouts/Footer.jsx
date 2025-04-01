import React, { useState } from 'react';
import { FaLinkedin, FaInstagram, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show/hide scroll to top button based on scroll position
  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to specific section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle email click to open default email client
  const handleEmailClick = () => {
    window.location.href = 'mailto:sales@acucogn.com';
  };

  // Handle newsletter subscription using FormSubmit
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscribeStatus(null);
    
    try {
      // Using FormSubmit service - no API keys needed
      const response = await fetch('https://formsubmit.co/ajax/sales@acucogn.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          message: 'Newsletter Subscription Request',
          formType: 'newsletter'
        })
      });

      const result = await response.json();
      
      if (result.success === 'true' || result.success === true) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('error');
        setError('Failed to subscribe. Please try again later.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeStatus('error');
      setError('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white relative">
      {/* Scroll to Top Button */}
      {isVisible && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 z-50 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-full shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1 transition-all duration-300"
          aria-label="Scroll to Top"
        >
          <FaChevronUp size={24} />
        </button>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  onClick={() => scrollToSection('home')} 
                  className="hover:text-primary-500 transition cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-primary-500 transition cursor-pointer"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('services')} 
                  className="hover:text-primary-500 transition cursor-pointer"
                >
                  Service
                </a>
              </li>
              <li>
                <a 
                  onClick={() => scrollToSection('contact')} 
                  className="hover:text-primary-500 transition cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center mb-6 md:mb-0">
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Socials</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/acucogn/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24} className="hover:text-primary-500 transition" />
              </a>
              <a href="https://www.instagram.com/acucognai" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="hover:text-primary-500 transition" />
              </a>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Contact Us</h3>
              <p 
                className="text-gray-400 cursor-pointer hover:text-primary-500 transition"
                onClick={handleEmailClick}
              >
                sales@acucogn.com
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Subscribe to Newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="w-full">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                      setSubscribeStatus(null);
                    }}
                    className="w-full px-4 py-2 rounded-md bg-[#1E1E1E] text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={isSubscribing}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                  )}
                </div>
                <button 
                  type="submit" 
                  className={`w-full sm:w-auto ${isSubscribing 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg hover:shadow-primary-500/30 transform hover:-translate-y-1'
                  } text-white px-4 py-2 rounded-full transition-all duration-300`}
                  disabled={isSubscribing}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              {/* Subscription Status Messages */}
              {subscribeStatus === 'success' && (
                <div className="mt-2 p-2 bg-green-600/20 border border-green-500 rounded-md text-green-400 text-sm text-center">
                  Successfully subscribed to our newsletter!
                </div>
              )}
              {subscribeStatus === 'error' && (
                <div className="mt-2 p-2 bg-red-600/20 border border-red-500 rounded-md text-red-400 text-sm text-center">
                  Failed to subscribe. Please try again later.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 border-t border-gray-800 pt-6 mt-8">
          © 2025 AcuCogn. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;