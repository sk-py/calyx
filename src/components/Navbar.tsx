// import type React from "react";
// import { useEffect, useRef, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Menu,
//   Search,
//   ShoppingCart,
//   User,
//   AtSignIcon as WhatsappIcon,
//   Instagram,
//   Facebook,
//   X,
//   Trash2,
//   Share2,
//   ShoppingBag,
//   Home,
// } from "lucide-react";
// import { type perfume_Data, perfumeData } from "@/PerfumeData";
// import gsap from "gsap";

// const Navbar: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [focusedIndex, setFocusedIndex] = useState(-1);
//   const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState<perfume_Data[]>([]);
//   const [sheetOpen, setSheetOpen] = useState(false);

//   const [menuOpen, setMenuOpen] = useState(false);


//   // Socials popover (desktop shown from Account icon, mobile from bottom bar)
//   const [showDesktopSocials, setShowDesktopSocials] = useState(false);
//   const desktopSocialRef = useRef<HTMLDivElement>(null);

//   const [showMobileSocials, setShowMobileSocials] = useState(false);
//   const mobileSocialRef = useRef<HTMLDivElement>(null);

//   const location = useLocation();
//   const navigate = useNavigate()

//   // Cart helpers
//   const updateCartCount = () => {
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartCount(cart.length || 0);
//   };

//   const syncCartItems = () => {
//     const cartIds: number[] = JSON.parse(localStorage.getItem("cart") || "[]");
//     const filteredProducts = perfumeData.filter((product) =>
//       cartIds.includes(product.id)
//     );
//     setCartItems(filteredProducts);
//   };

