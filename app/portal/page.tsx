import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { HealthDashboard } from "@/components/health-dashboard"

export default function PortalPage() {
  return (
    <PatientDashboardLayout>
      <HealthDashboard />
    </PatientDashboardLayout>
  )
}
