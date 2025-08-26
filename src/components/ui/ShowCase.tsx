"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ImageFrames() {
  const cardLeftRef = useRef<HTMLDivElement | null>(null)
  const cardRightRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animation for the left card
    if (cardLeftRef.current) {
      gsap.set(cardLeftRef.current, { rotationY: -90, opacity: 0 }) // Start more rotated and hidden
      ScrollTrigger.create({
        trigger: cardLeftRef.current,
        start: "top 80%", // When the top of the card is 80% down the viewport
        onEnter: () => {
          gsap.to(cardLeftRef.current, { rotationY: -20, opacity: 1, duration: 1, ease: "power3.out" }) // Animate to visible rotated state
        },
        onLeaveBack: () => {
          gsap.to(cardLeftRef.current, { rotationY: -90, opacity: 0, duration: 0.5, ease: "power3.in" }) // Animate back if scrolling up
        },
        // markers: true, // Uncomment for debugging ScrollTrigger
      })
    }

    // Animation for the right card
    if (cardRightRef.current) {
      gsap.set(cardRightRef.current, { rotationY: 90, opacity: 0 }) // Start more rotated and hidden
      ScrollTrigger.create({
        trigger: cardRightRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(cardRightRef.current, { rotationY: 20, opacity: 1, duration: 1, ease: "power3.out" }) // Animate to visible rotated state
        },
        onLeaveBack: () => {
          gsap.to(cardRightRef.current, { rotationY: 90, opacity: 0, duration: 0.5, ease: "power3.in" }) // Animate back if scrolling up
        },
        // markers: true, // Uncomment for debugging ScrollTrigger
      })
    }
  }, [])

  // Define frame dimensions
  const cardWidth = 250
  const cardHeight = 350
  const thinBorder = 15 // Thickness for top, left, right borders
  const thickBorder = 90 // Thickness for the bottom border

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section */}
      <div className="relative w-full md:w-1/2 h-[500px] md:h-screen overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1718733869597-efc93fac657d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Woman"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div
          ref={cardLeftRef}
          className="absolute"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Top Frame Bar */}
          <div className="absolute top-0 left-0 w-full bg-white" style={{ height: `${thinBorder}px` }} />
          {/* Bottom Frame Bar */}
          <div className="absolute bottom-0 left-0 w-full bg-white" style={{ height: `${thickBorder}px` }} />
          {/* Left Frame Bar */}
          <div
            className="absolute left-0 bg-white"
            style={{
              top: `${thinBorder}px`,
              width: `${thinBorder}px`,
              height: `calc(100% - ${thinBorder}px - ${thickBorder}px)`,
            }}
          />
          {/* Right Frame Bar */}
          <div
            className="absolute right-0 bg-white"
            style={{
              top: `${thinBorder}px`,
              width: `${thinBorder}px`,
              height: `calc(100% - ${thinBorder}px - ${thickBorder}px)`,
            }}
          />

 
          <button
            className="px-4 py-2 font-[Poppins] border border-black/50 text-gray-700 text-sm uppercase tracking-wider bg-white hover:bg-gray-100 transition-colors absolute"
            style={{
              bottom: `${thickBorder / 2 - 15}px`, // Position within the bottom thick border, adjusted for button height
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Discover
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative w-full md:w-1/2 h-[500px] md:h-screen overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Man"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div
          ref={cardRightRef}
          className="absolute"
          style={{
            width: `${cardWidth}px`,
            height: `${cardHeight}px`,
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Top Frame Bar */}
          <div className="absolute top-0 left-0 w-full bg-white" style={{ height: `${thinBorder}px` }} />
          {/* Bottom Frame Bar */}
          <div className="absolute bottom-0 left-0 w-full bg-white" style={{ height: `${thickBorder}px` }} />
          {/* Left Frame Bar */}
          <div
            className="absolute left-0 bg-white"
            style={{
              top: `${thinBorder}px`,
              width: `${thinBorder}px`,
              height: `calc(100% - ${thinBorder}px - ${thickBorder}px)`,
            }}
          />
          {/* Right Frame Bar */}
          <div
            className="absolute right-0 bg-white"
            style={{
              top: `${thinBorder}px`,
              width: `${thinBorder}px`,
              height: `calc(100% - ${thinBorder}px - ${thickBorder}px)`,
            }}
          />


          <button
            className="px-4 py-2 border border-black/50 font-[poppins] text-gray-700 text-sm uppercase tracking-wider bg-white hover:bg-gray-100 transition-colors absolute"
            style={{
              bottom: `${thickBorder / 2 - 15}px`, // Position within the bottom thick border, adjusted for button height
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Discover
          </button>
        </div>
      </div>
    </div>
  )
}
