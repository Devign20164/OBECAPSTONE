"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Settings,
  MessageSquare,
  ArrowLeft,
  Camera,
  FileText,
  Send,
} from "lucide-react"
import Link from "next/link"

export default function DoctorVideoConsultation() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isCallActive, setIsCallActive] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [notes, setNotes] = useState("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get("appointment")
  const router = useRouter()

  // Mock appointment data
  const appointment = {
    id: appointmentId || "1",
    petName: "Buddy",
    owner: "John Doe",
    time: "10:00 AM",
    date: "Today",
    type: "checkup",
  }

  useEffect(() => {
    // Start user's camera
    if (isVideoOn && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => console.log("Error accessing camera:", err))
    }
  }, [isVideoOn])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isCallActive])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startCall = () => {
    setIsCallActive(true)
    setCallDuration(0)
  }

  const endCall = () => {
    setIsCallActive(false)
    setCallDuration(0)
    // Clean up video stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    router.push("/dashboard/doctor")
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn
      }
    }
  }

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn)
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn
      }
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, `Dr. Smith: ${newMessage}`])
      setNewMessage("")
      // Simulate patient response
      setTimeout(() => {
        setMessages((prev) => [...prev, `${appointment.owner}: Thank you, doctor.`])
      }, 1000)
    }
  }

  const savePrescription = () => {
    if (notes.trim()) {
      alert("Prescription saved successfully!")
      setNotes("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-4">
          <Link href="/dashboard/doctor" className="flex items-center gap-2 text-white hover:text-gray-300">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Consultation - {appointment.petName}</CardTitle>
                    <p className="text-gray-400">
                      Owner: {appointment.owner} | Type: {appointment.type}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {isCallActive && (
                      <Badge variant="secondary" className="bg-green-600">
                        {formatDuration(callDuration)}
                      </Badge>
                    )}
                    <Badge variant={isCallActive ? "default" : "secondary"}>
                      {isCallActive ? "Connected" : "Waiting"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Video Grid */}
                <div className="grid md:grid-cols-2 gap-4 h-96">
                  {/* Doctor Video */}
                  <div className="relative bg-gray-700 rounded-lg overflow-hidden">
                    {isVideoOn ? (
                      <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="h-16 w-16 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Dr. Smith (You)
                    </div>
                  </div>

                  {/* Patient Video (Simulated) */}
                  <div className="relative bg-gray-700 rounded-lg overflow-hidden">
                    {isCallActive ? (
                      <div className="w-full h-full flex items-center justify-center bg-green-900">
                        <div className="text-center text-white">
                          <div className="w-20 h-20 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl font-bold">JD</span>
                          </div>
                          <p className="text-lg font-semibold">{appointment.owner}</p>
                          <p className="text-sm text-green-200">Connected</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Video className="h-16 w-16 mx-auto mb-4" />
                          <p>Waiting for patient to join...</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      {appointment.owner}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant={isAudioOn ? "default" : "destructive"}
                    size="lg"
                    onClick={toggleAudio}
                    className="rounded-full w-12 h-12"
                  >
                    {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </Button>

                  <Button
                    variant={isVideoOn ? "default" : "destructive"}
                    size="lg"
                    onClick={toggleVideo}
                    className="rounded-full w-12 h-12"
                  >
                    {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </Button>

                  {!isCallActive ? (
                    <Button
                      variant="default"
                      size="lg"
                      onClick={startCall}
                      className="rounded-full w-12 h-12 bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                  ) : (
                    <Button variant="destructive" size="lg" onClick={endCall} className="rounded-full w-12 h-12">
                      <PhoneOff className="h-5 w-5" />
                    </Button>
                  )}

                  <Button variant="outline" size="lg" className="rounded-full w-12 h-12">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Chat */}
            <Card className="bg-gray-800 border-gray-700 h-64">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-[calc(100%-80px)]">
                <div className="flex-1 space-y-2 mb-4 overflow-y-auto">
                  {messages.length === 0 ? (
                    <p className="text-gray-400 text-sm">No messages yet...</p>
                  ) : (
                    messages.map((message, index) => (
                      <div key={index} className="text-sm text-white bg-gray-700 p-2 rounded">
                        {message}
                      </div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes & Prescription */}
            <Card className="bg-gray-800 border-gray-700 flex-1">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes & Prescription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter consultation notes and prescription details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 min-h-32"
                  rows={6}
                />
                <Button onClick={savePrescription} className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Save Prescription
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
