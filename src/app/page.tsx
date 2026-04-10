'use client';

import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VehicleShowcase from '@/components/VehicleShowcase';
import Packages from '@/components/Packages';
import Contact from '@/components/Contact';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Car, Shield, Clock, Star, MapPin, Headphones, Route, Award } from 'lucide-react';

/* ─── Horizontal Scroll Feature Strip ─── */
const features = [
  { icon: <Shield className="w-8 h-8" />, title: 'Safety First', desc: 'Verified drivers & well-maintained fleet' },
  { icon: <Clock className="w-8 h-8" />, title: '24/7 Available', desc: 'Round the clock service across Wayanad' },
  { icon: <Star className="w-8 h-8" />, title: 'Premium Quality', desc: 'Luxury vehicles for every journey' },
  { icon: <MapPin className="w-8 h-8" />, title: 'Local Experts', desc: 'Drivers who know every trail & shortcut' },
  { icon: <Headphones className="w-8 h-8" />, title: 'Dedicated Support', desc: 'Personal assistance throughout your trip' },
  { icon: <Route className="w-8 h-8" />, title: 'Custom Routes', desc: 'Flexible itineraries tailored for you' },
  { icon: <Award className="w-8 h-8" />, title: '10+ Years', desc: 'A decade of trusted travel excellence' },
  { icon: <Car className="w-8 h-8" />, title: 'Fleet Variety', desc: 'Hatchbacks, SUVs & luxury MUVs' },
];

const HorizontalScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden snap-section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 mb-10">
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-3">
            Why <span className="text-primary text-glow">Starego</span>?
          </h2>
          <div className="h-1 w-16 bg-primary mx-auto mb-4" />
          <p className="text-gray-400 max-w-lg mx-auto text-sm">
            <span className="hidden md:inline">Scroll sideways to explore what makes us the best taxi service in Wayanad.</span>
            <span className="md:hidden">What makes us the best taxi service in Wayanad.</span>
          </p>
        </motion.div>
      </div>

      {/* Cards: grid on mobile, horizontal scroll on desktop */}
      <div className="md:hidden grid grid-cols-2 gap-4 px-6 pb-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            viewport={{ once: true }}
            className="glass-card p-4 flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 text-primary">
              {f.icon}
            </div>
            <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">{f.title}</h3>
            <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="hidden md:flex horizontal-scroll-container gap-6 px-6 pb-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="horizontal-scroll-item w-[260px] glass-card p-6 flex flex-col items-center text-center group cursor-default"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              {f.icon}
            </div>
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ─── About Section with Scroll Zoom ─── */
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scroll zoom on the stat box
  const statScale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.6, 1.05, 1]);
  const statOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const statRotateX = useTransform(scrollYProgress, [0, 0.3, 0.5], [20, -3, 0]);

  // Right column entrance
  const rightX = useTransform(scrollYProgress, [0, 0.35], [80, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const benefits = ['24/7 Availability', 'Clear Pricing', 'Local Knowledgeable Drivers', 'Well Maintained Fleet'];

  return (
    <section ref={sectionRef} className="py-24 container mx-auto px-6 snap-section relative">
      {/* Floating orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] floating-orb pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 perspective-2000">
        {/* Left: Zoom stat */}
        <motion.div 
          style={{ scale: statScale, opacity: statOpacity, rotateX: statRotateX }}
          className="relative preserve-3d scroll-3d"
        >
          <div className="absolute -inset-4 bg-[url('/images/taxi.jpg')] blur-l rounded-full" />
          <div className="relative bg-[#80808021] p-8 aspect-square flex items-center justify-center text-center rounded-2xl overflow-hidden">
            {/* Shimmer accent */}
            <div className="absolute inset-0 shimmer" />
            <div className="relative z-10">
              <h3 className="text-7xl md:text-8xl font-black text-primary mb-2 text-glow">10+</h3>
              <p className="text-xl font-bold uppercase tracking-widest">Years of Service</p>
              <p className="text-gray-400 mt-4">Dedicated to providing the best travel experience in Sulthan Bathery.</p>
            </div>
          </div>
        </motion.div>
        
        {/* Right: Text */}
        <motion.div
          style={{ x: rightX, opacity: rightOpacity }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Your Trusted <span className="text-primary text-glow">Wayanad Taxi</span> Partner</h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Located in the heart of Sulthan Bathery, Starego has been the leading <strong>Wayanad taxi agency</strong> for over a decade. We specialize in sightseeing tours, airport transfers, and reliable <strong>Kerala taxi services</strong>.
          </p>
          <ul className="space-y-4">
            {benefits.map((item, i) => (
              <motion.li 
                key={item} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#f59e0b]" />
                <span className="font-medium">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Footer with Reveal ─── */
const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="py-12 border-t border-white/5 bg-black/50 snap-section"
  >
    <div className="container mx-auto px-6 text-center">
      <p className="text-sm text-gray-500 mb-4 tracking-widest uppercase font-bold">Starego Premium Travel Service</p>
      <p className="text-xs text-gray-600">© 2026 Starego. All rights reserved. Designed for Excellence.</p>
    </div>
  </motion.footer>
);

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main className="min-h-screen snap-container overflow-x-hidden">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
        <VehicleShowcase />
        <HorizontalScrollSection />
        <AboutSection />
        <Packages />
        <Contact />
        <Footer />
      </motion.div>
    </main>
  );
}
