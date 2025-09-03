// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { GoArrowLeft } from "react-icons/go";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { MdInfo } from "react-icons/md";
// import NewProducts from "@/components/NewProducts";
// import { perfumeData } from "@/PerfumeData";

// // Placeholder icons (replace with actual icons from the image)
// import { FaClock } from "react-icons/fa"; // For "LONG LASTING"
// import { FaCertificate } from "react-icons/fa"; // For "IFRA-CERTIFIED"
// import { FaOilCan } from "react-icons/fa"; // For "IMPORTED OILS"
// import { FaFlag } from "react-icons/fa"; // For "MADE IN INDIA"

// import {
//   Breadcrumb,
//   BreadcrumbEllipsis,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// const ProductDetails = () => {
//   const { productid } = useParams();
//   const product = perfumeData.find((item) => item.id === Number(productid));

//   const [selectedImage, setSelectedImage] = useState(product?.image);
//   const [isInCart, setIsInCart] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("50ML");

//   if (!product) {
//     return (
//       <div className="p-8 text-center text-red-500">
//         Product not found.{" "}
//         <Link to="/product" className="underline">
//           Go back
//         </Link>
//       </div>
//     );
//   }

//   useEffect(() => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     if (product?.id && existingCart.includes(product.id)) {
//       setIsInCart(true);
//     }
//   }, [product?.id]);

//   const handleAddToCart = (productId) => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     if (!existingCart.includes(productId)) {
//       existingCart.push(productId);
//       localStorage.setItem("cart", JSON.stringify(existingCart));
//       window.dispatchEvent(new Event("cartUpdated"));
//       setIsInCart(true);
//     }
//   };

//   // Mock rating component
//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
//     }
//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className="productdetails bg-white pt-20 min-h-screen">
//       <div className="max-w-7xl mx-auto p-4">
//         <div className="producttop mb-6 mt-2">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/">Home</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/product">Products</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbPage>{product?.name}</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left side - Thumbnail images */}
//           <div className="flex lg:flex-col flex-row gap-2 lg:w-20">
//             {product.multi_images?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`${product.name} ${index + 1}`}
//                 className={`w-16 h-16 lg:w-20 lg:h-20 object-cover cursor-pointer border-2 rounded-lg transition-all duration-200 ${
//                   selectedImage === img ? "border-gray-400" : "border-gray-200"
//                 }`}
//                 onClick={() => setSelectedImage(img)}
//               />
//             ))}
//           </div>

//           {/* Center - Main product image */}
//           <div className="flex-1 max-w-md">
//             <img
//               src={selectedImage}
//               alt={product.name}
//               className="w-full h-96 lg:h-[500px] object-contain bg-white rounded-lg shadow-sm"
//             />
//           </div>

//           {/* Right side - Product details */}
//           <div className="flex-1 max-w-2xl">
//             {/* Product name and badges */}
//             <h1 className="text-5xl font-semibold font-[Doren] text-gray-900 mb-2 uppercase tracking-widest">
//               {product.name}
//             </h1>

//             {/* Rating */}
//             <div className="flex items-center gap-2 mb-3">
//               <div className="flex items-center gap-1">{renderStars()}</div>
//               <span className="text-sm text-gray-600">11,940</span>
//             </div>

//             {/* Product type and size */}
//             <p className="text-gray-700 mb-2">
//               Eau de Parfum, Size: {product.size_ml}ml / 1.7oz
//             </p>

//             {/* Inspired by */}
//             <p className="text-gray-700 mb-3">
//               Inspired by <strong>{product.inspired_by}</strong>
//             </p>

//             {/* Scent intensity */}
//             <div className="mb-4">
//               <p className="text-gray-700 mb-2">
//                 Scent Intensity Scale:{" "}
//                 <span className="text-gold font-medium">Significant</span>
//               </p>
//               <div className="flex items-center gap-1">
//                 <div className="w-4 h-4 bg-zinc-700 rounded-full"></div>
//                 <div className="w-4 h-4 bg-zinc-400 rounded-full"></div>
//                 <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
//                 <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
//               </div>
//             </div>

//             {/* Specs boxes */}
//             <div className="flex flex-row items-center justify-start gap-6 mb-6">
//               <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
//                 <FaClock size={22} className="text-gray-600 text-2xl mb-1" />
//                 <span className="text-sm text-gray-900 text-center">
//                   LONG LASTING
//                 </span>
//               </div>
//               <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
//                 <FaCertificate
//                   size={22}
//                   className="text-gray-600 text-2xl mb-1"
//                 />
//                 <span className="text-sm text-gray-900 text-center">
//                   IFRA-CERTIFIED
//                 </span>
//               </div>
//               <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
//                 <FaOilCan size={22} className="text-gray-600 text-2xl mb-1" />
//                 <span className="text-sm text-gray-900 text-center">
//                   IMPORTED OILS
//                 </span>
//               </div>
//               <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
//                 <FaFlag size={22} className="text-gray-600 text-2xl mb-1" />
//                 <span className="text-sm text-gray-900 text-center">
//                   MADE IN INDIA
//                 </span>
//               </div>
//             </div>

//             {/* Price section */}
//             <div className="mb-4">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="text-gray-500 text-lg">
//                   Reg: ₹{Math.floor(product.price_inr + 100)}
//                 </span>
//                 <div className="text-right">
//                   <div className="text-2xl font-bold text-gold flex items-center">
//                     <RiMoneyRupeeCircleFill className="mr-1" />
//                     {product.price_inr}
//                   </div>
//                   <div className="text-zinc-700 text-sm">10% OFF</div>
//                 </div>
//               </div>
//             </div>

//             {/* Size selection */}
//             <div className="mb-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="font-medium">Select Size</span>
//                 <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
//                   NEW!
//                 </span>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setSelectedSize("20ML")}
//                   className={`px-6 py-3 rounded-full border-2 transition-all ${
//                     selectedSize === "20ML"
//                       ? "border-zinc-500 bg-zinc-50 text-gold"
//                       : "border-gray-300 text-gray-700 hover:border-gray-400"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         selectedSize === "20ML"
//                           ? "bg-"
//                           : "border border-gray-400"
//                       }`}
//                     ></div>
//                     20ML
//                   </div>
//                 </button>
//                 <button
//                   disabled
//                   title="Coming Soon!"
//                   onClick={() => setSelectedSize("100ML")}
//                   className={`px-6 py-3 rounded-full border-2 transition-all cursor-not-allowed `}
//                 >
//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         selectedSize === "100ML"
//                           ? "bg-red-500"
//                           : "border border-gray-400"
//                       }`}
//                     ></div>
//                     100ML
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Add to cart button */}
//             <div className="mb-6">
//               {isInCart ? (
//                 <Button
//                   disabled
//                   className="w-full bg-gray-400 cursor-not-allowed py-4 text-lg rounded-full"
//                 >
//                   Added to Cart
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={() => handleAddToCart(product.id)}
//                   className="w-full bg-zinc-800 hover:bg-zinc-900 py-4 text-lg rounded-full text-white font-medium"
//                 >
//                   ADD TO CART
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* More products section */}
//         <div className="mt-12">
//           <h3 className="text-3xl font-bold mb-6">Explore More</h3>
//           <NewProducts />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

//* version 2

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { GoArrowLeft } from "react-icons/go";
// import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
// import { MdInfo, MdLocalShipping, MdSecurity, MdVerified } from "react-icons/md";
// import { IoCheckmarkCircle, IoShareSocial } from "react-icons/io5";
// import { BiMinus, BiPlus } from "react-icons/bi";
// import NewProducts from "@/components/NewProducts";
// import { perfumeData } from "@/PerfumeData";

// // Feature icons
// import { FaClock, FaCertificate, FaOilCan, FaFlag } from "react-icons/fa";

// import {
//   Breadcrumb,
//   BreadcrumbEllipsis,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// const ProductDetails = () => {
//   const { productid } = useParams();
//   const product = perfumeData.find((item) => item.id === Number(productid));

//   const [selectedImage, setSelectedImage] = useState(product?.image);
//   const [isInCart, setIsInCart] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("50ML");
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [activeTab, setActiveTab] = useState("description");
//   const [imageZoomed, setImageZoomed] = useState(false);

//   // Loading state for add to cart
//   const [isLoading, setIsLoading] = useState(false);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-8">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h2>
//           <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
//           <Link
//             to="/product"
//             className="inline-flex items-center gap-2 bg-zinc-800 text-white px-6 py-3 rounded-full hover:bg-zinc-900 transition-colors"
//           >
//             <GoArrowLeft />
//             Back to Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   useEffect(() => {
//     setSelectedImage(product?.image);
//   }, [product]);

//   useEffect(() => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

//     if (product?.id) {
//       setIsInCart(existingCart.includes(product.id));
//       setIsWishlisted(existingWishlist.includes(product.id));
//     }
//   }, [product?.id]);

//   const handleAddToCart = async (productId) => {
//     setIsLoading(true);

//     // Simulate API delay for better UX feedback
//     setTimeout(() => {
//       const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       if (!existingCart.includes(productId)) {
//         existingCart.push(productId);
//         localStorage.setItem("cart", JSON.stringify(existingCart));
//         window.dispatchEvent(new Event("cartUpdated"));
//         setIsInCart(true);
//       }
//       setIsLoading(false);
//     }, 800);
//   };

//   const toggleWishlist = () => {
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//     if (isWishlisted) {
//       const updatedWishlist = existingWishlist.filter(id => id !== product.id);
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       setIsWishlisted(false);
//     } else {
//       existingWishlist.push(product.id);
//       localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
//       setIsWishlisted(true);
//     }
//   };

//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
//     }
//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-sm" />
//       );
//     }
//     return stars;
//   };

//   const sizeOptions = [
//     { size: "20ML", price: Math.floor(product.price_inr * 0.6), available: true, popular: false },
//     { size: "50ML", price: product.price_inr, available: true, popular: true },
//     { size: "100ML", price: Math.floor(product.price_inr * 1.8), available: false, popular: false }
//   ];

//   const getCurrentPrice = () => {
//     const selectedOption = sizeOptions.find(option => option.size === selectedSize);
//     return selectedOption ? selectedOption.price : product.price_inr;
//   };

//   const features = [
//     { icon: FaClock, label: "LONG LASTING", desc: "8-12 hours longevity" },
//     { icon: FaCertificate, label: "IFRA-CERTIFIED", desc: "Safe & compliant" },
//     { icon: FaOilCan, label: "IMPORTED OILS", desc: "Premium ingredients" },
//     { icon: FaFlag, label: "MADE IN INDIA", desc: "Proudly Indian" }
//   ];

//   return (
//     <div className="productdetails bg-gray-50 min-h-screen">
//       {/* Back button - Fixed position for better UX */}
//       <div className="fixed top-20 left-4 z-10">
//         <Link
//           to="/product"
//           className="inline-flex items-center gap-2 bg-white shadow-lg px-4 py-2 rounded-full hover:shadow-xl transition-all duration-200 border"
//         >
//           <GoArrowLeft className="text-lg" />
//           <span className="font-medium">Back</span>
//         </Link>
//       </div>

