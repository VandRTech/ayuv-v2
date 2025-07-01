"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { CalendarIcon, Plus, Search, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { AnimatedFade } from "@/components/animated-fade"

interface Consent {
  id: string
  dataCategories: string[]
  recipient: string
  recipientType: "provider" | "app" | "researcher"
  purpose: string
  grantDate: string
  expirationDate: string
  status: "active" | "expired" | "revoked"
  blockchainTxId?: string
}

const mockConsents: Consent[] = [
  {
    id: "consent-1",
    dataCategories: ["Lab Reports", "Medication History"],
    recipient: "Dr. Priya Mehta",
    recipientType: "provider",
    purpose: "Cardiology Consultation",
    grantDate: "2024-01-15",
    expirationDate: "2024-02-15",
    status: "active",
    blockchainTxId: "0x1a2b3c...",
  },
  {
    id: "consent-2",
    dataCategories: ["Wearable Activity", "Sleep Data"],
    recipient: "HealthTracker Pro",
    recipientType: "app",
    purpose: "Fitness Analysis",
    grantDate: "2024-01-10",
    expirationDate: "2024-07-10",
    status: "active",
    blockchainTxId: "0x4d5e6f...",
  },
  {
    id: "consent-3",
    dataCategories: ["All Health Records"],
    recipient: "Dr. Vikram Singh",
    recipientType: "provider",
    purpose: "Annual Physical Examination",
    grantDate: "2023-12-20",
    expirationDate: "2024-01-20",
    status: "expired",
    blockchainTxId: "0x7g8h9i...",
  },
]

const dataCategories = [
  "Lab Reports",
  "Medication History",
  "Wearable Activity",
  "Sleep Data",
  "Medical Images",
  "Vital Signs",
  "Consultation Notes",
  "All Health Records",
]

export function ConsentDashboard() {
  const [consents, setConsents] = React.useState<Consent[]>(mockConsents)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("all")
  const [isNewConsentOpen, setIsNewConsentOpen] = React.useState(false)

  // New consent form state
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [recipient, setRecipient] = React.useState("")
  const [recipientType, setRecipientType] = React.useState<"provider" | "app" | "researcher">("provider")
  const [purpose, setPurpose] = React.useState("")
  const [expirationDate, setExpirationDate] = React.useState<Date | undefined>()

  const filteredConsents = consents.filter((consent) => {
    const matchesSearch =
      consent.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consent.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || consent.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: Consent["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "revoked":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = (status: Consent["status"]) => {
    const variants = {
      active: "bg-green-500/20 text-green-500 hover:bg-green-500/20",
      expired: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/20",
      revoked: "bg-red-500/20 text-red-500 hover:bg-red-500/20",
    }
    return <Badge className={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }

  const handleRevokeConsent = (consentId: string) => {
    setConsents((prev) =>
      prev.map((consent) => (consent.id === consentId ? { ...consent, status: "revoked" as const } : consent)),
    )
    toast({
      title: "Consent Revoked",
      description: "The consent has been successfully revoked and logged on the blockchain.",
    })
  }

  const handleCreateConsent = () => {
    if (!recipient || !purpose || selectedCategories.length === 0 || !expirationDate) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newConsent: Consent = {
      id: `consent-${Date.now()}`,
      dataCategories: selectedCategories,
      recipient,
      recipientType,
      purpose,
      grantDate: new Date().toISOString().split("T")[0],
      expirationDate: format(expirationDate, "yyyy-MM-dd"),
      status: "active",
      blockchainTxId: `0x${Math.random().toString(16).substring(2, 8)}...`,
    }

    setConsents((prev) => [newConsent, ...prev])

    // Reset form
    setSelectedCategories([])
    setRecipient("")
    setPurpose("")
    setExpirationDate(undefined)
    setIsNewConsentOpen(false)

    toast({
      title: "Consent Created",
      description: "Your consent has been successfully created and recorded on the blockchain.",
    })
  }

  return (
    <div className="space-y-6">
      <AnimatedFade>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Consent Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage who has access to your health data with complete transparency and control
            </p>
          </div>
          <Dialog open={isNewConsentOpen} onOpenChange={setIsNewConsentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Grant New Consent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Grant New Consent</DialogTitle>
                <DialogDescription>
                  Allow a healthcare provider or application to access specific parts of your health data
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input
                      id="recipient"
                      placeholder="Dr. Name / App Name"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientType">Recipient Type</Label>
                    <Select value={recipientType} onValueChange={(value: any) => setRecipientType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="provider">Healthcare Provider</SelectItem>
                        <SelectItem value="app">Third-party App</SelectItem>
                        <SelectItem value="researcher">Research Institution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Data Categories to Share</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {dataCategories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories((prev) => [...prev, category])
                            } else {
                              setSelectedCategories((prev) => prev.filter((c) => c !== category))
                            }
                          }}
                        />
                        <Label htmlFor={category} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="purpose">Purpose of Sharing</Label>
                  <Input
                    id="purpose"
                    placeholder="e.g., Consultation, Research Study, App Analysis"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Expiration Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expirationDate ? format(expirationDate, "PPP") : "Select expiration date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={expirationDate}
                        onSelect={setExpirationDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Blockchain Security</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This consent will be immutably recorded on the blockchain, ensuring complete transparency and audit
                    trail.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleCreateConsent} className="flex-1">
                    Create Consent
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewConsentOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </AnimatedFade>

      <AnimatedFade delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Consents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {consents.filter((c) => c.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Expired Consents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {consents.filter((c) => c.status === "expired").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revoked Consents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {consents.filter((c) => c.status === "revoked").length}
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedFade>

      <AnimatedFade delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle>Your Consents</CardTitle>
            <CardDescription>View and manage all data sharing consents you&apos;ve granted</CardDescription>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search consents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Data Categories</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Grant Date</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConsents.map((consent) => (
                  <TableRow key={consent.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(consent.status)}
                        {getStatusBadge(consent.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{consent.recipient}</div>
                        <div className="text-sm text-muted-foreground capitalize">{consent.recipientType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {consent.dataCategories.map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{consent.purpose}</TableCell>
                    <TableCell>{consent.grantDate}</TableCell>
                    <TableCell>{consent.expirationDate}</TableCell>
                    <TableCell>
                      {consent.status === "active" && (
                        <Button variant="destructive" size="sm" onClick={() => handleRevokeConsent(consent.id)}>
                          Revoke
                        </Button>
                      )}
                      {consent.blockchainTxId && (
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                          View on Blockchain
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </AnimatedFade>
    </div>
  )
}
