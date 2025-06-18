import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { MultiPatientMonitoring } from "@/components/caregiver/multi-patient-monitoring"

export default function CaregiverMultiPatientPage() {
  return (
    <PatientDashboardLayout>
      <MultiPatientMonitoring />
    </PatientDashboardLayout>
  )
}
