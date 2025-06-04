"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart } from "lucide-react"

// Hardcoded users for demo
const users = [
  { email: "user@demo.com", password: "password", role: "user", name: "John Doe" },
  { email: "admin@demo.com", password: "password", role: "admin", name: "Admin User" },
  { email: "doctor@demo.com", password: "password", role: "doctor", name: "Dr. Smith" },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login
    const user = users.find((u) => u.email === email && u.password === password && u.role === role)

    if (user) {
      // Store user data in localStorage (in real app, use proper auth)
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect based on role
      switch (role) {
        case "user":
          router.push("/dashboard/user")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
        case "doctor":
          router.push("/dashboard/doctor")
          break
        default:
          router.push("/")
      }
    } else {
      alert("Invalid credentials")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">PetCare Pro</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Pet Owner</SelectItem>
                  <SelectItem value="doctor">Veterinarian</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 mb-4">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p>
                <strong>Pet Owner:</strong> user@demo.com / password
              </p>
              <p>
                <strong>Doctor:</strong> doctor@demo.com / password
              </p>
              <p>
                <strong>Admin:</strong> admin@demo.com / password
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
