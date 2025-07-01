import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { ConsentDashboard } from "@/components/consent-management/consent-dashboard"

export default function ConsentPage() {
  return (
    <PatientDashboardLayout>
      <ConsentDashboard />
    </PatientDashboardLayout>
  )
}
