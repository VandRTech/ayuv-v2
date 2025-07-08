"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-emerald-400">Innovator at the Intersection of AI and Security</h2>
          <p className="text-lg text-gray-300 mb-6">
            I am an AI and Cybersecurity professional with a passion for developing cutting-edge solutions that solve complex challenges. My work specializes in Generative AI, including pioneering the Quantum Contextual Superposition (QCS) model and developing Agentic RAG systems for conversational AI. With a deep technical expertise in threat intelligence and network security, I have hands-on experience building and deploying AI-driven applications in the healthcare and technology sectors.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="https://linkedin.com/in/vandr0" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-8 w-8 text-gray-400 hover:text-white" />
            </Link>
            <Link href="https://github.com/VandRTech" target="_blank" rel="noopener noreferrer">
              <Github className="h-8 w-8 text-gray-400 hover:text-white" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 