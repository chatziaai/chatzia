import { supabase } from "./supabase"
import type { User } from "./supabase"

export const authService = {
  // Registrar nuevo usuario
  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) throw error

    // Crear perfil de usuario en la tabla users
    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        name,
        email,
        role: "registered",
        plan_id: await this.getFreePlanId(),
      })

      if (profileError) throw profileError
    }

    return data
  },

  // Iniciar sesión
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Iniciar sesión con Google
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) throw error
    return data
  },

  // Iniciar sesión con GitHub
  async signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })

    if (error) throw error
    return data
  },

  // Cerrar sesión
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Obtener usuario actual
  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

    return profile
  },

  // Obtener ID del plan gratuito
  async getFreePlanId(): Promise<string> {
    const { data } = await supabase.from("plans").select("id").eq("name", "Básico").single()

    return data?.id || ""
  },
}
