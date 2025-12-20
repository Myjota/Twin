import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { UploadForm } from "@/components/upload-form"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function UploadPage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  const handleLogout = async () => {
    "use server"
    const { clearSession } = await import("@/lib/auth")
    await clearSession()
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <DashboardNav user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Medical Document</h1>
          <p className="text-gray-600">Add prescriptions, lab results, or medical reports to your health record</p>
        </div>
        <UploadForm />
      </main>
    </div>
  )
}
