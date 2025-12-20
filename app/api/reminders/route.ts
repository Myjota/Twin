import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { reminderType, title, description, dueDate, isRecurring } = await request.json()

    const result = await query(
      `INSERT INTO reminders 
       (user_id, reminder_type, title, description, due_date, is_recurring) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [user.id, reminderType, title, description || null, dueDate, isRecurring || false],
    )

    return NextResponse.json({ reminder: result[0] })
  } catch (error) {
    console.error("[v0] Create reminder error:", error)
    return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 })
  }
}
