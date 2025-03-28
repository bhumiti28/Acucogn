import React, { useState } from 'react';

const ServiceCard = ({ title, description, details, icon, iconColor, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const FLIP_BACK_DELAY = 1000;  // 0.5 second - Change this to your liking!
  const handleMouseEnter = () => {
    setIsFlipped(true);

    // Flip back after the delay
    setTimeout(() => {
      setIsFlipped(false);
    }, FLIP_BACK_DELAY);
  };

  // Create a consistent gradient background for all cards
  // This matches the pink-purple gradient in your image
  const cardGradient = "bg-gradient-to-r from-red-400 via-pink-500 to-purple-500";

  return (
    <div className="perspective-1000 w-full h-64 md:h-80">
      <div 
        className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''} mx-auto`}
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={handleMouseEnter}
        style={{ 
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {/* Front Card */}
        <div 
          className={`absolute w-full h-full backface-hidden ${cardGradient} rounded-lg p-6 flex flex-col items-center text-white`}
        >
          {/* Icon Circle */}
          <div className={`w-20 h-20 ${iconColor} rounded-full flex items-center justify-center text-6xl mb-4`}>
            <span>{icon}</span>
          </div>
        
          {/* Title */}
          <h3 className="text-2xl font-bold mb-2 text-center">{title}</h3>
          
          {/* Description */}
          <p className="text-center">{description}</p>
          
         
        </div>

        {/* Back Card */}
        <div 
          className={`absolute w-full h-full backface-hidden ${cardGradient} rounded-lg p-6 rotate-y-180 flex flex-col text-white`}
        >
          <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
          
          <ul className="space-y-2 flex-grow">
            {details.map((detail, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          
        
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
