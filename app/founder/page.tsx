"use client";
import React from 'react';
import { founderData } from '@/lib/founder-data';
import { HeroSection } from '@/components/founder/hero-section';
import { AboutSection } from '@/components/founder/about-section';
import { SkillsSection } from '@/components/founder/skills-section';
import { QCSSection } from '@/components/founder/qcs-section';
import { ExperienceSection } from '@/components/founder/experience-section';
import { ProjectsSection } from '@/components/founder/projects-section';
import { PublicationsSection } from '@/components/founder/publications-section';
import { EducationSection } from '@/components/founder/education-section';
import { TestimonialsSection } from '@/components/founder/testimonials-section';
import { BlogSection } from '@/components/founder/blog-section';
import { ContactSection } from '@/components/founder/contact-section';
import { ThemeToggle } from '@/components/theme-toggle';

export default function FounderPage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{founderData.name}</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6 pt-20">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <QCSSection />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationsSection />
        <EducationSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
} 