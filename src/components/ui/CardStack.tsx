// import { useEffect, useRef, useState } from "react";

// // Dummy images using placeholder services
// const images = [
//   "/assets/all_images/Azure 2.png",
//   "/assets/all_images/Crimson Oud.png",
//   "/assets/all_images/Deception.png",
//   "/assets/all_images/SCARLET.1.png",
//   "/assets/all_images/Pulse.png",
//   "/assets/all_images/Crimson Oud.png",
//   "/assets/all_images/timeless intense.png",
//   "/assets/all_images/ONYX.png",
//   "/assets/all_images/timeless 1.png",
//   "/assets/all_images/Villian.png",
//   "/assets/all_images/Deception.png",
//   "/assets/all_images/ONYX.png",
// ];

// export default function GraphicGallery() {
//   const galleryRef = useRef(null);
//   const [scrollY, setScrollY] = useState(0);
//   const [windowHeight, setWindowHeight] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 1024); 
//     };

//     const handleScroll = () => {
//       if (galleryRef.current && !isMobile) {
//         const rect = galleryRef.current.getBoundingClientRect();
//         const scrollProgress = Math.max(
//           0,
//           Math.min(
//             1,
//             (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
//           )
//         );
//         setScrollY(scrollProgress);
//       }
//     };

//     const handleResize = () => {
//       setWindowHeight(window.innerHeight);
//       checkMobile();
//     };

//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [isMobile]);

//   // Calculate parallax offsets for desktop - adjusted for 4 columns
//   const y1 = scrollY * windowHeight * 2;
//   const y2 = scrollY * windowHeight * 3.5;
//   const y3 = scrollY * windowHeight * 1.5;
//   const y4 = scrollY * windowHeight * 2.8;

//   if (isMobile) {
//     return <MobileGallery images={images} />;
//   }

//   return (
//     <div className="">
//       {/* Top spacer */}
//       <div className="my-10 flex justify-center items-center px-4">
//         <h2 className="font-semibold text-3xl font-[Doren] sm:text-4xl md:text-5xl lg:text-6xl text-center capitalize">
//          Our Best Sellers
//         </h2>
//       </div>

//       {/* Desktop Gallery - Now with 4 columns */}
//       <div ref={galleryRef} className="h-[175vh] overflow-hidden">
//         <div className="relative -top-[12.5vh] h-[200vh] flex gap-[1.5vw] p-[1.5vw]">
//           <Column
//             images={[images[0], images[1], images[2]]}
//             yOffset={y1}
//             topOffset="-top-[20%]"
//           />
//           <Column
//             images={[images[3], images[4], images[5]]}
//             yOffset={y2}
//             topOffset="-top-[60%]"
//           />
//           <Column
//             images={[images[6], images[7], images[8]]}
//             yOffset={y3}
//             topOffset="-top-[10%]"
//           />
//           <Column
//             images={[images[9], images[10], images[11]]}
//             yOffset={y4}
//             topOffset="-top-[50%]"
//           />
//         </div>
//       </div>

//       {/* Bottom spacer */}
//       <div className="h-[20vh]"></div>
//     </div>
//   );
// }

// const Column = ({ images, yOffset, topOffset }) => {
//   return (
//     <div
//       className={`relative h-full w-1/4 min-w-[200px] flex flex-col gap-[2vw] whitespace-nowrap ${topOffset}`}
//       style={{
//         transform: `translateY(${yOffset}px)`,
//       }}
//     >
//       {images.map((src, i) => (
//         <div
//           key={i}
//           className="relative h-1/3 w-full rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
//         >
//           <img
//             src={src}
//             alt={`Gallery image ${i + 1}`}
//             className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//             loading="lazy"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const MobileGallery = ({ images }) => {
//   return (
//     <div className="w-full">
//       {/* Top spacer */}
//       <div className="mt-7 mb-4 sm:my-8 md:my-10 flex justify-center items-center px-4">
//         <h2 className="font-semibold font-[Doren] text-3xl sm:text-4xl md:text-5xl text-center capitalize">
//          Our Best Sellers
//         </h2>
//       </div>

