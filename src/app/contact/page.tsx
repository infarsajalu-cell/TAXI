'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';

const ContactPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className=" bg-[url('/images/contact.jpg')] bg-center bg-cover">
       <div className='pt-32 pb-16 bg-[#3939395e]'>
         <div className="container mx-auto  px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            Get In <span className="text-primary text-glow">Touch</span>
          </motion.h1>
          <p className="text-white max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you're planning a weekend getaway or a long spiritual journey in Wayanad, our team at Sulthan Bathery is ready to assist you.
          </p>
        </div>
       </div>
      </section>

      {/* About the Taxi Service Section */}
      <section className="py-20 bg-black/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-8"
            >
              <Award className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-400 text-sm">We maintain our Glanza, Innova, and Ertiga fleet to the highest standards of cleanliness and performance.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-8"
            >
              <Shield className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Reliability & Safety</h3>
              <p className="text-gray-400 text-sm">Our professional drivers are locals with deep knowledge of Wayanad's terrain, ensuring a safe and timely journey.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-card p-8"
            >
              <Clock className="w-12 h-12 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">24/7 Availability</h3>
              <p className="text-gray-400 text-sm">Based in Sulthan Bathery, we are always on standby to pick you up or drop you off at any destination.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reusable Contact Component */}
      <Contact />

      <footer className="py-12 border-t border-white/5 bg-black/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 mb-4 tracking-widest uppercase font-bold">Starego Premium Travel Service</p>
          <p className="text-xs text-gray-600">© 2026 Starego. All rights reserved. Premium Travel in Wayanad.</p>
        </div>
      </footer>
    </main>
  );
};

export default ContactPage;
