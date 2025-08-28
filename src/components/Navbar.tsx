// "use client"

// import type React from "react"
// import { useRef, useState, useEffect } from "react"
// import { Link, useLocation } from "react-router-dom"
// import {
//   Flower,
//   BoxIcon as Bottle,
//   NotebookIcon as Lotus,
//   AirVent,
//   Atom,
//   Search,
//   ShoppingCart,
//   Menu,
//   Trash2,
//   Share2,
//   PhoneIcon as Whatsapp,
//   Instagram,
//   Facebook,
//   X,
// } from "lucide-react"
// import { type perfume_Data, perfumeData } from "@/PerfumeData"
// import gsap from "gsap"

// const icons = [
//   <Flower key="flower" />,
//   <Bottle key="perfume" />,
//   <Lotus key="lotus" />,
//   <AirVent key="air" />,
//   <Atom key="wolf" />,
// ]

// const Navbar = () => {
//   // Search functionality state
//   const [searchTerm, setSearchTerm] = useState("")
//   const [focusedIndex, setFocusedIndex] = useState(-1)
//   const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
//   const inputRef = useRef<HTMLInputElement>(null)
//   const [dialogOpen, setDialogOpen] = useState(false)
//   const [iconIndex, setIconIndex] = useState(0)
//   const iconRef = useRef<HTMLDivElement>(null)

//   // Cart functionality state
//   const [cartCount, setCartCount] = useState(0)
//   const [cartItems, setCartItems] = useState<perfume_Data[]>([])
//   const [sheetOpen, setSheetOpen] = useState(false) // State for cart sheet

//   // Separate states for desktop and mobile social popovers
//   const [showDesktopSocials, setShowDesktopSocials] = useState(false)
//   const [showMobileSocials, setShowMobileSocials] = useState(false)
//   const desktopSocialRef = useRef<HTMLDivElement>(null)
//   const mobileSocialRef = useRef<HTMLDivElement>(null)

//   // Existing state
//   const [menuOpen, setMenuOpen] = useState(false)
//   const location = useLocation()

//   // Cart functions
//   const updateCartCount = () => {
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]")
//     setCartCount(cart.length || 0)
//   }

//   const syncCartItems = () => {
//     const cartIds: number[] = JSON.parse(localStorage.getItem("cart") || "[]")
//     const filteredProducts = perfumeData.filter((product) => cartIds.includes(product.id))
//     setCartItems(filteredProducts)
//   }

//   const handleRemove = (id: number) => {
//     const updatedCart = cartItems.filter((item) => item.id !== id)
//     setCartItems(updatedCart)
//     const newCartIds = updatedCart.map((item) => item.id)
//     localStorage.setItem("cart", JSON.stringify(newCartIds))
//     window.dispatchEvent(new Event("cartUpdated"))
//   }

//   const generateWhatsAppLink = (items: perfume_Data[]) => {
//     if (items.length === 0) return "https://wa.me/9833949942"
//     const message = items
//       .map((item, index) => `${index + 1}. ${item.name} (${item.inspired_by}) - ₹${item.price_inr}`)
//       .join("\n")
//     const finalMessage = `Hi, I'm interested in buying the following perfumes:\n\n${message}\n\nPlease let me know the next steps.`
//     const encodedMessage = encodeURIComponent(finalMessage)
//     return `https://wa.me/9833949942?text=${encodedMessage}`
//   }

//   // Search functions
//   const filteredData = perfumeData.filter((perfume) => perfume.name.toLowerCase().includes(searchTerm.toLowerCase()))

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       e.preventDefault()
//       setFocusedIndex((prev) => (prev < filteredData.length - 1 ? prev + 1 : prev))
//     } else if (e.key === "ArrowUp") {
//       e.preventDefault()
//       setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
//     }
//   }

//   // Effects
//   useEffect(() => {
//     updateCartCount()
//     syncCartItems()
//     const handleCartUpdate = () => {
//       updateCartCount()
//       syncCartItems()
//     }
//     window.addEventListener("cartUpdated", handleCartUpdate)
//     return () => {
//       window.removeEventListener("cartUpdated", handleCartUpdate)
//     }
//   }, [])

