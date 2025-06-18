export interface Patient {
  id: string
  name: string
  age: number
  room?: string
  unit?: string
  floor?: string
  condition?: string
  severity: "low" | "medium" | "high" | "critical"
  vitals: {
    heartRate: number
    bloodPressure: { systolic: number; diastolic: number }
    temperature: number
    spO2: number
    respiratoryRate: number
  }
  newsScore: number
  lastUpdate: string
  alerts: Alert[]
  deviceId: string
  fallRisk: boolean
}

export interface Alert {
  id: string
  type: "vital" | "fall" | "medication" | "emergency"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  timestamp: string
  acknowledged: boolean
}

export interface FamilyMember {
  id: string
  name: string
  relationship: string
  age: number
  avatar: string
  vitals: {
    heartRate?: number
    bloodPressure?: { systolic: number; diastolic: number }
    temperature?: number
    steps?: number
    sleep?: number
  }
  medications: Medication[]
  appointments: Appointment[]
  conditions: string[]
  vaccinations: Vaccination[]
  emergencyContacts: EmergencyContact[]
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  nextDose: string
  status: "taken" | "missed" | "pending"
  prescribedBy: string
}

export interface Appointment {
  id: string
  date: string
  time: string
  doctor: string
  specialty: string
  type: string
  status: "upcoming" | "completed" | "cancelled"
  location: string
}

export interface Vaccination {
  id: string
  vaccine: string
  date: string
  nextDue?: string
  provider: string
}

export interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  priority: number
}

export interface ElderlyResident {
  id: string
  name: string
  age: number
  room: string
  admissionDate: string
  careLevel: "independent" | "assisted" | "memory" | "skilled"
  vitals: {
    heartRate: number
    bloodPressure: { systolic: number; diastolic: number }
    temperature: number
    spO2: number
    activity: number
  }
  safety: {
    fallRisk: boolean
    wanderRisk: boolean
    lastMovement: string
    location: string
  }
  medications: Medication[]
  alerts: Alert[]
  family: EmergencyContact[]
  careNotes: CareNote[]
}

export interface CareNote {
  id: string
  timestamp: string
  caregiver: string
  note: string
  type: "medication" | "vitals" | "behavior" | "incident" | "general"
}

// Hospital Mock Data
export const hospitalPatients: Patient[] = [
  {
    id: "P001",
    name: "Sarah Chen",
    age: 67,
    room: "302A",
    unit: "Cardiology",
    floor: "3rd Floor",
    condition: "Post-operative cardiac surgery",
    severity: "medium",
    vitals: {
      heartRate: 78,
      bloodPressure: { systolic: 135, diastolic: 85 },
      temperature: 98.6,
      spO2: 97,
      respiratoryRate: 16,
    },
    newsScore: 3,
    lastUpdate: "2 minutes ago",
    alerts: [
      {
        id: "A001",
        type: "vital",
        severity: "medium",
        message: "Blood pressure slightly elevated",
        timestamp: "10:30 AM",
        acknowledged: false,
      },
    ],
    deviceId: "AEG-001",
    fallRisk: true,
  },
  {
    id: "P002",
    name: "Michael Rodriguez",
    age: 45,
    room: "205B",
    unit: "Emergency",
    floor: "2nd Floor",
    condition: "Chest pain observation",
    severity: "high",
    vitals: {
      heartRate: 95,
      bloodPressure: { systolic: 160, diastolic: 95 },
      temperature: 99.2,
      spO2: 94,
      respiratoryRate: 20,
    },
    newsScore: 7,
    lastUpdate: "1 minute ago",
    alerts: [
      {
        id: "A002",
        type: "vital",
        severity: "high",
        message: "Elevated heart rate and blood pressure",
        timestamp: "10:45 AM",
        acknowledged: false,
      },
      {
        id: "A003",
        type: "vital",
        severity: "medium",
        message: "SpO2 below normal range",
        timestamp: "10:40 AM",
        acknowledged: true,
      },
    ],
    deviceId: "AEG-002",
    fallRisk: false,
  },
  {
    id: "P003",
    name: "Emma Thompson",
    age: 72,
    room: "401C",
    unit: "Geriatrics",
    floor: "4th Floor",
    condition: "Diabetes management",
    severity: "low",
    vitals: {
      heartRate: 72,
      bloodPressure: { systolic: 125, diastolic: 80 },
      temperature: 98.4,
      spO2: 98,
      respiratoryRate: 14,
    },
    newsScore: 1,
    lastUpdate: "5 minutes ago",
    alerts: [],
    deviceId: "AEG-003",
    fallRisk: false,
  },
  {
    id: "P004",
    name: "James Wilson",
    age: 58,
    room: "103A",
    unit: "ICU",
    floor: "1st Floor",
    condition: "Respiratory failure",
    severity: "critical",
    vitals: {
      heartRate: 110,
      bloodPressure: { systolic: 90, diastolic: 60 },
      temperature: 101.2,
      spO2: 88,
      respiratoryRate: 28,
    },
    newsScore: 12,
    lastUpdate: "30 seconds ago",
    alerts: [
      {
        id: "A004",
        type: "emergency",
        severity: "critical",
        message: "Critical SpO2 levels - immediate intervention required",
        timestamp: "10:50 AM",
        acknowledged: false,
      },
      {
        id: "A005",
        type: "vital",
        severity: "high",
        message: "Fever and tachycardia",
        timestamp: "10:48 AM",
        acknowledged: true,
      },
    ],
    deviceId: "AEG-004",
    fallRisk: true,
  },
]

