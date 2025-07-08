"use client";
import React from 'react';
import { HeroSection } from '@/components/founder-v2/hero-section';
import { AboutSection } from '@/components/founder-v2/about-section';
import { SkillsSection } from '@/components/founder-v2/skills-section';
import { QCSSection } from '@/components/founder-v2/qcs-section';
import { ProjectsSection } from '@/components/founder-v2/projects-section';
import { ExperienceSection } from '@/components/founder-v2/experience-section';
import { ContactSection } from '@/components/founder-v2/contact-section';

export default function FounderV2Page() {
  return (
    <div className="bg-gray-900 text-white">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <QCSSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
} 