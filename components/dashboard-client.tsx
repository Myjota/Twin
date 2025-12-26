"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertCircle, Bell, Upload, Calendar, Activity } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"

interface User {
  id: number
  email: string
  full_name: string | null
  date_of_birth: string | null
}

interface Document {
  id: number
  document_type: string
  title: string
  document_date: string
  upload_date: string
}

interface Insight {
  id: number
  insight_type: string
  title: string
  description: string
  severity: string
  generated_at: string
}

interface Reminder {
  id: number
  reminder_type: string
  title: string
  due_date: string
}

interface DashboardClientProps {
  user: User
  initialDocuments: Document[]
  initialInsights: Insight[]
  initialReminders: Reminder[]
}

export function DashboardClient({ user, initialDocuments, initialInsights, initialReminders }: DashboardClientProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <DashboardNav user={user} onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back{user.full_name ? `, ${user.full_name}` : user.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="text-gray-600">Your personal health dashboard</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{initialDocuments.length}</div>
              <p className="text-xs text-gray-500 mt-1">Medical records uploaded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Insights</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{initialInsights.length}</div>
              <p className="text-xs text-gray-500 mt-1">AI-generated recommendations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Upcoming Reminders</CardTitle>
              <Bell className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{initialReminders.length}</div>
              <p className="text-xs text-gray-500 mt-1">Scheduled check-ups</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your health records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild className="h-auto py-4 flex-col gap-2">
                <Link href="/dashboard/upload">
                  <Upload className="h-5 w-5" />
                  <span>Upload Document</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Link href="/dashboard/timeline">
                  <Calendar className="h-5 w-5" />
                  <span>View Timeline</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Link href="/dashboard/insights">
                  <Activity className="h-5 w-5" />
                  <span>Health Insights</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                <Link href="/dashboard/documents">
                  <FileText className="h-5 w-5" />
                  <span>All Documents</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Documents</CardTitle>
              <CardDescription>Your latest medical records</CardDescription>
            </CardHeader>
            <CardContent>
              {initialDocuments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No documents uploaded yet</p>
                  <Button asChild className="mt-4" size="sm">
                    <Link href="/dashboard/upload">Upload Your First Document</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {initialDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{doc.title}</p>
                          <p className="text-xs text-gray-500">{new Date(doc.document_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge variant="secondary">{doc.document_type}</Badge>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
                    <Link href="/dashboard/documents">View All Documents</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Health Insights & Reminders */}
          <div className="space-y-6">
            {/* Health Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Health Insights</CardTitle>
                <CardDescription>AI-powered recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                {initialInsights.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <AlertCircle className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No insights available yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {initialInsights.slice(0, 3).map((insight) => (
                      <div key={insight.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-medium text-sm">{insight.title}</p>
                          <Badge
                            variant={
                              insight.severity === "critical"
                                ? "destructive"
                                : insight.severity === "warning"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {insight.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Reminders */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>Don't miss your check-ups</CardDescription>
              </CardHeader>
              <CardContent>
                {initialReminders.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <Bell className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No reminders scheduled</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {initialReminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="font-medium text-sm">{reminder.title}</p>
                            <p className="text-xs text-gray-500">{new Date(reminder.due_date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{reminder.reminder_type}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
