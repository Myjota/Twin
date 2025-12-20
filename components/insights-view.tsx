"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Brain, Bell, CheckCircle2, TrendingUp, AlertTriangle, Info, Plus } from "lucide-react"
import { AddReminderDialog } from "@/components/add-reminder-dialog"
import { GenerateInsightsButton } from "@/components/generate-insights-button"

interface Insight {
  id: number
  insight_type: string
  title: string
  description: string
  severity: string
  confidence_score: number
  is_read: boolean
  generated_at: string
}

interface Reminder {
  id: number
  reminder_type: string
  title: string
  description: string
  due_date: string
  is_completed: boolean
  is_recurring: boolean
}

interface InsightsViewProps {
  insights: Insight[]
  reminders: Reminder[]
  userId: number
}

export function InsightsView({ insights: initialInsights, reminders: initialReminders, userId }: InsightsViewProps) {
  const [insights, setInsights] = useState<Insight[]>(initialInsights)
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)
  const [showAddReminder, setShowAddReminder] = useState(false)

  const markInsightAsRead = async (insightId: number) => {
    try {
      await fetch(`/api/insights/${insightId}/read`, {
        method: "POST",
      })
      setInsights(insights.map((i) => (i.id === insightId ? { ...i, is_read: true } : i)))
    } catch (error) {
      console.error("[v0] Failed to mark insight as read:", error)
    }
  }

  const completeReminder = async (reminderId: number) => {
    try {
      await fetch(`/api/reminders/${reminderId}/complete`, {
        method: "POST",
      })
      setReminders(reminders.filter((r) => r.id !== reminderId))
    } catch (error) {
      console.error("[v0] Failed to complete reminder:", error)
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-100"
      case "warning":
        return "text-amber-600 bg-amber-100"
      default:
        return "text-blue-600 bg-blue-100"
    }
  }

  const unreadInsights = insights.filter((i) => !i.is_read)
  const readInsights = insights.filter((i) => i.is_read)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Insights</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadInsights.length}</div>
            <p className="text-xs text-gray-500 mt-1">Unread recommendations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Reminders</CardTitle>
            <Bell className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reminders.length}</div>
            <p className="text-xs text-gray-500 mt-1">Upcoming tasks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Health Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-500 mt-1">Based on your records</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="insights">
            Insights {unreadInsights.length > 0 && `(${unreadInsights.length})`}
          </TabsTrigger>
          <TabsTrigger value="reminders">Reminders ({reminders.length})</TabsTrigger>
        </TabsList>

        {/* Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>Personalized health recommendations based on your medical records</CardDescription>
                </div>
                <GenerateInsightsButton
                  userId={userId}
                  onInsightsGenerated={(newInsights) => setInsights([...newInsights, ...insights])}
                />
              </div>
            </CardHeader>
          </Card>

          {insights.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Brain className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights yet</h3>
                  <p className="text-gray-600 mb-6">
                    Upload medical documents to receive AI-powered health recommendations
                  </p>
                  <GenerateInsightsButton
                    userId={userId}
                    onInsightsGenerated={(newInsights) => setInsights(newInsights)}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Unread Insights */}
              {unreadInsights.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">New Insights</h3>
                  {unreadInsights.map((insight) => (
                    <Card key={insight.id} className="border-l-4 border-l-blue-600">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${getSeverityColor(insight.severity)}`}>
                            {getSeverityIcon(insight.severity)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-lg text-gray-900 mb-1">{insight.title}</h4>
                                <div className="flex items-center gap-2 mb-3">
                                  <Badge variant={insight.severity === "critical" ? "destructive" : "default"}>
                                    {insight.severity}
                                  </Badge>
                                  <Badge variant="outline">{insight.insight_type}</Badge>
                                  {insight.confidence_score && (
                                    <span className="text-xs text-gray-500">
                                      {Math.round(insight.confidence_score * 100)}% confidence
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">{insight.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {new Date(insight.generated_at).toLocaleDateString()}
                              </span>
                              <Button size="sm" onClick={() => markInsightAsRead(insight.id)}>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Mark as Read
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Read Insights */}
              {readInsights.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Previous Insights</h3>
                  {readInsights.map((insight) => (
                    <Card key={insight.id} className="opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${getSeverityColor(insight.severity)}`}>
                            {getSeverityIcon(insight.severity)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                            <span className="text-xs text-gray-500">
                              {new Date(insight.generated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Reminders Tab */}
        <TabsContent value="reminders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Health Reminders</CardTitle>
                  <CardDescription>Keep track of medications, appointments, and check-ups</CardDescription>
                </div>
                <Button onClick={() => setShowAddReminder(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reminder
                </Button>
              </div>
            </CardHeader>
          </Card>

          {reminders.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Bell className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No reminders set</h3>
                  <p className="text-gray-600 mb-6">Create reminders for medications, appointments, and check-ups</p>
                  <Button onClick={() => setShowAddReminder(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reminders.map((reminder) => {
                const dueDate = new Date(reminder.due_date)
                const today = new Date()
                const daysUntil = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                const isOverdue = daysUntil < 0
                const isDueSoon = daysUntil >= 0 && daysUntil <= 7

                return (
                  <Card key={reminder.id} className={isOverdue ? "border-l-4 border-l-red-600" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div
                            className={`p-3 rounded-lg ${isOverdue ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                          >
                            <Bell className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-900 mb-1">{reminder.title}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{reminder.reminder_type}</Badge>
                              {reminder.is_recurring && <Badge variant="secondary">Recurring</Badge>}
                              {isOverdue && <Badge variant="destructive">Overdue</Badge>}
                              {isDueSoon && !isOverdue && <Badge variant="default">Due Soon</Badge>}
                            </div>
                            {reminder.description && <p className="text-gray-700 mb-3">{reminder.description}</p>}
                            <p className="text-sm text-gray-600">
                              Due: {dueDate.toLocaleDateString()} {isOverdue && `(${Math.abs(daysUntil)} days overdue)`}
                              {isDueSoon && !isOverdue && `(in ${daysUntil} days)`}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => completeReminder(reminder.id)}
                          className="bg-transparent"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Complete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Reminder Dialog */}
      <AddReminderDialog
        open={showAddReminder}
        onOpenChange={setShowAddReminder}
        onReminderAdded={(newReminder) => {
          setReminders([newReminder, ...reminders])
          setShowAddReminder(false)
        }}
      />
    </div>
  )
}
