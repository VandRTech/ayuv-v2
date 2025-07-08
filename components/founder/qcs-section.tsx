"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

export const QCSSection = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{founderData.qcs.title}</h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12">Redefining Conversational AI</p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">The Problem</h3>
            <p>{founderData.qcs.problem}</p>
            <h3 className="text-2xl font-semibold mt-6 mb-4">The Innovation</h3>
            <p>{founderData.qcs.innovation}</p>
            <h3 className="text-2xl font-semibold mt-6 mb-4">The Breakthrough</h3>
            <p>{founderData.qcs.breakthrough}</p>
          </div>
          <div>
            {/* Animated Diagram Placeholder */}
            <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
              <p>Animated Diagram Here</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Key Components</h3>
          <div className="space-y-4">
            {Object.entries(founderData.qcs.components).map(([key, value]) => (
              <AccordionItem key={key} id={key} title={key.charAt(0).toUpperCase() + key.slice(1)} content={value} isOpen={activeAccordion === key} toggle={toggleAccordion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ id, title, content, isOpen, toggle }: { id: string, title: string, content: string, isOpen: boolean, toggle: (id: string) => void }) => (
  <Card>
    <CardHeader onClick={() => toggle(id)} className="cursor-pointer flex flex-row items-center justify-between">
      <CardTitle>{title}</CardTitle>
      <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </CardHeader>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          <CardContent>{content}</CardContent>
        </motion.div>
      )}
    </AnimatePresence>
  </Card>
); 