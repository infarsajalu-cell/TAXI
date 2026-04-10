'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Instagram, Facebook, Award, Shield, Clock } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 3D perspective entrance for the two columns
  const leftRotateY = useTransform(scrollYProgress, [0, 0.3], [12, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const leftX = useTransform(scrollYProgress, [0, 0.3], [-60, 0]);

  const rightRotateY = useTransform(scrollYProgress, [0, 0.3], [-12, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0, 0.3], [60, 0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      package: formData.get('package'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        console.error('Submission Error:', errorData);
        alert(`Error: ${errorData.error || 'Something went wrong. Please try again later.'}`);
      }
    } catch (error: any) {
      console.error('Fetch Error:', error);
      alert(`Failed to send enquiry: ${error.message || 'Please check your connection.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: <MapPin className="text-primary w-6 h-6" />, label: 'Office', value: 'Sulthan Bathery, Wayanad' },
    { icon: <Phone className="text-primary w-6 h-6" />, label: 'Call Us', value: '+91 95448 19365' },
    { icon: <Mail className="text-primary w-6 h-6" />, label: 'Email', value: 'sajaluseju@gmail.com' },
  ];

  return (
    <section ref={sectionRef} id="enquiry" className="py-24 relative overflow-hidden snap-section">
      {/* Parallax background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] floating-orb" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-amber-600/5 rounded-full blur-[100px] floating-orb-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start perspective-2000">
          
          {/* Info Side — 3D entrance from left */}
          <motion.div
            style={{ rotateY: leftRotateY, opacity: leftOpacity, x: leftX }}
            className="preserve-3d"
          >
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Starego Premium <br /><span className="text-primary text-glow">Travel Agency</span></h2>
            <div className="prose prose-invert mb-12 text-gray-400">
              <p>
                Based in Wayanad, Starego is a premium travel agency dedicated to providing more than just a ride; we offer an experience of comfort, luxury, and authentic hospitality.
              </p>
              <p>
                We specialize in sightseeing tours, airport transfers, and customized Kerala tour packages.
              </p>
            </div>

            <div className="space-y-8">
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{item.label}</p>
                    <p className="text-lg font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social icons with staggered bounce */}
            <div className="flex gap-4 mt-12">
              {[
                { icon: <Instagram className="w-5 h-5" />, delay: 0.4 },
                { icon: <Facebook className="w-5 h-5" />, delay: 0.5 },
              ].map((social, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: social.delay, type: 'spring', stiffness: 300, damping: 15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary/20 cursor-pointer transition-colors"
                >
                  {social.icon}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form Side — 3D entrance from right */}
          <motion.div
            style={{ rotateY: rightRotateY, opacity: rightOpacity, x: rightX }}
            className="glass-card p-8 md:p-12 preserve-3d"
          >
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <Award className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Enquiry Sent!</h3>
                <p className="text-gray-400">Thank you for contacting us. We will get back to you at sajaluseju@gmail.com shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-8">Send an Enquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="Enter your name"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] outline-none transition-all duration-300"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="+91 ..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] outline-none transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Interested Package</label>
                    <select 
                      name="package"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] outline-none transition-all duration-300 appearance-none"
                    >
                      <option className="bg-gray-900">Enquiry Only</option>
                      <option className="bg-gray-900">Wayanad Highlights</option>
                      <option className="bg-gray-900">Nature & Wildlife</option>
                      <option className="bg-gray-900">Heritage & Peaks</option>
                    </select>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Travel Details</label>
                    <textarea 
                      name="message"
                      rows={4}
                      placeholder="Date of travel, number of passengers, etc..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-primary focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] outline-none transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  <motion.button
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`premium-button w-full flex items-center justify-center gap-2 py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Enquiry'} <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
