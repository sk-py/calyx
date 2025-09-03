import { useEffect, useState } from "react";
import { IoMdArrowUp } from "react-icons/io";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 1600);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed max-sm:bottom-20 max-sm:right-2 bottom-6 right-6 z-[99] bg-black text-white border-zinc-600 border p-3 rounded-full shadow-lg transition-opacity duration-300 ease-in ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <IoMdArrowUp size={25} />
    </button>
  );
};

export default BackToTop;
