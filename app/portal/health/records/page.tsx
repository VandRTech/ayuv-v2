"use client"

import { PatientDashboardLayout } from "@/components/patient-dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Download, Search, Filter, Calendar, Building, User, Eye } from "lucide-react"
import { AnimatedFade } from "@/components/animated-fade"

const mockRecords = [
  {
    id: "1",
    title: "Blood Test Report",
    type: "Lab Report",
    date: "2024-01-15",
    provider: "Apollo Diagnostics",
    doctor: "Dr. Priya Mehta",
    status: "Normal",
    fileSize: "2.3 MB",
  },
  {
    id: "2",
    title: "Chest X-Ray",
    type: "Imaging",
    date: "2024-01-10",
    provider: "City Hospital",
    doctor: "Dr. Vikram Singh",
    status: "Normal",
    fileSize: "5.1 MB",
  },
  {
    id: "3",
    title: "Cardiology Consultation",
    type: "Consultation",
    date: "2024-01-08",
    provider: "Heart Care Clinic",
    doctor: "Dr. Anjali Rao",
    status: "Follow-up Required",
    fileSize: "1.2 MB",
  },
]

export default function RecordsPage() {
  return (
    <PatientDashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Health Records</h1>
            <p className="text-muted-foreground">View and manage all your medical records</p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Record
          </Button>
        </div>

        <div className="flex space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records..." className="pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="lab">Lab Reports</TabsTrigger>
            <TabsTrigger value="imaging">Imaging</TabsTrigger>
            <TabsTrigger value="consultation">Consultations</TabsTrigger>
            <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {mockRecords.map((record, index) => (
              <AnimatedFade key={record.id} delay={index * 0.1}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{record.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Building className="mr-1 h-3 w-3" />
                              {record.provider}
                            </div>
                            <div className="flex items-center">
                              <User className="mr-1 h-3 w-3" />
                              {record.doctor}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={record.status === "Normal" ? "secondary" : "destructive"}>
                          {record.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{record.fileSize}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
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
