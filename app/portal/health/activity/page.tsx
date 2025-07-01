"use client"

import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, Footprints, BedDouble, Flame, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { AnimatedFade } from "@/components/animated-fade"

const mockActivityData = {
  today: {
    steps: { current: 7500, goal: 10000 },
    calories: { current: 1850, goal: 2200 },
    activeMinutes: { current: 35, goal: 60 },
    heartRate: { current: 72, status: "Normal" },
    sleep: { duration: "7h 15m", quality: "Good" },
  },
  vitals: [
    {
      name: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "Normal",
      trend: "stable",
      timestamp: "2 hours ago",
    },
    {
      name: "Blood Pressure",
      value: "118/78",
      unit: "mmHg",
      status: "Normal",
      trend: "down",
      timestamp: "Today, 10:45 AM",
    },
    {
      name: "Blood Glucose",
      value: "142",
      unit: "mg/dL",
      status: "Monitor",
      trend: "up",
      timestamp: "Yesterday, 7:30 PM",
    },
  ],
}

export default function ActivityPage() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      default:
        return <Minus className="h-4 w-4 text-slate-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Normal: "bg-green-500/20 text-green-500",
      Monitor: "bg-yellow-500/20 text-yellow-500",
      High: "bg-red-500/20 text-red-500",
    }
    return <Badge className={variants[status as keyof typeof variants] || variants.Normal}>{status}</Badge>
  }

  return (
    <PatientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Activity & Vitals</h1>
          <p className="text-muted-foreground">Track your daily activity and health metrics</p>
        </div>

        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Daily Activity</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatedFade>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Footprints className="mr-2 h-5 w-5 text-primary" />
                      Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-2xl font-bold">
                          {mockActivityData.today.steps.current.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / {mockActivityData.today.steps.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(mockActivityData.today.steps.current / mockActivityData.today.steps.goal) * 100}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {Math.round((mockActivityData.today.steps.current / mockActivityData.today.steps.goal) * 100)}%
                        of daily goal
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedFade>

              <AnimatedFade delay={0.1}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Flame className="mr-2 h-5 w-5 text-orange-500" />
                      Calories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-2xl font-bold">{mockActivityData.today.calories.current}</span>
                        <span className="text-sm text-muted-foreground">/ {mockActivityData.today.calories.goal}</span>
                      </div>
                      <Progress
                        value={(mockActivityData.today.calories.current / mockActivityData.today.calories.goal) * 100}
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {Math.round(
                          (mockActivityData.today.calories.current / mockActivityData.today.calories.goal) * 100,
                        )}
                        % of daily goal
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedFade>

              <AnimatedFade delay={0.2}>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center text-lg">
                      <Activity className="mr-2 h-5 w-5 text-blue-500" />
                      Active Minutes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-2xl font-bold">{mockActivityData.today.activeMinutes.current}</span>
                        <span className="text-sm text-muted-foreground">
                          / {mockActivityData.today.activeMinutes.goal} min
                        </span>
                      </div>
                      <Progress
                        value={
                          (mockActivityData.today.activeMinutes.current / mockActivityData.today.activeMinutes.goal) *
                          100
                        }
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {Math.round(
                          (mockActivityData.today.activeMinutes.current / mockActivityData.today.activeMinutes.goal) *
                            100,
                        )}
                        % of daily goal
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedFade>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatedFade delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="mr-2 h-5 w-5 text-red-500" />
                      Heart Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold">{mockActivityData.today.heartRate.current}</span>
                        <span className="text-muted-foreground ml-1">bpm</span>
                      </div>
                      {getStatusBadge(mockActivityData.today.heartRate.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Resting heart rate</p>
                  </CardContent>
                </Card>
              </AnimatedFade>

              <AnimatedFade delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BedDouble className="mr-2 h-5 w-5 text-purple-500" />
                      Sleep
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold">{mockActivityData.today.sleep.duration}</span>
                      </div>
                      {getStatusBadge(mockActivityData.today.sleep.quality)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Last night&apos;s sleep</p>
                  </CardContent>
                </Card>
              </AnimatedFade>
            </div>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockActivityData.vitals.map((vital, index) => (
                <AnimatedFade key={vital.name} delay={index * 0.1}>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-muted-foreground">{vital.name}</span>
                        {getStatusBadge(vital.status)}
                      </div>
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">{vital.value}</span>
                        <span className="text-sm text-muted-foreground ml-1">{vital.unit}</span>
                        <span className="ml-2">{getTrendIcon(vital.trend)}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{vital.timestamp}</span>
                    </CardContent>
                  </Card>
                </AnimatedFade>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Health Trends</CardTitle>
                <CardDescription>View your health metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Trend charts will be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">Connect more devices to see detailed trends</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PatientDashboardLayout>
  )
}
