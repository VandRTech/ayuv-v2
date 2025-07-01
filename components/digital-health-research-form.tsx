"use client"

import React, { useState, useEffect, FC, ReactNode, ElementType } from 'react'
import { User, Mail, Heart, Smartphone, Star, Target, CheckCircle, AlertTriangle, TrendingUp, MessageSquare, Clock, Gift } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpaceBackground } from "@/components/space-background"
import { useRouter } from "next/navigation"

interface FormData {
  name: string
  email: string
  age: string
  gender: string
  education: string
  techExperience: string
  healthConditions: string[]
  deviceUsage: string[]
  appComfort: number
  dataPrivacy: number
  healthLiteracy: number
  currentHealthFeelings: string[]
  healthcareEmotions: number
  technologyTrust: number
  motivationLevel: number
  trustFactors: string[]
  privacyConcerns: string[]
  trackingBehaviors: string[]
  healthGoals: string[]
  caregivingRole: string
  usabilityRating: number
  valuePerception: number
  adoptionLikelihood: number
  frustrations: string[]
  technologyIssues: string[]
  emotionalTriggers: string[]
  readinessStage: string
  changeFactors: string[]
  supportNeeds: string[]
  healthStory: string
  idealExperience: string
  concerns: string
  adoptionTimeline: string
  expectations: string[]
  vision: string
  willingnessToPay: string
  featureWillingnessToPay: string[]
  switchLikelihood: string
  tooExpensiveThreshold: string
  paymentPreference: string[]
  privacyPremium: string
  premiumFactors: string[]
  contingentValue: string
  bundlePreference: string
  anchoringTest: string
  budgetPercentage: string
  premiumUseCase: string
}

const benefitMessages = [
  "Eligible for exclusive digital health insights!",
  "Get early access to new features and rewards!",
  "Your feedback helps shape the future of health tech!",
  "Receive a personalized digital health report!",
  "Be entered to win premium health app subscriptions!"
]

// Floating label input (from signup/auth form)
interface IntentInputProps {
  icon: ElementType;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
const IntentInput: FC<IntentInputProps> = ({ icon: Icon, label, type, value, onChange, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;
  return (
    <div className="relative">
      <Icon className={
        `absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${isFocused || hasValue ? "text-emerald-400" : "text-white/40"}`
      } />
      <label
        className={
          `absolute left-10 transition-all duration-300 pointer-events-none ${(isFocused || hasValue || type === 'date') ? "top-0 text-xs text-emerald-400" : "top-1/2 -translate-y-1/2 text-base text-white/40"}`
        }
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        className="w-full bg-transparent pl-10 pb-1 pt-4 text-white border-b-2 outline-none focus:outline-none transition-colors duration-300 border-white/20 focus:border-emerald-400"
      />
    </div>
  );
};

// Floating label select (from signup/auth form)
interface IntentSelectProps {
  icon: ElementType;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  required?: boolean;
}
const IntentSelect: FC<IntentSelectProps> = ({ icon: Icon, label, value, onChange, children, required = false }) => {
  return (
    <div className="relative flex items-center">
      <Icon className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
      <div className="flex-1">
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-transparent pl-10 pb-1 pt-4 text-white border-b-2 outline-none focus:outline-none transition-colors duration-300 border-white/20 focus:border-emerald-400 appearance-none"
        >
          {children}
        </select>
      </div>
    </div>
  );
};

// Add ThankYouPage component at the top level
const ThankYouPage = ({ router }: { router: ReturnType<typeof useRouter> }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/")
    }, 5000)
    return () => clearTimeout(timer)
  }, [router])
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative">
      <SpaceBackground backgroundImage="/images/earth-horizon.jpg" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-lg w-full shadow-2xl flex flex-col items-center gap-8 text-center">
          <CheckCircle className="w-20 h-20 text-emerald-400 mb-4 animate-bounce" />
          <h2 className="text-5xl font-extrabold text-emerald-400 mb-2 drop-shadow">Thank You!</h2>
          <p className="text-white/90 text-xl mb-6 max-w-xl">Your responses have been submitted.<br/>We appreciate your valuable feedback in shaping the future of digital health.</p>
          <button
            className="px-10 py-4 bg-emerald-500 text-white rounded-full text-xl font-bold shadow-lg hover:bg-emerald-600 transition mb-2"
            onClick={() => router.push("/")}
          >
            Visit AYUV
          </button>
          <p className="text-emerald-400 text-base mt-2">You will be redirected to the AYUV homepage in 5 seconds...</p>
        </div>
      </div>
    </div>
  )
}

