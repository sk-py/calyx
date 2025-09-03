// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { Link } from "react-router-dom";

// // Register the GSAP plugin
// gsap.registerPlugin(ScrollTrigger);

// interface ContentSection {
//   heading: string;
//   description: string;
//   image: string;
//   imageAlt: string;
// }

// export default function ScrollGiftSections() {
//   const containerRef = useRef<HTMLDivElement | null>(null);

//   // Refs for the desktop animation
//   const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
//   const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

//   // Ref for the mobile animation panels container
//   const panelsContainerRef = useRef<HTMLDivElement | null>(null);

//   const contentSections: ContentSection[] = [
//     {
//       heading: "CRAFTED TO LAST",
//       description:
//         "With up to 95% of concentration, Capri perfumes are built for projection and longevity — lasting 8-12 hours to accompany you through every moment.",
//       image: "/assets/all_images/Villian 2.png",
//       imageAlt: "Luxury perfume bottle",
//     },
//     {
//       heading: "LUXURY, REDEFINED",
//       description:
//         "Every Capri creation is more than a perfume — it's a statement. Closest to making a memory, carrying you back to those worth reliving.",
//       image: "/assets/all_images/timeless 1.2.png",
//       imageAlt: "Elegant perfume gift box",
//     },
//     {
//       heading: "A SCENT YOU'LL KNOW INSTANTLY",
//       description:
//         "Our Scent DNA achieves up to 90-95% concentration and similarity of world-renowned perfumes, captured with precision.",
//       image: "/assets/all_images/ONYX 2.png",
//       imageAlt: "Premium perfume collection",
//     },
//   ];

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const mm = gsap.matchMedia();

//       // --- DESKTOP ANIMATION (min-width: 768px) ---
//       mm.add("(min-width: 768px)", () => {
//         // ... (The desktop animation code is unchanged and correct)
//         const headings = headingRefs.current.filter(Boolean);
//         const descriptions = descriptionRefs.current.filter(Boolean);
//         const images = imageRefs.current.filter(Boolean);

//         if (
//           headings.length === 0 ||
//           descriptions.length === 0 ||
//           images.length === 0
//         )
//           return;

//         gsap.set(headings[0], { opacity: 1 });
//         gsap.set(descriptions[0], { opacity: 1 });
//         gsap.set(images[0], { clipPath: "inset(0% 0% 0% 0%)" });

//         gsap.set(headings.slice(1), { opacity: 0 });
//         gsap.set(descriptions.slice(1), { opacity: 0 });
//         gsap.set(images.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

//         const mainTl = gsap.timeline({
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top top",
//             end: "bottom bottom",
//             scrub: 3,
//             pin: true,
//             anticipatePin: 1,
//           },
//         });

//         contentSections.forEach((_, index) => {
//           if (index === 0) return;

//           const prevIndex = index - 1;
//           const sectionStart = index * 0.4;
//           const transitionDuration = 0.15;

//           mainTl.to(
//             [headings[prevIndex], descriptions[prevIndex]],
//             {
//               opacity: 0,
//               duration: transitionDuration,
//               ease: "power2.inOut",
//             },
//             sectionStart - transitionDuration
//           );

//           mainTl.to(
//             [headings[index], descriptions[index]],
//             {
//               opacity: 1,
//               duration: transitionDuration,
//               ease: "power2.inOut",
//             },
//             sectionStart
//           );

//           mainTl.to(
//             images[index],
//             {
//               clipPath: "inset(0% 0% 0% 0%)",
//               duration: 0.25,
//               ease: "power2.out",
//             },
//             sectionStart - 0.05
//           );
//         });
//       });

//       // --- MOBILE & TABLET ANIMATION (max-width: 767px) ---
//       mm.add("(max-width: 767px)", () => {
//         const panels = gsap.utils.toArray(".panel-mobile");
//         if (!panels.length || !panelsContainerRef.current) return;

//         // ScrollTrigger.normalizeScroll(true);

//         gsap.set(panelsContainerRef.current, {
//           width: `${panels.length * 100}vw`,
//         });

//         gsap.to(panels, {
//           xPercent: -100 * (panels.length - 1),
//           ease: "power1.out",
//           scrollTrigger: {
//             trigger: containerRef.current,
//             pin: true,
//             scrub: 2,
//             snap: {
//               snapTo: 1 / (panels.length - 1), // Snap to each panel
//               duration: 0.5, // Smooth snapping transition
//               ease: "power2.inOut", // Easing for snapping
//             },
//             start: "top top+=4%", // Add slight offset to ensure timely pinning
//             end: () => {
//               // Calculate exact scroll distance for horizontal panels
//               return `+=${(panels.length - 1) * window.innerWidth}`;
//             },
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//             // Ensure pinning stops cleanly
//             pinSpacing: false, // Prevent extra space from pinning
//           },
//         });

//         // Refresh ScrollTrigger on viewport changes
//         window.addEventListener("resize", () => ScrollTrigger.refresh());
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [contentSections.length]);

