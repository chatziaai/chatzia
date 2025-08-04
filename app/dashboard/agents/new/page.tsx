"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bot, MessageSquare, Smartphone, Send } from "lucide-react"
import Link from "next/link"

export default function NewAgentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sector: "",
    personality: "friendly",
    channels: [] as string[],
    knowledge_base: "",
    welcome_message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const sectors = [
    "E-commerce",
    "Tecnología",
    "Salud",
    "Educación",
    "Finanzas",
    "Inmobiliaria",
    "Turismo",
    "Restaurantes",
    "Servicios",
    "Otro",
  ]

  const channels = [
    { id: "web", name: "Chat Web", icon: MessageSquare, description: "Widget de chat en tu sitio web" },
    { id: "whatsapp", name: "WhatsApp", icon: Smartphone, description: "Integración con WhatsApp Business" },
    { id: "telegram", name: "Telegram", icon: Send, description: "Bot de Telegram" },
  ]

  const handleChannelToggle = (channelId: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter((c) => c !== channelId)
        : [...prev.channels, channelId],
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    // Simulate agent creation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard
    window.location.href = "/dashboard"
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Agente IA</h1>
            <p className="text-gray-600">Configura tu agente en 3 simples pasos</p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-blue-600" />
                <span>Información Básica</span>
              </CardTitle>
              <CardDescription>Define las características principales de tu agente IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Agente *</Label>
                  <Input
                    id="name"
                    placeholder="ej. Asistente de Ventas"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector *</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, sector: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector.toLowerCase()}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe qué hace tu agente y cómo ayuda a los clientes..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Personalidad del Agente</Label>
                <Select
                  value={formData.personality}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, personality: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Amigable y cercano</SelectItem>
                    <SelectItem value="professional">Profesional y formal</SelectItem>
                    <SelectItem value="casual">Casual y relajado</SelectItem>
                    <SelectItem value="helpful">Servicial y detallado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Channels */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Canales de Comunicación</CardTitle>
              <CardDescription>Selecciona dónde quieres que esté disponible tu agente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {channels.map((channel) => {
                  const Icon = channel.icon
                  const isSelected = formData.channels.includes(channel.id)

                  return (
                    <div
                      key={channel.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleChannelToggle(channel.id)}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className={`h-6 w-6 ${isSelected ? "text-blue-600" : "text-gray-600"}`} />
                        <span className="font-semibold">{channel.name}</span>
                        {isSelected && <Badge className="ml-auto">Seleccionado</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">{channel.description}</p>
                    </div>
                  )
                })}
              </div>

              {formData.channels.length === 0 && (
                <div className="text-center py-8 text-gray-500">Selecciona al menos un canal para continuar</div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Knowledge Base */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Base de Conocimiento</CardTitle>
              <CardDescription>Proporciona información específica sobre tu negocio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="knowledge_base">Información del Negocio</Label>
                <Textarea
                  id="knowledge_base"
                  placeholder="Describe tu negocio, productos, servicios, políticas, horarios, etc. Esta información ayudará al agente a responder preguntas específicas..."
                  value={formData.knowledge_base}
                  onChange={(e) => setFormData((prev) => ({ ...prev, knowledge_base: e.target.value }))}
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome_message">Mensaje de Bienvenida</Label>
                <Textarea
                  id="welcome_message"
                  placeholder="¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?"
                  value={formData.welcome_message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, welcome_message: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Consejos para una mejor configuración:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Incluye información sobre horarios de atención</li>
                  <li>• Menciona tus productos o servicios principales</li>
                  <li>• Agrega políticas de devolución o garantía</li>
                  <li>• Incluye información de contacto alternativa</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>
            Anterior
          </Button>

          {step < 3 ? (
            <Button
              onClick={nextStep}
              disabled={
                (step === 1 && (!formData.name || !formData.sector)) || (step === 2 && formData.channels.length === 0)
              }
            >
              Siguiente
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? "Creando Agente..." : "Crear Agente IA"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
