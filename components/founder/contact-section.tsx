// ContactSection.tsx
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { founderData } from '@/lib/founder-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Linkedin, Github, Mail, Phone } from 'lucide-react';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Me</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">I'm available for consulting and collaboration. Let's build the future of AI together.</p>
            <div className="space-y-4">
              <a href={`mailto:${founderData.email}`} className="flex items-center gap-3"><Mail /> {founderData.email}</a>
              <a href={`tel:${founderData.phone}`} className="flex items-center gap-3"><Phone /> {founderData.phone}</a>
              <a href={founderData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><Linkedin /> LinkedIn</a>
              <a href={founderData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3"><Github /> GitHub</a>
            </div>
          </div>
          <motion.form onSubmit={handleSubmit} className="space-y-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={formData.message} onChange={handleChange} required />
            </div>
            <Button type="submit">Send Message</Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}; 