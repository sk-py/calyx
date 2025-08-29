// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";
// import { Button } from "@/components/ui/button";
// import { GoArrowLeft } from "react-icons/go";
// import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
// import { MdInfo } from "react-icons/md";
// import NewProducts from "@/components/NewProducts";
// import { perfumeData } from "@/PerfumeData";

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
//       stars.push(<FaStar key={i} className="text-black text-sm" />);
//     }
//     if (hasHalfStar) {
//       stars.push(<FaStarHalfAlt key="half" className="text-black text-sm" />);
//     }
//     const emptyStars = 5 - Math.ceil(rating);
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<FaRegStar key={`empty-${i}`} className="text-black text-sm" />);
//     }
//     return stars;
//   };

//   return (
//     <div className="productdetails bg-white pt-20 min-h-screen">
//       <div className="max-w-7xl mx-auto p-4">
//         <div className="producttop mb-4">
//           <Link to="/product" className="text-black hover:underline">
//             <GoArrowLeft className="inline mr-1" /> Back
//           </Link>
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
//                   selectedImage === img
//                     ? "border-gray-400"
//                     : "border-gray-200"
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
//           <div className="flex-1 max-w-lg">
//             {/* Product name and badges */}
           

//             <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
//               {product.name}
//             </h1>

//             {/* Rating */}
//             <div className="flex items-center gap-2 mb-3">
//               <div className="flex items-center gap-1">
//                 {renderStars()}
//               </div>
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
//             {/* <p className="text-gray-600 text-sm mb-4">
//               (Retail price ₹{Math.floor(product.price_inr * 1.5)})
//             </p> */}

//             {/* Scent intensity */}
//             <div className="mb-4">
//               <p className="text-gray-700 mb-2">
//                 Scent Intensity Scale: <span className="text-gold font-medium">Significant</span>
//               </p>
//               <div className="flex items-center gap-1">
//                 <div className="w-4 h-4 bg-zinc-700 rounded-full"></div>
//                 <div className="w-4 h-4 bg-zinc-400 rounded-full"></div>
//                 <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
//                 <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
//               </div>
//             </div>

          

//             {/* Price section */}
//             <div className="mb-4">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="text-gray-500 text-lg">Reg: ₹{Math.floor(product.price_inr * 1.2)}</span>
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
//                 <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">NEW!</span>
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
//                     <div className={`w-3 h-3 rounded-full ${
//                       selectedSize === "20ML" ? "bg-" : "border border-gray-400"
//                     }`}></div>
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
//                     <div className={`w-3 h-3 rounded-full ${
//                       selectedSize === "100ML" ? "bg-red-500" : "border border-gray-400"
//                     }`}></div>
//                     100ML
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Add to cart button */}
//             <div className="mb-6">
//               {isInCart ? (
//                 <Button disabled className="w-full bg-gray-400 cursor-not-allowed py-4 text-lg rounded-full">
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

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { GoArrowLeft } from "react-icons/go";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import NewProducts from "@/components/NewProducts";
import { perfumeData } from "@/PerfumeData";

// Placeholder icons (replace with actual icons from the image)
import { FaClock } from "react-icons/fa"; // For "LONG LASTING"
import { FaCertificate } from "react-icons/fa"; // For "IFRA-CERTIFIED"
import { FaOilCan } from "react-icons/fa"; // For "IMPORTED OILS"
import { FaFlag } from "react-icons/fa"; // For "MADE IN INDIA"