//   // Click outside for desktop socials
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (desktopSocialRef.current && !desktopSocialRef.current.contains(event.target as Node)) {
//         setShowDesktopSocials(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   // Click outside for mobile socials
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (mobileSocialRef.current && !mobileSocialRef.current.contains(event.target as Node)) {
//         setShowMobileSocials(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   useEffect(() => {
//     setShowDesktopSocials(false)
//     setShowMobileSocials(false)
//   }, [location.pathname])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       gsap.fromTo(
//         iconRef.current,
//         { y: 20, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.6,
//           ease: "power2.out",
//         },
//       )
//       setIconIndex((prev) => (prev + 1) % icons.length)
//     }, 2000)
//     return () => clearInterval(interval)
//   }, [])

//   useEffect(() => {
//     setFocusedIndex(-1)
//   }, [searchTerm])

//   useEffect(() => {
//     if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
//       itemRefs.current[focusedIndex]?.scrollIntoView({
//         block: "nearest",
//         behavior: "smooth",
//       })
//     }
//   }, [focusedIndex])

//   useEffect(() => {
//     setDialogOpen(false)
//     setSearchTerm("")
//     setFocusedIndex(-1)
//     setSheetOpen(false) // Close cart sheet on route change
//   }, [location.pathname])

//   return (
//     <>
//       {/* Desktop Navbar */}
//       <div className="navbar fixed top-0 left-0 w-full font-[poppins] z-30 bg-white text-black shadow-md hidden md:block">
//         <div className={`w-full p-4 mx-auto flex items-center justify-between gap-2`}>
//           <div className="font-light text-sm flex gap-5 items-center">
//             <img
//               src="/assets/images/black logo.png" // Always black logo
//               alt="Calyx Logo"
//               className="w-[4rem] lg:w-[6rem]"
//             />
//             <Link to="/" className={`hover:text-zinc-900 transition-colors duration-300 text-zinc-800`}>
//               Home
//             </Link>
//             <Link to="/search" className={`hover:text-zinc-900 transition-colors duration-300 text-zinc-800`}>
//               Products
//             </Link>
//             <Link to="/about" className={`hover:text-zinc-900 transition-colors duration-300 text-zinc-800`}>
//               About
//             </Link>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Custom Dialog for Search */}
//             <button
//               className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-300 bg-white text-black hover:bg-gray-100 py-2 px-4 lg:w-80 w-auto text-sm rounded-xl`}
//               onClick={() => setDialogOpen(true)}
//             >
//               <span className="hidden sm:inline">Search Here</span>
//               <Search className="sm:hidden text-base" />
//             </button>

//             {dialogOpen && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//                 <div className="relative w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg">
//                   <div className="flex items-center justify-between pb-4">
//                     <h2 className="text-sm md:text-base text-zinc-800 font-semibold">
//                       {"Discover the fragrance that defines you"}
//                     </h2>
//                     <button
//                       className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                       onClick={() => {
//                         setDialogOpen(false)
//                         setSearchTerm("")
//                         setFocusedIndex(-1)
//                       }}
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
//                   <div className="grid gap-4">
//                     <div className="grid gap-3">
//                       <div className="relative w-full flex items-center">
//                         <Search className="absolute w-4 md:w-6 mx-2 text-zinc-500" />
//                         <input
//                           ref={inputRef}
//                           type="text"
//                           placeholder="Lavender"
//                           id="searchbox"
//                           name="searchbox"
//                           className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 md:pl-10 py-2 placeholder:italic font-sec font-semibold text-sm md:text-lg"
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           onKeyDown={handleKeyDown}
//                         />
//                       </div>
//                     </div>
//                     <div className="grid gap-3 max-h-[50vh] md:max-h-[300px] overflow-y-auto">
//                       {filteredData.length === 0 ? (
//                         <p className="text-sm text-gray-500 px-2 h-[100px] md:h-[200px] flex items-center justify-center">
//                           No perfumes found
//                         </p>
//                       ) : (
//                         filteredData.map((perfume, index) => (
//                           <Link
//                             key={perfume.id}
//                             to={`/search/${perfume.id}`}
//                             ref={(el) => (itemRefs.current[index] = el)}
//                             className={`block py-2 px-2 rounded-md border-b border-slate-300 transition-all duration-200 hover:bg-blue-50 ${
//                               index === focusedIndex ? "bg-blue-100" : ""
//                             }`}
//                             onClick={() => setDialogOpen(false)} // Close dialog on item click
//                           >
//                             <h3 className="text-sm md:text-base font-medium">{perfume.name}</h3>
//                             <span className="font-sec text-gray-700 font-semibold text-xs md:text-sm">
//                               ({perfume.inspired_by})
//                             </span>
//                           </Link>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-3 relative" ref={desktopSocialRef}>
//             {/* Custom Sheet for Cart */}
//             <button
//               className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-2 rounded-xl bg-white text-black hover:bg-gray-100 cursor-pointer`}
//               onClick={() => setSheetOpen(true)}
//             >
//               <div className="relative">
//                 <ShoppingCart className="text-xl md:text-2xl" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full font-bold">
//                     {cartCount}
//                   </span>
//                 )}
//               </div>
//             </button>

//             {sheetOpen && (
//               <>
//                 <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSheetOpen(false)} />
//                 <div
//                   className={`fixed top-0 right-0 h-full bg-white z-50 w-full sm:w-[400px] shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
//                     sheetOpen ? "translate-x-0" : "translate-x-full"
//                   } flex flex-col justify-between`}
//                 >
//                   <div>
//                     <div className="flex items-center justify-between pb-4">
//                       <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
//                       <button className="text-gray-500 hover:text-gray-700" onClick={() => setSheetOpen(false)}>
//                         <X className="h-5 w-5" />
//                       </button>
//                     </div>
//                     {cartItems.length === 0 ? (
//                       <p className="text-center text-gray-500 mt-6 text-sm md:text-base">No products in cart.</p>
//                     ) : (
//                       <div className="mt-4 space-y-3 md:space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
//                         {cartItems.map((item) => (
//                           <div
//                             key={item.id}
//                             className="flex gap-2 md:gap-4 items-center border py-2 px-2 md:px-3 rounded-md"
//                           >
//                             <img
//                               src={item.image || "/placeholder.svg"}
//                               alt={item.name}
//                               className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
//                             />
//                             <div className="flex-1 min-w-0">
//                               <h4 className="font-semibold text-sm md:text-lg truncate">{item.name}</h4>
//                               <p className="text-green-600 font-semibold mt-1 text-sm md:text-base">
//                                 ₹ {item.price_inr}
//                               </p>
//                             </div>
//                             <button
//                               className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 py-1 px-2 text-xs md:text-sm flex-shrink-0"
//                               onClick={() => handleRemove(item.id)}
//                             >
//                               <Trash2 className="text-sm md:text-base" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   {cartItems.length > 0 && (
//                     <div className="mt-4">
//                       <a href={generateWhatsAppLink(cartItems)} target="_blank" rel="noopener noreferrer">
//                         <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-4 py-2 w-full text-sm md:text-lg md:py-3">
//                           Buy Now
//                         </button>
//                       </a>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}

//             <button
//               onClick={() => setShowDesktopSocials((prev) => !prev)}
//               className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 p-2 rounded-xl bg-white text-black hover:bg-gray-100 cursor-pointer`}
//             >
//               <Share2 className="text-xl md:text-2xl" />
//             </button>
//             {showDesktopSocials && (
//               <div className="absolute right-0 top-14 bg-white rounded-xl p-3 shadow-lg z-50 flex flex-col gap-3 min-w-[140px]">
//                 <button
//                   onClick={() => window.open("https://wa.me/9833949942", "_blank")}
//                   className="flex items-center text-zinc-600 hover:text-zinc-800 gap-2 transition-colors duration-300 text-sm"
//                 >
//                   <Whatsapp className="text-green-600" /> WhatsApp
//                 </button>
//                 <a
//                   href="https://www.instagram.com/yourusername"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition-colors duration-300 text-sm"
//                 >
//                   <Instagram className="text-pink-600" /> Instagram
//                 </a>
//                 <a
//                   href="https://www.facebook.com/yourusername"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition-colors duration-300 text-sm"
//                 >
//                   <Facebook className="text-blue-600" /> Facebook
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile/Tablet Navbar (Two Parts) */}
//       <div className="md:hidden fixed top-0 left-0 w-full z-30 font-[poppins]">
//         {/* Upper Navbar for Mobile/Tablet */}
//         <div className={`w-full p-3 flex items-center justify-between bg-white shadow-md`}>
//           <img
//             src="/assets/images/black logo.png" // Always black logo
//             alt="Calyx Logo"
//             className="w-[2.5rem] sm:w-[3rem]"
//           />
//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             <Menu className={`text-xl sm:text-2xl text-black`} />
//           </button>
//         </div>

//         {/* Mobile slide-in menu */}
//         <div
//           className={`fixed top-0 left-0 h-full bg-white z-50 w-64 sm:w-72 shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
//             menuOpen ? "translate-x-0" : "-translate-x-full"
//           } md:hidden rounded-r-2xl`}
//         >
//           <button onClick={() => setMenuOpen(false)} className="text-right w-full font-bold text-black text-xl mb-4">
//             {"✕"}
//           </button>
//           <nav className="flex flex-col justify-between h-full">
//             <div className="flex flex-col gap-4">
//               <img src="/assets/images/CALYX-BLACK-LOGO.png" alt="Calyx Logo" className="w-[4rem]" />
//               <Link
//                 to="/"
//                 onClick={() => setMenuOpen(false)}
//                 className="text-zinc-700 hover:text-zinc-900 py-2 text-base transition-colors duration-300"
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/search"
//                 onClick={() => setMenuOpen(false)}
//                 className="text-zinc-700 hover:text-zinc-900 py-2 text-base transition-colors duration-300"
//               >
//                 Products
//               </Link>
//               <Link
//                 to="/about"
//                 onClick={() => setMenuOpen(false)}
//                 className="text-zinc-700 hover:text-zinc-900 py-2 text-base transition-colors duration-300"
//               >
//                 About
//               </Link>
//             </div>
//             <small className="text-zinc-600 text-xs">
//               Design By <br /> Ashish Singh
//             </small>
//           </nav>
//         </div>

//         {/* Overlay for mobile menu */}
//         {menuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMenuOpen(false)} />}

//         {/* Lower Navbar for Mobile/Tablet */}
//         <div
//           className={`fixed bottom-0 left-0 w-full py-3 flex items-center justify-around border-t border-gray-200 bg-white shadow-md`}
//         >
//           {/* Custom Dialog for Search (Mobile/Tablet) */}
//           <button
//             className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center text-black p-2`}
//             onClick={() => setDialogOpen(true)}
//           >
//             <Search className="text-xl" />
//           </button>

//           {dialogOpen && (
//             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//               <div className="relative w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg">
//                 <div className="flex items-center justify-between pb-4">
//                   <h2 className="text-sm md:text-base text-zinc-800 font-semibold">
//                     {"Discover the fragrance that defines you"}
//                   </h2>
//                   <button
//                     className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//                     onClick={() => {
//                       setDialogOpen(false)
//                       setSearchTerm("")
//                       setFocusedIndex(-1)
//                     }}
//                   >
//                     <X className="h-5 w-5" />
//                   </button>
//                 </div>
//                 <div className="grid gap-4">
//                   <div className="grid gap-3">
//                     <div className="relative w-full flex items-center">
//                       <Search className="absolute w-4 md:w-6 mx-2 text-zinc-500" />
//                       <input
//                         ref={inputRef}
//                         type="text"
//                         placeholder="Lavender"
//                         id="searchbox"
//                         name="searchbox"
//                         className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8 md:pl-10 py-2 placeholder:italic font-sec font-semibold text-sm md:text-lg"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                       />
//                     </div>
//                   </div>
//                   <div className="grid gap-3 max-h-[50vh] md:max-h-[300px] overflow-y-auto">
//                     {filteredData.length === 0 ? (
//                       <p className="text-sm text-gray-500 px-2 h-[100px] md:h-[200px] flex items-center justify-center">
//                         No perfumes found
//                       </p>
//                     ) : (
//                       filteredData.map((perfume, index) => (
//                         <Link
//                           key={perfume.id}
//                           to={`/search/${perfume.id}`}
//                           ref={(el) => (itemRefs.current[index] = el)}
//                           className={`block py-2 px-2 rounded-md border-b border-slate-300 transition-all duration-200 hover:bg-blue-50 ${
//                             index === focusedIndex ? "bg-blue-100" : ""
//                           }`}
//                           onClick={() => setDialogOpen(false)} // Close dialog on item click
//                         >
//                           <h3 className="text-sm md:text-base font-medium">{perfume.name}</h3>
//                           <span className="font-sec text-gray-700 font-semibold text-xs md:text-sm">
//                             ({perfume.inspired_by})
//                           </span>
//                         </Link>
//                       ))
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Custom Sheet for Cart (Mobile/Tablet) */}
//           <button
//             className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center relative text-black p-2`}
//             onClick={() => setSheetOpen(true)}
//           >
//             <ShoppingCart className="text-xl" />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 text-xs bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
//                 {cartCount}
//               </span>
//             )}
//           </button>

