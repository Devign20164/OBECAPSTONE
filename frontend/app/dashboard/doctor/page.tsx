"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Calendar, Heart, Video, FileText, Clock, User, LogOut, Stethoscope } from "lucide-react"
import Link from "next/link"

// Hardcoded data
const mockAppointments = [
  {
    id: 1,
    petName: "Buddy",
    owner: "John Doe",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "upcoming",
    type: "checkup",
  },
  {
    id: 2,
    petName: "Whiskers",
    owner: "Jane Smith",
    date: "2024-01-15",
    time: "2:00 PM",
    status: "upcoming",
    type: "vaccination",
  },
  {
    id: 3,
    petName: "Max",
    owner: "Bob Johnson",
    date: "2024-01-15",
    time: "3:00 PM",
    status: "upcoming",
    type: "consultation",
  },
  {
    id: 4,
    petName: "Luna",
    owner: "Alice Brown",
    date: "2024-01-14",
    time: "11:00 AM",
    status: "completed",
    type: "surgery",
  },
]

const mockPrescriptions = [
  {
    id: 1,
    petName: "Buddy",
    owner: "John Doe",
    medication: "Antibiotics",
    dosage: "2 tablets daily",
    date: "2024-01-10",
  },
  {
    id: 2,
    petName: "Whiskers",
    owner: "Jane Smith",
    medication: "Flea Treatment",
    dosage: "Apply monthly",
    date: "2024-01-05",
  },
]

export default function DoctorDashboard() {
  const [user, setUser] = useState<any>(null)
  const [isAvailable, setIsAvailable] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return <div>Loading...</div>

  const todayAppointments = mockAppointments.filter((apt) => apt.date === "2024-01-15")
  const upcomingAppointments = mockAppointments.filter((apt) => apt.status === "upcoming")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">PetCare Pro</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Available</span>
              <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              <Badge variant={isAvailable ? "default" : "secondary"}>{isAvailable ? "Available" : "Busy"}</Badge>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Manage your appointments and patients</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">Scheduled for today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockPrescriptions.length}</div>
                  <p className="text-xs text-muted-foreground">Issued this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Status</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <Badge variant={isAvailable ? "default" : "secondary"}>{isAvailable ? "Available" : "Busy"}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Current status</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.petName}</p>
                          <p className="text-sm text-gray-600">Owner: {appointment.owner}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.time} - {appointment.type}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/dashboard/doctor/video-consultation?appointment=${appointment.id}`}>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Start Call
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/dashboard/doctor/prescriptions/new">
                    <Button className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Issue Prescription
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setIsAvailable(!isAvailable)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Toggle Availability
                  </Button>
                  <Link href="/dashboard/doctor/video-consultation">
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      Start Video Call
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Appointments</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm">Available for bookings:</span>
                <Switch checked={isAvailable} onCheckedChange={setIsAvailable} />
              </div>
            </div>
            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{appointment.petName}</h3>
                          <Badge variant={appointment.status === "upcoming" ? "default" : "secondary"}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600">Owner: {appointment.owner}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </span>
                          <span>Type: {appointment.type}</span>
                        </div>
                      </div>
                      {appointment.status === "upcoming" && (
                        <div className="flex gap-2">
                          <Link href={`/dashboard/doctor/video-consultation?appointment=${appointment.id}`}>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Start Call
                            </Button>
                          </Link>
                          <Link href={`/dashboard/doctor/prescriptions/new?patient=${appointment.petName}`}>
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4 mr-2" />
                              Prescribe
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Prescriptions</h2>
              <Link href="/dashboard/doctor/prescriptions/new">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  New Prescription
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {mockPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{prescription.medication}</h3>
                        <p className="text-gray-600">
                          Patient: {prescription.petName} (Owner: {prescription.owner})
                        </p>
                        <p className="text-sm text-gray-500">Dosage: {prescription.dosage}</p>
                        <p className="text-sm text-gray-500">Date: {prescription.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <h2 className="text-2xl font-bold">Patient Records</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Buddy", owner: "John Doe", type: "Dog", breed: "Golden Retriever", lastVisit: "2024-01-10" },
                { name: "Whiskers", owner: "Jane Smith", type: "Cat", breed: "Persian", lastVisit: "2024-01-05" },
                { name: "Max", owner: "Bob Johnson", type: "Dog", breed: "German Shepherd", lastVisit: "2024-01-08" },
              ].map((patient, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>{patient.name}</CardTitle>
                        <CardDescription>Owner: {patient.owner}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Type:</strong> {patient.type}
                      </p>
                      <p>
                        <strong>Breed:</strong> {patient.breed}
                      </p>
                      <p>
                        <strong>Last Visit:</strong> {patient.lastVisit}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
