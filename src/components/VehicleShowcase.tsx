'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Wind, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

const vehicles = [
  {
    name: 'Toyota Glanza',
    image: '/images/glanza_maroon_2025.png',
    passengers: 5,
    features: ['Premium AC', 'Window Tints', 'Professional Driver', 'Touchscreen Infotainment','2025 Model','Petrol Engine'],
    type: 'Premium Hatchback'
  },
  {
    name: 'Toyota Innova Crysta',
    image: '/images/innova.png',
    passengers: 7,
    features: ['Luxury AC', 'Cooling Glass', 'Spacious Seating', 'Top-tier Comfort'],
    type: 'Luxury MUV'
  },
  {
    name: 'Maruti Ertiga',
    image: '/images/ertiga.webp',
    passengers: 7,
    features: ['Efficient AC','Premium Interior','7 Seater', 'Smooth Ride', 'Ample Luggage', 'Reliable Travel','2021 Model'],
    type: 'Comfort MUV'
  }
];

const VehicleCard = ({ vehicle, index }: { vehicle: typeof vehicles[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // 3D perspective transforms based on scroll  
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 1], [15, 0, 0, -5]);
  const rotateY = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.5, 1], 
    [index === 0 ? 10 : index === 2 ? -10 : 0, 0, 0, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.6]);
  const translateZ = useTransform(scrollYProgress, [0, 0.3, 0.5], [-80, 0, 0]);

  const handleHoverStart = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsFlipped(true);
    }
  };

  const handleHoverEnd = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsFlipped(false);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, scale, opacity, z: translateZ }}
      className="relative h-[450px] w-full perspective-1000 group cursor-pointer preserve-3d"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={handleCardClick}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass-card overflow-hidden">
          <div className="relative h-64 w-full overflow-hidden">
            <Image 
              src={vehicle.image} 
              alt={`${vehicle.name} - Premium Wayanad Taxi`} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {/* Shimmer overlay */}
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold leading-tight">{vehicle.name}</h3>
              <span className="bg-primary text-yellow-600 text-[10px] font-black px-2.5 py-1.5 rounded-md uppercase tracking-widest shadow-[0_0_10px_rgba(245,158,11,0.2)] whitespace-nowrap">
                {vehicle.type}
              </span>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> {vehicle.passengers} Max
              </span>
              <span className="flex items-center gap-1">
                <Wind className="w-4 h-4" /> AC
              </span>
            </div>
            <p className="mt-4 text-primary text-sm font-semibold flex items-center gap-1">
              <span className="hidden md:inline">Hover</span>
              <span className="md:hidden">Tap</span>
              <span> to see details</span>
              <Zap className="w-3 h-3" />
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden glass-card overflow-hidden bg-gradient-to-br from-gray-900 to-black p-8 [transform:rotateY(180deg)]">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary">{vehicle.name} Details</h3>
              <ul className="space-y-4">
                {vehicle.features.map((feature, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: isFlipped ? 1 : 0, x: isFlipped ? 0 : -10 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const msg = encodeURIComponent(`Hello, I would like to book the ${vehicle.name} (${vehicle.type}). Please share availability and pricing.`);
                window.open(`https://wa.me/919544819365?text=${msg}`, '_blank');
              }}
              className="premium-button w-full mt-auto"
            >
              Book This Vehicle
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VehicleShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} id="vehicles" className="py-24 relative snap-section">
      {/* Background parallax orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px] floating-orb" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] floating-orb-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 perspective-2000">
          <motion.div style={{ y: headingY, opacity: headingOpacity }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-4"
            >
              Our <span className="text-primary">Premium</span> Fleet
            </motion.h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6" />
            <p className="text-gray-400 max-w-xl mx-auto">
              Choose from our clean, well-maintained vehicles for a comfortable travel experience in Wayanad.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-2000">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.name} vehicle={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
