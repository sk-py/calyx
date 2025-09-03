import { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { Button } from "@/components/ui/button";
import BackToTop from "@/components/BackToTop";
import { perfumeData } from "@/PerfumeData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import PremiumHeroSection from "@/components/ui/HeroSection";
import { motion } from "framer-motion";

type Perfume = {
  id: string | number;
  name: string;
  image: string;
  price_inr?: number;
  inspired_by?: string;
  isNew?: boolean;
  tags?: string[];
  sillage?: string;
  longevity?: string;
  isLimited?: boolean;
  multi_images?: string[];
};

const getRandomRadius = () => {
  const radii = ["5px", "15px", "25px", "50px", "9999px"];
  return radii[Math.floor(Math.random() * radii.length)];
};

const generateColorFromString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 80%)`;
};

const isImageDark = (imageUrl: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(false);
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const data = ctx.getImageData(0, 0, img.width, img.height).data;
      let r = 0,
        g = 0,
        b = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      const avg = (r + g + b) / (data.length / 4);
      resolve(avg < 128);
    };
    img.onerror = () => resolve(false);
  });
};

const tags = [
  "#new",
  "#Limited Edition",
  "#Soft",
  "#Moderate",
  "#Strong",
  "#Very Strong",
];

const getGenderCategory = (perfume: Perfume) => {
  if (
    perfume.tags?.some(
      (tag) =>
        tag.toLowerCase().includes("women") ||
        tag.toLowerCase().includes("feminine")
    )
  ) {
    return "Women";
  } else if (
    perfume.tags?.some(
      (tag) =>
        tag.toLowerCase().includes("men") ||
        tag.toLowerCase().includes("masculine")
    )
  ) {
    return "Men";
  }
  return "Unisex";
};

const getRandomRating = () => {
  const ratings = [4.0, 4.2, 4.4, 4.5, 4.6, 4.8, 5.0];
  return ratings[Math.floor(Math.random() * ratings.length)];
};

const getRandomPurchaseCount = () => {
  return Math.floor(Math.random() * 1000) + 100;
};

function Stars({ value = 0 }: { value: number }) {
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
            <Star
              className="absolute inset-0 w-4 h-4 text-amber-400"
              strokeWidth={1.5}
            />
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

const SearchPage = () => {
  const uniqueBrands = Array.from(
    new Set(perfumeData.map((p) => p.inspired_by))
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [imageStyles, setImageStyles] = useState({});
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const processImages = async () => {
      const styles: {
        [key: string]: { borderRadius: string; backgroundColor: string };
      } = {};
      for (const perfume of perfumeData as Perfume[]) {
        const dark = await isImageDark(perfume.image);
        styles[perfume.id] = {
          borderRadius: getRandomRadius(),
          backgroundColor: dark
            ? "#f0f0f0"
            : "linear-gradient(to right, #444, #222)",
        };
      }
      setImageStyles(styles);
    };
    processImages();
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [selectedTag, selectedBrand]);

  const filteredData = perfumeData.filter((item: Perfume) => {
    const tagValue = selectedTag
      ? selectedTag.replace("#", "").toLowerCase()
      : "";
    const tagMatch = selectedTag
      ? item.tags?.some((tag) => tag.toLowerCase().includes(tagValue)) ||
        item.sillage?.toLowerCase().includes(tagValue) ||
        item.longevity?.toLowerCase().includes(tagValue) ||
        (tagValue === "new" && item.isNew) ||
        (tagValue === "limited edition" && item.isLimited)
      : true;
    const brandMatch = selectedBrand
      ? item.inspired_by === selectedBrand
      : true;
    return tagMatch && brandMatch;
  }) as Perfume[];

  const scrollBrands = (dir: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 150, behavior: "smooth" });
    }
  };

  return (
    <div className="relative pt-8 md:pt-16 bg-white min-h-screen">
      {/* <PremiumHeroSection /> */}
      <div className="bg-white relative font-[montserrat]">
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-gold rounded-full opacity-20 animate-float-elegant"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div> */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center items-center gap-4 max-sm:mb-4 mb-8">
            <p className="text-gray-600 font-medium text-2xl font-[Doren] tracking-wide">
              Showing{" "}
              <span className="font-semibold text-3xl text-black">
                {filteredData.length}
              </span>{" "}
              product
              {filteredData.length !== 1 ? "s" : ""}
            </p>
            {(selectedTag || selectedBrand) && (
              <button
                className="text-white px-6 py-2 bg-zinc-900 rounded-full text-sm hover:bg-black transition-all font-[montserrat] duration-300 shadow-md"
                onClick={() => {
                  setSelectedTag(null);
                  setSelectedBrand(null);
                }}
              >
                Clear All
              </button>
            )}
          </div>

          <div className="relative w-full mb-12">
            <button
              onClick={() => scrollBrands(-1)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-700 p-3 rounded-full shadow-lg border border-gray-200 hover:shadow-xl hover:border-gold/30 transition-all duration-300"
            >
              <FaChevronLeft />
            </button>
            <div
              ref={scrollRef}
              className="py-4 px-12 overflow-x-auto flex gap-3 scrollbar-hide"
            >
              <Button
                className={`whitespace-nowrap border font-medium tracking-wide transition-all duration-300 ${
                  selectedBrand === null
                    ? "bg-black text-white border-black shadow-lg shadow-black/20"
                    : "bg-white text-gray-700 font-[montserrat] border-gray-300 hover:bg-gray-50 hover:border-gold/50 hover:shadow-md"
                }`}
                onClick={() => setSelectedBrand(null)}
              >
                All Brands
              </Button>
              {uniqueBrands.map((brand, index) => {
                const isSelected = selectedBrand === brand;
                return (
                  <Button
                    key={index}
                    className={`whitespace-nowrap flex items-center gap-2 relative border font-medium tracking-wide transition-all duration-300 ${
                      isSelected
                        ? "bg-black text-white border-black shadow-lg shadow-black/20"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gold/50 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedBrand(isSelected ? null : brand)}
                  >
                    <span>{brand}</span>
                    {isSelected && (
                      <MdClose className="text-zinc-900 w-4 h-4 bg-white rounded-full absolute -top-2 -right-2 shadow-md" />
                    )}
                  </Button>
                );
              })}
            </div>
            <button
              onClick={() => scrollBrands(1)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white text-gray-700 p-3 rounded-full shadow-lg border font-[montserrat] border-gray-200 hover:shadow-xl hover:border-gold/30 transition-all duration-300"
            >
              <FaChevronRight />
            </button>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            ref={gridRef}
          >
            {filteredData.length > 0 ? (
              filteredData.map((p, index) => {
                const rating = getRandomRating();
                const purchaseCount = getRandomPurchaseCount();
                const genderCategory = getGenderCategory(p);
                const current = p.price_inr ?? 45;
                const original = p.price_inr
                  ? Math.round(p.price_inr + 100)
                  : 60;
                const isNew = Boolean(p.isNew) || index % 4 === 1;
                const reviews = purchaseCount;

                return (
                  <Link
                    to={`/product/${p.id}`}
                    key={p.id}
                    className="focus:outline-none font-[Doren] focus:ring-2 focus:ring-zinc-100 rounded"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.05 * index,
                        ease: "easeOut",
                      }}
                      className="flex-shrink-0 w-full cursor-pointer sm:w-72 md:w-64 lg:w-72 mx-auto"
                      style={{ scrollSnapAlign: "center" }}
                    >
                      <div className="group hover:scale-[0.99] transition-all relative bg-white rounded-md duration-500 hover:shadow-sm">
                        <div className="relative group/image aspect-square overflow-hidden">
                          <img
                            src={p.image || "/placeholder.svg"}
                            alt={p.name}
                            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ease-in-out group-hover/image:opacity-0"
                          />
                          {p.multi_images && (
                            <img
                              src={
                                p.multi_images[1] ||
                                p.image ||
                                "/placeholder.svg"
                              }
                              alt={`${p.name} alternate`}
                              className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover/image:opacity-100"
                            />
                          )}
                          {isNew && (
                            <span className="absolute left-2 top-2 group-hover:top-3 transition-all duration-300 rounded-full bg-black text-white text-xl px-6 py-0">
                              New
                            </span>
                          )}
                          {/* <motion.div
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
                          </motion.div> */}
                        </div>

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
                            <div className="flex text-lg flex-row font-serif items-center gap-2">
                              <p className="font-normal">
                                ₹{current.toFixed(1)}
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
              })
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
                  <p className="text-2xl text-gray-600 mb-6 font-light">
                    No perfumes match the selected filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedTag(null);
                      setSelectedBrand(null);
                    }}
                    className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium tracking-wide shadow-lg"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="pt-24 w-fit mx-auto font-[Doren] text-2xl md:text-4xl">
            <p>Filter by tags:</p>
            </div>
          <div className="flex flex-wrap max-sm:gap-2 gap-3 my-8  justify-center">
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? null : tag);
                  window.scrollTo({top:10,left:0,behavior:"smooth"})
                }}
                className={`max-sm:px-3 max-sm:py-2 max-sm:text-xs px-6 py-3 border rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  selectedTag === tag
                    ? "bg-black text-white border-black shadow-lg shadow-black/20"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gold hover:shadow-md hover:shadow-gold/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      <BackToTop />

      <style jsx>{`
        .metal-3d {
          background: linear-gradient(
            90deg,
            #27272a 0%,
            #2f2f33 20%,
            #d4d4d8 50%,
            #2f2f33 80%,
            #27272a 100%
          );
          background-size: 200% auto;
          background-position: 0% center;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .bg-gradient-radial {
          background: radial-gradient(
            circle at center,
            var(--tw-gradient-stops)
          );
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
