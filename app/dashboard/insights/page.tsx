import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"
import { InsightsView } from "@/components/insights-view"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function InsightsPage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  const [insights, reminders] = await Promise.all([
    query(
      `SELECT * FROM health_insights 
       WHERE user_id = $1 
       ORDER BY generated_at DESC`,
      [user.id],
    ),
    query(
      `SELECT * FROM reminders 
       WHERE user_id = $1 AND is_completed = false
       ORDER BY due_date ASC`,
      [user.id],
    ),
  ])

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Insights</h1>
          <p className="text-gray-600">AI-powered recommendations and reminders for your health</p>
        </div>
        <InsightsView insights={insights} reminders={reminders} userId={user.id} />
      </main>
    </div>
  )
}
