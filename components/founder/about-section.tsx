"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';

export const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{founderData.about.p1}</p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{founderData.about.p2}</p>
        </motion.div>
      </div>
    </section>
  );
}; 