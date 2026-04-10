'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax: background moves slower  
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  // Scroll zoom on background
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  // 3D tilt on content
  const contentRotateX = useTransform(scrollYProgress, [0, 0.5], [0, 8]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Badge parallax
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  // Floating orb parallax
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={sectionRef} id="home" className="relative h-screen flex items-center justify-center overflow-hidden snap-section">
      {/* Parallax Background with Scroll Zoom */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src="/images/luxury-hero.png"
          alt="Luxury Wayanad Landscape"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-[1]" />
      
      {/* Parallax floating orbs */}
      <motion.div 
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] floating-orb z-[2]"
        style={{ y: orb1Y }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-amber-600/15 rounded-full blur-[120px] floating-orb-delayed z-[2]"
        style={{ y: orb2Y }}
      />

      {/* 3D Transformed Content */}
      <div className="container mx-auto px-6 relative z-10 text-center perspective-2000">
        <motion.div
          style={{ 
            rotateX: contentRotateX,
            y: contentY,
            opacity: contentOpacity,
          }}
          className="preserve-3d"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-2 md:mb-4 block">
              Starego — Your Trusted Wayanad Taxi
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-8xl font-black mb-4 md:mb-6 leading-tight">
              Premium <span className="text-glow text-primary">Wayanad Taxi</span> <br />
              & Kerala Travels
            </h1>
            <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed px-2 md:px-0">
              Experience the ultimate comfort and safety with Starego — the leading <strong>premium taxi service in Wayanad</strong>. 
              Professional drivers, luxury vehicles, and reliable Kerala taxi services.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Now</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>

      {/* Floating Badge with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: badgeY }}
        className="absolute bottom-10 hidden md:flex md:left-auto md:right-10 glass-card p-4 items-center gap-4 z-10"
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
