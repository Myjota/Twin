import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { query } from "./db"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "medical-twin-secret-key-change-in-production")

export interface User {
  id: number
  email: string
  full_name: string | null
  date_of_birth: string | null
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(user: User): Promise<string> {
  return new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as unknown as User
  } catch (error) {
    return null
  }
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      console.log("[Auth] No auth token found")
      return null
    }

    console.log("[Auth] Token found, verifying...")
    const tokenData = await verifyToken(token.value)
    if (!tokenData) {
      console.error("[Auth] Token verification failed")
      return null
    }

    console.log("[Auth] Token verified, getting user data from DB for user ID:", tokenData.id)
    // Get full user data from database
    const users = await query("SELECT id, email, full_name, date_of_birth FROM users WHERE id = $1", [tokenData.id])
    
    if (users.length === 0) {
      console.error("[Auth] User not found in database for ID:", tokenData.id)
      return null
    }

    const user = users[0] as any
    console.log("[Auth] User data retrieved:", { id: user.id, email: user.email, full_name: user.full_name })
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      date_of_birth: user.date_of_birth,
    }
  } catch (error) {
    console.error("[Auth] Error in getSession:", error)
    if (error instanceof Error) {
      console.error("[Auth] Error message:", error.message)
      console.error("[Auth] Error stack:", error.stack)
    }
    return null
  }
}

export async function setSession(user: User): Promise<void> {
  try {
    console.log("[Auth] Creating session for user:", user.id, user.email)
    const token = await createToken(user)
    console.log("[Auth] Token created, setting cookie...")
    const cookieStore = await cookies()

    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })
    console.log("[Auth] Session cookie set successfully")
  } catch (error) {
    console.error("[Auth] Error setting session:", error)
    if (error instanceof Error) {
      console.error("[Auth] Error message:", error.message)
      console.error("[Auth] Error stack:", error.stack)
    }
    throw error
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}
