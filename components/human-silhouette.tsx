"use client"

import { useEffect, useRef } from "react"

export function HumanSilhouette() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size for hologram
    const width = 400
    const height = 600
    canvas.width = width
    canvas.height = height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    const centerX = 200
    const scale = 1.2

    ctx.save()
    ctx.translate(centerX, height - 50)

    // Draw multiple concentric circles for platform effect
    for (let i = 5; i > 0; i--) {
      ctx.beginPath()
      ctx.arc(0, 0, 80 + i * 15, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 + i * 0.1})`
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Platform grid lines
    for (let angle = 0; angle < 360; angle += 30) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      const rad = (angle * Math.PI) / 180
      ctx.lineTo(Math.cos(rad) * 140, Math.sin(rad) * 140)
      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)"
      ctx.lineWidth = 1
      ctx.stroke()
    }

    ctx.restore()

    ctx.beginPath()

    // Head (ellipse)
    ctx.save()
    ctx.translate(centerX, 40 * scale)
    ctx.scale(1, 1.2)
    ctx.arc(0, 0, 25, 0, Math.PI * 2)
    ctx.restore()

    // Neck
    ctx.moveTo(centerX - 12, 70 * scale)
    ctx.lineTo(centerX - 12, 85 * scale)
    ctx.lineTo(centerX + 12, 85 * scale)
    ctx.lineTo(centerX + 12, 70 * scale)

    // Body outline - right side going down
    ctx.moveTo(centerX + 12, 85 * scale)
    ctx.bezierCurveTo(centerX + 35, 90 * scale, centerX + 48, 95 * scale, centerX + 52, 110 * scale)
    ctx.bezierCurveTo(centerX + 54, 130 * scale, centerX + 54, 150 * scale, centerX + 52, 170 * scale)
    ctx.bezierCurveTo(centerX + 51, 175 * scale, centerX + 50, 180 * scale, centerX + 50, 188 * scale)
    ctx.bezierCurveTo(centerX + 50, 205 * scale, centerX + 51, 220 * scale, centerX + 52, 235 * scale)
    ctx.bezierCurveTo(centerX + 52, 243 * scale, centerX + 50, 248 * scale, centerX + 46, 250 * scale)
    ctx.bezierCurveTo(centerX + 42, 251 * scale, centerX + 38, 250 * scale, centerX + 36, 247 * scale)
    ctx.bezierCurveTo(centerX + 38, 243 * scale, centerX + 40, 230 * scale, centerX + 42, 215 * scale)
    ctx.bezierCurveTo(centerX + 43, 200 * scale, centerX + 44, 185 * scale, centerX + 44, 173 * scale)
    ctx.bezierCurveTo(centerX + 44, 165 * scale, centerX + 43, 155 * scale, centerX + 42, 145 * scale)
    ctx.bezierCurveTo(centerX + 40, 130 * scale, centerX + 32, 120 * scale, centerX + 26, 113 * scale)
    ctx.bezierCurveTo(centerX + 24, 130 * scale, centerX + 22, 150 * scale, centerX + 20, 170 * scale)
    ctx.bezierCurveTo(centerX + 18, 190 * scale, centerX + 17, 205 * scale, centerX + 16, 220 * scale)
    ctx.bezierCurveTo(centerX + 16, 230 * scale, centerX + 18, 237 * scale, centerX + 20, 243 * scale)
    ctx.bezierCurveTo(centerX + 22, 270 * scale, centerX + 23, 295 * scale, centerX + 23, 320 * scale)
    ctx.bezierCurveTo(centerX + 23, 330 * scale, centerX + 22, 337 * scale, centerX + 22, 345 * scale)
    ctx.bezierCurveTo(centerX + 22, 370 * scale, centerX + 22, 395 * scale, centerX + 22, 420 * scale)
    ctx.bezierCurveTo(centerX + 22, 430 * scale, centerX + 20, 437 * scale, centerX + 16, 440 * scale)
    ctx.bezierCurveTo(centerX + 12, 442 * scale, centerX + 8, 441 * scale, centerX + 6, 438 * scale)
    ctx.lineTo(centerX + 6, 445 * scale)
    ctx.lineTo(centerX - 6, 445 * scale)

    // Left side going up
    ctx.bezierCurveTo(centerX - 8, 441 * scale, centerX - 12, 442 * scale, centerX - 16, 440 * scale)
    ctx.bezierCurveTo(centerX - 20, 437 * scale, centerX - 22, 430 * scale, centerX - 22, 420 * scale)
    ctx.bezierCurveTo(centerX - 22, 395 * scale, centerX - 22, 370 * scale, centerX - 22, 345 * scale)
    ctx.bezierCurveTo(centerX - 22, 337 * scale, centerX - 23, 330 * scale, centerX - 23, 320 * scale)
    ctx.bezierCurveTo(centerX - 23, 295 * scale, centerX - 22, 270 * scale, centerX - 20, 243 * scale)
    ctx.bezierCurveTo(centerX - 18, 237 * scale, centerX - 16, 230 * scale, centerX - 16, 220 * scale)
    ctx.bezierCurveTo(centerX - 17, 205 * scale, centerX - 18, 190 * scale, centerX - 20, 170 * scale)
    ctx.bezierCurveTo(centerX - 22, 150 * scale, centerX - 24, 130 * scale, centerX - 26, 113 * scale)
    ctx.bezierCurveTo(centerX - 32, 120 * scale, centerX - 40, 130 * scale, centerX - 42, 145 * scale)
    ctx.bezierCurveTo(centerX - 43, 155 * scale, centerX - 44, 165 * scale, centerX - 44, 173 * scale)
    ctx.bezierCurveTo(centerX - 44, 185 * scale, centerX - 43, 200 * scale, centerX - 42, 215 * scale)
    ctx.bezierCurveTo(centerX - 40, 230 * scale, centerX - 38, 243 * scale, centerX - 36, 247 * scale)
    ctx.bezierCurveTo(centerX - 38, 250 * scale, centerX - 42, 251 * scale, centerX - 46, 250 * scale)
    ctx.bezierCurveTo(centerX - 50, 248 * scale, centerX - 52, 243 * scale, centerX - 52, 235 * scale)
    ctx.bezierCurveTo(centerX - 51, 220 * scale, centerX - 50, 205 * scale, centerX - 50, 188 * scale)
    ctx.bezierCurveTo(centerX - 50, 180 * scale, centerX - 51, 175 * scale, centerX - 52, 170 * scale)
    ctx.bezierCurveTo(centerX - 54, 150 * scale, centerX - 54, 130 * scale, centerX - 52, 110 * scale)
    ctx.bezierCurveTo(centerX - 48, 95 * scale, centerX - 35, 90 * scale, centerX - 12, 85 * scale)

    ctx.closePath()

    const gradient = ctx.createLinearGradient(centerX - 60, 0, centerX + 60, height)
    gradient.addColorStop(0, "rgba(6, 182, 212, 0.6)")
    gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.8)")
    gradient.addColorStop(1, "rgba(6, 182, 212, 0.6)")
    ctx.fillStyle = gradient
    ctx.fill()

    // Bright cyan outline
    ctx.strokeStyle = "#06b6d4"
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.save()

    // Lungs
    ctx.fillStyle = "rgba(255, 120, 50, 0.7)"
    ctx.beginPath()
    // Right lung
    ctx.ellipse(centerX + 12, 110 * scale, 15, 25, 0, 0, Math.PI * 2)
    ctx.fill()
    // Left lung
    ctx.beginPath()
    ctx.ellipse(centerX - 12, 110 * scale, 15, 25, 0, 0, Math.PI * 2)
    ctx.fill()

    // Heart between lungs
    ctx.fillStyle = "rgba(255, 80, 80, 0.7)"
    ctx.beginPath()
    ctx.ellipse(centerX, 115 * scale, 8, 10, 0, 0, Math.PI * 2)
    ctx.fill()

    // Digestive system
    ctx.fillStyle = "rgba(255, 140, 60, 0.6)"
    ctx.beginPath()
    ctx.ellipse(centerX, 160 * scale, 18, 35, 0, 0, Math.PI * 2)
    ctx.fill()

    // Pelvis/hip area
    ctx.fillStyle = "rgba(255, 120, 50, 0.7)"
    ctx.beginPath()
    ctx.ellipse(centerX, 230 * scale, 22, 18, 0, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()

    ctx.strokeStyle = "rgba(6, 182, 212, 0.4)"
    ctx.lineWidth = 1.5

    // Chest structure
    ctx.beginPath()
    ctx.moveTo(centerX - 20, 105 * scale)
    ctx.quadraticCurveTo(centerX, 100 * scale, centerX + 20, 105 * scale)
    ctx.stroke()

    // Ribcage lines
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(centerX, (110 + i * 15) * scale, 18 - i * 2, Math.PI, 0)
      ctx.stroke()
    }

    // Ab muscles
    ctx.beginPath()
    ctx.moveTo(centerX - 14, 135 * scale)
    ctx.quadraticCurveTo(centerX, 133 * scale, centerX + 14, 135 * scale)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX - 14, 160 * scale)
    ctx.quadraticCurveTo(centerX, 158 * scale, centerX + 14, 160 * scale)
    ctx.stroke()

    // Center line
    ctx.beginPath()
    ctx.moveTo(centerX, 100 * scale)
    ctx.lineTo(centerX, 210 * scale)
    ctx.stroke()

    // Leg muscle definition
    ctx.beginPath()
    ctx.moveTo(centerX, 245 * scale)
    ctx.lineTo(centerX, 440 * scale)
    ctx.stroke()
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 40px rgba(6, 182, 212, 0.4))",
        }}
      />
    </div>
  )
}