const DigitalHealthResearchForm = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    age: '',
    gender: '',
    education: '',
    techExperience: '',
    healthConditions: [],
    deviceUsage: [],
    appComfort: 5,
    dataPrivacy: 5,
    healthLiteracy: 5,
    currentHealthFeelings: [],
    healthcareEmotions: 5,
    technologyTrust: 5,
    motivationLevel: 5,
    trustFactors: [],
    privacyConcerns: [],
    trackingBehaviors: [],
    healthGoals: [],
    caregivingRole: '',
    usabilityRating: 5,
    valuePerception: 5,
    adoptionLikelihood: 5,
    frustrations: [],
    technologyIssues: [],
    emotionalTriggers: [],
    readinessStage: '',
    changeFactors: [],
    supportNeeds: [],
    healthStory: '',
    idealExperience: '',
    concerns: '',
    adoptionTimeline: '',
    expectations: [],
    vision: '',
    willingnessToPay: '',
    featureWillingnessToPay: [],
    switchLikelihood: '',
    tooExpensiveThreshold: '',
    paymentPreference: [],
    privacyPremium: '',
    premiumFactors: [],
    contingentValue: '',
    bundlePreference: '',
    anchoringTest: '',
    budgetPercentage: '',
    premiumUseCase: ''
  })
  const [showBenefit, setShowBenefit] = useState(true)
  const [benefitIdx, setBenefitIdx] = useState<number | null>(null)
  const [touched, setTouched] = useState<{[k:string]:boolean}>({})
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  // On mount, check if already submitted in this session
  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('ayuv_research_submitted') === '1') {
      setSubmitted(true)
    }
  }, [])

  useEffect(() => {
    setBenefitIdx(Math.floor(Math.random() * benefitMessages.length))
  }, [])

  // All form sections (excluding welcome step)
  const sections = [
    {
      title: "Demographics & Background",
      icon: User,
      questions: [
        {
          type: "select",
          label: "Age Group",
          field: "age",
          options: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
        },
        {
          type: "select", 
          label: "Gender",
          field: "gender",
          options: ["Male", "Female", "Non-binary", "Prefer not to say"]
        },
        {
          type: "select",
          label: "Education Level", 
          field: "education",
          options: ["High School", "Some College", "Bachelor's", "Graduate Degree"]
        },
        {
          type: "select",
          label: "Technology Experience",
          field: "techExperience",
          options: ["Beginner", "Intermediate", "Advanced", "Expert"]
        },
        {
          type: "checkbox",
          label: "Health Conditions",
          field: "healthConditions",
          options: ["Diabetes", "Heart Disease", "Mental Health", "Chronic Pain", "None"]
        }
      ],
      vocabulary: [
        { term: "Chronic Disease", definition: "A long-lasting health condition that may not have a cure (e.g., diabetes, heart disease)." },
        { term: "Health Literacy", definition: "How well you can find, understand, and use health information." },
        { term: "Technology Experience", definition: "How comfortable you are using digital devices and apps." }
      ]
    },
    {
      title: "Digital Health Readiness",
      icon: Smartphone,
      questions: [
        {
          type: "checkbox",
          label: "Devices you use regularly",
          field: "deviceUsage",
          options: ["Smartphone", "Tablet", "Computer", "Smartwatch", "Fitness Tracker"]
        },
        {
          type: "slider",
          label: "Comfort with health apps",
          field: "appComfort",
          min: 0,
          max: 10
        },
        {
          type: "slider", 
          label: "Data privacy concern level",
          field: "dataPrivacy",
          min: 0,
          max: 10
        },
        {
          type: "slider",
          label: "Health information literacy", 
          field: "healthLiteracy",
          min: 0,
          max: 10
        }
      ],
      vocabulary: [
        { term: "Wearable", definition: "A smart device you can wear, like a fitness tracker or smartwatch." },
        { term: "Data Privacy", definition: "How your personal information is protected and kept confidential." },
        { term: "Health App", definition: "A mobile or web application that helps you manage your health." }
      ]
    },
    {
      title: "Health Emotions & Attitudes",
      icon: Heart,
      questions: [
        {
          type: "checkbox",
          label: "Current feelings about your health",
          field: "currentHealthFeelings",
          options: ["Anxious", "Confident", "Frustrated", "Empowered", "Overwhelmed", "Hopeful", "Isolated", "Motivated"]
        },
        {
          type: "slider",
          label: "Overall healthcare experience emotions",
          field: "healthcareEmotions",
          min: 0,
          max: 10
        },
        {
          type: "slider",
          label: "Trust in health technology",
          field: "technologyTrust",
          min: 0,
          max: 10
        },
        {
          type: "slider",
          label: "Motivation to improve health",
          field: "motivationLevel",
          min: 0,
          max: 10
        }
      ],
      vocabulary: [
        { term: "Motivation", definition: "Your drive or willingness to take action for your health." },
        { term: "Trust in Technology", definition: "How much you believe digital tools will work safely and as intended." },
        { term: "Healthcare Experience", definition: "Your feelings and interactions with doctors, hospitals, and health services." }
      ]
    },
    {
      title: "Platform Preferences",
      icon: Star,
      questions: [
        {
          type: "checkbox",
          label: "Trust factors that matter most",
          field: "trustFactors",
          options: ["HIPAA compliance", "Data encryption", "User reviews", "Medical certification", "Transparent policies"]
        },
        {
          type: "checkbox",
          label: "Privacy concerns",
          field: "privacyConcerns",
          options: ["Data sharing", "Third-party access", "Location tracking", "Health insurance", "Employer access"]
        }
      ],
      vocabulary: [
        { term: "HIPAA Compliance", definition: "A US law that protects your health information and privacy." },
        { term: "Data Encryption", definition: "A way to protect your information by turning it into a secret code." },
        { term: "Medical Certification", definition: "Official approval that a product or service meets health standards." }
      ]
    },
    {
      title: "Health Management Behaviors",
      icon: Target,
      questions: [
        {
          type: "checkbox",
          label: "Current health tracking behaviors",
          field: "trackingBehaviors",
          options: ["Weight", "Exercise", "Medication", "Symptoms", "Mood", "Sleep", "None"]
        },
        {
          type: "checkbox",
          label: "Health goals",
          field: "healthGoals",
          options: ["Weight management", "Fitness", "Mental health", "Chronic disease management", "Prevention", "Caregiving"]
        },
        {
          type: "select",
          label: "Caregiving role",
          field: "caregivingRole",
          options: ["None", "Parent", "Spouse", "Child", "Professional", "Other"]
        }
      ],
      vocabulary: [
        { term: "Health Tracking", definition: "Monitoring things like weight, exercise, medication, or symptoms." },
        { term: "Caregiving", definition: "Helping someone else manage their health, such as a family member or patient." },
        { term: "Chronic Disease Management", definition: "Ongoing care and support for long-term health conditions." }
      ]
    },
    {
      title: "Digital Health Acceptability",
      icon: CheckCircle,
      questions: [
        {
          type: "slider",
          label: "Usability rating",
          field: "usabilityRating",
          min: 0,
          max: 10
        },
        {
          type: "slider",
          label: "Value perception",
          field: "valuePerception",
          min: 0,
          max: 10
        },
        {
          type: "slider",
          label: "Likelihood to adopt",
          field: "adoptionLikelihood",
          min: 0,
          max: 10
        }
      ],
      vocabulary: [
        { term: "Usability", definition: "How easy and comfortable it is to use a product or service." },
        { term: "Value Perception", definition: "How much you think something is worth compared to its cost or effort." },
        { term: "Adoption Likelihood", definition: "How likely you are to start using a new tool or technology." }
      ]
    },
    {
      title: "Pain Points & Emotional Triggers",
      icon: AlertTriangle,
      questions: [
        {
          type: "checkbox",
          label: "Frustrations with current health management",
          field: "frustrations",
          options: ["Complex interfaces", "Data entry", "Privacy concerns", "Cost", "Time consuming", "Lack of support"]
        },
        {
          type: "checkbox",
          label: "Technology issues",
          field: "technologyIssues",
          options: ["Connectivity", "Battery life", "Data accuracy", "Integration problems", "Learning curve"]
        },
        {
          type: "checkbox",
          label: "Emotional triggers",
          field: "emotionalTriggers",
          options: ["Anxiety about data", "Frustration with complexity", "Fear of missing information", "Overwhelm from data", "Lack of control"]
        }
      ],
      vocabulary: [
        { term: "Pain Point", definition: "A problem or frustration you experience when managing your health." },
        { term: "Emotional Trigger", definition: "Something that causes a strong emotional reaction, like anxiety or frustration." },
        { term: "Integration Problems", definition: "Difficulties connecting different devices or apps together." }
      ]
    },
    {
      title: "Motivation & Behavior Change",
      icon: TrendingUp,
      questions: [
        {
          type: "select",
          label: "Readiness for health behavior change",
          field: "readinessStage",
          options: ["Not considering", "Thinking about it", "Preparing", "Taking action", "Maintaining"]
        },
        {
          type: "checkbox",
          label: "Factors that motivate change",
          field: "changeFactors",
          options: ["Health crisis", "Family pressure", "Doctor recommendation", "Personal goals", "Social support", "Financial incentives"]
        },
        {
          type: "checkbox",
          label: "Support needs",
          field: "supportNeeds",
          options: ["Educational resources", "Community support", "Professional guidance", "Family involvement", "Technical help"]
        }
      ],
      vocabulary: [
        { term: "Behavior Change", definition: "Making new habits or stopping old ones to improve your health." },
        { term: "Readiness Stage", definition: "How prepared you feel to make a change in your health habits." },
        { term: "Support Needs", definition: "The help or resources you need to succeed in your health goals." }
      ]
    },
    {
      title: "Open-ended Insights",
      icon: MessageSquare,
      questions: [
        {
          type: "textarea",
          label: "Share your health journey story (150-500 words)",
          field: "healthStory",
          placeholder: "Tell us about your experience with health management, technology, and what matters most to you..."
        },
        {
          type: "textarea",
          label: "Describe your ideal digital health experience (150-500 words)",
          field: "idealExperience",
          placeholder: "What would the perfect digital health platform look like for you?"
        },
        {
          type: "textarea",
          label: "What concerns do you have about digital health? (150-500 words)",
          field: "concerns",
          placeholder: "Share any worries, fears, or concerns about using technology for health..."
        }
      ],
      vocabulary: [
        { term: "Health Journey", definition: "Your personal story and experiences with health and wellness." },
        { term: "Ideal Experience", definition: "What the perfect digital health platform would look and feel like for you." },
        { term: "Concerns", definition: "Any worries or fears you have about using technology for health." }
      ]
    },
    {
      title: "Future Readiness & Expectations",
      icon: Clock,
      questions: [
        {
          type: "select",
          label: "When would you adopt digital health tools?",
          field: "adoptionTimeline",
          options: ["Immediately", "Within 6 months", "Within 1 year", "Within 2 years", "Not sure", "Never"]
        },
        {
          type: "checkbox",
          label: "Future expectations",
          field: "expectations",
          options: ["AI-powered insights", "Wearable integration", "Telemedicine", "Family connectivity", "Predictive analytics", "Personalized care"]
        },
        {
          type: "textarea",
          label: "Your vision for the future of health technology (150-500 words)",
          field: "vision",
          placeholder: "What do you hope digital health technology will achieve in the next 5-10 years?"
        }
      ],
      vocabulary: [
        { term: "Telemedicine", definition: "Getting medical care or advice from a doctor using video or phone calls." },
        { term: "Predictive Analytics", definition: "Using data and AI to predict future health trends or risks." },
        { term: "Personalized Care", definition: "Health services tailored to your unique needs and preferences." }
      ]
    },
    {
      title: "Pricing & Willingness to Pay",
      icon: Gift,
      questions: [
        // Basic Price Range Assessment
        {
          type: "select",
          label: "What would you be willing to pay monthly for a comprehensive digital health platform that unifies all your medical records, provides AI-driven health insights, and includes wearable device monitoring?",
          field: "willingnessToPay",
          options: [
            "Less than ₹200 ($2.50)",
            "₹200-₹500 ($2.50-$6)",
            "₹500-₹1,000 ($6-$12)",
            "₹1,000-₹2,000 ($12-$24)",
            "More than ₹2,000 ($24+)",
            "I would not pay for such a service"
          ]
        },
        // Value Perception Matrix (as multiple questions)
        {
          type: "matrix",
          label: "How much would you be willing to pay for the following individual features?",
          field: "featureWillingnessToPay",
          features: [
            "Unified health records from all hospitals",
            "AI-powered early disease detection",
            "24/7 wearable health monitoring",
            "Blockchain-secured data privacy",
            "Family health management dashboard"
          ],
          priceOptions: [
            "Not willing to pay",
            "₹50-₹100",
            "₹100-₹300",
            "₹300-₹500",
            "₹500+"
          ]
        },
        // Competitive Pricing Assessment
        {
          type: "select",
          label: "If a similar health platform was available for ₹200 less per month, how likely would you be to switch?",
          field: "switchLikelihood",
          options: [
            "Extremely likely",
            "Very likely",
            "Somewhat likely",
            "Not very likely",
            "Not at all likely"
          ]
        },
        // Price Elasticity Testing
        {
          type: "select",
          label: "At what price point would you consider the service too expensive to continue using?",
          field: "tooExpensiveThreshold",
          options: [
            "Above ₹300/month",
            "Above ₹600/month",
            "Above ₹1,200/month",
            "Above ₹2,000/month",
            "Above ₹3,000/month",
            "Price is not a major factor"
          ]
        },
        // Payment Preference
        {
          type: "checkbox",
          label: "Which payment model would you prefer for a digital health platform?",
          field: "paymentPreference",
          options: [
            "Monthly subscription",
            "Annual subscription (with discount)",
            "Pay-per-use/feature",
            "One-time lifetime purchase",
            "Freemium (basic free, premium paid)",
            "Employer/insurance-sponsored"
          ]
        },
        // Value Justification: Privacy Premium
        {
          type: "select",
          label: "How much extra would you be willing to pay for a health platform that guarantees complete data privacy through blockchain technology compared to traditional platforms?",
          field: "privacyPremium",
          options: [
            "No extra amount",
            "10-20% more",
            "20-30% more",
            "30-50% more",
            "50%+ more"
          ]
        },
        // Quality vs. Cost Trade-offs
        {
          type: "checkbox",
          label: "What factors would most influence your willingness to pay a higher price for a digital health platform? (Select top 3)",
          field: "premiumFactors",
          options: [
            "Medical-grade accuracy of devices",
            "Integration with major hospitals",
            "AI-powered personalized insights",
            "24/7 customer support",
            "Data privacy and security",
            "Family/caregiver features",
            "Offline functionality",
            "Emergency response capabilities"
          ]
        },
        // Contingent Valuation Method
        {
          type: "textarea",
          label: "Imagine your current healthcare costs could be reduced by 20% through early disease detection and prevention using our platform. What would you be willing to pay monthly for this benefit? (Enter amount in ₹)",
          field: "contingentValue",
          placeholder: "Enter amount in ₹ (e.g., 500)"
        },
        // Bundle vs. Individual Pricing
        {
          type: "select",
          label: "Which pricing option appeals to you most?",
          field: "bundlePreference",
          options: [
            "Basic health records only (₹299/month)",
            "Health records + AI insights (₹599/month)",
            "Complete package: records + AI + wearable (₹999/month)",
            "Family plan for 5 members (₹1,499/month)",
            "I prefer to pay separately for each feature"
          ]
        },
        // Price Anchoring Test
        {
          type: "select",
          label: "A leading international digital health platform charges $50/month. Considering this benchmark, what would you expect to pay for a similar Indian platform with additional privacy features?",
          field: "anchoringTest",
          options: [
            "Significantly less (₹500-₹1,000)",
            "Somewhat less (₹1,500-₹2,500)",
            "About the same (₹3,000-₹4,000)",
            "Premium pricing acceptable (₹4,000+)"
          ]
        },
        // Income-Based Pricing Sensitivity
        {
          type: "select",
          label: "What percentage of your monthly healthcare budget would you allocate to a digital health platform?",
          field: "budgetPercentage",
          options: [
            "Less than 5%",
            "5-10%",
            "10-20%",
            "20-30%",
            "More than 30%"
          ]
        },
        // Use Case Scenarios
        {
          type: "select",
          label: "In which situation would you be most willing to pay premium pricing for a digital health platform?",
          field: "premiumUseCase",
          options: [
            "Managing a chronic condition",
            "Caring for elderly family members",
            "Monitoring children's health",
            "General preventive health",
            "Post-surgery recovery",
            "Managing multiple family health records"
          ]
        }
      ],
      vocabulary: [
        { term: "Willingness to Pay", definition: "How much you are ready to spend for a product or service." },
        { term: "Price Sensitivity", definition: "How your buying decision changes when the price changes." },
        { term: "Subscription", definition: "A payment model where you pay regularly (monthly or yearly) for continued access." },
        { term: "Freemium", definition: "A model where basic features are free, but advanced features require payment." },
        { term: "Contingent Valuation", definition: "A survey method to estimate how much people would pay for a specific benefit." },
        { term: "Price Anchoring", definition: "Using a reference price to influence what you expect to pay." }
      ]
    }
  ]

  // Total steps: welcome + all sections
  const totalSteps = 1 + sections.length

  // Helper for field validation
  const validateWelcome = () => {
    if (!formData.name.trim()) return "Please enter your name."
    if (!formData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) return "Please enter a valid email."
    return null
  }

  // Render the welcome step
  const renderWelcome = () => (
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center gap-8"
    >
      <div className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-7 h-7 text-emerald-400" />
          <h2 className="text-3xl font-bold text-white">Welcome to the AYUV Health Research!</h2>
        </div>
        <p className="text-white/80 mb-4">Help us shape the future of digital health. As a thank you, you&apos;ll receive:</p>
        {showBenefit && benefitIdx !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-400 rounded-lg px-4 py-2 mb-4 shadow"
          >
            <Gift className="w-5 h-5 text-emerald-400 animate-bounce" />
            <span className="text-emerald-200 font-semibold">{benefitMessages[benefitIdx]}</span>
          </motion.div>
        )}
        <form className="space-y-8 mt-2" onSubmit={e => { e.preventDefault(); }}>
          <IntentInput
            icon={User}
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
            required
          />
          <IntentInput
            icon={Mail}
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
            required
          />
          <p className="text-xs text-emerald-400 mt-1">We respect your privacy. Your email is only used for research rewards and will never be shared.</p>
          {error && <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded-lg">{error}</div>}
          <button
            type="button"
            className="w-full py-3 mt-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20 transition text-lg"
            onClick={() => {
              const err = validateWelcome()
              setError(err)
              if (!err) setCurrentStep(1)
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </motion.div>
  )

  // Render a single question using floating label components
  const renderQuestion = (question: any) => {
    const fieldName = question.field
    const value = formData[fieldName as keyof FormData]
    switch (question.type) {
      case 'select':
        return (
          <IntentSelect
            icon={question.icon || User}
            label={question.label}
            value={value as string}
            onChange={e => setFormData(f => ({ ...f, [fieldName]: e.target.value }))}
            required
          >
            <option value="" disabled className="bg-black/80">Select an option...</option>
            {question.options.map((opt: string) => (
              <option key={opt} value={opt} className="bg-black/80">{opt}</option>
            ))}
          </IntentSelect>
        )
      case 'checkbox':
        return (
          <div className="flex flex-wrap gap-3">
            {question.options.map((opt: string) => (
              <label key={opt} className="flex items-center gap-2 text-base">
                <input
                  type="checkbox"
                  className="accent-emerald-500 w-5 h-5"
                  checked={Array.isArray(value) && value.includes(opt)}
                  onChange={e => {
                    setFormData(f => {
                      const arr = Array.isArray(f[fieldName as keyof FormData]) ? [...(f[fieldName as keyof FormData] as string[])] : []
                      if (e.target.checked) arr.push(opt)
                      else return { ...f, [fieldName]: arr.filter(v => v !== opt) }
                      return { ...f, [fieldName]: arr }
                    })
                  }}
                />
                <span className="text-white">{opt}</span>
              </label>
            ))}
          </div>
        )
      case 'slider':
        return (
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 text-sm w-8 text-right">{question.min}</span>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={value as number}
              className="flex-1 accent-emerald-500"
              onChange={e => setFormData(f => ({ ...f, [fieldName]: parseInt(e.target.value) }))}
            />
            <span className="text-emerald-400 font-bold w-8 text-left">{value}</span>
            <span className="text-emerald-400 text-sm w-8 text-left">{question.max}</span>
          </div>
        )
      case 'textarea':
        return (
          <div className="relative">
            <textarea
              className="w-full p-3 bg-transparent text-white border-b-2 border-white/20 focus:border-emerald-400 rounded-t-md outline-none transition min-h-[120px] placeholder:text-white/40"
              placeholder={question.placeholder}
              value={value as string}
              maxLength={500}
              minLength={150}
              onChange={e => setFormData(f => ({ ...f, [fieldName]: e.target.value }))}
            />
            <span className="absolute right-2 bottom-2 text-xs text-emerald-400">{(value as string)?.length || 0}/500</span>
          </div>
        )
      default:
        return null
    }
  }

  // Render a single section
  const renderSection = (sectionIdx: number) => {
    const section = sections[sectionIdx]
    return (
      <motion.div
        key={sectionIdx}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-10">
          {React.createElement(section.icon, { className: "w-8 h-8 text-emerald-400" })}
          <h2 className="text-3xl font-bold text-white tracking-tight">{section.title}</h2>
        </div>
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4"
          >
            <span className="inline-block bg-emerald-500/10 text-emerald-200 rounded-full px-4 py-1 text-base font-semibold shadow">Hi, {formData.name.split(' ')[0] || 'there'}! 👋</span>
          </motion.div>
        )}
        <div className="flex flex-col gap-14">
          {section.questions.map((q: any, i: number) => (
            <div key={i} className="space-y-4">
              <label className="block text-2xl font-semibold text-white/90 mb-3 leading-snug">{q.label}</label>
              {/* Special rendering for matrix question */}
              {q.type === 'matrix' ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="text-left text-lg text-white/70 font-semibold px-3 py-3">Feature</th>
                        {q.priceOptions.map((opt: string, idx: number) => (
                          <th key={idx} className="text-center text-lg text-emerald-400 font-semibold px-3 py-3 whitespace-nowrap">{opt}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {q.features.map((feature: string, rowIdx: number) => (
                        <tr key={rowIdx} className="bg-white/5 rounded-lg">
                          <td className="text-white/90 px-3 py-3 font-medium whitespace-nowrap text-base">{feature}</td>
                          {q.priceOptions.map((opt: string, colIdx: number) => (
                            <td key={colIdx} className="text-center px-3 py-3">
                              <input
                                type="radio"
                                name={`featureWillingnessToPay_${rowIdx}`}
                                value={opt}
                                checked={formData.featureWillingnessToPay?.[rowIdx] === opt}
                                onChange={() => {
                                  setFormData(f => {
                                    const arr = Array.isArray(f.featureWillingnessToPay) ? [...f.featureWillingnessToPay] : []
                                    arr[rowIdx] = opt
                                    return { ...f, featureWillingnessToPay: arr }
                                  })
                                }}
                                className="accent-emerald-500 w-5 h-5"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : renderQuestion(q)}
            </div>
          ))}
        </div>
        {/* Vocabulary Block */}
        {section.vocabulary && section.vocabulary.length > 0 && (
          <div className="mt-16 bg-white/10 border border-emerald-400 rounded-xl p-8 shadow-lg">
            <h3 className="text-lg font-bold text-emerald-400 mb-3">Vocabulary: What do these terms mean?</h3>
            <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2">
              {section.vocabulary.map((v: any, i: number) => (
                <React.Fragment key={i}>
                  <div className="font-semibold text-white text-right pr-2 whitespace-pre">{v.term}:</div>
                  <div className="text-white/80 text-left">{v.definition}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  // On submit, set session flag
  const handleSubmit = async () => {
    const { name, email, ...rest } = formData
    const payload = {
      name,
      email,
      ...rest,
      questions: sections
    }
    try {
      const res = await fetch('/api/research/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('ayuv_research_submitted', '1')
        }
        setSubmitted(true)
      } else {
        const err = await res.json()
        setError(err.error || 'Submission failed. Please try again.')
      }
    } catch (e) {
      setError('Submission failed. Please try again.')
    }
  }

  // Main render
  if (submitted) {
    return <ThankYouPage router={router} />
  }
  return (
    <div className="min-h-screen w-full font-sans text-white relative bg-black">
      <SpaceBackground backgroundImage="/images/earth-horizon.jpg" />
      <main className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative z-10 overflow-auto">
        <div className="w-full max-w-3xl bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl p-10 flex flex-col shadow-2xl">
          <div className="mb-6 flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-2">AYUV Health Research</span>
            <span className="text-white/60 text-lg text-center">Help us shape the future of digital health.</span>
          </div>
          {/* Progress Bar (not sticky) */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Step {currentStep + 1} of {totalSteps}</span>
              <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-1">
            <AnimatePresence mode="wait" initial={false}>
              {currentStep === 0
                ? renderWelcome()
                : renderSection(currentStep - 1)}
            </AnimatePresence>
          </div>
          <div className="flex justify-between mt-8 gap-4">
            <button
              onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-white/10 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-md hover:bg-white/20 border border-white/20 transition"
            >
              Previous
            </button>
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={() => setCurrentStep(s => Math.min(totalSteps - 1, s + 1))}
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-lg font-bold shadow-lg shadow-emerald-400/20 border border-emerald-400 transition"
              >
                Next Section
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-lg font-bold shadow-lg shadow-emerald-400/20 border border-emerald-400 transition"
              >
                Submit Research Form
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default DigitalHealthResearchForm 