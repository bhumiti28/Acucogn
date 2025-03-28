import React, { useEffect, useState, useRef } from 'react';

const AnimatedRobot = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [eyeAnimation, setEyeAnimation] = useState({
    left: { scale: 1 },
    right: { scale: 1 }
  });
  const animationInterval = useRef(null);
  const bubbleInterval = useRef(null);
  
  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => {
      setIsAnimating(true);
      setBubbleVisible(true);
    }, 1000);
    
    // Robot head and eye movements
    animationInterval.current = setInterval(() => {
      // Random subtle head movement
      const headTilt = Math.random() * 4 - 2;
      const headRotate = Math.random() * 4 - 2;
      
      // Random eye animations
      setEyeAnimation({
        left: { 
          scale: 0.9 + Math.random() * 0.2,
        },
        right: { 
          scale: 0.9 + Math.random() * 0.2,
        }
      });
      
      // Update robot animation
      const robotElement = document.getElementById('animated-robot');
      if (robotElement) {
        robotElement.style.transform = `rotate(${headRotate}deg) translateY(${headTilt}px)`;
      }
    }, 2000);
    
    // Chat bubble animations
    bubbleInterval.current = setInterval(() => {
      setBubbleVisible(false);
      setTimeout(() => {
        setBubbleVisible(true);
      }, 500);
    }, 8000);
    
    return () => {
      clearInterval(animationInterval.current);
      clearInterval(bubbleInterval.current);
    };
  }, []);
  
  return (
    <div className="relative w-64 h-64">
      {/* Chat bubble */}
      <div 
        className={`absolute -top-16 -right-12 bg-gradient-to-r from-cyan-400 to-cyan-600 
                  rounded-lg p-3 w-48 transform transition-all duration-500
                  ${bubbleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="text-white text-sm">
          <div className="mb-1 w-full h-2 bg-white opacity-70 rounded-full"></div>
          <div className="mb-1 w-3/4 h-2 bg-white opacity-70 rounded-full"></div>
          <div className="w-1/2 h-2 bg-white opacity-70 rounded-full"></div>
        </div>
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-cyan-500 transform rotate-45"></div>
      </div>
      
      {/* Robot */}
      <div 
        id="animated-robot"
        className={`relative transition-all duration-500 ease-in-out ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Robot Head */}
        <div className="relative w-32 h-36 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-3xl mx-auto">
          {/* Robot Face */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-20 bg-gray-800 rounded-lg">
            {/* Robot Eyes */}
            <div className="flex justify-center mt-3 space-x-6">
              <div 
                className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ transform: `scale(${eyeAnimation.left.scale})` }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div 
                className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ transform: `scale(${eyeAnimation.right.scale})` }}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            
            {/* Mouth/Speaker */}
            <div className="flex justify-center mt-4">
              <div className="w-12 h-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Robot Ears/Antenna */}
          <div className="absolute -top-4 left-6 w-4 h-8 bg-gray-400 rounded-full"></div>
          <div className="absolute -top-6 left-6 w-4 h-4 bg-cyan-500 rounded-full"></div>
          <div className="absolute -top-4 right-6 w-4 h-8 bg-gray-400 rounded-full"></div>
          <div className="absolute -top-6 right-6 w-4 h-4 bg-cyan-500 rounded-full"></div>
        </div>
        
        {/* Robot Body */}
        <div className="w-40 h-24 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg relative mx-auto">
          {/* Center circle */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 rounded-full animate-pulse"></div>
          </div>
          
          {/* Arms */}
          <div className="absolute -left-4 top-4 w-8 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded-l-lg"></div>
          <div className="absolute -right-4 top-4 w-8 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded-r-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedRobot;