"use client"

import React, { useState, useEffect, useCallback, FC, useRef } from 'react';
import { Loader2, UploadCloud, CheckCircle2, AlertCircle, FileText, Bot, ChevronRight, Activity, RefreshCw, AlertTriangle, Droplets, HeartPulse, ShieldCheck } from 'lucide-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { AiraReport } from '@/components/health-report';
import { EcgBeat } from '@/components/ui/ecg-beat';
import './markdown.css'; // We will create this file for styling
import { useRouter } from "next/navigation";

// --- Types ---
type AnalysisStatus = 'IDLE' | 'SUBMITTING' | 'RECEIVED' | 'PROCESSING' | 'OCR_COMPLETE' | 'QUESTIONS_READY' | 'COMPLETED' | 'GENERATING_REPORT' | 'REPORT_READY' | 'FAILED';
type Answer = { question: string; answer: string };

// --- Main Page Component ---
const HealthAnalysisPage: FC = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  
  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [units, setUnits] = useState('metric');
  const [language, setLanguage] = useState('English');
  const [diet, setDiet] = useState('');
  const [occupation, setOccupation] = useState('');
  const [sleep, setSleep] = useState('');
  const [healthReport, setHealthReport] = useState<File | null>(null);
  
  // App Logic State
  const [error, setError] = useState<string | null>(null);
  const [lastSessionId, setLastSessionId] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>('IDLE');
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [finalReport, setFinalReport] = useState<string | null>(null);
  
  // Questions State
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  // Callbacks
  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  }, []);

  const pollAnalysisStatus = useCallback(async (sessionId: string) => {
    try {
      const response = await fetch(`/api/analysis/resume?sessionId=${sessionId}`);
      if (!response.ok) {
        if (response.status === 404) return;
        throw new Error(`Status check failed: ${response.status}`);
      }
      const data: any = await response.json();
      setStatus(data.status);

      if (data.status === 'REPORT_READY') {
        stopPolling();
        const reportResponse = await fetch(`/api/analysis/report?sessionId=${sessionId}`);
        const reportData = await reportResponse.json();
        let finalReport = reportData.final_report;
        let extracted = reportData.extracted_text;
        try {
          const extractedObj = typeof extracted === 'string' ? JSON.parse(extracted) : extracted;
          if (extractedObj && typeof extractedObj === 'object') {
            const paramNames = Object.keys(extractedObj);
            const missing = paramNames.filter(param => !finalReport.includes(param));
            if (missing.length > 0) {
              finalReport += `\n\n<!--additional-findings--><div class='aira-additional-findings-block' style='background:#1E293B;border:2px solid #10B981;border-radius:1rem;padding:1.5rem;margin:2rem 0;'>\n`;
              finalReport += `<div class='aira-additional-findings-header' style='display:flex;align-items:center;margin-bottom:0.75em;'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='none' viewBox='0 0 24 24' stroke='#10B981' stroke-width='2' style='margin-right:0.5em;'><path stroke-linecap='round' stroke-linejoin='round' d='M13 10V3L4 14h7v7l9-11h-7z'/></svg> <span style='color:#34D399;font-weight:700;font-size:1.1em;'>Additional Findings (Auto-Added)</span></div>\n<ul style='margin-top:0.5em;'>`;
              missing.forEach(param => {
                const value = extractedObj[param];
                if (
                  typeof value === 'string' &&
                  (param.toLowerCase().includes('raw') || value.length > 300)
                ) return;
                const prettyParam = param.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                finalReport += `\n<li><strong style='color:#10B981;'>${prettyParam}</strong>: <span style='color:#fff;'>${JSON.stringify(value)}</span></li>`;
              });
              finalReport += `\n</ul>\n</div><!--/additional-findings-->`;
            }
          }
        } catch (e) { /* ignore parse errors */ }
        setFinalReport(finalReport);
      } else if (data.status === 'QUESTIONS_READY') {
        stopPolling();
        let questionsArray = data.questions || [];
        if (typeof questionsArray === 'string') questionsArray = JSON.parse(questionsArray);
        setQuestions(Array.isArray(questionsArray) ? questionsArray : []);
        setAnswers(data.answers || []);
        setCurrentQuestionIndex((data.answers || []).length);
      }
    } catch (err: any) {
      console.error('[POLL] Error:', err);
    }
  }, [stopPolling, answers]); // Added 'answers' to dependency array

  const triggerReportGeneration = useCallback(async (sessionId: string) => {
    console.log('[REPORT] Triggering final report generation...');
    setStatus('GENERATING_REPORT');
    try {
      const allAnswers = answers.reduce((acc, answer) => {
        acc[answer.question] = answer.answer;
        return acc;
      }, {} as Record<string, string>);

      await fetch('/api/analysis/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userAnswers: allAnswers }),
      });
      pollingIntervalRef.current = setInterval(() => pollAnalysisStatus(sessionId), 5000);
    } catch (e) {
      console.error("Failed to trigger report generation.", e);
      setError("Error starting report generation. Please try refreshing.");
      setStatus('FAILED');
    }
  }, [answers, pollAnalysisStatus]);

  const handleStartNew = useCallback(() => {
    stopPolling();
    localStorage.removeItem('ayuv_last_session_id');
    setLastSessionId(null);
    setStatus('IDLE');
    setError(null);
    setName(''); setAge(''); setGender(''); setHeight(''); setWeight('');
    setUnits('metric'); setLanguage('English'); setDiet(''); setOccupation('');
    setSleep(''); setHealthReport(null); setQuestions([]); setCurrentQuestionIndex(0);
    setAnswers([]); setCurrentAnswer(''); setFinalReport(null);
  }, [stopPolling]);

  // Effects
  useEffect(() => {
    const loadSession = async () => {
      const storedSessionId = localStorage.getItem('ayuv_last_session_id');
      if (storedSessionId) {
        setLastSessionId(storedSessionId);
        pollAnalysisStatus(storedSessionId);
      }
    };
    loadSession();
    return stopPolling;
  }, [pollAnalysisStatus, stopPolling]);

  useEffect(() => {
    const isProcessing = ['SUBMITTING', 'RECEIVED', 'PROCESSING', 'OCR_COMPLETE', 'GENERATING_REPORT'].includes(status);
    if (isProcessing && lastSessionId && !pollingIntervalRef.current) {
      pollingIntervalRef.current = setInterval(() => pollAnalysisStatus(lastSessionId), 5000);
    } else if (!isProcessing && pollingIntervalRef.current) {
      stopPolling();
    }
  }, [status, lastSessionId, pollAnalysisStatus, stopPolling]);

  useEffect(() => {
    if (session === null) {
      return;
    }
    if (!session) {
      router.replace("/auth");
    }
  }, [session, router]);

  // Dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: FileWithPath[]) => setHealthReport(acceptedFiles[0]),
    accept: { 'application/pdf': ['.pdf'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/bmp': ['.bmp'], 'image/tiff': ['.tiff', '.tif'], 'image/webp': ['.webp'] },
    maxFiles: 1,
  });

  if (!session) {
    // Session is still loading or user is not authenticated and is being redirected.
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 text-emerald-400 animate-spin mb-4" />
        <p className="text-lg text-gray-300">Loading...</p>
      </div>
    );
  }

  // --- Rest of the component ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !gender || !healthReport) {
      setError('Please fill out Name, Age, Gender, and upload a health report.');
      return;
    }
    setStatus('SUBMITTING');
    setError(null);
    stopPolling();

    const formData = new FormData();
    Object.entries({ name, age, gender, height, weight, units, language, diet, occupation, sleep, healthReport }).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const response = await fetch('/api/health/intake', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Submission failed');

      setLastSessionId(result.sessionId);
      localStorage.setItem('ayuv_last_session_id', result.sessionId);
      pollAnalysisStatus(result.sessionId);
    } catch (err: any) {
      setError(err.message);
      setStatus('FAILED');
    }
  };

  const handleAnswerSubmit = async () => {
    if (!currentAnswer.trim()) { setError('Please provide an answer.'); return; }
    setIsSubmittingAnswer(true);
    setError(null);
    
    try {
        const { data: { session } } = await supabase.auth.getSession();
        const response = await fetch('/api/analysis/answer', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.access_token}`
            },
            body: JSON.stringify({ sessionId: lastSessionId, question: questions[currentQuestionIndex], answer: currentAnswer }),
        });
        if (!response.ok) throw new Error('Failed to save your answer.');

        const newAnswers = [...answers, { question: questions[currentQuestionIndex], answer: currentAnswer }];
        setAnswers(newAnswers);
        setCurrentAnswer('');

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // All questions answered, trigger report generation
            const allAnswers = newAnswers.reduce((acc, answer) => {
              acc[answer.question] = answer.answer;
              return acc;
            }, {} as Record<string, string>);
            
            await triggerReportGeneration(lastSessionId!);
        }
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsSubmittingAnswer(false);
    }
  };

  const isFormDisabled = !['IDLE', 'FAILED'].includes(status);

  const renderRightPanel = () => {
    switch (status) {
      case 'IDLE': return <StatusDisplay key="idle" icon={Bot} title="Awaiting Input" message="Please complete the form to begin." />;
      case 'SUBMITTING':
      case 'RECEIVED':
      case 'PROCESSING':
      case 'OCR_COMPLETE':
        return <StatusDisplay key="processing" icon={Loader2} title="Analysis in Progress" message={`Status: ${status}. Our AI is analyzing your report.`} isloading onRefresh={() => pollAnalysisStatus(lastSessionId!)} onStartNew={handleStartNew} />;
      case 'QUESTIONS_READY':
        return (
            <motion.div key="questions" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} className="flex flex-col h-full">
                <div className="space-y-1 mb-6">
                    <h2 className="text-2xl font-bold text-emerald-400">Personalized Questions</h2>
                    <p className="text-white/60">To refine your health profile, please answer the following:</p>
                </div>
                <div className="flex-grow space-y-4">
                    <p className="text-white/70">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    <p className="text-xl font-medium text-white">{questions[currentQuestionIndex]}</p>
                    <textarea value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)} placeholder="Your answer here..." className="form-input w-full min-h-[100px] text-base" rows={4} />
                </div>
                <button onClick={handleAnswerSubmit} disabled={isSubmittingAnswer} className="w-full mt-4 py-3 px-4 bg-emerald-600 font-bold rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center disabled:bg-gray-600 disabled:cursor-not-allowed">
                    {isSubmittingAnswer ? <Loader2 className="animate-spin" /> : <>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Analysis'} <ChevronRight className="ml-2"/></>}
                </button>
                {error && <p className="text-red-400 text-center text-sm mt-2">{error}</p>}
            </motion.div>
        );
      case 'GENERATING_REPORT': return <StatusDisplay key="generating" icon={Loader2} title="Aira is analyzing your vitals..." message="This may take a moment." isloading />;
      case 'REPORT_READY': return <StatusDisplay key="report-ready" icon={CheckCircle2} title="Your Report is Ready" message="Please review the detailed analysis on the left. Remember to consult a doctor with these findings." onStartNew={handleStartNew} />;
      case 'FAILED': return <StatusDisplay key="failed" icon={AlertCircle} title="Analysis Failed" message={error || 'An unknown error occurred.'} onRefresh={() => pollAnalysisStatus(lastSessionId!)} onStartNew={handleStartNew} />;
      default: return null;
    }
  }

  if (status === 'REPORT_READY' && finalReport) {
    return <AiraReport report={finalReport} onStartNew={handleStartNew} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#0D1117] text-white flex flex-col items-center justify-center p-4 lg:p-8 font-sans">
      <main className="w-full h-full lg:h-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-6">
            <>
              <div className="space-y-1"><h1 className="text-3xl font-bold text-emerald-400">Health Intake</h1><p className="text-white/60">Provide your details for a personalized AI analysis.</p></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Name *" value={name} onChange={e => setName(e.target.value)} disabled={isFormDisabled} required className="form-input"/>
                    <input placeholder="Age *" type="number" value={age} onChange={e => setAge(e.target.value)} disabled={isFormDisabled} required className="form-input"/>
                </div>
                <select value={gender} onChange={e => setGender(e.target.value)} disabled={isFormDisabled} required className="form-input"><option value="">Select Gender *</option><option>Male</option><option>Female</option><option>Other</option></select>
                <div className="flex items-center space-x-2">
                    <input placeholder="Height" type="number" value={height} onChange={e => setHeight(e.target.value)} disabled={isFormDisabled} className="form-input" />
                    <input placeholder="Weight" type="number" value={weight} onChange={e => setWeight(e.target.value)} disabled={isFormDisabled} className="form-input" />
                    <div className="flex rounded-md shadow-sm">
                        <button type="button" onClick={() => setUnits('metric')} className={`px-3 py-2 text-xs font-medium ${units === 'metric' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white/70'} border border-white/20 rounded-l-md hover:bg-emerald-700 focus:z-10 focus:outline-none`}>cm/kg</button>
                        <button type="button" onClick={() => setUnits('imperial')} className={`-ml-px px-3 py-2 text-xs font-medium ${units === 'imperial' ? 'bg-emerald-600 text-white' : 'bg-white/10 text-white/70'} border border-white/20 rounded-r-md hover:bg-emerald-700 focus:z-10 focus:outline-none`}>in/lbs</button>
                    </div>
                </div>
                <select value={occupation} onChange={e => setOccupation(e.target.value)} disabled={isFormDisabled} className="form-input"><option value="">Occupation (Optional)</option><option>Farming / Labor</option><option>Office / Desk Job</option><option>Homemaker</option><option>Student</option><option>Business</option></select>
                <select value={diet} onChange={e => setDiet(e.target.value)} disabled={isFormDisabled} className="form-input"><option value="">Diet (Optional)</option><option>Vegetarian</option><option>Eggetarian</option><option>Non-Vegetarian</option></select>
                <select value={sleep} onChange={e => setSleep(e.target.value)} disabled={isFormDisabled} className="form-input"><option value="">Sleep Duration (Optional)</option><option>Less than 5 hours</option><option>5-6 hours</option><option>7-8 hours</option><option>More than 8 hours</option></select>
                <div {...getRootProps()} className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isFormDisabled ? 'cursor-not-allowed bg-white/5' : ''} ${isDragActive ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/20 hover:border-emerald-500/50'}`}>
                    <input {...getInputProps()} disabled={isFormDisabled}/>
                    <UploadCloud className="mx-auto h-10 w-10 text-white/40 mb-2"/>
                    {healthReport ? <p className="text-emerald-400">{healthReport.name}</p> : <div className="text-white/60"><p>Drop your health report here *</p><p className="text-sm text-white/40 mt-1">PDF & Images Supported</p></div>}
                </div>
                <button type="submit" disabled={isFormDisabled} className="w-full py-3 px-4 bg-emerald-600 font-bold rounded-lg hover:bg-emerald-700 transition-all disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center">
                    {status === 'SUBMITTING' ? <Loader2 className="animate-spin"/> : 'Begin AI Analysis'}
                </button>
                {error && <p className="text-red-400 text-center text-sm">{error}</p>}
              </form>
            </>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col">
          <AnimatePresence mode="wait">{renderRightPanel()}</AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

// --- New Report Components ---

const StatusDisplay: FC<{icon: FC<any>, title: string, message: string, isloading?: boolean, onRefresh?: () => void, onStartNew?: () => void }> = ({icon: Icon, title, message, isloading, onRefresh, onStartNew}) => (
    <motion.div initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.9}} className="m-auto text-center space-y-4">
        {isloading ? (
          <EcgBeat />
        ) : (
          <Icon className={`mx-auto h-16 w-16 text-emerald-500`}/>
        )}
        <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-white/60 max-w-sm mx-auto">{message}</p>
        </div>
        <div className="flex flex-col items-center space-y-3">
            {onRefresh && <button onClick={onRefresh} className="flex items-center justify-center mx-auto px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition-colors"><RefreshCw className="w-4 h-4 mr-2"/>Check Status Now</button>}
            {onStartNew && <button onClick={onStartNew} className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium">Start a new analysis</button>}
        </div>
    </motion.div>
);

export default HealthAnalysisPage;

// Add this to your globals.css or a style tag
/*
.form-input {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  color: white;
  transition: all 0.2s;
}
.form-input:focus {
  outline: none;
  border-color: #34D399;
  box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.5);
}
.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
*/ 