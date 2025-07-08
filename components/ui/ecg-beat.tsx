"use client";
import React from "react";
import { motion } from "framer-motion";

export const EcgBeat = () => (
  <div className="w-full flex items-center justify-center overflow-hidden">
    <motion.svg
      width="100%"
      height="100"
      viewBox="0 0 400 100"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
    >
      <motion.path
        d="M0 50 H 80 L 100 30 L 120 70 L 140 50 H 220 L 240 30 L 260 70 L 280 50 H 400"
        stroke="#10B981"
        strokeWidth="2"
        fill="none"
        strokeDasharray="1 1"
        strokeLinecap="round"
      />
    </motion.svg>
  </div>
); 