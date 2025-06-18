"use client"

import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Video, Plus, Phone, User } from "lucide-react"
import { AnimatedFade } from "@/components/animated-fade"

const mockAppointments = {
  upcoming: [
    {
      id: "1",
      doctorName: "Dr. Priya Mehta",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "2:30 PM",
      type: "in-person",
      location: "City Hospital, Room 205",
      status: "confirmed",
    },
    {
      id: "2",
      doctorName: "Dr. Vikram Singh",
      specialty: "General Physician",
      date: "2024-01-25",
      time: "11:00 AM",
      type: "telemedicine",
      location: "Virtual Consultation",
      status: "confirmed",
    },
  ],
  past: [
    {
      id: "3",
      doctorName: "Dr. Anjali Rao",
      specialty: "Dermatologist",
      date: "2024-01-10",
      time: "3:00 PM",
      type: "in-person",
      location: "Skin Care Clinic",
      status: "completed",
    },
  ],
}

export default function AppointmentsPage() {
  const getStatusBadge = (status: string) => {
    const variants = {
      confirmed: "bg-green-500/20 text-green-500",
      pending: "bg-yellow-500/20 text-yellow-500",
      completed: "bg-blue-500/20 text-blue-500",
      cancelled: "bg-red-500/20 text-red-500",
    }
    return <Badge className={variants[status as keyof typeof variants] || variants.pending}>{status}</Badge>
  }

  return (
    <PatientDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground">Manage your healthcare appointments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {mockAppointments.upcoming.map((appointment, index) => (
              <AnimatedFade key={appointment.id} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {appointment.type === "telemedicine" ? (
                            <Video className="h-6 w-6 text-primary" />
                          ) : (
                            <User className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center">
                              {appointment.type === "telemedicine" ? (
                                <Video className="mr-1 h-3 w-3" />
                              ) : (
                                <MapPin className="mr-1 h-3 w-3" />
                              )}
                              {appointment.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(appointment.status)}
                        {appointment.type === "telemedicine" && (
                          <Button size="sm">
                            <Video className="mr-2 h-4 w-4" />
                            Join Call
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedFade>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {mockAppointments.past.map((appointment, index) => (
              <AnimatedFade key={appointment.id} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <User className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {appointment.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(appointment.status)}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedFade>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PatientDashboardLayout>
  )
}
