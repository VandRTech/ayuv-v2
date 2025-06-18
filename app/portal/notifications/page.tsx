"use client"

import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { AnimatedCard } from "@/components/animated-card"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Pill, FileText, Shield, Settings, Trash2, BookMarkedIcon as MarkAsRead } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface Notification {
  id: string
  title: string
  message: string
  type: "appointment" | "medication" | "health" | "consent" | "system"
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Medication Reminder",
    message: "Time to take your Metformin 500mg",
    type: "medication",
    timestamp: "2024-01-20T14:00:00Z",
    isRead: false,
    priority: "high",
    actionUrl: "/portal/medications",
  },
  {
    id: "2",
    title: "Upcoming Appointment",
    message: "You have an appointment with Dr. Sarah Wilson tomorrow at 2:30 PM",
    type: "appointment",
    timestamp: "2024-01-19T10:00:00Z",
    isRead: false,
    priority: "medium",
    actionUrl: "/portal/appointments",
  },
  {
    id: "3",
    title: "Lab Results Available",
    message: "Your blood test results from Apollo Diagnostics are now available",
    type: "health",
    timestamp: "2024-01-18T16:30:00Z",
    isRead: true,
    priority: "medium",
    actionUrl: "/portal/records",
  },
  {
    id: "4",
    title: "Consent Request",
    message: "Dr. Michael Chen has requested access to your medical records",
    type: "consent",
    timestamp: "2024-01-17T09:15:00Z",
    isRead: false,
    priority: "high",
    actionUrl: "/portal/consent",
  },
  {
    id: "5",
    title: "Health Goal Achievement",
    message: "Congratulations! You've reached your daily step goal of 10,000 steps",
    type: "health",
    timestamp: "2024-01-16T20:00:00Z",
    isRead: true,
    priority: "low",
  },
  {
    id: "6",
    title: "System Update",
    message: "AYUV Health has been updated with new security features",
    type: "system",
    timestamp: "2024-01-15T12:00:00Z",
    isRead: true,
    priority: "low",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "medication":
        return <Pill className="h-5 w-5 text-green-500" />
      case "health":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "consent":
        return <Shield className="h-5 w-5 text-orange-500" />
      case "system":
        return <Settings className="h-5 w-5 text-slate-500" />
      default:
        return <Bell className="h-5 w-5 text-primary" />
    }
  }

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "low":
        return "bg-green-500/20 text-green-500"
      default:
        return "bg-slate-500/20 text-slate-500"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  const unreadNotifications = notifications.filter((notif) => !notif.isRead)
  const allNotifications = notifications

  return (
    <PatientDashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-muted-foreground mt-2">Stay updated with your health activities</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={markAllAsRead}>
              <MarkAsRead className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnimatedCard delay={0.1}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Total Notifications</span>
              </div>
              <div className="text-2xl font-bold mt-2">{notifications.length}</div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm font-medium">Unread</span>
              </div>
              <div className="text-2xl font-bold mt-2 text-red-500">{unreadNotifications.length}</div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard delay={0.3}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-orange-500" />
                <span className="text-sm font-medium">High Priority</span>
              </div>
              <div className="text-2xl font-bold mt-2 text-orange-500">
                {notifications.filter((notif) => notif.priority === "high").length}
              </div>
            </CardContent>
          </AnimatedCard>
        </div>

        <Tabs defaultValue="unread" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="unread" className="space-y-4">
            {unreadNotifications.length === 0 ? (
              <AnimatedCard delay={0.4}>
                <CardContent className="p-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No unread notifications.</p>
                </CardContent>
              </AnimatedCard>
            ) : (
              unreadNotifications.map((notification, index) => (
                <AnimatedCard key={notification.id} delay={index * 0.1}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="p-2 rounded-lg bg-muted/50">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            {!notification.isRead && <div className="h-2 w-2 rounded-full bg-primary" />}
                            <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {notification.actionUrl && (
                              <Button variant="link" size="sm" className="p-0 h-auto">
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <MarkAsRead className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </AnimatedCard>
              ))
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {allNotifications.map((notification, index) => (
              <AnimatedCard key={notification.id} delay={index * 0.1}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-2 rounded-lg bg-muted/50">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${notification.isRead ? "text-muted-foreground" : ""}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && <div className="h-2 w-2 rounded-full bg-primary" />}
                          <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                            {notification.priority}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          {notification.actionUrl && (
                            <Button variant="link" size="sm" className="p-0 h-auto">
                              View Details
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {!notification.isRead && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <MarkAsRead className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PatientDashboardLayout>
  )
}
