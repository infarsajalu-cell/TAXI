'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I am interested in booking the "${pkg.title}" package for ${pkg.days}. Please provide more details.`);
    window.open(`https://wa.me/919544819365?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass-card p-8 group relative overflow-hidden h-full flex flex-col`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pkg.color} blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <div className="text-primary">{pkg.icon}</div>
        </div>

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
            href="/brochure.pdf" // Placeholder for actual PDF
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
  return (
    <section id="packages" className="py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
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
          </div>
              {pathname !== "/packages" && (
            <Link href="/packages" className='pointer- '>
              <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform h-fit">
                View All Packages <ArrowRight className="w-5 h-5" />
              </button>
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
