import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { FamilyDashboard } from "@/components/caregiver/family-dashboard"

export default function FamilyPage() {
  return (
    <PatientDashboardLayout>
      <FamilyDashboard />
    </PatientDashboardLayout>
  )
}
