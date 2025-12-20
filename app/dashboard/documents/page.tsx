import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"
import { DocumentsList } from "@/components/documents-list"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function DocumentsPage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  const documents = await query(
    `SELECT * FROM medical_documents 
     WHERE user_id = $1 
     ORDER BY document_date DESC, upload_date DESC`,
    [user.id],
  )

  const handleLogout = async () => {
    "use server"
    const { clearSession } = await import("@/lib/auth")
    await clearSession()
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <DashboardNav user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Documents</h1>
          <p className="text-gray-600">View and manage all your uploaded medical records</p>
        </div>
        <DocumentsList initialDocuments={documents} />
      </main>
    </div>
  )
}
