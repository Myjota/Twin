import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"
import { DashboardClient } from "@/components/dashboard-client"

export default async function DashboardPage() {
  console.log("[Dashboard] Loading dashboard page...")
  const user = await getSession()
  console.log("[Dashboard] User session:", user ? { id: user.id, email: user.email } : "null")

  if (!user) {
    console.error("[Dashboard] No user session, redirecting to login...")
    redirect("/login")
  }

  // Fetch user's health data
  const [documents, insights, reminders] = await Promise.all([
    query(
      `SELECT * FROM medical_documents 
       WHERE user_id = $1 
       ORDER BY document_date DESC 
       LIMIT 5`,
      [user.id],
    ),
    query(
      `SELECT * FROM health_insights 
       WHERE user_id = $1 AND is_read = false
       ORDER BY generated_at DESC 
       LIMIT 5`,
      [user.id],
    ),
    query(
      `SELECT * FROM reminders 
       WHERE user_id = $1 AND is_completed = false AND due_date >= CURRENT_DATE
       ORDER BY due_date ASC 
       LIMIT 5`,
      [user.id],
    ),
  ])

  return (
    <DashboardClient user={user} initialDocuments={documents} initialInsights={insights} initialReminders={reminders} />
  )
}
