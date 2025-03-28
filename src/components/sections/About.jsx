import React from 'react';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              About Acugon
            </h2>
            
            <p className="text-lg text-gray-300 mb-6">
              At Acugon, we're pioneering the future of business automation through advanced AI solutions. Our mission is to empower businesses of all sizes to operate more efficiently, serve customers better, and achieve sustainable growth.
            </p>
            
            <p className="text-lg text-gray-300 mb-8">
              Founded by a team of AI experts and business strategists, we combine cutting-edge technology with practical business insights to deliver automation that makes a real difference to your bottom line.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-blue-400 text-3xl font-bold mb-2">100+</div>
                <div className="text-gray-400">Businesses Automated</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-blue-400 text-3xl font-bold mb-2">98%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-blue-400 text-3xl font-bold mb-2">24/7</div>
                <div className="text-gray-400">Bot Availability</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="text-blue-400 text-3xl font-bold mb-2">50%+</div>
                <div className="text-gray-400">Efficiency Increase</div>
              </div>
            </div>
          </div>            
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full filter blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full filter blur-2xl"></div>
          </div>
        </div>
      
    </section>
  );
};

export default About;