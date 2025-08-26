"use client"

import { useState, useEffect } from "react"

export default function Component() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const totalDuration = 2000
    const startTime = Date.now()
    const endTime = startTime + totalDuration

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100)

      setProgress(newProgress)

      if (now < endTime) {
        requestAnimationFrame(updateProgress)
      } else {
        setProgress(100)
        setTimeout(() => setIsComplete(true), 300)
      }
    }

    requestAnimationFrame(updateProgress)

    return () => {
    
    }
  }, [])

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-700 opacity-0">
        <div className="text-white text-xl font-light tracking-wider">WELCOME</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center space-y-12 relative">
       
        <div className="space-y-4">
          <h1 className="text-5xl font-medium font-[Doren] text-white tracking-wide">Calyx</h1>
          <p className="text-white/60 text-sm tracking-[0.3em] font-light">PARFUM DE LUXE</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-6">
          <div className="relative h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-white transition-all duration-200 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
