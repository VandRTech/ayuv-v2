"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">Let's Collaborate</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          I'm passionate about building innovative technologies and solving complex problems. If you'd like to discuss a project or learn more about my work, please reach out.
        </p>
        <div className="flex justify-center items-center gap-8 mb-8">
          <Link href="mailto:tech.vandr@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <Mail />
            <span>tech.vandr@gmail.com</span>
          </Link>
          <Link href="tel:+916300215894" className="flex items-center gap-2 text-gray-300 hover:text-white">
            <Phone />
            <span>+91 6300215894</span>
          </Link>
        </div>
        <div className="flex justify-center gap-6">
          <Link href="https://linkedin.com/in/vandr0" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-8 w-8 text-gray-400 hover:text-white" />
          </Link>
          <Link href="https://github.com/VandRTech" target="_blank" rel="noopener noreferrer">
            <Github className="h-8 w-8 text-gray-400 hover:text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}; 