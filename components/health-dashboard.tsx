"use client"

import { WelcomeWidget } from "./widgets/welcome-widget"
import { VitalsWidget } from "./widgets/vitals-widget"
import { AppointmentsWidget } from "./widgets/appointments-widget"
import { MedicationsWidget } from "./widgets/medications-widget"
import { ActivityFeedWidget } from "./widgets/activity-feed-widget"
import { InsightsWidget } from "./widgets/insights-widget"
import { QuickActionsWidget } from "./widgets/quick-actions-widget"
import { WearableDataWidget } from "./widgets/wearable-data-widget"

// Import only the main mockDashboardData object
import { mockDashboardData } from "@/lib/mock-data"

export function HealthDashboard() {
  // Access the specific data from mockDashboardData
  const { user, vitals, appointments, medications, activities, insights, quickActions, wearableData } =
    mockDashboardData

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Welcome Section */}
      <WelcomeWidget userName={user.name} avatarUrl={user.avatarUrl} profileLink="/portal/profile" />

      {/* Primary Health Metrics - Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VitalsWidget vitals={vitals} isLoading={false} />
        <WearableDataWidget wearableData={wearableData} isLoading={false} />
      </div>

      {/* Care Management - Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentsWidget appointments={appointments} isLoading={false} />
        <MedicationsWidget medications={medications} isLoading={false} />
      </div>

      {/* Insights and Activity - Horizontal Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <InsightsWidget insights={insights} isLoading={false} />
        </div>
        <ActivityFeedWidget activities={activities} isLoading={false} />
      </div>

      {/* Quick Actions - Full Width */}
      <QuickActionsWidget actions={quickActions} />
    </div>
  )
}
