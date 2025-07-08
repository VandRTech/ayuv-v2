"use client";
import React from 'react';
import { motion } from 'framer-motion';

const experienceData = [
  { role: "Gen AI Developer & Prompt Engineer", company: "Altibbé Health Private Limited" },
  { role: "Technical Lead (Healthcare)", company: "Ayuv Healthcare" },
  { role: "Chief Technology Architect", company: "Avinya Group" },
  { role: "Head of Operations", company: "Genetic Code X" }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Career Journey</h2>
        <div className="relative border-l-2 border-emerald-500/30">
          {experienceData.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="mb-8 flex items-center"
            >
              <div className="absolute left-0 -ml-2.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-gray-900"></div>
              <div className="ml-8">
                <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                <p className="text-md text-gray-400">{job.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 