'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    image: '/images/ertiga.webp', // Professional Placeholder
    passengers: 7,
    features: ['Efficient AC','Premium Interior','7 Seater', 'Smooth Ride', 'Ample Luggage', 'Reliable Travel','2021 Model'],
    type: 'Comfort MUV'
  }
];

const VehicleCard = ({ vehicle }: { vehicle: typeof vehicles[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

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
    <div 
      className="relative h-[450px] w-full perspective-1000 group cursor-pointer"
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
          <div className="relative h-64 w-full">
            <Image 
              src={vehicle.image} 
              alt={`${vehicle.name} - Premium Wayanad Taxi`} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
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
            <button className="premium-button w-full mt-auto">Book This Vehicle</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const VehicleShowcase = () => {
  return (
    <section id="vehicles" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <VehicleCard vehicle={v} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
