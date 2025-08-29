// import React from "react";
// import { motion } from "framer-motion";
// import { Spotlight } from "./ui/spotlight";

// function Main2() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 1.2,
//         staggerChildren: 0.4,
//       },
//     },
//   };

//   const slideInBottom = {
//     hidden: { y: 180, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 1.2,
//         ease: "easeOut",
//       },
//     },
//   };

//   const slideInTop = {
//     hidden: { y: -180, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 1.2,
//         ease: "easeOut",
//       },
//     },
//   };

//   const fadeInUp = {
//     hidden: { y: 40, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 1.2,
//         ease: "easeOut",
//       },
//     },
//   };

//   const scaleIn = {
//     hidden: { scale: 0.95, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 1.2,
//         ease: "easeOut",
//       },
//     },
//   };

//   // Capsule text block animation
//   const capsuleTextVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const capsuleLineVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     <motion.div
//       className="w-screen h-[100vh] flex overflow-hidden bg-[#000] flex-col lg:flex-row items-center justify-center"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Left Half */}
//       {/* <motion.div
//         className="lefthalf relative flex items-end justify-center bg-[#000] w-full lg:w-[25%] h-full lg:h-full"
//         variants={slideInBottom}
//       > */}
//         {/* <div className="divleft w-44 rounded-t-full mb-10">
//           <motion.img
//             className="h-[30vh] w-full rounded-t-full object-cover"
//             src="/assets/images/perfume-right.jpg"
//             alt=""
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//           />
//           <motion.div
//             className="mt-2 border-[0.2px] rounded-b-full pb-8 pt-5 text-sm text-center border-zinc-900 w-full"
//             variants={capsuleTextVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.h3
//               variants={capsuleLineVariants}
//               className="font-[Doren] text-zinc-500 font-medium text-2xl"
//             >
//               Crimson
//             </motion.h3>
//             <motion.h4
//               variants={capsuleLineVariants}
//               className="text-zinc-600 text-xs font-light font-[poppins]"
//             >
//               Lorem ipsum dolor <br /> sit amet consectetur.
//             </motion.h4>
//           </motion.div>
//         </div> */}
//       {/* </motion.div> */}

//       {/* Middle Half */}
//       <motion.div
//         // className="midhalf w-full lg:w-[50%] flex justify-center flex-col items-center px-4 lg:px-0 order-1 lg:order-2"
//         className=" w-full lg:w-full h-full flex justify-center flex-col items-center px-4 lg:px-0 order-1 lg:order-2"
//         variants={fadeInUp}
//       >
//         <motion.h2
//           className="text-3xl sm:text-4xl mt-20 md:text-5xl lg:text-[5rem] text-center font-[Doren] font-medium drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] metal-3d"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.2 }}
//         >
//           Awaken Your Senses
//           <br />
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1.2, delay: 0.8 }}
//           >
//             With Every Note
//           </motion.span>
//         </motion.h2>

//         <motion.div
//           className="img w-[70%] sm:w-[90%] md:w-[85%] lg:w-[90%] mt-6 lg:mt-10 h-[30vh] lg:h-[60vh] relative"
//           // className=" mt-6 lg:mt-10 relative"
//           variants={scaleIn}
//         >
//             {/* <Spotlight
//         className="-top-40 absolute z-[999999] left-0 md:-top-20 md:left-60"
//         fill="white"
//       /> */}

//           {/* Background blend overlay */}
//           <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-transparent to-[#000000] opacity-40 rounded-lg"></div>

//           {/* Dark overlay to blend with background */}
//           <div className="absolute inset-0 bg-[#000000] opacity-20 rounded-lg mix-blend-multiply"></div>

//           <motion.img
//             className="h-[100%] w-[90%] mx-auto object-contain relative z-10 filter "
//             src="/assets/images/Homepage.png"
//             alt="Villian Perfume Bottle"
//             style={{
//               filter: "brightness(0.9) contrast(1.1) saturate(2)",
//               mixBlendMode: "screen",
//             }}
//           />

//           {/* Subtle glow effect */}
//           <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent rounded-lg"></div>
//         </motion.div>
//       </motion.div>

//       {/* Right Half */}
//       {/* <motion.div
//         className="righthalf relative flex items-start justify-center bg-[#000] w-full lg:w-[25%] h-full lg:h-full order-3"
//         variants={slideInTop}
//       > */}
//         {/* <div className="divright w-44 h-full mt-32 overflow-hidden">

//           <motion.div
//             className="border rounded-t-full p-6 text-sm text-center border-zinc-800 w-full"
//             variants={capsuleTextVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.h3
//               variants={capsuleLineVariants}
//               className="font-[Doren] text-zinc-500 font-medium text-2xl"
//             >
//               Azure
//             </motion.h3>
//             <motion.h4
//               variants={capsuleLineVariants}
//               className="text-zinc-700 font-light text-xs font-[poppins]"
//             >
//               Lorem ipsum dolor <br /> sit amet consectetur.
//             </motion.h4>
//           </motion.div>

