import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Calendar, Video, Stethoscope, Users, Shield } from "lucide-react"
import BackendStatus from "@/components/BackendStatus"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <BackendStatus />
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">PetCare Pro</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">Complete Pet Care Management</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Schedule appointments, manage your pets, get prescriptions, and have online consultations with certified
          veterinarians.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="px-8">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">Features for Everyone</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Pet Owners</CardTitle>
              <CardDescription>Manage your pets, schedule appointments, and access veterinary care</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Schedule appointments</li>
                <li>• Add and manage pets</li>
                <li>• View appointment history</li>
                <li>• Get digital prescriptions</li>
                <li>• Online video consultations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Stethoscope className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Veterinarians</CardTitle>
              <CardDescription>Manage your practice and provide excellent pet care</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• View appointment schedule</li>
                <li>• Manage availability status</li>
                <li>• Issue prescriptions</li>
                <li>• Conduct video consultations</li>
                <li>• Access patient records</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Administrators</CardTitle>
              <CardDescription>Complete oversight and management of the entire system</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• User management</li>
                <li>• Doctor/staff management</li>
                <li>• Pet management</li>
                <li>• Inventory management</li>
                <li>• System oversight</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose PetCare Pro?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Easy Scheduling</h4>
              <p className="text-gray-600">Book appointments with your preferred veterinarian</p>
            </div>
            <div className="text-center">
              <Video className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Video Consultations</h4>
              <p className="text-gray-600">Get professional advice from home</p>
            </div>
            <div className="text-center">
              <Heart className="h-16 w-16 text-red-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Pet Records</h4>
              <p className="text-gray-600">Keep all your pet's information in one place</p>
            </div>
            <div className="text-center">
              <Stethoscope className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Expert Care</h4>
              <p className="text-gray-600">Certified veterinarians at your service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6" />
            <span className="text-xl font-bold">PetCare Pro</span>
          </div>
          <p className="text-gray-400">Providing comprehensive pet care management solutions</p>
        </div>
      </footer>
    </div>
  )
}