// Family Mock Data
export const familyMembers: FamilyMember[] = [
  {
    id: "F001",
    name: "Maria Johnson",
    relationship: "Mother",
    age: 45,
    avatar: "/images/profile-avatar.jpg",
    vitals: {
      heartRate: 75,
      bloodPressure: { systolic: 120, diastolic: 80 },
      temperature: 98.6,
      steps: 8500,
      sleep: 7.5,
    },
    medications: [
      {
        id: "M001",
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        nextDose: "8:00 AM tomorrow",
        status: "taken",
        prescribedBy: "Dr. Smith",
      },
      {
        id: "M002",
        name: "Vitamin D3",
        dosage: "1000 IU",
        frequency: "Once daily",
        nextDose: "8:00 AM tomorrow",
        status: "pending",
        prescribedBy: "Dr. Smith",
      },
    ],
    appointments: [
      {
        id: "A001",
        date: "2024-01-15",
        time: "2:00 PM",
        doctor: "Dr. Sarah Smith",
        specialty: "Family Medicine",
        type: "Annual Physical",
        status: "upcoming",
        location: "AYUV Health Center",
      },
    ],
    conditions: ["Hypertension"],
    vaccinations: [
      {
        id: "V001",
        vaccine: "COVID-19 Booster",
        date: "2023-10-15",
        nextDue: "2024-04-15",
        provider: "AYUV Health Center",
      },
    ],
    emergencyContacts: [
      {
        id: "E001",
        name: "John Johnson",
        relationship: "Spouse",
        phone: "+1-555-0123",
        priority: 1,
      },
    ],
  },
  {
    id: "F002",
    name: "John Johnson",
    relationship: "Father",
    age: 48,
    avatar: "/placeholder-user.jpg",
    vitals: {
      heartRate: 82,
      bloodPressure: { systolic: 130, diastolic: 85 },
      steps: 6200,
      sleep: 6.8,
    },
    medications: [
      {
        id: "M003",
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        nextDose: "6:00 PM today",
        status: "pending",
        prescribedBy: "Dr. Brown",
      },
    ],
    appointments: [
      {
        id: "A002",
        date: "2024-01-20",
        time: "10:00 AM",
        doctor: "Dr. Michael Brown",
        specialty: "Endocrinology",
        type: "Diabetes Follow-up",
        status: "upcoming",
        location: "Diabetes Care Center",
      },
    ],
    conditions: ["Type 2 Diabetes"],
    vaccinations: [
      {
        id: "V002",
        vaccine: "Flu Shot",
        date: "2023-09-20",
        nextDue: "2024-09-20",
        provider: "Local Pharmacy",
      },
    ],
    emergencyContacts: [
      {
        id: "E002",
        name: "Maria Johnson",
        relationship: "Spouse",
        phone: "+1-555-0124",
        priority: 1,
      },
    ],
  },
  {
    id: "F003",
    name: "Emma Johnson",
    relationship: "Daughter",
    age: 16,
    avatar: "/placeholder-user.jpg",
    vitals: {
      heartRate: 68,
      steps: 12000,
      sleep: 8.2,
    },
    medications: [],
    appointments: [
      {
        id: "A003",
        date: "2024-01-18",
        time: "4:00 PM",
        doctor: "Dr. Lisa Chen",
        specialty: "Pediatrics",
        type: "Sports Physical",
        status: "upcoming",
        location: "Teen Health Clinic",
      },
    ],
    conditions: [],
    vaccinations: [
      {
        id: "V003",
        vaccine: "HPV",
        date: "2023-08-10",
        nextDue: "2024-08-10",
        provider: "Teen Health Clinic",
      },
    ],
    emergencyContacts: [
      {
        id: "E003",
        name: "Maria Johnson",
        relationship: "Mother",
        phone: "+1-555-0124",
        priority: 1,
      },
    ],
  },
  {
    id: "F004",
    name: "Robert Johnson Sr.",
    relationship: "Grandfather",
    age: 78,
    avatar: "/placeholder-user.jpg",
    vitals: {
      heartRate: 65,
      bloodPressure: { systolic: 140, diastolic: 90 },
      temperature: 98.4,
      steps: 3200,
      sleep: 6.5,
    },
    medications: [
      {
        id: "M004",
        name: "Amlodipine",
        dosage: "5mg",
        frequency: "Once daily",
        nextDose: "7:00 AM tomorrow",
        status: "taken",
        prescribedBy: "Dr. Wilson",
      },
      {
        id: "M005",
        name: "Aspirin",
        dosage: "81mg",
        frequency: "Once daily",
        nextDose: "7:00 AM tomorrow",
        status: "missed",
        prescribedBy: "Dr. Wilson",
      },
    ],
    appointments: [
      {
        id: "A004",
        date: "2024-01-25",
        time: "11:00 AM",
        doctor: "Dr. Patricia Wilson",
        specialty: "Geriatrics",
        type: "Routine Check-up",
        status: "upcoming",
        location: "Senior Care Center",
      },
    ],
    conditions: ["Hypertension", "Arthritis"],
    vaccinations: [
      {
        id: "V004",
        vaccine: "Pneumonia",
        date: "2023-06-15",
        nextDue: "2028-06-15",
        provider: "Senior Care Center",
      },
    ],
    emergencyContacts: [
      {
        id: "E004",
        name: "Maria Johnson",
        relationship: "Granddaughter",
        phone: "+1-555-0124",
        priority: 1,
      },
    ],
  },
]

