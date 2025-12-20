"use client"

import dynamic from "next/dynamic"

const HolographicHuman = dynamic(() => import("@/components/holographic-human").then((mod) => mod.HolographicHuman), {
  ssr: false,
})

export function HolographicHumanClient() {
  return <HolographicHuman />
}
