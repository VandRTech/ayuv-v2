import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { EldercareDashboard } from "@/components/caregiver/eldercare-dashboard"

export default function EldercarePage() {
  return (
    <PatientDashboardLayout>
      <EldercareDashboard />
    </PatientDashboardLayout>
  )
}
