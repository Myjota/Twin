import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HolographicHumanClient } from "@/components/holographic-human-client"

export default async function HomePage() {
  const user = await getSession()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-[#001a33] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0ea5e9 1px, transparent 1px),
              linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 mb-4 tracking-wider">MEDICAL TWIN</h1>
          <p className="text-xl text-cyan-300/80">Universal Personal Health Platform</p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="border-4 border-cyan-500 rounded-3xl bg-[#002244]/90 backdrop-blur-sm shadow-2xl shadow-cyan-500/30 overflow-hidden">
            <div className="w-[600px] h-[700px]">
              <HolographicHumanClient />
            </div>
          </div>
        </div>

        {/* Features Section - Records, Insights, Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <div className="h-[320px] border border-cyan-400/40 rounded-lg p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-400/80 transition-all relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Scan lines effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)`
              }} />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center">
                <svg className="w-full h-full text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-cyan-300 font-bold text-2xl mb-3 tracking-wide drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]">RECORDS</h3>
              <p className="text-cyan-200/80 text-sm leading-relaxed">Digital medical documents and health history</p>
            </div>
          </div>

          <div className="h-[320px] border border-cyan-400/40 rounded-lg p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-400/80 transition-all relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Scan lines effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)`
              }} />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center">
                <svg className="w-full h-full text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 01-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-cyan-300 font-bold text-2xl mb-3 tracking-wide drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]">INSIGHTS</h3>
              <p className="text-cyan-200/80 text-sm leading-relaxed">AI-powered health analysis and recommendations</p>
            </div>
          </div>

          <div className="h-[320px] border border-cyan-400/40 rounded-lg p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-400/80 transition-all relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Scan lines effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)`
              }} />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 mb-6 flex items-center justify-center">
                <svg className="w-full h-full text-cyan-300 drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-cyan-300 font-bold text-2xl mb-3 tracking-wide drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]">TRACKING</h3>
              <p className="text-cyan-200/80 text-sm leading-relaxed">Continuous health monitoring and timeline</p>
            </div>
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <div className="h-[320px] border border-cyan-400/40 rounded-lg p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-400/80 transition-all relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Scan lines effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)`
              }} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-cyan-300 font-bold text-xl mb-3 tracking-wide drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]">CENTRALIZED DATA</h3>
              <p className="text-cyan-200/80 text-sm leading-relaxed">
                All your medical records unified in one secure, accessible platform
              </p>
            </div>
          </div>

          <div className="h-[320px] border border-cyan-400/40 rounded-lg p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-400/80 transition-all relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Scan lines effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)`
              }} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-cyan-300 font-bold text-xl mb-3 tracking-wide drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]">AI PREDICTIONS</h3>
              <p className="text-cyan-200/80 text-sm leading-relaxed">
                Advanced algorithms analyze your health patterns for proactive care
              </p>
            </div>
          </div>

          <div className="h-[320px] border border-cyan-400/40 rounded-lg p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-400/80 transition-all relative overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Scan lines effect */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)`
              }} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center">
              <h3 className="text-cyan-300 font-bold text-xl mb-3 tracking-wide drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]">SECURE & PRIVATE</h3>
              <p className="text-cyan-200/80 text-sm leading-relaxed">End-to-end encryption ensures your data remains confidential</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-cyan-500 hover:bg-cyan-400 text-[#001a33] font-bold text-lg px-12 py-6 rounded-xl border-2 border-cyan-400 shadow-lg shadow-cyan-500/30"
          >
            <Link href="/register">INITIALIZE MEDICAL TWIN</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 font-bold text-lg px-12 py-6 rounded-xl bg-transparent"
          >
            <Link href="/login">ACCESS SYSTEM</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
