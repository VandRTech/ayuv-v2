// TestimonialsSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestimonialsSection = () => (
  <section className="py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Testimonials</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {founderData.testimonials.map((testimonial, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
            <Card className="h-full">
              <CardContent className="pt-6">
                <p className="italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-semibold text-right">- {testimonial.source}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 