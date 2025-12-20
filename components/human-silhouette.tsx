"use client"

import { useEffect, useRef } from "react"

export function HumanSilhouette() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const width = 200
    const height = 500
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    const centerX = 100

    // Create a path for the entire body silhouette
    ctx.beginPath()

    // Start from top of head
    ctx.moveTo(centerX, 10)

    // Head (right side going down)
    ctx.bezierCurveTo(centerX + 28, 15, centerX + 30, 25, centerX + 28, 40)
    ctx.bezierCurveTo(centerX + 28, 50, centerX + 26, 60, centerX + 22, 68)

    // Neck to right shoulder
    ctx.bezierCurveTo(centerX + 20, 75, centerX + 25, 82, centerX + 38, 95)

    // Right shoulder to arm
    ctx.bezierCurveTo(centerX + 45, 100, centerX + 50, 105, centerX + 52, 115)

    // Right upper arm
    ctx.bezierCurveTo(centerX + 54, 135, centerX + 54, 150, centerX + 52, 165)

    // Right elbow
    ctx.bezierCurveTo(centerX + 51, 172, centerX + 50, 178, centerX + 50, 185)

    // Right forearm
    ctx.bezierCurveTo(centerX + 50, 200, centerX + 51, 215, centerX + 52, 230)

    // Right hand
    ctx.bezierCurveTo(centerX + 52, 238, centerX + 50, 243, centerX + 46, 245)
    ctx.bezierCurveTo(centerX + 42, 246, centerX + 38, 245, centerX + 36, 242)

    // Back up right arm inner side
    ctx.bezierCurveTo(centerX + 38, 238, centerX + 40, 225, centerX + 42, 210)
    ctx.bezierCurveTo(centerX + 43, 195, centerX + 44, 180, centerX + 44, 168)

    // Right elbow inner
    ctx.bezierCurveTo(centerX + 44, 160, centerX + 43, 150, centerX + 42, 140)

    // Right armpit to torso
    ctx.bezierCurveTo(centerX + 40, 125, centerX + 32, 115, centerX + 26, 108)

    // Right torso side
    ctx.bezierCurveTo(centerX + 24, 125, centerX + 22, 145, centerX + 20, 165)
    ctx.bezierCurveTo(centerX + 18, 185, centerX + 17, 200, centerX + 16, 215)

    // Right hip
    ctx.bezierCurveTo(centerX + 16, 225, centerX + 18, 232, centerX + 20, 238)

    // Right thigh outer
    ctx.bezierCurveTo(centerX + 22, 265, centerX + 23, 290, centerX + 23, 315)

    // Right knee outer
    ctx.bezierCurveTo(centerX + 23, 325, centerX + 22, 332, centerX + 22, 340)

    // Right calf outer
    ctx.bezierCurveTo(centerX + 22, 365, centerX + 22, 390, centerX + 22, 415)

    // Right foot outer
    ctx.bezierCurveTo(centerX + 22, 425, centerX + 20, 432, centerX + 16, 435)
    ctx.bezierCurveTo(centerX + 12, 437, centerX + 8, 436, centerX + 6, 433)

    // Right foot bottom
    ctx.lineTo(centerX + 6, 440)
    ctx.lineTo(centerX - 6, 440)

    // Left foot outer
    ctx.bezierCurveTo(centerX - 8, 436, centerX - 12, 437, centerX - 16, 435)
    ctx.bezierCurveTo(centerX - 20, 432, centerX - 22, 425, centerX - 22, 415)

    // Left calf outer
    ctx.bezierCurveTo(centerX - 22, 390, centerX - 22, 365, centerX - 22, 340)

    // Left knee outer
    ctx.bezierCurveTo(centerX - 22, 332, centerX - 23, 325, centerX - 23, 315)

    // Left thigh outer
    ctx.bezierCurveTo(centerX - 23, 290, centerX - 22, 265, centerX - 20, 238)

    // Left hip
    ctx.bezierCurveTo(centerX - 18, 232, centerX - 16, 225, centerX - 16, 215)

    // Left torso side
    ctx.bezierCurveTo(centerX - 17, 200, centerX - 18, 185, centerX - 20, 165)
    ctx.bezierCurveTo(centerX - 22, 145, centerX - 24, 125, centerX - 26, 108)

    // Left armpit to torso
    ctx.bezierCurveTo(centerX - 32, 115, centerX - 40, 125, centerX - 42, 140)

    // Left elbow inner
    ctx.bezierCurveTo(centerX - 43, 150, centerX - 44, 160, centerX - 44, 168)

    // Left forearm inner
    ctx.bezierCurveTo(centerX - 44, 180, centerX - 43, 195, centerX - 42, 210)
    ctx.bezierCurveTo(centerX - 40, 225, centerX - 38, 238, centerX - 36, 242)

    // Left hand
    ctx.bezierCurveTo(centerX - 38, 245, centerX - 42, 246, centerX - 46, 245)
    ctx.bezierCurveTo(centerX - 50, 243, centerX - 52, 238, centerX - 52, 230)

    // Left forearm outer
    ctx.bezierCurveTo(centerX - 51, 215, centerX - 50, 200, centerX - 50, 185)

    // Left elbow
    ctx.bezierCurveTo(centerX - 50, 178, centerX - 51, 172, centerX - 52, 165)

    // Left upper arm
    ctx.bezierCurveTo(centerX - 54, 150, centerX - 54, 135, centerX - 52, 115)

    // Left shoulder to arm
    ctx.bezierCurveTo(centerX - 50, 105, centerX - 45, 100, centerX - 38, 95)

    // Left shoulder to neck
    ctx.bezierCurveTo(centerX - 25, 82, centerX - 20, 75, centerX - 22, 68)

    // Neck to head
    ctx.bezierCurveTo(centerX - 26, 60, centerX - 28, 50, centerX - 28, 40)
    ctx.bezierCurveTo(centerX - 30, 25, centerX - 28, 15, centerX, 10)

    ctx.closePath()

    // Fill the body with cyan color
    ctx.fillStyle = "rgba(6, 182, 212, 0.8)"
    ctx.fill()

    // Draw cyan outline/stroke
    ctx.strokeStyle = "#06b6d4"
    ctx.lineWidth = 2
    ctx.stroke()

    // Add some internal muscle definition lines
    ctx.strokeStyle = "rgba(6, 182, 212, 0.4)"
    ctx.lineWidth = 1.5

    // Chest muscles
    ctx.beginPath()
    ctx.moveTo(centerX - 18, 105)
    ctx.quadraticCurveTo(centerX, 100, centerX + 18, 105)
    ctx.stroke()

    // Abs
    ctx.beginPath()
    ctx.moveTo(centerX - 12, 130)
    ctx.quadraticCurveTo(centerX, 128, centerX + 12, 130)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX - 12, 155)
    ctx.quadraticCurveTo(centerX, 153, centerX + 12, 155)
    ctx.stroke()

    // Center line
    ctx.beginPath()
    ctx.moveTo(centerX, 95)
    ctx.lineTo(centerX, 200)
    ctx.stroke()
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-40 h-96 md:w-48 md:h-[450px]"
        style={{ filter: "drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))" }}
      />

      {/* Horizontal measurement lines */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-evenly pr-2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-0.5 w-8 bg-cyan-500" />
            <div className="w-1 h-1 rounded-full bg-cyan-500" />
          </div>
        ))}
      </div>
    </div>
  )
}
