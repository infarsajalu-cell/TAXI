'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VehicleShowcase from '@/components/VehicleShowcase';
import Packages from '@/components/Packages';
import Contact from '@/components/Contact';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        
        {/* About / Agency Section */}
      

        <VehicleShowcase />
          <section className="py-24 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[url('/images/taxi.jpg')] blur-l rounded-full" />
              <div className="relative bg-[#80808021] p-8 aspect-square flex items-center justify-center text-center">
                <div>
                  <h3 className="text-7xl font-black text-primary mb-2">10+</h3>
                  <p className="text-xl font-bold uppercase tracking-widest">Years of Service</p>
                  <p className="text-gray-400 mt-4">Dedicated to providing the best travel experience in Sulthan Bathery.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Your Trusted <span className="text-primary text-glow">Wayanad Taxi</span> Partner</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Located in the heart of Sulthan Bathery, Starego has been the leading **Wayanad taxi agency** for over a decade. We specialize in sightseeing tours, airport transfers, and reliable **Kerala taxi services**.
              </p>
              <ul className="space-y-4">
                {['24/7 Availability', 'Clear Pricing', 'Local Knowledgeable Drivers', 'Well Maintained Fleet'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#f59e0b]" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
        <Packages />
        <Contact />

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 bg-black/50">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-gray-500 mb-4 tracking-widest uppercase font-bold">Starego Premium Travel Service</p>
            <p className="text-xs text-gray-600">© 2026 Starego. All rights reserved. Designed for Excellence.</p>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
