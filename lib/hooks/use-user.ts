"use client"

import useSWR from "swr"

interface User {
  id: number
  email: string
  fullName: string | null
  dateOfBirth: string | null
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Not authenticated")
  }
  const data = await res.json()
  return data.user
}

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User>("/api/auth/me", fetcher)

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  }
}