//   return (
//     <div
//       ref={containerRef}
//       // ✅ CORRECTED: Height is now responsive. Auto on mobile, 500vh on desktop.
//       className="relative w-full md:h-[500vh] bg-black text-white overflow-hidden"
//     >
//       <div className="sticky top-0 w-full h-screen overflow-hidden">
//         {/* --- DESKTOP LAYOUT --- */}
//         <div className="hidden md:flex flex-col md:flex-row items-stretch justify-center w-full mx-auto h-full">
//           {/* ... (rest of the desktop JSX is unchanged) ... */}
//           <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 mb-12 md:mb-0 md:pr-12 relative justify-center">
//             {contentSections.map((section, index) => (
//               <div
//                 key={`desktop-text-${index}`}
//                 className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center"
//               >
//                 <div
//                   ref={(el) => (headingRefs.current[index] = el)}
//                   className="mb-6"
//                 >
//                   <h1 className="text-4xl md:text-6xl text-white lg:text-7xl font-[Doren] leading-tight">
//                     {section.heading.split(" ").map((word, wordIndex) => (
//                       <span key={wordIndex} className="inline-block mr-3">
//                         {word}
//                       </span>
//                     ))}
//                   </h1>
//                 </div>
//                 <p
//                   ref={(el) => (descriptionRefs.current[index] = el)}
//                   className="text-sm md:text-base max-w-md mb-20 min-h-fit text-white leading-relaxed"
//                 >
//                   {section.description}
//                 </p>
//                 {index === 0 && (
//                   <button className="px-8 z-10 py-3 border duration-300 hover:text-black border-white text-white text-sm cursor-pointer uppercase tracking-wider hover:bg-white transition-colors w-fit">
//                     Discover
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="relative w-full md:w-1/2 h-full">
//             <div className="relative h-full w-full overflow-hidden shadow-2xl">
//               {contentSections.map((section, index) => (
//                 <img
//                   key={`desktop-image-${index}`}
//                   ref={(el) => (imageRefs.current[index] = el)}
//                   src={section.image || "/placeholder.svg"}
//                   alt={section.imageAlt}
//                   className="absolute inset-0 w-full h-full object-cover object-center"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* --- MOBILE LAYOUT --- */}
//         <div className="md:hidden bg-black w-full h-full">
//           {/* ... (rest of the mobile JSX is unchanged) ... */}
//           <div ref={panelsContainerRef} className="flex bg-black h-full w-max">
//             {contentSections.map((section, index) => (
//               <div
//                 key={`mobile-panel-${index}`}
//                 className="panel-mobile w-screen h-screen bg-black flex flex-col items-center justify-center p-6 text-center"
//               >
//                 <div className="w-full h-1/2 mb-6">
//                   <img
//                     src={section.image}
//                     alt={section.imageAlt}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>
//                 <div className="w-full h-1/2 flex flex-col items-center justify-start">
//                   <h1 className="text-4xl font-[Doren] mb-4">
//                     {section.heading}
//                   </h1>
//                   <p className="text-sm max-w-sm leading-relaxed mb-8">
//                     {section.description}
//                   </p>

//                   <Link to={"/product"} className="px-8 py-3 border border-white text-white text-sm uppercase tracking-wider w-fit">
//                     Discover
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Add useLocation
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

interface ContentSection {
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
}

