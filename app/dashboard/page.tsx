"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageSquare, Plus, Settings, BarChart3, Bot, Bell, Search, Calendar, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { authService } from "@/lib/auth"
import { agentsService } from "@/lib/agents"
import type { User } from "@/lib/supabase"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState({
    totalAgents: 0,
    activeAgents: 0,
    monthlyConversations: 0,
    monthlyMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      if (!currentUser) {
        window.location.href = "/"
        return
      }

      setUser(currentUser)

      const agentStats = await agentsService.getAgentStats(currentUser.id)
      setStats(agentStats)
    } catch (error) {
      console.error("Error loading user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const monthlyData = [
    { month: "Ene", conversations: Math.floor(stats.monthlyConversations * 0.6) },
    { month: "Feb", conversations: Math.floor(stats.monthlyConversations * 0.7) },
    { month: "Mar", conversations: Math.floor(stats.monthlyConversations * 0.8) },
    { month: "Apr", conversations: Math.floor(stats.monthlyConversations * 0.9) },
    { month: "May", conversations: Math.floor(stats.monthlyConversations * 0.95) },
    { month: "Jun", conversations: stats.monthlyConversations },
  ]

  const maxConversations = Math.max(...monthlyData.map((d) => d.conversations)) || 1

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r">
        <div className="flex items-center h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">ChatzIA</span>
          </div>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 text-gray-900 p-3 rounded-lg bg-blue-50 border-l-4 border-blue-600"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              href="/dashboard/agents"
              className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
            >
              <Bot className="h-5 w-5" />
              <span>Agentes</span>
            </Link>
            <Link
              href="/dashboard/conversations"
              className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Conversaciones</span>
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Analytics</span>
            </Link>
            <Link
              href="/dashboard/integrations"
              className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
            >
              <Zap className="h-5 w-5" />
              <span>Integraciones</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-3 text-gray-600 p-3 rounded-lg hover:bg-gray-50"
            >
              <Settings className="h-5 w-5" />
              <span>Configuración</span>
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-600 text-white">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <button onClick={handleSignOut} className="text-xs text-gray-500 hover:text-gray-700">
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Buscar agentes, conversaciones..." className="pl-10 w-80 bg-gray-50 border-0" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gray-200">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="p-6">
          {/* Dashboard header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bienvenido de vuelta, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date().toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Link href="/dashboard/agents/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Agente IA
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Agentes Totales</span>
                  <Bot className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalAgents}</div>
                <div className="text-sm text-blue-600">{stats.activeAgents} activos</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Conversaciones</span>
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stats.monthlyConversations}</div>
                <div className="text-sm text-green-600">Este mes</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Mensajes</span>
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stats.monthlyMessages}</div>
                <div className="text-sm text-green-600">Este mes</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Tasa de Respuesta</span>
                  <Zap className="h-4 w-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm text-green-600">Promedio</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Conversaciones Mensuales</CardTitle>
                <CardDescription className="text-gray-600">
                  Actividad de tus agentes IA en los últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between space-x-2">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-600 rounded-t-sm transition-all hover:bg-blue-700"
                        style={{
                          height: `${(data.conversations / maxConversations) * 200}px`,
                          minHeight: "20px",
                        }}
                      />
                      <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Actividad Reciente</CardTitle>
                <CardDescription className="text-gray-600">Últimas interacciones de tus agentes IA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.totalAgents === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No tienes agentes aún</p>
                      <p className="text-sm">Crea tu primer agente IA para comenzar</p>
                      <Link href="/dashboard/agents/new">
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Crear Primer Agente
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No hay actividad reciente</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
