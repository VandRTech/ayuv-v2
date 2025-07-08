"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Abstract background animation */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.1)_0%,_rgba(29,78,216,0)_50%)]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_rgba(34,197,94,0)_50%)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
          <Image
            src="/images/founder-profile.jpg"
            alt="Vishal Chowdary Mekala"
            width={160}
            height={160}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Building the Future of Anticipatory AI.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          An innovative AI and Cybersecurity professional and the inventor of the Quantum Contextual Superposition (QCS) algorithm for proactive conversational AI.
        </p>
        <Button asChild size="lg">
          <Link href="#research">Explore My Work</Link>
        </Button>
      </motion.div>
    </section>
  );
}; 