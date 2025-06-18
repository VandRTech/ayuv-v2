"use client"

import { useState } from "react"
import { WelcomeWidget } from "@/components/widgets/welcome-widget"
import { VitalsWidget } from "@/components/widgets/vitals-widget"
import { WearableDataWidget } from "@/components/widgets/wearable-data-widget"
import { AppointmentsWidget } from "@/components/widgets/appointments-widget"
import { MedicationsWidget } from "@/components/widgets/medications-widget"
import { ActivityFeedWidget } from "@/components/widgets/activity-feed-widget"
import { InsightsWidget } from "@/components/widgets/insights-widget"
import { QuickActionsWidget } from "@/components/widgets/quick-actions-widget"
import { mockDashboardData } from "@/lib/mock-data"

export function HealthDashboard() {
  const [data, setData] = useState(mockDashboardData)

  // In a real implementation, you would fetch data from your API
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await fetch('/api/dashboard');
  //       const data = await response.json();
  //       setData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch dashboard data:', error);
  //     }
  //   };
  //
  //   fetchDashboardData();
  // }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <WelcomeWidget userName={data.user.name} avatarUrl={data.user.avatarUrl} profileLink="/profile" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <VitalsWidget vitals={data.vitals} isLoading={false} />
        </div>
        <div>
          <WearableDataWidget wearableData={data.wearableData} isLoading={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AppointmentsWidget appointments={data.appointments} isLoading={false} />
        <MedicationsWidget medications={data.medications} isLoading={false} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <InsightsWidget insights={data.insights} isLoading={false} />
        </div>
        <div>
          <ActivityFeedWidget activities={data.activities} isLoading={false} />
        </div>
      </div>

      <div className="mt-6">
        <QuickActionsWidget actions={data.quickActions} />
      </div>
    </div>
  )
}
