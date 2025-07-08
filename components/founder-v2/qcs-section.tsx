"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const qcsData = {
  title: "From Reaction to Anticipation: The QCS Algorithm",
  problem: {
    title: "The Limits of 'Classical' AI",
    text: "Traditional conversational AI is reactive; it waits for user input. This is like trying to predict a single raindrop in a storm—computationally expensive and often wrong. The result is a system that can answer, but not truly collaborate."
  },
  solution: {
    title: "A Quantum Leap in Conversation",
    text: "QCS models the entire 'storm cloud' instead of the raindrop. It creates a 'superposition' of all possible future conversation states. When the user speaks, their query 'collapses' this cloud into a single, highly precise intent vector, allowing the AI to retrieve information with unprecedented relevance and speed."
  },
  innovations: [
    { title: "Continuous State Cloud", text: "Instead of guessing specific sentences, QCS models a continuous probability distribution of the entire potential conversational space." },
    { title: "Lightweight Generative Model", text: "Uses a specialized, highly efficient generative model (GAN/VAE) that is 10-100x faster than a general-purpose LLM for this task." },
    { title: "Contextual Collapse", text: "The core innovation. QCS projects the user's response onto the superposition vector to find the 'shadow' of their intent, providing a hyper-precise signal for what context is most relevant." }
  ]
};

export const QCSSection = () => {
  return (
    <section id="research" className="py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">{qcsData.title}</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-semibold mb-4 text-red-400">{qcsData.problem.title}</h3>
            <p className="text-lg text-gray-300">{qcsData.problem.text}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-semibold mb-4 text-emerald-400">{qcsData.solution.title}</h3>
            <p className="text-lg text-gray-300">{qcsData.solution.text}</p>
          </motion.div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Key Innovations</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {qcsData.innovations.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
                <Card className="h-full bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="text-emerald-400">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 