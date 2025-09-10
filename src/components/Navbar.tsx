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
  Send,
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
          `${index + 1}. ${item.name} (${item.inspired_by}) - ₹${
            item.price_inr
          }`
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
      if (cartCount === 0) {
        setSheetOpen(true);
      }
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
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
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
      el.style.transform = hidden
        ? `translate3d(0, -${height + 16}px, 0)`
        : "translate3d(0, 0, 0)";
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
            const hidden =
              currentScrollY > lastScrollY.current && currentScrollY > 120;
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
                onClick={() =>
                  navigate(location.pathname === "/" ? "/product" : "/")
                }
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
                <img
                  src="/assets/images/CALYX-WHITE-LOGO.png"
                  className="w-32 h-14 object-contain"
                />
              </Link>
            </div>
            <div
              className="justify-self-end relative flex items-center gap-1 sm:gap-2"
              ref={desktopSocialRef}
            >
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
                    onClick={() =>
                      window.open("https://wa.me/9833949942", "_blank")
                    }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50">
          <div
            className="relative w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-sm md:text-base text-black font-semibold uppercase tracking-wide">
                Discover Your Fragrance
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700"
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
            <div className="grid gap-4 mt-4">
              <div className="relative w-full">
                <Search className="absolute w-5 h-5 mx-2 text-gray-500 top-1/2 transform -translate-y-1/2" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search fragrances..."
                  id="searchbox"
                  name="searchbox"
                  className="w-full h-12 rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 placeholder:italic font-semibold text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={(e) => {
                    if (window.visualViewport) {
                      const viewportHeight = window.visualViewport.height;
                      const inputRect = e.target.getBoundingClientRect();
                      if (inputRect.bottom > viewportHeight) {
                        window.scrollTo(
                          0,
                          window.scrollY +
                            (inputRect.bottom - viewportHeight + 20)
                        );
                      }
                    }
                  }}
                />
              </div>
              <div className="grid gap-2 max-h-[calc(70vh-100px)] overflow-y-auto">
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
                      className={`flex items-center py-2 px-2 rounded-md border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
                        index === focusedIndex ? "bg-gray-100" : ""
                      }`}
                      onClick={() => setDialogOpen(false)}
                    >
                      <img
                        src={perfume.image || "/placeholder.svg"}
                        alt={perfume.name}
                        className="w-10 h-10 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-black">
                          {perfume.name}
                        </h3>
                        <span className="text-xs text-gray-600 font-semibold">
                          ({perfume.inspired_by})
                        </span>
                      </div>
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
            className="fixed inset-0 z-40 bg-gray-900/50"
            onClick={() => setSheetOpen(false)}
          />
          <div
            className="fixed top-0 right-0 h-full bg-white z-50 w-full sm:w-[400px] shadow-lg p-6 transform transition-transform duration-500 ease-in-out"
            style={{
              transform: sheetOpen ? "translateX(0)" : "translateX(100%)",
              willChange: "transform",
            }}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h2 className="text-lg md:text-xl font-semibold text-black uppercase tracking-wide">
                  Your Cart
                </h2>
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
                <div className="mt-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-3 px-2 border-b border-gray-200"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm md:text-lg text-black truncate">
                          {item.name}
                        </h4>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">
                          ₹{item.price_inr}
                        </p>
                      </div>
                      <button
                        className="inline-flex items-center justify-center bg-black text-white hover:bg-gray-800 py-2 px-2 rounded-md text-xs md:text-sm"
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
              <div className="mt-6">
                {/* Information message */}
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-green-800 mb-1">
                        WhatsApp Checkout
                      </h3>
                      <p className="text-xs text-green-700 leading-relaxed">
                        You will be redirected to our official WhatsApp account
                        to complete your checkout. All further enquiries, order
                        confirmation, and payment processing will be handled
                        there.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={generateWhatsAppLink(cartItems)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-md text-sm md:text-base uppercase tracking-wide">
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
          transition: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
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
            <Link
              to="/"
              className="font-serif text-lg w-full mb-8 tracking-wide"
            >
              <img
                src="/assets/images/black logo.png"
                className="w-24 h-12 mx-auto object-contain"
              />
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
            <img
              src="/assets/images/black logo.png"
              className="w-24 h-12 object-contain"
            />
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
            <Send className="text-xl" />
          </button>
          {showMobileSocials && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg z-50 flex flex-col gap-3 min-w-[160px] border">
              <button
                onClick={() =>
                  window.open("https://wa.me/9833949942", "_blank")
                }
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
