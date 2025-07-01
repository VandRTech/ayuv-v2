import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, MapPin, Video } from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  doctorName: string
  specialty: string
  purpose: string
  dateTime: string
  location: string
  type: "in-person" | "telemedicine"
  detailsLink: string
  joinLink?: string
}

interface AppointmentsWidgetProps {
  appointments: Appointment[]
  isLoading: boolean
}

export function AppointmentsWidget({ appointments, isLoading }: AppointmentsWidgetProps) {
  if (isLoading) {
    return (
      <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 border border-gray-800 rounded-md">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-40 mt-2" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-[#131f2e] border-gray-800 min-h-[250px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-primary" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-slate-400">No upcoming appointments</p>
            <Button variant="link" className="text-primary mt-2">
              Schedule an appointment
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 border border-gray-800 rounded-md hover:bg-[#1a2736] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className="text-primary font-semibold">{appointment.dateTime}</span>
                    </div>
                    <h4 className="text-white font-medium mt-1">{appointment.doctorName}</h4>
                    <p className="text-sm text-slate-400">
                      {appointment.specialty} • {appointment.purpose}
                    </p>
                    <div className="flex items-center mt-1 text-sm text-slate-400">
                      {appointment.type === "in-person" ? (
                        <MapPin className="h-3 w-3 mr-1" />
                      ) : (
                        <Video className="h-3 w-3 mr-1" />
                      )}
                      {appointment.location}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={appointment.detailsLink} passHref>
                      <Button variant="ghost" size="sm" className="text-xs h-7">
                        Details
                      </Button>
                    </Link>
                    {appointment.type === "telemedicine" && appointment.joinLink && (
                      <Link href={appointment.joinLink} passHref>
                        <Button size="sm" className="text-xs h-7 bg-primary hover:bg-primary/90">
                          Join Call
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Link href="/appointments" className="text-sm text-primary hover:underline w-full text-center">
          View All Appointments
        </Link>
      </CardFooter>
    </Card>
  )
}