//       <div className="max-w-7xl mx-auto pt-24 pb-12 px-4">
//         {/* Breadcrumb Navigation */}
//         <div className="mb-8">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/product" className="text-gray-600 hover:text-gray-900">Products</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbPage className="text-gray-900 font-medium">{product?.name}</BreadcrumbPage>
//               </BreadcrumbItem>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
//           {/* Left side - Product Images */}
//           <div className="space-y-4">
//             {/* Main product image */}
//             <div className="relative group">
//               <div
//                 className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
//                   imageZoomed ? 'transform scale-105' : ''
//                 }`}
//               >
//                 <img
//                   src={selectedImage}
//                   alt={product.name}
//                   className="w-full h-96 lg:h-[600px] object-cover cursor-zoom-in"
//                   onClick={() => setImageZoomed(!imageZoomed)}
//                 />
//               </div>

//               {/* Share and Wishlist buttons */}
//               <div className="absolute top-4 right-4 flex gap-2">
//                 <button
//                   onClick={toggleWishlist}
//                   className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
//                   aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                 >
//                   {isWishlisted ? (
//                     <FaHeart className="text-red-500 text-lg" />
//                   ) : (
//                     <FaRegHeart className="text-gray-600 text-lg group-hover:text-red-500" />
//                   )}
//                 </button>
//                 <button
//                   className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
//                   aria-label="Share product"
//                 >
//                   <IoShareSocial className="text-gray-600 text-lg hover:text-blue-500" />
//                 </button>
//               </div>
//             </div>

//             {/* Thumbnail images */}
//             <div className="flex gap-3 justify-center lg:justify-start overflow-x-auto pb-2">
//               {product.multi_images?.map((img, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(img)}
//                   className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all duration-200 hover:scale-105 ${
//                     selectedImage === img
//                       ? "border-zinc-800 shadow-lg"
//                       : "border-gray-200 hover:border-gray-300"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`${product.name} view ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right side - Product Information */}
//           <div className="space-y-6">
//             {/* Product header */}
//             <div>
//               <div className="flex items-start justify-between mb-3">
//                 <h1 className="text-4xl lg:text-5xl font-bold font-[Doren] text-gray-900 uppercase tracking-wide leading-tight">
//                   {product.name}
//                 </h1>
//               </div>

//               {/* Rating and reviews */}
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center gap-1">{renderStars()}</div>
//                   <span className="text-lg font-semibold text-gray-900">4.5</span>
//                 </div>
//                 <div className="h-4 w-px bg-gray-300"></div>
//                 <button className="text-blue-600 hover:text-blue-700 font-medium underline">
//                   11,940 Reviews
//                 </button>
//               </div>

//               {/* Product meta info */}
//               <div className="space-y-2 text-gray-700">
//                 <p className="text-lg">
//                   <span className="font-medium">Type:</span> Eau de Parfum
//                 </p>
//                 <p className="text-lg">
//                   <span className="font-medium">Inspired by:</span>
//                   <span className="text-zinc-800 font-semibold ml-1">{product.inspired_by}</span>
//                 </p>
//               </div>
//             </div>

//             {/* Scent intensity indicator */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border">
//               <div className="flex items-center justify-between mb-3">
//                 <span className="font-semibold text-gray-900">Scent Intensity</span>
//                 <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
//                   Significant
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="flex gap-1">
//                   <div className="w-6 h-2 bg-zinc-800 rounded-full"></div>
//                   <div className="w-6 h-2 bg-zinc-600 rounded-full"></div>
//                   <div className="w-6 h-2 bg-zinc-400 rounded-full"></div>
//                   <div className="w-6 h-2 bg-gray-200 rounded-full"></div>
//                 </div>
//                 <span className="text-sm text-gray-600 ml-2">Strong & Lasting</span>
//               </div>
//             </div>

//             {/* Key features grid */}
//             <div className="grid grid-cols-2 gap-4">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-xl border hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex flex-col items-center text-center">
//                     <feature.icon className="text-2xl text-zinc-700 mb-2" />
//                     <span className="font-semibold text-sm text-gray-900 mb-1">
//                       {feature.label}
//                     </span>
//                     <span className="text-xs text-gray-600">{feature.desc}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Size Selection */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border">
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-lg font-semibold text-gray-900">Select Size</span>
//                 <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//                   NEW!
//                 </span>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {sizeOptions.map((option) => (
//                   <button
//                     key={option.size}
//                     disabled={!option.available}
//                     onClick={() => setSelectedSize(option.size)}
//                     className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
//                       selectedSize === option.size
//                         ? "border-zinc-800 bg-zinc-50 shadow-md"
//                         : option.available
//                         ? "border-gray-200 hover:border-gray-300 hover:shadow-sm"
//                         : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-60"
//                     }`}
//                   >
//                     {option.popular && (
//                       <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
//                         <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//                           Popular
//                         </span>
//                       </div>
//                     )}

//                     <div className="text-center">
//                       <div className="font-bold text-lg text-gray-900 mb-1">
//                         {option.size}
//                       </div>
//                       <div className="text-sm text-gray-600 mb-2">
//                         ₹{option.price}
//                       </div>
//                       {!option.available && (
//                         <div className="text-xs text-red-500 font-medium">
//                           Coming Soon
//                         </div>
//                       )}
//                     </div>

//                     {selectedSize === option.size && (
//                       <IoCheckmarkCircle className="absolute top-2 right-2 text-green-500 text-lg" />
//                     )}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Price and quantity */}
//             <div className="bg-white p-6 rounded-xl shadow-sm border">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <div className="flex items-center gap-3 mb-1">
//                     <span className="text-gray-500 text-lg line-through">
//                       ₹{Math.floor(getCurrentPrice() + 100)}
//                     </span>
//                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
//                       10% OFF
//                     </span>
//                   </div>
//                   <div className="flex items-center text-3xl font-bold text-zinc-800">
//                     <RiMoneyRupeeCircleFill className="mr-1" />
//                     {getCurrentPrice() * quantity}
//                   </div>
//                   <p className="text-sm text-gray-600 mt-1">Inclusive of all taxes</p>
//                 </div>

//                 {/* Quantity selector */}
//                 <div className="flex items-center gap-3">
//                   <span className="font-medium text-gray-900">Qty:</span>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
//                       disabled={quantity <= 1}
//                     >
//                       <BiMinus className="text-lg" />
//                     </button>
//                     <span className="px-4 py-2 min-w-[50px] text-center font-medium">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
//                       disabled={quantity >= 5}
//                     >
//                       <BiPlus className="text-lg" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div className="flex gap-3">
//                 <Button
//                   onClick={() => handleAddToCart(product.id)}
//                   disabled={isInCart || isLoading}
//                   className={`flex-1 py-4 text-lg rounded-xl font-semibold transition-all duration-200 ${
//                     isInCart
//                       ? "bg-green-500 hover:bg-green-600 text-white"
//                       : "bg-zinc-800 hover:bg-zinc-900 text-white hover:shadow-lg"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center gap-2">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Adding...
//                     </div>
//                   ) : isInCart ? (
//                     <div className="flex items-center gap-2">
//                       <IoCheckmarkCircle />
//                       Added to Cart
//                     </div>
//                   ) : (
//                     "ADD TO CART"
//                   )}
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="px-6 py-4 rounded-xl border-2 hover:bg-zinc-800 hover:text-white transition-all duration-200"
//                 >
//                   BUY NOW
//                 </Button>
//               </div>

//               {/* Trust indicators */}
//               <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <MdLocalShipping className="text-green-600 text-lg" />
//                   <span>Free Shipping</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <MdSecurity className="text-blue-600 text-lg" />
//                   <span>Secure Payment</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-gray-600">
//                   <MdVerified className="text-purple-600 text-lg" />
//                   <span>Authentic</span>
//                 </div>
//               </div>
//             </div>

//             {/* Delivery Information */}
//             <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
//               <div className="flex items-center gap-3 mb-2">
//                 <MdLocalShipping className="text-blue-600 text-xl" />
//                 <span className="font-semibold text-blue-900">Delivery Information</span>
//               </div>
//               <div className="space-y-2 text-sm text-blue-800">
//                 <p>• Free delivery on orders above ₹499</p>
//                 <p>• Express delivery available in Mumbai, Delhi, Bangalore</p>
//                 <p>• Standard delivery: 3-5 business days</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Information Tabs */}
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200">
//             <div className="flex">
//               {["description", "ingredients", "reviews"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-4 font-medium capitalize transition-all duration-200 ${
//                     activeTab === tab
//                       ? "border-b-2 border-zinc-800 text-zinc-800 bg-gray-50"
//                       : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="p-8">
//             {activeTab === "description" && (
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-3">About This Fragrance</h3>
//                   <p className="text-gray-700 leading-relaxed text-lg">
//                     Experience the luxurious essence inspired by {product.inspired_by}. This sophisticated
//                     Eau de Parfum captures the perfect balance of elegance and intensity, crafted with
//                     premium imported oils for an unforgettable scent journey.
//                   </p>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold mb-3">Fragrance Notes</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="p-4 bg-gray-50 rounded-lg">
//                       <h5 className="font-medium text-gray-900 mb-2">Top Notes</h5>
//                       <p className="text-sm text-gray-600">Fresh & Vibrant opening</p>
//                     </div>
//                     <div className="p-4 bg-gray-50 rounded-lg">
//                       <h5 className="font-medium text-gray-900 mb-2">Heart Notes</h5>
//                       <p className="text-sm text-gray-600">Rich & Complex core</p>
//                     </div>
//                     <div className="p-4 bg-gray-50 rounded-lg">
//                       <h5 className="font-medium text-gray-900 mb-2">Base Notes</h5>
//                       <p className="text-sm text-gray-600">Deep & Lasting foundation</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "ingredients" && (
//               <div className="space-y-4">
//                 <h3 className="text-xl font-semibold">Ingredients & Safety</h3>
//                 <div className="space-y-3 text-gray-700">
//                   <p>• IFRA-certified fragrance oils</p>
//                   <p>• Premium imported aromatic compounds</p>
//                   <p>• Ethyl alcohol (denatured)</p>
//                   <p>• Purified water</p>
//                 </div>
//                 <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
//                   <p className="text-sm text-amber-800">
//                     <MdInfo className="inline mr-2" />
//                     Patch test recommended. Avoid direct sunlight after application.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {activeTab === "reviews" && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-xl font-semibold">Customer Reviews</h3>
//                   <Button variant="outline" className="rounded-lg">
//                     Write a Review
//                   </Button>
//                 </div>

//                 {/* Rating Summary */}
//                 <div className="bg-gray-50 p-6 rounded-xl">
//                   <div className="flex items-center gap-6">
//                     <div className="text-center">
//                       <div className="text-4xl font-bold text-gray-900 mb-1">4.5</div>
//                       <div className="flex items-center gap-1 justify-center mb-1">
//                         {renderStars()}
//                       </div>
//                       <div className="text-sm text-gray-600">11,940 reviews</div>
//                     </div>

