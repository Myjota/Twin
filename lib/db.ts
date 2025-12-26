import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  console.error("[DB] DATABASE_URL environment variable is not set!")
  throw new Error("DATABASE_URL environment variable is not set")
}

console.log("[DB] Initializing database connection...")
export const sql = neon(process.env.DATABASE_URL)
console.log("[DB] Database connection initialized")

// Helper function to execute queries with error handling
export async function query<T>(queryText: string, params?: any[]): Promise<T[]> {
  try {
    console.log("[DB] Executing query:", queryText.substring(0, 100), "...", "Params:", params ? params.map(() => "***") : [])
    const result = await sql(queryText, params)
    console.log("[DB] Query result:", Array.isArray(result) ? `${result.length} rows` : "Non-array result")
    return result as T[]
  } catch (error) {
    console.error("[DB] Database query error:", error)
    if (error instanceof Error) {
      console.error("[DB] Error message:", error.message)
      console.error("[DB] Error stack:", error.stack)
    }
    throw error
  }
}
