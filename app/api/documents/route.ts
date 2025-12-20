import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const documents = await query(
      `SELECT * FROM medical_documents 
       WHERE user_id = $1 
       ORDER BY document_date DESC, upload_date DESC`,
      [user.id],
    )

    return NextResponse.json({ documents })
  } catch (error) {
    console.error("[v0] Get documents error:", error)
    return NextResponse.json({ error: "Failed to get documents" }, { status: 500 })
  }
}
