import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using FormSubmit service - no API keys needed
      const response = await fetch('https://formsubmit.co/ajax/sales@acucogn.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          message: data.message,
          _subject: "New Contact Form Submission",
          _captcha: "false",
          _template: "box",
          _next: "https://www.acucogn.com/thank-you", // Replace with your actual domain
          _webhook: "https://www.acucogn.com/webhook", // Optional: for advanced integrations
          _honey: "", // Honeypot spam prevention
        })
      });

      console.log("Response status:", response.status); // Debug log
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response data:", result); // Debug log
      
      if (result.success === 'true' || result.success === true) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
        console.error("Form submission failed:", result);
      }
    } catch (error) {
      console.error('Error details:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4" id="contact">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Contact Us
        </h2>

        {/* Regular form for direct FormSubmit activation (hidden) */}
        <div className="hidden">
          <form action="https://formsubmit.co/sales@acucogn.com" method="POST">
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://www.acucogn.com/thank-you" />
            <button type="submit">Send</button>
          </form>
        </div>

        {/* React Hook Form for actual use */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>
            <input 
              type="text" 
              id="name"
              {...register('name', { 
                required: 'Name is required'
              })}
              className={`w-full p-3 rounded-md bg-gray-800 border ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              {...register('email', { 
                required: 'Email is required'
              })}
              className={`w-full p-3 rounded-md bg-gray-800 border ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Number Input */}
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm text-gray-300">
              Phone Number (Optional)
            </label>
            <input 
              type="tel" 
              id="phone"
              {...register('phone')}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-purple-500 focus:outline-none focus:ring-2"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block mb-2 text-sm text-gray-300">
              Your Message
            </label>
            <textarea 
              id="message"
              {...register('message', { 
                required: 'Message is required'
              })}
              rows="4"
              className={`w-full p-3 rounded-md bg-gray-800 border ${
                errors.message 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full p-3 rounded-full transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {/* Submission Status */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-600/20 border border-green-500 rounded-md text-green-400 text-center">
              Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-600/20 border border-red-500 rounded-md text-red-400 text-center">
              Failed to send message. Please try again later.
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default ContactForm;