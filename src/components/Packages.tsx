'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TreePine, Calendar, MapPin, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const packages = [
  {
    title: 'Wayanad Highlights',
    days: '2 Days / 1 Night',
    destination: 'Banasura Sagar, Pookode Lake, Edakkal Caves',
    price: 'Starting from ₹4,500',
    icon: <MapPin className="w-6 h-6" />,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Nature & Wildlife',
    days: '3 Days / 2 Nights',
    destination: 'Muthanga Wildlife, Tholpetty, Kuruva Island',
    price: 'Starting from ₹7,500',
    icon: <TreePine className="w-6 h-6" />,
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'Heritage & Peaks',
    days: '4 Days / 3 Nights',
    destination: 'Chembra Peak, Thirunelli Temple, Soochipara',
    price: 'Starting from ₹10,000',
    icon: <Calendar className="w-6 h-6" />,
    color: 'from-amber-500/20 to-orange-500/20'
  }
];

const PackageCard = ({ pkg, index }: { pkg: typeof packages[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Scroll reveal with rotation
  const rotateZ = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [index === 0 ? -3 : index === 2 ? 3 : 0, 0, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0.8, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [0, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.25], [80, 0]);

  // Floating icon parallax
  const iconY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  const iconRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I am interested in booking the "${pkg.title}" package for ${pkg.days}. Please provide more details.`);
    window.open(`https://wa.me/919544819365?text=${message}`, '_blank');
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateZ, scale, opacity, y }}
      className={`glass-card p-8 group relative overflow-hidden h-full flex flex-col`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pkg.color} blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Floating icon with parallax */}
        <motion.div 
          style={{ y: iconY, rotate: iconRotate }}
          className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300"
        >
          <div className="text-primary">{pkg.icon}</div>
        </motion.div>

        <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">{pkg.days}</span>
        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{pkg.title}</h3>
        
        <div className="space-y-3 mb-8 flex-grow">
          <p className="text-gray-400 text-sm flex items-start gap-2">
            <span className="text-white shrink-0 font-medium">Covers:</span>
            {pkg.destination}
          </p>
          <p className="text-xl font-bold text-white mt-auto">{pkg.price}</p>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <button 
            onClick={handleWhatsApp}
            className="premium-button flex items-center justify-center gap-2 w-full"
          >
            <MessageSquare className="w-4 h-4" />
            Book on WhatsApp
          </button>
          <a
            href="/brochure.pdf"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            See Full Details
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Packages = () => {
  const pathname = usePathname();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headingScale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <section ref={sectionRef} id="packages" className="py-24 bg-black/20 snap-section">
      {/* Parallax background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] floating-orb" />
        <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] floating-orb-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            className="max-w-2xl"
            style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black mb-4"
            >
              Exclusive <span className="text-glow text-primary">Wayanad Taxi</span> Packages
            </motion.h2>
            <div className="h-1 w-20 bg-primary mb-6" />
            <p className="text-gray-400">
              Handpicked destinations and perfectly timed itineraries for the best Wayanad experience. 
              Custom packages are also available upon request.
            </p>
          </motion.div>
              {pathname !== "/packages" && (
            <Link href="/packages" className='pointer- '>
              <motion.button 
                whileHover={{ x: 8 }}
                className="text-primary font-bold flex items-center gap-2 h-fit"
              >
                View All Packages <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.title} pkg={pkg} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