//           <motion.img
//             className="h-[30vh] w-full mt-2 rounded-b-full object-cover"
//             src="/assets/images/Villian.png"
//             alt=""
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//           />
//         </div> */}
//       {/* </motion.div> */}
//       <style jsx>{`
//         .metal-3d {
//           background: linear-gradient(
//             90deg,
//             #27272a 0%,
//             #2f2f33 20%,
//             #d4d4d8 50%,
//             #2f2f33 80%,
//             #27272a 100%
//           );
//           background-size: 200% auto;
//           background-position: 0% center;
//           background-clip: text;
//           -webkit-background-clip: text;
//           color: transparent;
//           animation: shimmer 3s linear infinite;
//         }

//         @keyframes shimmer {
//           0% {
//             background-position: 0% center;
//           }
//           100% {
//             background-position: 200% center;
//           }
//         }

//         .bg-gradient-radial {
//           background: radial-gradient(
//             circle at center,
//             var(--tw-gradient-stops)
//           );
//         }
//       `}</style>
//     </motion.div>
//   );
// }

// export default Main2;
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

type FullImageHeroProps = {
  headline?: [string, string?];
  subtext?: string;
  ctaLabel?: string;
  imageSrc?: string;
  className?: string;
};

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ y: "1.2em", opacity: 0, rotateX: 25 }}
          animate={{ y: "0em", opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.2, 0.8, 0.2, 1],
            delay: 0.12 * i,
          }}
        >
          {w}
        </motion.span>
      ))}
    </span>
  );
}

export default function FullImageHero({
  headline = ["Awaken Your Senses", "With Every Note"],
  subtext = "All Collection",
  ctaLabel = "Explore More",
  imageSrc = "/assets/images/Web Banner 012.png",
  className,
}: FullImageHeroProps) {
  // Subtle mouse parallax for the image
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const x = useTransform(smx, [-0.5, 0.5], [-12, 12]);
  const y = useTransform(smy, [-0.5, 0.5], [-8, 8]);

  // Arrow animation controls
  const arrowControls = useAnimation();

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bounds = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - bounds.left) / bounds.width - 0.5;
      const py = (e.clientY - bounds.top) / bounds.height - 0.5;
      mx.set(px);
      my.set(py);
    },
    [mx, my]
  );

  const onMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  // Start arrow animation on mount
  useEffect(() => {
    arrowControls.start({
      x: [-8, 0, -8], // Back-and-forth movement (matches -translate-x-2 to translate-x-0)
      transition: {
        repeat: Infinity,
        duration: 1.5, // Smooth, subtle oscillation
        ease: "easeInOut",
      },
    });
  }, [arrowControls]);

  return (
    <>
      <section
        className={`relative w-full h-[88vh] md:h-[100vh] mt-16 overflow-hidden ${className || ""}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        aria-label="Hero"
      >
        {/* Background image with Ken Burns + parallax */}
        <motion.img
          src={imageSrc}
          alt="Fragrance campaign"
          className="absolute inset-0 h-full w-full object-cover object-right"
          initial={{ scale: 1.08, opacity: 0.0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ x, y }}
          crossOrigin="anonymous"
        />

        {/* Dark-to-transparent overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="relative h-full">
          <div className="mx-auto h-full max-w-7xl px-6 md:px-8">
            <div className="flex h-full items-center">
              <motion.div
                className="max-w-2xl text-left"
                initial="hidden"
                animate="visible"
              >
                {/* Headline */}
                <h1 className="text-white font-[Doren] leading-tight text-4xl md:text-6xl lg:text-[6rem] text-pretty drop-shadow-sm">
                  <AnimatedWords text={headline[0]} />
                  {headline[1] ? (
                    <>
                      <br />
                      <AnimatedWords text={headline[1]} />
                    </>
                  ) : null}
                </h1>

                {/* CTA */}
                <motion.div
                  className="mt-6 md:mt-8 flex items-center gap-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Link
                    to={"/product"}
                    className="border-none bg-transparent group cursor-pointer flex items-center justify-center"
                    aria-label={ctaLabel}
                    onMouseEnter={() => arrowControls.stop()} // Stop animation on hover
                    onMouseLeave={() =>
                      arrowControls.start({
                        x: [-8, 0, -8],
                        transition: {
                          repeat: Infinity,
                          duration: 1.5,
                          ease: "easeInOut",
                        },
                      })
                    } // Resume animation on leave
                  >
                    <span className="hover-underline-animation pb-2 tracking-[4px] text-lg pr-4 uppercase text-white font-[Doren]">
                      {ctaLabel}
                    </span>
                    <motion.svg
                      id="arrow-horizontal"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="10"
                      viewBox="0 0 46 16"
                      animate={arrowControls}
                      className="group-hover:translate-x-0 active:scale-90"
                    >
                      <path
                        id="Path_10"
                        data-name="Path 10"
                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                        transform="translate(30)"
                        fill="white"
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CSS for hover-underline-animation */}
        <style jsx>{`
          .hover-underline-animation {
            position: relative;
          }
          .hover-underline-animation:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: white;
            transform: scaleX(0);
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
          }
          .hover-underline-animation:hover:after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        `}</style>
      </section>
    </>
  );
}