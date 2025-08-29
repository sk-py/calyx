import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SubHeading() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const addTextRef = (index: number) => (el: HTMLParagraphElement | null) =>
    (textRefs.current[index] = el);
  const addImageRef = (index: number) => (el: HTMLSpanElement | null) =>
    (imageRefs.current[index] = el);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const validTextRefs = textRefs.current.filter(Boolean);
    const validImageRefs = imageRefs.current.filter(Boolean);

    if (
      !containerRef.current ||
      (validTextRefs.length === 0 &&
        validImageRefs.length === 0 &&
        !videoRef.current)
    ) {
      console.warn(
        "GSAP targets or container are empty. Elements might not be rendered yet or refs are not set correctly."
      );
      return;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Start when top of section is 80% from top of viewport
        toggleActions: "play none none none",
      },
    });

    // Animate text lines
    tl.fromTo(
      validTextRefs,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.3 }
    );

    // Animate images with elegant slide-in
    tl.fromTo(
      validImageRefs[0], // First image (right)
      { xPercent: 100, opacity: 0, rotation: 5 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 1, ease: "power2.out" },
      "<0.4"
    );
    tl.fromTo(
      validImageRefs[1], // Second image (left)
      { xPercent: -100, opacity: 0, rotation: -5 },
      { xPercent: 0, opacity: 1, rotation: 0, duration: 1, ease: "power2.out" },
      "<0.3"
    );

    // Animate video with a subtle fade-in and scale
    tl.fromTo(
      videoRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
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
      className="flex flex-col w-screen items-center justify-center py-24 bg-black from-black via-slate-950 to-black text-white overflow-hidden"
    >
      <div className="mx-auto w-full text-center font-[Doren] px-4">
        <div className="relative flex flex-col items-center  space-y-6">
          {/* First text line */}
          {/* <p
            ref={addTextRef(0)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  uppercase tracking-widest text-gray-100"
          >
            WHERE EVERY DROP 
          </p> */}

          {/* Second text line with video */}
          <p
            ref={addTextRef(1)}
            className="text-4xl sm:text-5xl  md:text-6xl lg:text-[5.5rem]  uppercase tracking-normal text-gray-100 flex items-center justify-center space-x-4"
          >
            <span>WHERE EVERY</span>
            <span
              ref={videoRef}
              className="inline-block overflow-hidden rounded-full shadow-lg"
            >
              {/* <video
                autoPlay
                muted
                loop
                playsInline
                className="w-24 h-24 sm:w-60 sm:h-32 object-cover rounded-[30%] border-4 border-gray-800"
              >
                <source
                  src="https://m.media-amazon.com/images/I/515BMsZrVzL._SY350_PKmb-play-button-overlay_.jpg" // Replace with your mini video URL
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video> */}
              <img
                src="/assets/images/video-mock.jpg"
                className="w-24 h-24 sm:w-48 sm:h-20 object-cover rounded-[20%]"
              />
            </span>
            <span>DROP IS A</span>
          </p>

          {/* Third text line with first image */}
          <p
            ref={addTextRef(2)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  uppercase tracking-widest text-gray-100 flex items-center justify-center space-x-4"
          >
            <span>PORTAL</span>
            <span
              ref={addImageRef(0)}
              className="inline-block overflow-hidden rounded-t-full shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1588514912908-8f5891714f8d?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Luxury perfume bottle"
                width={160}
                height={160}
                className="object-cover w-24 h-24 sm:w-20 sm:h-20"
              />
            </span>
            <span>TO A HIDDEN</span>
            <span
              ref={addImageRef(1)}
              className="inline-block overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src="https://png.pngtree.com/png-vector/20250302/ourmid/pngtree-luxurious-perfume-bottle-with-elegant-design-png-image_15693185.png"
                alt="Elegant perfume bottle"
                width={180}
                height={180}
                className="object-cover rotate-12 w-24 h-24 sm:w-32 sm:h-32"
              />
            </span>
            <span>WORLD</span>
          </p>

          {/* Fourth text line with second image */}
          {/* <p
            ref={addTextRef(3)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  uppercase tracking-widest text-gray-100 flex items-center justify-center space-x-4"
          >
            <span>HIDDEN</span>
            <span
              ref={addImageRef(1)}
              className="inline-block overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src="https://png.pngtree.com/png-vector/20250302/ourmid/pngtree-luxurious-perfume-bottle-with-elegant-design-png-image_15693185.png"
                alt="Elegant perfume bottle"
                width={180}
                height={180}
                className="object-cover rotate-12 w-24 h-24 sm:w-32 sm:h-32"
              />
            </span>
            <span>WORLD</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}