//                     <div className="flex-1 space-y-2">
//                       {[5, 4, 3, 2, 1].map((stars) => (
//                         <div key={stars} className="flex items-center gap-3">
//                           <span className="text-sm w-8">{stars}★</span>
//                           <div className="flex-1 bg-gray-200 rounded-full h-2">
//                             <div
//                               className="bg-yellow-400 h-2 rounded-full"
//                               style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
//                             ></div>
//                           </div>
//                           <span className="text-sm text-gray-600 w-12">
//                             {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Sample Reviews */}
//                 <div className="space-y-4">
//                   {[
//                     { name: "Priya M.", rating: 5, text: "Amazing longevity! Lasts the entire day and receives compliments." },
//                     { name: "Rahul S.", rating: 4, text: "Great value for money. Very close to the original fragrance." },
//                     { name: "Anjali K.", rating: 5, text: "Love the packaging and the scent is exactly what I wanted." }
//                   ].map((review, index) => (
//                     <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
//                       <div className="flex items-center gap-3 mb-2">
//                         <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center font-semibold">
//                           {review.name.charAt(0)}
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-900">{review.name}</div>
//                           <div className="flex items-center gap-1">
//                             {renderStars(review.rating)}
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-gray-700 ml-13">{review.text}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products */}
//         <div>
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="text-3xl font-bold text-gray-900">You Might Also Like</h3>
//             <Link
//               to="/product"
//               className="text-blue-600 hover:text-blue-700 font-medium underline"
//             >
//               View All Products
//             </Link>
//           </div>
//           <NewProducts />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

//* version 3

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { GoArrowLeft } from "react-icons/go";
// import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
// import { MdInfo, MdLocalShipping, MdSecurity, MdVerified } from "react-icons/md";
// import { IoShareSocial } from "react-icons/io5";
// import { BiMinus, BiPlus } from "react-icons/bi";
// import NewProducts from "@/components/NewProducts";
// import { perfumeData } from "@/PerfumeData";

// // Minimalist luxury icons
// import { FaClock, FaCertificate, FaOilCan, FaFlag } from "react-icons/fa";

// import {
//   Breadcrumb,
//   BreadcrumbEllipsis,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// const ProductDetails = () => {
//   const { productid } = useParams();
//   const product = perfumeData.find((item) => item.id === Number(productid));

