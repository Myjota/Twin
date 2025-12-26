import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyPassword, setSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    console.log("[API Login] Request received")
    const body = await request.json()
    const { email, password } = body
    console.log("[API Login] Email:", email, "Password provided:", !!password)

    if (!email || !password) {
      console.error("[API Login] Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    console.log("[API Login] Querying database for user...")
    const users = await query("SELECT id, email, password_hash, full_name, date_of_birth FROM users WHERE email = $1", [
      email,
    ])
    console.log("[API Login] Users found:", users.length)

    if (users.length === 0) {
      console.error("[API Login] User not found for email:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const user = users[0] as any
    console.log("[API Login] User found:", { id: user.id, email: user.email, hasPasswordHash: !!user.password_hash })

    // Verify password
    console.log("[API Login] Verifying password...")
    const isValid = await verifyPassword(password, user.password_hash)
    console.log("[API Login] Password valid:", isValid)

    if (!isValid) {
      console.error("[API Login] Invalid password for user:", email)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Set session
    console.log("[API Login] Setting session for user:", user.id)
    await setSession({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      date_of_birth: user.date_of_birth,
    })
    console.log("[API Login] Session set successfully")

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        dateOfBirth: user.date_of_birth,
      },
    })
  } catch (error) {
    console.error("[API Login] Error occurred:", error)
    if (error instanceof Error) {
      console.error("[API Login] Error message:", error.message)
      console.error("[API Login] Error stack:", error.stack)
    }
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
