import { useEffect, useMemo, useState } from "react";

type PreloaderRevealProps = {
  title?: string;
  subtitle?: string;
  durationMs?: number;
  curtainDurationMs?: number;
  curtainColor?: string;
  spinnerColor?: string;
};

export default function PreloaderReveal({
  title = "Calyx",
  subtitle = "PARFUM DE LUXE",
  durationMs = 2500,
  curtainDurationMs = 2000,
  curtainColor = "#000000",
  spinnerColor = "#ffffff",
}: PreloaderRevealProps) {
  const [phase, setPhase] = useState<"loading" | "revealing">("loading");
  const [mounted, setMounted] = useState(true);
  const letters = useMemo(() => title.split(""), [title]);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const loadingTimer = setTimeout(() => setPhase("revealing"), durationMs);
    const removeTimer = setTimeout(() => {
      setMounted(false);
      document.documentElement.style.overflow = prevOverflow;
    }, durationMs + curtainDurationMs + 300);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(removeTimer);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [durationMs, curtainDurationMs]);

  if (!mounted) return null;

  const containerStyle: React.CSSProperties = {
    position: "fixed",
    inset: "0",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent", // Container is transparent so content shows through
  };

  const animationPreloaderStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 100,
    display: "grid",
    placeItems: "center",
    gap: "1.5rem",
    textAlign: "center",
    padding: "1rem",
    opacity: phase === "revealing" ? 0 : 1,
    transition: "opacity 800ms ease-out 500ms",
  };

  const spinnerStyle: React.CSSProperties = {
    height: "6em",
    width: "6em",
    borderRadius: "9999px",
    border: "2px solid rgba(255, 255, 255, 0.2)",
    borderTopColor: spinnerColor,
    animation:
      "fadeIn 1000ms ease-out forwards, spinner 1.5s ease-in-out infinite",
    margin: "0 auto 1.5rem auto",
    background: "transparent",
  };

  const txtLoadingStyle: React.CSSProperties = {
    fontWeight: 500,
    fontSize: "5rem",
    lineHeight: 1.1,
    letterSpacing: "0.12em",
    color: spinnerColor,
    userSelect: "none",
    whiteSpace: "nowrap",
  };

  const letterStyle = (index: number): React.CSSProperties => ({
    display: "inline-block",
    position: "relative",
    opacity: 0,
    transform: "translateY(25px)",
    animation: `letterReveal 2s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
    animationDelay: `${index * 0.25}s`,
  });

  const subtitleStyle: React.CSSProperties = {
    fontSize: "2rem",
    letterSpacing: "0.4em",
    color: "rgba(255, 255, 255, 0.85)",
    textTransform: "uppercase",
    marginTop: "0.3rem",
    opacity: 0,
    animation: "fadeIn 1s ease-out 1.8s forwards",
  };

  const sectionBaseStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    height: "100%",
    width: "50%",
    background: curtainColor,
    transition: `transform ${curtainDurationMs}ms cubic-bezier(0.33, 0, 0.66, 1)`,
    willChange: "transform",
    transitionDelay: phase === "revealing" ? "800ms" : "0ms",
  };

  const sectionLeftStyle: React.CSSProperties = {
    ...sectionBaseStyle,
    left: 0,
    transform: phase === "revealing" ? "translateX(-100%)" : "translateX(0)",
  };

  const sectionRightStyle: React.CSSProperties = {
    ...sectionBaseStyle,
    right: 0,
    transform: phase === "revealing" ? "translateX(100%)" : "translateX(0)",
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          @keyframes bottleFill {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }
          @keyframes liquidRise {
            0% {
              transform: translateY(42px);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateY(0px);
              opacity: 1;
            }
          }
          @keyframes sparkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1);
            }
          }
          @keyframes letterReveal {
            0% {
              opacity: 0;
              transform: translateY(25px);
            }
            60% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @media (max-width: 767px) {
            .preloader-spinner {
              height: 5em !important;
              width: 5em !important;
            }
            .preloader-text {
              font-size: 2.2rem !important;
            }
          }
          @media (max-width: 500px) {
            .preloader-spinner {
              height: 4em !important;
              width: 4em !important;
              mrgin-right: 0.5rem !important;
            }
            .preloader-text {
              font-size: 2.2rem !important;
            }

            .subtitle-text{
              font-size: 1.2rem !important;
              letter-spacing: 0.2em !important;
          }
        `}
      </style>
      {/* Background behind curtains - this is what gets revealed */}
      <div
        style={{
          position: "fixed",
          inset: "0",
          zIndex: 9998,
          background: "transparent", // This will show the content behind
        }}
      />

      <div
        style={containerStyle}
        role="status"
        aria-live="polite"
        aria-busy={phase === "loading"}
        aria-label="Loading"
      >
        <div style={animationPreloaderStyle}>
          <div
            className="preloader-spinner"
            style={{
              ...spinnerStyle,
              border: "none",
              background: "transparent",
            }}
            aria-hidden="true"
          >
            <svg
              width="80"
              height="100"
              viewBox="0 0 80 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bottle Shadow/Base */}
              <ellipse
                cx="40"
                cy="95"
                rx="25"
                ry="3"
                fill="rgba(255,255,255,0.1)"
              />

              {/* Main Bottle Body */}
              <path
                d="M25 30 L25 75 Q25 85 35 85 L45 85 Q55 85 55 75 L55 30 Q55 25 50 25 L30 25 Q25 25 25 30 Z"
                fill="none"
                stroke={spinnerColor}
                strokeWidth="1.5"
                opacity="0.8"
              />

              {/* Bottle Neck */}
              <rect
                x="35"
                y="15"
                width="10"
                height="15"
                fill="none"
                stroke={spinnerColor}
                strokeWidth="1.5"
                opacity="0.8"
              />

              {/* Cap */}
              <rect
                x="32"
                y="10"
                width="16"
                height="8"
                rx="2"
                fill={spinnerColor}
                opacity="0.9"
              />

              {/* Atomizer */}
              <circle cx="40" cy="14" r="2" fill={spinnerColor} opacity="0.7" />

              {/* Liquid Fill - Animated */}
              <defs>
                <clipPath id="bottleClip">
                  <path d="M27 31 L27 75 Q27 83 35 83 L45 83 Q53 83 53 75 L53 31 Q53 27 50 27 L30 27 Q27 27 27 31 Z" />
                </clipPath>
                <linearGradient
                  id="liquidGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(255,215,0,0.9)" />
                  <stop offset="50%" stopColor="rgba(255,192,203,0.8)" />
                  <stop offset="100%" stopColor="rgba(138,43,226,0.9)" />
                </linearGradient>
              </defs>

              <rect
                x="27"
                y="31"
                width="26"
                height="52"
                fill="url(#liquidGradient)"
                clipPath="url(#bottleClip)"
                style={{
                  animation: `bottleFill ${durationMs}ms ease-out forwards`,
                  transformOrigin: "bottom",
                }}
              />

              {/* Liquid Surface Shine */}
              <ellipse
                cx="40"
                cy="40"
                rx="12"
                ry="2"
                fill="rgba(255,255,255,0.4)"
                style={{
                  animation: `liquidRise ${durationMs}ms ease-out forwards`,
                }}
              />

              {/* Bottle Highlight */}
              <path
                d="M30 30 Q32 28 32 35 L32 70 Q32 75 30 75"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />

              {/* Sparkle Effects */}
              <g
                style={{
                  animation: `sparkle ${durationMs}ms ease-in-out infinite`,
                }}
              >
                <circle
                  cx="35"
                  cy="40"
                  r="0.5"
                  fill={spinnerColor}
                  opacity="0.8"
                />
                <circle
                  cx="45"
                  cy="50"
                  r="0.5"
                  fill={spinnerColor}
                  opacity="0.6"
                />
                <circle
                  cx="38"
                  cy="65"
                  r="0.5"
                  fill={spinnerColor}
                  opacity="0.9"
                />
              </g>
            </svg>
          </div>
          <div className="preloader-text font-[Doren]" style={txtLoadingStyle}>
            {letters.map((ch, i) => (
              <span key={i} style={letterStyle(i)} aria-hidden="true">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </div>
          {subtitle && (
            <div
              style={subtitleStyle}
              className="subtitle-text font-[Doren]"
              aria-hidden="true"
            >
              {subtitle}
            </div>
          )}
        </div>

        <div style={sectionLeftStyle} aria-hidden="true" />
        <div style={sectionRightStyle} aria-hidden="true" />
      </div>
    </>
  );
}

// Demo component to show the preloader in action
function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {showPreloader && (
        <PreloaderReveal
          title="CALYX"
          subtitle="PARFUM DE LUXE"
          durationMs={3000}
          curtainDurationMs={2000}
          curtainColor="#1a1a2e"
          spinnerColor="#ffffff"
        />
      )}

      <div
        style={{
          textAlign: "center",
          color: "white",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Welcome!
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: "2rem",
          }}
        >
          The curtain reveal preloader has finished. This is your main content.
        </p>
        <button
          onClick={() => setShowPreloader(true)}
          style={{
            padding: "12px 24px",
            fontSize: "1rem",
            background: "rgba(255, 255, 255, 0.2)",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Show Preloader Again
        </button>
      </div>
    </div>
  );
}
