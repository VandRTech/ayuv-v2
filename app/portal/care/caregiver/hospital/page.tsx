import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { HospitalDashboard } from "@/components/caregiver/hospital-dashboard"

export default function HospitalPage() {
  return (
    <PatientDashboardLayout>
      <HospitalDashboard />
    </PatientDashboardLayout>
  )
}