// Eldercare Mock Data
export const elderlyResidents: ElderlyResident[] = [
  {
    id: "R001",
    name: "Dorothy Williams",
    age: 84,
    room: "A-101",
    admissionDate: "2023-03-15",
    careLevel: "assisted",
    vitals: {
      heartRate: 70,
      bloodPressure: { systolic: 135, diastolic: 80 },
      temperature: 98.2,
      spO2: 96,
      activity: 65,
    },
    safety: {
      fallRisk: true,
      wanderRisk: false,
      lastMovement: "2 minutes ago",
      location: "Room A-101",
    },
    medications: [
      {
        id: "EM001",
        name: "Donepezil",
        dosage: "5mg",
        frequency: "Once daily",
        nextDose: "8:00 AM tomorrow",
        status: "taken",
        prescribedBy: "Dr. Anderson",
      },
    ],
    alerts: [
      {
        id: "EA001",
        type: "medication",
        severity: "low",
        message: "Medication reminder: Evening dose due",
        timestamp: "6:00 PM",
        acknowledged: false,
      },
    ],
    family: [
      {
        id: "EF001",
        name: "Susan Williams",
        relationship: "Daughter",
        phone: "+1-555-0201",
        priority: 1,
      },
    ],
    careNotes: [
      {
        id: "CN001",
        timestamp: "10:30 AM",
        caregiver: "Nurse Jennifer",
        note: "Assisted with morning medications. Patient in good spirits.",
        type: "medication",
      },
    ],
  },
  {
    id: "R002",
    name: "Frank Martinez",
    age: 79,
    room: "B-205",
    admissionDate: "2023-07-22",
    careLevel: "memory",
    vitals: {
      heartRate: 75,
      bloodPressure: { systolic: 145, diastolic: 85 },
      temperature: 98.8,
      spO2: 94,
      activity: 40,
    },
    safety: {
      fallRisk: false,
      wanderRisk: true,
      lastMovement: "15 minutes ago",
      location: "Common Area",
    },
    medications: [
      {
        id: "EM002",
        name: "Memantine",
        dosage: "10mg",
        frequency: "Twice daily",
        nextDose: "2:00 PM today",
        status: "pending",
        prescribedBy: "Dr. Thompson",
      },
    ],
    alerts: [
      {
        id: "EA002",
        type: "vital",
        severity: "medium",
        message: "SpO2 slightly below normal range",
        timestamp: "10:15 AM",
        acknowledged: false,
      },
    ],
    family: [
      {
        id: "EF002",
        name: "Carlos Martinez",
        relationship: "Son",
        phone: "+1-555-0202",
        priority: 1,
      },
    ],
    careNotes: [
      {
        id: "CN002",
        timestamp: "9:45 AM",
        caregiver: "CNA Maria",
        note: "Patient wandered to common area. Redirected safely back to room.",
        type: "behavior",
      },
    ],
  },
  {
    id: "R003",
    name: "Helen Davis",
    age: 91,
    room: "C-312",
    admissionDate: "2022-11-08",
    careLevel: "skilled",
    vitals: {
      heartRate: 68,
      bloodPressure: { systolic: 120, diastolic: 75 },
      temperature: 97.9,
      spO2: 98,
      activity: 25,
    },
    safety: {
      fallRisk: true,
      wanderRisk: false,
      lastMovement: "30 minutes ago",
      location: "Room C-312",
    },
    medications: [
      {
        id: "EM003",
        name: "Warfarin",
        dosage: "2mg",
        frequency: "Once daily",
        nextDose: "6:00 PM today",
        status: "pending",
        prescribedBy: "Dr. Lee",
      },
    ],
    alerts: [],
    family: [
      {
        id: "EF003",
        name: "Margaret Davis",
        relationship: "Daughter",
        phone: "+1-555-0203",
        priority: 1,
      },
    ],
    careNotes: [
      {
        id: "CN003",
        timestamp: "8:00 AM",
        caregiver: "RN Patricia",
        note: "Vital signs stable. Patient resting comfortably.",
        type: "vitals",
      },
    ],
  },
]

export const vitalTrends = {
  heartRate: [
    { time: "6:00", value: 72 },
    { time: "8:00", value: 75 },
    { time: "10:00", value: 78 },
    { time: "12:00", value: 80 },
    { time: "14:00", value: 76 },
    { time: "16:00", value: 74 },
    { time: "18:00", value: 73 },
  ],
  bloodPressure: [
    { time: "6:00", systolic: 120, diastolic: 80 },
    { time: "8:00", systolic: 125, diastolic: 82 },
    { time: "10:00", systolic: 135, diastolic: 85 },
    { time: "12:00", systolic: 130, diastolic: 83 },
    { time: "14:00", systolic: 128, diastolic: 81 },
    { time: "16:00", systolic: 122, diastolic: 79 },
    { time: "18:00", systolic: 118, diastolic: 78 },
  ],
}
