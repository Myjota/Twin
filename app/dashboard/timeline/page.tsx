import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"
import { TimelineView } from "@/components/timeline-view"
import { DashboardNav } from "@/components/dashboard-nav"

export default async function TimelinePage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  // Fetch timeline events and documents
  const [timelineEvents, documents] = await Promise.all([
    query(
      `SELECT * FROM timeline_events 
       WHERE user_id = $1 
       ORDER BY event_date DESC`,
      [user.id],
    ),
    query(
      `SELECT id, title, document_type, document_date as event_date, 'document' as event_type
       FROM medical_documents 
       WHERE user_id = $1`,
      [user.id],
    ),
  ])

  // Combine and sort all events
  const allEvents = [...timelineEvents, ...documents].sort(
    (a: any, b: any) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime(),
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
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Timeline</h1>
          <p className="text-gray-600">Your complete medical journey in chronological order</p>
        </div>
        <TimelineView events={allEvents} />
      </main>
    </div>
  )
}
