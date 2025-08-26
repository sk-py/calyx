"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function HeroAbout() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const image1Ref = useRef<HTMLDivElement | null>(null)
  const image2Ref = useRef<HTMLDivElement | null>(null)

  // Helper function to assign refs to the array
  const addTextRef = (index: number) => (el: HTMLParagraphElement | null) => {
    textRefs.current[index] = el
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center", // Start animation when the top of the trigger hits the center of the viewport
        toggleActions: "play none none none", // Play once when entering the view
        // markers: true, // Uncomment for debugging ScrollTrigger
      },
    })

    // Animate "ABOUT" heading
    tl.fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })

    // Animate description text with stagger
    tl.fromTo(textRefs.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, "<0.3")

    // Animate images
    tl.fromTo(image1Ref.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "<0.2")
    tl.fromTo(image2Ref.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "<0.2")

    // Cleanup function for GSAP and ScrollTrigger
    return () => {
      tl.kill() // Kill the timeline
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()) // Kill all ScrollTrigger instances
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black p-8 md:p-16 lg:p-24 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 ref={headingRef} className="font-[doren] text-5xl md:text-6xl lg:text-7xl mb-12 tracking-tight">
          ABOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div ref={image1Ref} className="overflow-hidden rounded-lg shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Christian Dior adjusting a dress on a model"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex flex-col font-[poppins] tracking-tight gap-6 text-sm leading-relaxed">
            <p ref={addTextRef(0)}>
              Christian Dior, the founder of the fashion house, opened the first atelier in 1946 and then he did not
              even realize that in a year he would be one of the most influential fashion designers. He was particularly
              famous for creating a new style - New Look, which was designed to give women a new look.
            </p>
            <p ref={addTextRef(1)}>
              The brand produces clothes, accessories, perfume, watches, cosmetics and even mobile phones.
            </p>
         
          </div>
        </div>

        <div className="mt-7 md:mt-0 flex justify-end">
          <div ref={image2Ref} className="overflow-hidden rounded-lg shadow-xl w-full max-w-xs">
            <img
              src="https://images.unsplash.com/photo-1627933234009-0f5ce6eb4e3a?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Group of people at a fashion event"
              width={300}
              height={200}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
