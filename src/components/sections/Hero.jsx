import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [elementsVisible, setElementsVisible] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setElementsVisible(prev => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-600/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-red-600/20 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
          <h1 
            id="hero-title"
            className={`animate-on-scroll opacity-0 transition-opacity duration-1000 ${elementsVisible['hero-title'] ? 'opacity-100' : ''} text-4xl md:text-5xl lg:text-6xl font-bold leading-tight`}
          >
            <span className="block">Automate To Elevate</span>
            <span className="block mt-2 md:mt-4">
              <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                Your Business,
              </span>{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Our Automations
              </span>
            </span>
          </h1>
          
          <p 
            id="hero-description"
            className={`animate-on-scroll opacity-0 transition-opacity duration-1000 delay-300 max-w-2xl text-lg md:text-xl text-gray-300 ${elementsVisible['hero-description'] ? 'opacity-100' : ''}`}
          >
            Transform your business operations with AI-powered automation. Our intelligent bots handle your routine tasks, freeing you to focus on growth and innovation.
          </p>
          
          <div 
            id="hero-buttons"
            className={`animate-on-scroll opacity-0 transition-opacity duration-1000 delay-500 flex flex-wrap gap-4 justify-center ${elementsVisible['hero-buttons'] ? 'opacity-100' : ''}`}
          >
            <button 
              className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium hover:opacity-90 transition-opacity"
              onClick={() => scrollToSection('contact')}
            >
              Get Started
            </button>
            <button 
              className="px-6 py-3 rounded-full border border-gray-600 hover:border-gray-400 text-white font-medium hover:bg-white/5 transition"
              onClick={() => scrollToSection('services')}
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Service cards grid */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-white text-xl">
          {[
         { 
            icon: "🤖", 
            title: "AI Lead Generation", 
            color: "from-blue-500 to-purple-500" 
          },
          { 
            icon: "💬", 
            title: "AI Website Chatbot", 
            color: "from-red-500 to-orange-500" 
          },
          { 
            icon: "📅", 
            title: "AI Appointments", 
            color: "from-green-500 to-teal-500" 
          },
          // { icon: "📱", title: "Telegram", color: "from-blue-400 to-indigo-600" },
          // { icon: "🎮", title: "Discord", color: "from-indigo-500 to-purple-700" },
          { 
            icon: "🛒", 
            title: "E Commerce Automation", 
            color: "from-yellow-400 to-orange-600" 
          },
          { 
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current">
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
            </svg>,
            title: "Instagram Automation", 
            color: "from-pink-500 to-purple-500" 
          },
          { 
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-6 h-6 fill-current">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>,
            title: "Whatsapp Automation", 
            color: "from-green-500 to-emerald-700" 
          }
          ].map((service, index) => (
            <div 
              key={index}
              id={`service-${index}`}
              className={`animate-on-scroll opacity-0 transition-all duration-700 delay-300 ${elementsVisible[`service-${index}`] ? 'opacity-100' : ''}`}
            >
              <div 
                className="relative overflow-hidden rounded-3xl p-6 h-32 flex items-center justify-center group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-70 group-hover:opacity-90 transition-opacity`} />
                <div className="absolute inset-0 border border-white/20 rounded-3xl" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="text-2xl mb-2">{service.icon}</span>
                  <h3 className="font-medium">{service.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;