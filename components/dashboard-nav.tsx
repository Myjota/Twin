"use client"

import { Button } from "@/components/ui/button"
import { Menu, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface DashboardNavProps {
  user: { id: number; email: string; full_name: string | null }
  onLogout: () => void
}

export function DashboardNav({ user, onLogout }: DashboardNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Medical Twin</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link
              href="/dashboard/documents"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Documents
            </Link>
            <Link
              href="/dashboard/timeline"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Timeline
            </Link>
            <Link
              href="/dashboard/insights"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Insights
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">{user.full_name || user.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="hidden md:flex">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/documents"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Documents
              </Link>
              <Link
                href="/dashboard/timeline"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Timeline
              </Link>
              <Link
                href="/dashboard/insights"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <div className="px-2 py-2 border-t border-gray-200 mt-2">
                <div className="text-sm font-medium text-gray-700 mb-2 px-2">{user.full_name || user.email}</div>
                <Button variant="outline" size="sm" onClick={onLogout} className="w-full justify-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
