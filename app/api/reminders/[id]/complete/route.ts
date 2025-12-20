import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const { id } = await params

    await query(
      `UPDATE reminders 
       SET is_completed = true, completed_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND user_id = $2`,
      [Number.parseInt(id), user.id],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Complete reminder error:", error)
    return NextResponse.json({ error: "Failed to complete reminder" }, { status: 500 })
  }
}
