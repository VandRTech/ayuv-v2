"use client"

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Activity, Brain, HeartPulse, Stethoscope, ClipboardList, Home, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- Loading Screen Component ---
export const AiraReportLoading: FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center w-full h-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-6"
    >
      <div className="relative flex items-center justify-center mb-4">
        <span className="absolute animate-ping inline-flex h-24 w-24 rounded-full bg-emerald-500 opacity-30"></span>
        <Loader2 className="w-20 h-20 text-emerald-400 animate-spin" />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white text-center">AIRA is preparing your personalized health report...</h2>
      <p className="text-gray-400 text-lg text-center max-w-xl">This may take a moment as we analyze your data and generate actionable insights just for you.</p>
    </motion.div>
  </div>
);

// Utility to color status keywords in text
function colorStatusKeywords(text: string) {
  return text
    .replace(/\b(Critical|Urgent|Elevated|Severely High|Severely Abnormal)\b/gi, '<span class="text-red-400 font-bold">$1</span>')
    .replace(/\b(High|Above Range|Markedly High)\b/gi, '<span class="text-orange-400 font-bold">$1</span>')
    .replace(/\b(Borderline|Needs Attention|Slightly High|Slightly Low)\b/gi, '<span class="text-yellow-400 font-bold">$1</span>')
    .replace(/\b(Low|Below Range|Deficient)\b/gi, '<span class="text-blue-400 font-bold">$1</span>')
    .replace(/\b(Normal|Good|Healthy|Optimal)\b/gi, '<span class="text-emerald-400 font-bold">$1</span>');
}

// Function to get the appropriate emoji for each section
const getSectionEmoji = (text: string) => {
  if (text.includes('Overall Health Summary')) return '📝';
  if (text.includes('Biomarker Analysis')) return '🧬';
  if (text.includes('Lifestyle Insights')) return '🍽️';
  if (text.includes('Recommendations')) return '💡';
  if (text.includes('Urgent')) return '⚠️';
  if (text.includes('Disclaimer') || text.includes('Privacy')) return '🔒';
  return '';
};

