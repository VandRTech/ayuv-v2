// BlogSection.tsx
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const BlogSection = () => (
  <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Blog & Insights</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {founderData.blog.map((post, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.date}</p>
              </CardHeader>
              <CardContent>
                <p>{post.summary}</p>
                <Button variant="link" className="p-0 mt-4">Read More</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 