//           {sheetOpen && (
//             <>
//               <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSheetOpen(false)} />
//               <div
//                 className={`fixed top-0 right-0 h-full bg-white z-50 w-full sm:w-[400px] shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
//                   sheetOpen ? "translate-x-0" : "translate-x-full"
//                 } flex flex-col justify-between`}
//               >
//                 <div>
//                   <div className="flex items-center justify-between pb-4">
//                     <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
//                     <button className="text-gray-500 hover:text-gray-700" onClick={() => setSheetOpen(false)}>
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
//                   {cartItems.length === 0 ? (
//                     <p className="text-center text-gray-500 mt-6 text-sm md:text-base">No products in cart.</p>
//                   ) : (
//                     <div className="mt-4 space-y-3 md:space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
//                       {cartItems.map((item) => (
//                         <div
//                           key={item.id}
//                           className="flex gap-2 md:gap-4 items-center border py-2 px-2 md:px-3 rounded-md"
//                         >
//                           <img
//                             src={item.image || "/placeholder.svg"}
//                             alt={item.name}
//                             className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-semibold text-sm md:text-lg truncate">{item.name}</h4>
//                             <p className="text-green-600 font-semibold mt-1 text-sm md:text-base">₹ {item.price_inr}</p>
//                           </div>
//                           <button
//                             className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 py-1 px-2 text-xs md:text-sm flex-shrink-0"
//                             onClick={() => handleRemove(item.id)}
//                           >
//                             <Trash2 className="text-sm md:text-base" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                 {cartItems.length > 0 && (
//                   <div className="mt-4">
//                     <a href={generateWhatsAppLink(cartItems)} target="_blank" rel="noopener noreferrer">
//                       <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-4 py-2 w-full text-sm md:text-lg md:py-3">
//                         Buy Now
//                       </button>
//                     </a>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {/* Social share functionality (Mobile/Tablet) */}
//           <div className="relative" ref={mobileSocialRef}>
//             <button
//               className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center text-black p-2`}
//               onClick={() => setShowMobileSocials((prev) => !prev)}
//             >
//               <Share2 className="text-xl" />
//             </button>
//             {showMobileSocials && (
//               <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg z-50 flex flex-col gap-3 min-w-[140px]">
//                 <button
//                   onClick={() => window.open("https://wa.me/9833949942", "_blank")}
//                   className="flex items-center text-zinc-600 hover:text-zinc-800 gap-2 transition-colors duration-300 text-sm"
//                 >
//                   <Whatsapp className="text-green-600" /> WhatsApp
//                 </button>
//                 <a
//                   href="https://www.instagram.com/yourusername"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition-colors duration-300 text-sm"
//                 >
//                   <Instagram className="text-pink-600" /> Instagram
//                 </a>
//                 <a
//                   href="https://www.facebook.com/yourusername"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition-colors duration-300 text-sm"
//                 >
//                   <Facebook className="text-blue-600" /> Facebook
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Navbar