// --- AIRA Report Component ---
export const AiraReport: FC<{ report: string, onStartNew: () => void }> = ({ report, onStartNew }) => {
  // Custom components for ReactMarkdown to style the output
  const markdownComponents: any = {
    h3: ({ children, ...props }: any) => {
      const text = children?.toString() || '';
      // Check if it's the AIRA greeting
      if (text.includes("Hi") && text.includes("AIRA")) {
        return (
          <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3"
            {...props}
          >
            🧠 {children}
          </motion.h3>
        );
      }
      // Style section headers with emoji
      return (
        <h3 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3" {...props}>
          <span>{getSectionEmoji(text)}</span>
          {children}
        </h3>
      );
    },
    h4: ({ children, ...props }: any) => (
      <h4 className="text-xl font-semibold text-emerald-400 mt-8 mb-4" {...props}>{children}</h4>
    ),
    p: ({ children, ...props }: any) => {
      // Color status keywords in all paragraphs
      const raw = children?.toString() || '';
      const html = colorStatusKeywords(raw);
      // Check for urgent content
      if (raw.includes('require prompt attention') || raw.includes('urgent')) {
        return (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-lg leading-relaxed mb-4 font-semibold"
            {...props}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      }
      return <p className="text-gray-300 text-lg leading-relaxed mb-4" {...props} dangerouslySetInnerHTML={{ __html: html }} />;
    },
    ul: ({ children, ...props }: any) => (
      <ul className="space-y-3 mb-6 ml-4" {...props}>{children}</ul>
    ),
    li: ({ children, ...props }: any) => {
      // Color status keywords in list items
      const raw = children?.toString() || '';
      const html = colorStatusKeywords(raw);
      return (
        <li className="flex items-start text-gray-300" {...props}>
          <span className="text-emerald-400 mr-3 mt-1.5">•</span>
          <span className="flex-1" dangerouslySetInnerHTML={{ __html: html }} />
        </li>
      );
    },
    strong: ({ children, ...props }: any) => (
      <strong className="text-white font-semibold" {...props}>{children}</strong>
    ),
    em: ({ children, ...props }: any) => (
      <em className="text-gray-400 italic text-sm" {...props}>{children}</em>
    ),
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }: any) => (
      <thead className="bg-gray-800/50" {...props}>{children}</thead>
    ),
    th: ({ children, ...props }: any) => (
      <th className="px-6 py-4 text-left font-semibold text-white border-b border-gray-700" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => {
      const text = children?.toString() || '';
      // Style status cells
      if (/Critical|Urgent|Elevated|Severely High|Severely Abnormal/i.test(text)) {
        return (
          <td className="px-6 py-4 border-b border-gray-700 bg-red-900/30" {...props}>
            <span className="text-red-400 font-bold">{children}</span>
          </td>
        );
      }
      if (/High|Above Range|Markedly High/i.test(text)) {
        return (
          <td className="px-6 py-4 border-b border-gray-700 bg-orange-900/30" {...props}>
            <span className="text-orange-400 font-bold">{children}</span>
          </td>
        );
      }
      if (/Borderline|Needs Attention|Slightly High|Slightly Low/i.test(text)) {
        return (
          <td className="px-6 py-4 border-b border-gray-700 bg-yellow-900/30" {...props}>
            <span className="text-yellow-400 font-bold">{children}</span>
          </td>
        );
      }
      if (/Low|Below Range|Deficient/i.test(text)) {
        return (
          <td className="px-6 py-4 border-b border-gray-700 bg-blue-900/30" {...props}>
            <span className="text-blue-400 font-bold">{children}</span>
          </td>
        );
      }
      if (/Normal|Good|Healthy|Optimal/i.test(text)) {
        return (
          <td className="px-6 py-4 border-b border-gray-700 bg-emerald-900/20" {...props}>
            <span className="text-emerald-400 font-bold">{children}</span>
          </td>
        );
      }
      return (
        <td className="px-6 py-4 text-gray-300 border-b border-gray-700" {...props}>
          {children}
        </td>
      );
    },
    hr: () => <hr className="border-gray-700 my-8" />,
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="bg-blue-900/20 border-l-4 border-blue-500 p-6 my-8 italic flex items-start gap-3" {...props}>
        <span className="text-blue-400 text-2xl">🔒</span>
        <span>{children}</span>
      </blockquote>
    ),
  };

  // Function to get the appropriate icon for each section
  const getSectionIcon = (text: string) => {
    if (text.includes('Overall Health Summary')) return <Activity className="w-6 h-6 text-emerald-400" />;
    if (text.includes('Biomarker Analysis')) return <Stethoscope className="w-6 h-6 text-emerald-400" />;
    if (text.includes('Lifestyle Insights')) return <HeartPulse className="w-6 h-6 text-emerald-400" />;
    if (text.includes('Recommendations')) return <ClipboardList className="w-6 h-6 text-emerald-400" />;
    if (text.includes('Urgent')) return <AlertTriangle className="w-6 h-6 text-red-400" />;
    if (text.includes('Disclaimer')) return <FileText className="w-6 h-6 text-blue-400" />;
    return null;
  };

  // Check if report contains urgent actions
  const hasUrgentActions = report.includes('Urgent & Immediate Actions');

  // Custom rendering for Additional Findings block
  function renderWithAdditionalFindings(report: string) {
    const marker = '<!--additional-findings-->';
    const endMarker = '<!--/additional-findings-->';
    if (report.includes(marker)) {
      const [before, rest] = report.split(marker);
      const [block, after] = rest.split(endMarker);
      return <>
        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>{before}</ReactMarkdown>
        <div className="my-8 p-6 rounded-2xl border-2 border-yellow-400 bg-yellow-900/20 shadow-lg">
          <div className="flex items-center mb-3">
            <span className="text-yellow-400 text-2xl mr-2">⚡</span>
            <span className="text-lg font-bold text-yellow-300">Additional Findings (Auto-Added)</span>
          </div>
          <div className="text-yellow-100 text-base" dangerouslySetInnerHTML={{ __html: block }} />
        </div>
        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>{after}</ReactMarkdown>
      </>;
    }
    return <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>;
  }

  return (
    <div className="min-h-screen w-full bg-[#0D1117] text-gray-200 font-sans">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header with urgent indicator if needed */}
          {hasUrgentActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-900/30 border-2 border-red-500 rounded-2xl p-4 mb-8 flex items-center gap-3"
            >
              <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
              <div>
                <h2 className="text-xl font-bold text-white">Important Health Alert</h2>
                <p className="text-red-300">This report contains findings that require immediate medical attention.</p>
              </div>
            </motion.div>
          )}

          {/* Main report card */}
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* AIRA Logo/Badge */}
            <div className="flex justify-center mb-8">
              <div className="bg-emerald-500/10 rounded-full p-6 border-2 border-emerald-500/30">
                <Brain className="w-16 h-16 text-emerald-400" />
              </div>
            </div>

            {/* Render the markdown report */}
            <div className="prose prose-invert prose-lg max-w-none">
              {renderWithAdditionalFindings(report)}
            </div>

            {/* Action buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Print Report
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStartNew}
                className="px-8 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Start New Analysis
              </motion.button>
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              Generated by AIRA - AI-powered Report Analyzer
            </p>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};
 