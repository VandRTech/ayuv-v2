// PublicationsSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const PublicationsSection = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Publications & Research</h2>
      {founderData.publications.map((pub, index) => (
        <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <Card>
            <CardHeader>
              <CardTitle>{pub.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold mb-2">Research Focus:</p>
              <div className="flex flex-wrap gap-2">
                {pub.focus.map(area => <Badge key={area} variant="secondary">{area}</Badge>)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>
); 