const ProductDetails = () => {
  const { productid } = useParams();
  const product = perfumeData.find((item) => item.id === Number(productid));

  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("50ML");

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500">
        Product not found.{" "}
        <Link to="/product" className="underline">
          Go back
        </Link>
      </div>
    );
  }

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (product?.id && existingCart.includes(product.id)) {
      setIsInCart(true);
    }
  }, [product?.id]);

  const handleAddToCart = (productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!existingCart.includes(productId)) {
      existingCart.push(productId);
      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setIsInCart(true);
    }
  };

  // Mock rating component
  const renderStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-black text-sm" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-black text-sm" />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-black text-sm" />);
    }
    return stars;
  };

  return (
    <div className="productdetails bg-white pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <div className="producttop mb-4">
          <Link to="/product" className="text-black hover:underline">
            <GoArrowLeft className="inline mr-1" /> Back
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Thumbnail images */}
          <div className="flex lg:flex-col flex-row gap-2 lg:w-20">
            {product.multi_images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                className={`w-16 h-16 lg:w-20 lg:h-20 object-cover cursor-pointer border-2 rounded-lg transition-all duration-200 ${
                  selectedImage === img
                    ? "border-gray-400"
                    : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Center - Main product image */}
          <div className="flex-1 max-w-md">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-96 lg:h-[500px] object-contain bg-white rounded-lg shadow-sm"
            />
          </div>

          {/* Right side - Product details */}
          <div className="flex-1 max-w-2xl">
            {/* Product name and badges */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {renderStars()}
              </div>
              <span className="text-sm text-gray-600">11,940</span>
            </div>

            {/* Product type and size */}
            <p className="text-gray-700 mb-2">
              Eau de Parfum, Size: {product.size_ml}ml / 1.7oz
            </p>

            {/* Inspired by */}
            <p className="text-gray-700 mb-3">
              Inspired by <strong>{product.inspired_by}</strong>
            </p>


            {/* Scent intensity */}
            <div className="mb-4">
              <p className="text-gray-700 mb-2">
                Scent Intensity Scale: <span className="text-gold font-medium">Significant</span>
              </p>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-zinc-700 rounded-full"></div>
                <div className="w-4 h-4 bg-zinc-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
              </div>
            </div>

              {/* Specs boxes */}
            <div className="flex flex-row items-center justify-start gap-6 mb-6">
              <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
                <FaClock size={22}  className="text-gray-600 text-2xl mb-1" />
                <span className="text-sm text-gray-900 text-center">LONG LASTING</span>
              </div>
              <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
                <FaCertificate size={22} className="text-gray-600 text-2xl mb-1" />
                <span className="text-sm text-gray-900 text-center">IFRA-CERTIFIED</span>
              </div>
              <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
                <FaOilCan size={22} className="text-gray-600 text-2xl mb-1" />
                <span className="text-sm text-gray-900 text-center">IMPORTED OILS</span>
              </div>
              <div className="flex flex-col items-center justify-center w-32 h-20 bg-white border border-gray-200 rounded-md shadow-sm">
                <FaFlag size={22} className="text-gray-600 text-2xl mb-1" />
                <span className="text-sm text-gray-900 text-center">MADE IN INDIA</span>
              </div>
            </div>

            {/* Price section */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gray-500 text-lg">Reg: ₹{Math.floor(product.price_inr * 1.2)}</span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold flex items-center">
                    <RiMoneyRupeeCircleFill className="mr-1" />
                    {product.price_inr}
                  </div>
                  <div className="text-zinc-700 text-sm">10% OFF</div>
                </div>
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium">Select Size</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">NEW!</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedSize("20ML")}
                  className={`px-6 py-3 rounded-full border-2 transition-all ${
                    selectedSize === "20ML"
                      ? "border-zinc-500 bg-zinc-50 text-gold"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedSize === "20ML" ? "bg-" : "border border-gray-400"
                    }`}></div>
                    20ML
                  </div>
                </button>
                <button
                  disabled
                  title="Coming Soon!"
                  onClick={() => setSelectedSize("100ML")}
                  className={`px-6 py-3 rounded-full border-2 transition-all cursor-not-allowed `}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedSize === "100ML" ? "bg-red-500" : "border border-gray-400"
                    }`}></div>
                    100ML
                  </div>
                </button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="mb-6">
              {isInCart ? (
                <Button disabled className="w-full bg-gray-400 cursor-not-allowed py-4 text-lg rounded-full">
                  Added to Cart
                </Button>
              ) : (
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  className="w-full bg-zinc-800 hover:bg-zinc-900 py-4 text-lg rounded-full text-white font-medium"
                >
                  ADD TO CART
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* More products section */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6">Explore More</h3>
          <NewProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;