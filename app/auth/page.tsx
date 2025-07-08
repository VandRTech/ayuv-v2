"use client";
import React, { useState, FC, ElementType, ReactNode, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Calendar, Phone, Briefcase, HeartPulse, Rocket, Loader2, RefreshCw, HelpCircle } from "lucide-react";
import clsx from "clsx";
import { SpaceBackground } from "@/components/space-background";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { useSession } from "@supabase/auth-helpers-react";

const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
const professionOptions = ["Patient", "Doctor", "Nurse", "Caregiver", "Other"];

interface IntentInputProps {
  icon: ElementType;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}

const formFieldClass = "w-full bg-[#151922] text-white border border-white/10 focus:border-emerald-400 outline-none focus:outline-none transition-colors duration-200 pl-9 pr-3 py-2 rounded-md mt-2 appearance-none focus:ring-1 focus:ring-emerald-500 placeholder:text-white/30 text-base";
const labelBase = "absolute left-9 transition-all duration-200 pointer-events-none z-10 text-xs font-medium px-2";
const labelActive = "-top-3 bg-[#151922] text-emerald-400";
const labelInactive = "top-[45%] -translate-y-1/2 text-white/60 bg-transparent";

const StaticInput: FC<IntentInputProps> = ({ icon: Icon, label, type, value, onChange, required = false, placeholder = "" }) => (
  <div className="mb-4">
    <label className="block mb-1 ml-2 text-xs text-emerald-400 font-medium">{label}</label>
    <div className="relative">
      <Icon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 z-10" />
      <input type={type} value={value} onChange={onChange} required={required} className={formFieldClass} placeholder={placeholder} style={{ paddingLeft: 32 }} />
    </div>
  </div>
);

interface IntentSelectProps {
  icon: ElementType;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  required?: boolean;
}

const StaticSelect: FC<IntentSelectProps> = ({ icon: Icon, label, value, onChange, children, required = false }) => (
  <div className="mb-4">
    <label className="block mb-1 ml-2 text-xs text-emerald-400 font-medium">{label}</label>
    <div className="relative">
      <Icon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 z-10" />
      <select value={value} onChange={onChange} required={required} className={formFieldClass} style={{ paddingLeft: 32 }}>
        {children}
      </select>
    </div>
  </div>
);

const testimonialAuthors = [
  { name: "Priya Mehta", title: "AYUV User & Wellness Coach", avatar: "/profiles/flattering-pose-profile-pics.jpeg" },
  { name: "Rahul Sharma", title: "Patient Advocate", avatar: "/profiles/1-intro-photo-final.jpg" },
  { name: "Dr. Anjali Rao", title: "Family Physician", avatar: "/profiles/Jenna-Kang-Graham-photo-size.webp" },
];

const platformStats = [
  { value: "2M+", label: "Records Secured" },
  { value: "99.99%", label: "Uptime" },
  { value: "AI", label: "Powered Insights" },
];

function generateNewCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return {
    question: `What is ${num1} + ${num2}?`,
    answer: (num1 + num2).toString()
  };
}

export default function AuthPage() {
  const supabase = getSupabaseBrowserClient();
  const session = useSession();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState<Date | undefined>();
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [healthId, setHealthId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState(generateNewCaptcha());
  const [captchaAnswer, setCaptchaAnswer] = useState('');

  const refreshCaptcha = () => {
    setCaptcha(generateNewCaptcha());
    setCaptchaAnswer('');
  };

  useEffect(() => {
    if (session) {
      router.push('/redirect');
    }
  }, [session, router]);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    if (captchaAnswer.trim() !== captcha.answer) {
      setError("Incorrect captcha answer.");
      setLoading(false);
      refreshCaptcha();
      return;
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push('/redirect');
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            dob: dob ? format(dob, "yyyy-MM-dd") : null,
            gender,
            phone,
            profession,
            health_id: healthId,
          },
        },
      });
      if (error) setError(error.message);
      else if (data.user) router.push('/analysis');
    }
    setLoading(false);
  };

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black text-white">
      <div className="hidden lg:flex flex-col items-center justify-center p-12 relative overflow-hidden">
        <SpaceBackground backgroundImage="/images/earth-horizon.jpg" />
        <div className="relative z-10 w-full max-w-2xl mx-auto space-y-8">
          <h1 className="text-5xl font-bold">Join the Future of Health</h1>
          <p className="text-lg text-gray-300">Securely manage your health records, get AI-powered insights, and take control of your well-being.</p>
          <div className="grid grid-cols-3 gap-6 text-center">
            {platformStats.map(stat => (
              <div key={stat.label} className="bg-white/10 p-4 rounded-lg">
                <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="bg-white/10 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-lg">What Our Community Says</h3>
            <div className="flex -space-x-4">
              {testimonialAuthors.map(author => (
                <img key={author.name} src={author.avatar} alt={author.name} className="w-12 h-12 rounded-full border-2 border-black object-cover" />
              ))}
            </div>
            <p className="text-gray-300 italic">"AYUV has transformed how I manage my family's health. It's secure, intuitive, and powerful."</p>
          </div>
          <button className="w-full py-3 bg-gray-700 rounded-lg hover:bg-gray-600">Join Community</button>
        </div>
      </div>
      <div className="flex items-center justify-center p-4 relative">
        <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white">{isLogin ? "Welcome Back" : "Create Your Account"}</h2>
          <div className="flex justify-center bg-gray-900/50 rounded-lg p-1">
            <button onClick={() => setIsLogin(true)} className={`w-1/2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isLogin ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'}`}>Login</button>
            <button onClick={() => setIsLogin(false)} className={`w-1/2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${!isLogin ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700'}`}>Sign Up</button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={isLogin ? 'login' : 'signup'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <StaticInput icon={Mail} label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              {isLogin ? (
                <StaticInput icon={Lock} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <StaticInput icon={User} label="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <StaticInput icon={User} label="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                  <div className="mb-4"><DatePicker date={dob} setDate={setDob} placeholder="Date of Birth" /></div>
                  <StaticSelect icon={User} label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="" disabled>Select Gender</option>
                    {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </StaticSelect>
                  <StaticInput icon={Phone} label="Phone (Optional)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <StaticSelect icon={Briefcase} label="Profession" value={profession} onChange={(e) => setProfession(e.target.value)} required>
                    <option value="" disabled>Select Profession</option>
                    {professionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </StaticSelect>
                  <StaticInput icon={HeartPulse} label="Health ID (Optional)" type="text" value={healthId} onChange={(e) => setHealthId(e.target.value)} />
                  <StaticInput icon={Lock} label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <StaticInput icon={Lock} label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <div className="flex items-center gap-4 bg-gray-900/50 p-3 rounded-lg">
                    <p className="text-white">What is {captcha.question}?</p>
                    <StaticInput icon={HelpCircle} label="Answer" type="number" value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)} required />
                    <button onClick={refreshCaptcha} className="p-2 text-gray-400 hover:text-white"><RefreshCw className="w-5 h-5" /></button>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}
          <button onClick={handleAuth} disabled={loading} className="w-full py-3 mt-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Login" : "Create Account")}
          </button>
        </div>
      </div>
    </div>
  );
} 