"use client"

import type React from "react"

import { useState } from "react"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"login" | "signup">("login")

  const openModal = (mode: "login" | "signup") => {
    setModalMode(mode)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const switchMode = () => {
    setModalMode(modalMode === "login" ? "signup" : "login")
  }

  const handleAuth = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    // Simular proceso de autenticación
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <>
      <div
        className="antialiased"
        style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#F0F7FF", color: "#111827" }}
      >
        {/* Header */}
        <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span className="text-xl font-bold text-gray-900">ChatzIA.ai</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#como" className="text-gray-600 hover:text-black transition">
                Cómo funciona
              </a>
              <a href="#features" className="text-gray-600 hover:text-black transition">
                Características
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-black transition">
                Precios
              </a>
              <a href="#faq" className="text-gray-600 hover:text-black transition">
                FAQ
              </a>
            </nav>
            <button
              onClick={() => openModal("login")}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-lg transition cursor-pointer border-none"
            >
              Iniciar sesión - Probar gratis
            </button>
          </div>
        </header>

        <main className="pt-24">
          {/* Hero Section */}
          <section
            className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
            style={{
              backgroundImage: "url('hero-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background: "linear-gradient(135deg, hsl(220, 91%, 42%), hsl(217, 91%, 60%))",
              }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Agentes IA para una atención al cliente excepcional.
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
                    Genera en menos de 5 minutos un agente IA que puede resolver hasta el 50% de tus solicitudes de
                    atención al cliente.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button
                      onClick={() => openModal("signup")}
                      className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-lg text-white transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-xl cursor-pointer border-none"
                      style={{ background: "orange" }}
                    >
                      Genera tu agente IA.
                    </button>
                  </div>
                  <p className="text-sm text-white/70 mt-4">
                    💳 Es gratis. No requiere programación.
                    <br />
                    *Un Agente IA es un chatbot que utiliza Inteligencia Artificial.
                  </p>
                </div>

                {/* Right Content - Video */}
                <div className="group relative aspect-[0.939] w-full overflow-hidden rounded-3xl">
                  <video
                    className="aspect-[0.939] w-full rounded-3xl object-contain block cursor-pointer"
                    preload="metadata"
                    poster="https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/hero/hero-thumbnail.png"
                    playsInline
                    muted
                    loop
                    autoPlay
                    src="https://backend.chatbase.co/storage/v1/object/public/chatbase/landing/hero/hero.webm"
                  >
                    Your browser does not support the video tag. Please try viewing this page in a modern browser.
                  </video>
                  <button
                    type="button"
                    className="absolute bottom-4 left-4 rounded-full bg-black/25 p-2 opacity-90 transition-opacity md:p-3 group-hover:opacity-100"
                    aria-label="Pause video"
                  >
                    <svg className="-rotate-90 absolute top-0 left-0 h-full w-full" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="14.8"
                        fill="none"
                        stroke="white"
                        strokeWidth="2.3"
                        strokeDasharray="94.2"
                        strokeDashoffset="23.361599999999996"
                        className="opacity-90"
                      ></circle>
                    </svg>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="currentColor"
                      strokeWidth="0"
                      className="relative h-4 w-4 md:h-6 md:w-6"
                    >
                      <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                      <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 px-4">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                La plataforma de agentes IA para
                <br />
                la atención al cliente en español.
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
                Las características que necesitas para generar agentes IA de atención al cliente en español que
                funcionen, con inteligencia a nivel humano y en los que puedes confiar para interactuar con tus
                clientes.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-4">
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="font-bold text-2xl">A</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Inteligencia Artificial avanzada.</h3>
                  <p className="text-gray-600">Respuestas personalizadas para cada cliente, precisas y naturales.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons">design_services</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Con tu contenido.</h3>
                  <p className="text-gray-600">
                    Tu Agente IA responde a las preguntas basándose únicamente en el contenido que le hayas facilitado.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
                  <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons">security</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Seguridad garantizada.</h3>
                  <p className="text-gray-600">Estamos comprometidos a mantener tus datos seguros.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-4">
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="font-bold text-2xl">A</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Funciona en todos los canales.</h3>
                  <p className="text-gray-600">
                    Integra fácilmente tu Agente IA con varias plataformas como WhatsApp, Telegram.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons">design_services</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Es fácil de instalar.</h3>
                  <p className="text-gray-600">No requiere programación.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-8 text-left">
                  <div className="bg-green-100 text-green-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <span className="material-icons">security</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Siempre disponible.</h3>
                  <p className="text-gray-600">24 horas todos los días del año.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Precios simples y transparentes</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
                  Elige el plan que mejor se adapte a tus necesidades.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Plan Básico */}
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 flex flex-col">
                  <h3 className="text-2xl font-bold text-white">Básico</h3>
                  <p className="text-gray-400 mt-2 mb-6">Para proyectos personales y pruebas.</p>
                  <p className="text-4xl font-bold text-white mb-6">Gratis</p>
                  <ul className="space-y-3 text-gray-300 flex-1">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      2 Chatbots
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      100 mensajes/mes
                    </li>
                  </ul>
                  <button
                    onClick={() => openModal("signup")}
                    className="mt-8 w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-5 rounded-lg transition cursor-pointer border-none"
                  >
                    Comenzar
                  </button>
                </div>

                {/* Plan Pro */}
                <div className="bg-gray-900 p-8 rounded-xl border-2 border-indigo-500 flex flex-col relative">
                  <span className="absolute top-0 -translate-y-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                  <h3 className="text-2xl font-bold text-white">Pro</h3>
                  <p className="text-gray-400 mt-2 mb-6">Para profesionales y pequeñas empresas.</p>
                  <p className="text-4xl font-bold text-white mb-6">
                    $19<span className="text-lg font-normal text-gray-400">/mes</span>
                  </p>
                  <ul className="space-y-3 text-gray-300 flex-1">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      10 Chatbots
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      2,000 mensajes/mes
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Soporte prioritario
                    </li>
                  </ul>
                  <button
                    onClick={() => openModal("signup")}
                    className="mt-8 w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-lg transition cursor-pointer border-none"
                  >
                    Elegir Plan Pro
                  </button>
                </div>

                {/* Plan Empresa */}
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 flex flex-col">
                  <h3 className="text-2xl font-bold text-white">Empresa</h3>
                  <p className="text-gray-400 mt-2 mb-6">Para grandes equipos y aplicaciones a escala.</p>
                  <p className="text-4xl font-bold text-white mb-6">Contacto</p>
                  <ul className="space-y-3 text-gray-300 flex-1">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Chatbots ilimitados
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Mensajes personalizados
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-indigo-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Acceso API y SLA
                    </li>
                  </ul>
                  <button
                    onClick={() => openModal("login")}
                    className="mt-8 w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-5 rounded-lg transition cursor-pointer border-none"
                  >
                    Contactar Ventas
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div className="bg-gray-100 rounded-xl p-8">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <img
                    alt="A chat interface mockup."
                    className="w-full h-auto rounded-lg"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEpEZf-HwzTISND4On3bmzXwx4EIlZoeggjFkz-Z9OYwq-jo7pr_5IaY2nIUr5AOgucc74loQDir5qy7mO7wqftuFdGlHiajzJx7XlW6aIjyCvZ0BAEBHChUOVQx-8TqEBJD7cbS66UpgPJVT7P6n0pjflRNB9tZ_RIJNlBFyR5DLh6jNhTwr11f40NbeuWkkGAIKYJduGT7I7Wc2ESgU7IjCdapQKd4c1t0SOzvrPgQfZxqjaXLfUCVLGLTt3QT-3FivWs4gPTA"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Funciona como los mejores agentes de servicio de atención al cliente.
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <span className="material-icons text-indigo-600 mt-1">check_circle</span>
                    <div>
                      <h4 className="font-semibold">Respuestas personalizadas</h4>
                      <p className="text-gray-600">
                        Adapta las respuestas en función de los datos del cliente y las conversaciones anteriores.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="material-icons text-indigo-600 mt-1">check_circle</span>
                    <div>
                      <h4 className="font-semibold">Preciso y confiable</h4>
                      <p className="text-gray-600">
                        Tu Agente IA responde a las preguntas basándose únicamente en el contenido que le hayas
                        facilitado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="material-icons text-indigo-600 mt-1">check_circle</span>
                    <div>
                      <h4 className="font-semibold">Siempre disponible</h4>
                      <p className="text-gray-600">
                        Proporciona soporte 24/7 a tus clientes y reduce los tiempos de espera.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="material-icons text-indigo-600 mt-1">check_circle</span>
                    <div>
                      <h4 className="font-semibold">Hablamos español.</h4>
                      <p className="text-gray-600">Enfocado especialmente al mercado hispanohablante.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20 px-4">
            <div className="container mx-auto max-w-3xl">
              <h2 className="text-4xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
              <div className="space-y-4">
                <details className="bg-gray-50 p-6 rounded-lg group border border-gray-200" open>
                  <summary className="font-semibold text-gray-800 cursor-pointer flex justify-between items-center">
                    ¿Cómo funciona?
                    <span className="material-icons transform group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="text-gray-600 mt-4">
                    Simplemente conecta tus fuentes de conocimiento (como tu sitio web, documentos o base de datos) y
                    nosotros generaremos automáticamente un agente de IA que puede responder preguntas sobre ello.
                    Puedes añadirlo a tu sitio web con una línea de código.
                  </p>
                </details>
                <details className="bg-gray-50 p-6 rounded-lg group border border-gray-200">
                  <summary className="font-semibold text-gray-800 cursor-pointer flex justify-between items-center">
                    ¿Se puede integrar con otras herramientas como WhatsApp?
                    <span className="material-icons transform group-open:rotate-180 transition-transform">
                      expand_more
                    </span>
                  </summary>
                  <p className="text-gray-600 mt-4">
                    Sí, ChatzIA.ai se integra con herramientas populares de soporte al cliente, CRMs y plataformas de
                    mensajería para una transición fluida, como WhatsApp y Telegram. También ofrecemos una API para
                    integraciones personalizadas.
                  </p>
                </details>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="material-icons text-indigo-500">chat</span>
                  <span className="font-bold text-xl text-white">Chatzia.ai</span>
                </div>
                <p className="text-sm">Agentes IA para una atención al cliente excepcional.</p>
                <div className="grid w-full grid-cols-4 md:w-auto md:grid-cols-12 mt-4">
                  <a
                    className="contents"
                    target="_blank"
                    href="https://www.linkedin.com/company/chatbase-co/"
                    rel="noreferrer"
                  >
                    <button className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 h-11 border-zinc-800 p-3 text-primary-foreground md:col-span-1 hover:bg-zinc-800/90 hover:text-white border bg-transparent">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-5">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-4">Producto</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a className="hover:text-white" href="#">
                      Características
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Precios
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-4">Recursos</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a className="hover:text-white" href="#">
                      Aviso Legal
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Política de Privacidad
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Protección de datos
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Seguridad
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-white mb-4">Empresa</h5>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a className="hover:text-white" href="#">
                      Conócenos
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Afiliados
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Prensa
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white" href="#">
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex justify-between items-center text-sm">
              <p>© 2025 ChatzIA.ai.</p>
              <div className="flex items-center space-x-4">
                <p>Una empresa de Agentzia.ai</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md relative shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-all"
            >
              ✕
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <div
                  className="w-6 h-6 bg-black mx-auto mb-4"
                  style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                ></div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {modalMode === "login" ? "Iniciar Sesión en ChatzIA" : "Crear Cuenta en ChatzIA"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {modalMode === "login"
                    ? "Accede a tu dashboard de agentes IA"
                    : "Crea tu primer agente IA en 5 minutos"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <input
                  type="email"
                  placeholder="Dirección de Email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  {modalMode === "login" ? "Continuar con Email" : "Crear Cuenta"}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">O continúa con</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAuth}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continuar con Google</span>
                </button>

                <button
                  onClick={handleAuth}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>Continuar con GitHub</span>
                </button>
              </div>

              <div className="text-center mt-6">
                <span className="text-sm text-gray-600">
                  {modalMode === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
                  <button onClick={switchMode} className="text-blue-600 hover:underline">
                    {modalMode === "login" ? "Crear Cuenta" : "Iniciar Sesión"}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add required fonts and icons */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </>
  )
}