//   const [selectedImage, setSelectedImage] = useState(product?.image);
//   const [isInCart, setIsInCart] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("20ML");
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center p-12 max-w-md">
//           <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">
//             PRODUCT NOT FOUND
//           </h2>
//           <p className="text-gray-600 mb-8 leading-relaxed">
//             The product you are seeking does not exist in our collection.
//           </p>
//           <Link
//             to="/product"
//             className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-gray-900 transition-colors tracking-wide font-light"
//           >
//             <GoArrowLeft />
//             RETURN TO COLLECTION
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   useEffect(() => {
//     setSelectedImage(product?.image);
//   }, [product]);

//   useEffect(() => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

//     if (product?.id) {
//       setIsInCart(existingCart.includes(product.id));
//       setIsWishlisted(existingWishlist.includes(product.id));
//     }
//   }, [product?.id]);

//   const handleAddToCart = async (productId) => {
//     setIsLoading(true);

//     setTimeout(() => {
//       const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       if (!existingCart.includes(productId)) {
//         existingCart.push(productId);
//         localStorage.setItem("cart", JSON.stringify(existingCart));
//         window.dispatchEvent(new Event("cartUpdated"));
//         setIsInCart(true);
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   const toggleWishlist = () => {
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//     if (isWishlisted) {
//       const updatedWishlist = existingWishlist.filter(id => id !== product.id);
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       setIsWishlisted(false);
//     } else {
//       existingWishlist.push(product.id);
//       localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
//       setIsWishlisted(true);
//     }
//   };

//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />);
//     }
//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-xs" />
//       );
//     }
//     return stars;
//   };

//   const sizeOptions = [
//     { size: "20ML", price: Math.floor(product.price_inr * 0.6), available: true },
//     { size: "100ML", price: Math.floor(product.price_inr * 1.8), available: false }
//   ];

//   const getCurrentPrice = () => {
//     const selectedOption = sizeOptions.find(option => option.size === selectedSize);
//     return selectedOption ? selectedOption.price : product.price_inr;
//   };

//   const features = [
//     { icon: FaClock, label: "LONG LASTING" },
//     { icon: FaCertificate, label: "IFRA-CERTIFIED" },
//     { icon: FaOilCan, label: "IMPORTED OILS" },
//     { icon: FaFlag, label: "MADE IN INDIA" }
//   ];

//   return (
//     <div className="productdetails bg-white min-h-screen">
//       {/* Minimalist back navigation */}
//       {/* <div className="fixed top-20 left-8 z-20">
//         <Link
//           to="/product"
//           className="inline-flex items-center gap-3 bg-white border border-gray-200 px-6 py-3 hover:bg-gray-50 transition-colors tracking-wide text-sm font-light"
//         >
//           <GoArrowLeft className="text-lg" />
//           BACK
//         </Link>
//       </div> */}

//       <div className="max-w-7xl mx-auto pt-28 pb-16 px-8">
//         {/* Minimalist breadcrumb */}
//         <div className="mb-12">
//           <div className="flex items-center gap-2 text-sm text-gray-500 tracking-wide">
//             <Link to="/" className="hover:text-black transition-colors">HOME</Link>
//             <span>/</span>
//             <Link to="/product" className="hover:text-black transition-colors">PRODUCTS</Link>
//             <span>/</span>
//             <span className="text-black font-medium">{product?.name.toUpperCase()}</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           {/* Product Images Section */}
//           <div className="lg:col-span-7">
//             <div className="grid grid-cols-12 gap-6">
//               {/* Thumbnail column */}
//               <div className="col-span-2">
//                 <div className="space-y-4 sticky top-32">
//                   {product.multi_images?.map((img, index) => (
//                     <div
//                       key={index}
//                       className="group cursor-pointer"
//                       onMouseEnter={() => setSelectedImage(img)}
//                     >
//                       <div className={`relative overflow-hidden border transition-all duration-300 ${
//                         selectedImage === img
//                           ? "border-black"
//                           : "border-gray-200 hover:border-gray-400"
//                       }`}>
//                         <img
//                           src={img}
//                           alt={`${product.name} view ${index + 1}`}
//                           className="w-full aspect-square object-cover"
//                         />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Main image */}
//               <div className="col-span-10">
//                 <div className="relative bg-gray-50 border border-gray-100">
//                   <img
//                     src={selectedImage}
//                     alt={product.name}
//                     className="w-full h-[600px] object-cover"
//                   />

//                   {/* Floating action buttons */}
//                   <div className="absolute top-6 right-6 flex flex-col gap-3">
//                     <button
//                       onClick={toggleWishlist}
//                       className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
//                       aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                     >
//                       {isWishlisted ? (
//                         <FaHeart className="text-red-500 text-lg" />
//                       ) : (
//                         <FaRegHeart className="text-gray-600 text-lg group-hover:text-red-500 transition-colors" />
//                       )}
//                     </button>
//                     <button
//                       className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
//                       aria-label="Share product"
//                     >
//                       <IoShareSocial className="text-gray-600 text-lg" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Product Information Section */}
//           <div className="lg:col-span-5">
//             <div className="sticky top-32 space-y-8">
//               {/* Product Title */}
//               <div>
//                 <h1 className="text-4xl lg:text-5xl font-light font-[Doren] text-black mb-4 uppercase tracking-[0.2em] leading-tight">
//                   {product.name}
//                 </h1>

//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars()}</div>
//                     <span className="text-sm text-gray-600 font-light">4.5</span>
//                   </div>
//                   <div className="h-3 w-px bg-gray-300"></div>
//                   <span className="text-sm text-gray-600 font-light">11,940 reviews</span>
//                 </div>

//                 <p className="text-gray-700 font-light text-lg tracking-wide">
//                   EAU DE PARFUM
//                 </p>
//                 <p className="text-gray-600 font-light tracking-wide">
//                   Inspired by <span className="text-black font-medium">{product.inspired_by}</span>
//                 </p>
//               </div>

//               {/* Scent Intensity - Minimalist */}
//               <div className="border-t border-b border-gray-200 py-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-sm font-medium tracking-wide text-gray-900">SCENT INTENSITY</span>
//                   <span className="text-sm font-light text-gray-600">SIGNIFICANT</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-8 h-1 bg-black"></div>
//                   <div className="w-8 h-1 bg-gray-600"></div>
//                   <div className="w-8 h-1 bg-gray-300"></div>
//                   <div className="w-8 h-1 bg-gray-200"></div>
//                 </div>
//               </div>

//               {/* Size Selection - Luxury minimalist */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-4">SELECT SIZE</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {sizeOptions.map((option) => (
//                     <button
//                       key={option.size}
//                       disabled={!option.available}
//                       onClick={() => setSelectedSize(option.size)}
//                       className={`relative p-6 border transition-all duration-200 ${
//                         selectedSize === option.size
//                           ? "border-black bg-gray-50"
//                           : option.available
//                           ? "border-gray-200 hover:border-gray-400"
//                           : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
//                       }`}
//                     >
//                       <div className="text-center">
//                         <div className="text-lg font-light text-gray-900 mb-2 tracking-wide">
//                           {option.size}
//                         </div>
//                         <div className="text-sm text-gray-600 font-light">
//                           ₹{option.price}
//                         </div>
//                         {!option.available && (
//                           <div className="text-xs text-gray-400 font-light mt-2 tracking-wide">
//                             COMING SOON
//                           </div>
//                         )}
//                       </div>

//                       {selectedSize === option.size && option.available && (
//                         <div className="absolute top-2 right-2 w-3 h-3 bg-black"></div>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Section - Clean & Minimal */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="flex items-end justify-between mb-8">
//                   <div>
//                     <div className="flex items-center gap-4 mb-2">
//                       <span className="text-gray-400 text-lg font-light line-through">
//                         ₹{Math.floor(getCurrentPrice() + 100)}
//                       </span>
//                       <span className="text-xs text-gray-600 font-medium tracking-wide border border-gray-300 px-2 py-1">
//                         10% OFF
//                       </span>
//                     </div>
//                     <div className="flex items-center text-4xl font-light text-black tracking-wide">
//                       <RiMoneyRupeeCircleFill className="mr-2" />
//                       {getCurrentPrice() * quantity}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2 font-light tracking-wide uppercase">
//                       Inclusive of all taxes
//                     </p>
//                   </div>

//                   {/* Quantity - Minimalist */}
//                   <div className="flex items-center">
//                     <span className="text-sm font-medium tracking-wide text-gray-900 mr-4">QTY</span>
//                     <div className="flex items-center border border-gray-300">
//                       <button
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity <= 1}
//                       >
//                         <BiMinus className="text-sm" />
//                       </button>
//                       <span className="px-6 py-3 min-w-[60px] text-center font-light">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity >= 5}
//                       >
//                         <BiPlus className="text-sm" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons - Luxury Style */}
//                 <div className="space-y-4">
//                   <Button
//                     onClick={() => handleAddToCart(product.id)}
//                     disabled={isInCart || isLoading}
//                     className={`w-full py-6 text-sm tracking-[0.2em] font-medium transition-all duration-300 ${
//                       isInCart
//                         ? "bg-gray-800 text-white cursor-default"
//                         : "bg-black hover:bg-gray-900 text-white"
//                     }`}
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center gap-3">
//                         <div className="w-4 h-4 border border-white border-t-transparent animate-spin"></div>
//                         ADDING TO CART
//                       </div>
//                     ) : isInCart ? (
//                       "ADDED TO CART"
//                     ) : (
//                       "ADD TO CART"
//                     )}
//                   </Button>

//                   <Button
//                     variant="outline"
//                     className="w-full py-6 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm tracking-[0.2em] font-medium"
//                   >
//                     BUY NOW
//                   </Button>
//                 </div>
//               </div>

//               {/* Features - Minimal Grid */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="grid grid-cols-2 gap-6">
//                   {features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="text-center py-6 border border-gray-100 hover:border-gray-300 transition-colors"
//                     >
//                       <feature.icon className="text-2xl text-gray-700 mb-3 mx-auto" />
//                       <span className="text-xs font-medium text-gray-900 tracking-wide">
//                         {feature.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trust Indicators - Ultra Minimal */}
//               <div className="border-t border-gray-200 pt-6">
//                 <div className="flex items-center justify-between text-xs text-gray-600 font-light tracking-wide">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500"></div>
//                     <span>FREE SHIPPING</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500"></div>
//                     <span>SECURE PAYMENT</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-purple-500"></div>
//                     <span>AUTHENTIC</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Description - Minimal Tabs */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
//               {/* Description */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   DESCRIPTION
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed font-light">
//                   A sophisticated interpretation inspired by {product.inspired_by}.
//                   Crafted with the finest imported oils, this Eau de Parfum delivers
//                   an uncompromising olfactory experience that embodies luxury and refinement.
//                 </p>
//               </div>

//               {/* Fragrance Notes */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   NOTES
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">TOP</h4>
//                     <p className="text-sm text-gray-600 font-light">Fresh & Luminous</p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">HEART</h4>
//                     <p className="text-sm text-gray-600 font-light">Rich & Complex</p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">BASE</h4>
//                     <p className="text-sm text-gray-600 font-light">Deep & Lasting</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Care Instructions */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   CARE
//                 </h3>
//                 <div className="space-y-3 text-sm text-gray-600 font-light">
//                   <p>• Store in cool, dry place</p>
//                   <p>• Avoid direct sunlight</p>
//                   <p>• Apply to pulse points</p>
//                   <p>• Patch test recommended</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section - Minimal */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-between mb-12">
//               <h3 className="text-2xl font-light tracking-wide text-gray-900">
//                 CUSTOMER REVIEWS
//               </h3>
//               <button className="text-sm text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-light tracking-wide">
//                 WRITE REVIEW
//               </button>
//             </div>

//             {/* Rating overview */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//               <div className="text-center md:text-left">
//                 <div className="text-6xl font-light text-gray-900 mb-2">4.5</div>
//                 <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
//                   {renderStars()}
//                 </div>
//                 <p className="text-sm text-gray-600 font-light tracking-wide">
//                   BASED ON 11,940 REVIEWS
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 {[5, 4, 3, 2, 1].map((stars) => (
//                   <div key={stars} className="flex items-center gap-4">
//                     <span className="text-sm text-gray-600 w-8">{stars}★</span>
//                     <div className="flex-1 bg-gray-200 h-1">
//                       <div
//                         className="bg-black h-1 transition-all duration-500"
//                         style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-600 w-12">
//                       {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Sample reviews */}
//             <div className="space-y-8">
//               {[
//                 { initial: "P", name: "PRIYA M.", rating: 5, text: "Exceptional longevity and projection. A true luxury experience that rivals the original." },
//                 { initial: "R", name: "RAHUL S.", rating: 4, text: "Outstanding value proposition. The quality exceeds expectations for this price point." },
//                 { initial: "A", name: "ANJALI K.", rating: 5, text: "Sophisticated packaging and an exquisite fragrance. Highly recommended." }
//               ].map((review, index) => (
//                 <div key={index} className="border-b border-gray-100 pb-8 last:border-b-0">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-medium text-gray-700 text-sm">
//                       {review.initial}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <span className="font-medium text-gray-900 text-sm tracking-wide">
//                           {review.name}
//                         </span>
//                         <div className="flex items-center gap-1">
//                           {renderStars(review.rating)}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 font-light leading-relaxed">
//                         {review.text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="flex items-center justify-between">
//             <h3 className="text-5xl font-[Doren] tracking-wide text-gray-900">
//               YOU MIGHT ALSO LIKE
//             </h3>
//             <Link
//               to="/product"
//               className="text-lg text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-[Doren] tracking-wide"
//             >
//               VIEW ALL
//             </Link>
//           </div>
//           <NewProducts />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

//* version 4

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { GoArrowLeft } from "react-icons/go";
// import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
// import { IoShareSocial } from "react-icons/io5";
// import { BiMinus, BiPlus } from "react-icons/bi";
// import NewProducts from "@/components/NewProducts";
// import { perfumeData } from "@/PerfumeData";

// // Minimalist luxury icons
// import { FaClock, FaCertificate, FaOilCan, FaFlag } from "react-icons/fa";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import ShareDialog from "@/components/ShareDialog";

// const ProductDetails = () => {
//   const { productid } = useParams();
//   const product = perfumeData.find((item) => item.id === Number(productid));

//   const [selectedImage, setSelectedImage] = useState(product?.image);
//   const [isInCart, setIsInCart] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("20ML");
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isShareOpen, setIsShareOpen] = useState(false); // State for share dialog

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center p-12 max-w-md">
//           <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">
//             FRAGRANCE NOT FOUND
//           </h2>
//           <p className="text-gray-600 mb-8 leading-relaxed">
//             The fragrance you are seeking does not exist in our collection.
//           </p>
//           <Link
//             to="/product"
//             className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-gray-900 transition-colors tracking-wide font-light"
//           >
//             <GoArrowLeft />
//             RETURN TO COLLECTION
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   useEffect(() => {
//     setSelectedImage(product?.image);
//   }, [product]);

//   useEffect(() => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

//     if (product?.id) {
//       setIsInCart(existingCart.includes(product.id));
//       setIsWishlisted(existingWishlist.includes(product.id));
//     }
//   }, [product?.id]);

//   const handleAddToCart = async (productId) => {
//     setIsLoading(true);

//     setTimeout(() => {
//       const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       if (!existingCart.includes(productId)) {
//         existingCart.push(productId);
//         localStorage.setItem("cart", JSON.stringify(existingCart));
//         window.dispatchEvent(new Event("cartUpdated"));
//         setIsInCart(true);
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   const toggleWishlist = () => {
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//     if (isWishlisted) {
//       const updatedWishlist = existingWishlist.filter(id => id !== product.id);
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       setIsWishlisted(false);
//     } else {
//       existingWishlist.push(product.id);
//       localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
//       setIsWishlisted(true);
//     }
//   };

//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />);
//     }
//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-xs" />
//       );
//     }
//     return stars;
//   };

//   const sizeOptions = [
//     { size: "20ML", price: Math.floor(product.price_inr * 0.6), available: true },
//     { size: "100ML", price: Math.floor(product.price_inr * 1.8), available: false }
//   ];

//   const getCurrentPrice = () => {
//     const selectedOption = sizeOptions.find(option => option.size === selectedSize);
//     return selectedOption ? selectedOption.price : product.price_inr;
//   };

//   const features = [
//     { icon: FaClock, label: "LONG LASTING" },
//     { icon: FaCertificate, label: "IFRA-CERTIFIED" },
//     { icon: FaOilCan, label: "IMPORTED OILS" },
//     { icon: FaFlag, label: "MADE IN INDIA" }
//   ];

//   return (
//     <div className="productdetails bg-white min-h-screen">
//       <div className="max-w-7xl mx-auto pt-28 pb-16 px-8">
//         {/* Breadcrumb */}
//         <div className="mb-12">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/" className="hover:text-black transition-colors">HOME</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/product" className="hover:text-black transition-colors">FRAGRANCES</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbPage>{product?.name.toUpperCase()}</BreadcrumbPage>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           {/* Product Images Section - Sticky */}
//           <div className="lg:col-span-7 sticky top-28 self-start">
//             <div className="flex flex-col gap-6">
//               {/* Main image */}
//               <div className="relative bg-gray-50 border border-gray-100">
//                 <img
//                   src={selectedImage}
//                   alt={product.name}
//                   className="w-full h-[600px] object-cover"
//                 />

//                 {/* Floating action buttons */}
//                 <div className="absolute top-6 right-6 flex flex-col gap-3">
//                   <button
//                     onClick={toggleWishlist}
//                     className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
//                     aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                   >
//                     {isWishlisted ? (
//                       <FaHeart className="text-red-500 text-lg" />
//                     ) : (
//                       <FaRegHeart className="text-gray-600 text-lg group-hover:text-red-500 transition-colors" />
//                     )}
//                   </button>
//                   <button
//                     onClick={() => setIsShareOpen(true)}
//                     className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
//                     aria-label="Share fragrance"
//                   >
//                     <IoShareSocial className="text-gray-600 text-lg" />
//                   </button>
//                 </div>
//               </div>

//               {/* Thumbnails - Responsive */}
//               <div className="flex flex-row gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:gap-4">
//                 {product.multi_images?.map((img, index) => (
//                   <div
//                     key={index}
//                     className="group cursor-pointer flex-shrink-0"
//                     onClick={() => setSelectedImage(img)}
//                   >
//                     <div className={`relative overflow-hidden border transition-all duration-300 ${
//                       selectedImage === img
//                         ? "border-black"
//                         : "border-gray-200 hover:border-gray-400"
//                     }`}>
//                       <img
//                         src={img}
//                         alt={`${product.name} view ${index + 1}`}
//                         className="w-20 h-20 lg:w-full lg:h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Product Information Section */}
//           <div className="lg:col-span-5">
//             <div className="space-y-8">
//               {/* Product Title */}
//               <div>
//                 <h1 className="text-4xl lg:text-5xl font-light font-[Doren] text-black mb-4 uppercase tracking-[0.2em] leading-tight">
//                   {product.name}
//                 </h1>

//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars()}</div>
//                     <span className="text-sm text-gray-600 font-light">4.5</span>
//                   </div>
//                   <div className="h-3 w-px bg-gray-300"></div>
//                   <span className="text-sm text-gray-600 font-light">11,940 reviews</span>
//                 </div>

//                 <p className="text-gray-700 font-light text-lg tracking-wide">
//                   EAU DE PARFUM
//                 </p>
//                 <p className="text-gray-600 font-light tracking-wide">
//                   Inspired by <span className="text-black font-medium">{product.inspired_by}</span>
//                 </p>
//               </div>

//               {/* Scent Intensity */}
//               <div className="border-t border-b border-gray-200 py-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-sm font-medium tracking-wide text-gray-900">SCENT INTENSITY</span>
//                   <span className="text-sm font-light text-gray-600">SIGNIFICANT</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-8 h-1 bg-black"></div>
//                   <div className="w-8 h-1 bg-gray-600"></div>
//                   <div className="w-8 h-1 bg-gray-300"></div>
//                   <div className="w-8 h-1 bg-gray-200"></div>
//                 </div>
//               </div>

//               {/* Size Selection */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-4">SELECT SIZE</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {sizeOptions.map((option) => (
//                     <button
//                       key={option.size}
//                       disabled={!option.available}
//                       onClick={() => setSelectedSize(option.size)}
//                       className={`relative p-6 border transition-all duration-200 ${
//                         selectedSize === option.size
//                           ? "border-black bg-gray-50"
//                           : option.available
//                           ? "border-gray-200 hover:border-gray-400"
//                           : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
//                       }`}
//                     >
//                       <div className="text-center">
//                         <div className="text-lg font-light text-gray-900 mb-2 tracking-wide">
//                           {option.size}
//                         </div>
//                         <div className="text-sm text-gray-600 font-light">
//                           ₹{option.price}
//                         </div>
//                         {!option.available && (
//                           <div className="text-xs text-gray-400 font-light mt-2 tracking-wide">
//                             COMING SOON
//                           </div>
//                         )}
//                       </div>

//                       {selectedSize === option.size && option.available && (
//                         <div className="absolute top-2 right-2 w-3 h-3 bg-black"></div>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="flex items-end justify-between mb-8">
//                   <div>
//                     <div className="flex items-center gap-4 mb-2">
//                       <span className="text-gray-400 text-lg font-light line-through">
//                         ₹{Math.floor(getCurrentPrice() + 100)}
//                       </span>
//                       <span className="text-xs text-gray-600 font-medium tracking-wide border border-gray-300 px-2 py-1">
//                         10% OFF
//                       </span>
//                     </div>
//                     <div className="flex items-center text-4xl font-light text-black tracking-wide">
//                       <RiMoneyRupeeCircleFill className="mr-2" />
//                       {getCurrentPrice() * quantity}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2 font-light tracking-wide uppercase">
//                       Inclusive of all taxes
//                     </p>
//                   </div>

//                   {/* Quantity */}
//                   <div className="flex items-center">
//                     <span className="text-sm font-medium tracking-wide text-gray-900 mr-4">QTY</span>
//                     <div className="flex items-center border border-gray-300">
//                       <button
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity <= 1}
//                       >
//                         <BiMinus className="text-sm" />
//                       </button>
//                       <span className="px-6 py-3 min-w-[60px] text-center font-light">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity >= 5}
//                       >
//                         <BiPlus className="text-sm" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <Button
//                   onClick={() => handleAddToCart(product.id)}
//                   disabled={isInCart || isLoading}
//                   className={`w-full py-6 text-sm tracking-[0.2em] font-medium transition-all duration-300 ${
//                     isInCart
//                       ? "bg-gray-800 text-white cursor-default"
//                       : "bg-black hover:bg-gray-900 text-white"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center gap-3">
//                       <div className="w-4 h-4 border border-white border-t-transparent animate-spin"></div>
//                       ADDING TO CART
//                     </div>
//                   ) : isInCart ? (
//                     "ADDED TO CART"
//                   ) : (
//                     "ADD TO CART"
//                   )}
//                 </Button>
//               </div>

//               {/* Features */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="grid grid-cols-2 gap-6">
//                   {features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="text-center py-6 border border-gray-100 hover:border-gray-300 transition-colors"
//                     >
//                       <feature.icon className="text-2xl text-gray-700 mb-3 mx-auto" />
//                       <span className="text-xs font-medium text-gray-900 tracking-wide">
//                         {feature.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trust Indicators */}
//               <div className="border-t border-gray-200 pt-6">
//                 <div className="flex items-center justify-between text-xs text-gray-600 font-light tracking-wide">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500"></div>
//                     <span>FREE SHIPPING</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500"></div>
//                     <span>SECURE PAYMENT</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-purple-500"></div>
//                     <span>AUTHENTIC</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Share Dialog */}
//         <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} />

//         {/* Product Description */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
//               {/* Description */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   DESCRIPTION
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed font-light">
//                   A sophisticated interpretation inspired by {product.inspired_by}.
//                   Crafted with the finest imported oils, this Eau de Parfum delivers
//                   an uncompromising olfactory experience that embodies luxury and refinement.
//                 </p>
//               </div>

//               {/* Fragrance Notes */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   NOTES
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">TOP</h4>
//                     <p className="text-sm text-gray-600 font-light">Fresh & Luminous</p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">HEART</h4>
//                     <p className="text-sm text-gray-600 font-light">Rich & Complex</p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">BASE</h4>
//                     <p className="text-sm text-gray-600 font-light">Deep & Lasting</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Care Instructions */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   CARE
//                 </h3>
//                 <div className="space-y-3 text-sm text-gray-600 font-light">
//                   <p>• Store in cool, dry place</p>
//                   <p>• Avoid direct sunlight</p>
//                   <p>• Apply to pulse points</p>
//                   <p>• Patch test recommended</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-between mb-12">
//               <h3 className="text-2xl font-light tracking-wide text-gray-900">
//                 CUSTOMER REVIEWS
//               </h3>
//               <button className="text-sm text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-light tracking-wide">
//                 WRITE REVIEW
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//               <div className="text-center md:text-left">
//                 <div className="text-6xl font-light text-gray-900 mb-2">4.5</div>
//                 <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
//                   {renderStars()}
//                 </div>
//                 <p className="text-sm text-gray-600 font-light tracking-wide">
//                   BASED ON 11,940 REVIEWS
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 {[5, 4, 3, 2, 1].map((stars) => (
//                   <div key={stars} className="flex items-center gap-4">
//                     <span className="text-sm text-gray-600 w-8">{stars}★</span>
//                     <div className="flex-1 bg-gray-200 h-1">
//                       <div
//                         className="bg-black h-1 transition-all duration-500"
//                         style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-600 w-12">
//                       {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-8">
//               {[
//                 { initial: "P", name: "PRIYA M.", rating: 5, text: "Exceptional longevity and projection. A true luxury experience that rivals the original." },
//                 { initial: "R", name: "RAHUL S.", rating: 4, text: "Outstanding value proposition. The quality exceeds expectations for this price point." },
//                 { initial: "A", name: "ANJALI K.", rating: 5, text: "Sophisticated packaging and an exquisite fragrance. Highly recommended." }
//               ].map((review, index) => (
//                 <div key={index} className="border-b border-gray-100 pb-8 last:border-b-0">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-medium text-gray-700 text-sm">
//                       {review.initial}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <span className="font-medium text-gray-900 text-sm tracking-wide">
//                           {review.name}
//                         </span>
//                         <div className="flex items-center gap-1">
//                           {renderStars(review.rating)}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 font-light leading-relaxed">
//                         {review.text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="flex items-center justify-between">
//             <h3 className="text-5xl font-[Doren] tracking-wide text-gray-900">
//               YOU MIGHT ALSO LIKE
//             </h3>
//             <Link
//               to="/product"
//               className="text-lg text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-[Doren] tracking-wide"
//             >
//               VIEW ALL
//             </Link>
//           </div>
//           <NewProducts />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

//* Version 5

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { GoArrowLeft } from "react-icons/go";
// import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart } from "react-icons/fa";
// import { IoShareSocial } from "react-icons/io5";
// import { BiMinus, BiPlus } from "react-icons/bi";
// import NewProducts from "@/components/NewProducts";
// import { perfumeData } from "@/PerfumeData";
// import ShareDialog from "@/components/ShareDialog"; // Import ShareDialog
// import { motion, useScroll, useTransform } from "framer-motion"; // Add Framer Motion
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// // Minimalist luxury icons
// import { FaClock, FaCertificate, FaOilCan, FaFlag } from "react-icons/fa";

// const ProductDetails = () => {
//   const { productid } = useParams();
//   const product = perfumeData.find((item) => item.id === Number(productid));

//   const [selectedImage, setSelectedImage] = useState(product?.image);
//   const [isInCart, setIsInCart] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("20ML");
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isShareOpen, setIsShareOpen] = useState(false); // State for share dialog
//   const containerRef = useRef<HTMLDivElement>(null); // Ref for scroll container
//   const imagesRef = useRef<HTMLDivElement>(null); // Ref for image section

//   // Framer Motion scroll tracking
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Pin the image section until the right-side content is scrolled
//   const imagesTransform = useTransform(
//     scrollYProgress,
//     [0, 1],
//     ["translateY(0%)", "translateY(0%)"]
//   );

//   useEffect(() => {
//     setSelectedImage(product?.image);
//   }, [product]);

//   useEffect(() => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

//     if (product?.id) {
//       setIsInCart(existingCart.includes(product.id));
//       setIsWishlisted(existingWishlist.includes(product.id));
//     }
//   }, [product?.id]);

//   const handleAddToCart = async (productId) => {
//     setIsLoading(true);

//     setTimeout(() => {
//       const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       if (!existingCart.includes(productId)) {
//         existingCart.push(productId);
//         localStorage.setItem("cart", JSON.stringify(existingCart));
//         window.dispatchEvent(new Event("cartUpdated"));
//         setIsInCart(true);
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   const toggleWishlist = () => {
//     const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
//     if (isWishlisted) {
//       const updatedWishlist = existingWishlist.filter(id => id !== product.id);
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       setIsWishlisted(false);
//     } else {
//       existingWishlist.push(product.id);
//       localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
//       setIsWishlisted(true);
//     }
//   };

//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />);
//     }
//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-xs" />
//       );
//     }
//     return stars;
//   };

//   const sizeOptions = [
//     { size: "20ML", price: Math.floor(product.price_inr * 0.6), available: true },
//     { size: "100ML", price: Math.floor(product.price_inr * 1.8), available: false }
//   ];

//   const getCurrentPrice = () => {
//     const selectedOption = sizeOptions.find(option => option.size === selectedSize);
//     return selectedOption ? selectedOption.price : product.price_inr;
//   };

//   const features = [
//     { icon: FaClock, label: "LONG LASTING" },
//     { icon: FaCertificate, label: "IFRA-CERTIFIED" },
//     { icon: FaOilCan, label: "IMPORTED OILS" },
//     { icon: FaFlag, label: "MADE IN INDIA" }
//   ];

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center p-12 max-w-md">
//           <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">
//             FRAGRANCE NOT FOUND
//           </h2>
//           <p className="text-gray-600 mb-8 leading-relaxed">
//             The fragrance you are seeking does not exist in our collection.
//           </p>
//           <Link
//             to="/product"
//             className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-gray-900 transition-colors tracking-wide font-light"
//           >
//             <GoArrowLeft />
//             RETURN TO COLLECTION
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="productdetails bg-white min-h-screen">
//       <div className="max-w-7xl mx-auto pt-28 pb-16 px-8">
//         {/* Breadcrumb */}
//         <div className="mb-12">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/" className="hover:text-black transition-colors">HOME</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/product" className="hover:text-black transition-colors">FRAGRANCES</Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbPage>{product?.name.toUpperCase()}</BreadcrumbPage>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           {/* Product Images Section - Pinned with Framer Motion */}
//           <motion.div
//             ref={imagesRef}
//             style={{ transform: imagesTransform }}
//             className="lg:col-span-7 sticky top-28 self-start"
//           >
//             <div className="flex flex-col gap-6">
//               {/* Main image */}
//               <div className="relative bg-gray-50 border border-gray-100">
//                 <img
//                   src={selectedImage}
//                   alt={product.name}
//                   className="w-full h-[600px] object-cover"
//                 />

//                 {/* Floating action buttons */}
//                 <div className="absolute top-6 right-6 flex flex-col gap-3">
//                   <button
//                     onClick={toggleWishlist}
//                     className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
//                     aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                   >
//                     {isWishlisted ? (
//                       <FaHeart className="text-red-500 text-lg" />
//                     ) : (
//                       <FaRegHeart className="text-gray-600 text-lg group-hover:text-red-500 transition-colors" />
//                     )}
//                   </button>
//                   <button
//                     onClick={() => setIsShareOpen(true)}
//                     className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
//                     aria-label="Share fragrance"
//                   >
//                     <IoShareSocial className="text-gray-600 text-lg" />
//                   </button>
//                 </div>
//               </div>

//               {/* Thumbnails - Responsive */}
//               <div className="flex flex-row gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:gap-4">
//                 {product.multi_images?.map((img, index) => (
//                   <div
//                     key={index}
//                     className="group cursor-pointer flex-shrink-0"
//                     onClick={() => setSelectedImage(img)}
//                   >
//                     <div className={`relative overflow-hidden border transition-all duration-300 ${
//                       selectedImage === img
//                         ? "border-black"
//                         : "border-gray-200 hover:border-gray-400"
//                     }`}>
//                       <img
//                         src={img}
//                         alt={`${product.name} view ${index + 1}`}
//                         className="w-20 h-20 lg:w-full lg:h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Product Information Section */}
//           <div className="lg:col-span-5">
//             <div className="space-y-8">
//               {/* Product Title */}
//               <div>
//                 <h1 className="text-4xl lg:text-5xl font-light font-[Doren] text-black mb-4 uppercase tracking-[0.2em] leading-tight">
//                   {product.name}
//                 </h1>

//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">{renderStars()}</div>
//                     <span className="text-sm text-gray-600 font-light">4.5</span>
//                   </div>
//                   <div className="h-3 w-px bg-gray-300"></div>
//                   <span className="text-sm text-gray-600 font-light">11,940 reviews</span>
//                 </div>

//                 <p className="text-gray-700 font-light text-lg tracking-wide">
//                   EAU DE PARFUM
//                 </p>
//                 <p className="text-gray-600 font-light tracking-wide">
//                   Inspired by <span className="text-black font-medium">{product.inspired_by}</span>
//                 </p>
//               </div>

//               {/* Scent Intensity */}
//               <div className="border-t border-b border-gray-200 py-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-sm font-medium tracking-wide text-gray-900">SCENT INTENSITY</span>
//                   <span className="text-sm font-light text-gray-600">SIGNIFICANT</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-8 h-1 bg-black"></div>
//                   <div className="w-8 h-1 bg-gray-600"></div>
//                   <div className="w-8 h-1 bg-gray-300"></div>
//                   <div className="w-8 h-1 bg-gray-200"></div>
//                 </div>
//               </div>

//               {/* Size Selection */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-4">SELECT SIZE</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {sizeOptions.map((option) => (
//                     <button
//                       key={option.size}
//                       disabled={!option.available}
//                       onClick={() => setSelectedSize(option.size)}
//                       className={`relative p-6 border transition-all duration-200 ${
//                         selectedSize === option.size
//                           ? "border-black bg-gray-50"
//                           : option.available
//                           ? "border-gray-200 hover:border-gray-400"
//                           : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
//                       }`}
//                     >
//                       <div className="text-center">
//                         <div className="text-lg font-light text-gray-900 mb-2 tracking-wide">
//                           {option.size}
//                         </div>
//                         <div className="text-sm text-gray-600 font-light">
//                           ₹{option.price}
//                         </div>
//                         {!option.available && (
//                           <div className="text-xs text-gray-400 font-light mt-2 tracking-wide">
//                             COMING SOON
//                           </div>
//                         )}
//                       </div>

//                       {selectedSize === option.size && option.available && (
//                         <div className="absolute top-2 right-2 w-3 h-3 bg-black"></div>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="flex items-end justify-between mb-8">
//                   <div>
//                     <div className="flex items-center gap-4 mb-2">
//                       <span className="text-gray-400 text-lg font-light line-through">
//                         ₹{Math.floor(getCurrentPrice() + 100)}
//                       </span>
//                       <span className="text-xs text-gray-600 font-medium tracking-wide border border-gray-300 px-2 py-1">
//                         10% OFF
//                       </span>
//                     </div>
//                     <div className="flex items-center text-4xl font-light text-black tracking-wide">
//                       <RiMoneyRupeeCircleFill className="mr-2" />
//                       {getCurrentPrice() * quantity}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2 font-light tracking-wide uppercase">
//                       Inclusive of all taxes
//                     </p>
//                   </div>

//                   {/* Quantity */}
//                   <div className="flex items-center">
//                     <span className="text-sm font-medium tracking-wide text-gray-900 mr-4">QTY</span>
//                     <div className="flex items-center border border-gray-300">
//                       <button
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity <= 1}
//                       >
//                         <BiMinus className="text-sm" />
//                       </button>
//                       <span className="px-6 py-3 min-w-[60px] text-center font-light">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity >= 5}
//                       >
//                         <BiPlus className="text-sm" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <Button
//                   onClick={() => handleAddToCart(product.id)}
//                   disabled={isInCart || isLoading}
//                   className={`w-full py-6 text-sm tracking-[0.2em] font-medium transition-all duration-300 ${
//                     isInCart
//                       ? "bg-gray-800 text-white cursor-default"
//                       : "bg-black hover:bg-gray-900 text-white"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center gap-3">
//                       <div className="w-4 h-4 border border-white border-t-transparent animate-spin"></div>
//                       ADDING TO CART
//                     </div>
//                   ) : isInCart ? (
//                     "ADDED TO CART"
//                   ) : (
//                     "ADD TO CART"
//                   )}
//                 </Button>
//               </div>

//               {/* Features */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="grid grid-cols-2 gap-6">
//                   {features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="text-center py-6 border border-gray-100 hover:border-gray-300 transition-colors"
//                     >
//                       <feature.icon className="text-2xl text-gray-700 mb-3 mx-auto" />
//                       <span className="text-xs font-medium text-gray-900 tracking-wide">
//                         {feature.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trust Indicators */}
//               <div className="border-t border-gray-200 pt-6">
//                 <div className="flex items-center justify-between text-xs text-gray-600 font-light tracking-wide">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500"></div>
//                     <span>FREE SHIPPING</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500"></div>
//                     <span>SECURE PAYMENT</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-purple-500"></div>
//                     <span>AUTHENTIC</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Share Dialog */}
//         <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} />

//         {/* Product Description */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   DESCRIPTION
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed font-light">
//                   A sophisticated interpretation inspired by {product.inspired_by}.
//                   Crafted with the finest imported oils, this Eau de Parfum delivers
//                   an uncompromising olfactory experience that embodies luxury and refinement.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   NOTES
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">TOP</h4>
//                     <p className="text-sm text-gray-600 font-light">Fresh & Luminous</p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">HEART</h4>
//                     <p className="text-sm text-gray-600 font-light">Rich & Complex</p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">BASE</h4>
//                     <p className="text-sm text-gray-600 font-light">Deep & Lasting</p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   CARE
//                 </h3>
//                 <div className="space-y-3 text-sm text-gray-600 font-light">
//                   <p>• Store in cool, dry place</p>
//                   <p>• Avoid direct sunlight</p>
//                   <p>• Apply to pulse points</p>
//                   <p>• Patch test recommended</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-between mb-12">
//               <h3 className="text-2xl font-light tracking-wide text-gray-900">
//                 CUSTOMER REVIEWS
//               </h3>
//               <button className="text-sm text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-light tracking-wide">
//                 WRITE REVIEW
//               </button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//               <div className="text-center md:text-left">
//                 <div className="text-6xl font-light text-gray-900 mb-2">4.5</div>
//                 <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
//                   {renderStars()}
//                 </div>
//                 <p className="text-sm text-gray-600 font-light tracking-wide">
//                   BASED ON 11,940 REVIEWS
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 {[5, 4, 3, 2, 1].map((stars) => (
//                   <div key={stars} className="flex items-center gap-4">
//                     <span className="text-sm text-gray-600 w-8">{stars}★</span>
//                     <div className="flex-1 bg-gray-200 h-1">
//                       <div
//                         className="bg-black h-1 transition-all duration-500"
//                         style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-600 w-12">
//                       {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-8">
//               {[
//                 { initial: "P", name: "PRIYA M.", rating: 5, text: "Exceptional longevity and projection. A true luxury experience that rivals the original." },
//                 { initial: "R", name: "RAHUL S.", rating: 4, text: "Outstanding value proposition. The quality exceeds expectations for this price point." },
//                 { initial: "A", name: "ANJALI K.", rating: 5, text: "Sophisticated packaging and an exquisite fragrance. Highly recommended." }
//               ].map((review, index) => (
//                 <div key={index} className="border-b border-gray-100 pb-8 last:border-b-0">
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-medium text-gray-700 text-sm">
//                       {review.initial}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <span className="font-medium text-gray-900 text-sm tracking-wide">
//                           {review.name}
//                         </span>
//                         <div className="flex items-center gap-1">
//                           {renderStars(review.rating)}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 font-light leading-relaxed">
//                         {review.text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="flex items-center justify-between">
//             <h3 className="text-5xl font-[Doren] tracking-wide text-gray-900">
//               YOU MIGHT ALSO LIKE
//             </h3>
//             <Link
//               to="/product"
//               className="text-lg text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-[Doren] tracking-wide"
//             >
//               VIEW ALL
//             </Link>
//           </div>
//           <NewProducts />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

//* Version 6

// import React, { useEffect, useState, useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { GoArrowLeft } from "react-icons/go";
// import {
//   FaStar,
//   FaStarHalfAlt,
//   FaRegStar,
//   FaHeart,
//   FaRegHeart,
// } from "react-icons/fa";
// import {
//   IoShareSocial,
//   IoChevronForward,
//   IoChevronBack,
// } from "react-icons/io5";
// import { BiMinus, BiPlus } from "react-icons/bi";
// import NewProducts from "@/components/NewProducts";
// import { perfumeData } from "@/PerfumeData";
// import ShareDialog from "@/components/ShareDialog";
// import { motion, useScroll, useTransform } from "framer-motion";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// // Minimalist luxury icons
// import { FaClock, FaCertificate, FaOilCan, FaFlag } from "react-icons/fa";

// const ProductDetails = () => {
//   const { productid } = useParams();
//   const product = perfumeData.find((item) => item.id === Number(productid));

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isInCart, setIsInCart] = useState(false);
//   const [selectedSize, setSelectedSize] = useState("20ML");
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isShareOpen, setIsShareOpen] = useState(false);
//   const [isLargeScreen, setIsLargeScreen] = useState(false); // Track screen size
//   const containerRef = useRef<HTMLDivElement>(null);
//   const imagesRef = useRef<HTMLDivElement>(null);

//   // Check screen size for Framer Motion sticky behavior
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint in Tailwind (~1024px)
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // Framer Motion scroll tracking for sticky behavior (only on large screens)
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const imagesTransform = useTransform(
//     scrollYProgress,
//     [0, 1],
//     ["translateY(0%)", "translateY(0%)"]
//   );

//   useEffect(() => {
//     if (product?.multi_images) {
//       setCurrentIndex(0);
//     }
//   }, [product]);

//   useEffect(() => {
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingWishlist = JSON.parse(
//       localStorage.getItem("wishlist") || "[]"
//     );

//     if (product?.id) {
//       setIsInCart(existingCart.includes(product.id));
//       setIsWishlisted(existingWishlist.includes(product.id));
//     }
//   }, [product?.id]);

//   const handleAddToCart = async (productId) => {
//     setIsLoading(true);

//     setTimeout(() => {
//       const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       if (!existingCart.includes(productId)) {
//         existingCart.push(productId);
//         localStorage.setItem("cart", JSON.stringify(existingCart));
//         window.dispatchEvent(new Event("cartUpdated"));
//         setIsInCart(true);
//       }
//       setIsLoading(false);
//     }, 1000);
//   };

//   const toggleWishlist = () => {
//     const existingWishlist = JSON.parse(
//       localStorage.getItem("wishlist") || "[]"
//     );
//     if (isWishlisted) {
//       const updatedWishlist = existingWishlist.filter(
//         (id) => id !== product.id
//       );
//       localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//       setIsWishlisted(false);
//     } else {
//       existingWishlist.push(product.id);
//       localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
//       setIsWishlisted(true);
//     }
//   };

//   // Carousel navigation
//   const nextImage = () => {
//     setCurrentIndex((prev) =>
//       product?.multi_images ? (prev + 1) % product.multi_images.length : 0
//     );
//   };

//   const prevImage = () => {
//     setCurrentIndex((prev) =>
//       product?.multi_images
//         ? (prev - 1 + product.multi_images.length) % product.multi_images.length
//         : 0
//     );
//   };

//   const handleThumbnailClick = (index: number) => {
//     setCurrentIndex(index);
//   };

//   const renderStars = (rating = 4.5) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
//     }
//     if (hasHalfStar) {
//       stars.push(
//         <FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />
//       );
//     }
//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(
//         <FaRegStar key={`empty-${i}`} className="text-yellow-400 text-xs" />
//       );
//     }
//     return stars;
//   };

//   const sizeOptions = [
//     {
//       size: "20ML",
//       price: product ? Math.floor(product.price_inr) : 0,
//       available: true,
//     },
//     {
//       size: "100ML",
//       price: product ? Math.floor(product.price_inr * 3) : 0,
//       available: false,
//     },
//   ];

//   const getCurrentPrice = () => {
//     const selectedOption = sizeOptions.find(
//       (option) => option.size === selectedSize
//     );
//     return selectedOption ? selectedOption.price : product?.price_inr || 0;
//   };

//   const features = [
//     { icon: FaClock, label: "LONG LASTING" },
//     {
//       icon: FaCertificate,
//       label: "IFRA-CERTIFIED",
//       imageSrc: "/assets/ifra.svg",
//     },
//     { icon: FaOilCan, label: "IMPORTED OILS" },
//     { icon: FaFlag, label: "MADE IN INDIA", imageSrc: "/assets/India.png" },
//   ];

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center p-12 max-w-md">
//           <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-wide">
//             FRAGRANCE NOT FOUND
//           </h2>
//           <p className="text-gray-600 mb-8 leading-relaxed">
//             The fragrance you are seeking does not exist in our collection.
//           </p>
//           <Link
//             to="/product"
//             className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 hover:bg-gray-900 transition-colors tracking-wide font-light"
//           >
//             <GoArrowLeft />
//             RETURN TO COLLECTION
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div ref={containerRef} className="productdetails bg-white min-h-screen">
//       <div className="max-w-7xl mx-auto max-sm:pt-20 pt-28 pb-16 max-sm:px-2 px-8">
//         {/* Breadcrumb */}
//         <div className="max-sm:mb-4 mb-12">
//           <Breadcrumb>
//             <BreadcrumbList>
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link to="/" className="hover:text-black transition-colors">
//                     HOME
//                   </Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbItem>
//                 <BreadcrumbLink asChild>
//                   <Link
//                     to="/product"
//                     className="hover:text-black transition-colors"
//                   >
//                     FRAGRANCES
//                   </Link>
//                 </BreadcrumbLink>
//               </BreadcrumbItem>
//               <BreadcrumbSeparator />
//               <BreadcrumbPage>{product.name.toUpperCase()}</BreadcrumbPage>
//             </BreadcrumbList>
//           </Breadcrumb>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//           {/* Product Images Section - Sticky only on large screens */}
//           <motion.div
//             ref={imagesRef}
//             style={isLargeScreen ? { transform: imagesTransform } : {}}
//             className="lg:col-span-7 lg:sticky lg:top-28 lg:self-start"
//           >
//             <div className="flex flex-col gap-6">
//               {/* Main image with carousel controls */}
//               <div className="relative bg-gray-50 border border-gray-100">
//                 <img
//                   src={product.multi_images?.[currentIndex] || product.image}
//                   alt={`${product.name} view ${currentIndex + 1}`}
//                   className="w-full h-[600px] max-sm:h-[400px] object-cover"
//                 />

//                 {/* Carousel Navigation Buttons */}
//                 {product.multi_images && product.multi_images.length > 1 && (
//                   <>
//                     <button
//                       onClick={prevImage}
//                       className="absolute left-4 max-sm:left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
//                       aria-label="Previous image"
//                     >
//                       <IoChevronBack className="text-gray-600 text-lg" />
//                     </button>
//                     <button
//                       onClick={nextImage}
//                       className="absolute right-4 max-sm:right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
//                       aria-label="Next image"
//                     >
//                       <IoChevronForward className="text-gray-600 text-lg" />
//                     </button>
//                   </>
//                 )}

//                 {/* Floating action buttons */}
//                 <div className="absolute top-6 right-6 max-sm:top-3 max-sm:right-3 flex flex-col gap-3">
//                   <button
//                     onClick={toggleWishlist}
//                     className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
//                     aria-label={
//                       isWishlisted ? "Remove from wishlist" : "Add to wishlist"
//                     }
//                   >
//                     {isWishlisted ? (
//                       <FaHeart className="text-red-500 text-lg" />
//                     ) : (
//                       <FaRegHeart className="text-gray-600 text-lg group-hover:text-red-500 transition-colors" />
//                     )}
//                   </button>
//                   <button
//                     onClick={() => setIsShareOpen(true)}
//                     className="p-3 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
//                     aria-label="Share fragrance"
//                   >
//                     <IoShareSocial className="text-gray-600 text-lg" />
//                   </button>
//                 </div>
//               </div>

//               {/* Thumbnails - Responsive */}
//               <div className="flex flex-row gap-4 overflow-x-auto lg:grid lg:grid-cols-4 lg:gap-4">
//                 {product.multi_images?.map((img, index) => (
//                   <div
//                     key={index}
//                     className="group cursor-pointer flex-shrink-0"
//                     onClick={() => handleThumbnailClick(index)}
//                   >
//                     <div
//                       className={`relative overflow-hidden border transition-all duration-300 ${
//                         currentIndex === index
//                           ? "border-black"
//                           : "border-gray-200 hover:border-gray-400"
//                       }`}
//                     >
//                       <img
//                         src={img}
//                         alt={`${product.name} view ${index + 1}`}
//                         className="w-20 h-20 lg:w-full lg:h-full object-cover"
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Product Information Section */}
//           <div className="lg:col-span-5">
//             <div className="space-y-8">
//               {/* Product Title */}
//               <div>
//                 <h1 className="text-4xl lg:text-5xl font-light font-[Doren] text-black mb-4 tracking-widest uppercase">
//                   {product.name}
//                 </h1>

//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center gap-1">
//                       {renderStars()}
//                     </div>
//                     <span className="text-sm text-gray-600 font-light">
//                       4.5
//                     </span>
//                   </div>
//                   <div className="h-3 w-px bg-gray-300"></div>
//                   <span className="text-sm text-gray-600 font-light">
//                     11,940 reviews
//                   </span>
//                 </div>

//                 <p className="text-gray-700 font-light text-lg tracking-wide">
//                   EAU DE PARFUM
//                 </p>
//                 <p className="text-gray-600 font-light tracking-wide">
//                   Inspired by{" "}
//                   <span className="text-black font-medium">
//                     {product.inspired_by}
//                   </span>
//                 </p>
//               </div>

//               {/* Scent Intensity */}
//               <div className="border-t border-b border-gray-200 py-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-sm font-medium tracking-wide text-gray-900">
//                     SCENT INTENSITY
//                   </span>
//                   <span className="text-sm font-light text-gray-600">
//                     SIGNIFICANT
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <div className="w-4 h-4 bg-black"></div>
//                   <div className="w-4 h-4 bg-gray-600"></div>
//                   <div className="w-4 h-4 bg-gray-300"></div>
//                   <div className="w-4 h-4 bg-gray-200"></div>
//                 </div>
//               </div>

//               {/* Size Selection */}
//               <div>
//                 <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-4">
//                   SELECT SIZE
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {sizeOptions.map((option) => (
//                     <button
//                       key={option.size}
//                       disabled={!option.available}
//                       onClick={() => setSelectedSize(option.size)}
//                       className={`relative border transition-all duration-200 ${
//                         selectedSize === option.size
//                           ? "border-black bg-gray-50"
//                           : option.available
//                           ? "border-gray-200 hover:border-gray-400"
//                           : "border-gray-100 bg-gray-50 cursor-not-allowed opacity-50"
//                       }`}
//                     >
//                       <div className="text-center">
//                         <div className="text-lg font-light text-gray-900 mb-2 tracking-wide">
//                           {option.size}
//                         </div>
//                         <div className="text-sm text-gray-600 font-light">
//                           ₹{option.price}
//                         </div>
//                         {!option.available && (
//                           <div className="text-xs text-gray-400 font-light mt-2 tracking-wide">
//                             COMING SOON
//                           </div>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Section */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="flex items-end justify-between mb-8">
//                   <div>
//                     <div className="flex items-center gap-4 mb-2">
//                       <span className="text-gray-400 text-lg font-light line-through">
//                         ₹{Math.floor(getCurrentPrice() + 100)}
//                       </span>
//                       <span className="text-xs text-gray-600 font-medium tracking-wide border border-gray-300 px-2 py-1">
//                         22% OFF
//                       </span>
//                     </div>
//                     <div className="flex items-center text-4xl font-light text-black tracking-wide">
//                       ₹{getCurrentPrice() * quantity}
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2 font-light tracking-wide uppercase">
//                       Inclusive of all taxes
//                     </p>
//                   </div>

//                   {/* Quantity */}
//                   <div className="flex items-center">
//                     <span className="text-sm font-medium tracking-wide text-gray-900 mr-4">
//                       QTY
//                     </span>
//                     <div className="flex items-center border border-gray-300">
//                       <button
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity <= 1}
//                       >
//                         <BiMinus className="text-sm" />
//                       </button>
//                       <span className="px-6 py-3 min-w-[60px] text-center font-light">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={() => setQuantity(quantity + 1)}
//                         className="p-3 hover:bg-gray-100 transition-colors"
//                         disabled={quantity >= 5}
//                       >
//                         <BiPlus className="text-sm" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <Button
//                   onClick={() => handleAddToCart(product.id)}
//                   disabled={isInCart || isLoading}
//                   className={`w-full py-6 text-xl tracking-[0.2em] font-[Doren] font-medium transition-all duration-300 ${
//                     isInCart
//                       ? "bg-gray-800 text-white cursor-default"
//                       : "bg-black hover:bg-gray-900 text-white"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center gap-3">
//                       <div className="w-4 h-4 border font-[Doren] border-white border-t-transparent animate-spin"></div>
//                       ADDING TO CART
//                     </div>
//                   ) : isInCart ? (
//                     "ADDED TO CART"
//                   ) : (
//                     "ADD TO CART"
//                   )}
//                 </Button>
//               </div>

//               {/* Features */}
//               <div className="border-t border-gray-200 pt-8">
//                 <div className="grid grid-cols-2 gap-6">
//                   {features.map((feature, index) => (
//                     <div
//                       key={index}
//                       className="text-center py-6 border border-gray-100 hover:border-gray-300 transition-colors"
//                     >
//                       {feature.imageSrc ? (
//                         <img
//                           src={feature?.imageSrc}
//                           className="h-6 w-14 mb-3 object-contain mx-auto"
//                         />
//                       ) : (
//                         <feature.icon className="text-2xl text-gray-700 mb-3 mx-auto" />
//                       )}
//                       <span className="text-xs font-medium text-gray-900 tracking-wide">
//                         {feature.label}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trust Indicators */}
//               <div className="border-t border-gray-200 pt-6">
//                 <div className="flex items-center justify-between text-xs text-gray-600 font-light tracking-wide">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500"></div>
//                     <span>FREE SHIPPING</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-blue-500"></div>
//                     <span>SECURE PAYMENT</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-purple-500"></div>
//                     <span>AUTHENTIC</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Share Dialog */}
//         <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} />

//         {/* Product Description */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   DESCRIPTION
//                 </h3>
//                 <p className="text-gray-700 leading-relaxed font-light">
//                   A sophisticated interpretation inspired by{" "}
//                   {product.inspired_by}. Crafted with the finest imported oils,
//                   this Eau de Parfum delivers an uncompromising olfactory
//                   experience that embodies luxury and refinement.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   NOTES
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">
//                       TOP
//                     </h4>
//                     <p className="text-sm text-gray-600 font-light">
//                       Fresh & Luminous
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">
//                       HEART
//                     </h4>
//                     <p className="text-sm text-gray-600 font-light">
//                       Rich & Complex
//                     </p>
//                   </div>
//                   <div>
//                     <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">
//                       BASE
//                     </h4>
//                     <p className="text-sm text-gray-600 font-light">
//                       Deep & Lasting
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
//                   CARE
//                 </h3>
//                 <div className="space-y-3 text-sm text-gray-600 font-light">
//                   <p>• Store in cool, dry place</p>
//                   <p>• Avoid direct sunlight</p>
//                   <p>• Apply to pulse points</p>
//                   <p>• Patch test recommended</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Reviews Section */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="max-w-4xl mx-auto">
//             <div className="flex items-center justify-between max-sm:justify-center mb-12">
//               <h3 className="text-2xl font-light tracking-wide text-gray-900">
//                 CUSTOMER REVIEWS
//               </h3>
//               {/* <button className="text-sm text-gray-600 border-b border-gray-300 hover:border-black transition-colors font-light tracking-wide">
//                 WRITE REVIEW
//               </button> */}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
//               <div className="text-center md:text-left">
//                 <div className="text-6xl font-light text-gray-900 mb-2">
//                   4.5
//                 </div>
//                 <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
//                   {renderStars()}
//                 </div>
//                 <p className="text-sm text-gray-600 font-light tracking-wide">
//                   BASED ON 11,940 REVIEWS
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 {[5, 4, 3, 2, 1].map((stars) => (
//                   <div key={stars} className="flex items-center gap-4">
//                     <span className="text-sm text-gray-600 w-8">{stars}★</span>
//                     <div className="flex-1 bg-gray-200 h-1">
//                       <div
//                         className="bg-black h-1 transition-all duration-500"
//                         style={{
//                           width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%`,
//                         }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-600 w-12">
//                       {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-8">
//               {[
//                 {
//                   initial: "P",
//                   name: "PRIYA M.",
//                   rating: 5,
//                   text: "Exceptional longevity and projection. A true luxury experience that rivals the original.",
//                 },
//                 {
//                   initial: "R",
//                   name: "RAHUL S.",
//                   rating: 4,
//                   text: "Outstanding value proposition. The quality exceeds expectations for this price point.",
//                 },
//                 {
//                   initial: "A",
//                   name: "ANJALI K.",
//                   rating: 5,
//                   text: "Sophisticated packaging and an exquisite fragrance. Highly recommended.",
//                 },
//               ].map((review, index) => (
//                 <div
//                   key={index}
//                   className="border-b border-gray-100 pb-8 last:border-b-0"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-medium text-gray-700 text-sm">
//                       {review.initial}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <span className="font-medium text-gray-900 text-sm tracking-wide">
//                           {review.name}
//                         </span>
//                         <div className="flex items-center gap-1">
//                           {renderStars(review.rating)}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 font-light leading-relaxed">
//                         {review.text}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-24 border-t border-gray-200 pt-16">
//           <div className="flex items-center justify-between">
//             <h3 className="text-5xl font-[Doren] tracking-wide text-gray-900">
//               YOU MIGHT ALSO LIKE
//             </h3>
//             <Link
//               to="/product"
//               className="text-lg text-gray-600 border-b max-sm:hidden border-gray-300 hover:border-black transition-colors font-[Doren] tracking-wide"
//             >
//               VIEW ALL
//             </Link>
//           </div>
//           <NewProducts />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


//* Version 7

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
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

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
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (isWishlisted) {
      const updatedWishlist = existingWishlist.filter((id) => id !== product.id);
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
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-xs" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400 text-xs" />);
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
    const selectedOption = sizeOptions.find((option) => option.size === selectedSize);
    return selectedOption ? selectedOption.price : product?.price_inr || 0;
  };

  const features = [
    { icon: FaClock, label: "LONG LASTING" },
    { icon: FaCertificate, label: "IFRA-CERTIFIED", imageSrc: "/assets/ifra.svg" },
    { icon: FaOilCan, label: "IMPORTED OILS" },
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
                  <Link to="/product" className="hover:text-black transition-colors">
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
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
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
                    <div className="flex items-center gap-1">{renderStars()}</div>
                    <span className="text-sm text-gray-600 font-light">4.5</span>
                  </div>
                  <div className="h-3 w-px bg-gray-300"></div>
                  <span className="text-sm text-gray-600 font-light">11,940 reviews</span>
                </div>

                <p className="text-gray-700 font-light text-lg tracking-wide">
                  EAU DE PARFUM
                </p>
                <p className="text-gray-600 font-light tracking-wide">
                  Inspired by <span className="text-black font-medium">{product.inspired_by}</span>
                </p>
              </div>

              {/* Scent Intensity */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium tracking-wide text-gray-900">SCENT INTENSITY</span>
                  <span className="text-sm font-light text-gray-600">SIGNIFICANT</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-black"></div>
                  <div className="w-4 h-4 bg-gray-600"></div>
                  <div className="w-4 h-4 bg-gray-300"></div>
                  <div className="w-4 h-4 bg-gray-200"></div>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium tracking-wide text-gray-900 mb-4">SELECT SIZE</h3>
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
                        <div className="text-sm text-gray-600 font-light">₹{option.price}</div>
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
                    <span className="text-sm font-medium tracking-wide text-gray-900 mr-4">QTY</span>
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
                  className={`w-full py-6 text-xl tracking-[0.2em] font-[Doren] font-semibold transition-all duration-300 ${
                    isInCart
                      ? "bg-gray-800 text-white cursor-default"
                      : "bg-black hover:bg-gray-900 text-white"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border border-white border-t-transparent animate-spin"></div>
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
                <div className="flex items-center justify-between text-xs text-gray-600 font-light tracking-wide">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500"></div>
                    <span>FREE SHIPPING</span>
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div>
                <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
                  DESCRIPTION
                </h3>
                <p className="text-gray-700 leading-relaxed font-light">
                  A sophisticated interpretation inspired by {product.inspired_by}. Crafted with
                  the finest imported oils, this Eau de Parfum delivers an uncompromising olfactory
                  experience that embodies luxury and refinement.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
                  NOTES
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">TOP</h4>
                    <p className="text-sm text-gray-600 font-light">Fresh & Luminous</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">HEART</h4>
                    <p className="text-sm text-gray-600 font-light">Rich & Complex</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-2 tracking-wide">BASE</h4>
                    <p className="text-sm text-gray-600 font-light">Deep & Lasting</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium tracking-[0.2em] text-gray-900 mb-6 uppercase">
                  CARE
                </h3>
                <div className="space-y-3 text-sm text-gray-600 font-light">
                  <p>• Store in cool, dry place</p>
                  <p>• Avoid direct sunlight</p>
                  <p>• Apply to pulse points</p>
                  <p>• Patch test recommended</p>
                </div>
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
                <div className="text-6xl font-light text-gray-900 mb-2">4.5</div>
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
                        style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 5}%` }}
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
                  initial: "P",
                  name: "SOHAIL S",
                  rating: 5,
                  text: "Exceptional longevity and projection. A true luxury experience that rivals the original.",
                },
                {
                  initial: "A",
                  name: "SANJAY S.",
                  rating: 5,
                  text: "Sophisticated packaging and an exquisite fragrance. Highly recommended.",
                },
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-8 last:border-b-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 flex items-center justify-center font-medium text-gray-700 text-sm">
                      {review.initial}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900 text-sm tracking-wide">
                          {review.name}
                        </span>
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                      </div>
                      <p className="text-gray-700 font-light leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          <NewProducts  />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
