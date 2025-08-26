"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger" // Import ScrollTrigger

export default function Component() {
  const containerRef = useRef<HTMLDivElement | null>(null) // Ref for the main container
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const imageRefs = useRef<(HTMLSpanElement | null)[]>([])
  const authorRef = useRef<HTMLParagraphElement | null>(null)

  // Helper function to assign refs to the array
  const addTextRef = (index: number) => (el: HTMLParagraphElement | null) => {
    textRefs.current[index] = el
  }

  const addImageRef = (index: number) => (el: HTMLSpanElement | null) => {
    imageRefs.current[index] = el
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger) // Register ScrollTrigger plugin

    // Filter out any nulls in case some refs aren't set for some reason
    const validTextRefs = textRefs.current.filter(Boolean)
    const validImageRefs = imageRefs.current.filter(Boolean)

    if (!containerRef.current || (validTextRefs.length === 0 && validImageRefs.length === 0 && !authorRef.current)) {
      console.warn(
        "GSAP targets or container are empty. Elements might not be rendered yet or refs are not set correctly.",
      )
      return // Exit if no elements to animate
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center", // Start animation when the top of the trigger hits the center of the viewport
        toggleActions: "play none none none", // Play once when entering the view
        // markers: true, // Uncomment for debugging ScrollTrigger
      },
    })

    // Animate text lines
    tl.fromTo(validTextRefs, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 })

    // Animate images sliding in from left/right with a slight rotation
    // Image 1 (right)
    tl.fromTo(
      validImageRefs[0],
      { xPercent: 100, opacity: 0, rotation: 10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 0.9 },
      "<0.3",
    )
    // Image 2 (left)
    tl.fromTo(
      validImageRefs[1],
      { xPercent: -100, opacity: 0, rotation: -10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 0.9 },
      "<0.2",
    )
    // Image 3 (left)
    tl.fromTo(
      validImageRefs[2],
      { xPercent: -100, opacity: 0, rotation: -10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 0.9 },
      "<0.2",
    )
    // Image 4 (right)
    tl.fromTo(
      validImageRefs[3],
      { xPercent: 100, opacity: 0, rotation: 10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 0.9 },
      "<",
    )
    // Image 5 (right)
    tl.fromTo(
      validImageRefs[4],
      { xPercent: 100, opacity: 0, rotation: 10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 0.9 },
      "<0.2",
    )
    // Image 6 (left)
    tl.fromTo(
      validImageRefs[5],
      { xPercent: -100, opacity: 0, rotation: -10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 0.9 },
      "<0.2",
    )

    // Animate author text
    tl.fromTo(authorRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<0.5")

    // Cleanup function for GSAP and ScrollTrigger
    return () => {
      tl.kill() // Kill the timeline
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()) // Kill all ScrollTrigger instances
    }
  }, [])

  return (
    <div
      ref={containerRef} // Assign the container ref
      className={` flex flex-col font-[Doren] items-center justify-center min-h-screen py-20 bg-gradient-to-br from-gray-950 to-black text-white p-4`}
    >
      <div className="max-w-5xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-normal">
        <p ref={addTextRef(0)} className="mb-4">
          {'“ At Calyx Perfumes, we don’t just'}
        </p>
        <p ref={addTextRef(1)} className="mb-4 flex items-center justify-center flex-wrap">
          {"craft fragrances, We believe a"}
          {/* <span ref={addImageRef(0)} className="inline-block mx-2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Gentleman Givenchy perfume bottle on driftwood"
              width={180}
              height={60}
              className="object-cover h-[60px] w-[180px]"
            />
          </span> */}
        </p>
        <p ref={addTextRef(2)} className="mb-4">
          {"perfume is a time capsule of the soul"}
        </p>
        <p ref={addTextRef(3)} className="mb-4 flex items-center justify-center flex-wrap">
          {/* <span ref={addImageRef(1)} className="inline-block mx-2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hand holding elegant perfume bottle"
              width={150}
              height={60}
              className="object-cover h-[60px] w-[150px]"
            />
          </span> */}
          {"— holding laughter, love, and fleeting"}
        </p>
        <p ref={addTextRef(4)} className="mb-4 flex items-center justify-center flex-wrap">
          {/* <span ref={addImageRef(2)} className="inline-block mx-2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1695048401313-d7153c37d6ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Minimalist perfume bottle on light surface"
              width={200}
              height={60}
              className="object-cover h-[60px] w-[200px]"
            />
          </span> */}
          {/* <span ref={addImageRef(3)} className="inline-block mx-2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Gentleman Givenchy perfume bottle on driftwood"
              width={100}
              height={60}
              className="object-cover h-[60px] w-[100px]"
            />
          </span> */}
          {/* {" REMAIN"} */}
        </p>
        <p ref={addTextRef(5)} className="mb-4 flex items-center justify-center flex-wrap">
          {"moments within. Calyx Perfumes"}
          {/* <span ref={addImageRef(4)} className="inline-block mx-2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hand holding elegant perfume bottle"
              width={160}
              height={60}
              className="object-cover h-[60px] w-[160px]"
            />
          </span> */}
        </p>
        <p ref={addTextRef(6)} className="mb-4 flex items-center justify-center flex-wrap">
          {/* <span ref={addImageRef(5)} className="inline-block mx-2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1695048401313-d7153c37d6ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Minimalist perfume bottle on light surface"
              width={220}
              height={60}
              className="object-cover h-[60px] w-[220px]"
            />
          </span> */}
          {'creates fragrances that live in '}
        </p>
        <p ref={addTextRef(7)} className="mb-4 flex items-center justify-center flex-wrap">
          {'memory, long after the scent fades.”'}
        </p>
      </div>
      <p ref={authorRef} className={` mt-12 text-xl md:text-2xl italic text-gray-300`}>
        - Team Calyx
      </p>
    </div>
  )
}
