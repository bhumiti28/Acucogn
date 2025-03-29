import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

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
      // Using your actual EmailJS values
      const serviceId = 'service_a6gev43';
      const templateId = 'template_cy3qvkq';
      const publicKey = 'AHgYK2RmasvUamRR6';
      
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );
      
      if (result.text === 'OK') {
        setSubmitStatus('success');
        reset(); // Clear form after successful submission
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
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

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="user_name" className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>
            <input 
              type="text" 
              id="user_name"
              name="user_name" 
              {...register('user_name', { 
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters'
                }
              })}
              className={`w-full p-3 rounded-md bg-gray-800 border ${
                errors.user_name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your full name"
            />
            {errors.user_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_name.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="user_email" className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>
            <input 
              type="email" 
              id="user_email"
              name="user_email" 
              {...register('user_email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={`w-full p-3 rounded-md bg-gray-800 border ${
                errors.user_email 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your email"
            />
            {errors.user_email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_email.message}
              </p>
            )}
          </div>

          {/* Phone Number Input */}
          <div>
            <label htmlFor="user_phone" className="block mb-2 text-sm text-gray-300">
              Phone Number (Optional)
            </label>
            <input 
              type="tel" 
              id="user_phone"
              name="user_phone" 
              {...register('user_phone', { 
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number (10 digits required)'
                }
              })}
              className={`w-full p-3 rounded-md bg-gray-800 border ${
                errors.user_phone 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-700 focus:border-purple-500 focus:ring-purple-500'
              } focus:outline-none focus:ring-2`}
              placeholder="Enter your phone number"
            />
            {errors.user_phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_phone.message}
              </p>
            )}
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block mb-2 text-sm text-gray-300">
              Your Message
            </label>
            <textarea 
              id="message"
              name="message" 
              {...register('message', { 
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters'
                }
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