//   const handleRemove = (id: number) => {
//     const updatedCart = cartItems.filter((item) => item.id !== id);
//     setCartItems(updatedCart);
//     const newCartIds = updatedCart.map((item) => item.id);
//     localStorage.setItem("cart", JSON.stringify(newCartIds));
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   const generateWhatsAppLink = (items: perfume_Data[]) => {
//     if (items.length === 0) return "https://wa.me/9833949942";
//     const message = items
//       .map(
//         (item, index) =>
//           `${index + 1}. ${item.name} (${item.inspired_by}) - ₹${
//             item.price_inr
//           }`
//       )
//       .join("\n");
//     const finalMessage = `Hi, I'm interested in buying the following perfumes:\n\n${message}\n\nPlease let me know the next steps.`;
//     const encodedMessage = encodeURIComponent(finalMessage);
//     return `https://wa.me/9833949942?text=${encodedMessage}`;
//   };

//   // Search data + keyboard nav
//   const filteredData = perfumeData.filter((perfume) =>
//     perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setFocusedIndex((prev) =>
//         prev < filteredData.length - 1 ? prev + 1 : prev
//       );
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
//     }
//   };

//   // Effects: cart sync
//   useEffect(() => {
//     updateCartCount();
//     syncCartItems();
//     const onUpdate = () => {
//       updateCartCount();
//       syncCartItems();
//     };
//     window.addEventListener("cartUpdated", onUpdate);
//     return () => window.removeEventListener("cartUpdated", onUpdate);
//   }, []);

//   // Close things on route change
//   useEffect(() => {
//     setShowDesktopSocials(false);
//     setShowMobileSocials(false);
//     setDialogOpen(false);
//     setSearchTerm("");
//     setFocusedIndex(-1);
//     setSheetOpen(false);
//     setMenuOpen(false);
//   }, [location.pathname]);

//   // Click outside socials (desktop)
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         desktopSocialRef.current &&
//         !desktopSocialRef.current.contains(e.target as Node)
//       ) {
//         setShowDesktopSocials(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   // Click outside socials (mobile)
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         mobileSocialRef.current &&
//         !mobileSocialRef.current.contains(e.target as Node)
//       ) {
//         setShowMobileSocials(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
//       itemRefs.current[focusedIndex]?.scrollIntoView({
//         block: "nearest",
//         behavior: "smooth",
//       });
//     }
//   }, [focusedIndex]);

//   const desktopBarRef = useRef<HTMLDivElement>(null);
//   const mobileTopBarRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     let lastY = window.scrollY;
//     let ticking = false;

//     // Explicitly set initial state to ensure navbar is visible
//     const initializeNavbar = (el: HTMLElement | null) => {
//       if (!el) return;
//       el.style.transform = "translateY(0)";
//       el.style.opacity = "1";
//     };

//     // Initialize both desktop and mobile navbars
//     initializeNavbar(desktopBarRef.current);
//     initializeNavbar(mobileTopBarRef.current);

//     const animateTo = (el: HTMLElement | null, hidden: boolean) => {
//       if (!el) return;
//       const dy = hidden ? -(el.getBoundingClientRect().height + 16) : 0;
//       if (prefersReduced) {
//         el.style.transform = `translateY(${dy}px)`;
//         el.style.opacity = hidden ? "0.98" : "1";
//         return;
//       }
//       gsap.to(el, {
//         y: dy,
//         opacity: hidden ? 0.98 : 1,
//         duration: 0.45,
//         ease: "power3.out",
//       });
//     };

//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           const curr = window.scrollY;
//           const hidden = curr > lastY && curr > 120; // hide when scrolling down past threshold
//           animateTo(desktopBarRef.current, hidden);
//           animateTo(mobileTopBarRef.current, hidden);
//           lastY = curr;
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     // Only run initial animation if not reduced motion
//     if (!prefersReduced) {
//       if (desktopBarRef.current) {
//         gsap.fromTo(
//           desktopBarRef.current,
//           { y: -40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
//         );
//       }
//       if (mobileTopBarRef.current) {
//         gsap.fromTo(
//           mobileTopBarRef.current,
//           { y: -40, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
//         );
//       }
//     }

//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       {/* Desktop Navbar */}
//       <header
//         ref={desktopBarRef}
//         className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-black text-white backdrop-blur supports-[backdrop-filter]:bg-black"
//         role="banner"
//         aria-label="Main navigation"
//       >
//         <div className="mx-auto max-w-7xl px-4 lg:px-6">
//           {/* 3 columns: left tools, center brand, right actions */}
//           <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-20">
//             <div className="flex items-center font-[Doren] tracking-wider text-2xl gap-3">
//               <button
//                 aria-label="Open menu"
//                 className="p-2 rounded-md overflow-hidden relative uppercase transition"
//                 // onClick={() => setMenuOpen(true)}
//                 onClick={() => navigate(location.pathname == "/" ? "/product" : "/")}
//               >
//                 { location.pathname == "/" ? 'PRODUCTS' : 'HOME' }
//                 <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-black/60 to-transparent"></span>
//               </button>

//               {/* <button
//                 onClick={() => setDialogOpen(true)}
//                 aria-label="Open search"
//                 className="group hidden lg:flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition"
//               >
//                 <Search className="h-4 w-4 text-zinc-500" />
//                 <span className="opacity-90">Search</span>
//               </button> */}
//             </div>

//             {/* Center brand wordmark */}
//             <div className="justify-self-center">
//               <Link
//                 to="/"
//                 className="font-serif tracking-wide text-xl lg:text-2xl text-white select-none"
//                 aria-label="Home"
//               >
//                 <img src="/assets/images/CALYX-WHITE-LOGO.png" className="w-32 h-14 object-contain"  />
//               </Link>
//             </div>

//             {/* Right cluster: cart + account (account toggles socials popover to preserve Share functionality) */}
//             <div
//               className="justify-self-end relative flex items-center gap-1 sm:gap-2"
//               ref={desktopSocialRef}
//             >
//               <button
//                 onClick={() => setDialogOpen(true)}
//                 aria-label="Open search"
//                 className="max-sm:hidden p-2 rounded-md transition"
//               >
//                 <Search className="h-5 w-5 text-white" />
//               </button>

//               <button
//                 aria-label="Open cart"
//                 onClick={() => setSheetOpen(true)}
//                 className="relative p-2 rounded-md hover:scale-105 transition"
//               >
//                 <ShoppingBag className="h-5 w-5 " />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1.5 -right-1.5 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>

//               {/* <button
//                 aria-label="Account and share"
//                 onClick={() => setShowDesktopSocials((v) => !v)}
//                 className="p-2 rounded-md hover:scale-105 transition"
//               >
//                 <User className="h-5 w-5" />
//               </button> */}

//               {showDesktopSocials && (
//                 <div className="absolute right-0 top-12 bg-white rounded-xl p-3 shadow-lg z-50 flex flex-col gap-3 min-w-[180px] border">
//                   <div className="flex items-center gap-2 text-xs text-zinc-500 px-1">
//                     <Share2 className="h-3.5 w-3.5" />
//                     Quick Share
//                   </div>
//                   <button
//                     onClick={() =>
//                       window.open("https://wa.me/9833949942", "_blank")
//                     }
//                     className="flex items-center text-zinc-600 hover:text-zinc-800 gap-2 transition text-sm"
//                   >
//                     <WhatsappIcon className="text-green-600 h-4 w-4" /> WhatsApp
//                   </button>
//                   <a
//                     href="https://www.instagram.com/yourusername"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
//                   >
//                     <Instagram className="text-pink-600 h-4 w-4" /> Instagram
//                   </a>
//                   <a
//                     href="https://www.facebook.com/yourusername"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
//                   >
//                     <Facebook className="text-blue-600 h-4 w-4" /> Facebook
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Search Dialog (shared for desktop & mobile) */}
//       {dialogOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="relative w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg">
//             <div className="flex items-center justify-between pb-4">
//               <h2 className="text-sm md:text-base text-zinc-800 font-semibold">
//                 {"Discover the fragrance that defines you"}
//               </h2>
//               <button
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                 onClick={() => {
//                   setDialogOpen(false);
//                   setSearchTerm("");
//                   setFocusedIndex(-1);
//                 }}
//                 aria-label="Close"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
//             <div className="grid gap-4">
//               <div className="grid gap-3">
//                 <div className="relative w-full flex items-center">
//                   <Search className="absolute w-5 mx-2 text-zinc-500" />
//                   <input
//                     ref={inputRef}
//                     type="text"
//                     placeholder="Lavender"
//                     id="searchbox"
//                     name="searchbox"
//                     className="flex h-11 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 placeholder:italic font-sec font-semibold"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                   />
//                 </div>
//               </div>
//               <div className="grid gap-2 max-h-[50vh] overflow-y-auto">
//                 {filteredData.length === 0 ? (
//                   <p className="text-sm text-gray-500 px-2 h-[160px] flex items-center justify-center">
//                     No perfumes found
//                   </p>
//                 ) : (
//                   filteredData.map((perfume, index) => (
//                     <Link
//                       key={perfume.id}
//                       to={`/product/${perfume.id}`}
//                       ref={(el) => (itemRefs.current[index] = el)}
//                       className={`block py-2 px-2 rounded-md border-b border-slate-200 transition-all duration-200 hover:bg-zinc-50 ${
//                         index === focusedIndex ? "bg-zinc-100" : ""
//                       }`}
//                       onClick={() => setDialogOpen(false)}
//                     >
//                       <h3 className="text-sm font-medium">{perfume.name}</h3>
//                       <span className="font-sec text-gray-700 font-semibold text-xs">
//                         ({perfume.inspired_by})
//                       </span>
//                     </Link>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Sheet (shared) */}
//       {sheetOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-40 bg-black/50"
//             onClick={() => setSheetOpen(false)}
//           />
//           <div className="fixed top-0 right-0 h-full bg-white z-50 w-full sm:w-[400px] shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col justify-between">
//             <div>
//               <div className="flex items-center justify-between pb-4">
//                 <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
//                 <button
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={() => setSheetOpen(false)}
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>
//               {cartItems.length === 0 ? (
//                 <p className="text-center text-gray-500 mt-6 text-sm md:text-base">
//                   No products in cart.
//                 </p>
//               ) : (
//                 <div className="mt-4 space-y-3 md:space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
//                   {cartItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex gap-3 items-center border py-2 px-2 md:px-3 rounded-md"
//                     >
//                       <img
//                         src={item.image || "/placeholder.svg"}
//                         alt={item.name}
//                         className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-semibold text-sm md:text-lg truncate">
//                           {item.name}
//                         </h4>
//                         <p className="text-green-600 font-semibold mt-1 text-sm md:text-base">
//                           ₹ {item.price_inr}
//                         </p>
//                       </div>
//                       <button
//                         className="inline-flex items-center justify-center bg-red-500 text-white hover:bg-red-600 py-1 px-2 rounded-md text-xs md:text-sm"
//                         onClick={() => handleRemove(item.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             {cartItems.length > 0 && (
//               <div className="mt-4">
//                 <a
//                   href={generateWhatsAppLink(cartItems)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <button className="w-full h-11 bg-black text-white hover:bg-zinc-900 rounded-md text-sm md:text-base">
//                     Buy Now
//                   </button>
//                 </a>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* Mobile menu */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white z-50 w-64 sm:w-72 shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
//           menuOpen ? "translate-x-0" : "-translate-x-full"
//         } rounded-r-2xl`}
//       >
//         <button
//           onClick={() => setMenuOpen(false)}
//           className="text-right w-full font-bold text-black text-xl mb-4"
//         >
//           {"✕"}
//         </button>
//         <nav className="flex flex-col justify-between h-full">
//           <div className="flex flex-col gap-4">
//             <Link to="/" className="font-serif text-lg w-full mb-8 tracking-wide">
//             <img src="/assets/images/black logo.png" className="w-24 h-12 mx-auto object-contain" />
//           </Link>
//             <Link
//               to="/"
//               onClick={() => setMenuOpen(false)}
//               className="text-zinc-700 text-2xl uppercase tracking-wide text-center font-[Doren] hover:text-zinc-900 py-2 transition-colors"
//             >
//               Home
//             </Link>
//             <Link
//               to="/product"
//               onClick={() => setMenuOpen(false)}
//               className="text-zinc-700 text-2xl uppercase tracking-wide text-center font-[Doren] hover:text-zinc-900 py-2 transition-colors"
//             >
//               Products
//             </Link>
//             {/* <Link
//               to="/about"
//               onClick={() => setMenuOpen(false)}
//               className="text-zinc-700 hover:text-zinc-900 py-2 text-base transition-colors"
//             >
//               About
//             </Link> */}
//           </div>
//         </nav>
//       </div>
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       {/* Mobile/Tablet Bars (keep your original behavior, add hide-on-scroll to top bar) */}
//       <div
//         className="md:hidden fixed top-0 left-0 w-full z-40"
//         ref={mobileTopBarRef}
//       >
//         <div className="w-full h-14 px-3 flex items-center justify-between bg-white/90 backdrop-blur border-b">
//           <button
//             aria-label="Open menu"
//             onClick={() => setMenuOpen(true)}
//             className="p-2 -ml-1"
//           >
//             <Menu className="h-5 w-5" />
//           </button>
//           <Link to="/" className="font-serif text-lg tracking-wide">
//             <img src="/assets/images/black logo.png" className="w-24 h-12 object-contain" />
//           </Link>
//           <div className="flex items-center gap-2">
//             {/* <button
//               aria-label="Open search"
//               onClick={() => setDialogOpen(true)}
//               className="p-2"
//             >
//               <Search className="h-5 w-5" />
//             </button> */}
//             <button
//               aria-label="Open cart"
//               onClick={() => setSheetOpen(true)}
//               className="p-2 relative"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                   {cartCount}
//                 </span>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Bar */}
//       <div className="md:hidden fixed bottom-0 left-0 w-full py-3 flex items-center justify-around border-t border-gray-200 bg-white z-40">
//         <button
//           onClick={() => setSheetOpen(true)}
//           className="p-2 relative"
//           aria-label="Open cart"
//         >
//           <Home className={`text-xl`} />

//           {location.pathname == "/" && <span className={"" }></span>}
//           {/* {cartCount > 0 && (
//             <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
//               {cartCount}
//             </span>
//           )} */}
//         </button>
//         {/* <button
//           onClick={() => setSheetOpen(true)}
//           className="p-2 relative"
//           aria-label="Open cart"
//         >
//           <ShoppingCart className="text-xl" />
//           {cartCount > 0 && (
//             <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
//               {cartCount}
//             </span>
//           )}
//         </button> */}
//         <button
//           onClick={() => setDialogOpen(true)}
//           className="p-2"
//           aria-label="Open search"
//         >
//           <Search className="text-xl" />
//         </button>
//         <div className="relative" ref={mobileSocialRef}>
//           <button
//             className="p-2"
//             onClick={() => setShowMobileSocials((prev) => !prev)}
//             aria-label="Open share"
//           >
//             <Share2 className="text-xl" />
//           </button>
//           {showMobileSocials && (
//             <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg z-50 flex flex-col gap-3 min-w-[160px] border">
//               <button
//                 onClick={() =>
//                   window.open("https://wa.me/9833949942", "_blank")
//                 }
//                 className="flex items-center text-zinc-600 hover:text-zinc-800 gap-2 transition text-sm"
//               >
//                 <WhatsappIcon className="text-green-600 h-4 w-4" /> WhatsApp
//               </button>
//               <a
//                 href="https://www.instagram.com/yourusername"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
//               >
//                 <Instagram className="text-pink-600 h-4 w-4" /> Instagram
//               </a>
//               <a
//                 href="https://www.facebook.com/yourusername"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
//               >
//                 <Facebook className="text-blue-600 h-4 w-4" /> Facebook
//               </a>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;


import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  AtSignIcon as WhatsappIcon,
  Instagram,
  Facebook,
  X,
  Trash2,
  Share2,
  ShoppingBag,
  Home,
} from "lucide-react";
import { type perfume_Data, perfumeData } from "@/PerfumeData";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<perfume_Data[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDesktopSocials, setShowDesktopSocials] = useState(false);
  const desktopSocialRef = useRef<HTMLDivElement>(null);
  const [showMobileSocials, setShowMobileSocials] = useState(false);
  const mobileSocialRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false); // New state for scroll animation control
  const lastScrollY = useRef(0); // Track last scroll position
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Track timeout for debouncing

  const location = useLocation();
  const navigate = useNavigate();

  // Cart helpers
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length || 0);
  };

  const syncCartItems = () => {
    const cartIds: number[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const filteredProducts = perfumeData.filter((product) =>
      cartIds.includes(product.id)
    );
    setCartItems(filteredProducts);
  };

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    const newCartIds = updatedCart.map((item) => item.id);
    localStorage.setItem("cart", JSON.stringify(newCartIds));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const generateWhatsAppLink = (items: perfume_Data[]) => {
    if (items.length === 0) return "https://wa.me/9833949942";
    const message = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (${item.inspired_by}) - ₹${item.price_inr}`
      )
      .join("\n");
    const finalMessage = `Hi, I'm interested in buying the following perfumes:\n\n${message}\n\nPlease let me know the next steps.`;
    const encodedMessage = encodeURIComponent(finalMessage);
    return `https://wa.me/9833949942?text=${encodedMessage}`;
  };

  // Search data + keyboard nav
  const filteredData = perfumeData.filter((perfume) =>
    perfume.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < filteredData.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
  };

  // Effects: cart sync
  useEffect(() => {
    updateCartCount();
    syncCartItems();
    const onUpdate = () => {
      updateCartCount();
      syncCartItems();
    };
    window.addEventListener("cartUpdated", onUpdate);
    return () => window.removeEventListener("cartUpdated", onUpdate);
  }, []);

  // Close things on route change
  useEffect(() => {
    setShowDesktopSocials(false);
    setShowMobileSocials(false);
    setDialogOpen(false);
    setSearchTerm("");
    setFocusedIndex(-1);
    setSheetOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Click outside socials (desktop)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        desktopSocialRef.current &&
        !desktopSocialRef.current.contains(e.target as Node)
      ) {
        setShowDesktopSocials(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Click outside socials (mobile)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        mobileSocialRef.current &&
        !mobileSocialRef.current.contains(e.target as Node)
      ) {
        setShowMobileSocials(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileTopBarRef = useRef<HTMLDivElement>(null);

  // Scroll handling with throttling and debouncing
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    const initializeNavbar = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.willChange = "transform, opacity"; // Hint browser for optimization
      el.style.transform = "translate3d(0, 0, 0)";
      el.style.opacity = "1";
      el.style.transition = prefersReduced
        ? "none"
        : "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.45s ease-out";
    };

    // Initialize navbars
    initializeNavbar(desktopBarRef.current);
    initializeNavbar(mobileTopBarRef.current);

    const updateNavbar = (el: HTMLElement | null, hidden: boolean) => {
      if (!el || isScrolling) return;
      setIsScrolling(true);
      const height = el.getBoundingClientRect().height;
      el.style.transform = hidden ? `translate3d(0, -${height + 16}px, 0)` : "translate3d(0, 0, 0)";
      el.style.opacity = hidden ? "0.98" : "1";

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset scrolling flag after transition
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 450); // Match transition duration
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = Math.abs(currentScrollY - lastScrollY.current);

          // Only update if scroll change is significant (>10px)
          if (delta > 10) {
            const hidden = currentScrollY > lastScrollY.current && currentScrollY > 120;
            updateNavbar(desktopBarRef.current, hidden);
            updateNavbar(mobileTopBarRef.current, hidden);
            lastScrollY.current = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <header
        ref={desktopBarRef}
        className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-black text-white backdrop-blur supports-[backdrop-filter]:bg-black"
        role="banner"
        aria-label="Main navigation"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-20">
            <div className="flex items-center font-[Doren] tracking-wider text-2xl gap-3">
              <button
                aria-label="Navigate to products or home"
                className="p-2 rounded-md overflow-hidden relative uppercase transition"
                onClick={() => navigate(location.pathname === "/" ? "/product" : "/")}
              >
                {location.pathname === "/" ? "PRODUCTS" : "HOME"}
                <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-black/60 to-transparent"></span>
              </button>
            </div>
            <div className="justify-self-center">
              <Link
                to="/"
                className="font-serif tracking-wide text-xl lg:text-2xl text-white select-none"
                aria-label="Home"
              >
                <img src="/assets/images/CALYX-WHITE-LOGO.png" className="w-32 h-14 object-contain" />
              </Link>
            </div>
            <div className="justify-self-end relative flex items-center gap-1 sm:gap-2" ref={desktopSocialRef}>
              <button
                onClick={() => setDialogOpen(true)}
                aria-label="Open search"
                className="max-sm:hidden p-2 rounded-md transition"
              >
                <Search className="h-5 w-5 text-white" />
              </button>
              <button
                aria-label="Open cart"
                onClick={() => setSheetOpen(true)}
                className="relative p-2 rounded-md hover:scale-105 transition"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              {showDesktopSocials && (
                <div className="absolute right-0 top-12 bg-white rounded-xl p-3 shadow-lg z-50 flex flex-col gap-3 min-w-[180px] border">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 px-1">
                    <Share2 className="h-3.5 w-3.5" />
                    Quick Share
                  </div>
                  <button
                    onClick={() => window.open("https://wa.me/9833949942", "_blank")}
                    className="flex items-center text-zinc-600 hover:text-zinc-800 gap-2 transition text-sm"
                  >
                    <WhatsappIcon className="text-green-600 h-4 w-4" /> WhatsApp
                  </button>
                  <a
                    href="https://www.instagram.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
                  >
                    <Instagram className="text-pink-600 h-4 w-4" /> Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
                  >
                    <Facebook className="text-blue-600 h-4 w-4" /> Facebook
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-sm md:text-base text-zinc-800 font-semibold">
                Discover the fragrance that defines you
              </h2>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setDialogOpen(false);
                  setSearchTerm("");
                  setFocusedIndex(-1);
                }}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <div className="relative w-full flex items-center">
                  <Search className="absolute w-5 mx-2 text-zinc-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Lavender"
                    id="searchbox"
                    name="searchbox"
                    className="flex h-11 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 placeholder:italic font-sec font-semibold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
              <div className="grid gap-2 max-h-[50vh] overflow-y-auto">
                {filteredData.length === 0 ? (
                  <p className="text-sm text-gray-500 px-2 h-[160px] flex items-center justify-center">
                    No perfumes found
                  </p>
                ) : (
                  filteredData.map((perfume, index) => (
                    <Link
                      key={perfume.id}
                      to={`/product/${perfume.id}`}
                      ref={(el) => (itemRefs.current[index] = el)}
                      className={`block py-2 px-2 rounded-md border-b border-slate-200 transition-all duration-200 hover:bg-zinc-50 ${
                        index === focusedIndex ? "bg-zinc-100" : ""
                      }`}
                      onClick={() => setDialogOpen(false)}
                    >
                      <h3 className="text-sm font-medium">{perfume.name}</h3>
                      <span className="font-sec text-gray-700 font-semibold text-xs">
                        ({perfume.inspired_by})
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sheet */}
      {sheetOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSheetOpen(false)}
          />
          <div
            className="fixed top-0 right-0 h-full bg-white z-50 w-full sm:w-[400px] shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col justify-between"
            style={{
              willChange: "transform",
              transition: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "none"
                : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSheetOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-6 text-sm md:text-base">
                  No products in cart.
                </p>
              ) : (
                <div className="mt-4 space-y-3 md:space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 items-center border py-2 px-2 md:px-3 rounded-md"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm md:text-lg truncate">
                          {item.name}
                        </h4>
                        <p className="text-green-600 font-semibold mt-1 text-sm md:text-base">
                          ₹ {item.price_inr}
                        </p>
                      </div>
                      <button
                        className="inline-flex items-center justify-center bg-red-500 text-white hover:bg-red-600 py-1 px-2 rounded-md text-xs md:text-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="mt-4">
                <a
                  href={generateWhatsAppLink(cartItems)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full h-11 bg-black text-white hover:bg-zinc-900 rounded-md text-sm md:text-base">
                    Buy Now
                  </button>
                </a>
              </div>
            )}
          </div>
        </>
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 w-64 sm:w-72 shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } rounded-r-2xl`}
        style={{
          willChange: "transform",
          transition: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "none"
            : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="text-right w-full font-bold text-black text-xl mb-4"
        >
          ✕
        </button>
        <nav className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <Link to="/" className="font-serif text-lg w-full mb-8 tracking-wide">
              <img src="/assets/images/black logo.png" className="w-24 h-12 mx-auto object-contain" />
            </Link>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-700 text-2xl uppercase tracking-wide text-center font-[Doren] hover:text-zinc-900 py-2 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/product"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-700 text-2xl uppercase tracking-wide text-center font-[Doren] hover:text-zinc-900 py-2 transition-colors"
            >
              Products
            </Link>
          </div>
        </nav>
      </div>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet Top Bar */}
      <div
        className="md:hidden fixed top-0 left-0 w-full z-40"
        ref={mobileTopBarRef}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="w-full h-14 px-3 flex items-center justify-between bg-white/90 backdrop-blur border-b">
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-1"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="font-serif text-lg tracking-wide">
            <img src="/assets/images/black logo.png" className="w-24 h-12 object-contain" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              aria-label="Open cart"
              onClick={() => setSheetOpen(true)}
              className="p-2 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full py-3 flex items-center justify-around border-t border-gray-200 bg-white z-40">
        <button
          onClick={() => navigate("/")}
          className="p-2 relative"
          aria-label="Go to home"
        >
          <Home className="text-xl" />
        </button>
        <button
          onClick={() => setDialogOpen(true)}
          className="p-2"
          aria-label="Open search"
        >
          <Search className="text-xl" />
        </button>
        <div className="relative" ref={mobileSocialRef}>
          <button
            className="p-2"
            onClick={() => setShowMobileSocials((prev) => !prev)}
            aria-label="Open share"
          >
            <Share2 className="text-xl" />
          </button>
          {showMobileSocials && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg z-50 flex flex-col gap-3 min-w-[160px] border">
              <button
                onClick={() => window.open("https://wa.me/9833949942", "_blank")}
                className="flex items-center text-zinc-600 hover:text-zinc-800 gap-2 transition text-sm"
              >
                <WhatsappIcon className="text-green-600 h-4 w-4" /> WhatsApp
              </button>
              <a
                href="https://www.instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
              >
                <Instagram className="text-pink-600 h-4 w-4" /> Instagram
              </a>
              <a
                href="https://www.facebook.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition text-sm"
              >
                <Facebook className="text-blue-600 h-4 w-4" /> Facebook
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;