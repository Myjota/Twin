import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("documentType") as string
    const title = formData.get("title") as string
    const documentDate = formData.get("documentDate") as string
    const notes = formData.get("notes") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(`medical-docs/${user.id}/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    // Save to database
    const result = await query(
      `INSERT INTO medical_documents 
       (user_id, document_type, title, file_url, file_name, file_size, document_date, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
      [
        user.id,
        documentType || "other",
        title || file.name,
        blob.url,
        file.name,
        file.size,
        documentDate || new Date().toISOString().split("T")[0],
        notes || null,
      ],
    )

    return NextResponse.json({ document: result[0] })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
