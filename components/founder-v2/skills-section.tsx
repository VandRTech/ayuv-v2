"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const skillsData = {
  "AI & Technical": ["Generative AI", "Prompt Engineering", "Agentic RAG", "QCS", "Machine Learning", "Deep Learning", "PyTorch", "GANS", "VAES", "Blockchain", "Python", "Java"],
  "Cyber Security": ["Threat Intelligence", "Incident Response", "Network Security", "IDS/IPS", "Pen Testing", "Digital Forensics"],
  "Business": ["Corporate Strategy", "Business Development", "Public Relations", "Innovation", "Entrepreneurship"]
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Technical Skills</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-emerald-400">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 