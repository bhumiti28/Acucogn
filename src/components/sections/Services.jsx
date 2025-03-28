import React from 'react';
import ServiceCard from '../ui/ServiceCard';

const Services = () => {
  const services = [
    {
      title: "Bot Automation Software",
      description: "Boost efficiency with high-performance bots for online checkout, scheduling, and inventory management.",
      details: [
        "Maximize productivity with high-performance bots.",
        "Streamline processes and enhance efficiency.",
        "Boost online checkout, scheduling, and inventory management."
      ],
      icon: "🤖",
      iconColor: "bg-gradient-to-r from-primary-500 to-purple-500 text-white"
    },
    {
      title: "Customized AI Solutions",
      description: "Automating tasks for streamlined chatting, task management, and support.",
      details: [
        "Smart tools for efficient task automation.",
        "Chatbots for lead qualification and support.",
        "Boost productivity by reducing manual work."
      ],
      icon: "🤖",
      iconColor: "bg-gradient-to-r from-red-500 to-rose-500 text-white"
    },
    {
      title: "Web Development and Design",
      description: "Creating innovative AI-infused websites and apps for businesses.",
      details: [
        "Tailored solutions to meet business needs.",
        "AI-integrated website and app development.",
        "Improve user experience and engagement."
      ],
      icon: "💻",
      iconColor: "bg-gradient-to-r from-secondary-500 to-blue-500 text-white"
    },
    {
      title: "IT Consultancy",
      description: "Providing seamless technological integration for optimized business processes.",
      details: [
        "Expert guidance for IT integration.",
        "Enhance operational efficiency.",
        "Tailored solutions for business growth."
      ],
      icon: "🧑‍💼",
      iconColor: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
    },
    {
      title: "AI Consultancy",
      description: "Guidance and strategies for adopting AI technologies to drive business transformation.",
      details: [
        "Explore AI strategies for growth.",
        "Personalized AI-driven consulting.",
        "Achieve transformative success with AI."
      ],
      icon: "🤖",
      iconColor: "bg-gradient-to-r from-purple-500 to-primary-500 text-white"
    },
    {
      title: "AI Digital Marketing",
      description: "Revolutionizing online presence through AI-powered marketing strategies.",
      details: [
        "AI-powered campaigns for targeted marketing.",
        "Enhance engagement and brand visibility.",
        "Data-driven strategies for marketing success."
      ],
      icon: "📊",
      iconColor: "bg-gradient-to-r from-rose-500 to-red-500 text-white"
    }
  ];
  
  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-lg text-gray-300">
            Powerful AI solutions designed to automate and elevate every aspect of your business
          </p>
        </div>
        
        {/* 3 cards per row on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              details={service.details}
              icon={service.icon}
              iconColor={service.iconColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;