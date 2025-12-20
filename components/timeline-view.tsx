"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Calendar,
  Activity,
  AlertCircle,
  Stethoscope,
  Pill,
  TestTube,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface TimelineEvent {
  id: number
  event_type: string
  title: string
  description?: string
  event_date: string
  severity?: string
  document_type?: string
}

interface TimelineViewProps {
  events: TimelineEvent[]
}

export function TimelineView({ events }: TimelineViewProps) {
  const [filterType, setFilterType] = useState("all")
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set())

  const filteredEvents = events.filter((event) => {
    if (filterType === "all") return true
    return event.event_type === filterType || event.document_type === filterType
  })

  const toggleExpand = (eventId: number) => {
    const newExpanded = new Set(expandedEvents)
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId)
    } else {
      newExpanded.add(eventId)
    }
    setExpandedEvents(newExpanded)
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5" />
      case "diagnosis":
        return <Stethoscope className="h-5 w-5" />
      case "treatment":
        return <Activity className="h-5 w-5" />
      case "medication":
      case "prescription":
        return <Pill className="h-5 w-5" />
      case "test":
      case "lab_result":
        return <TestTube className="h-5 w-5" />
      case "symptom":
        return <AlertCircle className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const getEventColor = (type: string, severity?: string) => {
    if (severity === "critical") return "text-red-600 bg-red-100"
    if (severity === "high") return "text-orange-600 bg-orange-100"
    if (severity === "medium") return "text-amber-600 bg-amber-100"

    switch (type) {
      case "diagnosis":
        return "text-purple-600 bg-purple-100"
      case "treatment":
        return "text-blue-600 bg-blue-100"
      case "medication":
      case "prescription":
        return "text-green-600 bg-green-100"
      case "test":
      case "lab_result":
        return "text-cyan-600 bg-cyan-100"
      case "symptom":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const groupEventsByMonth = (events: TimelineEvent[]) => {
    const grouped: Record<string, TimelineEvent[]> = {}

    events.forEach((event) => {
      const date = new Date(event.event_date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const monthLabel = date.toLocaleDateString("en-US", { year: "numeric", month: "long" })

      if (!grouped[monthLabel]) {
        grouped[monthLabel] = []
      }
      grouped[monthLabel].push(event)
    })

    return grouped
  }

  const groupedEvents = groupEventsByMonth(filteredEvents)

  return (
    <div className="space-y-6">
      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filter by type:</label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All events" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="appointment">Appointments</SelectItem>
                <SelectItem value="diagnosis">Diagnoses</SelectItem>
                <SelectItem value="treatment">Treatments</SelectItem>
                <SelectItem value="prescription">Prescriptions</SelectItem>
                <SelectItem value="lab_result">Lab Results</SelectItem>
                <SelectItem value="symptom">Symptoms</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      {Object.keys(groupedEvents).length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                {filterType !== "all" ? "Try adjusting your filter" : "Start by uploading medical documents"}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <div key={month}>
              {/* Month Header */}
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900">{month}</h2>
                <div className="flex-1 h-px bg-gray-200" />
                <Badge variant="secondary">{monthEvents.length} events</Badge>
              </div>

              {/* Events */}
              <div className="relative pl-8 space-y-4">
                {/* Timeline Line */}
                <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-gray-200" />

                {monthEvents.map((event, index) => {
                  const isExpanded = expandedEvents.has(event.id)
                  const colorClass = getEventColor(event.event_type || event.document_type || "", event.severity)

                  return (
                    <div key={event.id} className="relative">
                      {/* Timeline Dot */}
                      <div
                        className={`absolute left-[-23px] top-6 h-4 w-4 rounded-full border-2 border-white ${colorClass}`}
                      />

                      {/* Event Card */}
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${colorClass}`}>
                                {getEventIcon(event.event_type || event.document_type || "")}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                                  {event.severity && (
                                    <Badge
                                      variant={
                                        event.severity === "critical"
                                          ? "destructive"
                                          : event.severity === "high"
                                            ? "default"
                                            : "secondary"
                                      }
                                    >
                                      {event.severity}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  {new Date(event.event_date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                                {event.description && (
                                  <p className={`text-sm text-gray-700 ${isExpanded ? "" : "line-clamp-2"}`}>
                                    {event.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            {event.description && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpand(event.id)}
                                className="shrink-0"
                              >
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
