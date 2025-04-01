import React, { useEffect, useState, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import AnimatedRobot from './AnimatedRobot';

const HomePage = ({ scrollTo }) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [bubbleAnimations, setBubbleAnimations] = useState({});
  const [boatPosition, setBoatPosition] = useState(0);
  const [waveHeight, setWaveHeight] = useState(0);
    
  // Refs for scrollable sections
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Make the initial load faster
    setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Reduced from default to make initial load faster
    
    // Initialize random bubble movements
    const initialAnimations = {};
    ['gear', 'chat', 'exclamation', 'settings', 'cloud'].forEach(bubble => {
      initialAnimations[bubble] = {
        x: Math.random() * 15 - 7.5, 
        y: Math.random() * 15 - 7.5, 
        rotation: Math.random() * 30 - 15,
        animationDelay: Math.random() * 0.3 // Reduced from 0.5 for faster initial animation
      };
    });
    setBubbleAnimations(initialAnimations);
    
    // Moderate bubble movement (changed from 1000ms to 1200ms)
    const animationInterval = setInterval(() => {
      setBubbleAnimations(prev => {
        const newAnimations = {...prev};
        Object.keys(newAnimations).forEach(bubble => {
          newAnimations[bubble] = {
            x: Math.random() * 15 - 7.5,
            y: Math.random() * 15 - 7.5,
            rotation: Math.random() * 30 - 15,
            animationDelay: prev[bubble].animationDelay
          };
        });
        return newAnimations;
      });
    }, 1200);
    
    // More moderate boat animation (interval increased from 10ms to 16ms for smoother motion)
    let boatAnimFrame = 0;
    const boatAnimInterval = setInterval(() => {
      boatAnimFrame = (boatAnimFrame + 1) % 100;
      
      // Create moderate sine wave motion
      const newPosition = Math.sin(boatAnimFrame / 6) * 7; // Adjusted from 5 to 6 for slightly slower movement, amplitude 8 to 7
      const newWaveHeight = Math.sin(boatAnimFrame / 4) * 5; // Adjusted from 3 to 4, amplitude 6 to 5
      
      setBoatPosition(newPosition);
      setWaveHeight(newWaveHeight);
    }, 16); // Changed from 10ms to 16ms (roughly 60fps)
    
    return () => {
      clearInterval(animationInterval);
      clearInterval(boatAnimInterval);
    };
  }, []);

  const handleHover = (button) => {
    setHoveredButton(button);
  };

  const handleLearnMore = () => {
    navigate('/services');
  };
 
  useEffect(() => {
    let targetRef;
    switch(scrollTo) {
      case 'about':
        targetRef = aboutRef;
        break;
      case 'services':
        targetRef = servicesRef;
        break;
      case 'contact':
        targetRef = contactRef;
        break;
      default:
        return;
    }

    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollTo]);

  return (
   
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Main Content - Adjusted to account for navbar */}
      <main className="container mx-auto px-4 pt-24 md:pt-32 flex flex-col md:flex-row items-center min-h-screen">
        {/* Left Column - Faster initial animations */}
        <div className="md:w-1/2 z-10">
          <h2 
            className={`text-2xl mb-4 transform transition-all duration-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            WELCOME TO
          </h2>
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-300 delay-50 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <span className="bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 text-transparent bg-clip-text">ACUCOGN</span>
          </h1>
          <p 
            className={`text-xl mb-8 transition-all duration-300 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            Elevate your business with our<br />
            AI AUTOMATION 
          </p>
          <div 
            className={`flex space-x-4 transition-all duration-300 delay-150 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <button 
              className={`bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 rounded-full flex items-center transition-all duration-200 ${hoveredButton === 'get-started' ? 'shadow-lg shadow-primary-500/30 scale-105' : ''}`}
              onMouseEnter={() => handleHover('handleLearnMore')}
              onMouseLeave={() => handleHover(null)}
              onClick={handleLearnMore}
            >
              Learn More
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right Column with Animation - Faster initial load */}
        <div className={`md:w-1/2 relative h-96 transition-all duration-300 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Robot Animation */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className={`transition-all duration-300 delay-250 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <AnimatedRobot />
            </div>
          </div>

          {/* Ocean waves - moderate animation */}
          <div 
            className="absolute top-2/3 left-0 w-full h-1/3 bg-gradient-to-t from-blue-700 to-blue-500 opacity-40 rounded-lg filter blur-md"
            style={{ 
              transform: `translateY(${waveHeight}px)`,
              transition: 'transform 0.15s ease-in-out' // Moderate transition (changed from 0.1s to 0.15s)
            }}
          ></div>
          
          <div 
            className="absolute top-2/3 left-0 w-full h-1/4 bg-gradient-to-t from-blue-600 to-blue-400 opacity-30 rounded-lg filter blur-sm"
            style={{ 
              transform: `translateY(${waveHeight * -1}px)`,
              transition: 'transform 0.15s ease-in-out' // Moderate transition (changed from 0.1s to 0.15s)
            }}
          ></div>
          
          {/* Boat Figure - with moderate animation */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 transition-all duration-150 ease-in-out" // Moderate transition (changed from 0.1s to 0.15s)
            style={{ 
              transform: `translate(calc(-50% + ${boatPosition}px), calc(-33% + ${waveHeight}px)) rotate(${boatPosition/2}deg)`,
            }}
          >
            {/* Boat Hull */}
            <div className="w-48 h-24 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-b-full relative overflow-hidden">
              {/* Hull Highlights */}
              <div className="absolute top-1/4 left-0 w-full h-1 bg-white opacity-20"></div>
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white opacity-10"></div>
            </div>
            
            {/* Boat Deck */}
            <div className="w-44 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-t-lg absolute -top-10 left-1/2 transform -translate-x-1/2 overflow-hidden">
              {/* Deck Details */}
              <div className="absolute top-1 left-6 w-32 h-6 bg-primary-400 rounded-md opacity-50"></div>
              <div className="absolute top-3 left-10 w-24 h-2 bg-secondary-300 rounded opacity-30"></div>
            </div>
            
            {/* Boat Cabin */}
            <div className="w-24 h-20 bg-gradient-to-b from-primary-400 to-secondary-500 rounded-lg absolute -top-30 left-1/2 transform -translate-x-1/2">
              {/* Cabin Windows */}
              <div className="absolute top-3 left-4 w-5 h-5 bg-cyan-300 rounded-full"></div>
              <div className="absolute top-3 right-4 w-5 h-5 bg-cyan-300 rounded-full"></div>
              <div className="absolute bottom-3 left-8 w-8 h-3 bg-cyan-300 rounded"></div>
            </div>
            
            {/* Mast */}
            <div className="absolute -top-60 left-1/2 transform -translate-x-1/2 w-2 h-30 bg-gray-300"></div>
            
            {/* Main Sail */}
            <div className="absolute -top-58 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-24 h-28 bg-gradient-to-tr from-white to-gray-100 opacity-90 rounded-tr-3xl skew-x-12 relative">
                {/* Sail Details */}
                <div className="absolute left-6 top-0 w-1 h-full bg-gray-200 opacity-50"></div>
                <div className="absolute left-12 top-0 w-1 h-full bg-gray-200 opacity-50"></div>
              </div>
            </div>
            
            {/* Top Sail */}
            <div className="absolute -top-88 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-18 h-20 bg-gradient-to-tr from-white to-gray-100 opacity-80 rounded-tr-3xl skew-x-6"></div>
            </div>
            
            {/* Flag */}
            <div className="absolute -top-62 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-tr-lg"></div>
          </div>

          {/* Animated Bubbles - with moderate transitions */}
          <div 
            className="absolute top-0 left-1/4 w-16 h-16 bg-gradient-to-b from-primary-400 to-secondary-500 rounded-full flex items-center justify-center transition-all duration-800 ease-in-out" // Moderate transition (700ms to 800ms)
            style={{ 
              transform: `translate(${bubbleAnimations.chat?.x || 0}px, ${bubbleAnimations.chat?.y || 0}px) rotate(${bubbleAnimations.chat?.rotation || 0}deg)`,
              animationDelay: `${bubbleAnimations.chat?.animationDelay || 0}s`
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
          </div>

          <div 
            className="absolute top-1/4 right-1/4 w-14 h-14 bg-gradient-to-b from-primary-400 to-secondary-500 rounded-full flex items-center justify-center transition-all duration-800 ease-in-out" // Moderate transition (700ms to 800ms)
            style={{ 
              transform: `translate(${bubbleAnimations.exclamation?.x || 0}px, ${bubbleAnimations.exclamation?.y || 0}px) rotate(${bubbleAnimations.exclamation?.rotation || 0}deg)`,
              animationDelay: `${bubbleAnimations.exclamation?.animationDelay || 0}s`
            }}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="text-xl">❗</span>
            </div>
          </div>

          <div 
            className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-b from-primary-400 to-secondary-500 rounded-full flex items-center justify-center transition-all duration-800 ease-in-out" // Moderate transition (700ms to 800ms)
            style={{ 
              transform: `translate(${bubbleAnimations.gear?.x || 0}px, ${bubbleAnimations.gear?.y || 0}px) rotate(${bubbleAnimations.gear?.rotation || 0}deg)`,
              animationDelay: `${bubbleAnimations.gear?.animationDelay || 0}s`
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>

          <div 
            className="absolute bottom-0 right-1/3 w-18 h-18 bg-gradient-to-b from-primary-400 to-secondary-500 rounded-full flex items-center justify-center transition-all duration-800 ease-in-out" // Moderate transition (700ms to 800ms)
            style={{ 
              transform: `translate(${bubbleAnimations.settings?.x || 0}px, ${bubbleAnimations.settings?.y || 0}px) rotate(${bubbleAnimations.settings?.rotation || 0}deg)`,
              animationDelay: `${bubbleAnimations.settings?.animationDelay || 0}s`
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <span className="text-3xl">🔧</span>
            </div>
          </div>

          <div 
            className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-b from-primary-400 to-secondary-500 rounded-full flex items-center justify-center transition-all duration-800 ease-in-out" // Moderate transition (700ms to 800ms)
            style={{ 
              transform: `translate(${bubbleAnimations.cloud?.x || 0}px, ${bubbleAnimations.cloud?.y || 0}px) rotate(${bubbleAnimations.cloud?.rotation || 0}deg)`,
              animationDelay: `${bubbleAnimations.cloud?.animationDelay || 0}s`
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-2xl">☁️</span>
            </div>
          </div>
        </div>
      </main>

      {/* Background gradient effect */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary-600 opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-purple-600 opacity-10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1/4 h-1/4 bg-secondary-600 opacity-10 rounded-full filter blur-3xl"></div>
    </div>
    
  );
};

export default HomePage;