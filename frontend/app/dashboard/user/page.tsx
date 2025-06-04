"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Plus, Video, FileText, Clock, User, LogOut } from "lucide-react"
import Link from "next/link"

// Hardcoded data
const mockPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
    image: "/placeholder.svg?height=100&width=100",
  },
  { id: 2, name: "Whiskers", type: "Cat", breed: "Persian", age: 2, image: "/placeholder.svg?height=100&width=100" },
]

const mockAppointments = [
  {
    id: 1,
    petName: "Buddy",
    doctor: "Dr. Smith",
    date: "2024-01-15",
    time: "10:00 AM",
    status: "upcoming",
    type: "checkup",
  },
  {
    id: 2,
    petName: "Whiskers",
    doctor: "Dr. Johnson",
    date: "2024-01-10",
    time: "2:00 PM",
    status: "completed",
    type: "vaccination",
  },
  {
    id: 3,
    petName: "Buddy",
    doctor: "Dr. Smith",
    date: "2024-01-20",
    time: "3:00 PM",
    status: "upcoming",
    type: "consultation",
  },
]

const mockPrescriptions = [
  {
    id: 1,
    petName: "Buddy",
    medication: "Antibiotics",
    dosage: "2 tablets daily",
    doctor: "Dr. Smith",
    date: "2024-01-10",
  },
  {
    id: 2,
    petName: "Whiskers",
    medication: "Flea Treatment",
    dosage: "Apply monthly",
    doctor: "Dr. Johnson",
    date: "2024-01-05",
  },
]

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null)
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
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user.name}</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Manage your pets and appointments</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pets">My Pets</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">My Pets</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockPets.length}</div>
                  <p className="text-xs text-muted-foreground">Registered pets</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockAppointments.filter((apt) => apt.status === "upcoming").length}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockPrescriptions.length}</div>
                  <p className="text-xs text-muted-foreground">Current medications</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAppointments.slice(0, 3).map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{appointment.petName}</p>
                          <p className="text-sm text-gray-600">{appointment.doctor}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <Badge variant={appointment.status === "upcoming" ? "default" : "secondary"}>
                          {appointment.status}
                        </Badge>
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
                  <Link href="/dashboard/user/schedule-appointment">
                    <Button className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </Link>
                  <Link href="/dashboard/user/add-pet">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Pet
                    </Button>
                  </Link>
                  <Link href="/dashboard/user/video-consultation">
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="h-4 w-4 mr-2" />
                      Start Video Consultation
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pets" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Pets</h2>
              <Link href="/dashboard/user/add-pet">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pet
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPets.map((pet) => (
                <Card key={pet.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <img
                        src={pet.image || "/placeholder.svg"}
                        alt={pet.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle>{pet.name}</CardTitle>
                        <CardDescription>{pet.breed}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Type:</strong> {pet.type}
                      </p>
                      <p>
                        <strong>Age:</strong> {pet.age} years
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Appointments</h2>
              <Link href="/dashboard/user/schedule-appointment">
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New
                </Button>
              </Link>
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
                        <p className="text-gray-600">{appointment.doctor}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                      {appointment.status === "upcoming" && (
                        <div className="flex gap-2">
                          <Link href={`/dashboard/user/video-consultation?appointment=${appointment.id}`}>
                            <Button size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Join Call
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
            <h2 className="text-2xl font-bold">Prescriptions</h2>
            <div className="space-y-4">
              {mockPrescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{prescription.medication}</h3>
                        <p className="text-gray-600">For: {prescription.petName}</p>
                        <p className="text-sm text-gray-500">Dosage: {prescription.dosage}</p>
                        <p className="text-sm text-gray-500">Prescribed by: {prescription.doctor}</p>
                        <p className="text-sm text-gray-500">Date: {prescription.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-2xl font-bold">Schedule Appointment</h2>
            <Link href="/dashboard/user/schedule-appointment">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-2">Book New Appointment</h3>
                  <p className="text-gray-600">Schedule a visit with our veterinarians</p>
                </CardContent>
              </Card>
            </Link>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
