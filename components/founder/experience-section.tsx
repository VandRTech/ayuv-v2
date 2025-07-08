// ExperienceSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ExperienceSection = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Professional Experience</h2>
      <div className="relative border-l-2 border-emerald-500/30">
        {founderData.experience.map((job, index) => (
          <motion.div key={index} className="mb-8 flex" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 mt-1.5 -ml-3 border-2 border-gray-900"></div>
            <div className="ml-6">
              <h3 className="text-xl font-bold">{job.role}</h3>
              <p className="text-md text-gray-500 dark:text-gray-400">{job.company} • {job.period}</p>
              <ul className="mt-2 list-disc list-inside">
                {job.description.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 