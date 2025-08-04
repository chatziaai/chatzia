import { supabase } from "./supabase"
import type { Agent } from "./supabase"

export const agentsService = {
  // Obtener todos los agentes del usuario
  async getUserAgents(userId: string): Promise<Agent[]> {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  },

  // Crear nuevo agente
  async createAgent(agentData: Omit<Agent, "id" | "created_at" | "updated_at">): Promise<Agent> {
    const { data, error } = await supabase.from("agents").insert(agentData).select().single()

    if (error) throw error
    return data
  },

  // Actualizar agente
  async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent> {
    const { data, error } = await supabase
      .from("agents")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Eliminar agente
  async deleteAgent(id: string): Promise<void> {
    const { error } = await supabase.from("agents").delete().eq("id", id)

    if (error) throw error
  },

  // Obtener agente por ID
  async getAgent(id: string): Promise<Agent | null> {
    const { data, error } = await supabase.from("agents").select("*").eq("id", id).single()

    if (error) return null
    return data
  },

  // Obtener estadísticas de agentes
  async getAgentStats(userId: string) {
    const { data: agents } = await supabase.from("agents").select("id, status").eq("user_id", userId)

    const { data: conversations } = await supabase
      .from("conversations")
      .select("id, agent_id, created_at")
      .eq("user_id", userId)
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    const { data: messages } = await supabase
      .from("messages")
      .select("id, conversation_id, created_at")
      .in("conversation_id", conversations?.map((c) => c.id) || [])
      .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    return {
      totalAgents: agents?.length || 0,
      activeAgents: agents?.filter((a) => a.status === "active").length || 0,
      monthlyConversations: conversations?.length || 0,
      monthlyMessages: messages?.length || 0,
    }
  },
}
