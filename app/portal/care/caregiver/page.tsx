import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { CaregiverOverview } from "@/components/caregiver/caregiver-overview"

export default function CaregiverPage() {
  return (
    <PatientDashboardLayout>
      <CaregiverOverview />
    </PatientDashboardLayout>
  )
}
