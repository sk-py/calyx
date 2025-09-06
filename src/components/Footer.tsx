import { useState, useEffect } from "react";
import {  Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById("calyx-footer");
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Facebook, href: "#", label: "Facebook" },
  ];

  const navLinks = [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Authenticity", href: "#" },
  ];

  // Split CALYX into individual letters for animation
  const calyxLetters = "CALYX".split("");

  return (
    <footer
      id="calyx-footer"
      className="bg-black max-sm:pb-16 text-white relative rounded rounded-tr-2xl overflow-hidden"
    >

    
      {/* Main footer content */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Top section with main heading and nav links */}
        <div className="pt-16 md:pt-20 lg:pt-24 pb-8 md:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0">
            {/* Main CALYX heading with letter-by-letter animation */}
            <div className="relative flex w-full justify-center">
              <h2 className="text-6xl sm:text-7xl font-[Doren] md:text-8xl lg:text-9xl xl:text-[22rem] leading-none tracking-wider flex">
                {calyxLetters.map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-16"
                    }`}
                    style={{ 
                      transitionDelay: `${index * 250}ms`,
                      transformOrigin: "bottom"
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div
          className={`h-px bg-white transition-all duration-800 ease-out ${
            isVisible ? "w-full opacity-100 scale-x-100" : "w-0 opacity-0 scale-x-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        />

        {/* Bottom section */}
        <div className="py-8 md:py-12">
          {/* Mobile layout */}
          <div className="lg:hidden space-y-8">
            {/* Navigation links */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium hover:text-gray-300 transition-all duration-300 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${1100 + index * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center space-y-1">
              <p
                className={`text-sm transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "1400ms" }}
              >
                Proudly created in India.
              </p>
              <p
                className={`text-sm transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "1500ms" }}
              >
                All Right Reserved, All Wrong Reversed.
              </p>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            {/* Social icons - Left */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-3 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Navigation links - Center */}
            <div className="flex justify-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium hover:text-gray-300 transition-all duration-300 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${900 + index * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Copyright - Right */}
            <div className="text-right space-y-1">
              <p
                className={`text-sm transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "1200ms" }}
              >
                Proudly created in India.
              </p>
              <p
                className={`text-sm transition-all duration-300 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "1300ms" }}
              >
                All Right Reserved, All Wrong Reversed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;