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

    await query(`UPDATE health_insights SET is_read = true WHERE id = $1 AND user_id = $2`, [
      Number.parseInt(id),
      user.id,
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Mark insight as read error:", error)
    return NextResponse.json({ error: "Failed to update insight" }, { status: 500 })
  }
}
