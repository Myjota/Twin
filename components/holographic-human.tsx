"use client"

import Image from "next/image"

export function HolographicHuman() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative overflow-hidden">
      <Image
        src="/images/hologram.png"
        alt="Holographic Human"
        width={600}
        height={700}
        className="object-contain w-full h-full"
        priority
      />
    </div>
  )
}