//       {/* Mobile Horizontal Scroll Gallery */}
//       <div className="w-full overflow-hidden">
//         {/* First Row - Left to Right */}
//         <div
//           className="flex gap-3 sm:gap-4 p-4 overflow-x-auto scrollbar-hide animate-scroll-left"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//             WebkitScrollbar: { display: "none" },
//           }}
//         >
//           {images.slice(0, 4).map((src, i) => (
//             <MobileImageCard
//               key={`row1-${i}`}
//               src={src}
//               index={i}
//               alt={`Gallery image ${i + 1}`}
//             />
//           ))}
//         </div>

//         {/* Second Row - Right to Left */}
//         <div className="flex gap-3 sm:gap-4 p-4 overflow-x-auto scrollbar-hide direction-rtl animate-scroll-right">
//           {images.slice(4, 8).map((src, i) => (
//             <MobileImageCard
//               key={`row2-${i}`}
//               src={src}
//               index={i}
//               alt={`Gallery image ${i + 5}`}
//               reverse={true}
//             />
//           ))}
//         </div>

//         {/* Third Row - Left to Right */}
//         <div className="flex gap-3 sm:gap-4 p-4 overflow-x-auto scrollbar-hide animate-scroll-left">
//           {images.slice(8, 12).map((src, i) => (
//             <MobileImageCard
//               key={`row3-${i}`}
//               src={src}
//               index={i}
//               alt={`Gallery image ${i + 9}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Stacked Grid for Tablet Portrait */}
//       <div className="hidden sm:block md:hidden px-4 pb-8">
//         <div className="grid grid-cols-2 gap-4">
//           {images.slice(0, 8).map((src, i) => (
//             <div
//               key={`tablet-${i}`}
//               className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
//             >
//               <img
//                 src={src}
//                 alt={`Gallery image ${i + 1}`}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom spacer */}
//       <div className="h-8 sm:h-12 md:h-16"></div>
//     </div>
//   );
// };

// const MobileImageCard = ({ src, index, alt, reverse = false }) => {
//   return (
//     <div
//       className={`relative flex-shrink-0 w-[280px] sm:w-[320px] h-[200px] sm:h-[240px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
//     >
//       <img
//         src={src}
//         alt={alt}
//         className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//         loading="lazy"
//       />
//     </div>
//   );
// };


import { useEffect, useRef, useState, useCallback } from "react";

const images = [
  "/assets/all_images/Azure 2.png",
  "/assets/all_images/Crimson Oud.png",
  "/assets/all_images/Deception.png",
  "/assets/all_images/SCARLET.1.png",
  "/assets/all_images/Pulse.png",
  "/assets/all_images/Crimson Oud.png",
  "/assets/all_images/Timeless intense.png",
  "/assets/all_images/ONYX.png",
  "/assets/all_images/timeless 1.png",
  "/assets/all_images/Villian.png",
  "/assets/all_images/Deception.png",
  "/assets/all_images/ONYX.png",
];

