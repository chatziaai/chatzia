import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  )

  // Verificar si hay un token de autenticación en las cookies
  const hasAuthToken = req.cookies.has('sb-access-token') || 
                      req.cookies.has('supabase-auth-token') ||
                      req.cookies.has('auth-token')

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedRoute && !hasAuthToken) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // Si hay token y está en login/register, redirigir al dashboard
  if (hasAuthToken && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register'
  ],
} 