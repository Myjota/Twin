import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { hashPassword, setSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, dateOfBirth } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = await query("SELECT id FROM users WHERE email = $1", [email])

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password)
    const result = await query(
      `INSERT INTO users (email, password_hash, full_name, date_of_birth) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, full_name, date_of_birth`,
      [email, passwordHash, fullName || null, dateOfBirth || null],
    )

    const user = result[0] as any

    // Set session
    await setSession({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      date_of_birth: user.date_of_birth,
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        dateOfBirth: user.date_of_birth,
      },
    })
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
