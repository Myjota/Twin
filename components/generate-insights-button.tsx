"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Brain, Loader2 } from "lucide-react"

interface GenerateInsightsButtonProps {
  userId: number
  onInsightsGenerated: (insights: any[]) => void
}

export function GenerateInsightsButton({ userId, onInsightsGenerated }: GenerateInsightsButtonProps) {
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const response = await fetch("/api/insights/generate", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        onInsightsGenerated(data.insights)
      }
    } catch (error) {
      console.error("[v0] Failed to generate insights:", error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <Button onClick={handleGenerate} disabled={generating}>
      {generating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Brain className="h-4 w-4 mr-2" />
          Generate Insights
        </>
      )}
    </Button>
  )
}
