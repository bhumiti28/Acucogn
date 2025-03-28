import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Contact from '../sections/Contact';

const SinglePageHome = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash-based navigation (e.g., /#about, /#services)
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Scroll to top when no hash is present
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="scroll-smooth">
      {/* Home Section */}
      <section id="home" className="min-h-screen">
        <HomePage />
      </section>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen">
        <About />
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen">
        <Services />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen">
        <Contact />
      </section>
    </div>
  );
};

export default SinglePageHome;