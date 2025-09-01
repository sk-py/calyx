import { useRef, useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import { perfumeData } from "@/PerfumeData";
import { Link, useLocation } from "react-router-dom";

type Perfume = {
  id: string | number;
  name: string;
  image: string;
  price_inr?: number; // current price
  originalPrice?: number; // was price
  rating?: number; // 0-5
  reviews?: number; // count
  inspired_by?: string; // optional subtitle
  isNew?: boolean; // badge
  // ...any other fields you already have
};

const NewProducts = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const path = useLocation().pathname;

  const getScrollAmount = () => {
    if (typeof window === "undefined") return 280;
    if (window.innerWidth >= 1024) return 340;
    if (window.innerWidth >= 768) return 200;
    return window.innerWidth - 16;
  };

  const scrollLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = getScrollAmount();
      if (container.scrollLeft === 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  const scrollRight = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = getScrollAmount();
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (Math.ceil(container.scrollLeft) >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Desktop detection for autoplay
  useEffect(() => {
    const checkScreen = () =>
      setIsDesktop(typeof window !== "undefined" && window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const start = () => {
      autoplayRef.current = setInterval(scrollRight, 2000);
    };
    const stop = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
    start();
    const container = scrollRef.current;
    if (container) {
      container.style.scrollBehavior = "smooth";
      container.addEventListener("mouseenter", stop);
      container.addEventListener("mouseleave", start);
    }
    return () => {
      stop();
      if (container) {
        container.removeEventListener("mouseenter", stop);
        container.removeEventListener("mouseleave", start);
      }
    };
  }, [isDesktop]);

  // GSAP entrance flip (unchanged)
  useEffect(() => {
    const loadGSAP = () => {
      if ((window as any).gsap) {
        initializeFlip();
      } else {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.onload = () => initializeFlip();
        document.head.appendChild(script);
      }
    };

    const initializeFlip = () => {
      const gsap = (window as any).gsap;
      if (!gsap || !cardsRef.current.length) return;
      const cards = cardsRef.current.filter(Boolean);

      gsap.set(cards, {
        rotationY: 180,
        opacity: 0,
        scale: 0.9,
        transformOrigin: "center center",
        force3D: true,
      });

      const tl = gsap.timeline({ delay: 3.0 });
      tl.to(cards, {
        duration: 0.8,
        rotationY: 0,
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        transformOrigin: "center center",
        force3D: true,
        clearProps: "transform",
        stagger: { amount: 0.4, from: "start" },
      });
    };

    loadGSAP();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="relative py-8 md:py-12 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6 md:mb-8"
          variants={itemVariants}
        >
          {path == "/" && (
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium font-[Doren] text-gray-900 ">
              Meet Our Fragrance Icons
            </h2>
          )}

          {/* Mobile nav buttons */}
          <div className="flex items-center gap-2 md:gap-3 lg:hidden">
            <motion.button
              onClick={scrollLeft}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-500 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll left"
            >
              <ArrowLeft className="text-zinc-600 w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
            <motion.button
              onClick={scrollRight}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-zinc-500 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll right"
            >
              <ArrowRight className="text-zinc-600 w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Products */}
        <motion.div className="mb-6 md:mb-8" variants={itemVariants}>
          <div
            className="overflow-x-auto scrollbar-hide pb-4"
            ref={scrollRef}
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
              transform: "translateZ(0)",
              willChange: "scroll-position",
            }}
          >
            <motion.div
              className="flex items-start justify-start gap-4 md:gap-6 lg:gap-4 min-w-max px-4 sm:px-2 md:px-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {(perfumeData as Perfume[]).map((p, index) => {
                const rating =
                  typeof p.rating === "number"
                    ? Math.max(0, Math.min(5, p.rating))
                    : 4.0;
                const reviews = p.reviews ?? 0;
                const current = p.price_inr ?? 45;
                const original = p.price_inr
                  ? Math.round(p.price_inr + 100)
                  : 60;
                const isNew = Boolean(p.isNew) || index % 4 === 1; // default some as New if not provided

                return (
                  <Link
                    to={`/product/${p.id}`}
                    key={p.id}
                    className="focus:outline-none font-[Doren] focus:ring-2 focus:ring-zinc-100 rounded"
                  >
                    <motion.div
                      key={p.id}
                      ref={(el: any) => (cardsRef.current[index] = el)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.05 * index,
                        ease: "easeOut",
                      }}
                      className="flex-shrink-0 w-[calc(100vw-4rem)] cursor-pointer sm:w-72 md:w-64 lg:w-72"
                      style={{ scrollSnapAlign: "center" }}
                    >
                      <div className="group hover:-translate-y-1 transition-all relative bg-white rounded-md duration-500 hover:shadow-sm">
                        {/* Image */}
                        <div className="relative group/image aspect-square overflow-hidden">
                          <img
                            src={p.image || "/placeholder.svg"}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                          {/* New badge */}
                          {isNew && (
                            <span className="absolute left-2 top-2 group-hover:top-3 transition-all duration-300 rounded-full bg-black text-white text-xl px-6 py-0">
                              New
                            </span>
                          )}
                          {/* Hover action pill */}
                          <motion.div
                            initial={{ y: -6, scale: 0.98 }}
                            className="pointer-events-none absolute left-[30%] top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                          >
                            <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-black text-white px-4 py-2 shadow-md">
                              <button
                                aria-label="Add to wishlist"
                                className="hover:opacity-90 transition-opacity"
                              >
                                <Heart className="w-5 h-5" />
                              </button>
                              <button
                                aria-label="Quick view"
                                className="hover:opacity-90 transition-opacity"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                              <button
                                aria-label="Add to bag"
                                className="hover:opacity-90 transition-opacity"
                              >
                                <ShoppingBag className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        </div>

                        {/* Details */}
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <Stars value={rating} />
                              {reviews > 0 && (
                                <span className="text-xs text-gray-600 tabular-nums">
                                  {reviews.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="flex text-lg flex-row font-serif  items-center gap-2">
                              <p className="font-normal">
                                ₹{current.toFixed(1)}{" "}
                              </p>
                              <span className="line-through font-extralight">
                                ₹{original}
                              </span>
                            </div>
                          </div>
                          <h3 className="mt-2 font-semibold tracking-wider text-gray-900 text-2xl uppercase">
                            {p.name}
                          </h3>
                          {p.inspired_by && (
                            <p className="mt-1 text-xl text-gray-600">
                              Inspired by <br />
                              <span className="font-medium text-zinc-800 text-xl bg-gray-50 px-1 py-0.5 rounded">
                                {p.inspired_by}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* View All */}
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <Link
            to="/product"
            className="group inline-flex items-center gap-2 px-6 md:px-8  bg-black text-white rounded-full text-2xl py-1 hover:scale-[0.98] font-[Doren] font-medium hover:bg-gray-800 transition-all duration-300"
          >
            <span>Explore more</span>
            <GoArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

function Stars({ value = 0 }: { value: number }) {
  // Render 0-5 stars, half steps supported visually by width clip
  const stars = Array.from({ length: 5 });
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;

  return (
    <div className="flex items-center">
      {stars.map((_, i) => {
        const isFull = i < full;
        const isHalf = i === full && hasHalf;
        return (
          <div key={i} className="relative w-4 h-4">
            {/* Outline */}
            <Star
              className="absolute inset-0 w-4 h-4 text-amber-400"
              strokeWidth={1.5}
            />
            {/* Fill */}
            <div
              className={`absolute inset-0 overflow-hidden ${
                isFull ? "w-full" : isHalf ? "w-1/2" : "w-0"
              }`}
              aria-hidden="true"
            >
              <Star
                className="w-4 h-4 text-amber-500"
                strokeWidth={0}
                fill="currentColor"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NewProducts;
