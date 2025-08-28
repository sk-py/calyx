import React, { useRef, useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { perfumeData } from "@/PerfumeData";

const NewProducts = () => {
  const scrollRef = useRef(null);
  const cardsRef = useRef([]);
  const autoplayRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Dynamic scroll amount based on screen size
  const getScrollAmount = () => {
    if (window.innerWidth >= 1024) return 280; // Desktop - lg
    if (window.innerWidth >= 768) return 200;  // Tablet - md
    return window.innerWidth - 16; // Mobile - full width minus container padding
  };

  const scrollLeft = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = getScrollAmount();
      if (container.scrollLeft === 0) {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
    
    // Reset animation flag after a shorter duration
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
        container.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
    
    // Reset animation flag after a shorter duration
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Auto-play functionality for desktop
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      const startAutoplay = () => {
        autoplayRef.current = setInterval(() => {
          scrollRight();
        }, 2000); // Reduced from 3000ms to 2000ms for faster carousel
      };

      const stopAutoplay = () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
          autoplayRef.current = null;
        }
      };

      startAutoplay();

      const container = scrollRef.current;
      if (container) {
        // Add smooth scrolling CSS
        container.style.scrollBehavior = 'smooth';
        container.addEventListener('mouseenter', stopAutoplay);
        container.addEventListener('mouseleave', startAutoplay);
      }

      return () => {
        stopAutoplay();
        if (container) {
          container.removeEventListener('mouseenter', stopAutoplay);
          container.removeEventListener('mouseleave', startAutoplay);
        }
      };
    }
  }, [isDesktop]);

  useEffect(() => {
    // Load GSAP if not available
    const loadGSAP = () => {
      if (window.gsap) {
        initializePremiumFlip();
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.onload = () => initializePremiumFlip();
        document.head.appendChild(script);
      }
    };

    const initializePremiumFlip = () => {
      const gsap = window.gsap;
      if (!gsap || !cardsRef.current.length) return;

      const cards = cardsRef.current.filter(card => card !== null);

      // Set initial state - cards positioned horizontally but flipped
      gsap.set(cards, {
        rotationY: 180, // Simple 180 degree flip
        opacity: 0,
        scale: 0.9,
        transformOrigin: "center center",
        force3D: true
      });

      // Create sophisticated entrance timeline
      const tl = gsap.timeline({ delay: 0.8 });

      // Elegant flip entrance with stagger
      tl.to(cards, {
        duration: 0.8, // Reduced from 1.2s
        rotationY: 0, // Flip to normal position
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        transformOrigin: "center center",
        force3D: true,
        clearProps: "transform", // Clear transform properties after animation
        stagger: {
          amount: 0.4, // Reduced from 0.8s
          from: "start"
        }
      });
    };

    loadGSAP();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Reduced from 0.8s
        ease: "easeOut",
        staggerChildren: 0.1, // Reduced from 0.2s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reduced from 0.6s
        ease: "easeOut",
      },
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
        {/* Header Section */}
        <motion.div
          className="flex items-center justify-between mb-6 md:mb-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-medium font-[Doren] text-gray-900 tracking-wide">
            Meet Our Fragnance Icons
          </h2>
          
          {/* Navigation buttons - Hidden on desktop */}
          <div className="flex items-center gap-2 md:gap-3 lg:hidden">
            <motion.button
              onClick={scrollLeft}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-[1px] border-zinc-500 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="text-zinc-600 w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
            <motion.button
              onClick={scrollRight}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full border-[1px] border-zinc-500 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             <ArrowRight className="text-zinc-600 w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Products Container */}
        <motion.div
          className="mb-6 md:mb-8"
          variants={itemVariants}
        >
          {/* Products Grid */}
          <div
            className="overflow-x-auto scrollbar-hide pb-4"
            ref={scrollRef}
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
              transform: 'translateZ(0)', // Hardware acceleration
              willChange: 'scroll-position'
            }}
          >
            <motion.div
              className="flex items-start justify-start gap-4 md:gap-6 lg:gap-2 min-w-max px-4 sm:px-2 md:px-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }} // Reduced duration and delay
            >
              {perfumeData.map((perfume, index) => (
                <motion.div
                  key={perfume.id}
                  ref={el => cardsRef.current[index] = el}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4, // Reduced from 0.6s
                    delay: 0.05 * index, // Reduced from 0.1s
                    ease: "easeOut",
                  }}
                  className="flex-shrink-0 w-[calc(100vw-4rem)] sm:w-72 md:w-60 lg:w-64"
                  style={{
                    transformStyle: "preserve-3d",
                    scrollSnapAlign: 'center'
                  }}
                >
                  <div className="bg-white rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-blue-100 rounded mb-3 overflow-hidden">
                      <img 
                        src={perfume.image} 
                        alt={perfume.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="px-3 md:px-4 pb-3 md:pb-4 space-y-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-black font-[poppins] text-lg md:text-lg truncate pr-2">{perfume.name}</h3>
                        <p className="text-base md:text-base font-medium text-black flex-shrink-0">250</p>
                      </div>
                      <h4 className="text-sm md:text-xs font-medium font-[poppins] text-gray-600">
                        Skincare
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <Link
            to="/search"
            className="group inline-flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-black text-white rounded-full text-sm font-[poppins] font-medium hover:bg-gray-800 transition-all duration-300"
          >
            <span>Show more</span>
            <GoArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Link>
        </motion.div>      
      </div>
    </motion.div>
  );
};

export default NewProducts;