export default function ScrollGiftSections() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const panelsContainerRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation(); // Track route changes

  const contentSections: ContentSection[] = [
    {
      heading: "CRAFTED TO LAST",
      description:
        "With up to 95% of concentration, Capri perfumes are built for projection and longevity — lasting 8-12 hours to accompany you through every moment.",
      image: "/assets/all_images/Villian 2.png",
      imageAlt: "Luxury perfume bottle",
    },
    {
      heading: "LUXURY, REDEFINED",
      description:
        "Every Capri creation is more than a perfume — it's a statement. Closest to making a memory, carrying you back to those worth reliving.",
      image: "/assets/all_images/timeless 1.2.png",
      imageAlt: "Elegant perfume gift box",
    },
    {
      heading: "A SCENT YOU'LL KNOW INSTANTLY",
      description:
        "Our Scent DNA achieves up to 90-95% concentration and similarity of world-renowned perfumes, captured with precision.",
      image: "/assets/all_images/ONYX 2.png",
      imageAlt: "Premium perfume collection",
    },
  ];

  useEffect(() => {
    // Debounce function for ScrollTrigger refresh
    let refreshTimeout: NodeJS.Timeout;
    const debounceRefresh = () => {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh(true); // Force recalculation
      }, 100);
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION (unchanged) ---
      mm.add("(min-width: 768px)", () => {
        const headings = headingRefs.current.filter(Boolean);
        const descriptions = descriptionRefs.current.filter(Boolean);
        const images = imageRefs.current.filter(Boolean);

        if (
          headings.length === 0 ||
          descriptions.length === 0 ||
          images.length === 0
        )
          return;

        gsap.set(headings[0], { opacity: 1 });
        gsap.set(descriptions[0], { opacity: 1 });
        gsap.set(images[0], { clipPath: "inset(0% 0% 0% 0%)" });

        gsap.set(headings.slice(1), { opacity: 0 });
        gsap.set(descriptions.slice(1), { opacity: 0 });
        gsap.set(images.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 3,
            pin: true,
            anticipatePin: 1,
          },
        });

        contentSections.forEach((_, index) => {
          if (index === 0) return;

          const prevIndex = index - 1;
          const sectionStart = index * 0.4;
          const transitionDuration = 0.15;

          mainTl.to(
            [headings[prevIndex], descriptions[prevIndex]],
            {
              opacity: 0,
              duration: transitionDuration,
              ease: "power2.inOut",
            },
            sectionStart - transitionDuration
          );

          mainTl.to(
            [headings[index], descriptions[index]],
            {
              opacity: 1,
              duration: transitionDuration,
              ease: "power2.inOut",
            },
            sectionStart
          );

          mainTl.to(
            images[index],
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.25,
              ease: "power2.out",
            },
            sectionStart - 0.05
          );
        });
      });

      // --- MOBILE & TABLET ANIMATION ---
      mm.add("(max-width: 767px)", () => {
        const panels = gsap.utils.toArray(".panel-mobile");
        if (!panels.length || !panelsContainerRef.current) return;

        gsap.set(panelsContainerRef.current, {
          width: `${panels.length * 100}vw`,
        });

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 2,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 0.5,
              ease: "power2.inOut",
            },
            start: "top top+=4%",
            end: () => `+=${(panels.length - 1) * window.innerWidth}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinSpacing: false,
          },
        });
      });
    }, containerRef);

    // Handle popstate for swipe-back navigation
    window.addEventListener("popstate", debounceRefresh);

    // Handle resize and orientation changes
    window.addEventListener("resize", debounceRefresh);
    window.addEventListener("orientationchange", debounceRefresh);

    // Refresh ScrollTrigger after a slight delay to ensure DOM is ready
    debounceRefresh();

    return () => {
      // Cleanup event listeners and GSAP context
      window.removeEventListener("popstate", debounceRefresh);
      window.removeEventListener("resize", debounceRefresh);
      window.removeEventListener("orientationchange", debounceRefresh);
      ctx.revert();
    };
  }, [contentSections.length, location]); // Add location to dependencies

  return (
    <div
      ref={containerRef}
      className="relative w-full md:h-[500vh] bg-black text-white overflow-hidden"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden md:flex flex-col md:flex-row items-stretch justify-center w-full mx-auto h-full">
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 mb-12 md:mb-0 md:pr-12 relative justify-center">
            {contentSections.map((section, index) => (
              <div
                key={`desktop-text-${index}`}
                className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center"
              >
                <div
                  ref={(el) => (headingRefs.current[index] = el)}
                  className="mb-6"
                >
                  <h1 className="text-4xl md:text-6xl text-white lg:text-7xl font-[Doren] leading-tight">
                    {section.heading.split(" ").map((word, wordIndex) => (
                      <span key={wordIndex} className="inline-block mr-3">
                        {word}
                      </span>
                    ))}
                  </h1>
                </div>
                <p
                  ref={(el) => (descriptionRefs.current[index] = el)}
                  className="text-sm md:text-base max-w-md mb-20 min-h-fit text-white leading-relaxed"
                >
                  {section.description}
                </p>
                {index === 0 && (
                  <Link
                    to="/product"
                    className="px-8 z-10 py-3 border duration-300 hover:text-black border-white text-white text-sm cursor-pointer uppercase tracking-wider hover:bg-white transition-colors w-fit"
                  >
                    Discover
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="relative w-full md:w-1/2 h-full">
            <div className="relative h-full w-full overflow-hidden shadow-2xl">
              {contentSections.map((section, index) => (
                <img
                  key={`desktop-image-${index}`}
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={section.image || "/placeholder.svg"}
                  alt={section.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- MOBILE LAYOUT --- */}
        <div className="md:hidden bg-black w-full h-full">
          <div ref={panelsContainerRef} className="flex bg-black h-full w-max">
            {contentSections.map((section, index) => (
              <div
                key={`mobile-panel-${index}`}
                className="panel-mobile w-screen h-screen bg-black flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-full h-1/2 mb-6">
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="w-full h-1/2 flex flex-col items-center justify-start">
                  <h1 className="text-4xl font-[Doren] mb-4">
                    {section.heading}
                  </h1>
                  <p className="text-sm max-w-sm leading-relaxed mb-8">
                    {section.description}
                  </p>
                  <Link
                    to="/product"
                    className="px-8 py-3 border border-white text-white text-sm uppercase tracking-wider w-fit"
                  >
                    Discover
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}