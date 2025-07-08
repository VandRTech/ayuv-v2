// EducationSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const EducationSection = () => (
  <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Education & Certifications</h2>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        <Card>
          <CardHeader>
            <CardTitle>{founderData.education.degree}</CardTitle>
            <p className="text-gray-500 dark:text-gray-400">{founderData.education.university} • {founderData.education.period}</p>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">Certifications:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {founderData.education.certifications.map(cert => <Badge key={cert} variant="outline">{cert}</Badge>)}
            </div>
            <p className="font-semibold mb-2">Ongoing Learning:</p>
            <div className="flex flex-wrap gap-2">
              {founderData.education.ongoing.map(item => <Badge key={item} variant="outline">{item}</Badge>)}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </section>
); 