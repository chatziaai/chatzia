import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para las tablas
export interface User {
  id: string
  name: string
  email: string
  role: "visitor" | "registered" | "admin"
  plan_id?: string
  created_at: string
  updated_at: string
}

export interface Plan {
  id: string
  name: string
  price: number
  chatbot_limit: number
  message_limit: number
  features: string[]
  created_at: string
  updated_at: string
}

export interface Agent {
  id: string
  name: string
  description?: string
  sector?: string
  user_id: string
  channels: string[]
  status: "active" | "inactive" | "training"
  personality: string
  knowledge_base?: string
  welcome_message?: string
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  user_id?: string
  agent_id: string
  duration: number
  summary?: string
  status: "active" | "closed" | "transferred"
  customer_name?: string
  customer_email?: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  content: string
  conversation_id: string
  sender_type: "user" | "agent" | "customer"
  sender_name?: string
  created_at: string
}

export interface FAQ {
  id: string
  agent_id: string
  question: string
  answer: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  plan_id: string
  stripe_checkout_id?: string
  status: "pending" | "completed" | "cancelled" | "refunded"
  amount?: number
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  content: string
  read: boolean
  type: string
  created_at: string
}

export interface Incident {
  id: string
  user_id: string
  description: string
  status: "open" | "in_progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  created_at: string
  updated_at: string
}
