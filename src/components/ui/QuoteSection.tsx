import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Component() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const authorRef = useRef<HTMLParagraphElement | null>(null);

  const addTextRef = (index: number) => (el: HTMLParagraphElement | null) => {
    textRefs.current[index] = el;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const validTextRefs = textRefs.current.filter(Boolean);
    const validImageRefs = imageRefs.current.filter(Boolean);

    if (
      !containerRef.current ||
      (validTextRefs.length === 0 && validImageRefs.length === 0 && !authorRef.current)
    ) {
      console.warn(
        "GSAP targets or container are empty. Elements might not be rendered yet or refs are not set correctly."
      );
      return;
    }

    const isMobile = window.innerWidth < 640; // Detect mobile screens

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: isMobile ? "top 85%" : "top center", // Adjust trigger for mobile
        toggleActions: "play none none none",
      },
    });

    // Animate text lines
    tl.fromTo(
      validTextRefs,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.7 : 1,
        stagger: isMobile ? 0.15 : 0.2,
      }
    );

    // Animate images with full motion on desktop, reduced on mobile
    tl.fromTo(
      validImageRefs[0], // Image 1 (right)
      { xPercent: 100, opacity: 0, rotation: 10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: isMobile ? 0.6 : 0.9 },
      "<0.3"
    );
    tl.fromTo(
      validImageRefs[1], // Image 2 (left)
      { xPercent: -100, opacity: 0, rotation: -10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: isMobile ? 0.6 : 0.9 },
      "<0.2"
    );
    tl.fromTo(
      validImageRefs[2], // Image 3 (left)
      { xPercent: -100, opacity: 0, rotation: -10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: isMobile ? 0.6 : 0.9 },
      "<0.2"
    );
    tl.fromTo(
      validImageRefs[3], // Image 4 (right)
      { xPercent: 100, opacity: 0, rotation: 10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: isMobile ? 0.6 : 0.9 },
      "<"
    );
    tl.fromTo(
      validImageRefs[4], // Image 5 (right)
      { xPercent: 100, opacity: 0, rotation: 10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: isMobile ? 0.6 : 0.9 },
      "<0.2"
    );
    tl.fromTo(
      validImageRefs[5], // Image 6 (left)
      { xPercent: -100, opacity: 0, rotation: -10 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: isMobile ? 0.6 : 0.9 },
      "<0.2"
    );

    // Animate author text
    tl.fromTo(
      authorRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: isMobile ? 0.7 : 1 },
      "<0.5"
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col font-[Doren] items-center justify-center max-sm:min-h-[70vh] min-h-screen py-20 bg-gradient-to-br from-gray-950 to-black text-white p-4 sm:p-6"
    >
      <div className="max-w-6xl mx-auto text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-tight tracking-normal text-center uppercase">
        <p ref={addTextRef(0)} className="mb-2 sm:mb-4">
          “ We don’t just craft fragrances, we
        </p>
        <p ref={addTextRef(1)} className="mb-2 sm:mb-4 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          believe a perfume is a time capsule
        </p>
        <p ref={addTextRef(2)} className="mb-2 sm:mb-4">
          of the soul—holding laughter, love,
        </p>
        <p ref={addTextRef(3)} className="mb-2 sm:mb-4 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          and fleeting moments within. Calyx
        </p>
        <p ref={addTextRef(4)} className="mb-2 sm:mb-4 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          Perfumes creates fragrances that
        </p>
        <p ref={addTextRef(5)} className="mb-2 sm:mb-4 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          lives in memory, long after
        </p>
        <p ref={addTextRef(6)} className="mb-2 sm:mb-4 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          the scent fades.”
        </p>
      </div>
      <p
        ref={authorRef}
        className="mt-8 sm:mt-10 md:mt-12 text-lg sm:text-xl md:text-2xl italic text-gray-300"
      >
        - Team Calyx
      </p>
    </div>
  );
}