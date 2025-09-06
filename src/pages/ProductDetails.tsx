import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { GoArrowLeft } from "react-icons/go";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import {
  IoShareSocial,
  IoChevronForward,
  IoChevronBack,
} from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";
import NewProducts from "@/components/NewProducts";
import { perfumeData } from "@/PerfumeData";
import ShareDialog from "@/components/ShareDialog";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Minimalist luxury icons
import { FaClock, FaCertificate, FaOilCan, FaFlag } from "react-icons/fa";
import { BsDropletFill } from "react-icons/bs";
import { GrCompare } from "react-icons/gr";


const ProductDetails = () => {
  const { productid } = useParams();
  const product = perfumeData.find((item) => item.id === Number(productid));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("20ML");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  // Check screen size for sticky behavior and layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint (~1024px)
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Framer Motion scroll tracking for sticky behavior (large screens only)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imagesTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["translateY(0%)", "translateY(0%)"]
  );

  useEffect(() => {
    if (product?.multi_images) {
      setCurrentIndex(0);
    }
  }, [product]);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    if (product?.id) {
      setIsInCart(existingCart.includes(product.id));
      setIsWishlisted(existingWishlist.includes(product.id));
    }
  }, [product?.id]);

  const handleAddToCart = async (productId) => {
    setIsLoading(true);

    setTimeout(() => {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (!existingCart.includes(productId)) {
        existingCart.push(productId);
        localStorage.setItem("cart", JSON.stringify(existingCart));
        window.dispatchEvent(new Event("cartUpdated"));
        setIsInCart(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const toggleWishlist = () => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    if (isWishlisted) {
      const updatedWishlist = existingWishlist.filter(
        (id) => id !== product.id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsWishlisted(false);
    } else {
      existingWishlist.push(product.id);
      localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
      setIsWishlisted(true);
    }
  };

  // Carousel navigation
  const nextImage = () => {
    setCurrentIndex((prev) =>
      product?.multi_images ? (prev + 1) % product.multi_images.length : 0
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      product?.multi_images
        ? (prev - 1 + product.multi_images.length) % product.multi_images.length
        : 0
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleThumbnailHover = (index: number) => {
    if (isLargeScreen) {
      setCurrentIndex(index);
    }
  };

  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
    }
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-xs" />
      );
    }
    return stars;
  };

  const sizeOptions = [
    {
      size: "20ML",
      price: product ? Math.floor(product.price_inr) : 0,
      available: true,
    },
    {
      size: "100ML",
      price: product ? Math.floor(product.price_inr * 3) : 0,
      available: false,
    },
  ];

  const getCurrentPrice = () => {
    const selectedOption = sizeOptions.find(
      (option) => option.size === selectedSize
    );
    return selectedOption ? selectedOption.price : product?.price_inr || 0;
  };

  const features = [
    { icon: FaClock, label: "6-8 HOURS LASTING" },
    {
      icon: GrCompare,
      label: "95% SIMILARITY",
      // imageSrc: "/assets/ifra.svg",
    },
    { icon: BsDropletFill, label: "35% CONCENTRATION" },
    { icon: FaFlag, label: "MADE IN INDIA", imageSrc: "/assets/India.png" },
  ];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-12 max-w-md">
          <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">
            FRAGRANCE NOT FOUND
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The fragrance you are seeking does not exist in our collection.
          </p>
          <Link
            to="/product"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-gray-900 transition-colors tracking-wide font-light"
          >
            <GoArrowLeft />
            RETURN TO COLLECTION
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="productdetails bg-white min-h-screen">
      <div className="max-w-7xl mx-auto max-sm:pt-20 pt-28 pb-16 max-sm:px-2 px-8">
        {/* Breadcrumb */}
        <div className="max-sm:mb-4 mb-12">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-black transition-colors">
                    HOME
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/product"
                    className="hover:text-black transition-colors"
                  >
                    FRAGRANCES
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{product.name.toUpperCase()}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Product Images Section - Sticky only on large screens */}
          <motion.div
            ref={imagesRef}
            style={isLargeScreen ? { transform: imagesTransform } : {}}
            className="lg:col-span-7 lg:sticky lg:top-14 lg:self-start"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Thumbnails - Vertical on large screens, horizontal on mobile */}
              <div className="order-2 lg:order-1 flex flex-row gap-4 overflow-x-auto lg:flex-col lg:gap-4 lg:w-24">
                {product.multi_images?.map((img, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer flex-shrink-0"
                    onClick={() => handleThumbnailClick(index)}
                    onMouseEnter={() => handleThumbnailHover(index)}
                  >
                    <div
                      className={`relative overflow-hidden border transition-all duration-300 ${
                        currentIndex === index
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-20 h-20 lg:w-24 lg:h-24 object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Main image with carousel controls */}
              <div className="order-1 lg:order-2 flex-1 relative bg-gray-50 border border-gray-100">
                <img
                  src={product.multi_images?.[currentIndex] || product.image}
                  alt={`${product.name} view ${currentIndex + 1}`}
                  className="w-full h-[600px] max-sm:h-[400px] object-cover"
                />

                {/* Carousel Navigation Buttons */}
                {product.multi_images && product.multi_images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 max-sm:left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                      aria-label="Previous image"
                    >
                      <IoChevronBack className="text-gray-600 text-lg" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 max-sm:right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                      aria-label="Next image"
                    >
                      <IoChevronForward className="text-gray-600 text-lg" />
                    </button>
                  </>
                )}

                {/* Floating action buttons */}
                <div className="absolute top-6 right-6 max-sm:top-3 max-sm:right-3 flex flex-col gap-3">
                  <button
                    onClick={toggleWishlist}
                    className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                  >
                    {isWishlisted ? (
                      <FaHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaRegHeart className="text-gray-600 text-lg group-hover:text-red-500 transition-colors" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsShareOpen(true)}
                    className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                    aria-label="Share fragrance"
                  >
                    <IoShareSocial className="text-gray-600 text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Information Section */}
          <div className="lg:col-span-5">
            <div className="space-y-8">
              {/* Product Title */}
              <div>
                <h1 className="text-4xl lg:text-5xl font-light font-[Doren] text-black mb-4 tracking-widest uppercase">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars()}
                    </div>
                    <span className="text-sm text-gray-600 font-light">
                      4.5
                    </span>
                  </div>
                  <div className="h-3 w-px bg-gray-300"></div>
                  <span className="text-sm text-gray-600 font-light">
                    11,940 reviews
                  </span>
                </div>

                <p className="text-gray-700 font-light text-lg tracking-wide">
                  EAU DE PARFUM
                </p>
                <p className="text-gray-600 font-light tracking-wide">
                  Inspired by{" "}
                  <span className="text-black font-medium">
                    {product.inspired_by}
                  </span>
                </p>
              </div>

              {/* Scent Intensity */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium tracking-wide text-gray-900">
                    INTENSITY
                  </span>
                  <span className="text-sm uppercase font-light text-gray-600">
                    {product.intensity}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-black"></div>
                  <div className="w-3 h-1 bg-gray-600"></div>
                  <div className="w-3 h-1 bg-gray-300"></div>
                  <div className="w-3 h-1 bg-gray-200"></div>
                </div>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm uppercase font-medium tracking-wide text-gray-900">
                    Projection
                  </span>
                  <span className="text-sm uppercase font-light text-gray-600">
                    {product.projection}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-1 bg-black"></div>
                  <div className="w-3 h-1 bg-gray-600"></div>
                  <div className="w-3 h-1 bg-gray-300"></div>
                  <div className="w-3 h-1 bg-gray-200"></div>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-4">
                  SELECT SIZE
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.size}
                      disabled={!option.available}
                      onClick={() => setSelectedSize(option.size)}
                      className={`relative border transition-all duration-200 ${
                        selectedSize === option.size
                          ? "border-black bg-gray-50"
                          : option.available
                          ? "border-gray-200 hover:border-gray-400"
                          : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-light text-gray-900 mb-2 tracking-wide">
                          {option.size}
                        </div>
                        <div className="text-sm text-gray-600 font-light">
                          ₹{option.price}
                        </div>
                        {!option.available && (
                          <div className="text-xs text-gray-400 font-light mt-2 tracking-wide">
                            COMING SOON
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Section */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-gray-400 text-lg font-light line-through">
                        ₹{Math.floor(getCurrentPrice() + 100)}
                      </span>
                      <span className="text-xs text-gray-600 font-medium tracking-wide border border-gray-300 px-2 py-1">
                        22% OFF
                      </span>
                    </div>
                    <div className="flex items-center text-4xl font-light text-black tracking-wide">
                      ₹{getCurrentPrice() * quantity}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 font-light tracking-wide uppercase">
                      Inclusive of all taxes
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center">
                    <span className="text-sm font-medium tracking-wide text-gray-900 mr-4">
                      QTY
                    </span>
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <BiMinus className="text-sm" />
                      </button>
                      <span className="px-6 py-3 min-w-[60px] text-center font-light">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-gray-100 transition-colors"
                        disabled={quantity >= 5}
                      >
                        <BiPlus className="text-sm" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  disabled={isLoading}
                  className={`w-full py-6 text-xl  tracking-[0.2em] font-[Doren] font-semibold transition-all duration-300 bg-black hover:bg-gray-900 text-white
                    
                  `}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full  border border-white border-t-transparent animate-spin"></div>
                      ADDING TO CART
                    </div>
                  ) : isInCart ? (
                    "ADDED TO CART"
                  ) : (
                    "ADD TO CART"
                  )}
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-8">
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="text-center py-6 border border-gray-100 hover:border-gray-300 transition-colors"
                    >
                      {feature.imageSrc ? (
                        <img
                          src={feature.imageSrc}
                          className="h-6 w-14 mb-3 object-contain mx-auto"
                        />
                      ) : (
                        <feature.icon className="text-2xl text-gray-700 mb-3 mx-auto" />
                      )}
                      <span className="text-xs font-medium text-gray-900 tracking-wide">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-evenly text-xs text-gray-600 font-light tracking-wide">
                  {/* <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500"></div>
                    <span>FREE SHIPPING</span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500"></div>
                    <span>SECURE PAYMENT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500"></div>
                    <span>AUTHENTIC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Dialog */}
        <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} />

        {/* Product Description */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
              <div className="col-span-2">
                <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
                  DESCRIPTION
                </h3>
                <p className="text-gray-700 leading-relaxed font-light">
                 {product.description}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
                  NOTES
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">
                      TOP
                    </h4>
                    <p className="text-sm text-gray-600 font-light">
                      {product.top_notes}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">
                      HEART
                    </h4>
                    <p className="text-sm text-gray-600 font-light">
                      {product.middle_notes}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">
                      BASE
                    </h4>
                    <p className="text-sm text-gray-600 font-light">
                      {product.base_notes}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
                  CARE
                </h3>
                <ol className="space-y-3 list-disc text-sm text-gray-600 font-light">
                  <li>Store in cool, dry place</li>
                  <li>Avoid direct sunlight</li>
                  <li>Apply to pulse points</li>
                  <li>Patch test recommended</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between max-sm:justify-center mb-12">
              <h3 className="text-2xl font-light tracking-wide text-gray-900">
                CUSTOMER REVIEWS
              </h3>
              {/* <button className="text-sm text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-light tracking-wide">
                WRITE REVIEW
              </button> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="text-center md:text-left">
                <div className="text-6xl font-light text-gray-900 mb-2">
                  4.5
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  {renderStars()}
                </div>
                <p className="text-sm text-gray-600 font-light tracking-wide">
                  BASED ON 11,940 REVIEWS
                </p>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-8">{stars}★</span>
                    <div className="flex-1 bg-gray-200 h-1">
                      <div
                        className="bg-black h-1 transition-all duration-500"
                        style={{
                          width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              {[
                {
                  initial: "R",
                  name: "RAHUL R.",
                  rating: 4,
                  text: "Outstanding value proposition. The quality exceeds expectations for this price point.",
                },
                {
                  initial: "S",
                  name: "SOHAIL S",
                  rating: 5,
                  text: "Exceptional longevity and projection. A true luxury experience that rivals the original.",
                },
                {
                  initial: "S",
                  name: "SANJAY S.",
                  rating: 5,
                  text: "Sophisticated packaging and an exquisite fragrance. Highly recommended.",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-8 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-medium text-gray-700 text-sm">
                      {review.initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900 text-sm tracking-wide">
                          {review.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700 font-light leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
            <p className="text-center mt-10 text-slate-700 cursor-pointer">AND MORE...</p>
        </div>

        {/* Related Products */}
        <div className="mt-24 border-t border-gray-200 pt-16">
          <div className="flex items-center justify-between">
            <h3 className="text-5xl font-[Doren] tracking-wide text-gray-900">
              YOU MIGHT ALSO LIKE
            </h3>
            <Link
              to="/product"
              className="text-lg text-gray-600 border-b max-sm:hidden border-gray-300 hover:border-black transition-colors font-[Doren] tracking-wide"
            >
              VIEW ALL
            </Link>
          </div>
          <NewProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
