'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/luxury-hero.png"
          alt="Luxury Wayanad Landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">
            Starego — Your Trusted Wayanad Taxi
          </span>
          <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
            Premium <span className="text-glow text-primary">Wayanad Taxi</span> <br />
            & Kerala Travels
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Experience the ultimate comfort and safety with Starego — the leading **premium taxi service in Wayanad**. 
            Professional drivers, luxury vehicles, and reliable Kerala taxi services for unforgettable journeys.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/packages"
                className="premium-button flex items-center gap-2 group"
              >
                Explore Packages
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.a
              href="tel:+919544819365"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 glass-card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="text-left">
          <p className="text-xs text-gray-400">Available 24/7 in</p>
          <p className="text-sm font-bold">Sulthan Bathery</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
