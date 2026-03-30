'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Phone, MapPin, Menu, X } from 'lucide-react';

import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-card py-4 mt-2 mx-auto max-w-[95%] left-0 right-0' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Car className="text-black w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-glow">STAREGO</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', path: '/#home' },
            { name: 'Vehicles', path: '/vehicles' },
            { name: 'Packages', path: '/packages' },
            { name: 'Contact', path: '/contact' }
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={item.path}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact" className="premium-button text-sm">
              Book Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-2 mx-4 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {[
                { name: 'Home', path: '/#home' },
                { name: 'Vehicles', path: '/vehicles' },
                { name: 'Packages', path: '/packages' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/contact" 
                onClick={() => setIsMenuOpen(false)}
                className="premium-button w-full text-center"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