"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
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
} from "lucide-react"
import { type perfume_Data, perfumeData } from "@/PerfumeData"
import gsap from "gsap"

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState<perfume_Data[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  // Socials popover (desktop shown from Account icon, mobile from bottom bar)
  const [showDesktopSocials, setShowDesktopSocials] = useState(false)
  const desktopSocialRef = useRef<HTMLDivElement>(null)

  const [showMobileSocials, setShowMobileSocials] = useState(false)
  const mobileSocialRef = useRef<HTMLDivElement>(null)

  const location = useLocation()

  // Cart helpers
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(cart.length || 0)
  }

  const syncCartItems = () => {
    const cartIds: number[] = JSON.parse(localStorage.getItem("cart") || "[]")
    const filteredProducts = perfumeData.filter((product) => cartIds.includes(product.id))
    setCartItems(filteredProducts)
  }

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    const newCartIds = updatedCart.map((item) => item.id)
    localStorage.setItem("cart", JSON.stringify(newCartIds))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const generateWhatsAppLink = (items: perfume_Data[]) => {
    if (items.length === 0) return "https://wa.me/9833949942"
    const message = items
      .map((item, index) => `${index + 1}. ${item.name} (${item.inspired_by}) - ₹${item.price_inr}`)
      .join("\n")
    const finalMessage = `Hi, I'm interested in buying the following perfumes:\n\n${message}\n\nPlease let me know the next steps.`
    const encodedMessage = encodeURIComponent(finalMessage)
    return `https://wa.me/9833949942?text=${encodedMessage}`
  }

  // Search data + keyboard nav
  const filteredData = perfumeData.filter((perfume) => perfume.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setFocusedIndex((prev) => (prev < filteredData.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev))
    }
  }

  // Effects: cart sync
  useEffect(() => {
    updateCartCount()
    syncCartItems()
    const onUpdate = () => {
      updateCartCount()
      syncCartItems()
    }
    window.addEventListener("cartUpdated", onUpdate)
    return () => window.removeEventListener("cartUpdated", onUpdate)
  }, [])

  // Close things on route change
  useEffect(() => {
    setShowDesktopSocials(false)
    setShowMobileSocials(false)
    setDialogOpen(false)
    setSearchTerm("")
    setFocusedIndex(-1)
    setSheetOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  // Click outside socials (desktop)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (desktopSocialRef.current && !desktopSocialRef.current.contains(e.target as Node)) {
        setShowDesktopSocials(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // Click outside socials (mobile)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileSocialRef.current && !mobileSocialRef.current.contains(e.target as Node)) {
        setShowMobileSocials(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  useEffect(() => {
    if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [focusedIndex])

  const desktopBarRef = useRef<HTMLDivElement>(null)
  const mobileTopBarRef = useRef<HTMLDivElement>(null)

 useEffect(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastY = window.scrollY;
  let ticking = false;

  // Explicitly set initial state to ensure navbar is visible
  const initializeNavbar = (el: HTMLElement | null) => {
    if (!el) return;
    el.style.transform = "translateY(0)";
    el.style.opacity = "1";
  };

  // Initialize both desktop and mobile navbars
  initializeNavbar(desktopBarRef.current);
  initializeNavbar(mobileTopBarRef.current);

  const animateTo = (el: HTMLElement | null, hidden: boolean) => {
    if (!el) return;
    const dy = hidden ? -(el.getBoundingClientRect().height + 16) : 0;
    if (prefersReduced) {
      el.style.transform = `translateY(${dy}px)`;
      el.style.opacity = hidden ? "0.98" : "1";
      return;
    }
    gsap.to(el, {
      y: dy,
      opacity: hidden ? 0.98 : 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const curr = window.scrollY;
        const hidden = curr > lastY && curr > 120; // hide when scrolling down past threshold
        animateTo(desktopBarRef.current, hidden);
        animateTo(mobileTopBarRef.current, hidden);
        lastY = curr;
        ticking = false;
      });
      ticking = true;
    }
  };

  // Only run initial animation if not reduced motion
  if (!prefersReduced) {
    if (desktopBarRef.current) {
      gsap.fromTo(
        desktopBarRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
    if (mobileTopBarRef.current) {
      gsap.fromTo(
        mobileTopBarRef.current,
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

  // --- RENDER ---
  return (
    <>
      {/* Desktop Navbar - redesigned to match reference placements */}
      <header
        ref={desktopBarRef}
        className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b"
        role="banner"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          {/* 3 columns: left tools, center brand, right actions */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-20">
            {/* Left cluster: menu + faux search input (opens your existing dialog) */}
            <div className="flex items-center gap-3">
              <button
                aria-label="Open menu"
                className="p-2 rounded-md hover:bg-zinc-100 transition"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>

              <button
                onClick={() => setDialogOpen(true)}
                aria-label="Open search"
                className="group hidden lg:flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition"
              >
                <Search className="h-4 w-4 text-zinc-500" />
                <span className="opacity-90">Search</span>
              </button>

              {/* On smaller desktop widths, show icon-only */}
              <button
                onClick={() => setDialogOpen(true)}
                aria-label="Open search"
                className="lg:hidden p-2 rounded-md hover:bg-zinc-100 transition"
              >
                <Search className="h-5 w-5 text-zinc-700" />
              </button>
            </div>

            {/* Center brand wordmark */}
            <div className="justify-self-center">
              <Link
                to="/"
                className="font-serif tracking-wide text-xl lg:text-2xl text-zinc-900 select-none"
                aria-label="Home"
              >
                CALYX
              </Link>
            </div>

            {/* Right cluster: cart + account (account toggles socials popover to preserve Share functionality) */}
            <div className="justify-self-end relative flex items-center gap-1 sm:gap-2" ref={desktopSocialRef}>
              <button
                aria-label="Open cart"
                onClick={() => setSheetOpen(true)}
                className="relative p-2 rounded-md hover:bg-zinc-100 transition"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                aria-label="Account and share"
                onClick={() => setShowDesktopSocials((v) => !v)}
                className="p-2 rounded-md hover:bg-zinc-100 transition"
              >
                <User className="h-5 w-5" />
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

      {/* Search Dialog (shared for desktop & mobile) */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-sm md:text-base text-zinc-800 font-semibold">
                {"Discover the fragrance that defines you"}
              </h2>
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setDialogOpen(false)
                  setSearchTerm("")
                  setFocusedIndex(-1)
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
                      to={`/search/${perfume.id}`}
                      ref={(el) => (itemRefs.current[index] = el)}
                      className={`block py-2 px-2 rounded-md border-b border-slate-200 transition-all duration-200 hover:bg-zinc-50 ${
                        index === focusedIndex ? "bg-zinc-100" : ""
                      }`}
                      onClick={() => setDialogOpen(false)}
                    >
                      <h3 className="text-sm font-medium">{perfume.name}</h3>
                      <span className="font-sec text-gray-700 font-semibold text-xs">({perfume.inspired_by})</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sheet (shared) */}
      {sheetOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setSheetOpen(false)} />
          <div className="fixed top-0 right-0 h-full bg-white z-50 w-full sm:w-[400px] shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4">
                <h2 className="text-lg md:text-xl font-semibold">Your Cart</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setSheetOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-6 text-sm md:text-base">No products in cart.</p>
              ) : (
                <div className="mt-4 space-y-3 md:space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center border py-2 px-2 md:px-3 rounded-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm md:text-lg truncate">{item.name}</h4>
                        <p className="text-green-600 font-semibold mt-1 text-sm md:text-base">₹ {item.price_inr}</p>
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
                <a href={generateWhatsAppLink(cartItems)} target="_blank" rel="noopener noreferrer">
                  <button className="w-full h-11 bg-black text-white hover:bg-zinc-900 rounded-md text-sm md:text-base">
                    Buy Now
                  </button>
                </a>
              </div>
            )}
          </div>
        </>
      )}

      {/* Slide-in Menu (available on all breakpoints so desktop menu button works) */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-50 w-64 sm:w-72 shadow-lg p-4 sm:p-6 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } rounded-r-2xl`}
      >
        <button onClick={() => setMenuOpen(false)} className="text-right w-full font-bold text-black text-xl mb-4">
          {"✕"}
        </button>
        <nav className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <img src="/assets/images/CALYX-BLACK-LOGO.png" alt="Calyx Logo" className="w-[4rem]" />
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-700 hover:text-zinc-900 py-2 text-base transition-colors"
            >
              Home
            </Link>
            <Link
              to="/search"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-700 hover:text-zinc-900 py-2 text-base transition-colors"
            >
              Products
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-zinc-700 hover:text-zinc-900 py-2 text-base transition-colors"
            >
              About
            </Link>
          </div>
          <small className="text-zinc-600 text-xs">
            Design By <br /> Ashish Singh
          </small>
        </nav>
      </div>
      {menuOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)} />}

      {/* Mobile/Tablet Bars (keep your original behavior, add hide-on-scroll to top bar) */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40" ref={mobileTopBarRef}>
        <div className="w-full h-14 px-3 flex items-center justify-between bg-white/90 backdrop-blur border-b">
          <button aria-label="Open menu" onClick={() => setMenuOpen(true)} className="p-2 -ml-1">
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="font-serif text-lg tracking-wide">
            PARFS
          </Link>
          <div className="flex items-center gap-2">
            <button aria-label="Open search" onClick={() => setDialogOpen(true)} className="p-2">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label="Open cart" onClick={() => setSheetOpen(true)} className="p-2 relative">
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

      {/* Mobile Bottom Bar (original share behavior preserved) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full py-3 flex items-center justify-around border-t border-gray-200 bg-white z-40">
        <button onClick={() => setDialogOpen(true)} className="p-2" aria-label="Open search">
          <Search className="text-xl" />
        </button>
        <button onClick={() => setSheetOpen(true)} className="p-2 relative" aria-label="Open cart">
          <ShoppingCart className="text-xl" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>
        <div className="relative" ref={mobileSocialRef}>
          <button className="p-2" onClick={() => setShowMobileSocials((prev) => !prev)} aria-label="Open share">
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
  )
}

export default Navbar
