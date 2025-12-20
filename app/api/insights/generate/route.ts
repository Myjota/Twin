import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { query } from "@/lib/db"

export async function POST() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Get user's documents to analyze
    const documents = await query(
      `SELECT * FROM medical_documents WHERE user_id = $1 ORDER BY document_date DESC LIMIT 10`,
      [user.id],
    )

    // Generate sample insights (in production, this would use AI)
    const sampleInsights = [
      {
        insight_type: "recommendation",
        title: "Regular Check-up Recommended",
        description:
          "Based on your medical history, it's been over 6 months since your last general check-up. Consider scheduling an appointment with your primary care physician.",
        severity: "info",
        confidence_score: 0.85,
      },
      {
        insight_type: "trend",
        title: "Medication Adherence Pattern Detected",
        description:
          "Your prescription refill history shows consistent medication adherence. Keep up the good work maintaining your treatment schedule.",
        severity: "info",
        confidence_score: 0.92,
      },
    ]

    // Insert insights into database
    const insertedInsights = []
    for (const insight of sampleInsights) {
      const result = await query(
        `INSERT INTO health_insights 
         (user_id, insight_type, title, description, severity, confidence_score) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [user.id, insight.insight_type, insight.title, insight.description, insight.severity, insight.confidence_score],
      )
      insertedInsights.push(result[0])
    }

    return NextResponse.json({ insights: insertedInsights })
  } catch (error) {
    console.error("[v0] Generate insights error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
