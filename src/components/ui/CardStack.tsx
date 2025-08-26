import { useEffect, useRef, useState } from "react";

// Dummy images using placeholder services
const images = [
  "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723391962110-299d412ca046?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705338670422-01133208eab9?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1680503504148-25f2d178ff05?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723391962110-299d412ca046?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1705338670422-01133208eab9?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1680503504148-25f2d178ff05?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1723391962154-8a2b6299bc09?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://picsum.photos/400/570?random=12",
];

export default function GraphicGallery() {
  const galleryRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); 
    };

    const handleScroll = () => {
      if (galleryRef.current && !isMobile) {
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
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      checkMobile();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Calculate parallax offsets for desktop - adjusted for 4 columns
  const y1 = scrollY * windowHeight * 2;
  const y2 = scrollY * windowHeight * 3.5;
  const y3 = scrollY * windowHeight * 1.5;
  const y4 = scrollY * windowHeight * 2.8;

  if (isMobile) {
    return <MobileGallery images={images} />;
  }

  return (
    <div className="">
      {/* Top spacer */}
      <div className="my-10 flex justify-center items-center px-4">
        <h2 className="font-semibold text-3xl font-[Doren] sm:text-4xl md:text-5xl lg:text-6xl text-center capitalize">
         Our Best Sellers
        </h2>
      </div>

      {/* Desktop Gallery - Now with 4 columns */}
      <div ref={galleryRef} className="h-[175vh] overflow-hidden">
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

      {/* Bottom spacer */}
      <div className="h-[20vh]"></div>
    </div>
  );
}

const Column = ({ images, yOffset, topOffset }) => {
  return (
    <div
      className={`relative h-full w-1/4 min-w-[200px] flex flex-col gap-[2vw] whitespace-nowrap ${topOffset}`}
      style={{
        transform: `translateY(${yOffset}px)`,
      }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-1/3 w-full rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
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

const MobileGallery = ({ images }) => {
  return (
    <div className="w-full">
      {/* Top spacer */}
      <div className="mt-7 mb-4 sm:my-8 md:my-10 flex justify-center items-center px-4">
        <h2 className="font-semibold font-[Doren] text-3xl sm:text-4xl md:text-5xl text-center capitalize">
         Our Best Sellers
        </h2>
      </div>

      {/* Mobile Horizontal Scroll Gallery */}
      <div className="w-full overflow-hidden">
        {/* First Row - Left to Right */}
        <div
          className="flex gap-3 sm:gap-4 p-4 overflow-x-auto scrollbar-hide animate-scroll-left"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          {images.slice(0, 4).map((src, i) => (
            <MobileImageCard
              key={`row1-${i}`}
              src={src}
              index={i}
              alt={`Gallery image ${i + 1}`}
            />
          ))}
        </div>

        {/* Second Row - Right to Left */}
        <div className="flex gap-3 sm:gap-4 p-4 overflow-x-auto scrollbar-hide direction-rtl animate-scroll-right">
          {images.slice(4, 8).map((src, i) => (
            <MobileImageCard
              key={`row2-${i}`}
              src={src}
              index={i}
              alt={`Gallery image ${i + 5}`}
              reverse={true}
            />
          ))}
        </div>

        {/* Third Row - Left to Right */}
        <div className="flex gap-3 sm:gap-4 p-4 overflow-x-auto scrollbar-hide animate-scroll-left">
          {images.slice(8, 12).map((src, i) => (
            <MobileImageCard
              key={`row3-${i}`}
              src={src}
              index={i}
              alt={`Gallery image ${i + 9}`}
            />
          ))}
        </div>
      </div>

      {/* Stacked Grid for Tablet Portrait */}
      <div className="hidden sm:block md:hidden px-4 pb-8">
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 8).map((src, i) => (
            <div
              key={`tablet-${i}`}
              className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg"
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

      {/* Bottom spacer */}
      <div className="h-8 sm:h-12 md:h-16"></div>
    </div>
  );
};

const MobileImageCard = ({ src, index, alt, reverse = false }) => {
  return (
    <div
      className={`relative flex-shrink-0 w-[280px] sm:w-[320px] h-[200px] sm:h-[240px] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
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