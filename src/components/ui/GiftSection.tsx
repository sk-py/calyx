import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    gsap.registerPlugin(ScrollTrigger);

    const headings = headingRefs.current.filter(Boolean);
    const descriptions = descriptionRefs.current.filter(Boolean);
    const images = imageRefs.current.filter(Boolean);

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
        scrub: 3, // Increased from 1.5 to 3 for slower animation
        pin: true,
        anticipatePin: 1,
      },
    });

    contentSections.forEach((_, index) => {
      if (index === 0) return;

      const prevIndex = index - 1;
      // Each section gets more space in the timeline for longer hold periods
      const sectionStart = index * 0.4; // More spacing between sections
      const transitionDuration = 0.15; // Shorter transition duration for smoother effect

      // Fade out previous content
      mainTl.to(
        [headings[prevIndex], descriptions[prevIndex]],
        {
          opacity: 0,
          duration: transitionDuration,
          ease: "power2.inOut",
        },
        sectionStart - transitionDuration
      );

      // Fade in new content
      mainTl.to(
        [headings[index], descriptions[index]],
        {
          opacity: 1,
          duration: transitionDuration,
          ease: "power2.inOut",
        },
        sectionStart
      );

      // Reveal new image with slower, more elegant animation
      mainTl.to(
        images[index],
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.25, // Slightly longer duration for smoother reveal
          ease: "power2.out", // Softer easing for more elegant feel
        },
        sectionStart - 0.05
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500vh] bg-black text-white overflow-hidden"
    >
      {/* Fixed content container */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-stretch justify-center w-full mx-auto h-full">
          {/* Left Text Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 mb-12 md:mb-0 md:pr-12 relative justify-center">
            {contentSections.map((section, index) => (
              <div
                key={index}
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
                  <button className="px-8 z-10 py-3 border duration-300 hover:text-black border-white text-white text-sm cursor-pointer uppercase tracking-wider hover:bg-white transition-colors w-fit">
                    Discover
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right Image Section */}
          <div className="relative w-full md:w-1/2 h-full">
            <div className="relative h-full w-full overflow-hidden shadow-2xl">
              {contentSections.map((section, index) => (
                <img
                  key={index}
                  ref={(el) => (imageRefs.current[index] = el)}
                  src={section.image || "/placeholder.svg"}
                  alt={section.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