export default function GraphicGallery() {
  const galleryRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = useCallback(() => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
        )
      );
      setScrollY(scrollProgress);
    }
  }, []);

  const handleResize = useCallback(() => {
    setWindowHeight(window.innerHeight);
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  // Calculate parallax offsets for desktop
  const y1 = scrollY * windowHeight * 2;
  const y2 = scrollY * windowHeight * 3.5;
  const y3 = scrollY * windowHeight * 1.5;
  const y4 = scrollY * windowHeight * 2.8;

  return (
    <section ref={galleryRef} className="relative">
      {/* Title */}
      <div className="my-10 flex justify-center items-center px-4">
        <h2 className="font-semibold text-3xl font-[Doren] sm:text-4xl md:text-5xl lg:text-6xl text-center capitalize">
          Our Best Sellers
        </h2>
      </div>

      {isMobile ? (
        <MobileGallery images={images} progress={scrollY} />
      ) : (
        <>
          {/* Desktop Gallery */}
          <div className="h-[175vh] overflow-hidden">
            <div className="relative -top-[12.5vh] h-[200vh] flex gap-[1.5vw] p-[1.5vw]">
              <Column
                images={[images[0], images[1], images[2]]}
                yOffset={y1}
                topOffset="-top-[20%]"
              />
              <Column
                images={[images[3], images[4], images[5]]}
                yOffset={y2}
                topOffset="-top-[60%]"
              />
              <Column
                images={[images[6], images[7], images[8]]}
                yOffset={y3}
                topOffset="-top-[10%]"
              />
              <Column
                images={[images[9], images[10], images[11]]}
                yOffset={y4}
                topOffset="-top-[50%]"
              />
            </div>
          </div>
          <div className="h-[20vh]"></div>
        </>
      )}
    </section>
  );
}

const Column = ({ images, yOffset, topOffset }) => {
  return (
    <div
      className={`relative h-full w-1/4 min-w-[200px] flex flex-col gap-[2vw] ${topOffset}`}
      style={{
        transform: `translateY(${yOffset}px)`,
        willChange: 'transform'
      }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-1/3 w-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

const MobileGallery = ({ images, progress }) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      
      const handleChange = () => setReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Row 1: Right to Left */}
      <MarqueeRow
        images={images.slice(0, 4)}
        direction="right"
        speed={1.2}
        progress={progress}
        reducedMotion={reducedMotion}
      />
      
      {/* Row 2: Left to Right */}
      <MarqueeRow
        images={images.slice(4, 8)}
        direction="left"
        speed={1.5}
        progress={progress}
        reducedMotion={reducedMotion}
      />
      
      {/* Row 3: Right to Left */}
      <MarqueeRow
        images={images.slice(8, 12)}
        direction="right"
        speed={0.8}
        progress={progress}
        reducedMotion={reducedMotion}
      />

      {/* Tablet Grid */}
      <TabletGrid images={images.slice(0, 8)} />
      
      {/* Bottom spacer */}
      <div className="h-8 sm:h-12 md:h-16"></div>
    </div>
  );
};

const MarqueeRow = ({ 
  images, 
  direction = "left", 
  speed = 1, 
  progress = 0, 
  reducedMotion = false 
}) => {
  const trackRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const updateItemWidth = () => {
      if (trackRef.current) {
        // Calculate the width of one set of items including gaps
        const isMobile = window.innerWidth < 640;
        const cardWidth = isMobile ? 280 : 320;
        const gap = isMobile ? 12 : 16; // gap-3 = 12px, gap-4 = 16px
        setItemWidth((cardWidth + gap) * images.length);
      }
    };

    updateItemWidth();
    const resizeObserver = new ResizeObserver(updateItemWidth);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [images.length]);

  const getTransform = () => {
    if (reducedMotion || itemWidth === 0) return "translateX(0px)";
    
    // Create a more noticeable but controlled movement
    const multiplier = direction === "right" ? 1 : -1;
    // Increased movement range for better visibility
    const maxMovement = itemWidth * 0.15; // Increased from 0.05 to 0.15
    const offset = progress * maxMovement * speed;
    
    return `translateX(${multiplier * offset}px)`;
  };

  if (reducedMotion) {
    return (
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 sm:gap-4 p-4">
          {images.map((src, i) => (
            <MobileImageCard
              key={`static-${i}`}
              src={src}
              alt={`Gallery image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-3 sm:gap-4 p-4"
        style={{
          transform: getTransform(),
          willChange: 'transform'
        }}
      >
        {/* Triple the images for better seamless effect */}
        {[...images, ...images, ...images].map((src, i) => (
          <MobileImageCard
            key={`${direction}-${i}`}
            src={src}
            alt={`Gallery image ${(i % images.length) + 1}`}
            ariaHidden={i >= images.length}
          />
        ))}
      </div>
    </div>
  );
};

const TabletGrid = ({ images }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems(prev => {
          const newSet = new Set(prev);
          entries.forEach(entry => {
            const index = parseInt(entry.target.dataset.index, 10);
            if (entry.isIntersecting) {
              newSet.add(index);
            }
          });
          return newSet;
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    refs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden sm:block md:hidden px-4 pb-8">
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, i) => (
          <div
            key={`tablet-${i}`}
            ref={el => refs.current[i] = el}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg transition-all duration-700 ${
              visibleItems.has(i) 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
          >
            <img
              src={src}
              alt={`Gallery image ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileImageCard = ({ src, alt, ariaHidden = false }) => {
  return (
    <div
      className="relative flex-shrink-0 w-[280px] sm:w-[320px] h-[200px] sm:h-[240px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-hidden={ariaHidden}
      role="listitem"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
};