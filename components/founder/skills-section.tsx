"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SkillCard = ({ title, items }: { title: string, items: string[] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item} className="flex items-center">
              <span className="mr-2 text-emerald-500">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  </motion.div>
);

export const SkillsSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Competencies</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <SkillCard title={founderData.skills.ai.title} items={founderData.skills.ai.items} />
          <SkillCard title={founderData.skills.tech.title} items={founderData.skills.tech.items} />
          <SkillCard title={founderData.skills.research.title} items={founderData.skills.research.items} />
        </div>
      </div>
    </section>
  );
}; 