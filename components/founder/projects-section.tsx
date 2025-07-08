// ProjectsSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ProjectsSection = () => (
  <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {founderData.projects.map((project, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
                </div>
                <ul className="list-disc list-inside">
                  {project.details.map(detail => <li key={detail}>{detail}</li>)}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 