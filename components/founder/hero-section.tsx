"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="py-20 md:py-32 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full bg-gray-300 dark:bg-gray-700">
          {/* Placeholder for professional headshot */}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          {founderData.hero.headline}
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400">
          {founderData.hero.subheading}
        </p>
        <p className="mt-2 text-md md:text-lg text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
          {founderData.hero.tagline}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" variant="default">View QCS Research</Button>
          <Button size="lg" variant="outline">Contact Me</Button>
        </div>
      </motion.div>
    </section>
  );
}; 