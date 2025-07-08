"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const projectsData = [
  {
    title: "Gen AI for Healthcare",
    description: "Engineered and fine-tuned conversational models using Agentic RAG and the QCS model for healthcare applications at Altibbé Health. Developed optimized prompts to enhance AI performance in patient interactions and diagnostic support."
  },
  {
    title: "Mitigating Lateral Movement Attacks",
    description: "Developed a system to stop attackers from spreading across datacenter networks, reducing dwell time and enforcing Zero-Trust security principles through automated incident response."
  },
  {
    title: "Securing UPI Transactions",
    description: "Enhanced security for Man-in-the-Middle (MITM) attacks in UPI transactions by strengthening authentication and encryption, implementing fraud detection, and enabling real-time alerts."
  }
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Putting Theory into Practice</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-emerald-400">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 